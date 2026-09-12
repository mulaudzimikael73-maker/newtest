/* Optional LizzyOS pre-update backup helper.
Run in the browser console on the LIVE site before deployment if you want a manual safety copy. */
(() => {
  const data={};
  for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);data[k]=localStorage.getItem(k);}
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);
  a.download="LizzyOS-localStorage-backup-"+new Date().toISOString().slice(0,10)+".json";
  a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
})();