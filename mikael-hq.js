(()=>{"use strict";const W="https://lizzyos-notifications.mulaudzimikael73.workers.dev/",$=id=>document.getElementById(id),esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));let key="",game=null,selected=null;
const api=async(action,body={})=>{const r=await fetch(W+"?action="+encodeURIComponent(action),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action,...body,hqKey:key}),cache:"no-store"});const d=await r.json().catch(()=>({}));if(!r.ok||d.success===false)throw new Error(d.error||`Request failed (${r.status})`);return d};
function show(v){document.querySelectorAll(".view").forEach(x=>x.classList.add("hidden"));$(v).classList.remove("hidden");$("viewTitle").textContent=v==="letters"?"Letters from Lizzy":v==="annoy"?"😈 Annoy Lizzy":v==="mood"?"💗 My Mood":v==="lessons"?"🧠 Lizzy Lessons":"Mikael × Lizzy Chess";if(v==="letters")loadLetters();else if(v==="annoy")loadAnnoy();else if(v==="mood")loadMood();else if(v==="lessons")loadLessons();else loadChess()}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{document.querySelectorAll("nav button").forEach(x=>x.classList.remove("active"));b.classList.add("active");show(b.dataset.view)});document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));
$("loginBtn").onclick=async()=>{key=$("hqKey").value.trim();if(!key)return;$("loginStatus").textContent="Checking…";try{await api("hq_letters");$("login").classList.add("hidden");$("app").classList.remove("hidden");loadLetters();loadChess()}catch(e){$("loginStatus").textContent=e.message;key=""}};$("hqKey").onkeydown=e=>{if(e.key==="Enter")$("loginBtn").click()};$("logoutBtn").onclick=()=>{key="";$("app").classList.add("hidden");$("login").classList.remove("hidden");$("hqKey").value=""};
async function loadLetters(){try{const d=await api("hq_letters");$("lettersList").innerHTML=d.letters?.length?d.letters.slice().reverse().map(l=>`<article class="letter ${l.status==="unread"?"unread":""}"><h3>💌 ${esc(l.subject||"A letter from Lizzy")}</h3><div class="meta">${esc(l.from||"Lizzy")} · ${new Date(l.createdAt).toLocaleString()}</div><div class="letter-body">${esc(l.text)}</div>${l.reply?`<div class="reply"><b>🖤 Your reply</b><br>${esc(l.reply)}</div>`:`<div class="replyBox"><textarea data-reply="${esc(l.id)}" placeholder="Reply to Lizzy…"></textarea><button class="primary" data-reply-btn="${esc(l.id)}">Send Reply ❤️</button></div>`}</article>`).join(""):`<div class="card empty">No letters yet. When Lizzy writes, her letter will appear here.</div>`;document.querySelectorAll("[data-reply-btn]").forEach(b=>b.onclick=()=>reply(b.dataset.reply));}catch(e){$("lettersList").innerHTML=`<div class="card err">${esc(e.message)}</div>`}}
async function reply(id){const t=document.querySelector(`[data-reply="${CSS.escape(id)}"]`);if(!t?.value.trim())return;try{await api("reply_letter",{id,reply:t.value.trim()});loadLetters()}catch(e){alert(e.message)}}$("refreshLetters").onclick=loadLetters;$("clearLetters").onclick=async()=>{if(!confirm("Clear ALL letters AND Lizzy's replies inbox? This can't be undone."))return;try{await api("clear_letters");await api("clear_messages");loadLetters()}catch(e){alert(e.message)}};
const glyph={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"};function render(){const b=$("chessBoard");b.innerHTML="";if(!game)return;const bd=game.board();for(let r=0;r<8;r++)for(let c=0;c<8;c++){const sq=String.fromCharCode(97+c)+(8-r),p=bd[r][c],x=document.createElement("button");x.className="sq "+((r+c)%2?"dark":"light");if(selected===sq)x.classList.add("selected");if(selected)try{if(game.moves({square:selected,verbose:true}).some(m=>m.to===sq))x.classList.add("legal")}catch{}x.textContent=p?(p.color==="w"?glyph[p.type.toUpperCase()]:glyph[p.type]):"";x.onclick=()=>move(sq);b.appendChild(x)}$("chessTurn").textContent=game.turn()==="b"?"🖤 Your turn — choose a black piece":"🌸 Lizzy's turn — waiting for her move";$("moveHistory").textContent=game.pgn()||"No moves yet."}
async function move(sq){if(!game)return;if(!selected){const p=game.get(sq);if(!p||p.color!=="b")return;selected=sq;render();return}try{const m=game.move({from:selected,to:sq,promotion:"q"});if(!m){selected=sq;render();return}selected=null;render();await api("chess_move",{fen:game.fen(),pgn:game.pgn(),turn:game.turn(),lastMove:m.san})}catch(e){alert(e.message);loadChess()}}
async function loadChess(){try{const d=await api("chess_state");game=game||new Chess();if(d.state?.fen&&d.state.fen!=="start")game.load(d.state.fen);else game.reset();selected=null;render();$("helpRequests").innerHTML=d.requests?.length?d.requests.slice().reverse().map(r=>`<div class="request"><b>Lizzy:</b> ${esc(r.text)}<button data-resolve="${esc(r.id)}">Mark handled</button></div>`).join(""):"No requests.";document.querySelectorAll("[data-resolve]").forEach(b=>b.onclick=async()=>{await api("resolve_chess_help",{id:b.dataset.resolve});loadChess()})}catch(e){$("chessBoard").innerHTML=`<div class="empty">${esc(e.message)}</div>`}}
$("resetChess").onclick=async()=>{if(confirm("Start a new chess game?")){await api("chess_reset");game=new Chess();loadChess()}};$("refreshChess").onclick=loadChess;$("sendHint").onclick=async()=>{const text=$("hintText").value.trim();if(!text)return;try{await api("send_chess_hint",{text});$("hintText").value="";alert("Hint sent to Lizzy ❤️")}catch(e){alert(e.message)}};

// Lizzy Lessons — she writes, you grade
async function loadLessons(){
  try{
    const d=await api("hq_lizzy_lessons");
    $("lessonsList").innerHTML=d.lessons?.length?d.lessons.map(l=>`<article class="letter"><h3>🧠 ${esc(l.text)}</h3><div class="meta">${new Date(l.createdAt).toLocaleString()}</div>${l.status==="rated"?`<div class="reply"><b>${l.rating==="helpful"?"👍 Helpful":"👎 Absolutely Useless"}</b>${l.note?`<br>${esc(l.note)}`:""}</div>`:`<div class="replyBox"><textarea data-lesson-note="${esc(l.id)}" placeholder="Optional note to Lizzy…"></textarea><button class="primary" data-rate-helpful="${esc(l.id)}">👍 Helpful</button> <button class="danger" data-rate-useless="${esc(l.id)}">👎 Useless</button></div>`}</article>`).join(""):`<div class="card empty">No lessons yet. When Lizzy writes one, it'll appear here.</div>`;
    document.querySelectorAll("[data-rate-helpful]").forEach(b=>b.onclick=()=>rateLesson(b.dataset.rateHelpful,"helpful"));
    document.querySelectorAll("[data-rate-useless]").forEach(b=>b.onclick=()=>rateLesson(b.dataset.rateUseless,"useless"));
  }catch(e){$("lessonsList").innerHTML=`<div class="card err">${esc(e.message)}</div>`}
}
async function rateLesson(id,rating){
  const t=document.querySelector(`[data-lesson-note="${CSS.escape(id)}"]`);
  try{await api("rate_lizzy_lesson",{id,rating,note:t?.value.trim()||""});loadLessons()}catch(e){alert(e.message)}
}
$("refreshLessons").onclick=loadLessons;
$("clearLessons").onclick=async()=>{if(!confirm("Clear ALL of Lizzy's lessons? This can't be undone."))return;try{await api("clear_lizzy_lessons");loadLessons()}catch(e){alert(e.message)}};

// Annoy Lizzy
function fmtCooldown(until){const ms=new Date(until).getTime()-Date.now();if(ms<=0)return null;const m=Math.ceil(ms/60000);return `${m} minute${m===1?"":"s"}`}
async function loadAnnoy(){
  try{
    const d=await api("annoy_state");
    const left=d.cooldownUntil?fmtCooldown(d.cooldownUntil):null;
    document.querySelectorAll(".annoy-btn").forEach(b=>b.disabled=!!left);
    if(left)$("annoyStatus").textContent=`😤 Lizzy hit STOP ANNOYING ME — locked out for ${left}.`;
    else $("annoyStatus").textContent="✅ Ready. Pick an effect below.";
  }catch(e){$("annoyStatus").textContent=e.message}
}
document.querySelectorAll(".annoy-btn").forEach(b=>b.onclick=async()=>{
  const effect=b.dataset.effect;
  $("annoyResult").textContent="Sending…";
  try{
    const d=await api("annoy_trigger",{effect});
    if(d.cooldown){$("annoyResult").textContent=`😤 On cooldown until ${new Date(d.until).toLocaleTimeString()}.`;loadAnnoy();return}
    $("annoyResult").textContent=`😈 Sent: ${d.effect.replace(/_/g," ")} — it'll fire next time her device polls (a few seconds).`;
  }catch(e){$("annoyResult").textContent=e.message}
});
$("annoyRefreshBtn").onclick=loadAnnoy;
const annoyResetBtn=$("annoyResetBtn");
if(annoyResetBtn)annoyResetBtn.onclick=async()=>{
  if(!confirm("Clear the cooldown Lizzy set with STOP ANNOYING ME?"))return;
  try{await api("annoy_reset");$("annoyResult").textContent="⏱️ Cooldown cleared.";loadAnnoy()}
  catch(e){$("annoyResult").textContent=e.message}
};

// My Mood
/* Keep in sync with MIKAEL_MOOD_OPTIONS in cloudflare-worker.js so the
   quick-pick buttons here match the /mood Telegram buttons. */
const MOOD_OPTIONS=[
  ["happy","😊 Happy","Feeling happy today 😊"],
  ["tired","🥱 Tired","Feeling tired 🥱"],
  ["dramatic","🎭 Dramatic","Feeling dramatic 🎭"],
  ["soft","🥹 Soft","Feeling soft today 🥹"],
  ["annoyed","🙄 Annoyed","Feeling a bit annoyed 🙄"],
  ["missing","🥺 Missing Lizzy","Missing Lizzy 🥺"],
  ["sad","😢 Sad","Feeling sad 😢"],
  ["indifferent","😐 Indifferent","Feeling indifferent 😐"],
  ["emotional","🥹 Emotional","Feeling emotional 🥹"],
  ["bored","🥱 Bored","Feeling bored 🥱"],
  ["batman","🦇 Feeling Like Batman","Feeling like Batman 🦇"],
  ["excited","🤩 Excited","Feeling excited 🤩"],
  ["funky","💃 Funky","Feeling funky 💃"]
];
if($("moodGrid"))$("moodGrid").innerHTML=MOOD_OPTIONS.map(([id,label])=>`<button class="annoy-btn" data-mood="${id}">${label}</button>`).join("");
async function postMood(text){
  const r=await fetch(W,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"mikael_mood_set",text,source:"hq"}),cache:"no-store"});
  const d=await r.json().catch(()=>({}));
  if(!r.ok||d.success===false)throw new Error(d.error||`Request failed (${r.status})`);
  return d;
}
async function loadMood(){
  try{
    const r=await fetch(W+"?mikaelMood=1",{cache:"no-store"});
    const d=await r.json();
    const mood=d?.success?d.mood:null;
    $("moodCurrent").textContent=mood?`Current mood: ${mood.text}`:"No mood set yet.";
  }catch(e){$("moodCurrent").textContent=e.message}
}
document.querySelectorAll("[data-mood]").forEach(b=>b.onclick=async()=>{
  const opt=MOOD_OPTIONS.find(([id])=>id===b.dataset.mood);
  if(!opt)return;
  $("moodResult").textContent="Setting…";
  try{await postMood(opt[2]);$("moodResult").textContent=`💗 Mood set: ${opt[1]}`;loadMood()}
  catch(e){$("moodResult").textContent=e.message}
});
$("moodSendBtn")?.addEventListener("click",async()=>{
  const text=$("moodText").value.trim();
  if(!text)return;
  $("moodResult").textContent="Setting…";
  try{await postMood(text);$("moodText").value="";$("moodResult").textContent="💗 Mood set.";loadMood()}
  catch(e){$("moodResult").textContent=e.message}
});
})();
