const {test}=require('node:test'),assert=require('node:assert/strict'),{config}=require('./build.cjs');
const env={PORTAL_ENV:'staging',PORTAL_SUPABASE_URL:'https://irhrzdsjnwjyqfvhiclk.supabase.co',PORTAL_SUPABASE_PUBLIC_KEY:'sb_publishable_fixture',PORTAL_IKUGO_URL:'https://uchwyty-architekci-staging.onrender.com'};
test('staging accepted',()=>assert.equal(config(env).mode,'staging'));
test('production cannot use staging',()=>assert.throws(()=>config({...env,PORTAL_ENV:'production'}),/mismatch/));
test('staging cannot use production',()=>assert.throws(()=>config({...env,PORTAL_SUPABASE_URL:'https://production.supabase.co'}),/mismatch/));
test('production accepts only the shared operational Supabase',()=>{
 const production={...env,PORTAL_ENV:'production',PORTAL_SUPABASE_URL:'https://qfzawzkynmqkbjlbtkjd.supabase.co',PORTAL_IKUGO_URL:'https://uchwyty.onrender.com'};
 assert.equal(config(production).mode,'production');
 assert.throws(()=>config({...production,PORTAL_SUPABASE_URL:'https://smzzzpdhvbjnfuzsgygf.supabase.co'}),/mismatch/);
});
test('service secret rejected',()=>assert.throws(()=>config({...env,PORTAL_SUPABASE_PUBLIC_KEY:'sb_secret_fixture'}),/Public key/));
test('missing configuration rejected',()=>assert.throws(()=>config({})));
