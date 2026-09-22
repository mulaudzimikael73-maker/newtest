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
function defaultStats(){return{spins:0,wins:0,losses:0,totalWagered:0,totalWon:0,biggestWin:0,streakType:null,streakCount:0,bestWinStreak:0,bestLossStreak:0,jackpots:0,rareJackpots:0,straightWins:0,achievements:{},spinsByMode:{classic:0,deluxe:0,roulette:0}}}
function loadStats(){const s=read(STATS_KEY,null);return s?{...defaultStats(),...s,achievements:{...(s.achievements||{})},spinsByMode:{...defaultStats().spinsByMode,...(s.spinsByMode||{})}}:defaultStats()}
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
 {id:"wheel_spinner",emoji:"🎡",title:"Wheel Spinner",desc:"Play 20 Roulette spins.",flavor:"20 spins on the wheel. The table knows you by name now.",check:s=>(s.spinsByMode?.roulette||0)>=20},
 {id:"straight_shooter",emoji:"🎯",title:"Dead Centre",desc:"Hit a straight-up number in Roulette.",flavor:"You called a single number out of 37 and it landed. I have questions about your luck in general.",check:s=>s.straightWins>=1},
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
const ROULETTE_LINES={
 loss:[
  "The ball drops, bounces around like it can't commit to a decision, and lands on nothing you bet on. Relatable.",
  "Wrong number. The wheel has spoken, and unlike me, it does not care about your feelings.",
  "Nope. Not your colour, not your number, not your night, apparently.",
  "The ball landed somewhere you definitely didn't call. I'd say better luck next spin, but I make no promises.",
  "That's a miss. The table remains undefeated.",
  "No dice — well, no ball, technically. Still a loss.",
 ],
 small:[
  "Even money pays out. Not dramatic, just correct. I respect efficiency.",
  "That covered half the wheel and it still worked. Solid, unglamorous, effective.",
  "Small win on the outside bet. Very 'minimum wage energy' but I'll allow it.",
  "You doubled your bet. Nobody's writing songs about it, but nobody's mad either.",
 ],
 big:[
  "Dozen/column hit! Three-to-one payout, and suddenly you look like you know what you're doing.",
  "That's a proper roulette win. I'm mildly suspicious of how calm you're being about it.",
  "Big payout on the outside bet. The table is starting to fear you, as it should.",
 ],
 jackpot:[
  "STRAIGHT UP HIT. One number out of thirty-seven and you called it. I need a minute.",
  "The ball landed EXACTLY where you put your chip. Out of 37 numbers. I'm actually shaken.",
  "Single-number hit at 35 to 1. That's not luck, that's a personal vendetta against the house.",
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

// 🎡 Roulette — single-zero European wheel
const ROULETTE_ORDER=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const RED_NUMBERS=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
function colorOf(n){return n===0?"green":RED_NUMBERS.has(n)?"red":"black"}
function spinRoulette(){
  const idx=Math.floor(Math.random()*ROULETTE_ORDER.length);
  const number=ROULETTE_ORDER[idx];
  return{idx,number,color:colorOf(number)};
}
// selectedBet shape: {type:"straight"|"color"|"parity"|"range"|"dozen"|"column", value}
function evaluateRouletteBet(bet,number,color){
  if(!bet)return{tier:"loss",mult:0,straight:false};
  if(bet.type==="straight")return number===bet.value?{tier:"jackpot",mult:36,straight:true}:{tier:"loss",mult:0,straight:false};
  if(number===0)return{tier:"loss",mult:0,straight:false}; // 0 loses every outside bet
  if(bet.type==="color")return color===bet.value?{tier:"small",mult:2,straight:false}:{tier:"loss",mult:0,straight:false};
  if(bet.type==="parity"){const p=number%2===0?"even":"odd";return p===bet.value?{tier:"small",mult:2,straight:false}:{tier:"loss",mult:0,straight:false}}
  if(bet.type==="range"){const r=number<=18?"low":"high";return r===bet.value?{tier:"small",mult:2,straight:false}:{tier:"loss",mult:0,straight:false}}
  if(bet.type==="dozen"){const d=Math.ceil(number/12);return d===bet.value?{tier:"big",mult:3,straight:false}:{tier:"loss",mult:0,straight:false}}
  if(bet.type==="column"){const c=((number-1)%3)+1;return c===bet.value?{tier:"big",mult:3,straight:false}:{tier:"loss",mult:0,straight:false}}
  return{tier:"loss",mult:0,straight:false};
}
function betLabel(bet){
  if(!bet)return"No bet selected";
  if(bet.type==="straight")return`Straight Up: ${bet.value}`;
  if(bet.type==="color")return bet.value==="red"?"Red":"Black";
  if(bet.type==="parity")return bet.value==="odd"?"Odd":"Even";
  if(bet.type==="range")return bet.value==="low"?"1–18":"19–36";
  if(bet.type==="dozen")return`${["","1st","2nd","3rd"][bet.value]} 12 (${bet.value===1?"1-12":bet.value===2?"13-24":"25-36"})`;
  if(bet.type==="column")return`Column ${bet.value}`;
  return"No bet selected";
}

/* ---------- state ---------- */
let currentTab="classic",betAmt=10,rouletteBet=null,rouletteSpinning=false;
const BET_STEPS=[5,10,25,50,100];

function streakLabel(s){
  if(!s.streakType||!s.streakCount)return"–";
  return s.streakType==="win"?`🔥 ${s.streakCount} win streak`:`🥶 ${s.streakCount} loss streak`;
}

function applyOutcome(mode,bet,out){
  const s=loadStats();let jackpot=loadJackpot();
  s.spins++;s.totalWagered+=bet;
  s.spinsByMode[mode]=(s.spinsByMode[mode]||0)+1;
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
    if(out.straight)s.straightWins=(s.straightWins||0)+1;
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

function buildWheelGradient(){
  const seg=360/ROULETTE_ORDER.length;
  const stops=ROULETTE_ORDER.map((n,i)=>{
    const c=colorOf(n)==="red"?"#c1272d":colorOf(n)==="black"?"#141414":"#2e7d32";
    return `${c} ${(i*seg).toFixed(3)}deg ${((i+1)*seg).toFixed(3)}deg`;
  });
  return `conic-gradient(from 0deg, ${stops.join(",")})`;
}
function numberGridHtml(){
  return `<div class="vcRouletteGrid">${Array.from({length:37},(_,n)=>n).map(n=>{
    const active=rouletteBet&&rouletteBet.type==="straight"&&rouletteBet.value===n?" active":"";
    return `<button type="button" class="vcNumBtn vcNum-${colorOf(n)}${active}" data-bet-type="straight" data-bet-value="${n}">${n}</button>`;
  }).join("")}</div>`;
}
function outsideBetsHtml(){
  const b=(type,value,label,cls)=>{
    const active=rouletteBet&&rouletteBet.type===type&&String(rouletteBet.value)===String(value)?" active":"";
    return `<button type="button" class="vcOutBtn ${cls||""}${active}" data-bet-type="${type}" data-bet-value="${value}">${label}</button>`;
  };
  return `<div class="vcOutsideBets">
    ${b("dozen",1,"1st 12")}${b("dozen",2,"2nd 12")}${b("dozen",3,"3rd 12")}
    ${b("column",1,"Col 1")}${b("column",2,"Col 2")}${b("column",3,"Col 3")}
    ${b("range","low","1–18")}${b("parity","even","Even")}${b("color","red","Red","vcOutRed")}${b("color","black","Black","vcOutBlack")}${b("parity","odd","Odd")}${b("range","high","19–36")}
  </div>`;
}
function rouletteOdds(){
  return `<table class="vcPayTable"><tr><th>Bet</th><th>Pays</th><th>Odds</th></tr>
  <tr><td>Straight Up (single number)</td><td>36× (35 to 1)</td><td>1 in 37</td></tr>
  <tr><td>Dozen (1st/2nd/3rd 12) or Column</td><td>3× (2 to 1)</td><td>12 in 37</td></tr>
  <tr><td>Red/Black, Odd/Even, 1–18/19–36</td><td>2× (even money)</td><td>18 in 37</td></tr>
  <tr><td colspan="3">0 is green and loses every bet except a straight bet placed on 0 itself.</td></tr></table>`;
}
function rouletteHtml(){
  return `<div class="vcMachine vcRouletteMachine">
    <div class="vcWheelWrap">
      <div class="vcWheelPointer">▼</div>
      <div class="vcWheel" id="vcWheel" style="background:${buildWheelGradient()}"></div>
    </div>
    <div class="vcResultLine" id="vcResultR">Pick a bet below, then spin the wheel.</div>
    <div class="vcBetSelected">Betting on: <b id="vcBetLabel">${esc(betLabel(rouletteBet))}</b></div>
    <div class="vcBetRow"><span>Bet:</span>${chipRow("vcBetChipsR")}<div class="vcCurrentBet">Selected: <b id="vcBetAmtR">${betAmt}</b> MB</div></div>
    <button type="button" class="vcSpinBtn" id="vcSpinR">🎡 SPIN THE WHEEL</button>
    <div class="vcBoardLabel">Table — tap a number or an outside bet</div>
    <div class="vcRouletteGridWrap">${numberGridHtml()}</div>
    ${outsideBetsHtml()}
    <details class="vcPaytable"><summary>Odds &amp; Payouts</summary>${rouletteOdds()}</details>
  </div>`;
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
    <h3>🎡 Roulette</h3>
    <p>A single-zero European wheel — 37 pockets (0–36). Pick a bet before you spin: a straight-up number pays 36× (odds 1 in 37), a Dozen or Column pays 3×, and the even-money outside bets (Red/Black, Odd/Even, 1–18/19–36) pay 2×. Green 0 loses every outside bet, and only wins if you bet straight-up on 0 itself. Tap a number or an outside bet to select it — your current selection is shown above the board — then spin.</p>
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
  else if(currentTab==="roulette")host.innerHTML=rouletteHtml();
  else if(currentTab==="achievements")host.innerHTML=achievementsHtml();
  else host.innerHTML=howtoHtml();
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
      <button type="button" class="vcTabBtn ${currentTab==="roulette"?"active":""}" data-tab="roulette">🎡 Roulette</button>
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
  bindRootDelegation();
}

let rootDelegationBound=false;
function bindRootDelegation(){
  if(rootDelegationBound)return; // #vcRoot itself is never replaced (only its children), so one listener is enough forever
  rootDelegationBound=true;
  const root=$("vcRoot");if(!root)return;
  root.addEventListener("click",e=>{
    try{
      const chip=e.target.closest(".vcChip");
      if(chip){
        e.preventDefault();e.stopPropagation();
        betAmt=chip.dataset.bet==="max"?Math.max(1,Math.min(wallet(),500)):Number(chip.dataset.bet);
        if($("vcBetAmt3"))$("vcBetAmt3").textContent=betAmt;
        if($("vcBetAmt5"))$("vcBetAmt5").textContent=betAmt;
        if($("vcBetAmtR"))$("vcBetAmtR").textContent=betAmt;
        return;
      }
      const betBtn=e.target.closest("[data-bet-type]");
      if(betBtn){
        e.preventDefault();e.stopPropagation();
        if(rouletteSpinning)return;
        const type=betBtn.dataset.betType,raw=betBtn.dataset.betValue;
        const value=(type==="straight"||type==="dozen"||type==="column")?Number(raw):raw;
        rouletteBet={type,value};
        root.querySelectorAll("[data-bet-type]").forEach(x=>x.classList.remove("active"));
        root.querySelectorAll(`[data-bet-type="${type}"][data-bet-value="${raw}"]`).forEach(x=>x.classList.add("active"));
        if($("vcBetLabel"))$("vcBetLabel").textContent=betLabel(rouletteBet);
        return;
      }
      if(e.target.closest("#vcSpin3")){e.preventDefault();e.stopPropagation();doSpin("classic");return}
      if(e.target.closest("#vcSpin5")){e.preventDefault();e.stopPropagation();doSpin("deluxe");return}
      if(e.target.closest("#vcSpinR")){e.preventDefault();e.stopPropagation();doRouletteSpin();return}
    }catch(err){
      console.error("VIP Casino click handler error:",err);
    }
  });
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
      try{
        const out=mode==="classic"?spin3(betAmt):spin5(betAmt);
        cells.forEach((c,i)=>c.textContent=out.reels[i]);
        cells.forEach(c=>{c.classList.remove("vcPulse");void c.offsetWidth;c.classList.add("vcPulse")});
        const res=applyOutcome(mode,betAmt,out);
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
      }catch(err){
        console.error("VIP Casino slot spin error:",err);
        resultEl.textContent="Something went wrong reading that spin — your bet was refunded.";
        setWallet(wallet()+betAmt);
        renderHeader();
      }finally{
        btn.disabled=false;
      }
    }
  },70);
}

function doRouletteSpin(){
  if(!unlocked())return;
  const btn=$("vcSpinR");if(!btn||btn.disabled)return;
  const resultEl=$("vcResultR");
  if(!rouletteBet){resultEl.textContent="Pick a bet first — a number, or one of the red/black/odd/even/dozen/column bets below.";return}
  if(wallet()<betAmt){resultEl.textContent=`😭 ${pick(LINES.broke)}`;return}
  btn.disabled=true;rouletteSpinning=true;
  setWallet(wallet()-betAmt);
  renderHeader();
  const wheelEl=$("vcWheel");
  const{idx,number,color}=spinRoulette();
  const seg=360/ROULETTE_ORDER.length;
  const extraSpins=6+Math.floor(Math.random()*3); // 6–8 full spins for drama
  const targetDeg=extraSpins*360+(360-(idx*seg+seg/2));
  if(wheelEl){
    wheelEl.style.transition="none";
    wheelEl.style.transform="rotate(0deg)";
    void wheelEl.offsetWidth;
    wheelEl.style.transition="transform 3.2s cubic-bezier(.17,.67,.16,1)";
    wheelEl.style.transform=`rotate(${targetDeg}deg)`;
  }
  resultEl.textContent="🎡 Spinning...";
  setTimeout(()=>{
    try{
      const out=evaluateRouletteBet(rouletteBet,number,color);
      const res=applyOutcome("roulette",betAmt,out);
      const colorEmoji=color==="red"?"🔴":color==="black"?"⚫":"🟢";
      resultEl.innerHTML=out.tier==="loss"
        ? `Ball landed on <b>${number} ${colorEmoji}</b>. ${esc(pick(ROULETTE_LINES.loss))}`
        : `Ball landed on <b>${number} ${colorEmoji}</b>. <b>+${res.payout} MB</b> — ${esc(pick(ROULETTE_LINES[out.tier]))}`;
      if(res.wonJackpotPool)rareOverlay(res.payout);
      else if(out.tier==="jackpot"&&window.confetti)window.confetti({particleCount:100,spread:90,origin:{y:0.5},colors:["#ffd700","#c1272d","#ffffff"]});
      else if(out.tier==="big"&&window.confetti)window.confetti({particleCount:50,spread:70,origin:{y:0.6}});
      res.newlyUnlocked.forEach(a=>{
        toast(`<b>${a.emoji} ${esc(a.title)}</b><p>${esc(a.flavor)}</p>`,"vcAchToast");
        notify(`🏆 VIP CASINO ACHIEVEMENT — ${a.title}`,a.desc,{achievement:a.id});
      });
      if(out.tier!=="loss"){
        notify(`🎡 VIP CASINO ROULETTE ${out.tier==="jackpot"?"STRAIGHT-UP WIN":"WIN"}`,
          `Bet: ${betLabel(rouletteBet)}\nWager: ${betAmt} MB\nWinning number: ${number} (${color})\nPayout: +${res.payout} MB\nBalance: ${wallet()} MB`,
          {bet:betLabel(rouletteBet),wager:betAmt,number,color,payout:res.payout,balance:wallet()});
      }
      renderHeader();
    }catch(err){
      console.error("VIP Casino roulette spin error:",err);
      resultEl.textContent="Something went wrong reading that spin — your bet was refunded.";
      setWallet(wallet()+betAmt);
      renderHeader();
    }finally{
      btn.disabled=false;rouletteSpinning=false;
    }
  },3300);
}

/* ---------- open/close ---------- */
function openCasino(){
  if(!unlocked())return;
  $("vipCasinoWindow")?.classList.remove("hidden");
  renderRoot();
}
function closeCasino(){$("vipCasinoWindow")?.classList.add("hidden")}

/* ---------- styles (self-contained, no edits to style.css needed) ---------- */
function injectFont(){
  if(document.getElementById("vcFont"))return;
  const link=document.createElement("link");
  link.id="vcFont";link.rel="stylesheet";
  link.href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&display=swap";
  document.head.appendChild(link);
}

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

  .vcWindow{background:radial-gradient(circle at 50% -10%,#2a1240,#0a0512 70%)!important;border:1px solid #f4c43055!important;color:#f4ecff;width:min(1180px,96vw)!important;max-height:95vh!important}
  .vcWindow .windowScroll{max-height:calc(95vh - 140px)!important;padding:32px!important}
  .vcWindow,.vcWindow *{font-family:'Poppins',sans-serif}
  .vcWindow .windowTop h2,.vcJackpotBig,.vcRareInner h1,.vcTeaserTop h3,.vcBalance{font-family:'Cinzel',serif!important}
  .vcWindow .windowTop{background:linear-gradient(90deg,#1a0f2e,#2c1547);border-bottom:1px solid #f4c43044;position:relative;overflow:hidden}
  .vcWindow .windowTop::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,#ffd70099 0 6px,transparent 6px 16px);opacity:.5;animation:vcMarquee 2.4s linear infinite;height:2px;top:auto;bottom:0}
  @keyframes vcMarquee{0%{transform:translateX(0)}100%{transform:translateX(22px)}}
  .vcWindow .windowTop h2{color:#ffd700;text-shadow:0 0 14px #f4c43077;letter-spacing:.03em}
  .vcWindow .windowCloseButton{background:linear-gradient(120deg,#f4c430,#b388ff);color:#150a22;border:0;border-radius:12px;font-weight:900}

  .vcHeader{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding:18px 20px;border-radius:18px;background:linear-gradient(135deg,#ffffff10,#ffffff05);border:1px solid #f4c43044;margin-bottom:18px;box-shadow:inset 0 0 30px #00000033}
  .vcBalance{font-weight:900;font-size:1.3rem;color:#ffe27a}
  .vcJackpotBig{text-align:center;font-weight:900;color:#ffd700;text-shadow:0 0 18px #f4c43099;line-height:1.25}
  .vcJackpotBig span{font-size:1.9rem}

  .vcStatsRow{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px}
  .vcStatsRow div{background:#ffffff08;border:1px solid #ffffff14;border-radius:14px;padding:12px 8px;text-align:center}
  .vcStatsRow small{display:block;opacity:.65;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase}
  .vcStatsRow b{font-size:1.2rem;color:#ffe27a}

  .vcTabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}
  .vcTabBtn{flex:1 1 auto;padding:12px 12px;border-radius:12px;border:1px solid #f4c43033;background:#ffffff08;color:#f4ecff;font-weight:800;font-size:13px;cursor:pointer;transition:transform .12s ease}
  .vcTabBtn:hover{transform:translateY(-2px)}
  .vcTabBtn.active{background:linear-gradient(120deg,#f4c430,#b388ff);color:#150a22}

  .vcMachine{position:relative;background:
      repeating-linear-gradient(135deg,#00000010 0 2px,transparent 2px 14px),
      radial-gradient(circle at 50% 0%,#2a1442,#1b0e2c 55%,#0c0616);
    border:1px solid #f4c43044;border-radius:22px;padding:26px 22px;text-align:center;
    box-shadow:inset 0 0 60px #00000055,0 20px 50px #00000044}
  .vcMachine::before,.vcMachine::after{content:"";position:absolute;width:34px;height:34px;border:2px solid #f4c43066;opacity:.8}
  .vcMachine::before{top:10px;left:10px;border-right:0;border-bottom:0;border-radius:10px 0 0 0}
  .vcMachine::after{bottom:10px;right:10px;border-left:0;border-top:0;border-radius:0 0 10px 0}
  .vcReels{display:flex;justify-content:center;gap:14px;margin-bottom:16px}
  .vcReel{width:76px;height:76px;display:flex;align-items:center;justify-content:center;font-size:38px;border-radius:14px;background:#000000aa;border:2px solid #f4c43055;box-shadow:inset 0 0 18px #000000aa,0 4px 14px #00000055}
  .vcPulse{animation:vcPulse .5s ease}
  @keyframes vcPulse{0%{transform:scale(1.25);filter:brightness(1.8)}100%{transform:scale(1);filter:brightness(1)}}
  .vcResultLine{min-height:22px;margin:8px 0 16px;font-weight:700;color:#ffe27a;font-size:14.5px}
  .vcBetRow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;margin-bottom:16px;font-size:13px}
  .vcChipsRow{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
  .vcChip{width:52px;height:52px;border-radius:50%;cursor:pointer;color:#ffd700;font-weight:900;font-size:11.5px;position:relative;
    border:2px dashed #ffd700bb;
    background:radial-gradient(circle at 35% 30%,#4a2570,#150a22 70%);
    box-shadow:0 5px 14px #00000066,inset 0 0 0 5px #150a22,inset 0 0 0 6px #ffd70044;
    transition:transform .15s ease}
  .vcChip:hover{transform:translateY(-3px)}
  .vcChip:active{transform:translateY(0) scale(.95)}
  .vcChipMax{border-color:#ff6ec7bb;box-shadow:0 5px 14px #00000066,inset 0 0 0 5px #150a22,inset 0 0 0 6px #ff6ec744}
  .vcCurrentBet b{color:#ffd700}
  .vcSpinBtn{border:0;border-radius:16px;padding:17px 24px;font-weight:900;font-size:16px;letter-spacing:.03em;cursor:pointer;background:linear-gradient(120deg,#ffd700,#ff6ec7,#b388ff,#ffd700);background-size:300% auto;animation:vcShine 5s linear infinite;color:#150a22;box-shadow:0 10px 28px #00000066;width:min(360px,100%)}
  @keyframes vcShine{0%{background-position:0% 50%}100%{background-position:300% 50%}}
  .vcSpinBtn:disabled{opacity:.55;cursor:not-allowed;animation:none}
  .vcBoardLabel{margin:18px 0 10px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#ffd70099;font-weight:800}
  .vcPaytable{margin-top:16px;text-align:left}
  .vcPaytable summary{cursor:pointer;color:#ffd700;font-weight:800}
  .vcPayTable{width:100%;border-collapse:collapse;margin-top:8px;font-size:12.5px}
  .vcPayTable td,.vcPayTable th{padding:7px 9px;border-bottom:1px solid #ffffff14;text-align:left}

  .vcRouletteMachine{padding-top:30px}
  .vcWheelWrap{position:relative;display:flex;justify-content:center;margin-bottom:18px}
  .vcWheelPointer{position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:24px;color:#ffd700;text-shadow:0 0 10px #f4c43099;z-index:2}
  .vcWheel{width:260px;height:260px;border-radius:50%;border:7px solid #f4c430;box-shadow:0 0 0 3px #150a22,0 0 50px #f4c43055,inset 0 0 34px #000000aa;position:relative}
  .vcWheel::after{content:"";position:absolute;inset:36%;border-radius:50%;background:radial-gradient(circle at 35% 30%,#3a1d5c,#150a22);border:2px solid #ffd70099;box-shadow:0 0 20px #00000088}
  .vcBetSelected{margin-bottom:4px;font-size:14px;color:#e8dcff}
  .vcBetSelected b{color:#ffd700}
  .vcRouletteGridWrap{overflow-x:auto;margin-bottom:12px;padding-bottom:4px}
  .vcRouletteGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(38px,1fr));gap:5px;min-width:420px}
  .vcNumBtn{height:38px;border-radius:8px;border:1px solid #ffffff22;font-weight:800;font-size:12.5px;cursor:pointer;color:#fff;transition:transform .1s ease}
  .vcNumBtn:hover{transform:translateY(-2px)}
  .vcNum-red{background:linear-gradient(160deg,#d6323a,#901219)}
  .vcNum-black{background:linear-gradient(160deg,#242424,#080808)}
  .vcNum-green{background:linear-gradient(160deg,#379452,#134d24)}
  .vcNumBtn.active,.vcOutBtn.active{outline:3px solid #ffd700;outline-offset:1px;box-shadow:0 0 14px #ffd70088}
  .vcOutsideBets{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-bottom:16px}
  .vcOutBtn{padding:10px 14px;border-radius:10px;border:1px solid #f4c43033;background:#ffffff0d;color:#f4ecff;font-weight:800;font-size:12.5px;cursor:pointer;transition:transform .1s ease}
  .vcOutBtn:hover{transform:translateY(-2px)}
  .vcOutRed{background:linear-gradient(160deg,#d6323a66,#90121966);border-color:#c1272d}
  .vcOutBlack{background:linear-gradient(160deg,#24242477,#08080877);border-color:#ffffff33}

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
  injectFont();
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
