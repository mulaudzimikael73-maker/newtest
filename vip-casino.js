"use strict";
/* =========================================================
   LIZZYOS — VIP CASINO (lives inside the VIP folder)
   Self-contained: injects its own styles + markup into
   #vipFolderUnlockedView. Only needs one script tag:
   <script src="vip-casino.js?v=20260921-vip-casino"></script>
   placed AFTER vip-folder.js in index.html.
   ========================================================= */
(() => {
const WALLET = "lizzyMickyBucsV1";
const STATE  = "lizzyVipCasinoV1";
const WORKER = () => window.LIZZY_TELEGRAM_WORKER_URL || "https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const $ = id => document.getElementById(id);

const read = (k, f) => { try { const v = localStorage.getItem(k); return v === null ? f : JSON.parse(v); } catch (e) { return f; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const wallet = () => Math.max(0, Math.floor(Number(localStorage.getItem(WALLET) || 0)));
const setWallet = n => { localStorage.setItem(WALLET, String(Math.max(0, Math.floor(Number(n) || 0)))); window.dispatchEvent(new Event("lizzyStoreRefresh")); };

function defaultState(){
  return {
    version: 1,
    chips: 0,
    spins: 0,
    wins: 0,
    losses: 0,
    biggestWin: 0,
    streak: 0,          // positive = win streak, negative = loss streak
    bestStreak: 0,
    totalWon: 0,
    totalWagered: 0,
    jackpot: 250,       // chips in the pot
    jackpotsHit: 0,
    vipJackpotsHit: 0,
    achievements: {}
  };
}
let S = Object.assign(defaultState(), read(STATE, {}));
S.achievements = S.achievements || {};
const save = () => write(STATE, S);

/* ---------- Lizzy & Mikael commentary ---------- */
const WIN_LINES = [
  "Mikael: okay that was luck, not skill. Say it with me.",
  "Mikael: I am legally obliged to say congratulations. Consider it said.",
  "Mikael: winning again? The machine clearly has a crush on you too.",
  "Mikael: fine. FINE. You're good at this. I hate it here.",
  "Mikael: don't spend it all on seeds. Spend some of it on seeds.",
  "Mikael: screenshot it, nobody will believe you.",
  "Mikael: the house always wins. The house is currently very confused."
];
const BIG_WIN_LINES = [
  "Mikael: WHAT. Ma'am. MA'AM. Put the machine down.",
  "Mikael: this is the part where security walks over politely.",
  "Mikael: I built this casino and you are robbing it in front of me.",
  "Mikael: big win. Big ego incoming. I'll allow it this once."
];
const JACKPOT_LINES = [
  "Mikael: JACKPOT?! I'm calling my lawyer. I'm calling YOUR lawyer.",
  "Mikael: the jackpot broke. You broke it. My love, you broke my casino."
];
const VIP_JACKPOT_LINES = [
  "Mikael: 💎 VIP JACKPOT. I'm crying in the staff room. Take everything.",
  "Mikael: this has never happened. Statistically you don't exist. Iconic."
];
const LOSS_LINES = [
  "Mikael: brutal. But you looked great losing it.",
  "Mikael: the reels said no. I said nothing. I'm being supportive.",
  "Mikael: that's a loss, Little Miss Attitude. Breathe.",
  "Mikael: don't glare at me, I only built the thing.",
  "Mikael: the chips are gone but the attitude remains. Balanced.",
  "Mikael: we call that a donation to the Mikael Retirement Fund.",
  "Mikael: nearly. And nearly buys exactly nothing. Spin again."
];
const STREAK_LOSS_LINES = [
  "Mikael: okay that's three in a row, maybe the machine needs a talking to.",
  "Mikael: losing streak detected. Emotional support on standby ❤️"
];
const pick = a => a[Math.floor(Math.random() * a.length)];

/* ---------- Slot symbols & paytable ---------- */
// weight = how often it shows up (higher = more common)
const SYMBOLS = [
  { id:"cherry",  emoji:"🍒", name:"Cherry",        weight:26, pay3:3,   pay5:6 },
  { id:"lemon",   emoji:"🍋", name:"Lemon",         weight:24, pay3:4,   pay5:8 },
  { id:"tulip",   emoji:"🌷", name:"Tulip",         weight:20, pay3:6,   pay5:14 },
  { id:"bell",    emoji:"🔔", name:"Bell",          weight:14, pay3:10,  pay5:25 },
  { id:"heart",   emoji:"❤️", name:"Lizzy Heart",   weight:9,  pay3:18,  pay5:45 },
  { id:"seven",   emoji:"7️⃣", name:"Lucky Seven",   weight:5,  pay3:35,  pay5:90 },
  { id:"crown",   emoji:"👑", name:"VIP Crown",     weight:2.5,pay3:70,  pay5:200 },
  { id:"diamond", emoji:"💎", name:"VIP Diamond",   weight:1,  pay3:"JACKPOT", pay5:"VIP JACKPOT" }
];
const TOTAL_WEIGHT = SYMBOLS.reduce((a, s) => a + s.weight, 0);
function spinSymbol(){
  let r = Math.random() * TOTAL_WEIGHT;
  for (const s of SYMBOLS){ r -= s.weight; if (r <= 0) return s; }
  return SYMBOLS[0];
}

/* ---------- Achievements ---------- */
const ACHIEVEMENTS = [
  { id:"highRoller",  emoji:"🤑", name:"HIGH ROLLER",     desc:"Win 1,000 MB in the VIP Casino.",       test:s => s.totalWon >= 1000 },
  { id:"firstSpin",   emoji:"🎰", name:"FIRST SPIN",      desc:"Spin the VIP slots once.",              test:s => s.spins >= 1 },
  { id:"luckyStreak", emoji:"🔥", name:"ON FIRE",         desc:"Win 5 spins in a row.",                 test:s => s.bestStreak >= 5 },
  { id:"bigSpender",  emoji:"💸", name:"BIG SPENDER",     desc:"Wager 500 chips in total.",             test:s => s.totalWagered >= 500 },
  { id:"jackpotJoy",  emoji:"🏆", name:"JACKPOT QUEEN",   desc:"Hit the jackpot once.",                 test:s => s.jackpotsHit >= 1 },
  { id:"vipLegend",   emoji:"💎", name:"VIP LEGEND",      desc:"Hit the rare VIP jackpot.",             test:s => s.vipJackpotsHit >= 1 },
  { id:"oneBigWin",   emoji:"🌟", name:"ONE LUCKY SPIN",  desc:"Win 200 MB from a single spin.",        test:s => s.biggestWin >= 200 },
  { id:"veteran",     emoji:"🎲", name:"CASINO REGULAR",  desc:"Play 100 spins.",                       test:s => s.spins >= 100 }
];
function checkAchievements(){
  const unlockedNow = [];
  ACHIEVEMENTS.forEach(a => {
    if (!S.achievements[a.id] && a.test(S)){
      S.achievements[a.id] = new Date().toISOString();
      unlockedNow.push(a);
    }
  });
  if (unlockedNow.length){
    save();
    unlockedNow.forEach(a => notify(`${a.emoji} VIP CASINO ACHIEVEMENT`, a.name, `${a.name}\n${a.desc}`, { achievement:a.name }));
    const host = $("vipCasinoAchievementToast");
    if (host){
      host.textContent = `${unlockedNow[0].emoji} ACHIEVEMENT UNLOCKED — ${unlockedNow[0].name}`;
      host.classList.remove("hidden");
      setTimeout(() => host.classList.add("hidden"), 5000);
    }
    if (typeof confetti === "function") confetti({ particleCount:120, spread:100, origin:{ y:.7 } });
  }
}

function notify(title, body, detail, extra){
  setTimeout(() => { try {
    fetch(WORKER(), { method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ type:"vip_casino", title, body, message:detail, ...extra, createdAt:new Date().toISOString() }) }).catch(()=>{});
  } catch(e){} }, 0);
}

/* ---------- Styles ---------- */
function injectStyles(){
  if ($("vipCasinoStyles")) return;
  const css = document.createElement("style");
  css.id = "vipCasinoStyles";
  css.textContent = `
#vipCasino{text-align:left;margin-top:22px;padding:22px;border-radius:26px;color:#fff;
  background:radial-gradient(120% 120% at 15% 0%,#3b0d52 0%,#210a3a 45%,#10061f 100%);
  border:1px solid #f5d67a55;box-shadow:0 24px 70px #000a, inset 0 0 60px #f5d67a12}
#vipCasino h3{margin:0;font-size:24px;letter-spacing:.04em;background:linear-gradient(135deg,#f9e7a8,#d4a53a 55%,#f9e7a8);-webkit-background-clip:text;background-clip:text;color:transparent}
#vipCasino .vcKicker{letter-spacing:.2em;font-size:11px;font-weight:900;color:#f3d38a;opacity:.9}
#vipCasino .vcRow{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:14px}
#vipCasino .vcStats{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-top:16px}
#vipCasino .vcStat{padding:12px 14px;border-radius:16px;background:#ffffff0f;border:1px solid #f5d67a2e}
#vipCasino .vcStat small{display:block;font-size:10px;letter-spacing:.14em;opacity:.7;font-weight:900}
#vipCasino .vcStat b{font-size:20px}
#vipCasinoJackpot{margin-top:16px;padding:16px;border-radius:20px;text-align:center;font-weight:900;
  background:linear-gradient(135deg,#4c1d95,#a855f7 60%,#f0abfc);border:1px solid #ffffff44;box-shadow:0 0 34px #a855f766}
#vipCasinoJackpot span{display:block;font-size:30px;letter-spacing:.03em}
#vipCasino .vcReels{display:flex;gap:10px;justify-content:center;margin:18px 0 6px;flex-wrap:wrap}
#vipCasino .vcReel{width:68px;height:78px;display:grid;place-items:center;font-size:38px;border-radius:18px;
  background:#0d0418;border:1px solid #f5d67a55;box-shadow:inset 0 0 22px #f5d67a1f}
#vipCasino .vcReel.spinning{animation:vcSpin .32s linear infinite}
@keyframes vcSpin{0%{transform:translateY(-6px);opacity:.55}50%{transform:translateY(6px);opacity:1}100%{transform:translateY(-6px);opacity:.55}}
#vipCasino .vcReel.hit{border-color:#fff;box-shadow:0 0 26px #f9e7a8cc}
#vipCasino button{border:0;border-radius:14px;padding:12px 18px;font-weight:900;cursor:pointer;font-size:14px;
  background:linear-gradient(135deg,#f9e7a8,#d4a53a);color:#2a1006}
#vipCasino button.vcGhost{background:#ffffff14;color:#fff;border:1px solid #f5d67a44}
#vipCasino button:disabled{opacity:.42;cursor:not-allowed}
#vipCasino .vcBetGroup{display:flex;gap:8px;flex-wrap:wrap}
#vipCasino .vcBetGroup button.active{outline:2px solid #fff}
#vipCasinoResult{margin-top:14px;padding:14px 16px;border-radius:18px;background:#ffffff10;border:1px solid #ffffff22;min-height:58px}
#vipCasinoResult .vcPayout{font-size:20px;font-weight:900}
#vipCasinoResult .vcTalk{margin-top:6px;opacity:.9;font-style:italic;font-size:13px}
#vipCasinoAchievements{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin-top:12px}
#vipCasino .vcAch{padding:12px;border-radius:16px;background:#ffffff0c;border:1px solid #ffffff20;opacity:.5}
#vipCasino .vcAch.done{opacity:1;border-color:#f5d67a88;background:#f5d67a17}
#vipCasino .vcAch b{display:block;font-size:13px}
#vipCasino .vcAch small{opacity:.75;font-size:11px}
#vipCasinoAchievementToast{margin-top:12px;padding:12px;border-radius:16px;text-align:center;font-weight:900;
  background:linear-gradient(135deg,#f9e7a8,#d4a53a);color:#2a1006}
#vipCasino details{margin-top:16px;padding:14px 16px;border-radius:18px;background:#ffffff0c;border:1px solid #ffffff22}
#vipCasino summary{cursor:pointer;font-weight:900}
#vipCasino table{width:100%;border-collapse:collapse;margin-top:10px;font-size:13px}
#vipCasino td,#vipCasino th{padding:6px 4px;border-bottom:1px solid #ffffff18;text-align:left}
#vipCasino .vcChipLine{font-weight:900;font-size:15px}
@media(max-width:650px){#vipCasino{padding:16px}#vipCasino .vcReel{width:54px;height:64px;font-size:30px}}
  `;
  document.head.appendChild(css);
}

/* ---------- Markup ---------- */
function injectMarkup(){
  const host = $("vipFolderUnlockedView");
  if (!host || $("vipCasino")) return;
  const wrap = document.createElement("div");
  wrap.id = "vipCasino";
  wrap.innerHTML = `
    <div class="vcKicker">LIZZYOS EXCLUSIVE</div>
    <h3>🎰 THE VIP CASINO</h3>
    <p class="vcChipLine">VIP Chips: <span id="vipCasinoChips">0</span> · Micky Bucs: <span id="vipCasinoWallet">0</span> MB</p>

    <div class="vcRow">
      <button type="button" id="vipCasinoBuy10">Buy 10 chips (10 MB)</button>
      <button type="button" id="vipCasinoBuy50">Buy 50 chips (50 MB)</button>
      <button type="button" class="vcGhost" id="vipCasinoCashOut">Cash out chips → MB</button>
    </div>

    <div id="vipCasinoJackpot">
      🏆 JACKPOT POT<span id="vipCasinoJackpotValue">0</span><small id="vipCasinoJackpotHits"></small>
    </div>

    <div class="vcReels" id="vipCasinoReels"></div>

    <div class="vcRow">
      <div class="vcBetGroup" id="vipCasinoMode">
        <button type="button" data-mode="3" class="vcGhost active">3-Reel Classic</button>
        <button type="button" data-mode="5" class="vcGhost">5-Reel VIP</button>
      </div>
    </div>
    <div class="vcRow">
      <span class="vcKicker">BET</span>
      <div class="vcBetGroup" id="vipCasinoBets">
        <button type="button" data-bet="1" class="vcGhost active">1</button>
        <button type="button" data-bet="5" class="vcGhost">5</button>
        <button type="button" data-bet="10" class="vcGhost">10</button>
        <button type="button" data-bet="25" class="vcGhost">25</button>
      </div>
      <button type="button" id="vipCasinoSpin">SPIN 🎰</button>
    </div>

    <div id="vipCasinoResult">
      <div class="vcPayout">Place a bet and spin, Garden Boss.</div>
      <div class="vcTalk">Mikael: house rules — no crying, no bribing the machine.</div>
    </div>

    <div class="vcStats" id="vipCasinoStats"></div>

    <div class="vcKicker" style="margin-top:18px">VIP CASINO ACHIEVEMENTS</div>
    <div id="vipCasinoAchievements"></div>
    <div id="vipCasinoAchievementToast" class="hidden"></div>

    <details>
      <summary>📖 How the VIP Casino works</summary>
      <p><b>Chips.</b> 1 VIP chip costs 1 MB. Buy chips first, then bet chips on the slots. Cash out turns your chips back into MB at any time, 1 for 1 — nothing is lost by stopping.</p>
      <p><b>3-Reel Classic.</b> Three reels spin. Match all three symbols to win. Payout = your bet × the symbol's 3-reel multiplier. Two matching symbols return a small consolation win (bet × 1).</p>
      <p><b>5-Reel VIP.</b> Five reels spin, bets and payouts are bigger. Three or more of the same symbol pays: 3 matches pay the classic rate, 4 matches pay double, 5 matches pay the full 5-reel multiplier.</p>
      <p><b>Jackpot.</b> 5% of every bet is added to the jackpot pot. Three 💎 Diamonds on 3 reels wins the whole pot. Five 💎 Diamonds on the 5-reel machine wins the rare <b>VIP Jackpot</b> — the pot plus a 500 chip VIP bonus. The pot then resets to 250.</p>
      <p><b>Stats.</b> Wins, losses, biggest single win and your current streak are tracked. A positive streak counts wins in a row, a negative one counts losses in a row.</p>
      <p><b>Achievements.</b> Unlocked automatically as you play. 🤑 HIGH ROLLER needs 1,000 MB won in total across all spins.</p>
      <table id="vipCasinoPaytable"></table>
    </details>
  `;
  host.appendChild(wrap);
}

/* ---------- Rendering ---------- */
let mode = 3, bet = 1, busy = false, bound = false;

function renderReels(symbols, hits){
  const host = $("vipCasinoReels");
  if (!host) return;
  host.innerHTML = symbols.map((s, i) =>
    `<div class="vcReel ${hits && hits.includes(i) ? "hit" : ""}">${s ? s.emoji : "❔"}</div>`).join("");
}
function renderStats(){
  const st = $("vipCasinoStats");
  if (!st) return;
  const streakText = S.streak > 0 ? `${S.streak} win${S.streak>1?"s":""} 🔥`
    : S.streak < 0 ? `${Math.abs(S.streak)} loss${Math.abs(S.streak)>1?"es":""} 🥀` : "—";
  st.innerHTML = `
    <div class="vcStat"><small>SPINS</small><b>${S.spins}</b></div>
    <div class="vcStat"><small>WINS</small><b>${S.wins}</b></div>
    <div class="vcStat"><small>LOSSES</small><b>${S.losses}</b></div>
    <div class="vcStat"><small>BIGGEST WIN</small><b>${S.biggestWin}</b></div>
    <div class="vcStat"><small>CURRENT STREAK</small><b>${streakText}</b></div>
    <div class="vcStat"><small>TOTAL WON</small><b>${S.totalWon} MB</b></div>`;
}
function renderAchievements(){
  const host = $("vipCasinoAchievements");
  if (!host) return;
  host.innerHTML = ACHIEVEMENTS.map(a => `
    <div class="vcAch ${S.achievements[a.id] ? "done" : ""}">
      <b>${a.emoji} ${a.name}</b>
      <small>${a.desc}</small>
    </div>`).join("");
}
function renderPaytable(){
  const t = $("vipCasinoPaytable");
  if (!t) return;
  t.innerHTML = `<tr><th>Symbol</th><th>3 of a kind</th><th>5 of a kind</th></tr>` +
    SYMBOLS.slice().reverse().map(s =>
      `<tr><td>${s.emoji} ${s.name}</td><td>${typeof s.pay3 === "number" ? "×" + s.pay3 : s.pay3}</td><td>${typeof s.pay5 === "number" ? "×" + s.pay5 : s.pay5}</td></tr>`).join("");
}
function render(){
  if (!$("vipCasino")) return;
  $("vipCasinoChips").textContent = S.chips;
  $("vipCasinoWallet").textContent = wallet();
  $("vipCasinoJackpotValue").textContent = `${Math.floor(S.jackpot)} chips`;
  $("vipCasinoJackpotHits").textContent = `Jackpots hit: ${S.jackpotsHit} · VIP jackpots: ${S.vipJackpotsHit}`;
  $("vipCasinoSpin").disabled = busy || S.chips < bet;
  $("vipCasinoCashOut").disabled = busy || S.chips <= 0;
  renderStats(); renderAchievements(); renderPaytable();
}
function say(headline, talk){
  const host = $("vipCasinoResult");
  if (!host) return;
  host.innerHTML = `<div class="vcPayout">${headline}</div><div class="vcTalk">${talk}</div>`;
}

/* ---------- Chips ---------- */
function buyChips(n){
  if (wallet() < n){ say(`😭 Not enough Micky Bucs — you need ${n} MB.`, "Mikael: go do a job, tycoon."); return; }
  setWallet(wallet() - n);
  S.chips += n; save(); render();
  say(`💎 ${n} VIP chips loaded.`, "Mikael: the chips are shiny. Please don't eat them.");
}
function cashOut(){
  if (S.chips <= 0) return;
  const n = S.chips;
  S.chips = 0; save();
  setWallet(wallet() + n); render();
  say(`💵 Cashed out ${n} chips → ${n} MB.`, "Mikael: walking away while ahead? Who ARE you.");
}

/* ---------- Spin ---------- */
function evaluate(symbols){
  const counts = {};
  symbols.forEach(s => { counts[s.id] = (counts[s.id] || 0) + 1; });
  let bestId = null, bestCount = 0;
  Object.entries(counts).forEach(([id, c]) => { if (c > bestCount){ bestCount = c; bestId = id; } });
  const sym = SYMBOLS.find(s => s.id === bestId);
  const hits = symbols.map((s, i) => s.id === bestId ? i : -1).filter(i => i >= 0);

  // Jackpots
  if (bestId === "diamond" && mode === 5 && bestCount === 5) return { kind:"vipJackpot", sym, hits };
  if (bestId === "diamond" && bestCount >= 3) return { kind:"jackpot", sym, hits };

  if (bestCount >= 3){
    let mult;
    if (mode === 5){
      mult = bestCount === 5 ? Number(sym.pay5) : bestCount === 4 ? Number(sym.pay3) * 2 : Number(sym.pay3);
    } else {
      mult = Number(sym.pay3);
    }
    return { kind: mult >= 18 ? "big" : "win", payout: bet * mult, mult, sym, hits, count:bestCount };
  }
  if (bestCount === 2) return { kind:"small", payout: bet, sym, hits, count:2 };
  return { kind:"loss", sym, hits:[] };
}

function spin(){
  if (busy) return;
  if (S.chips < bet){ say("😭 Not enough chips for that bet.", "Mikael: buy chips, then be reckless. In that order."); return; }
  busy = true;
  S.chips -= bet;
  S.totalWagered += bet;
  S.jackpot += bet * 0.05;
  save(); render();

  const count = mode;
  const reels = Array.from({ length:count }, () => spinSymbol());
  const host = $("vipCasinoReels");
  host.innerHTML = Array.from({ length:count }, () => `<div class="vcReel spinning">🎰</div>`).join("");
  say("Spinning…", "Mikael: hold your breath, it's more dramatic.");

  let shown = 0;
  const tick = setInterval(() => {
    shown++;
    const partial = reels.slice(0, shown);
    host.innerHTML = partial.map(s => `<div class="vcReel">${s.emoji}</div>`).join("") +
      Array.from({ length: count - shown }, () => `<div class="vcReel spinning">🎰</div>`).join("");
    if (shown >= count){
      clearInterval(tick);
      setTimeout(() => settle(reels), 260);
    }
  }, 420);
}

function settle(reels){
  const r = evaluate(reels);
  renderReels(reels, r.hits);
  S.spins++;

  if (r.kind === "loss"){
    S.losses++;
    S.streak = S.streak > 0 ? -1 : S.streak - 1;
    say(`🥀 No match. −${bet} chip${bet>1?"s":""}.`, S.streak <= -3 ? pick(STREAK_LOSS_LINES) : pick(LOSS_LINES));
  } else {
    let payout = 0, headline = "", talk = "";
    if (r.kind === "vipJackpot"){
      payout = Math.floor(S.jackpot) + 500;
      S.jackpot = 250; S.vipJackpotsHit++; S.jackpotsHit++;
      headline = `💎 VIP JACKPOT!!! +${payout} chips`;
      talk = pick(VIP_JACKPOT_LINES);
      notify("💎 VIP CASINO — VIP JACKPOT", "Rare VIP jackpot hit", `Payout: ${payout} chips`, { amount:payout });
    } else if (r.kind === "jackpot"){
      payout = Math.floor(S.jackpot);
      S.jackpot = 250; S.jackpotsHit++;
      headline = `🏆 JACKPOT! +${payout} chips`;
      talk = pick(JACKPOT_LINES);
      notify("🏆 VIP CASINO — JACKPOT", "Jackpot hit", `Payout: ${payout} chips`, { amount:payout });
    } else if (r.kind === "big"){
      payout = r.payout;
      headline = `🌟 BIG WIN — ${r.count}× ${r.sym.emoji} ${r.sym.name} · +${payout} chips`;
      talk = pick(BIG_WIN_LINES);
      notify("🌟 VIP CASINO BIG WIN", `${r.sym.name} ×${r.count}`, `Payout: ${payout} chips`, { amount:payout });
    } else if (r.kind === "win"){
      payout = r.payout;
      headline = `✨ WIN — ${r.count}× ${r.sym.emoji} ${r.sym.name} · +${payout} chips`;
      talk = pick(WIN_LINES);
    } else {
      payout = r.payout;
      headline = `🙂 Small win — pair of ${r.sym.emoji} · +${payout} chip${payout>1?"s":""}`;
      talk = pick(WIN_LINES);
    }
    S.chips += payout;
    S.wins++;
    S.totalWon += payout;
    S.biggestWin = Math.max(S.biggestWin, payout);
    S.streak = S.streak < 0 ? 1 : S.streak + 1;
    S.bestStreak = Math.max(S.bestStreak, S.streak);
    say(headline, talk);
    if (typeof confetti === "function" && payout >= bet * 10) confetti({ particleCount:100, spread:95, origin:{ y:.72 } });
  }

  save();
  busy = false;
  render();
  checkAchievements();
  renderAchievements();
}

/* ---------- Wiring ---------- */
function bind(){
  if (bound) return;
  bound = true;
  $("vipCasinoBuy10")?.addEventListener("click", () => buyChips(10));
  $("vipCasinoBuy50")?.addEventListener("click", () => buyChips(50));
  $("vipCasinoCashOut")?.addEventListener("click", cashOut);
  $("vipCasinoSpin")?.addEventListener("click", spin);
  $("vipCasinoMode")?.querySelectorAll("[data-mode]").forEach(b => b.addEventListener("click", () => {
    mode = Number(b.dataset.mode);
    $("vipCasinoMode").querySelectorAll("[data-mode]").forEach(x => x.classList.toggle("active", x === b));
    renderReels(Array.from({ length:mode }, () => null));
    say(mode === 5 ? "5-Reel VIP machine loaded." : "3-Reel Classic loaded.",
        mode === 5 ? "Mikael: bigger reels, bigger drama." : "Mikael: classic. Like me.");
  }));
  $("vipCasinoBets")?.querySelectorAll("[data-bet]").forEach(b => b.addEventListener("click", () => {
    bet = Number(b.dataset.bet);
    $("vipCasinoBets").querySelectorAll("[data-bet]").forEach(x => x.classList.toggle("active", x === b));
    render();
  }));
}

function boot(){
  injectStyles();
  injectMarkup();
  if (!$("vipCasino")) return;
  bind();
  renderReels([null, null, null]);
  render();
  checkAchievements();
}

function start(){
  boot();
  // The VIP folder view is created/revealed by vip-folder.js; keep trying briefly
  // and re-sync whenever the folder or wallet changes.
  let tries = 0;
  const t = setInterval(() => { boot(); if (++tries > 20 || $("vipCasino")) clearInterval(t); }, 500);
  $("vipFolderIcon")?.addEventListener("click", () => setTimeout(boot, 60));
  $("vipFolderUnlockBtn")?.addEventListener("click", () => setTimeout(boot, 120));
  ["lizzyStoreRefresh", "focus"].forEach(ev => window.addEventListener(ev, render));
  window.addEventListener("storage", e => { if (e.key === STATE || e.key === WALLET){ S = Object.assign(defaultState(), read(STATE, {})); render(); } });
  window.LizzyVipCasino = { state: () => S, render, achievements: ACHIEVEMENTS };
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();
})();
