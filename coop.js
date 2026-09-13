(()=>{"use strict";
const W=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const $=id=>document.getElementById(id); const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const api=async(action,body={})=>{const has=Object.keys(body).length;const r=await fetch(W+"?action="+encodeURIComponent(action),{method:has?"POST":"GET",headers:{"Content-Type":"application/json"},body:has?JSON.stringify({action,...body}):undefined,cache:"no-store"});const d=await r.json().catch(()=>({}));if(!r.ok||d.success===false)throw new Error(d.error||`Request failed (${r.status})`);return d};
// Tabs
for(const b of document.querySelectorAll("[data-tab]"))b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");$(b.dataset.tab).classList.add("active");if(b.dataset.tab==="chess")loadChess()};
// Letters
async function loadMessages(){try{const d=await api("lizzy_messages"),msgs=d.messages||[];const inbox=$("mikaelInbox");if(!msgs.length){inbox.innerHTML='<span class="empty">Waiting for Mikael…</span>';return}inbox.innerHTML=msgs.slice(-12).reverse().map(m=>`<div class="inbox-msg ${m.status==="pending"?"new":""}"><b>🖤 Mikael</b><div>${esc(m.text)}</div><time>${new Date(m.createdAt).toLocaleString([], {dateStyle:"medium",timeStyle:"short"})}</time></div>`).join("");for(const m of msgs)if(m.status==="pending")try{await api("lizzy_message_seen",{id:m.id})}catch{}}catch(e){$("mikaelInbox").innerHTML=`<span class="empty">Could not load replies: ${esc(e.message)}</span>`}}
$("letterForm").onsubmit=async e=>{e.preventDefault();const text=$("letterText").value.trim();if(!text)return;const result=$("letterResult");const btn=e.target.querySelector("button[type=submit]");btn.disabled=true;result.textContent="Sending…";try{await api("submit_letter",{subject:$("letterSubject").value.trim()||"A letter for Mikael",text,from:"Lizzy"});$("letterText").value="";result.textContent="💌 Letter sent. Mikael has been notified.";loadMessages()}catch(err){result.textContent=err.message}finally{btn.disabled=false}};
// Chess
let game=new Chess(),selected=null,lastFen="";const glyph={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"};
function render(){const b=$("board");b.innerHTML="";const bd=game.board();for(let r=0;r<8;r++)for(let c=0;c<8;c++){const sq=String.fromCharCode(97+c)+(8-r),p=bd[r][c],x=document.createElement("button");x.className="sq "+((r+c)%2?"dark":"light");if(selected===sq)x.classList.add("selected");if(selected)try{if(game.moves({square:selected,verbose:true}).some(m=>m.to===sq))x.classList.add("legal")}catch{}x.textContent=p?(p.color==="w"?glyph[p.type.toUpperCase()]:glyph[p.type]):"";x.onclick=()=>click(sq);b.appendChild(x)}$("turn").textContent=game.turn()==="w"?"🌸 Your turn — choose a white piece":"🖤 Mikael's turn — he's thinking…";$("moves").textContent=game.pgn()||"No moves yet."}
async function click(sq){if(game.turn()!=="w")return;if(!selected){const p=game.get(sq);if(!p||p.color!=="w")return;selected=sq;render();return}try{const m=game.move({from:selected,to:sq,promotion:"q"});if(!m){selected=sq;render();return}selected=null;render();await api("lizzy_chess_move",{fen:game.fen(),pgn:game.pgn(),turn:game.turn(),lastMove:m.san})}catch(e){alert(e.message);loadChess()}}
async function loadChess(){try{const d=await api("coop_chess"),s=d.state;if(s.fen&&s.fen!=="start"&&s.fen!==lastFen){game.load(s.fen);lastFen=s.fen}else if(s.fen==="start"&&lastFen!=="start"){game=new Chess();lastFen="start"}render()}catch(e){$("turn").textContent="Chess unavailable: "+e.message}}
async function help(text){try{await api("lizzy_chess_help",{text});$("hintBox").textContent="💌 Mikael has been notified. His reply will appear here.";loadMessages()}catch(e){$("hintBox").textContent=e.message}}
$("pieceHelpBtn").onclick=()=>$("pieceModal").classList.remove("hidden");$("closePieceModal").onclick=()=>$("pieceModal").classList.add("hidden");document.querySelectorAll("[data-piece]").forEach(b=>b.onclick=()=>{ $("pieceModal").classList.add("hidden");help(`How does the ${b.dataset.piece} move in chess? Please explain it simply to Lizzy and include a quick example.`)});$("hintHelpBtn").onclick=()=>help("Give me a hint for my current position. Please tell me what I should look at without simply making the move for me.");$("rescueHelpBtn").onclick=()=>help("I have no idea what to do 😭 Please look at my current position and give me a beginner-friendly suggestion.");$("askHelp").onclick=()=>{const t=$("customHelp").value.trim();if(t){$("customHelp").value="";help(t)}};
loadMessages();loadChess();setInterval(loadMessages,5000);setInterval(()=>{if($("chess").classList.contains("active"))loadChess()},5000);

// Trophy shelf — always visible, not just on the escape tab
async function loadTrophies(){try{const d=await api("coop_trophies"),xs=d.trophies||[];const el=$("trophyShelfItems");if(!xs.length){el.innerHTML='<span class="empty">No trophies yet — go win one 👀</span>';return}el.innerHTML=xs.map(t=>`<div class="trophy" title="${esc(t.description||"")}"><span class="trophy-emoji">${esc(t.emoji||"🏆")}</span><span class="trophy-name">${esc(t.name)}</span><span class="trophy-date">${new Date(t.wonAt).toLocaleDateString([], {month:"short",day:"numeric"})}</span></div>`).join("")}catch{}}

// Escape Room
let escapeTimerHandle=null,escapeState=null;
function fmtTime(sec){sec=Math.max(0,Math.floor(sec));const m=String(Math.floor(sec/60)).padStart(2,"0"),s=String(sec%60).padStart(2,"0");return `${m}:${s}`}
function renderEscape(){
  if(!escapeState)return;
  const started=!!escapeState.startedAt;
  $("escapeIntroPanel").classList.toggle("hidden",started);
  $("lockerPanel").classList.toggle("hidden",!started||escapeState.stage!=="locker_room");
  $("gymPanel").classList.toggle("hidden",!started||escapeState.stage!=="gym");
  $("escapeDonePanel").classList.toggle("hidden",escapeState.stage!=="complete");
  if(escapeState.stage==="complete")$("escapeDoneText").textContent=`Cleared in ${fmtTime(escapeState.elapsedSeconds)}. Check the Trophy Shelf up top — it's yours now 🏆`;
  $("escapeTimer").textContent=fmtTime(escapeState.elapsedSeconds);
  if(escapeTimerHandle)clearInterval(escapeTimerHandle);
  if(started&&escapeState.stage!=="complete"){
    let sec=escapeState.elapsedSeconds;
    escapeTimerHandle=setInterval(()=>{sec++;$("escapeTimer").textContent=fmtTime(sec)},1000);
  }
}
async function loadEscape(){try{const d=await api("escape_status");escapeState=d.state;renderEscape()}catch(e){$("escapeTimer").textContent="--:--"}}
$("escapeStartBtn").onclick=async()=>{try{const d=await api("escape_start");escapeState=d.state;renderEscape()}catch(e){alert(e.message)}};
async function trySubmit(stage,inputId,resultId){
  const code=$(inputId).value.trim();
  if(!code){$(resultId).textContent="Enter the code you found first.";return}
  const btn=stage==="locker_room"?$("lockerSubmit"):$("gymSubmit");
  btn.disabled=true;$(resultId).textContent="Checking…";
  try{
    const d=await api("escape_submit",{stage,code});
    escapeState=d.state;
    if(d.correct){
      $(resultId).textContent="✅ That's it!";
      try{window.confetti&&confetti({particleCount:120,spread:80,origin:{y:.6}})}catch{}
      if(escapeState.trophyAwarded)loadTrophies();
      renderEscape();
    }else{
      $(resultId).textContent=d.error||"❌ Not quite — look again.";
      $(inputId).value="";
    }
  }catch(e){$(resultId).textContent=e.message}finally{btn.disabled=false}
}
$("lockerSubmit").onclick=()=>trySubmit("locker_room","lockerCode","lockerResult");
$("gymSubmit").onclick=()=>trySubmit("gym","gymCode","gymResult");
$("lockerCode").onkeydown=e=>{if(e.key==="Enter")$("lockerSubmit").click()};
$("gymCode").onkeydown=e=>{if(e.key==="Enter")$("gymSubmit").click()};

loadTrophies();loadEscape();setInterval(()=>{if($("escape").classList.contains("active"))loadEscape()},4000);
})();
