"use strict";
/* =========================================================
   LIZZYOS — VIP CASINO
   Lives inside the VIP folder (unlocks with 67 MB, same as
   vip-folder.js). Chips ARE your Micky Bucs — wins and losses
   here change the same wallet used everywhere else in LizzyOS.
   3-Reel Classic + 5-Reel Deluxe slots, win/loss stats, biggest
   win, streaks, a progressive jackpot counter, achievements,
   and Mikael narrating every spin.
   ========================================================= */
(()=>{
const WALLET="lizzyMickyBucsV1",UNLOCKED="lizzyVipFolderUnlockedV1";
const STATS_KEY="lizzyVipCasinoStatsV1",JACKPOT_KEY="lizzyVipCasinoJackpotV1";
const JACKPOT_BASE=500,JACKPOT_GROWTH=0.08; // pool grows 8% of every bet wagered
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}};
const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};

/* ---------- wallet (shared across all of LizzyOS) ---------- */
const wallet=()=>Math.max(0,Number(localStorage.getItem(WALLET)||0));
const setWallet=n=>{localStorage.setItem(WALLET,String(Math.max(0,Math.floor(Number(n)||0))));window.dispatchEvent(new Event("lizzyStoreRefresh"))};
const unlocked=()=>localStorage.getItem(UNLOCKED)==="1";

function notify(title,body,extra){
  setTimeout(()=>{try{
    const u=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
    fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"vip_casino",title,body,...extra,createdAt:new Date().toISOString()})}).catch(()=>{});
  }catch{}},0);
}

/* ---------- stats + progressive jackpot ---------- */
function defaultStats(){return{spins:0,wins:0,losses:0,totalWagered:0,totalWon:0,biggestWin:0,streakType:null,streakCount:0,bestWinStreak:0,bestLossStreak:0,jackpots:0,rareJackpots:0,achievements:{}}}
function loadStats(){const s=read(STATS_KEY,null);return s?{...defaultStats(),...s,achievements:{...(s.achievements||{})}}:defaultStats()}
function saveStats(s){write(STATS_KEY,s)}
function loadJackpot(){const j=Number(localStorage.getItem(JACKPOT_KEY));return Number.isFinite(j)&&j>0?j:JACKPOT_BASE}
function saveJackpot(n){localStorage.setItem(JACKPOT_KEY,String(Math.max(JACKPOT_BASE,Math.round(n))))}

/* ---------- achievements ---------- */
const ACHIEVEMENTS=[
 {id:"first_spin",emoji:"🎰",title:"First Spin",desc:"Give the VIP Casino a whirl.",flavor:"There she goes. Try not to spend my whole VIP unlock fee in one sitting.",check:s=>s.spins>=1},
 {id:"high_roller",emoji:"🤑",title:"HIGH ROLLER",desc:"Win 1,000 MB in the VIP Casino.",flavor:"1,000 MB won. I'm equal parts proud and mildly concerned.",check:s=>s.totalWon>=1000},
 {id:"on_fire",emoji:"🔥",title:"On Fire",desc:"Land 5 wins in a row.",flavor:"Five in a row. Okay, this machine is clearly rigged in your favour and I love that for you.",check:s=>s.bestWinStreak>=5},
 {id:"jackpot_hit",emoji:"💎",title:"Jackpot Queen",desc:"Hit any jackpot.",flavor:"A jackpot. An actual jackpot. Somewhere a casino owner just felt a disturbance.",check:s=>(s.jackpots+s.rareJackpots)>=1},
 {id:"rare_jackpot",emoji:"👑",title:"Rare VIP Jackpot",desc:"Hit the ultra-rare VIP Crown Jackpot.",flavor:"Three/five crowns. I need you to sit down. Also I need you to Venmo me back.",check:s=>s.rareJackpots>=1},
 {id:"unlucky_love",emoji:"😭",title:"Unlucky In Love",desc:"Lose 10 spins in a row and keep smiling.",flavor:"Ten losses in a row and you're still here. That's either dedication or a problem, and I choose to call it dedication.",check:s=>s.bestLossStreak>=10},
 {id:"regular",emoji:"🎡",title:"Casino Regular",desc:"Play 50 spins.",flavor:"50 spins deep. The VIP Casino knows your name now.",check:s=>s.spins>=50},
 {id:"big_spender",emoji:"💰",title:"Big Spender",desc:"Wager 2,000 MB total, lifetime.",flavor:"2,000 MB wagered lifetime. Respect the commitment, question the budgeting.",check:s=>s.totalWagered>=2000},
];

/* ---------- commentary — written like Mikael narrating live ---------- */
const LINES={
 broke:[
  "Lizzy. You're broke. Go do a job in the Seed Store before you try to gamble your last 3 MB away.",
  "The house does not extend credit. Go earn some MB and come back.",
  "You currently have negative main-character energy in your wallet. Fix that first.",
 ],
 loss:[
  "Nothing. Absolutely nothing. The reels have spoken and they said no, just like I do when you ask for my fries.",
  "That's a loss. In my professional opinion, this is what happens when you don't say one nice thing about Mikael today.",
  "Not a single match. The Garden was right there. You could've watered a plant instead.",
  "Close, but no. The house always wins, and unfortunately today I am the house.",
  "That's an L. A small, forgettable, pasta-adjacent L.",
  "The reels landed on 'try again' — which is casino for 'no'.",
  "Nothing this time. Somewhere, a banana silently judges you.",
  "That was a rough spin. Self-confirmed: I did not feel bad watching it happen.",
  "No win. Consider this your five-minute Hater Break, but for luck instead of me.",
  "Reels say no. I'd offer comfort but I'm a slot machine narrator, not a therapist.",
 ],
 small:[
  "A small win! Not life-changing, but neither is finding one good song on shuffle. I'll take it.",
  "Tiny win. Respectable. Very minimum-wage energy, which honestly tracks.",
  "You won a little something. Somewhere Mikael is nodding slowly, unimpressed but supportive.",
  "Small win! Not enough to retire on, but enough to buy a Tulip Seed and pretend you're thriving.",
  "That's a small payout. Cute. Proceed.",
  "A modest win. Like a pity laugh at one of my jokes, but in MB form.",
  "Small but real. I'll allow it.",
  "That's a small one. The banana approves.",
 ],
 big:[
  "BIG WIN! Okay now THAT'S the ragebait-winning energy I signed up to narrate.",
  "Big win! I'm genuinely a little impressed, and I don't say that lightly.",
  "That's a proper win. Mr Perfect is clapping somewhere, quietly, so it doesn't go to your head.",
  "Huge payout! At this rate you'll out-earn the Minimum Wage claim by tonight.",
  "Big win! I take back what I said about the house always winning. Sometimes.",
  "That's a big one. Go on then, be smug about it, you've earned thirty seconds of it.",
 ],
 jackpot:[
  "JACKPOT!! Okay I did NOT expect that, and I narrate this machine for a living.",
  "JACKPOT! I'm speechless. This has literally never happened to me before, which is a lie, but let me have this.",
  "That's a JACKPOT. I am contractually obligated to be proud of you right now, and I actually mean it.",
  "JACKPOT! The Diamond hit. I need a minute. Possibly several minutes.",
 ],
 rare:[
  "👑 RARE VIP CROWN JACKPOT 👑 — I need you to sit all the way down. That progressive pool is YOURS. This might be rarer than me admitting I'm wrong.",
  "THE CROWNS LINED UP. The rare VIP jackpot. I'm not crying, you're crying, the slot machine is crying.",
  "👑 CROWN JACKPOT. The whole pool. Every MB. I hope you know this is going straight in your Read Me highlight reel forever.",
 ],
 achievementUnlock:[
  "New VIP Casino achievement unlocked. I'm updating your file accordingly.",
 ],
};
function pick(a){return a[Math.floor(Math.random()*a.length)]}

/* ---------- symbols & paytables ---------- */
// 3-Reel Classic
const SYM3=[
 {sym:"🍒",w:25,mult:2},{sym:"🍋",w:22,mult:2},{sym:"🌷",w:18,mult:4},
 {sym:"🍌",w:14,mult:6},{sym:"🍝",w:10,mult:10},{sym:"💗",w:6,mult:20},
 {sym:"💎",w:4,mult:50},{sym:"👑",w:1,mult:200},
];
const PAIR3=["🍒","🍋","🌷"]; // these three pay 1x bet on any 2-of-a-kind
function weightedPick(table){
  const total=table.reduce((a,x)=>a+x.w,0);let r=Math.random()*total;
  for(const x of table){if((r-=x.w)<0)return x.sym}
  return table[table.length-1].sym;
}
function spin3(bet){
  const reels=[weightedPick(SYM3),weightedPick(SYM3),weightedPick(SYM3)];
  if(reels[0]===reels[1]&&reels[1]===reels[2]){
    const s=SYM3.find(x=>x.sym===reels[0]);
    const rare=s.sym==="👑";
    const jackpot=!rare&&s.sym==="💎";
    return{reels,symbol:s.sym,mult:s.mult,tier:rare?"rare":jackpot?"jackpot":s.mult>=10?"big":"small"};
  }
  for(const p of PAIR3){
    if(reels.filter(r=>r===p).length===2)return{reels,symbol:p,mult:1,tier:"small"};
  }
  return{reels,symbol:null,mult:0,tier:"loss"};
}

// 5-Reel Deluxe — left-to-right consecutive match, ⭐ Wild substitutes
const SYM5=[
 {sym:"🍷",w:20,pay:{3:1,4:3,5:8}},{sym:"🌹",w:18,pay:{3:1,4:4,5:10}},
 {sym:"🦋",w:16,pay:{3:2,4:5,5:12}},{sym:"💍",w:13,pay:{3:3,4:8,5:20}},
 {sym:"🎩",w:11,pay:{3:4,4:10,5:25}},{sym:"💵",w:10,pay:{3:5,4:12,5:30}},
 {sym:"💎",w:7,pay:{3:12,4:30,5:70}},{sym:"⭐",w:4,wild:true},
 {sym:"👑",w:1,pay:{3:25,4:80,5:300}},
];
function spin5(bet){
  const reels=Array.from({length:5},()=>weightedPick(SYM5));
  let target=null;
  for(const r of reels){if(r!=="⭐"){target=r;break}}
  if(target===null)target="👑"; // an all-wild reel plays like a full crown line
  let len=0;
  for(let i=0;i<5;i++){if(reels[i]===target||reels[i]==="⭐")len++;else break}
  if(len<3)return{reels,symbol:null,mult:0,tier:"loss"};
  const def=SYM5.find(x=>x.sym===target);
  const mult=def.pay[len];
  const rare=target==="👑"&&len===5;
  return{reels,symbol:target,mult,tier:rare?"rare":mult>=50?"jackpot":mult>=10?"big":"small"};
}

/* ---------- state ---------- */
let currentTab="classic",betAmt=10;
const BET_STEPS=[5,10,25,50,100];

function streakLabel(s){
  if(!s.streakType||!s.streakCount)return"–";
  return s.streakType==="win"?`🔥 ${s.streakCount} win streak`:`🥶 ${s.streakCount} loss streak`;
}

function applyOutcome(bet,out){
  const s=loadStats();let jackpot=loadJackpot();
  s.spins++;s.totalWagered+=bet;
  jackpot+=Math.max(1,Math.round(bet*JACKPOT_GROWTH));
  let payout=0,wonJackpotPool=false;
  if(out.tier==="rare"){
    payout=Math.max(bet*out.mult,jackpot);
    wonJackpotPool=true;
    jackpot=JACKPOT_BASE;
    s.rareJackpots++;
  }else if(out.tier==="jackpot"){
    payout=bet*out.mult;
    s.jackpots++;
  }else{
    payout=bet*out.mult;
  }
  const prevStreakType=s.streakType,prevStreakCount=s.streakCount;
  if(payout>0){
    s.wins++;s.totalWon+=payout;
    if(payout>s.biggestWin)s.biggestWin=payout;
    s.streakType="win";
    s.streakCount=prevStreakType==="win"?prevStreakCount+1:1;
    if(s.streakCount>s.bestWinStreak)s.bestWinStreak=s.streakCount;
  }else{
    s.losses++;
    s.streakType="loss";
    s.streakCount=prevStreakType==="loss"?prevStreakCount+1:1;
    if(s.streakCount>s.bestLossStreak)s.bestLossStreak=s.streakCount;
  }
  const newlyUnlocked=[];
  for(const a of ACHIEVEMENTS){
    if(!s.achievements[a.id]&&a.check(s)){s.achievements[a.id]=Date.now();newlyUnlocked.push(a)}
  }
  saveStats(s);saveJackpot(jackpot);
  setWallet(wallet()+payout);
  return{payout,jackpot,wonJackpotPool,newlyUnlocked,stats:s};
}

/* ---------- UI ---------- */
function chipRow(id){
  return `<div class="vcChipsRow" id="${id}">${BET_STEPS.map(v=>`<button type="button" class="vcChip" data-bet="${v}">${v}</button>`).join("")}<button type="button" class="vcChip vcChipMax" data-bet="max">MAX</button></div>`;
}

function reelsHtml(id,count,face){
  return `<div class="vcReels" id="${id}">${Array.from({length:count},()=>`<div class="vcReel">${face}</div>`).join("")}</div>`;
}

function paytable3(){
  return `<table class="vcPayTable"><tr><th>3 in a row</th><th>Pays</th></tr>
  <tr><td>👑👑👑</td><td>200× — RARE VIP JACKPOT (or the full progressive pool, whichever is bigger)</td></tr>
  <tr><td>💎💎💎</td><td>50× — JACKPOT</td></tr>
  <tr><td>💗💗💗</td><td>20×</td></tr><tr><td>🍝🍝🍝</td><td>10×</td></tr>
  <tr><td>🍌🍌🍌</td><td>6×</td></tr><tr><td>🌷🌷🌷</td><td>4×</td></tr>
  <tr><td>🍒🍒🍒 / 🍋🍋🍋</td><td>2×</td></tr>
  <tr><td>Any 2 of 🍒🍋🌷</td><td>1×</td></tr></table>`;
}
function paytable5(){
  return `<table class="vcPayTable"><tr><th>Match (left→right)</th><th>3</th><th>4</th><th>5</th></tr>
  <tr><td>👑 Crown</td><td>25×</td><td>80×</td><td>300× — RARE VIP JACKPOT</td></tr>
  <tr><td>💎 Diamond</td><td>12×</td><td>30×</td><td>70×</td></tr>
  <tr><td>💵 Cash</td><td>5×</td><td>12×</td><td>30×</td></tr>
  <tr><td>🎩 Top Hat</td><td>4×</td><td>10×</td><td>25×</td></tr>
  <tr><td>💍 Ring</td><td>3×</td><td>8×</td><td>20×</td></tr>
  <tr><td>🦋 Butterfly</td><td>2×</td><td>5×</td><td>12×</td></tr>
  <tr><td>🌹 Rose</td><td>1×</td><td>4×</td><td>10×</td></tr>
  <tr><td>🍷 Wine</td><td>1×</td><td>3×</td><td>8×</td></tr>
  <tr><td colspan="4">⭐ Wild substitutes for any symbol in the match.</td></tr></table>`;
}

function machineHtml(mode){
  const is3=mode==="classic";
  return `<div class="vcMachine">
    ${reelsHtml(is3?"vcReels3":"vcReels5",is3?3:5,is3?"🍒":"🍷")}
    <div class="vcResultLine" id="${is3?"vcResult3":"vcResult5"}">Place your bet and spin.</div>
    <div class="vcBetRow"><span>Bet:</span>${chipRow(is3?"vcBetChips3":"vcBetChips5")}<div class="vcCurrentBet">Selected: <b id="${is3?"vcBetAmt3":"vcBetAmt5"}">${betAmt}</b> MB</div></div>
    <button type="button" class="vcSpinBtn" id="${is3?"vcSpin3":"vcSpin5"}">🎰 SPIN — ${is3?"3-REEL CLASSIC":"5-REEL DELUXE"}</button>
    <details class="vcPaytable"><summary>Paytable</summary>${is3?paytable3():paytable5()}</details>
  </div>`;
}

function achievementsHtml(){
  const s=loadStats();
  return `<div class="vcAchGrid">${ACHIEVEMENTS.map(a=>{
    const unlocked=!!s.achievements[a.id];
    return `<div class="vcAchCard ${unlocked?"unlocked":"locked"}"><div class="vcAchEmoji">${unlocked?a.emoji:"🔒"}</div><h4>${esc(a.title)}</h4><p>${esc(a.desc)}</p>${unlocked?`<small>Unlocked</small>`:`<small>Locked</small>`}</div>`;
  }).join("")}</div>`;
}

function howtoHtml(){
  return `<div class="vcHowto">
    <h3>🪙 VIP Chips</h3>
    <p>VIP Chips are your Micky Bucs — the same balance from the Seed Store and Token Jar. Every bet here comes out of that wallet, and every win goes straight back into it, so play like it's real MB. Because it is.</p>
    <h3>🎰 3-Reel Classic</h3>
    <p>Pick a bet, hit spin, and three symbols land. Match all three for a payout based on the paytable below — the rarer the symbol, the bigger the multiplier. Landing two of 🍒 🍋 or 🌷 pays a small 1× consolation. Three 👑 Crowns triggers the RARE VIP JACKPOT.</p>
    <h3>✨ 5-Reel Deluxe</h3>
    <p>Five symbols land in a row. Matching starts from the leftmost reel: whatever lands there (or the first non-Wild symbol) is your target, and the match extends right for as long as reels keep matching it or land a ⭐ Wild. 3, 4, or 5 in a row pays out — check the paytable for each symbol. Landing all 5 reels on 👑 Crown triggers the RARE VIP JACKPOT.</p>
    <h3>👑 Jackpots</h3>
    <p>A regular JACKPOT (💎💎💎 on Classic, or a big enough Diamond/Crown run on Deluxe) pays straight off the paytable. The RARE VIP JACKPOT is different — it pays out the full Progressive Jackpot pool shown at the top, which grows a little with every single spin across both machines. Win it, and the pool resets to 500 MB and starts climbing again.</p>
    <h3>📊 Stats, Streaks &amp; Achievements</h3>
    <p>Wins, losses, biggest single win, and your current streak are all tracked live at the top. Achievements unlock automatically as you play — check the Achievements tab to see what's locked and what you've already earned.</p>
  </div>`;
}

function renderHeader(){
  const s=loadStats(),j=loadJackpot();
  if($("vcChips"))$("vcChips").textContent=wallet();
  if($("vcJackpotAmt"))$("vcJackpotAmt").textContent=j;
  if($("vcWins"))$("vcWins").textContent=s.wins;
  if($("vcLosses"))$("vcLosses").textContent=s.losses;
  if($("vcBiggest"))$("vcBiggest").textContent=s.biggestWin;
  if($("vcStreak"))$("vcStreak").textContent=streakLabel(s);
  if($("vipFolderBalanceLine"))$("vipFolderBalanceLine").textContent=`Your balance: ${wallet()} MB`;
  if($("vcJackpotTeaserAmt"))$("vcJackpotTeaserAmt").textContent=j;
}

function renderTabBody(){
  const host=$("vcTabBody");if(!host)return;
  if(currentTab==="classic")host.innerHTML=machineHtml("classic");
  else if(currentTab==="deluxe")host.innerHTML=machineHtml("deluxe");
  else if(currentTab==="achievements")host.innerHTML=achievementsHtml();
  else host.innerHTML=howtoHtml();
  wireTabBody();
}

function wireTabBody(){
  document.querySelectorAll(".vcChip").forEach(b=>b.addEventListener("click",()=>{
    betAmt=b.dataset.bet==="max"?Math.max(1,Math.min(wallet(),500)):Number(b.dataset.bet);
    if($("vcBetAmt3"))$("vcBetAmt3").textContent=betAmt;
    if($("vcBetAmt5"))$("vcBetAmt5").textContent=betAmt;
  }));
  $("vcSpin3")?.addEventListener("click",()=>doSpin("classic"));
  $("vcSpin5")?.addEventListener("click",()=>doSpin("deluxe"));
}

function renderRoot(){
  const host=$("vcRoot");if(!host)return;
  host.innerHTML=`
    <div class="vcHeader">
      <div class="vcBalance">🪙 <span id="vcChips">0</span> VIP Chips</div>
      <div class="vcJackpotBig">👑 PROGRESSIVE JACKPOT<br><span id="vcJackpotAmt">${JACKPOT_BASE}</span> MB</div>
    </div>
    <div class="vcStatsRow">
      <div><small>Wins</small><b id="vcWins">0</b></div>
      <div><small>Losses</small><b id="vcLosses">0</b></div>
      <div><small>Biggest Win</small><b id="vcBiggest">0</b></div>
      <div><small>Streak</small><b id="vcStreak">–</b></div>
    </div>
    <div class="vcTabs">
      <button type="button" class="vcTabBtn ${currentTab==="classic"?"active":""}" data-tab="classic">🎰 Classic 3-Reel</button>
      <button type="button" class="vcTabBtn ${currentTab==="deluxe"?"active":""}" data-tab="deluxe">✨ Deluxe 5-Reel</button>
      <button type="button" class="vcTabBtn ${currentTab==="achievements"?"active":""}" data-tab="achievements">🏆 Achievements</button>
      <button type="button" class="vcTabBtn ${currentTab==="howto"?"active":""}" data-tab="howto">ℹ️ How To Play</button>
    </div>
    <div id="vcTabBody"></div>`;
  document.querySelectorAll(".vcTabBtn").forEach(b=>b.addEventListener("click",()=>{
    currentTab=b.dataset.tab;
    document.querySelectorAll(".vcTabBtn").forEach(x=>x.classList.toggle("active",x===b));
    renderTabBody();
  }));
  renderTabBody();
  renderHeader();
}

function toast(html,cls){
  const t=document.createElement("div");
  t.className=`vcToast ${cls||""}`;
  t.innerHTML=html;
  document.body.appendChild(t);
  requestAnimationFrame(()=>t.classList.add("show"));
  setTimeout(()=>{t.classList.remove("show");setTimeout(()=>t.remove(),400)},4800);
}

function rareOverlay(amount){
  const o=document.createElement("div");
  o.className="vcRareOverlay";
  o.innerHTML=`<div class="vcRareInner"><div class="vcRareCrown">👑</div><h1>RARE VIP JACKPOT</h1><p>+${amount} MB</p><button type="button" class="vcRareClose">OKAY I'M SHAKING</button></div>`;
  document.body.appendChild(o);
  o.querySelector(".vcRareClose").addEventListener("click",()=>o.remove());
  setTimeout(()=>o.classList.add("show"),10);
  if(window.confetti){
    const fire=()=>window.confetti({particleCount:140,spread:100,origin:{y:0.5},colors:["#ffd700","#f4c430","#fff2c2","#b388ff"]});
    fire();setTimeout(fire,350);setTimeout(fire,700);
  }
}

function doSpin(mode){
  if(!unlocked())return;
  const btn=$(mode==="classic"?"vcSpin3":"vcSpin5");
  const resultEl=$(mode==="classic"?"vcResult3":"vcResult5");
  const reelsEl=$(mode==="classic"?"vcReels3":"vcReels5");
  if(!btn||btn.disabled)return;
  if(wallet()<betAmt){resultEl.textContent=`😭 ${pick(LINES.broke)}`;return}
  btn.disabled=true;
  setWallet(wallet()-betAmt);
  renderHeader();
  const pool=mode==="classic"?SYM3.map(x=>x.sym):SYM5.map(x=>x.sym);
  const cells=[...reelsEl.children];
  let ticks=0;
  const spinner=setInterval(()=>{
    cells.forEach(c=>c.textContent=pool[Math.floor(Math.random()*pool.length)]);
    ticks++;
    if(ticks>=10){
      clearInterval(spinner);
      const out=mode==="classic"?spin3(betAmt):spin5(betAmt);
      cells.forEach((c,i)=>c.textContent=out.reels[i]);
      cells.forEach(c=>{c.classList.remove("vcPulse");void c.offsetWidth;c.classList.add("vcPulse")});
      const res=applyOutcome(betAmt,out);
      resultEl.innerHTML=out.tier==="loss"
        ? `😔 ${esc(pick(LINES.loss))}`
        : `<b>+${res.payout} MB</b> — ${esc(pick(LINES[out.tier]))}`;
      if(res.wonJackpotPool)rareOverlay(res.payout);
      else if(out.tier==="jackpot"&&window.confetti)window.confetti({particleCount:90,spread:80,origin:{y:0.5},colors:["#ffd700","#b388ff","#ffffff"]});
      else if(out.tier==="big"&&window.confetti)window.confetti({particleCount:50,spread:70,origin:{y:0.6}});
      res.newlyUnlocked.forEach(a=>{
        toast(`<b>${a.emoji} ${esc(a.title)}</b><p>${esc(a.flavor)}</p>`,"vcAchToast");
        notify(`🏆 VIP CASINO ACHIEVEMENT — ${a.title}`,a.desc,{achievement:a.id});
      });
      if(out.tier!=="loss"){
        notify(`🎰 VIP CASINO ${out.tier==="rare"?"RARE JACKPOT":out.tier==="jackpot"?"JACKPOT":"WIN"}`,
          `Mode: ${mode==="classic"?"3-Reel Classic":"5-Reel Deluxe"}\nBet: ${betAmt} MB\nPayout: +${res.payout} MB\nBalance: ${wallet()} MB`,
          {mode,bet:betAmt,payout:res.payout,tier:out.tier,balance:wallet()});
      }
      renderHeader();
      btn.disabled=false;
    }
  },70);
}

/* ---------- open/close ---------- */
function openCasino(){
  if(!unlocked())return;
  $("vipCasinoWindow")?.classList.remove("hidden");
  renderRoot();
}
function closeCasino(){$("vipCasinoWindow")?.classList.add("hidden")}

/* ---------- styles (self-contained, no edits to style.css needed) ---------- */
function injectStyles(){
  if($("vcStyles"))return;
  const s=document.createElement("style");
  s.id="vcStyles";
  s.textContent=`
  .vcTeaser{margin-top:16px;padding:16px;border-radius:18px;background:linear-gradient(160deg,#241033,#0e0616);border:1px solid #f4c43055;box-shadow:0 10px 30px rgba(0,0,0,.35)}
  .vcTeaserTop{display:flex;align-items:center;gap:10px}
  .vcTeaserTop span{font-size:28px}
  .vcTeaserTop small{color:#f4c430;letter-spacing:.08em;font-weight:800;font-size:10px}
  .vcTeaserTop h3{margin:2px 0 0;color:#fff}
  .vcTeaser p{color:#e8dcff;opacity:.85;font-size:13px}
  .vcJackpotTeaser{margin:10px 0;padding:10px 12px;border-radius:12px;background:#00000040;color:#ffd700;font-weight:800;text-align:center;border:1px dashed #f4c43066}
  #vipFolderCasinoBtn{width:100%;border:0;border-radius:12px;padding:12px;font-weight:900;cursor:pointer;background:linear-gradient(120deg,#f4c430,#b388ff);color:#150a22}

  .vcWindow{background:radial-gradient(circle at 50% -10%,#2a1240,#0a0512 70%)!important;border:1px solid #f4c43055!important;color:#f4ecff}
  .vcWindow .windowTop{background:linear-gradient(90deg,#1a0f2e,#2c1547);border-bottom:1px solid #f4c43044;position:relative;overflow:hidden}
  .vcWindow .windowTop::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,#ffd70099 0 6px,transparent 6px 16px);opacity:.5;animation:vcMarquee 2.4s linear infinite;height:2px;top:auto;bottom:0}
  @keyframes vcMarquee{0%{transform:translateX(0)}100%{transform:translateX(22px)}}
  .vcWindow .windowTop h2{color:#ffd700;text-shadow:0 0 14px #f4c43077}
  .vcWindow .windowCloseButton{background:linear-gradient(120deg,#f4c430,#b388ff);color:#150a22;border:0;border-radius:12px;font-weight:900}

  .vcHeader{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:14px;border-radius:16px;background:#ffffff08;border:1px solid #f4c43033;margin-bottom:14px}
  .vcBalance{font-weight:900;font-size:1.1rem;color:#ffe27a}
  .vcJackpotBig{text-align:center;font-weight:900;color:#ffd700;text-shadow:0 0 16px #f4c43088;line-height:1.2}
  .vcJackpotBig span{font-size:1.5rem}

  .vcStatsRow{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}
  .vcStatsRow div{background:#ffffff08;border:1px solid #ffffff14;border-radius:12px;padding:8px;text-align:center}
  .vcStatsRow small{display:block;opacity:.65;font-size:10px;letter-spacing:.05em;text-transform:uppercase}
  .vcStatsRow b{font-size:1.05rem;color:#ffe27a}

  .vcTabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}
  .vcTabBtn{flex:1 1 auto;padding:9px 10px;border-radius:10px;border:1px solid #f4c43033;background:#ffffff08;color:#f4ecff;font-weight:800;font-size:12px;cursor:pointer}
  .vcTabBtn.active{background:linear-gradient(120deg,#f4c430,#b388ff);color:#150a22}

  .vcMachine{background:linear-gradient(160deg,#1b0e2c,#0c0616);border:1px solid #f4c43033;border-radius:18px;padding:18px;text-align:center}
  .vcReels{display:flex;justify-content:center;gap:10px;margin-bottom:12px}
  .vcReel{width:58px;height:58px;display:flex;align-items:center;justify-content:center;font-size:28px;border-radius:12px;background:#000000aa;border:2px solid #f4c43055;box-shadow:inset 0 0 14px #00000088}
  .vcPulse{animation:vcPulse .5s ease}
  @keyframes vcPulse{0%{transform:scale(1.25);filter:brightness(1.8)}100%{transform:scale(1);filter:brightness(1)}}
  .vcResultLine{min-height:20px;margin:8px 0 14px;font-weight:700;color:#ffe27a}
  .vcBetRow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin-bottom:12px;font-size:13px}
  .vcChipsRow{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
  .vcChip{width:44px;height:44px;border-radius:50%;border:2px solid #ffd70099;background:radial-gradient(circle at 35% 30%,#3a1d5c,#150a22);color:#ffd700;font-weight:900;font-size:11px;cursor:pointer}
  .vcChipMax{border-color:#ff6ec7}
  .vcCurrentBet b{color:#ffd700}
  .vcSpinBtn{border:0;border-radius:14px;padding:14px 20px;font-weight:900;font-size:15px;cursor:pointer;background:linear-gradient(120deg,#ffd700,#ff6ec7,#b388ff);background-size:200% auto;color:#150a22;box-shadow:0 8px 24px #00000055}
  .vcSpinBtn:disabled{opacity:.6;cursor:not-allowed}
  .vcPaytable{margin-top:14px;text-align:left}
  .vcPaytable summary{cursor:pointer;color:#ffd700;font-weight:800}
  .vcPayTable{width:100%;border-collapse:collapse;margin-top:8px;font-size:12px}
  .vcPayTable td,.vcPayTable th{padding:6px 8px;border-bottom:1px solid #ffffff14;text-align:left}

  .vcAchGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
  .vcAchCard{padding:12px;border-radius:14px;text-align:center;border:1px solid #ffffff14;background:#ffffff08}
  .vcAchCard.unlocked{border-color:#ffd70077;background:linear-gradient(160deg,#2b1a08,#0c0616)}
  .vcAchEmoji{font-size:26px}
  .vcAchCard h4{margin:6px 0 2px;font-size:13px}
  .vcAchCard p{font-size:11px;opacity:.75;margin:0 0 6px}
  .vcAchCard small{opacity:.6;font-size:10px;text-transform:uppercase;letter-spacing:.05em}
  .vcAchCard.unlocked small{color:#ffd700;opacity:1}

  .vcHowto h3{color:#ffd700;margin:16px 0 4px}
  .vcHowto h3:first-child{margin-top:0}
  .vcHowto p{opacity:.9;font-size:13.5px;line-height:1.5}

  .vcToast{position:fixed;right:16px;bottom:16px;max-width:280px;padding:14px 16px;border-radius:14px;background:linear-gradient(160deg,#2b1a08,#150a22);border:1px solid #ffd70088;color:#f4ecff;box-shadow:0 14px 40px #000000aa;transform:translateY(20px);opacity:0;transition:all .35s ease;z-index:9000}
  .vcToast.show{transform:translateY(0);opacity:1}
  .vcToast b{color:#ffd700}
  .vcToast p{margin:4px 0 0;font-size:12px;opacity:.85}

  .vcRareOverlay{position:fixed;inset:0;background:#000000cc;display:flex;align-items:center;justify-content:center;z-index:9500;opacity:0;transition:opacity .3s ease}
  .vcRareOverlay.show{opacity:1}
  .vcRareInner{text-align:center;padding:36px 30px;border-radius:24px;background:radial-gradient(circle at 50% 0%,#3a1d5c,#0a0512);border:1px solid #ffd700;box-shadow:0 0 80px #f4c43066}
  .vcRareCrown{font-size:64px;animation:vcCrownSpin 1.8s ease infinite}
  @keyframes vcCrownSpin{0%,100%{transform:rotate(-8deg) scale(1)}50%{transform:rotate(8deg) scale(1.12)}}
  .vcRareInner h1{color:#ffd700;text-shadow:0 0 20px #f4c43099;margin:8px 0;font-size:1.6rem}
  .vcRareInner p{color:#fff;font-weight:900;font-size:1.3rem;margin:0 0 16px}
  .vcRareClose{border:0;border-radius:12px;padding:10px 18px;font-weight:900;cursor:pointer;background:linear-gradient(120deg,#ffd700,#b388ff);color:#150a22}

  @media (max-width:640px){.vcStatsRow{grid-template-columns:repeat(2,1fr)}.vcTabBtn{font-size:11px}}
  `;
  document.head.appendChild(s);
}

function init(){
  injectStyles();
  $("vipFolderCasinoBtn")?.addEventListener("click",openCasino);
  $("vipCasinoClose")?.addEventListener("click",closeCasino);
  $("vipCasinoCloseBtn")?.addEventListener("click",closeCasino);
  window.addEventListener("lizzyStoreRefresh",()=>{if(!$("vipCasinoWindow")?.classList.contains("hidden"))renderHeader();if($("vcJackpotTeaserAmt"))$("vcJackpotTeaserAmt").textContent=loadJackpot()});
  if($("vcJackpotTeaserAmt"))$("vcJackpotTeaserAmt").textContent=loadJackpot();
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();

window.VipCasinoApp={open:openCasino,close:closeCasino,stats:loadStats,jackpot:loadJackpot};
})();
