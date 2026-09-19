(()=>{"use strict";const W="https://lizzyos-notifications.mulaudzimikael73.workers.dev/",$=id=>document.getElementById(id),esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));let key="",game=null,selected=null;
const api=async(action,body={})=>{const r=await fetch(W+"?action="+encodeURIComponent(action),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action,...body,hqKey:key}),cache:"no-store"});const d=await r.json().catch(()=>({}));if(!r.ok||d.success===false)throw new Error(d.error||`Request failed (${r.status})`);return d};
function show(v){document.querySelectorAll(".view").forEach(x=>x.classList.add("hidden"));$(v).classList.remove("hidden");$("viewTitle").textContent=v==="letters"?"Letters from Lizzy":v==="escape"?"🔐 Escape Room":v==="annoy"?"😈 Annoy Lizzy":"Mikael × Lizzy Chess";if(v==="letters")loadLetters();else if(v==="escape")loadEscape();else if(v==="annoy")loadAnnoy();else loadChess()}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{document.querySelectorAll("nav button").forEach(x=>x.classList.remove("active"));b.classList.add("active");show(b.dataset.view)});document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));
$("loginBtn").onclick=async()=>{key=$("hqKey").value.trim();if(!key)return;$("loginStatus").textContent="Checking…";try{await api("hq_letters");$("login").classList.add("hidden");$("app").classList.remove("hidden");loadLetters();loadChess()}catch(e){$("loginStatus").textContent=e.message;key=""}};$("hqKey").onkeydown=e=>{if(e.key==="Enter")$("loginBtn").click()};$("logoutBtn").onclick=()=>{key="";$("app").classList.add("hidden");$("login").classList.remove("hidden");$("hqKey").value=""};
async function loadLetters(){try{const d=await api("hq_letters");$("lettersList").innerHTML=d.letters?.length?d.letters.slice().reverse().map(l=>`<article class="letter ${l.status==="unread"?"unread":""}"><h3>💌 ${esc(l.subject||"A letter from Lizzy")}</h3><div class="meta">${esc(l.from||"Lizzy")} · ${new Date(l.createdAt).toLocaleString()}</div><div class="letter-body">${esc(l.text)}</div>${l.reply?`<div class="reply"><b>🖤 Your reply</b><br>${esc(l.reply)}</div>`:`<div class="replyBox"><textarea data-reply="${esc(l.id)}" placeholder="Reply to Lizzy…"></textarea><button class="primary" data-reply-btn="${esc(l.id)}">Send Reply ❤️</button></div>`}</article>`).join(""):`<div class="card empty">No letters yet. When Lizzy writes, her letter will appear here.</div>`;document.querySelectorAll("[data-reply-btn]").forEach(b=>b.onclick=()=>reply(b.dataset.reply));}catch(e){$("lettersList").innerHTML=`<div class="card err">${esc(e.message)}</div>`}}
async function reply(id){const t=document.querySelector(`[data-reply="${CSS.escape(id)}"]`);if(!t?.value.trim())return;try{await api("reply_letter",{id,reply:t.value.trim()});loadLetters()}catch(e){alert(e.message)}}$("refreshLetters").onclick=loadLetters;$("clearLetters").onclick=async()=>{if(!confirm("Clear ALL letters AND Lizzy's replies inbox? This can't be undone."))return;try{await api("clear_letters");await api("clear_messages");loadLetters()}catch(e){alert(e.message)}};
const glyph={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"};function render(){const b=$("chessBoard");b.innerHTML="";if(!game)return;const bd=game.board();for(let r=0;r<8;r++)for(let c=0;c<8;c++){const sq=String.fromCharCode(97+c)+(8-r),p=bd[r][c],x=document.createElement("button");x.className="sq "+((r+c)%2?"dark":"light");if(selected===sq)x.classList.add("selected");if(selected)try{if(game.moves({square:selected,verbose:true}).some(m=>m.to===sq))x.classList.add("legal")}catch{}x.textContent=p?(p.color==="w"?glyph[p.type.toUpperCase()]:glyph[p.type]):"";x.onclick=()=>move(sq);b.appendChild(x)}$("chessTurn").textContent=game.turn()==="b"?"🖤 Your turn — choose a black piece":"🌸 Lizzy's turn — waiting for her move";$("moveHistory").textContent=game.pgn()||"No moves yet."}
async function move(sq){if(!game)return;if(!selected){const p=game.get(sq);if(!p||p.color!=="b")return;selected=sq;render();return}try{const m=game.move({from:selected,to:sq,promotion:"q"});if(!m){selected=sq;render();return}selected=null;render();await api("chess_move",{fen:game.fen(),pgn:game.pgn(),turn:game.turn(),lastMove:m.san})}catch(e){alert(e.message);loadChess()}}
async function loadChess(){try{const d=await api("chess_state");game=game||new Chess();if(d.state?.fen&&d.state.fen!=="start")game.load(d.state.fen);else game.reset();selected=null;render();$("helpRequests").innerHTML=d.requests?.length?d.requests.slice().reverse().map(r=>`<div class="request"><b>Lizzy:</b> ${esc(r.text)}<button data-resolve="${esc(r.id)}">Mark handled</button></div>`).join(""):"No requests.";document.querySelectorAll("[data-resolve]").forEach(b=>b.onclick=async()=>{await api("resolve_chess_help",{id:b.dataset.resolve});loadChess()})}catch(e){$("chessBoard").innerHTML=`<div class="empty">${esc(e.message)}</div>`}}
$("resetChess").onclick=async()=>{if(confirm("Start a new chess game?")){await api("chess_reset");game=new Chess();loadChess()}};$("refreshChess").onclick=loadChess;$("sendHint").onclick=async()=>{const text=$("hintText").value.trim();if(!text)return;try{await api("send_chess_hint",{text});$("hintText").value="";alert("Hint sent to Lizzy ❤️")}catch(e){alert(e.message)}};

// Escape Room
let escapeTimerHandle=null;
function fmtElapsed(startedAt){const ms=Date.now()-new Date(startedAt).getTime();const s=Math.max(0,Math.floor(ms/1000));const m=Math.floor(s/60),ss=s%60;return `${m}:${String(ss).padStart(2,"0")}`}
function escapeStatusLabel(status){return {not_started:"Not started",in_progress:"🔒 Locker room in progress",lock1_complete:"🔓 Locker room open — gym locked",complete:"🏆 Escaped!"}[status]||status}
async function loadEscape(){
  try{
    const d=await api("escape_state");
    const s=d.state,trophy=d.trophy;
    $("escapeStatus").textContent=escapeStatusLabel(s.status);
    clearInterval(escapeTimerHandle);
    if(s.status==="not_started"){$("escapeTimerHQ").textContent="—"}
    else if(s.status==="complete"&&s.completedAt&&s.startedAt){const totalS=Math.max(0,Math.floor((new Date(s.completedAt)-new Date(s.startedAt))/1000));$("escapeTimerHQ").textContent=`🏁 ${Math.floor(totalS/60)}:${String(totalS%60).padStart(2,"0")}`}
    else if(s.startedAt){$("escapeTimerHQ").textContent=fmtElapsed(s.startedAt);escapeTimerHandle=setInterval(()=>{$("escapeTimerHQ").textContent=fmtElapsed(s.startedAt)},1000)}
    $("escapeAttempts").textContent=`Lock 1 attempts: ${s.attempts?.lock1||0} · Lock 2 attempts: ${s.attempts?.lock2||0}`;
    $("escapeTrophyBox").innerHTML=trophy?`<div class="card">🏆 <b>${esc(trophy.title)}</b><br>${esc(trophy.subtitle)}<br>Finished in ${trophy.elapsedMinutes} min</div>`:`<div class="empty">Not solved yet.</div>`;
    const d2=await api("escape_hints");
    $("escapeHintRequests").innerHTML=d2.hints?.length?d2.hints.slice().reverse().map(h=>`<div class="request"><b>Lizzy:</b> ${esc(h.text)}<button data-escape-resolve="${esc(h.id)}">Mark handled</button></div>`).join(""):"No hint requests.";
    document.querySelectorAll("[data-escape-resolve]").forEach(b=>b.onclick=async()=>{await api("escape_resolve_hint",{id:b.dataset.escapeResolve});loadEscape()});
  }catch(e){$("escapeStatus").textContent=e.message}
}
$("escapeResetBtn").onclick=async()=>{if(!confirm("Reset the whole escape room? This clears progress and the trophy."))return;try{await api("escape_reset");loadEscape()}catch(e){alert(e.message)}};
$("escapeRefreshBtn").onclick=loadEscape;

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
})();
