const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'index.html'),'utf8');
const ctx=vm.createContext({});
vm.runInContext(html.slice(html.indexOf('function availableSaleInvoices('),html.indexOf('async function wireArchitectSale(')),ctx);
test('partial and combined invoices expose only remaining allocated units',()=>{
  const result=ctx.availableSaleInvoices({qty:5,sold_qty:2,invoices:[
    {id:7,remaining_qty:0},{id:8,remaining_qty:2},{id:9,remaining_qty:5}
  ]});
  assert.deepEqual(JSON.parse(JSON.stringify(result)),[{id:8,remaining_qty:2},{id:9,remaining_qty:3}]);
});
test('missing allocation information cannot offer unrelated invoices',()=>{
  assert.equal(ctx.availableSaleInvoices({qty:2}).length,0);
  assert.equal(ctx.availableSaleInvoices({qty:2,sold_qty:2,invoices:[{id:7,remaining_qty:2}]}).length,0);
});
