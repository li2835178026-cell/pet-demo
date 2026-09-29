(function(){
  const KEY='pet-companion-demo-v1';
  const sample='明天去杭州出差三天，家里的猫粮快没了，猫还需要打疫苗。';
  const request={id:'XQ-20261001-001',date:'2026-10-01',status:'待确认',original:sample,pet:{name:'圆圆',type:'猫',location:'合肥',destination:'杭州'},needs:['出差期间上门照护（系统建议，用户尚未确认）','猫粮补给','疫苗预约协调（仅预约需求，不做医学判断）'],missing:['航空箱','地址','疫苗记录','猫粮规格','每日照护次数']};
  function read(){try{return JSON.parse(localStorage.getItem(KEY))||{requests:[]}}catch(e){return{requests:[]}}}
  function write(data){localStorage.setItem(KEY,JSON.stringify(data));window.dispatchEvent(new CustomEvent('pet-demo-change'))}
  function supports(text){const value=text.trim();return value===sample||['出差','猫粮','疫苗'].filter(keyword=>value.includes(keyword)).length>=2}
  window.PetDemo={KEY,sample,request,read,supports,submit(text){if(!supports(text))return null;const data=read();if(!data.requests.some(x=>x.id===request.id)){data.requests.unshift({...request,original:text});write(data)}return request.id},reset(){localStorage.removeItem(KEY);window.dispatchEvent(new CustomEvent('pet-demo-change'))}};
})();
