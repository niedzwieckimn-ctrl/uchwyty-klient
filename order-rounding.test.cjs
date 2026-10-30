const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'index.html'),'utf8');
const source=html.slice(html.indexOf('function orderLineGross('),html.indexOf('function renderOrderDraft('));
const ctx=vm.createContext({}); vm.runInContext(source,ctx);

test('cart line uses invoice VAT rounding instead of rounded unit gross',()=>{
  assert.equal(ctx.orderLineGross(46.37,2,'PLN'),114.07);
  assert.equal(ctx.orderLineGross(1040.09,1,'PLN'),1279.31);
});
test('multiple invoice lines sum independently rounded VAT',()=>{
  const total=ctx.orderLineGross(92.75,2,'PLN')+ctx.orderLineGross(46.37,1,'PLN');
  assert.equal(Math.round(total*100),28521);
});
test('EUR orders retain their VAT-free price',()=>{
  assert.equal(ctx.orderLineGross(46.37,2,'EUR'),92.74);
});
