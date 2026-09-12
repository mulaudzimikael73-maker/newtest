(()=>{
"use strict";

/* =========================================================
   LIZZYOS V4.4 — SHARED PERFORMANCE SCHEDULER
   Pauses non-critical desktop jobs while the tab is hidden.
   ========================================================= */
const LizzyPerf=(()=>{
 const jobs=new Map();
 let timer=null;
 function tick(){
   if(document.hidden)return;
   const now=Date.now();
   for(const [name,j] of jobs){
     if(now>=j.next){
       try{j.fn()}catch(e){console.warn("LizzyOS job failed:",name,e)}
       j.next=now+j.every;
     }
   }
 }
 function start(){if(!timer)timer=setInterval(tick,1000)}
 function add(name,every,fn,runNow=false){
   if(jobs.has(name))return;
   jobs.set(name,{every:Math.max(1000,every),fn,next:Date.now()+(runNow?0:every)});
   start();
 }
 function remove(name){jobs.delete(name)}
 document.addEventListener("visibilitychange",()=>{if(!document.hidden)tick()});
 return {add,remove,tick};
})();
window.LizzyPerf=LizzyPerf;
const $=id=>document.getElementById(id);
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const today=()=>new Date().toLocaleDateString("en-CA");
const open=id=>$(id)?.classList.remove("hidden");
const close=id=>$(id)?.classList.add("hidden");
const toast=m=>{if(typeof window.showToast==="function")window.showToast(m);else console.log(m)};

function bind(id,event,fn){const el=$(id);if(el)el.addEventListener(event,fn)}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

// WINDOWS
bind("livingDesktopIcon","click",()=>open("livingDesktopWindow"));
bind("livingDesktopClose","click",()=>close("livingDesktopWindow"));
bind("livingDesktopCloseBtn","click",()=>close("livingDesktopWindow"));
bind("classifiedFolderIcon","click",()=>{renderClassified();open("classifiedFolderWindow");setTimeout(injectMission7,50)});
bind("classifiedFolderClose","click",()=>close("classifiedFolderWindow"));
bind("classifiedFolderCloseBtn","click",()=>close("classifiedFolderWindow"));

// CLASSIFIED — preserve existing purchases and allow Mission 7 injector to coexist.
function renderClassified(){
 const p=$("classifiedArchivePanel");if(!p)return;const files=[],seen=new Set();
 ["lizzyClassifiedFiles","lizzyPurchasedDossiers","lizzyOwnedClassified","lizzySecretShelfOwned"].forEach(k=>{const v=read(k,null);if(Array.isArray(v))v.forEach(x=>files.push(typeof x==="string"?{title:x}:x));else if(v&&typeof v==="object")Object.entries(v).forEach(([key,val])=>{if(val)files.push(typeof val==="object"?{title:val.title||val.name||key,...val}:{title:key})})});
 const unique=files.filter(f=>{const t=String(f.title||f.name||"Classified File");if(seen.has(t))return false;seen.add(t);return true});
 if(!unique.length){p.innerHTML=`<div class="classifiedEmpty">🔒<br><b>No purchased dossiers yet.</b><p>Buy classified files from Mikael's Secret Shelf and they will appear here.</p></div>`;return}
 p.innerHTML=`<div class="classifiedPurchasedGrid">${unique.map((f,i)=>`<article class="classifiedPurchasedCard"><div>📁</div><small>PURCHASED DOSSIER</small><b>${esc(f.title||f.name||"Classified File")}</b>${f.content?`<button type="button" data-classified-open="${i}">OPEN FILE</button>`:`<span>ARCHIVED</span>`}</article>`).join("")}</div><div id="classifiedPurchasedReader"></div>`;
 p.querySelectorAll("[data-classified-open]").forEach(btn=>btn.addEventListener("click",()=>{const f=unique[Number(btn.dataset.classifiedOpen)],r=$("classifiedPurchasedReader");if(!r||!f?.content)return;if(f.encrypted||String(f.id||"")==="aypp_006"){r.innerHTML=`<section class="classifiedReader ayppDecrypt"><button type="button" id="classifiedReaderClose">×</button><small>🔐 ENCRYPTED // AYPP-006</small><h3>DECRYPTION REQUIRED</h3><p>Clue: <b>Remember your birthday card… who signed it?</b></p><input type="password" id="ayppDecryptPassword" placeholder="Enter decryption key"><button type="button" id="ayppDecryptButton">DECRYPT FILE</button><div id="ayppDecryptError"></div></section>`;$("classifiedReaderClose")?.addEventListener("click",()=>r.innerHTML="");$("ayppDecryptButton")?.addEventListener("click",()=>{if(String($("ayppDecryptPassword")?.value||"").trim().toLowerCase()!=="micky the greatest"){$("ayppDecryptError").textContent="❌ ACCESS DENIED — incorrect decryption key.";return}r.innerHTML=`<section class="classifiedReader"><button type="button" id="classifiedReaderClose">×</button><small>CLASSIFIED // DECRYPTED FILE</small><h3>🔓 ${esc(f.title||f.name||"AYPP-006")}</h3><pre>${esc(f.content)}</pre></section>`;$("classifiedReaderClose")?.addEventListener("click",()=>r.innerHTML="")});return}r.innerHTML=`<section class="classifiedReader"><button type="button" id="classifiedReaderClose">×</button><small>CLASSIFIED // PURCHASED FILE</small><h3>📁 ${esc(f.title||f.name||"Classified File")}</h3><pre>${esc(f.content)}</pre></section>`;const reader=r.querySelector(".classifiedReader");if(reader&&/cody/i.test(String(f.title||f.name||""))){reader.dataset.codyLegal="true";reader.classList.add("codyLegalPhotoActive","codyLegalTheme");if(!reader.querySelector(".codyLegalWatermark")){const wm=document.createElement("div");wm.className="codyLegalWatermark";wm.innerHTML='<div class="codyPhotoBackground"></div><div class="codySeal">⚖</div><div class="codyStamp">SUBJECT: CODY<br><small>LEGAL REPRESENTATION ACTIVE</small></div>';reader.prepend(wm)}}$("classifiedReaderClose")?.addEventListener("click",()=>r.innerHTML="");r.scrollIntoView({behavior:"smooth",block:"nearest"})}));
}
window.addEventListener("lizzyClassifiedUpdated",renderClassified);

function injectMission7(){
 // Call the existing mission engine if it is available.
 try{ if(typeof window.injectScavenger==="function")window.injectScavenger(); }catch{}
 // Existing engine also listens to clicks, so safely trigger a normal document click.
 document.body.dispatchEvent(new MouseEvent("click",{bubbles:true}));
}

// STICKY NOTE — hidden by default to keep desktop clean.
const notes=["Reminder: you're actually stunning. — Mikael","Drink some water. No, Coke doesn't count. 😭","Official notice: Mr Perfect remains undefeated.","You're so annoying. There, I said it first. 😂","Justice for Lizzy. Occasionally.","If I didn't know better, I would say she's a myth.","Little Miss Attitude has entered the operating system.","Please stop bullying my knees. Official request.","Yeah, my folder is deep like that. 😌","Have a good day, Four Eyes. Respectfully. 👓💗"];
function noteState(){let v=read("lizzyLivingStickyV1",null);if(!v||v.day!==today())v={day:today(),index:new Date().getDate()%notes.length};write("lizzyLivingStickyV1",v);return v}
function renderNote(){const v=noteState(),msg=notes[v.index%notes.length];if($("stickyMessage"))$("stickyMessage").textContent=msg;if($("stickyPreview"))$("stickyPreview").textContent=msg}
function showNote(show){$("livingStickyNote")?.classList.toggle("hidden",!show);if($("stickyToggle"))$("stickyToggle").textContent=show?"Hide Note":"Show Note";localStorage.setItem("lizzyLivingStickyVisibleV1",show?"1":"0")}
bind("stickyToggle","click",()=>showNote($("livingStickyNote")?.classList.contains("hidden")));
bind("stickyHide","click",()=>showNote(false));
bind("stickyNext","click",()=>{const v=noteState();v.index=(v.index+1)%notes.length;write("lizzyLivingStickyV1",v);renderNote()});
renderNote();showNote(localStorage.getItem("lizzyLivingStickyVisibleV1")==="1");

// Drag note.
(()=>{const el=$("livingStickyNote"),h=el?.querySelector(".stickyHandle");if(!el||!h)return;const pos=read("lizzyLivingStickyPosV1",null);if(pos){el.style.left=pos.x+"px";el.style.top=pos.y+"px";el.style.right="auto"}let drag=false,dx=0,dy=0;h.addEventListener("mousedown",e=>{if(e.target.closest("button"))return;drag=true;const r=el.getBoundingClientRect();dx=e.clientX-r.left;dy=e.clientY-r.top});document.addEventListener("mousemove",e=>{if(!drag)return;const x=Math.max(4,Math.min(innerWidth-el.offsetWidth-4,e.clientX-dx)),y=Math.max(4,Math.min(innerHeight-el.offsetHeight-4,e.clientY-dy));el.style.left=x+"px";el.style.top=y+"px";el.style.right="auto"});document.addEventListener("mouseup",()=>{if(!drag)return;drag=false;write("lizzyLivingStickyPosV1",{x:parseInt(el.style.left)||4,y:parseInt(el.style.top)||4})})})();

// MOOD
const moods=[["happy","😊 Happy"],["tired","🥱 Tired"],["dramatic","🎭 Dramatic"],["soft","🥹 Soft"],["annoyed","🙄 Annoyed"],["missing","🥺 Missing Mikael"],["sad","😢 Sad"],["indifferent","😐 Indifferent"],["emotional","🥹 Emotional"],["bored","🥱 Bored"]];
function currentMood(){const v=read("lizzyLivingMoodV1",null);return v&&v.day===today()?v:null}
function renderMood(){const v=currentMood();document.body.dataset.lizzyMood=v?.id||"";if($("moodDisplay"))$("moodDisplay").textContent=v?.label||"Not selected";document.querySelectorAll("[data-mood]").forEach(b=>b.disabled=!!v)}
if($("moodChoices"))$("moodChoices").innerHTML=moods.map(([id,label])=>`<button type="button" data-mood="${id}">${label}</button>`).join("");
$("moodChoices")?.addEventListener("click",e=>{const b=e.target.closest("[data-mood]");if(!b||currentMood())return;const m=moods.find(x=>x[0]===b.dataset.mood);write("lizzyLivingMoodV1",{day:today(),id:m[0],label:m[1]});renderMood();toast("🌤️ Mood saved for today.");if(typeof lizzyTelegramNotify==="function")lizzyTelegramNotify("🌤️ MOOD OF THE DAY SET",m[1],`Lizzy set her mood for today to: ${m[1]}\nDate: ${today()}`);window.dispatchEvent(new Event("lizzyMoodChanged"))});renderMood();

// COUNTDOWN
const CD="lizzyLivingCountdownV1";let celebrated=false;
function renderCountdown(){const v=read(CD,null),o=$("countdownDisplay");if(!o)return;if(!v?.when){o.textContent="No countdown yet";return}const ms=new Date(v.when).getTime()-Date.now();if(ms<=0){o.textContent=`🎉 ${v.name||"It's time!"}`;if(!celebrated){celebrated=true;document.body.classList.add("countdownCelebrate");setTimeout(()=>document.body.classList.remove("countdownCelebrate"),3200)}return}const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000);o.textContent=`${v.name}: ${d}d ${h}h ${m}m`}
bind("countdownSave","click",()=>{const name=$("countdownName")?.value.trim(),when=$("countdownDate")?.value;if(!name||!when){toast("⏳ Add an event name and date.");return}write(CD,{name,when});celebrated=false;renderCountdown();toast("⏳ Countdown saved.")});
bind("countdownClear","click",()=>{localStorage.removeItem(CD);if($("countdownName"))$("countdownName").value="";if($("countdownDate"))$("countdownDate").value="";renderCountdown()});
const savedCD=read(CD,null);if(savedCD){if($("countdownName"))$("countdownName").value=savedCD.name||"";if($("countdownDate"))$("countdownDate").value=savedCD.when||""}renderCountdown();setInterval(renderCountdown,30000);


// LIVING DESKTOP PHASE 2 — DYNAMIC TIME / ACTIVITY / SMARTER EXISTING FEATURES
const dynamicNotes={
 morning:["Good morning Mabebeza ☀️ Go be amazing or at least convincingly awake.","Morning mission: drink some water. No, tequila doesn't count. 😭","Rise and shine, Four Eyes. LizzyOS noticed you're awake."],
 afternoon:["Afternoon check-in: have you eaten or are we surviving on vibes?","Mabebeza, hope your day is treating you nicely. If not, fight it.","Drink some water. This message will continue until morale improves."],
 evening:["Evening report: you survived another day. Impressive.","Tomorrow's problems are legally tomorrow's responsibility.","Mabebeza, I hope something made you smile today."],
 late:["Why are you still awake? 😭","Late-night Lizzy detected. Please report directly to bed.","The classified files will still be here tomorrow. Go sleep."]
};
const systemActivityPool=[
 "Lizzy Mail checking for today's nonsense…","Bank of Micky auditing suspicious Micky Bucs…","Cody's lawyer reviewing pending cases…",
 "Mikael.exe recalculating Mr Perfect's humility rating…","Lizzy Garden checking whether anything needs watering…",
 "Classified Files pretending not to contain secrets…","Daily Rewards shuffling tomorrow's rewards…","MickyNet searching for information nobody requested…",
 "Recycle Bin reviewing evidence…","Games checking whether Lizzy is avoiding responsibilities…","Token Jar counting Reverse Tokens…",
 "Batman surveillance checking rooftops…","Life Lessons with Micky generating questionable advice…","LizzyOS checking whether JavaScript is cooperating…"
];
function dynamicPart(){const h=new Date().getHours();return h>=5&&h<12?"morning":h>=12&&h<17?"afternoon":h>=17&&h<23?"evening":"late"}
function renderDynamicTime(){
 const p=dynamicPart(), map={morning:"☀️ Morning Mode — LizzyOS is reluctantly awake.",afternoon:"🌤️ Afternoon Mode — surviving the day successfully.",evening:"🌙 Evening Mode — responsibilities are nearly over.",late:"🌌 Late-Night Mode — Lizzy, why are we still awake?"};
 document.body.dataset.livingTime=p;
 if($("livingTimeStatus"))$("livingTimeStatus").textContent=map[p];
 if($("ambientTimeGreeting"))$("ambientTimeGreeting").textContent=map[p].split(" — ")[0];
}
function dynamicActivity(){
 const msg=systemActivityPool[Math.floor(Math.random()*systemActivityPool.length)];
 if($("livingSystemActivity"))$("livingSystemActivity").textContent=msg;
 if($("livingSystemActivityTime"))$("livingSystemActivityTime").textContent="Updated "+new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
}
function updateAmbient(){
 const mood=currentMood?.();
 if($("ambientMood"))$("ambientMood").textContent="Mood: "+(mood?.label||"Not selected");
 const cd=read(CD,null);
 if($("ambientCountdown")){
   if(!cd?.when)$("ambientCountdown").textContent="No countdown";
   else {const ms=new Date(cd.when).getTime()-Date.now();if(ms<=0)$("ambientCountdown").textContent="🎉 "+(cd.name||"It's time!");else{const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000);$("ambientCountdown").textContent=`⏳ ${cd.name}: ${d}d ${h}h ${m}m`}}
 }
}
function dynamicSticky(){
 if(document.body.classList.contains("mikaelTakeoverActive"))return;
 const pool=dynamicNotes[dynamicPart()],msg=pool[Math.floor(Math.random()*pool.length)];
 if($("stickyMessage"))$("stickyMessage").textContent=msg;
}
bind("stickyNext","click",()=>setTimeout(dynamicSticky,0));
window.LizzyPerf?.add?.("legacyJob1",1000,()=>{renderDynamicTime();updateAmbient()});
setInterval(dynamicActivity,18000);
setTimeout(()=>{renderDynamicTime();dynamicActivity();updateAmbient()},0);

// MIKAEL TAKEOVER V1
const MP="lizzyLivingMikaelProfileV1";
const takeoverMessages=[
 "System update: Lizzy is still stunning. No patch required.",
 "Mr Perfect has reviewed the situation and decided he is correct.",
 "Reminder from management: Batman can operate in broad daylight.",
 "Drink some water. No, tequila doesn't count. 😭",
 "Justice for Lizzy has been temporarily suspended pending further investigation.",
 "Four Eyes detected. Threat level: suspiciously cute.",
 "Little Miss Attitude is currently operating within acceptable limits.",
 "Mabebeza, I hope you have a great day. This is a legally binding instruction.",
 "Your screen has been inspected. Too much LizzyOS. Not enough appreciation for Mikael.",
 "Mikael would like it noted that his knees are innocent.",
 "This notification contains no useful information. You're welcome.",
 "Mr Perfect Database reports a 100% chance Mikael adds another feature.",
 "Cody's lawyer has advised Mikael not to comment further.",
 "Breaking news: Mikael still thinks purple is elite.",
 "Agent Yelizaveta, your performance review says: suspicious but impressive.",
 "A totally unbiased audit has ranked Mikael first.",
 "LizzyOS has detected an illegal amount of attitude.",
 "The Office has been reclassified as educational material.",
 "If this message seems unnecessary, Takeover Mode is working correctly.",
 "Mikael has entered the system. Productivity immediately decreased."
];
const takeoverNotes=[
 "TAKEOVER NOTE: Drink some water. No, tequila doesn't count. 😭",
 "Mr Perfect was here. Allegedly.",
 "You look suspiciously pretty today. Investigation pending.",
 "Reminder: arguing with Mikael only gives him more material.",
 "Four Eyes, please report to the Compliments Department.",
 "Mabebeza.exe is running perfectly.",
 "Today's objective: survive Mikael's unnecessary commentary.",
 "If lost, blame JavaScript.",
 "Batman works nights. Mikael apparently works whenever.",
 "Cody has legal representation. Proceed carefully.",
 "Little Miss Attitude remains under observation.",
 "This sticky note achieved absolutely nothing.",
 "The system says you're stunning. I don't make the rules. — Mikael",
 "Important life advice: snacks first, consequences later.",
 "Mr Perfect has approved this desktop. You're welcome.",
 "Your daily reminder that Mikael is extremely humble.",
 "Do not press random buttons. Unless they look interesting.",
 "Current mission: have a good day. Failure is not accepted."
];

const takeoverLabels={
 folderIcon:"Mikael Archives",
 readMeIcon:"Read About Me",
 missionIcon:"Mikael Missions",
 openWhenIcon:"Open When Mikael Says",
 recycleBinIcon:"Evidence Disposal",
 gamesFolderStaticIcon:"Mikael's Arcade",
 classifiedFolderIcon:"Definitely Not Secret",
 livingDesktopIcon:"Mikael Control Room",
 internetIcon:"MickyNet",
 lizzyMailIcon:"Message Mr Perfect",
 lizzyGardenIcon:"Mikael's Garden Now",
 tokenJarIcon:"Mikael Tax Jar",
 seedStoreIcon:"Definitely Legit Store",
 calendarIcon:"Mikael's Schedule"
};

let takeoverPopupTimer=null;
let takeoverMessageTimer=null;
let takeoverBooting=false;

function takeoverOn(){return localStorage.getItem(MP)==="on"}

function desktopLabelNode(id){
 const el=$(id); if(!el)return null;
 return el.querySelector(":scope > span") || el.querySelector("span");
}
function applyTakeoverLabels(on){
 Object.entries(takeoverLabels).forEach(([id,newText])=>{
   const label=desktopLabelNode(id); if(!label)return;
   if(!label.dataset.normalLabel)label.dataset.normalLabel=label.textContent.trim();
   label.textContent=on?newText:label.dataset.normalLabel;
 });
}

function takeoverSticky(){
 if(!takeoverOn())return;
 const msg=takeoverNotes[Math.floor(Math.random()*takeoverNotes.length)];
 if($("stickyMessage"))$("stickyMessage").textContent=msg;
 if($("stickyPreview"))$("stickyPreview").textContent=msg;
}

function showTakeoverPopup(forceText){
 if(!takeoverOn())return;
 const box=$("mikaelTakeoverPopup"), text=$("mikaelTakeoverPopupText");
 if(!box||!text)return;
 text.textContent=forceText||takeoverMessages[Math.floor(Math.random()*takeoverMessages.length)];
 box.classList.remove("hidden");
 clearTimeout(takeoverPopupTimer);
 takeoverPopupTimer=setTimeout(()=>box.classList.add("hidden"),6500);
}
bind("mikaelTakeoverPopupClose","click",()=>$("mikaelTakeoverPopup")?.classList.add("hidden"));

function scheduleTakeoverMessage(){
 clearTimeout(takeoverMessageTimer);
 if(!takeoverOn())return;
 takeoverMessageTimer=setTimeout(()=>{
   if(takeoverOn())showTakeoverPopup();
   scheduleTakeoverMessage();
 },(2.5+Math.random()*3.5)*60000);
}

function takeoverBoot(){
 const boot=$("mikaelTakeoverBoot");
 if(!boot)return;
 takeoverBooting=true;
 boot.classList.remove("hidden");
 const lines=[
   "Mr Perfect is requesting editorial control…",
   "Disabling sensible decisions…",
   "Loading unnecessary commentary…",
   "Increasing Mikael sightings…",
   "Applying Batman-level security…",
   "Takeover complete."
 ];
 let i=0;
 const line=$("takeoverBootLine");
 const ticker=setInterval(()=>{if(line)line.textContent=lines[Math.min(++i,lines.length-1)]},430);
 setTimeout(()=>{
   clearInterval(ticker);
   boot.classList.add("hidden");
   takeoverBooting=false;
   showTakeoverPopup("Editorial control granted. LizzyOS is now under extremely questionable management.");
 },2800);
}

function renderProfile(){
 const on=takeoverOn();
 document.body.classList.toggle("mikaelProfileActive",on);
 document.body.classList.toggle("mikaelTakeoverActive",on);
 if($("mikaelProfileStatus"))$("mikaelProfileStatus").innerHTML=on
   ?"<b>ACTIVE 😈</b> — Mr Perfect has editorial control."
   :"OFFLINE — LizzyOS is behaving itself.";
 if($("toggleMikaelProfile"))$("toggleMikaelProfile").textContent=on
   ?"End Mikael Takeover"
   :"Activate Mikael Takeover";
 $("mikaelTakeoverBanner")?.classList.toggle("hidden",!on);
 applyTakeoverLabels(on);
 if(!on) setTimeout(()=>window.applyPersonaFolderLabels?.(),0);
 if(on){
   takeoverSticky();
   scheduleTakeoverMessage();
   setTimeout(()=>window.renderTakeoverExclusives?.(),0);
 }else{
   clearTimeout(takeoverMessageTimer);
   clearTimeout(takeoverPopupTimer);
   $("mikaelTakeoverPopup")?.classList.add("hidden");
   renderNote();
   setTimeout(()=>window.renderTakeoverExclusives?.(),0);
 }
}

function toggleProfileMode(){
 const next=takeoverOn()?"off":"on";
 localStorage.setItem(MP,next);
 if(next==="on"){
   renderProfile();
   takeoverBoot();
   window.lizzyTelegramNotify?.("🧠 PERSONALITY SELECTED","Mikael Takeover","Lizzy just switched LizzyOS to: Mikael Takeover 😈\n\nMr Perfect now has editorial control.");
 }else{
   renderProfile();
   toast("💗 LizzyOS restored. Mikael has reluctantly returned control.");
   window.lizzyTelegramNotify?.("🧠 PERSONALITY SELECTED","LizzyOS (Restored)","Lizzy just turned Mikael Takeover off.\n\nLizzyOS is back to behaving itself.");
 }
}
window.toggleMikaelProfileFallback=toggleProfileMode;

document.addEventListener("click",e=>{
 const b=e.target.closest("#toggleMikaelProfile");
 if(!b)return;
 e.preventDefault();
 toggleProfileMode();
});

// Takeover-only Easter eggs: click the takeover banner and the MIKAEL badge.
bind("mikaelTakeoverBanner","click",()=>showTakeoverPopup());
document.addEventListener("dblclick",e=>{
 if(!takeoverOn())return;
 if(e.target.closest("#livingDesktopIcon")){
   showTakeoverPopup("SECRET OVERRIDE: You found the control-room Easter egg. Mr Perfect approves. 🕴🏾");
 }
});

// Random tiny desktop glitches while takeover is active.
window.LizzyPerf?.add?.("legacyJob2",45000,()=>{if(!takeoverOn()||takeoverBooting||Math.random()>.28)return;
 document.body.classList.add("mikaelMicroGlitch");
 setTimeout(()=>document.body.classList.remove("mikaelMicroGlitch"),260);});

renderProfile();


// TAKEOVER-EXCLUSIVE INTERACTIONS V2
const takeoverSecretMessages=[
 "CLASSIFIED NOTE 01: Lizzy remains the only person with sufficient clearance to argue with Mr Perfect.",
 "CLASSIFIED NOTE 02: Mikael's confidence levels have exceeded safe operating limits.",
 "CLASSIFIED NOTE 03: Cody's legal team has requested that all future grappling disputes go through Lizzy.",
 "CLASSIFIED NOTE 04: If you're reading this, Takeover Mode has officially become too elaborate.",
 "CLASSIFIED NOTE 05: Batman activity has been reported during daylight hours. Primary suspect: Mikael.",
 "CLASSIFIED NOTE 06: Micky Bucs remain backed by absolutely nothing except confidence.",
 "CLASSIFIED NOTE 07: Agent Yelizaveta has been flagged for excessive cuteness. Investigation ongoing.",
 "CLASSIFIED NOTE 08: Mr Perfect denies changing your desktop. The evidence is literally your desktop.",
 "CLASSIFIED NOTE 09: The number four has appeared again. Nobody is surprised.",
 "CLASSIFIED NOTE 10: Mikael.exe insists this message is important. It is not."
];
const takeoverRareLines=[
 "You caught Mr Perfect editing LizzyOS in real time.",
 "A secret Mikael process was detected hiding behind your desktop.",
 "Batman has been spotted. Unfortunately it appears to be Mikael again.",
 "Mr Perfect left a classified message and forgot to delete the evidence.",
 "Agent Yelizaveta has discovered an unauthorized Mikael process."
];
let takeoverRareTimer=null;

function renderTakeoverSecret(){
 const host=$("takeoverSecretContent"); if(!host)return;
 host.innerHTML=`<div class="takeoverSecretMessage">${takeoverSecretMessages[Math.floor(Math.random()*takeoverSecretMessages.length)]}</div>
 <p class="takeoverSecretFinePrint">This information will self-destruct when Takeover Mode ends. Not really. That sounded cooler.</p>`;
}
function openTakeoverSecret(){
 if(!takeoverOn())return;
 renderTakeoverSecret();
 $("takeoverSecretWindow")?.classList.remove("hidden");
}
bind("takeoverSecretFile","click",openTakeoverSecret);
bind("takeoverSecretClose","click",()=>$("takeoverSecretWindow")?.classList.add("hidden"));
bind("takeoverSecretAnother","click",renderTakeoverSecret);

bind("takeoverBatSignal","click",()=>{
 if(!takeoverOn())return;
 showTakeoverPopup("🦇 GOTHAM EASTER EGG: Batman has been detected in broad daylight. Mikael is the primary suspect.");
 $("takeoverBatSignal")?.classList.add("batCaught");
 setTimeout(()=>$("takeoverBatSignal")?.classList.remove("batCaught"),900);
});

function scheduleTakeoverRare(){
 clearTimeout(takeoverRareTimer);
 if(!takeoverOn())return;
 takeoverRareTimer=setTimeout(()=>{
   if(takeoverOn() && Math.random()<.55){
     const box=$("takeoverRareEvent"), text=$("takeoverRareText");
     if(text)text.textContent=takeoverRareLines[Math.floor(Math.random()*takeoverRareLines.length)];
     box?.classList.remove("hidden");
     setTimeout(()=>box?.classList.add("hidden"),12000);
   }
   scheduleTakeoverRare();
 },(3+Math.random()*4)*60000);
}
bind("takeoverRareClaim","click",()=>{
 $("takeoverRareEvent")?.classList.add("hidden");
 showTakeoverPopup("INVESTIGATION COMPLETE: You found a Takeover-only Easter egg. Mr Perfect has been informed and is pretending not to care.");
 localStorage.setItem("mikaelTakeoverRareFoundV1","yes");
});

window.renderTakeoverExclusives=function renderTakeoverExclusives(){
 const on=takeoverOn();
 $("takeoverSecretFile")?.classList.toggle("hidden",!on);
 $("takeoverBatSignal")?.classList.toggle("hidden",!on);
 if(!on){
   $("takeoverSecretWindow")?.classList.add("hidden");
   $("takeoverRareEvent")?.classList.add("hidden");
   clearTimeout(takeoverRareTimer);
 } else scheduleTakeoverRare();
}

// RARE MIKAEL
const msgs=["Caught me. Your prize is me saying you're stunning. 😌","Justice for Lizzy! Don't get used to it.","Rare Mikael sighting confirmed. 📸","Little Miss Attitude has excellent reflexes.","I was never here. — Mr Perfect","Fine. You win this one. Screenshot it."];
let timer,hideTimer,rareVisible=false;
function schedule(){clearTimeout(timer);const takeover=document.body.classList.contains("mikaelTakeoverActive");const chance=takeover?.78:.35;const delay=takeover?(1.2+Math.random()*2.3)*60000:(4+Math.random()*6)*60000;timer=setTimeout(()=>Math.random()<chance?spawn():schedule(),delay)}
function spawn(){const e=$("rareMikael");if(!e)return;clearTimeout(hideTimer);rareVisible=true;e.classList.remove("hidden","rareRun");e.classList.add("rareCatchable");e.style.top=(90+Math.random()*Math.max(120,innerHeight-260))+"px";e.style.left=(18+Math.random()*Math.max(80,innerWidth-170))+"px";hideTimer=setTimeout(()=>{if(!rareVisible)return;rareVisible=false;e.classList.add("hidden");e.classList.remove("rareCatchable");schedule()},10500)}
function catchRare(ev){if(ev){ev.preventDefault();ev.stopPropagation()}const e=$("rareMikael");if(!e||!rareVisible)return;rareVisible=false;clearTimeout(hideTimer);e.classList.add("rareCaught");toast("🕴🏾 "+msgs[Math.floor(Math.random()*msgs.length)]);setTimeout(()=>{e.classList.add("hidden");e.classList.remove("rareCaught","rareCatchable");schedule()},420)}
bind("rareMikael","click",catchRare);bind("rareMikael","pointerdown",catchRare);schedule();

console.log("LizzyOS Living Desktop: ONLINE");
})();

// ===== DAILY LIZZY MAIL — MIKAEL MESSAGE OF THE DAY =====
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const MESSAGES=["I hope you have a great day today, Mabebeza 💜", "Good morning, Little Miss Attitude. I hope today is kind to you.", "No question today. I just hope you’re okay 🤍", "I hope something unexpectedly nice happens to you today.", "Just checking in. How are you actually doing today?", "How’s my favourite bully doing today?", "Mikael checking in 🫡 Are we surviving?", "I hope today gives you at least one really good reason to smile.", "How’s your heart today? Serious question for once.", "Just wanted to remind you that somebody is rooting for you today. It’s me unfortunately.", "I hope you slept well, Mabebeza.", "What kind of day are we having: good, manageable, or absolutely criminal?", "How are you feeling today, genuinely?", "You better have smiled at least once today.", "I hope today is soft with you 💜", "No interrogation today. Just have a beautiful day.", "Sending you a little Mikael-approved good luck for today.", "Whatever today looks like, I hope you’re being kind to yourself.", "Reminder: you’re actually doing pretty well.", "I hope you get good food, good news and absolutely no nonsense today.", "If today has been rubbish, I formally request that tomorrow behaves better.", "I hope you know how appreciated you are.", "Just passing through your inbox to say hi 💜", "Good afternoon, Mabebeza. I hope the world has behaved itself today.", "Today’s Lizzy Mail has no agenda. I just wanted to say I hope you’re good.", "Important: if animals could talk, which one would be the rudest?", "Would you rather fight one horse-sized duck or 100 duck-sized horses?", "If you had to be haunted by one celebrity, who are you choosing?", "If your life had a narrator, who would you want narrating it?", "Would you rather have fingers as long as your legs or legs as short as your fingers?", "What animal do you think has absolutely no business existing?", "If aliens landed today, what’s the first thing you’re showing them?", "Would you rather sneeze glitter or cry Coca-Cola?", "If you could permanently delete one word from existence, what would it be?", "What conspiracy theory could you invent right now and convince me is real?", "If vegetables could scream, would you still eat them?", "If Cody could talk for five minutes, what do you think he’d expose first?", "What is the most suspicious-looking animal?", "If you woke up invisible tomorrow, what’s the first thing you’d do?", "If you had to replace your hands with kitchen utensils, what are you picking?", "Which fruit would win in a fight?", "If your phone could expose one thing about you, what would finish you?", "Would you rather have a personal chef or someone who does absolutely all your laundry?", "What’s the stupidest superpower you can think of?", "If you were arrested and nobody told me why, what would I assume you did?", "If you had to live inside one TV show for a month, which one?", "What’s one completely normal thing that you think is actually weird?", "If you became president tomorrow, what ridiculous law are you introducing first?", "What food would you defend with your life?", "Would you accept R1 million if every chair you sat on made a fart noise forever?", "Tell me one thing that happened today that you haven’t told me yet.", "What was the best part of your day?", "What was the most annoying part of your day?", "Did anything make you laugh today?", "What’s one thing you’re looking forward to?", "What would make today 10% better?", "What’s taking up most of your brain today?", "What are you currently craving?", "Tell me something completely random about your day.", "What’s your current mood in exactly three words?", "Rate today out of 10.", "What was today’s biggest plot twist?", "Who annoyed you today? Names. I want names.", "What did you eat today and was it actually good?", "What’s one thing you accomplished today?", "Did you learn anything interesting today?", "What are you avoiding doing right now? 👀", "What’s something you wish you could skip today?", "If you could restart today from one specific moment, which one?", "What’s one tiny thing that made today better?", "What’s the funniest thing you heard today?", "What song describes today?", "What’s your social battery sitting at right now?", "Are you tired-tired or just ‘I don’t want to do anything’ tired?", "What’s one thing you need right now?", "Website inspection 👀 What’s your favourite LizzyOS feature right now?", "What feature on this website do you actually use the most?", "What should Mikael add to LizzyOS next?", "Which Open When letter is your favourite?", "Be honest: have you been wasting your Micky Bucs?", "How many Micky Bucs do you currently have? This is an audit.", "Have you checked your Garden today? 🌷", "What’s your favourite plant in the Garden?", "Have you found anything hidden that you think I don’t know you found? 👀", "What’s the funniest thing on LizzyOS?", "What’s the most useless feature on this website? 😭", "Which feature surprised you the most?", "Have you been inside the CLASSIFIED folder lately? 🤨", "Rate Life Lessons with Micky out of 10. Choose carefully.", "Has Life Lessons with Micky taught you anything useful yet? 😭", "What’s the worst Life Lesson you’ve received so far?", "What’s the best Life Lesson you’ve received?", "Which LizzyOS personality is your favourite?", "What would you change about LizzyOS if you had admin access?", "If you could add one completely ridiculous app to this desktop, what would it be?", "Which game on LizzyOS do you actually enjoy the most?", "Which Crack the Code mission gave you the most trouble?", "Have you checked the Secret Shelf recently? 👀", "What do you think should be sold in the Vault next?", "Do you actually read everything I hide on this website?", "What reward would you add to the Daily Rewards?", "What should be worth 100 Micky Bucs?", "Would you rather get 50 Micky Bucs or one completely unknown Classified File?", "What should I hide somewhere on the website next?", "Give LizzyOS a rating out of 10. Remember who built it.", "Do you miss me or are you going to lie?", "Are you still convinced I’m annoying?", "Current Mikael approval rating: 1–10.", "How much trouble have you caused today?", "Have you bullied anyone today or am I still your primary victim?", "Question for The Bully: what exactly have my knees done to deserve this?", "When exactly did bullying my knees become part of your personality?", "Do you accept that Mr Perfect is an objectively accurate nickname?", "They had a chance to be Mr Perfect. What happened? 😔", "How does it feel knowing you created the Mr Perfect problem yourself?", "Who’s more dramatic between us? Think carefully.", "Who is more annoying between us? There is a correct answer.", "Who wins more arguments?", "Who would survive longer on a deserted island?", "Who would get us kicked out of somewhere first?", "Who is more likely to start laughing during a serious conversation?", "Who is more stubborn?", "Who would survive longer without their phone?", "Who would spend R1,000 faster?", "Who gives better gifts?", "Who plans better dates?", "Who is more competitive?", "Who is secretly softer?", "Who would win a roast battle?", "Who apologises first after an argument?", "Good morning, Four Eyes 👓 How’s life?", "Specsy, what are we complaining about today?", "Mabebeza, what’s on your mind?", "Little Miss Attitude, please submit today’s attitude report.", "Mother of the Year, how are the children? 😭", "Jaden Smith, give me one unnecessarily deep thought for today.", "The OPP has entered Lizzy Mail. What chaos are we causing today?", "Blind as a Bat, have you managed to find the reply button? 😭", "The Bully, please provide evidence that you’ve been nice to me recently.", "Four Eyes, what are we seeing today? Hopefully everything.", "Specsy 🤓 what’s today's outfit rating?", "Mabebeza 💜 what are we eating if I magically appear with food?", "Jaden Smith, what does the current political and economic state of the world mean to you?", "Mother of the Year, please confirm all imaginary dependants have been fed.", "Little Miss Attitude, what has caused today's attitude?", "The OPP, are we behaving today or absolutely not?", "Four Eyes 👓 quick question: glasses on or glasses off right now?", "Specsy has been summoned. Please report to Lizzy Mail immediately.", "Mabebeza, I have nothing to ask. I just wanted to use Mabebeza.", "Blind as a Bat 😭 what’s something obvious you completely missed recently?", "Pasta or burger tonight? You have five seconds.", "If I arrived with food right now, what should I bring?", "What’s your current dream meal?", "What’s one food everybody loves that you think is overrated?", "What’s your most controversial food opinion?", "Would you rather have unlimited pasta or unlimited tequila?", "What is the superior pasta shape?", "If you could only eat one takeaway for a month, what are you choosing?", "What’s your emergency comfort meal?", "If dessert was mandatory tonight, what are we getting?", "What’s the best flavour of ice cream? This answer matters.", "Would you rather give up sweets for a month or tequila for a month?", "What food could you eat three days in a row without complaining?", "If I gave you R500 specifically for food right now, where are you going?", "What’s something you’ve been craving for absolutely no reason?", "Random reminder: you’re actually stunning.", "No question. I just wanted you to know I appreciate you.", "I hope you know you make me laugh a lot.", "I hope you get to feel properly proud of yourself today.", "You deserve more credit for the things you manage quietly.", "No jokes for this one: I genuinely hope you're doing okay.", "You make ordinary conversations much more entertaining.", "Just reminding you that I’m always in your corner.", "I hope you know you can always talk to me when something’s bothering you.", "You’re pretty cool sometimes. Don't let this message inflate your ego.", "I hope whatever you're worrying about gets a little easier.", "You’re allowed to have a slow day. Mr Perfect has approved it.", "Just wanted to say I’m glad I know you 💜", "I hope you see yourself a little more kindly today.", "There are a lot of things I admire about you. Unfortunately, I cannot tell you all at once because your ego.", "You looked beautiful today. I haven't seen you, but statistically I'm comfortable making that claim.", "If today feels heavy, you don't have to solve everything today.", "I hope future Lizzy looks back and is proud of current Lizzy.", "No need to reply to this one. I just hope you have a really good day.", "Just a reminder that you matter to people more than you probably realise.", "What’s something you could give a 20-minute presentation on with zero preparation?", "What’s one thing you wish you were ridiculously good at?", "What’s something you want to do at least once this year?", "If money wasn't involved, what would your dream day look like?", "What’s one place you really want to visit?", "What’s a song you wish you could hear for the first time again?", "Which fictional character would you genuinely be friends with?", "What’s one childhood thing you wish you could experience again?", "What’s something small that instantly improves your mood?", "If you could master one skill overnight, what would it be?", "What’s a random memory that always makes you laugh?", "What’s something you've changed your opinion about recently?", "If we had an entire day with absolutely no responsibilities, what are we doing?", "Tell me one thing about you that you think I still don't know.", "Final question from Mr Perfect: what should tomorrow’s Lizzy Mail ask you? 👀"];
const STATE_KEY="lizzyDailyMailV1";
const REPLY_KEY="lizzyDailyMailRepliesV2";

function localDay(){
  return new Date().toLocaleDateString("en-CA");
}
function read(k,f){try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}}
function write(k,v){localStorage.setItem(k,JSON.stringify(v))}

function chooseMessageForToday(){
  const today=localDay();
  let state=read(STATE_KEY,null);
  if(state?.day===today && Number.isInteger(state.index) && MESSAGES[state.index]) return state;

  const previousIndex=Number.isInteger(state?.index)?state.index:-1;

  // Deterministic per date, but avoid immediately repeating yesterday.
  let hash=0;
  for(const ch of today) hash=(hash*31+ch.charCodeAt(0))>>>0;
  let index=hash%MESSAGES.length;
  if(index===previousIndex) index=(index+1)%MESSAGES.length;

  state={day:today,index};
  write(STATE_KEY,state);
  return state;
}

function todayMessage(){
  const s=chooseMessageForToday();
  return {...s,message:MESSAGES[s.index]};
}

function render(){
  const d=todayMessage();
  if($("dailyMailMessage")) $("dailyMailMessage").textContent=d.message;
  if($("dailyMailDate")) $("dailyMailDate").textContent=new Date().toLocaleDateString([],{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const input=$("dailyMailReply"), button=$("sendDailyMailReply");
  if(input){ input.disabled=false; input.value=""; }
  if(button) button.disabled=false;
  if($("dailyMailStatus")) $("dailyMailStatus").textContent="";
  if($("dailyMailReplyCount")) $("dailyMailReplyCount").textContent="0 / 800";
}

async function sendReply(){
  const d=todayMessage();
  const input=$("dailyMailReply");
  const status=$("dailyMailStatus");
  const button=$("sendDailyMailReply");
  const reply=(input?.value||"").trim();

  if(!reply){
    status.textContent="Type a reply first 💌";
    return;
  }

  button.disabled=true;
  status.textContent="Sending to Mikael…";

  try{
    const response=await fetch(WORKER,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        type:"💌 LIZZY MAIL — DAILY REPLY",
        title:`Lizzy replied to Daily Mail #${d.index+1}`,
        details:
          `TODAY'S MESSAGE FROM MIKAEL:\n${d.message}\n\n`+
          `LIZZY'S REPLY:\n${reply}\n\n`+
          `DATE: ${new Date().toLocaleString()}`,
        meta:{
          event:"daily_lizzy_mail_reply",
          message_number:d.index+1,
          daily_message:d.message,
          reply:reply,
          day:d.day
        },
        source:"LizzyOS"
      })
    });

    if(!response.ok) throw new Error("Telegram notification failed");

    const replies=read(REPLY_KEY,[]);
    replies.push({
      day:d.day,
      reply,
      sentAt:new Date().toISOString(),
      messageIndex:d.index,
      dailyMessage:d.message
    });
    write(REPLY_KEY,replies.slice(-250));

    status.textContent="✓ Sent to Mikael — you can reply again";
    input.value="";
    $("dailyMailReplyCount").textContent="0 / 800";
    input.disabled=false;
    button.disabled=false;
    input.focus();
  }catch(err){
    console.warn(err);
    status.textContent="❌ Could not send. Try again.";
    button.disabled=false;
  }
}

function openMail(){
  render();
  $("lizzyMailWindow")?.classList.remove("hidden");
  $("lizzyMailTodayDot")?.classList.add("hidden");
  setTimeout(()=>$("dailyMailReply")?.focus(),100);
}
function closeMail(){ $("lizzyMailWindow")?.classList.add("hidden"); }

$("lizzyMailIcon")?.addEventListener("click",openMail);
$("lizzyMailClose")?.addEventListener("click",closeMail);
$("lizzyMailCloseBtn")?.addEventListener("click",closeMail);
$("sendDailyMailReply")?.addEventListener("click",sendReply);
$("dailyMailReply")?.addEventListener("input",e=>{
  $("dailyMailReplyCount").textContent=`${e.target.value.length} / 800`;
});
$("dailyMailReply")?.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==="Enter")sendReply();
});

// Show TODAY badge once per new calendar day until opened.
const viewedKey="lizzyDailyMailViewedV1";
if(localStorage.getItem(viewedKey)!==localDay()){
  $("lizzyMailTodayDot")?.classList.remove("hidden");
}
$("lizzyMailIcon")?.addEventListener("click",()=>localStorage.setItem(viewedKey,localDay()));

console.log("Lizzy Mail Daily Messages: ONLINE", MESSAGES.length, "messages");
})();



/* =========================================================
   STICKY NOTES V2 — living notes, time-aware + rare Mikael
   ========================================================= */
(()=>{
 const KEY="lizzyStickyNotesV2";
 const DAYKEY="lizzyStickyDailyV2";
 const $=id=>document.getElementById(id);
 const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}};
 const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
 const day=()=>new Date().toISOString().slice(0,10);
 const hour=()=>new Date().getHours();

 const pools={
   morning:[
    "Good morning Mabebeza ☀️ Hope today is kind to you.",
    "Morning report: LizzyOS is awake. Agent Yelizaveta… questionable.",
    "Reminder: breakfast first, attitude second. Please follow protocol.",
    "Today's mission: have a good morning and don't fight the operating system."
   ],
   afternoon:[
    "Afternoon check-in: how's your day actually going? 🌤️",
    "Hydration check. Yes, LizzyOS has become that annoying.",
    "Little Miss Attitude status check: operational?",
    "Half the day survived. Impressive work, Four Eyes."
   ],
   evening:[
    "Evening reminder: you are officially allowed to relax now 🌙",
    "How was your day, Mabebeza? The system requires a full report.",
    "Today's nonsense is nearly complete. Proud of you.",
    "LizzyOS evening status: softer lights, same amount of attitude."
   ],
   night:[
    "You should probably be sleeping. — definitely not Mikael",
    "Night shift activated. Batman may or may not be working.",
    "Late-night LizzyOS reminder: tomorrow can deal with tomorrow.",
    "Agent Yelizaveta, your screen-time investigation has begun."
   ],
   basic:[
    "Hope you have a great day, Mabebeza 💗",
    "Random check: have you smiled today?",
    "Important question: pasta right now — yes or obviously yes?",
    "Website inspection: what feature are you currently judging?",
    "LizzyOS would like to know your current mood.",
    "Quick check-in: anything you need to get off your chest?",
    "Be nice to yourself today. This is an official system instruction.",
    "Today's reminder: you don't have to do everything at once.",
    "Question of the day: what made you laugh recently?",
    "System notice: your presence has improved desktop activity by 97%."
   ],
   mikael:[
    "Mikael was here. There is unfortunately no evidence.",
    "Mr Perfect left this note and then immediately denied involvement.",
    "Batman status: active. Broad daylight restrictions continue to be ignored.",
    "Mikael.exe says hello. Mikael.exe also refuses further questions.",
    "Rare Mikael transmission: I hope you're having a good day, Lizzy.",
    "NOTICE: Mikael has rated himself 10/10 again. Investigation pending."
   ]
 };

 function choose(arr,avoid=[]){
   const options=arr.filter(x=>!avoid.includes(x));
   const p=options.length?options:arr;
   return p[Math.floor(Math.random()*p.length)];
 }
 function currentPool(){
   const h=hour();
   if(h<11)return pools.morning;
   if(h<17)return pools.afternoon;
   if(h<21)return pools.evening;
   return pools.night;
 }
 function dailyNote(){
   let state=read(DAYKEY,{});
   if(state.day===day()&&state.text)return state;
   const hist=read(KEY,{history:[]}).history||[];
   const recent=hist.slice(-12).map(x=>x.text);
   // 8% rare Mikael note; otherwise mostly normal/time-aware notes.
   const rare=Math.random()<0.08;
   const source=rare?pools.mikael:(Math.random()<0.58?pools.basic:currentPool());
   const text=choose(source,recent);
   state={day:day(),text,rare,createdAt:new Date().toISOString()};
   write(DAYKEY,state);
   const all=read(KEY,{history:[]});all.history=all.history||[];
   all.history.push(state);all.history=all.history.slice(-40);write(KEY,all);
   return state;
 }
 function render(){
   const note=dailyNote();
   // Reuse any existing sticky note surface instead of creating desktop clutter.
   let host=$("livingStickyNote")||$("stickyNote")||document.querySelector(".sticky-note,.stickyNote");
   if(!host){
     const desktop=document.querySelector(".desktop")||document.body;
     host=document.createElement("aside");host.id="livingStickyNote";host.className="livingStickyNote";
     desktop.appendChild(host);
   }
   host.classList.toggle("rareMikaelNote",!!note.rare);
   host.innerHTML=`<div class="stickyPin">●</div><small>${note.rare?"RARE TRANSMISSION":"TODAY'S NOTE"}</small><p>${note.text}</p><button type="button" id="dismissLivingSticky" title="Hide note">×</button>`;
   $("dismissLivingSticky")?.addEventListener("click",()=>host.classList.add("stickyHidden"));
 }
 function refreshForNewDay(){
   const s=read(DAYKEY,{});
   if(s.day!==day()){render()}
 }
 window.addEventListener("load",()=>setTimeout(render,350));
 window.LizzyPerf?.add?.("stickyDayCheck",60000,refreshForNewDay);
})();


/* =========================================================
   LIZZYOS V4.5 — LIVING DESKTOP PHASE 3
   Time/Mood + Rare Mikael + System Activity
   ========================================================= */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const today=()=>new Date().toISOString().slice(0,10);
const h=()=>new Date().getHours();

function phase(){
 const x=h();
 if(x<5)return {id:"late",label:"Late Night",icon:"🌙",greet:"You're still awake?",mood:"Quiet Mode"};
 if(x<12)return {id:"morning",label:"Morning",icon:"☀️",greet:"Good morning, Mabebeza",mood:"Fresh Start"};
 if(x<17)return {id:"afternoon",label:"Afternoon",icon:"🌤️",greet:"Good afternoon, Agent Yelizaveta",mood:"Operational"};
 if(x<21)return {id:"evening",label:"Evening",icon:"🌆",greet:"Good evening, Lizzy",mood:"Wind Down"};
 return {id:"night",label:"Night",icon:"🌙",greet:"Night mode territory",mood:"After Hours"};
}
function applyPhase(){
 const p=phase();
 document.documentElement.dataset.lizzyTime=p.id;
 let badge=$("lizzyTimeMoodBadge");
 if(!badge){
   badge=document.createElement("div");badge.id="lizzyTimeMoodBadge";
   const desktop=document.querySelector(".desktop")||document.body;
   desktop.appendChild(badge);
 }
 badge.innerHTML=`<span>${p.icon}</span><div><b>${esc(p.label)}</b><small>${esc(p.mood)}</small></div>`;
 badge.title=p.greet;
}
applyPhase();
window.LizzyPerf?.add?.("timeMoodRefresh",60000,applyPhase);

/* ---------- SYSTEM ACTIVITY ---------- */
const normalActivity=[
 "Desktop sync complete.",
 "Checking local files… all good.",
 "Background services stable.",
 "Sticky Note service standing by.",
 "Calendar service checked.",
 "Lizzy Mail inbox synced.",
 "Micky Bucs ledger balanced.",
 "Daily Reward engine idle.",
 "Token Jar inventory checked.",
 "CLASSIFIED permissions verified.",
 "Secret Shelf connection standing by.",
 "Desktop mood engine recalibrated.",
 "Checking for unread notifications…",
 "System clock synchronized.",
 "Personality module responding normally.",
 "Agent session active.",
 "Cleaning temporary desktop nonsense…",
 "Memory cache optimized.",
 "Window manager stable.",
 "No critical errors detected."
];
const funActivity=[
 "Scanning for attitude… elevated levels detected.",
 "Agent Yelizaveta activity detected.",
 "Four Eyes authentication successful.",
 "Little Miss Attitude protocol armed.",
 "Checking whether Mikael is right… result classified.",
 "Searching for unnecessary arguments… 3 found.",
 "Pink preference database verified.",
 "Pasta priority remains unusually high.",
 "MrPerfect.exe running in background.",
 "Mabebeza status: online 💗",
 "Checking Mikael confidence levels… still excessive.",
 "Batman activity detected during daylight hours.",
 "Cody Legal Team connection established.",
 "Cody grappling assessment: decent.",
 "Monitoring for anti-Mikael propaganda.",
 "Hater Investigation remains open.",
 "Bank of Micky audit mysteriously passed.",
 "Reverse Token probability recalculated.",
 "Checking if Lizzy is crying for 'detox' purposes… inconclusive.",
 "Emotional cleansing propaganda database updated.",
 "Mikael dance rating remains under dispute.",
 "Bowling threat assessment: HIGH.",
 "Operating system survived another Lizzy session."
];
const rareActivity=[
 "⚠ RARE EVENT: Mikael.exe briefly achieved administrator privileges.",
 "🦇 Gotham uplink detected. Batman insists daylight is acceptable.",
 "⚖ Cody's lawyer has entered the server.",
 "🔴 CLASSIFIED: Agent Mikhail Petrov accessed subject records.",
 "👀 Mikael was detected behind a desktop folder. He has escaped.",
 "💗 SYSTEM ANOMALY: Lizzy presence improved performance by 97%.",
 "🚨 Mr Perfect self-rating detected: 10/10. Verification refused.",
 "🕵️ Agent Yelizaveta surveillance counter-surveillance detected."
];
let activityHistory=[];
function activityLine(){
 const roll=Math.random();
 const pool=roll<0.03?rareActivity:roll<0.34?funActivity:normalActivity;
 const options=pool.filter(x=>!activityHistory.includes(x));
 const list=options.length?options:pool;
 const text=list[Math.floor(Math.random()*list.length)];
 activityHistory.push(text);activityHistory=activityHistory.slice(-8);
 return {text,rare:pool===rareActivity,at:new Date()};
}
function ensureActivity(){
 let panel=$("lizzySystemActivity");
 if(panel)return panel;
 panel=document.createElement("section");panel.id="lizzySystemActivity";panel.className="lizzySystemActivity";
 panel.innerHTML=`<div class="activityHead"><span>●</span><b>SYSTEM ACTIVITY</b><button type="button" id="activityCollapse">−</button></div><div id="lizzyActivityLines"></div>`;
 (document.querySelector(".desktop")||document.body).appendChild(panel);
 $("activityCollapse")?.addEventListener("click",()=>{
   panel.classList.toggle("activityCollapsed");
   $("activityCollapse").textContent=panel.classList.contains("activityCollapsed")?"+":"−";
 });
 return panel;
}
function pushActivity(){
 const panel=ensureActivity(),box=$("lizzyActivityLines");if(!box)return;
 const a=activityLine(),row=document.createElement("div");
 row.className="activityRow"+(a.rare?" rareActivity":"");
 row.innerHTML=`<small>${a.at.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</small><span>${esc(a.text)}</span>`;
 box.prepend(row);
 while(box.children.length>5)box.lastElementChild.remove();
}
ensureActivity();
pushActivity();
window.LizzyPerf?.add?.("systemActivityFeed",18000,pushActivity);

/* ---------- RARE MIKAEL APPEARANCES ---------- */
const APPEAR_KEY="lizzyRareMikaelV45";
const appearances=[
 {type:"peek",emoji:"👀",title:"MIKAEL DETECTED",text:"He was hiding behind a folder. Apparently this counts as work."},
 {type:"batman",emoji:"🦇",title:"DAYLIGHT BATMAN",text:"Mikael has ignored Gotham's operating hours again."},
 {type:"exe",emoji:"🕴️",title:"MIKAEL.EXE",text:"A wild Mikael.exe appeared, checked the system, and refused to elaborate."},
 {type:"perfect",emoji:"😌",title:"MR PERFECT",text:"Rare system message: Mikael would like it recorded that he remains Mr Perfect."},
 {type:"wave",emoji:"👋🏾",title:"RARE MIKAEL APPEARANCE",text:"Just checking that you're having a good day, Mabebeza."}
];
function canAppear(){
 const s=read(APPEAR_KEY,{day:"",count:0,last:0});
 if(s.day!==today())return true;
 return s.count<2 && Date.now()-Number(s.last||0)>1000*60*90;
}
function maybeMikael(){
 if(!canAppear()||Math.random()>0.10)return; // checked infrequently; appearance remains rare
 const state=read(APPEAR_KEY,{day:today(),count:0,last:0});
 const current=state.day===today()?state:{day:today(),count:0,last:0};
 const a=appearances[Math.floor(Math.random()*appearances.length)];
 current.count++;current.last=Date.now();write(APPEAR_KEY,current);
 showMikael(a);
}
function showMikael(a){
 if($("rareMikaelAppearance"))return;
 const el=document.createElement("div");el.id="rareMikaelAppearance";el.className=`rareMikaelAppearance ${a.type}`;
 el.innerHTML=`<div class="rareMikaelEmoji">${a.emoji}</div><div><small>${esc(a.title)}</small><p>${esc(a.text)}</p></div><button type="button" aria-label="close">×</button>`;
 (document.querySelector(".desktop")||document.body).appendChild(el);
 requestAnimationFrame(()=>el.classList.add("show"));
 el.querySelector("button").onclick=()=>dismissMikael(el);
 setTimeout(()=>dismissMikael(el),11000);
}
function dismissMikael(el){
 if(!el||!el.isConnected)return;
 el.classList.remove("show");setTimeout(()=>el.remove(),450);
}
// One check every ~12 minutes; 10% roll + max 2/day + 90m cooldown.
window.LizzyPerf?.add?.("rareMikaelCheck",720000,maybeMikael);
})();


/* LIZZYOS V4.6 — FUN PACK */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const desk=()=>document.querySelector("#desktopArea")||document.querySelector("#desktop")||document.body;
function win(id,title,body){let w=$(id);if(!w){w=document.createElement("section");w.id=id;w.className="v46Window";desk().appendChild(w)}w.innerHTML=`<div class="v46Head"><b>${title}</b><button data-x>×</button></div><div class="v46Body">${body}</div>`;w.classList.add("open");w.querySelector("[data-x]").onclick=()=>w.classList.remove("open");return w}
function icon(id,emoji,label,fn){let b=$(id);if(b){b.onclick=fn;b.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();fn()}};return b}const a=document.querySelector("#desktopArea")||desk();b=document.createElement("div");b.id=id;b.className="desktopIcon livingDesktopIcon";b.tabIndex=0;b.innerHTML=`<div class="desktopEmoji">${emoji}</div><span>${label}</span>`;b.onclick=fn;a.appendChild(b);return b}

/* GOOD DAY / BAD DAY */
const DAY="lizzyDayFeelingV46";
function applyFeeling(){const s=read(DAY,{}),d=new Date().toISOString().slice(0,10);document.documentElement.dataset.lizzyFeeling=s.date===d?s.feeling:"neutral"}
function openDay(){const s=read(DAY,{}),w=win("dayCheckWindow","💗 HOW'S TODAY?",`<h2>How are we doing today, Mabebeza?</h2><p>LizzyOS will adjust today's mood slightly.</p><div class="dayChoice"><button data-feel="good">☀️ GOOD DAY</button><button data-feel="bad">🌧️ BAD DAY</button></div><div id="dayFeelingResult">${s.feeling?`Current setting: ${esc(s.feeling.toUpperCase())} DAY`:"No mood logged today."}</div>`);w.querySelectorAll("[data-feel]").forEach(b=>b.onclick=()=>{const x={date:new Date().toISOString().slice(0,10),feeling:b.dataset.feel,at:new Date().toISOString()};write(DAY,x);applyFeeling();$("dayFeelingResult").textContent=x.feeling==="good"?"Good day logged 💗 LizzyOS will try not to ruin it.":"Bad day logged 💗 Gentler mode activated.";window.dispatchEvent(new CustomEvent("lizzyFeelingChanged",{detail:x}))})}
applyFeeling();icon("dayCheckIcon","💗","How's Today?",openDay);

/* CODY COURT */
const CK="lizzyCodyCourtV48";
const cases=[{"charge":"Unauthorized Grappling","story":"Mikael allegedly attempted a takedown drill on Cody without legal approval.","evidence":["Cody was found wearing a tiny necktie after the incident.","Mikael searched 'can dogs tap out?' earlier that day.","No grappling permit exists."],"correct":"guilty"},{"charge":"Treat Misappropriation","story":"Three treats disappeared while Mikael was alone near Cody's snack container.","evidence":["One wrapper was found near Mikael.","Cody had already eaten two treats that morning.","Security footage is unavailable."],"correct":"guilty"},{"charge":"Defamation of Grappling Ability","story":"Mikael described Cody's grappling as 'decent'.","evidence":["The statement exists in writing.","Cody has zero officially sanctioned losses.","Mikael calls it constructive analysis."],"correct":"guilty"},{"charge":"Unlicensed Batman Activity","story":"Mikael was reportedly operating as Batman at 14:07.","evidence":["A Bat-Signal appeared on LizzyOS.","It was broad daylight.","Mikael refuses to disclose his whereabouts."],"correct":"guilty"},{"charge":"Window Territory Dispute","story":"Cody accuses Mikael of occupying his preferred window position.","evidence":["Cody stared for 14 seconds.","No written reservation existed.","The window belongs to neither party."],"correct":"notGuilty"},{"charge":"Witness Tampering","story":"Mikael offered belly rubs during active litigation.","evidence":["The offer occurred during litigation.","Cody accepted.","No request to change testimony was recorded."],"correct":"notGuilty"},{"charge":"Excessive Mr Perfect Propaganda","story":"Mikael repeatedly distributed claims that he is Mr Perfect.","evidence":["All endorsements originate from Mikael.","Independent verification unavailable.","Humility.exe was not installed."],"correct":"guilty"},{"charge":"Attempted Legal Interference","story":"Mikael allegedly told Cody dogs cannot retain lawyers.","evidence":["Lizzy is visibly acting as Cody's lawyer.","Mikael called it a legal theory.","Cody filed another case."],"correct":"guilty"},{"charge":"Reckless Bear-Wrestling Intent","story":"Mikael announced plans to wrestle bears in Dagestan.","evidence":["The statement appears in CLASSIFIED.","No bear consented.","The trip has not occurred."],"correct":"notGuilty"},{"charge":"Calling Cody Easy Work","story":"Cody alleges Mikael called him 'easy work'.","evidence":["Two witnesses heard 'easy'.","Mikael claims he said 'easy, boy'.","Audio is poor."],"correct":"notGuilty"},{"charge":"Unauthorized Nickname Usage","story":"Mikael referred to Cody as opposing counsel.","evidence":["Cody is the client.","Lizzy is counsel.","Mikael admits the terminology was wrong."],"correct":"guilty"},{"charge":"Obstruction of Nap","story":"Mikael allegedly woke Cody for no urgent reason.","evidence":["Cody was asleep.","Mikael needed a quick opinion.","The opinion concerned basketball."],"correct":"guilty"},{"charge":"Illegal Snack Tax","story":"Mikael demanded one bite as tax whenever Cody received food.","evidence":["No tax legislation exists.","Mikael invented the rule.","Cody signed no treaty."],"correct":"guilty"},{"charge":"False Batman Identification","story":"Mikael claims a mysterious daytime vigilante was not him.","evidence":["The vigilante had Mikael-level confidence.","No face was visible.","No registered cape exists."],"correct":"notGuilty"},{"charge":"Failure to Respect Counsel","story":"Mikael ignored Lizzy saying 'objection'.","evidence":["Lizzy said objection.","This occurred in a kitchen.","Cody considered proceedings official."],"correct":"notGuilty"},{"charge":"Attempted Grappling Rematch","story":"After Cody retained Lizzy, Mikael proposed a rematch.","evidence":["Proposal confirmed.","No contact occurred.","Counsel had not approved terms."],"correct":"notGuilty"},{"charge":"Criminal Overconfidence","story":"Mikael predicted a 100% victory rate against Cody.","evidence":["Prediction was unsolicited.","No match took place.","Confidence exceeded limits."],"correct":"notGuilty"},{"charge":"Treat Bribery","story":"A treat appeared immediately after Cody stopped barking at Mikael.","evidence":["Mikael possessed treats.","Cody stopped barking.","Correlation is not necessarily bribery."],"correct":"notGuilty"},{"charge":"Legal Document Surveillance","story":"Mikael attempted to inspect Cody's legal documents.","evidence":["CLASSIFIED logs show Mikael activity.","Mikael built parts of LizzyOS.","The documents are attorney-client sensitive."],"correct":"guilty"},{"charge":"Disturbing the Peace","story":"Mikael celebrated an RPS victory loudly enough to wake Cody.","evidence":["RPS confirms a Mikael win.","Cody woke moments later.","No volume measurement exists."],"correct":"notGuilty"},{"charge":"Impersonating a Grappling Coach","story":"Mikael gave Cody unsolicited grappling coaching.","evidence":["Mikael has grappling ambitions.","No coaching certificate was presented.","Cody did not request instruction."],"correct":"guilty"},{"charge":"Contempt of Cody Court","story":"Mikael called a previous guilty verdict 'fake news'.","evidence":["The verdict exists.","The statement was witnessed.","Appeal procedures were ignored."],"correct":"guilty"},{"charge":"Unauthorized Window Photography","story":"Mikael took a photo near Cody's window position.","evidence":["A photo exists.","Cody appears in the background.","No evidence Cody objected."],"correct":"notGuilty"},{"charge":"Attempted Case Dismissal","story":"Mikael asked Lizzy to 'just drop the case'.","evidence":["Lizzy represents Cody.","No formal motion was filed.","Mikael offered no legal grounds."],"correct":"guilty"}];

async function notifyGameTelegram(game,result,details){try{await fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"game_result",game,result,details,createdAt:new Date().toISOString()})})}catch(e){console.warn("Game Telegram failed",e)}}
function openCourt(){
 let s=read(CK,{heard:[],score:0,wrong:0,streak:0,best:0,record:[]}),pool=cases.map((_,i)=>i).filter(i=>!s.heard.includes(i));if(!pool.length){s.heard=[];pool=cases.map((_,i)=>i)}
 const idx=pool[Math.floor(Math.random()*pool.length)],c=cases[idx];s.current=idx;write(CK,s);
 const exhibits=c.evidence.map((e,i)=>`<label class="evidenceChoice"><input type="checkbox" data-evidence="${i}"><span><b>EXHIBIT ${String.fromCharCode(65+i)}</b><br>${esc(e)}</span></label>`).join("");
 const w=win("codyCourtWindow","⚖️ CODY COURT — CASE FILE",`<div class="courtSeal">🐶⚖️</div><small>COUNSEL FOR CODY: LIZZY</small><h2>Cody Aladeen v. Mikael Mulaudzi</h2><div class="courtCharge">CHARGE: ${esc(c.charge)}</div><p>${esc(c.story)}</p><h3>Review the evidence</h3><div class="courtEvidenceList">${exhibits}</div><p class="courtInstruction">Select at least one exhibit before giving your ruling.</p><div class="courtVerdicts"><button data-v="guilty">🔨 GUILTY</button><button data-v="notGuilty">😇 NOT GUILTY</button></div><div id="courtResult"></div><div class="courtRecord">Legal score: <b>${s.score}</b> correct • ${s.wrong} wrong • Best streak: ${s.best}</div>`);
 w.querySelectorAll("[data-v]").forEach(btn=>btn.onclick=()=>{
  const selected=[...w.querySelectorAll("[data-evidence]:checked")].map(x=>Number(x.dataset.evidence));if(!selected.length){$("courtResult").textContent="⚠ Counsel must submit at least one exhibit.";return}
  let st=read(CK,{heard:[],score:0,wrong:0,streak:0,best:0,record:[]}),verdict=btn.dataset.v,isCorrect=(verdict===c.correct);if(!st.heard.includes(idx))st.heard.push(idx);
  if(isCorrect){st.score++;st.streak++;st.best=Math.max(st.best,st.streak)}else{st.wrong++;st.streak=0}
  st.record.push({case:c.charge,verdict,correct:isCorrect,evidence:selected,at:new Date().toISOString()});st.record=st.record.slice(-50);write(CK,st);
  $("courtResult").innerHTML=isCorrect?`<b>✅ STRONG RULING.</b> The court agrees: ${c.correct==="guilty"?"GUILTY":"NOT GUILTY"}.`:`<b>❌ OVERRULED.</b> The stronger ruling was ${c.correct==="guilty"?"GUILTY":"NOT GUILTY"}.`;
  w.querySelectorAll("[data-v],[data-evidence]").forEach(x=>x.disabled=true);w.querySelector(".courtRecord").innerHTML=`Legal score: <b>${st.score}</b> correct • ${st.wrong} wrong • Best streak: ${st.best}`;
  notifyGameTelegram("Cody Court",isCorrect?"Correct ruling":"Overruled",`${c.charge} — Lizzy chose ${verdict.toUpperCase()} using Exhibit${selected.length>1?"s":""} ${selected.map(i=>String.fromCharCode(65+i)).join(", ")}. Court answer: ${c.correct.toUpperCase()}. Score ${st.score}-${st.wrong}.`);
 });
}
/* Cody Court launcher lives inside Games folder */

/* ROCK PAPER SCISSORS */
const RK="lizzyRpsV46",choices=["rock","paper","scissors"],ri={rock:"✊",paper:"✋",scissors:"✌️"},beats={rock:"scissors",paper:"rock",scissors:"paper"};
function openRps(){const s=read(RK,{lizzy:0,mikael:0,draws:0}),w=win("rpsWindow","✊ ROCK PAPER SCISSORS.exe",`<div class="rpsScore">LIZZY <b id="rL">${s.lizzy}</b> — <b id="rM">${s.mikael}</b> MIKAEL <small>Draws: <span id="rD">${s.draws}</span></small></div><p>Mikael.exe is unnecessarily confident.</p><div class="rpsChoices">${choices.map(x=>`<button data-rps="${x}">${ri[x]}<small>${x}</small></button>`).join("")}</div><div id="rpsResult">Choose your weapon.</div>`);w.querySelectorAll("[data-rps]").forEach(b=>b.onclick=()=>{const you=b.dataset.rps,him=choices[Math.floor(Math.random()*3)],st=read(RK,{lizzy:0,mikael:0,draws:0});let t;if(you===him){st.draws++;t=`${ri[you]} vs ${ri[him]} — Draw. Mikael calls it tactical.`}else if(beats[you]===him){st.lizzy++;t=`${ri[you]} vs ${ri[him]} — Lizzy wins. Mikael.exe requests a recount.`}else{st.mikael++;t=`${ri[you]} vs ${ri[him]} — Mikael wins. You will hear about this again.`}write(RK,st);$("rpsResult").textContent=t;$("rL").textContent=st.lizzy;$("rM").textContent=st.mikael;$("rD").textContent=st.draws;notifyGameTelegram("Rock Paper Scissors",you===him?"Draw":(beats[you]===him?"Lizzy wins":"Mikael wins"),`Lizzy: ${you.toUpperCase()} • Mikael: ${him.toUpperCase()} • Score Lizzy ${st.lizzy} - ${st.mikael} Mikael • Draws ${st.draws}`)})}
/* RPS launcher lives inside Games folder */

/* LIZZY ASSISTANT */
const qa={"Where is Mikael?":["Probably doing Batman nonsense.","Mikael.exe is running somewhere it shouldn't be.","Last seen confidently pretending he knows what he's doing.","He may be conducting an unnecessary classified operation.","Current location: suspiciously unavailable.","Probably somewhere calling himself Mr Perfect."],"Who is Mr Perfect?":["According to Mikael: Mikael. Independent verification unavailable.","A highly confident individual named Mikael.","The title appears to be self-certified.","Ask Mikael and prepare for a very long explanation.","LizzyOS found one nomination. It was submitted by Mikael.","CLASSIFIED records indicate the nickname has caused controversy."],"What should I do today?":["Do something that makes today slightly better.","Drink water, eat something good, and cause a reasonable amount of chaos.","Maybe pasta. Analytics strongly support pasta.","Do one thing you've been putting off, then reward yourself.","Find something that makes you laugh.","Today's mission: protect your peace and enjoy yourself."],"What does the system think of me?":["High value. High attitude. Continued observation required.","Smart, kind and suspiciously competitive.","Pretty great. Attitude surcharge may apply.","Agent Yelizaveta remains a highly valued system user.","Intelligence: high. Beauty: confirmed. Attitude: under investigation.","LizzyOS assessment: worth keeping around 💗"],"Is Mikael right?":["Connection lost.","Statistically possible. Emotionally controversial.","Contact the Hater Investigation department.","LizzyOS encountered an unexpected error while processing that sentence.","On rare occasions, yes. Please don't tell him I said that.","This question has been forwarded to an independent tribunal."],"Tell me something random":["Cody still has dedicated legal counsel.","Batman traditionally works at night. Mikael considers this optional.","The Bank of Micky refuses to explain its financial model.","Pasta remains one of LizzyOS's most trusted recommendations.","There is probably another Mikael reference hidden somewhere on this website.","Cody Court currently has jurisdiction over several questionable Mikael activities."],"Does Mikael actually like me?":["Evidence strongly suggests yes. Like… embarrassingly strongly.","LizzyOS has reviewed the files. The answer appears to be very yes.","He built you an operating system. Draw your own conclusions 😂","CLASSIFIED answer: yes.","Probability: extremely high.","The amount of unnecessary detail on this website is compelling evidence."],"What is Cody doing?":["Probably consulting his lawyer.","Preparing another case against Mikael.","Improving his grappling while maintaining plausible deniability.","Cody is unavailable. Legal conference in progress.","Probably minding his business better than Mikael is.","Monitoring Mikael from a safe, legally protected distance."],"Am I a hater?":["The Hater Investigation remains active.","Professional status has not yet been revoked.","98% according to highly questionable Mikael-funded research.","You have been accused. LizzyOS cannot comment during active proceedings.","Only toward Mikael, apparently 😂","Your defence attorney may wish to challenge the evidence."],"Why does Mikael call himself Mr Perfect?":["Confidence. Mostly confidence.","Because humility.exe failed to install.","The title appears to be entirely self-funded.","Mikael submitted the nomination and approved it himself.","Nobody has managed to stop him.","The Mr Perfect propaganda department remains extremely well funded."],"Should I trust Mikael.exe?":["With supervision.","Trust level: 72%. Chaos level: 94%.","Probably, but keep Cody's lawyer nearby.","Yes… unless Batman mode activates.","LizzyOS recommends cautious optimism.","Mikael.exe has passed several tests that Mikael.exe designed itself."],"What does Mikael think of me?":["He notices more about you than he probably admits.","The files contain suspiciously positive information.","Smart, beautiful, funny and occasionally a professional hater.","You appear to rank extremely highly in MikaelOS analytics.","CLASSIFIED — but the summary is very positive 💗","Enough good things to fill an unnecessarily large website."],"Give me a compliment":["You're ridiculously easy to appreciate.","Smart looks good on you. So does the attitude, unfortunately.","You have the kind of presence people notice.","LizzyOS confirms: very pretty 💗","You're funny, thoughtful and far more special than this system can quantify.","Your smile has received excellent internal reviews."],"Roast Mikael":["Mikael calls himself Mr Perfect because peer review was unavailable.","Batman has a secret identity. Mikael has a public announcement.","His confidence has its own postcode.","Mikael.exe uses 94% of its processing power defending Mikael.","He wants to wrestle bears before mastering humility.","The Bank of Micky has fewer regulations than his self-confidence."],"Roast me":["Your attitude has more uptime than the actual website.","You could turn 'okay' into a 40-minute debate.","Four Eyes but somehow still missing Mikael's obvious correctness 😂","Your crying PR team deserves an award for rebranding it as detox.","You investigate this website like you're being paid.","Little Miss Attitude has entered the server."],"What should I eat?":["Pasta. This was not a difficult calculation.","Something comforting and actually filling.","LizzyOS recommends pasta with unreasonable confidence.","Whatever you're craving — unless you're about to say nothing.","Food first. Debates with Mikael later.","A proper meal. Snacks are not legal substitutes."],"Should I cry today?":["Only if you need to. The detox propaganda is optional 😂","LizzyOS permits emotional maintenance.","A little cleansing session? Your PR department approves.","If it helps, yes. If not, save the tears for Mikael's next argument.","Crying privileges remain active.","The system supports whatever helps you feel lighter."],"Is crying actually a detox?":["That's what the propaganda department would like us to believe.","Scientifically? LizzyOS is staying out of this one. 😂","Your emotional-cleansing marketing team says absolutely.","The Hater Investigation calls it suspiciously effective PR.","LizzyOS classification: cleansing-ish.","Mikael remains unconvinced by the official propaganda."],"Who runs LizzyOS?":["Technically Lizzy. Mikael will dispute this.","Agent Yelizaveta has user privileges. Mikael keeps finding admin buttons.","The system belongs to Lizzy. The chaos belongs to Mikael.","Cody's lawyer has significant influence.","Depends whether Mikael Takeover is active.","Official answer: Lizzy. Unofficial answer: complicated."],"What's my threat level?":["Pink Alert: highly adorable, moderately dangerous.","Threat level: Attitude Orange.","To Mikael's peace? Significant.","Cody considers you an ally, so threat assessment reduced.","Competitive threat: HIGH.","Overall: safe unless someone says Mikael is right."],"Tell me a secret":["MikaelOS files contain an unreasonable number of nice things about you.","Some LizzyOS systems are much softer than their labels suggest.","Cody Legal Team has excellent job security.","Mr Perfect secretly enjoys being challenged.","There are probably still things on this website you haven't found.","CLASSIFIED: Mikael notices the little things."],"Give me a random mission":["Make yourself laugh before the next hour ends.","Find one thing on LizzyOS you haven't opened recently.","Send someone a message that makes them smile.","Get water. Yes, this counts as a mission.","Avoid arguing with Mikael for 20 minutes. Difficulty: Legendary.","Give Cody one piece of legal advice."],"What does Cody think of Mikael?":["Client confidentiality applies.","Useful human. Questionable grappling opinions.","Cody respects him enough to keep suing him.","Potential friend. Potential defendant. Often both.","His lawyer has advised him not to answer.","Cody's official position is CLASSIFIED."],"What crime has Mikael committed today?":["Excessive confidence in the first degree.","Operating as Batman during daylight hours.","Unlicensed use of the title Mr Perfect.","Attempted grappling without Cody Legal approval.","Disturbing the peace with unnecessary propaganda.","Being suspiciously Mikael in a public setting."],"Should Mikael be found guilty?":["Cody Court would like to remind you that YOU are basically the judge 😂","Evidence is concerning.","Mikael requests a fair trial and several compliments.","Probably. But make him argue his case first.","LizzyOS cannot prejudice active proceedings. Cody can.","The prosecution appears extremely enthusiastic."],"Is Mikael Batman?":["He certainly behaves as though Gotham issued him a contract.","Batman usually waits until dark. That's all LizzyOS will say.","The Bat-Signal evidence is difficult to ignore.","Identity classified. Ego unclassified.","Mikael denies nothing.","Gotham HR has stopped responding."],"Why is Mikael Batman in daylight?":["Scheduling conflict.","He believes crime has no office hours.","Night mode was apparently too restrictive.","Because nobody successfully explained Batman to him.","Mikael calls it proactive crime prevention.","LizzyOS calls it a workplace policy violation."],"Who would win: Mikael or Cody?":["In court? Cody. He has Lizzy.","In grappling? Negotiations are ongoing.","Mikael has size. Cody has lawyers.","Nobody wins once legal fees begin.","Cody's legal team objects to the premise.","LizzyOS recommends settling out of court."],"How much attitude do I have?":["Current reading: impressive.","Enough to power a small desktop environment.","97%. The remaining 3% is reserved for plausible deniability.","Little Miss Attitude mode is fully operational.","Above recommended operating limits.","Mikael has submitted multiple complaints."],"Am I competitive?":["The system laughed when you asked.","Yes. Next question.","Competitive level: please don't turn this into a competition.","Bowling records have been entered into evidence.","Suspiciously so.","LizzyOS recommends never saying 'I bet you can't' around you."],"What is Agent Yelizaveta's status?":["ONLINE. Observing everything.","Active. Clearance level: suspicious.","Operational with elevated attitude readings.","Currently investigating LizzyOS instead of minding her business.","Status: Pretty. Dangerous. Logged in.","Agent profile remains classified-ish."],"Give me a LizzyOS prediction":["You will open something you weren't planning to open.","Mikael will say something unnecessarily confident.","Pasta will remain a strong possibility.","Cody may require legal representation again.","You will probably find another reason to judge Mikael.","A random system message will become suspiciously accurate."],"Should I open CLASSIFIED?":["You were going to anyway.","Legally? Questionable. Spiritually? Absolutely.","Agent Yelizaveta has never respected a suspicious folder.","Cody's lawyer may already have clearance.","LizzyOS advises caution. MikaelOS advises drama.","OPEN FILE button detected. Self-control not detected."],"Should I check the Secret Shelf?":["Your Micky Bucs are already nervous.","Financial responsibility says no. Curiosity says immediately.","The Shelf has noticed you asking.","Only if you're prepared to negotiate.","Mikael's counteroffer department has entered the chat.","Secret Shelf addiction risk: elevated."],"Give me relationship advice":["Say what you mean, listen properly, and don't turn every disagreement into Cody Court.","Choose kindness even when you're annoyed.","Good communication beats mind-reading every time.","Make room for jokes and serious conversations.","Remember the little things. They usually aren't little.","And occasionally admit Mikael is right. For scientific purposes 😂"],"Give Mikael advice":["Use humility at least once per operating cycle.","Stop challenging creatures with lawyers to grappling matches.","Batman works nights.","Not every disagreement requires a closing argument.","Mr Perfect may benefit from peer review.","Keep noticing the little things. That part is working."],"How is my day going?":["LizzyOS only has partial data, but I'm hoping it's getting better.","Current forecast: manageable with a chance of nonsense.","System recommendation: one nice thing for yourself.","If it's good, enjoy it. If it's rough, don't let one part become the whole day.","Your daily mood button probably knows more than I do.","Still enough time left to improve it."],"Do I need a break?":["If you're asking, probably.","Five minutes away from the screen wouldn't hurt.","Yes. LizzyOS will survive without you briefly.","Take the break before your brain files a complaint.","Water, stretch, reset.","Permission granted. Go disappear for a little bit."]};

async function notifyAssistantTelegram(question,answer){
 try{await fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"assistant_activity",question,answer,createdAt:new Date().toISOString()})})}
 catch(e){console.warn("Assistant Telegram failed",e)}
}
function openAssistant(){const w=win("lizzyAssistantWindow","✨ LIZZY ASSISTANT",`<div class="assistantOrb">✨</div><h2>Lizzy Assistant</h2><p>How may the operating system be unnecessarily helpful?</p><div class="assistantQuestions">${Object.keys(qa).map(q=>`<button data-q="${esc(q)}">${esc(q)}</button>`).join("")}</div><div id="assistantAnswer">Select a question.</div>`);w.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{const question=b.dataset.q,a=qa[question],answer=a[Math.floor(Math.random()*a.length)];$("assistantAnswer").textContent=answer;notifyAssistantTelegram(question,answer)})}
icon("lizzyAssistantIcon","✨","Lizzy Assistant",openAssistant);
window.LizzyFunApps={openCourt,openRps,openAssistant,openDay};

/* DYNAMIC WALLPAPER + BAT SIGNAL TAKEOVER */
function phase(){const h=new Date().getHours();return h<5?"late":h<12?"morning":h<17?"afternoon":h<21?"evening":"night"}
function takeover(){return document.body.classList.contains("mikaelTakeoverActive")}
function wallpaper(){document.documentElement.dataset.dynamicWallpaper=phase();let s=$("mikaelBatSignal");if(!s){s=document.createElement("div");s.id="mikaelBatSignal";s.innerHTML='<div class="batBeam"></div><div class="batMark">🦇</div><small>MIKAEL TAKEOVER</small>';desk().appendChild(s)}s.classList.toggle("active",takeover())}
wallpaper();window.LizzyPerf?.add?.("dynamicWallpaper",30000,wallpaper);window.addEventListener("mikaelTakeoverChanged",wallpaper);
window.LizzyFunApps={openCourt,openRps,openAssistant,openDay};
})();

/* V4.8 Cody Legal Documents theme */
(()=>{const rx=/cody\s*(legal|documents)|legal\s*documents.*cody|subject:\s*cody/i;function scan(){for(const el of document.querySelectorAll(".classified-reader,.classifiedReader,.file-reader,.fileReader,.classified-file,.classifiedFile,.document-reader,.documentReader,.modal,.window"))if(rx.test((el.textContent||"").slice(0,6000))){el.classList.add("codyLegalTheme");if(!el.querySelector(".codyLegalWatermark")){const w=document.createElement("div");w.className="codyLegalWatermark";w.setAttribute("aria-hidden","true");w.innerHTML='<div class="codyPhotoBackground"></div><div class="codySeal">⚖</div><div class="codyStamp">SUBJECT: CODY<br><small>LEGAL REPRESENTATION ACTIVE</small></div>';el.prepend(w)}}}window.addEventListener("load",()=>setTimeout(scan,500));new MutationObserver(scan).observe(document.body,{childList:true,subtree:true})})();


/* V4.11 — exact Cody purchased-file theming */
function applyCodyPurchasedFileTheme(){
 document.querySelectorAll(".classifiedReader").forEach(reader=>{
  const t=(reader.innerText||reader.textContent||"");
  const isCody=/Cody Legal Documents/i.test(t)||(/CODY ALADEEN/i.test(t)&&/LEGAL COUNSEL/i.test(t));
  reader.classList.toggle("codyLegalPhotoActive",isCody);
 });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{
 new MutationObserver(applyCodyPurchasedFileTheme).observe(document.body,{childList:true,subtree:true,characterData:true});
 applyCodyPurchasedFileTheme();
}); else {
 new MutationObserver(applyCodyPurchasedFileTheme).observe(document.body,{childList:true,subtree:true,characterData:true});
 applyCodyPurchasedFileTheme();
}
