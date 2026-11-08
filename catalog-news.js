let newsRequest = 0;
let newsProducts = [];
const newsLabels = {
  pl:['Nowości!!','Pozostałe nowości'], en:['New arrivals!!','More new arrivals'],
  de:['Neuheiten!!','Weitere Neuheiten'], es:['¡Novedades!','Más novedades'], it:['Novità!!','Altre novità']
};
function drawNews(){
  const box=$('catalogNews');
  box.replaceChildren();
  box.hidden=newsProducts.length===0;
  if(box.hidden) return;
  const labels=newsLabels[CURRENT_LANGUAGE] || newsLabels.pl;
  const heading=document.createElement('h2');
  heading.textContent=labels[0];
  box.append(heading);
  function list(products){
    const ul=document.createElement('ul');
    for(const product of products){
      const li=document.createElement('li');
      const button=document.createElement('button');
      button.type='button';
      const name=document.createElement('strong');
      name.textContent=product.model || product.name || product.sku;
      button.append(name);
      if(name.textContent!==product.sku){
        const sku=document.createElement('small');
        sku.textContent=product.sku;
        button.append(sku);
      }
      button.onclick=()=>{
        $('stockSearch').value=product.sku;
        openSection('stockSection');
        renderStockTable();
        void loadStock(false);
        $('stockSection').scrollIntoView({block:'start'});
      };
      li.append(button);ul.append(li);
    }
    return ul;
  }
  box.append(list(newsProducts.slice(0,3)));
  if(newsProducts.length>3){
    const more=document.createElement('details'), summary=document.createElement('summary');
    summary.textContent=labels[1]+' ('+(newsProducts.length-3)+')';
    more.append(summary,list(newsProducts.slice(3)));box.append(more);
  }
}
async function refreshNews(){
  const request=++newsRequest;
  try{
    const {data,error}=await sbAuth.rpc('portal_new_arrivals',{p_panel:'distributor'});
    if(request!==newsRequest) return;
    newsProducts=error || !Array.isArray(data) ? [] : data;
  }catch{
    if(request!==newsRequest) return;
    newsProducts=[];
  }
  drawNews();
}

globalThis.CatalogNews = {
  refresh: refreshNews,
  render: drawNews,
  clear(){
    ++newsRequest;
    newsProducts=[];
    drawNews();
  }
};

