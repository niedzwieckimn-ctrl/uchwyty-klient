const {test}=require('node:test');
const assert=require('node:assert/strict');
const {create}=require('./portal-api.js');
test('core shopping and history paths work with an unreachable Render',async()=>{
  const calls=[];
  const api=create({rpc:async(name,params)=>{calls.push([name,params]);return {data:{ok:true}};}},{fetchImpl:()=>{throw Error('Render must be unreachable');}});
  for(const path of ['/api/client/profile','/api/client_stock_catalog','/api/client/orders','/api/order_lookup?token=ZAM-1','/api/client/architect-code/quote','/api/client/architect-sales?order_id=1','/api/client_invoices','/api/client_search_log','/api/client/search-aliases'])
    assert.equal((await api.request(path)).ok,true,path);
  assert.equal(calls.length,9);
  assert.ok(calls.every(([name])=>name==='portal_request'));
});
test('order retry sends the unchanged idempotency key to the transaction',async()=>{
  const calls=[]; const api=create({rpc:async(_,params)=>{calls.push(params);return {data:{ok:true,order:{id:123}}};}});
  const options={method:'POST',headers:{'Idempotency-Key':'a-fixture-key'},body:JSON.stringify({items:[{product_id:1,qty:2}]})};
  const a=await (await api.request('/api/client/orders',options)).json();
  const b=await (await api.request('/api/client/orders',options)).json();
  assert.deepEqual(a,b); assert.deepEqual(calls[0],calls[1]);
  assert.equal(calls[0].p_action,'b2b.create_order'); assert.equal(calls[0].p_data.idempotency_key,'a-fixture-key');
});
test('invoice download requires a server-authorized reference and Storage signature',async()=>{
  const calls=[];
  const api=create({rpc:async()=>({data:{ok:true,file_ref:'supabase://private-invoices/own.pdf'}}),storage:{from:bucket=>({createSignedUrl:async(path,ttl)=>{calls.push([bucket,path,ttl]);return {data:{signedUrl:'https://storage.invalid/short-lived'}};}})}},{fetchImpl:async url=>{assert.equal(url,'https://storage.invalid/short-lived');return new Response('pdf');}});
  assert.equal(await (await api.request('/api/invoices/6/download')).text(),'pdf');
  assert.deepEqual(calls,[['private-invoices','own.pdf',120]]);
});
test('permission and rate denials remain visible and never fall back to Render',async()=>{
  for(const status of [403,429]){
    const api=create({rpc:async()=>({data:{ok:false,status,error:'denied'}})},{fetchImpl:()=>{throw Error('unexpected fallback');}});
    const response=await api.request('/api/client/architect-code/quote',{method:'POST',body:'{}'});
    assert.equal(response.status,status); assert.equal((await response.json()).error,'denied');
  }
});
test('expired Auth token is reported as 401 rather than warehouse 500',async()=>{
  const api=create({rpc:async()=>({data:null,error:{status:401,message:'JWT expired'}})});
  const response=await api.request('/api/client/profile');
  assert.equal(response.status,401);
  assert.equal((await response.json()).error,'JWT expired');
});
test('unknown paths fail closed without a network request',async()=>{
  const api=create({rpc:()=>{throw Error('unexpected RPC');}},{fetchImpl:()=>{throw Error('unexpected network');}});
  assert.equal((await api.request('/api/admin/set-role')).status,404);
});
