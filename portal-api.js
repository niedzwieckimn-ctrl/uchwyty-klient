/* Central Supabase API. Browser identity, prices and membership are checked in
 * portal_request; this adapter never accepts an actor/customer as authority. */
(function(root){
  function create(client, {legacyBase='', fetchImpl=fetch}={}) {
    const json = data => new Response(JSON.stringify(data),{status:data?.ok === false ? Number(data.status || 400) : 200,headers:{'Content-Type':'application/json'}});
    async function rpc(action,data) {
      const {data:result,error,status}=await client.rpc('portal_request',{p_action:action,p_data:data});
      if(error) return {ok:false,status:Number(status) || Number(error.status) || 500,error:error.message};
      return result || {ok:false,status:503,error:'Nie udało się pobrać danych.'};
    }
    async function file(ref) {
      const match=/^supabase:\/\/([^/]+)\/(.+)$/.exec(ref || '');
      if(!match) return json({ok:false,status:404,error:'Plik niedostępny.'});
      const {data,error}=await client.storage.from(match[1]).createSignedUrl(match[2],120);
      if(error || !data?.signedUrl) return json({ok:false,status:403,error:'Brak dostępu do pliku.'});
      return fetchImpl(data.signedUrl,{cache:'no-store'});
    }
    async function request(path, options={}) {
      const url=new URL(path,'https://portal.invalid'), post=options.method==='POST';
      const body=options.body ? JSON.parse(options.body) : {};
      let action, data=body, match;
      switch(url.pathname) {
        case '/api/client/profile': action='b2b.profile'; break;
        case '/api/client_stock_catalog': action='b2b.catalog'; break;
        case '/api/client/orders':
          action=post?'b2b.create_order':'b2b.orders';
          if(post) data={...body,idempotency_key:new Headers(options.headers).get('Idempotency-Key')};
          break;
        case '/api/order_lookup': action='b2b.order'; data={token:url.searchParams.get('token')}; break;
        case '/api/client/architect-code/quote': action='b2b.quote'; break;
        case '/api/client/architect-sales': action=post?'b2b.confirm_sale':'b2b.sales'; if(!post)data={order_id:Number(url.searchParams.get('order_id'))}; break;
        case '/api/client_invoices': action='b2b.invoices'; break;
        case '/api/client_search_log': action='b2b.search'; break;
        case '/api/client/search-aliases': action='b2b.aliases'; break;
        default:
          if((match=/^\/api\/invoices\/(\d+)\/(download|seen)$/.exec(url.pathname))) {
            action=match[2]==='download'?'b2b.invoice_file':'b2b.invoice_seen'; data={invoice_id:Number(match[1])};
          } else if((match=/^\/api\/client\/product-images\/(\d+)$/.exec(url.pathname))) {
            action='b2b.image'; data={image_id:Number(match[1])};
          } else if(/^\/api\/client\/orders\/\d+\/pdf(?:-retail)?$/.test(url.pathname) && !post) {
            // Optional order printouts remain in IKUGO. Saved invoices use Storage.
            const {data:{session}}=await client.auth.getSession();
            if(!session) return json({ok:false,status:401,error:'Zaloguj się ponownie.'});
            return fetchImpl(legacyBase+path,{cache:'no-store',headers:{Authorization:`Bearer ${session.access_token}`}});
          } else return json({ok:false,status:404,error:'Nieobsługiwana operacja.'});
      }
      const result=await rpc(action,data);
      if(result.ok && (action==='b2b.invoice_file' || action==='b2b.image')) return file(result.file_ref);
      return json(result);
    }
    return {request};
  }
  if(typeof module==='object' && module.exports) module.exports={create};
  else root.PortalApi={create};
})(typeof window==='undefined'?globalThis:window);
