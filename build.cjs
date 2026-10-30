const fs=require('node:fs'),path=require('node:path');
function config(env) {
 const mode=env.PORTAL_ENV, supabaseUrl=env.PORTAL_SUPABASE_URL, publicKey=env.PORTAL_SUPABASE_PUBLIC_KEY,ikugoUrl=env.PORTAL_IKUGO_URL;
 if(!['staging','production'].includes(mode))throw Error('PORTAL_ENV must be staging or production');
 for(const url of [supabaseUrl,ikugoUrl])if(!url||new URL(url).protocol!=='https:')throw Error('HTTPS URL required');
 if(!publicKey||publicKey.startsWith('sb_secret_'))throw Error('Public key required');
 if(publicKey.startsWith('ey')) {let jwt=JSON.parse(Buffer.from(publicKey.split('.')[1],'base64url'));if(jwt.role!=='anon')throw Error('Only anon JWT allowed');}
 else if(!publicKey.startsWith('sb_publishable_'))throw Error('Unsupported public key');
 const projects={staging:'https://irhrzdsjnwjyqfvhiclk.supabase.co',production:'https://qfzawzkynmqkbjlbtkjd.supabase.co'};
 if(supabaseUrl!==projects[mode])throw Error('Environment/project mismatch');
 const staging=mode==='staging';
 if((mode==='staging')!==ikugoUrl.includes('uchwyty-architekci-staging.onrender.com'))throw Error('Environment/backend mismatch');
 return {mode,supabaseUrl,publicKey,ikugoUrl};
}
function build(env=process.env){
 const cfg=config(env),out=path.join(__dirname,'dist'); fs.mkdirSync(out,{recursive:true});
 const files=['index.html','logo.png','order-success.js','portal-api.js','sales-thoughts.js','search-telemetry.js'];
 for(const file of files)fs.copyFileSync(path.join(__dirname,file),path.join(out,file));
 for(const file of ['staging-checks.html','responsive-checks.html']){
  const target=path.join(out,file);
  if(cfg.mode==='staging'&&fs.existsSync(path.join(__dirname,file)))fs.copyFileSync(path.join(__dirname,file),target);
  else if(fs.existsSync(target))fs.unlinkSync(target);
 }
 fs.writeFileSync(path.join(out,'runtime-config.js'),'window.PORTAL_CONFIG='+JSON.stringify(cfg)+';\n');
 fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({commit:env.COMMIT_REF||env.BUILD_COMMIT||'local',mode:cfg.mode}));
 return out;
}
module.exports={config,build};if(require.main===module)console.log(build());
