const input=document.querySelector('#request-input');
const error=document.querySelector('#error');
const result=document.querySelector('#analysis');
function showStored(){const stored=PetDemo.read().requests.find(x=>x.id===PetDemo.request.id);result.hidden=!stored;if(stored)document.querySelector('#result-id').textContent=stored.id}
document.querySelector('#fill').addEventListener('click',()=>{input.value=PetDemo.sample;error.textContent='';input.focus()});
document.querySelector('#submit').addEventListener('click',()=>{const text=input.value.trim();if(!text){error.textContent='请先描述你的需求，或点击“一键填入样例”。';return}if(!PetDemo.supports(text)){error.textContent='演示版仅支持分析样例需求，请点击「一键填入样例」';return}error.textContent='';document.querySelector('#result-id').textContent=PetDemo.submit(text);showStored();result.scrollIntoView({behavior:'smooth'})});
document.querySelector('#reset').addEventListener('click',()=>{PetDemo.reset();input.value='';error.textContent='演示数据已重置。';showStored()});
addEventListener('storage',showStored);addEventListener('pet-demo-change',showStored);showStored();
