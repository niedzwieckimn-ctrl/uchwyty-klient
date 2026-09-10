/* Debounced, sequential, retryable event transport. */
(function(root){
class SearchTelemetry {
  constructor(send, clock=()=>Date.now()) { this.send=send; this.clock=clock; this.timer=null; this.query=''; this.source=''; this.editId=''; this.lastAt=0; this.sequence=0; this.queue=Promise.resolve(); }
  id(){ return crypto.randomUUID(); }
  input(query, source, count){
    clearTimeout(this.timer);
    const now=this.clock();
    query=String(query||'').trim();
    if(!this.editId || now-this.lastAt>300000 || source!==this.source || !query) this.editId=this.id();
    this.query=query; this.source=source; this.lastAt=now; this.count=count;
    if(query.length<2) return;
    this.timer=setTimeout(()=>this.flush(),900);
  }
  flush(productId){
    clearTimeout(this.timer);
    if(this.query.length<2)return;
    const event={version:3,event_id:this.id(),edit_id:this.editId,sequence:++this.sequence,
      query:this.query,results_count:productId?1:this.count,source:this.source};
    if(productId)event.selected_product_id=productId;
    this.queue=this.queue.catch(()=>{}).then(async()=>{
      for(let attempt=0;attempt<3;attempt++){
        try {await this.send(event);return;} catch(error){if(attempt===2)throw error;await new Promise(resolve=>setTimeout(resolve,1000*(attempt+1)));}
      }
    });
    this.queue.catch(()=>{});
    return this.queue;
  }
  select(productId){if(this.query.length>=2)return this.flush(productId);}
}
root.SearchTelemetry=SearchTelemetry;
if(typeof module!=='undefined')module.exports=SearchTelemetry;
})(globalThis);
