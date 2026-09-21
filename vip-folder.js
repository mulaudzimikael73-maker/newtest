"use strict";
/* =========================================================
   LIZZYOS — VIP FOLDER
   A desktop folder next to Interactive Rewards that unlocks
   permanently once 67 Micky Bucs are spent. Empty for now —
   VIP features get added inside vipFolderUnlockedView later.
   ========================================================= */
(()=>{
const WALLET="lizzyMickyBucsV1",UNLOCKED="lizzyVipFolderUnlockedV1",COST=67;
const $=id=>document.getElementById(id);
const wallet=()=>Math.max(0,Number(localStorage.getItem(WALLET)||0));
const setWallet=n=>{localStorage.setItem(WALLET,String(Math.max(0,Math.floor(Number(n)||0))));window.dispatchEvent(new Event("lizzyStoreRefresh"))};
const unlocked=()=>localStorage.getItem(UNLOCKED)==="1";
const setUnlocked=()=>localStorage.setItem(UNLOCKED,"1");

function notify(title,body,extra){
  setTimeout(()=>{try{
    const u=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
    fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"vip_folder",title,body,...extra,createdAt:new Date().toISOString()})}).catch(()=>{});
  }catch{}},0);
}

function renderBadge(){
  const b=$("vipFolderLockBadge");
  if(!b)return;
  if(unlocked()){b.classList.add("hidden")}else{b.classList.remove("hidden");b.textContent="🔒"}
}

function renderWindow(){
  const lockedView=$("vipFolderLockedView"),unlockedView=$("vipFolderUnlockedView");
  if(!lockedView||!unlockedView)return;
  if(unlocked()){
    lockedView.classList.add("hidden");
    unlockedView.classList.remove("hidden");
    return;
  }
  lockedView.classList.remove("hidden");
  unlockedView.classList.add("hidden");
  const bal=$("vipFolderBalanceLine");
  if(bal)bal.textContent=`Your balance: ${wallet()} MB`;
  const btn=$("vipFolderUnlockBtn");
  if(btn)btn.disabled=wallet()<COST;
  const status=$("vipFolderStatus");
  if(status)status.textContent="";
}

function openFolder(){
  $("vipFolderWindow")?.classList.remove("hidden");
  renderWindow();
}
function closeFolder(){
  $("vipFolderWindow")?.classList.add("hidden");
}

function tryUnlock(){
  if(unlocked())return;
  if(wallet()<COST){
    const status=$("vipFolderStatus");
    if(status)status.textContent=`😭 Not enough Micky Bucs. You need ${COST} MB.`;
    return;
  }
  setWallet(wallet()-COST);
  setUnlocked();
  notify("💎 VIP FOLDER UNLOCKED","VIP folder unlocked",{cost:COST,balance:wallet()});
  renderBadge();
  renderWindow();
}

function init(){
  $("vipFolderIcon")?.addEventListener("click",openFolder);
  $("vipFolderIcon")?.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openFolder()}});
  $("vipFolderClose")?.addEventListener("click",closeFolder);
  $("vipFolderCloseBtn")?.addEventListener("click",closeFolder);
  $("vipFolderUnlockBtn")?.addEventListener("click",tryUnlock);
  window.addEventListener("lizzyStoreRefresh",renderWindow);
  renderBadge();
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();

window.VipFolderApp={open:openFolder,close:closeFolder,unlock:tryUnlock,isUnlocked:unlocked};
})();
