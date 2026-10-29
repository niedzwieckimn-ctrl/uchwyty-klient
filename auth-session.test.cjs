// Runs the actual B2B handlers with the installed Supabase SDK and an isolated
// in-memory Auth transport. No staging accounts, secrets or network are used.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createClient } = require('@supabase/supabase-js');
const html = fs.readFileSync(path.join(__dirname, process.env.B2B_TEST_SOURCE || 'index.html'), 'utf8');
const source = html.slice(html.indexOf('async function getSession(){'), html.indexOf('function normalizeStockRow('));
const tick = () => new Promise(resolve => setTimeout(resolve, 10));

function authTransport() {
  const sessions = new Map();
  const calls = [];
  const credentials = [];
  let id = 0;
  const user = { id: '00000000-0000-4000-8000-000000000001', email: 'test@example.invalid', aud: 'authenticated' };
  const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
  const fetch = async (input, options = {}) => {
    const url = new URL(input);
    calls.push({ path: url.pathname, scope: url.searchParams.get('scope') });
    if(url.pathname.endsWith('/token')) {
      const body = JSON.parse(options.body);
      credentials.push(body);
      if(body.password !== ' local-fixture-password ') return json({ error_code:'invalid_credentials', msg:'Invalid login credentials' }, 400);
      const refresh = `fixture-refresh-${++id}`;
      const payload = Buffer.from(JSON.stringify({sub:user.id, exp:Math.floor(Date.now()/1000)+3600, session_id:refresh})).toString('base64url');
      const access = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.fixture-signature`;
      sessions.set(access, refresh);
      return json({ access_token:access, refresh_token:refresh, expires_in:3600, token_type:'bearer', user });
    }
    if(url.pathname.endsWith('/logout')) {
      if(url.searchParams.get('scope') === 'local') sessions.delete(new Headers(options.headers).get('Authorization').replace('Bearer ',''));
      else sessions.clear();
      return json({});
    }
    throw new Error(`Unexpected isolated request: ${url.pathname}`);
  };
  const client = key => createClient('https://isolated-auth.example.invalid', 'local-fixture-key', {
    auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false,storageKey:key}, global:{fetch}
  });
  return {client,sessions,calls,credentials};
}

async function harness({denied = false, authFailure = null, captchaToken = ''} = {}) {
  const transport = authTransport();
  const client = transport.client('b2b-fixture');
  await client.auth.getSession();
  if(authFailure) client.auth.signInWithPassword = authFailure;
  const elements = new Map();
  const $ = id => {
    if(!elements.has(id)) elements.set(id,{
      value:'',textContent:'',disabled:false,focused:false,
      classList:{add(){},remove(){}},scrollIntoView(){},
      checkValidity(){return true;},focus(){this.focused=true;}
    });
    return elements.get(id);
  };
  $('email').value=' test@example.invalid ';
  $('password').value=' local-fixture-password ';
  const state = {shown:0,profileCalls:0,message:'', history:[],submitPrevented:0};
  const sandbox = {
    sbAuth:client,$,btnLogout:$('btnLogout'),setTimeout,clearTimeout,Promise,
    SESSION_LOAD_IN_FLIGHT:null,LOADED_USER_ID:null,CURRENT_CUSTOMER:null,SEARCH_ALIASES:{},
    LAST_LOADED:{}, document:{querySelector:()=>null,querySelectorAll:()=>[],getElementById:$},
    t:(key,params={})=>key+(params.error?`: ${params.error}`:''),clientErrorDetail:e=>e.message,
    authCaptchaToken:()=>captchaToken, resetAuthCaptcha:()=>{}, authCaptchaError:(error,fallback)=>fallback,
    showAuth:message=>{state.message=message||'';state.shown=0;state.history.push(['auth',message]);}, showApp:()=>{state.shown++;state.history.push(['app']);},
    refreshArchitectProgram:async()=>{},setLanguage(){},renderClientDashboard(){},loadStock:async()=>{},loadOrders:async()=>{},loadInvoices:async()=>{},
    fetchMagazynJson:async endpoint=> {
      if(endpoint === '/api/client/profile') {
        state.profileCalls++;
        if(denied) throw new Error('Magazyn API: 403');
        return {customer:{id:101,language:'pl'}};
      }
      return {aliases:{}};
    }
  };
  const context = vm.createContext(sandbox);
  vm.runInContext(source,context);
  await tick();
  const submit = () => $('clientLoginForm').onsubmit({preventDefault(){state.submitPrevented++;}});
  return {transport,client,$,state,context,submit};
}

test('accepted credentials load distributor profile before showing the application', {timeout:3000}, async()=>{
  const h=await harness();
  await h.submit(); await tick();
  assert.equal(h.state.profileCalls,1);
  assert.equal(h.state.shown,1,JSON.stringify(h.state));
  assert.equal(h.$('btnLogin').disabled,false);
  assert.equal(h.transport.sessions.size,1);
  assert.equal(h.transport.credentials[0].email,'test@example.invalid');
  assert.equal(h.transport.credentials[0].password,' local-fixture-password ');
  assert.equal(h.state.submitPrevented,1);
});

test('login forwards a CAPTCHA token through Supabase Auth', {timeout:3000}, async()=>{
  const h=await harness({captchaToken:'isolated-captcha-token'});
  await h.submit();
  assert.equal(h.transport.credentials[0].gotrue_meta_security.captcha_token,'isolated-captcha-token');
});

test('rejected credentials never open the panel or call the warehouse profile', {timeout:3000}, async()=>{
  const h=await harness(); h.$('password').value='wrong-fixture';
  await h.submit();
  assert.equal(h.state.profileCalls,0);
  assert.equal(h.state.shown,0);
  assert.match(h.state.message,/Invalid login credentials/);
  assert.equal(h.$('btnLogin').disabled,false);
});

test('B2B role denial leaves an independent architect session alive', {timeout:3000}, async()=>{
  const h=await harness({denied:true});
  const architect=h.transport.client('architect-fixture');
  await architect.auth.signInWithPassword({email:'test@example.invalid',password:' local-fixture-password '});
  await h.submit(); await tick();
  assert.equal(h.state.shown,0);
  assert.match(h.state.message,/b2bAccessDenied/,JSON.stringify(h.state));
  assert.equal(h.transport.sessions.size,1,'architect session must not be revoked');
  assert.equal((await architect.auth.getSession()).data.session.user.email,'test@example.invalid');
  assert.equal(h.transport.calls.find(call=>call.path.endsWith('/logout')).scope,'local');
});

test('double click sends one login request while the first is pending', {timeout:3000}, async()=>{
  let release, calls=0;
  const h=await harness({authFailure:()=>{calls++;return new Promise(resolve=>{release=resolve;});}});
  const pending=h.submit();
  assert.equal(h.$('btnLogin').disabled,true);
  assert.equal(h.$('authMsg').textContent,'common.loading');
  await h.submit();
  assert.equal(calls,1);
  release({data:{session:null},error:{message:'fixture failure'}}); await pending;
  assert.equal(h.$('btnLogin').disabled,false);
  assert.equal(h.$('btnRegister').disabled,false);
});

test('unexpected Auth transport failure is visible and releases the login controls', {timeout:3000}, async()=>{
  const h=await harness({authFailure:async()=>{throw new Error('fixture offline');}});
  await h.submit();
  assert.match(h.state.message,/fixture offline/);
  assert.equal(h.$('btnLogin').disabled,false);
  assert.equal(h.state.profileCalls,0);
});

test('admin and malformed email are rejected before any Auth request', {timeout:3000}, async()=>{
  for(const value of ['admin','dystrybutor@','   ']){
    const h=await harness();
    h.$('email').value=value;
    // The DOM reports type=email validity; the handler must honor it.
    h.$('email').checkValidity=()=>false;
    await h.submit();
    assert.equal(h.transport.calls.length,0,value);
    assert.equal(h.state.profileCalls,0,value);
    assert.equal(h.state.message,'auth.invalidEmail');
    assert.equal(h.$('email').focused,true);
    assert.equal(h.$('btnLogin').disabled,false);
  }
});

test('missing password is reported locally without sending an Auth request', {timeout:3000}, async()=>{
  const h=await harness(); h.$('password').value='';
  await h.submit();
  assert.equal(h.transport.calls.length,0);
  assert.equal(h.state.message,'auth.passwordRequired');
  assert.equal(h.$('password').focused,true);
});

test('button and Enter use the same form submit handler', {timeout:3000}, async()=>{
  const form=html.match(/<form id="clientLoginForm"[^>]*>[\s\S]*?<\/form>/)?.[0];
  assert.ok(form,'login form is present');
  assert.match(form,/<input id="email"[^>]*type="email"[^>]*required/);
  assert.match(form,/<button id="btnLogin"[^>]*type="submit"/);
  assert.doesNotMatch(form,/onsubmit="return false/);
  const h=await harness();
  assert.equal(h.$('btnLogin').onclick,undefined,'no separate click login can bypass validation');
  await h.submit(); await tick();
  assert.equal(h.state.submitPrevented,1,'submit must not navigate away');
  assert.equal(h.transport.credentials.length,1);
  assert.equal(h.state.shown,1);
});
