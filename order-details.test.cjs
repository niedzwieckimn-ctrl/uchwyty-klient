// Exercise actual UI handlers with held/rejected ancillary requests; no network.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const between = (start, end) => html.slice(html.indexOf(start), html.indexOf(end, html.indexOf(start)));
const flush = () => new Promise(resolve => setImmediate(resolve));

function harness({lookupFailure=false, salesFailure=false}={}){
  let releaseSales;
  const sales = new Promise((resolve,reject)=>{releaseSales=()=>salesFailure ? reject(new Error('sale service unavailable')) : resolve();});
  const hidden = new Set(['hidden']);
  const target = {innerHTML:''};
  const detailRow = {children:[{innerHTML:''}],
    classList:{contains:x=>hidden.has(x),add:x=>hidden.add(x),remove:x=>hidden.delete(x)},
    querySelector:()=>target};
  const button = {dataset:{openOrder:'6'},disabled:false};
  const net = {textContent:''}, gross = {textContent:''};
  const state = {catalog:0,lookup:0,pdf:0,sales:0};
  const context = vm.createContext({
    tb:{querySelectorAll:()=>[button]},rows:[{id:6,order_no:'ZAM-2610286'}],
    document:{getElementById:id=>({'order-detail-6':detailRow,'order-net-6':net,'order-gross-6':gross}[id])},
    t:(key,args={})=>key+(args.error ? ': '+args.error : ''),esc:String,clientErrorDetail:e=>e.message,
    loadStock:async()=>{state.catalog++;throw new Error('Catalog must not precede details');},
    fetchOrderDetails:async()=>{
      state.lookup++;
      if(lookupFailure) throw new Error('details unavailable');
      return {order:{id:6,currency:'PLN'},items:[{sku:'TEST',qty:1}],totals:{net:92.75,gross:114.08}};
    },
    renderOrderDetailsHtml:()=>'<article>saved details and invoice controls</article>',
    wireInlineOrderPdf:()=>{state.pdf++;},
    formatPrice:(value,currency)=>`${value} ${currency}`,
    wireArchitectSale:async()=>{state.sales++;await sales;target.innerHTML='sale controls';}
  });
  vm.runInContext(between('async function loadArchitectSaleSection(', 'function downloadOrderPdf('),context);
  vm.runInContext(between("tb.querySelectorAll('[data-open-order]')", "tb.querySelectorAll('[data-pdf-order]')"),context);
  return {button,detailRow,target,net,gross,state,releaseSales};
}

test('details and prices are ready without catalog or ancillary sales response',async()=>{
  const h=harness();
  await h.button.onclick();
  assert.equal(h.state.catalog,0);
  assert.equal(h.state.lookup,1);
  assert.equal(h.state.pdf,1);
  assert.match(h.detailRow.children[0].innerHTML,/saved details/);
  assert.equal(h.net.textContent,'92.75 PLN');
  assert.equal(h.gross.textContent,'114.08 PLN');
  assert.equal(h.button.disabled,false,'button is released while ancillary request is pending');
  assert.equal(h.button.dataset.loaded,'1');
  assert.match(h.target.innerHTML,/common.loading/);
  h.releaseSales();await flush();
  assert.equal(h.target.innerHTML,'sale controls');
});

test('ancillary failure stays inside its section and does not discard valid details',async()=>{
  const h=harness({salesFailure:true});
  await h.button.onclick();
  h.releaseSales();await flush();
  assert.match(h.target.innerHTML,/sale service unavailable/);
  assert.equal(h.detailRow.children[0].innerHTML,'<article>saved details and invoice controls</article>');
  assert.equal(h.button.dataset.loaded,'1');
  assert.equal(h.button.disabled,false);
  await h.button.onclick(); // collapse
  await h.button.onclick(); // cached reopen
  assert.equal(h.state.lookup,1,'already valid details remain cached');
});

test('failure to fetch main details remains retryable and starts no ancillary request',async()=>{
  const h=harness({lookupFailure:true});
  await h.button.onclick();
  assert.match(h.detailRow.children[0].innerHTML,/details unavailable/);
  assert.equal(h.button.disabled,false);
  assert.equal(h.button.dataset.loaded,undefined);
  assert.equal(h.state.sales,0);
});

test('fresh detail stock including zero takes priority over old full-catalog stock',()=>{
  const context=vm.createContext({STOCK_VIEW:[{product_id:1,qty_on_stock:100}],t:key=>key});
  vm.runInContext(between('function orderDeliveryTimeLabel(', 'function orderRealizationLabel('),context);
  assert.equal(context.orderDeliveryTimeLabel({product_id:1,qty:2,stock_qty:0}),'orders.slowDelivery');
  context.STOCK_VIEW=[{product_id:1,qty_on_stock:0}];
  assert.equal(context.orderDeliveryTimeLabel({product_id:1,qty:2,stock_qty:4}),'orders.fastDelivery');
});

test('non-program orders clear the ancillary loading placeholder on 404',async()=>{
  const target={innerHTML:'loading'};
  const context=vm.createContext({fetchMagazynResponse:async()=>({status:404})});
  vm.runInContext(between('async function wireArchitectSale(', 'async function loadArchitectSaleSection('),context);
  await context.wireArchitectSale({querySelector:()=>target},{id:6});
  assert.equal(target.innerHTML,'');
});
