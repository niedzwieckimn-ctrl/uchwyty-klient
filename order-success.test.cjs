const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = name => fs.readFileSync(path.join(root, name), 'utf8');
const apiResult = overrides => ({ok:true, order:{id:18, order_no:'ZAM-TEST'}, email:{ok:true}, ...overrides});
const previous = overrides => ({id:4, customer_email:'buyer@example.test', status:'confirmed', ...overrides});

function api(){
  const ctx = vm.createContext({window:{}});
  vm.runInContext(script('order-success.js'), ctx);
  return ctx.window.OrderSuccess;
}

test('success requires an explicit saved result and a valid ID', () => {
  for(const value of [null, {}, {ok:false}, {ok:'true',order:{id:2}}, {ok:true,order:{}}, {ok:true,order:{id:-1}}]){
    assert.equal(api().fromSavedResponse(value, [], 'buyer@example.test'), null);
  }
});

test('unknown, empty and truncated histories never imply a first order, milestone or record', () => {
  for(const history of [undefined, [], [previous()], Array.from({length:200}, (_,i)=>previous({id:i+1}))]){
    const helper = api();
    const saved = helper.fromSavedResponse(apiResult(), history, 'buyer@example.test');
    const words = helper.text(saved, 'pl');
    assert.doesNotMatch(words.body, /pierwsz|rekord|dziesiąt|\d/iu);
  }
});

test('returning message requires a distinct earlier order of the same customer', () => {
  const helper = api();
  for(const history of [[], [previous({id:18})], [previous({id:19})], [previous({customer_email:'someone@example.test'})], [previous({status:'cancelled'})], [previous({status:null})]]){
    assert.equal(helper.fromSavedResponse(apiResult(), history, 'buyer@example.test').returning, false);
  }
  assert.equal(helper.fromSavedResponse(apiResult(), [previous()], ' Buyer@Example.Test ').returning, true);
});

test('replayed save is already saved, never celebrated as another order', () => {
  const helper = api();
  const saved = helper.fromSavedResponse(apiResult({duplicate:true, recovered:true}), [previous()], 'buyer@example.test');
  assert.equal(saved.returning, false);
  assert.match(helper.text(saved, 'pl').title, /już zapisane/);
});

test('email success is never inferred from order success', () => {
  const helper = api();
  for(const email of [undefined, {ok:false}, {ok:'true'}]){
    const saved = helper.fromSavedResponse(apiResult({email}), [], 'buyer@example.test');
    assert.equal(saved.emailSent, false);
    assert.match(helper.text(saved, 'pl').email, /Nie mamy jeszcze/);
  }
});

// Run the actual submission handler with a minimal DOM and mocked I/O.
// These tests never contact the live service or create real orders.
function harness(){
  const elements = new Map();
  const document = {
    createElement: tag => node(tag),
    querySelector: () => null,
    getElementById: id => get(id)
  };
  function node(tag){
    const classes = new Set();
    return {
      tag, style:{}, value:'', children:[], disabled:false, ownerDocument:document,
      classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c)},
      set textContent(value){this._text = value; this.children=[];},
      get textContent(){return this._text || this.children.map(c=>c.textContent).join(' ');},
      replaceChildren(...children){this._text='';this.children=children;},
      addEventListener(event, handler){this[event]=handler;}
    };
  }
  function get(id){if(!elements.has(id)) elements.set(id,node('div'));return elements.get(id);}
  let calls = 0, refreshCalls = 0;
  const ctx = vm.createContext({
    window:{}, document, $:get, console,
    CURRENT_LANGUAGE:'pl', CLIENT_ORDERS:[previous()],
    ORDER_DRAFT:[{product_id:5,sku:'TEST',qty:2}], ORDER_CREATE_IN_FLIGHT:false,
    ORDER_IDEMPOTENCY_KEY:'stable-request-key', LAST_ORDER_CONFIRMATION:null,
    getSession:async()=>({user:{email:'buyer@example.test'}}),
    t:(key,args)=>`${key} ${args?.number || args?.error || ''}`,
    renderOrderDraft:()=>{}, clientErrorDetail:error=>error.message,
    openSection:()=>{},
    fetchMagazynResponse:async()=>{calls++;return {ok:true,json:async()=>apiResult()};},
    loadOrders:async()=>{refreshCalls++;}
  });
  vm.runInContext(script('order-success.js'),ctx);
  vm.runInContext(html.slice(html.indexOf('function clearOrderConfirmation(){'),html.indexOf('function renderOrdersRows(')), ctx);
  return {ctx,get,submit:()=>get('btnCreateOrder').onclick(),calls:()=>calls,refreshCalls:()=>refreshCalls};
}

test('confirmation appears before the existing refresh completes; no new request is added', async () => {
  const h = harness();
  let finishRefresh;
  h.ctx.loadOrders = () => new Promise(resolve=>{finishRefresh=resolve;});
  const submitted = h.submit();
  while(!finishRefresh) await new Promise(resolve=>setImmediate(resolve));
  assert.match(h.get('orderMsg').textContent, /ZAM-TEST zapisane/);
  assert.equal(h.ctx.ORDER_DRAFT.length,0);
  assert.equal(h.calls(),1);
  finishRefresh();
  await submitted;
  assert.equal(h.get('btnCreateOrder').disabled,false);
});

test('refresh failure cannot undo success or restore the submitted basket', async () => {
  const h = harness();
  h.ctx.loadOrders = async()=>{throw new Error('offline');};
  await h.submit();
  assert.match(h.get('orderMsg').textContent,/zapisane/);
  assert.equal(h.ctx.ORDER_DRAFT.length,0);
  assert.equal(h.ctx.ORDER_IDEMPOTENCY_KEY,null);
});

test('failed creation preserves basket and idempotency key and never shows congratulations', async () => {
  const h = harness();
  h.ctx.fetchMagazynResponse = async()=>({ok:false,status:503,json:async()=>({ok:false,error:'offline'})});
  await h.submit();
  assert.match(h.get('orderMsg').textContent,/orders.createFailed/);
  assert.equal(h.get('orderMsg').classList.contains('order-success'),false);
  assert.equal(h.ctx.ORDER_DRAFT.length,1);
  assert.equal(h.ctx.ORDER_IDEMPOTENCY_KEY,'stable-request-key');
  assert.equal(h.refreshCalls(),0);
});

test('duplicate click remains blocked during submission', async () => {
  const h = harness();
  await Promise.all([h.submit(),h.submit()]);
  assert.equal(h.calls(),1);
});

test('presentation failure cannot report that a saved order failed', async () => {
  const h = harness();
  h.ctx.window.OrderSuccess = {fromSavedResponse:()=>{throw new Error('presentation only');}};
  await h.submit();
  assert.match(h.get('orderMsg').textContent,/orders.createdMail/);
  assert.equal(h.ctx.ORDER_DRAFT.length,0);
});

test('all languages render safely and clearing removes previous success', async () => {
  const h = harness();
  await h.submit();
  for(const language of ['pl','de','en','es','it']){
    h.ctx.CURRENT_LANGUAGE=language;
    h.ctx.LAST_ORDER_CONFIRMATION={...h.ctx.LAST_ORDER_CONFIRMATION,number:'<img src=x onerror=alert(1)>'};
    h.ctx.renderOrderConfirmation();
    assert.equal(h.get('orderMsg').children.length,4);
    assert.match(h.get('orderMsg').children[0].textContent,/<img/);
    assert.equal(h.get('orderMsg').children[0].children.length,0);
  }
  h.ctx.clearOrderConfirmation();
  assert.equal(h.get('orderMsg').textContent,'');
  assert.equal(h.ctx.LAST_ORDER_CONFIRMATION,null);
});

test('daily text preserves the 30-day rotation in all languages and Warsaw midnight', () => {
  const ctx=vm.createContext({window:{}});
  vm.runInContext(script('sales-thoughts.js'),ctx);
  const daily=ctx.window.DailySalesThoughts;
  for(const lang of ['pl','de','en','es','it']){
    const entries=Array.from({length:30},(_,i)=>daily.get(lang,new Date(Date.UTC(2026,9,1+i,12))));
    assert.equal(new Set(entries.map(e=>e.text)).size,30);
    assert.ok(entries.every(e=>e.text.length<200));
  }
  assert.equal(daily.get('pl',new Date('2026-10-14T21:59:59Z')).dateKey,'2026-10-14');
  assert.equal(daily.get('pl',new Date('2026-10-14T22:00:00Z')).dateKey,'2026-10-15');
  assert.equal(daily.get('pl',new Date('2026-10-25T23:00:00Z')).dateKey,'2026-10-26');
});
