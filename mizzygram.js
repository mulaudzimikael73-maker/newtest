(()=>{"use strict";

/* =====================================================================
   MizzyGram — Phase 1
   Everything is stored in this browser (IndexedDB) for now.
   To change Lizzy's username / bio / picture, edit CONFIG below.
   ===================================================================== */
const CONFIG={
  me:"lizzy",
  users:{
    lizzy:{
      id:"lizzy",
      username:"lizzy",
      name:"Lizzy",
      avatar:"assets/lizzy.png",
      bio:"Little Miss Attitude 💗\nMain character. Mikael is supporting cast."
    }
  },
  maxImage:1080,      // longest side of an uploaded photo, in px
  quality:.85,        // JPEG quality
  maxCaption:500,
  maxComment:300
};

const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);

/* ---------- icons ---------- */
const I={
  heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 1 1 21 11.5z"/></svg>',
  photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="9" cy="9" r="1.6"/><path d="M21 15l-5-5L5 21"/></svg>',
  search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>',
  grid:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  close:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  send:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>'
};

/* =====================================================================
   Storage layer — the only part that touches the browser's database.
   (When we go multi-user later, this is the piece we swap for the
   Cloudflare Worker.)
   ===================================================================== */
const Store=(()=>{
  let db=null,persistent=false;
  const mem={posts:[],meta:{}};
  const open=()=>new Promise(res=>{
    if(!window.indexedDB)return res(false);
    let req;
    try{req=indexedDB.open("mizzygram",1)}catch{return res(false)}
    req.onupgradeneeded=()=>{const d=req.result;d.createObjectStore("posts",{keyPath:"id"});d.createObjectStore("meta")};
    req.onsuccess=()=>{db=req.result;res(true)};
    req.onerror=req.onblocked=()=>res(false);
  });
  const run=(store,mode,fn)=>new Promise((res,rej)=>{
    const t=db.transaction(store,mode),r=fn(t.objectStore(store));
    t.oncomplete=()=>res(r&&r.result);
    t.onerror=t.onabort=()=>rej(t.error||new Error("Storage error"));
  });
  return{
    async init(){persistent=await open();return persistent},
    get persistent(){return persistent},
    async allPosts(){return persistent?(await run("posts","readonly",s=>s.getAll()))||[]:[...mem.posts]},
    async savePost(p){
      if(!persistent){const i=mem.posts.findIndex(x=>x.id===p.id);i<0?mem.posts.push(p):mem.posts[i]=p;return}
      await run("posts","readwrite",s=>s.put(p));
    },
    async getMeta(k,fallback){
      if(!persistent)return k in mem.meta?mem.meta[k]:fallback;
      const v=await run("meta","readonly",s=>s.get(k));
      return v===undefined?fallback:v;
    },
    async setMeta(k,v){
      if(!persistent){mem.meta[k]=v;return}
      await run("meta","readwrite",s=>s.put(v,k));
    }
  };
})();

/* ---------- state ---------- */
const state={posts:[],following:false,view:"home",pending:null,sheet:null};
const VIEWS=["home","explore","post","notifications","profile"];
const me=()=>CONFIG.users[CONFIG.me];
const userOf=id=>CONFIG.users[id]||{username:"unknown",avatar:""};
const newestFirst=()=>state.posts.sort((a,b)=>b.createdAt-a.createdAt);

function ago(t){
  const s=Math.max(0,(Date.now()-t)/1000);
  if(s<60)return"just now";
  if(s<3600)return Math.floor(s/60)+"m";
  if(s<86400)return Math.floor(s/3600)+"h";
  if(s<604800)return Math.floor(s/86400)+"d";
  return new Date(t).toLocaleDateString([],{day:"numeric",month:"short",year:"numeric"});
}
let toastTimer;
function toast(msg){
  const t=$("toast");t.textContent=msg;t.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600);
}

/* ---------- photo processing ---------- */
function prepareImage(file){
  return new Promise((resolve,reject)=>{
    if(!file||!/^image\//.test(file.type))return reject(new Error("Please choose a photo (JPG, PNG or WebP)."));
    const url=URL.createObjectURL(file),img=new Image();
    img.onload=()=>{
      try{
        const scale=Math.min(1,CONFIG.maxImage/Math.max(img.naturalWidth,img.naturalHeight));
        const w=Math.round(img.naturalWidth*scale),h=Math.round(img.naturalHeight*scale);
        const c=document.createElement("canvas");c.width=w;c.height=h;
        const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,w,h);x.drawImage(img,0,0,w,h);
        resolve(c.toDataURL("image/jpeg",CONFIG.quality));
      }catch(e){reject(new Error("Couldn't process that photo."))}
      finally{URL.revokeObjectURL(url)}
    };
    img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error("Couldn't read that photo. Try a JPG or PNG."))};
    img.src=url;
  });
}

/* =====================================================================
   Views
   ===================================================================== */
function postCard(p){
  const u=userOf(p.userId),liked=p.likes.includes(CONFIG.me),n=p.comments.length;
  const alt=p.caption?`Photo by ${u.username}: ${p.caption.slice(0,100)}`:`Photo by ${u.username}`;
  return `<article class="post" data-id="${p.id}">
    <header class="postHead">
      <span class="ava"><img src="${esc(u.avatar)}" alt=""></span>
      <a class="uname" href="#profile">${esc(u.username)}</a>
      <time datetime="${new Date(p.createdAt).toISOString()}">${ago(p.createdAt)}</time>
    </header>
    <div class="photo" data-dbl><img src="${p.image}" alt="${esc(alt)}"><span class="burst" aria-hidden="true">${I.heart}</span></div>
    <div class="actions">
      <button class="act ${liked?"on":""}" data-like aria-pressed="${liked}" aria-label="${liked?"Unlike":"Like"}">${I.heart}</button>
      <button class="act" data-comment aria-label="Comment">${I.comment}</button>
    </div>
    ${p.likes.length?`<div class="likes">${p.likes.length} ${p.likes.length===1?"like":"likes"}</div>`:""}
    ${p.caption?`<div class="cap"><b>${esc(u.username)}</b>${esc(p.caption)}</div>`:""}
    ${n?`<button class="viewC" data-comment>View ${n===1?"1 comment":`all ${n} comments`}</button>`:""}
  </article>`;
}

function emptyState(icon,title,text,cta){
  return `<div class="empty"><div class="bigIcon">${icon}</div><h2>${title}</h2><p>${text}</p>${cta||""}</div>`;
}

const renderers={
  home(){
    if(!state.posts.length)return emptyState(I.photo,"Nothing here yet","Your feed is empty. Share the first photo in Our World.",'<a class="btn primary" href="#post">Post a photo</a>');
    return state.posts.map(postCard).join("");
  },
  explore(){
    if(!state.posts.length)return emptyState(I.search,"Nothing to explore","When photos get posted, they'll show up here.");
    return `<h1 class="pageTitle">Explore</h1><div class="grid">${state.posts.map(tile).join("")}</div>`;
  },
  post(){
    const pend=state.pending;
    return `<form class="compose" id="composeForm" novalidate>
      <label class="drop">
        <input type="file" id="photoInput" accept="image/*" aria-label="Choose a photo">
        ${pend?`<img src="${pend.image}" alt="Selected photo preview">`:`<span class="dropHint">${I.photo}<b>Choose a photo</b><span>Tap to pick one from your device</span></span>`}
      </label>
      <label class="lbl" for="caption">Caption</label>
      <textarea id="caption" maxlength="${CONFIG.maxCaption}" placeholder="Write a caption…">${esc(pend?pend.caption:"")}</textarea>
      <div class="count" id="capCount">0/${CONFIG.maxCaption}</div>
      <div class="err" id="postErr" role="alert"></div>
      <button class="btn primary block" id="shareBtn" type="submit" ${pend?"":"disabled"}>Post</button>
    </form>`;
  },
  notifications(){
    return emptyState('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',"All quiet","Likes and comments will show up here.");
  },
  profile(){
    const u=me(),mine=state.posts.filter(p=>p.userId===u.id);
    const followers=state.following?1:0;
    return `<section class="pHead">
        <div class="pAva"><img src="${esc(u.avatar)}" alt="${esc(u.name)}'s profile picture"></div>
        <div class="stats">
          <div><b>${mine.length}</b><span>Posts</span></div>
          <div><b id="followersNum">${followers}</b><span>Followers</span></div>
          <div><b>0</b><span>Following</span></div>
        </div>
      </section>
      <section class="pInfo">
        <h1 class="pName">${esc(u.name)}</h1>
        <div class="pUser">@${esc(u.username)}</div>
        <p class="pBio">${esc(u.bio)}</p>
        <button class="btn ${state.following?"ghost":"primary"} block" id="followBtn" aria-pressed="${state.following}">${state.following?"Following":"Follow"}</button>
      </section>
      <div class="gridLabel">${I.grid}<span>Posts</span></div>
      ${mine.length?`<div class="grid">${mine.map(tile).join("")}</div>`:`<div class="gridEmpty">No posts yet.</div>`}`;
  }
};

const tile=p=>`<button class="tile" data-open="${p.id}" aria-label="Open photo${p.caption?": "+esc(p.caption.slice(0,60)):""}"><img src="${p.image}" alt=""></button>`;

/* ---------- render + routing ---------- */
function render(keepScroll){
  const v=$("view"),top=v.scrollTop;
  v.innerHTML=renderers[state.view]();
  v.scrollTop=keepScroll?top:0;
  document.querySelectorAll(".bottom a").forEach(a=>{
    if(a.dataset.view===state.view)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
  });
  if(state.view==="post")bindCompose();
}
function route(){
  const h=(location.hash||"#home").slice(1);
  state.view=VIEWS.includes(h)?h:"home";
  closeSheet(true);
  render(false);
}
window.addEventListener("hashchange",route);

/* ---------- create post ---------- */
function bindCompose(){
  const input=$("photoInput"),cap=$("caption"),count=$("capCount"),err=$("postErr"),btn=$("shareBtn");
  const upd=()=>{count.textContent=`${cap.value.length}/${CONFIG.maxCaption}`;if(state.pending)state.pending.caption=cap.value};
  upd();cap.addEventListener("input",upd);
  input.addEventListener("change",async()=>{
    err.textContent="";
    const f=input.files&&input.files[0];if(!f)return;
    try{
      const image=await prepareImage(f);
      state.pending={image,caption:cap.value};
      render(true);$("caption").focus();
    }catch(e){err.textContent=e.message}
  });
  $("composeForm").addEventListener("submit",async e=>{
    e.preventDefault();
    if(!state.pending)return;
    btn.disabled=true;err.textContent="";
    const post={id:uid(),userId:CONFIG.me,image:state.pending.image,caption:cap.value.trim(),createdAt:Date.now(),likes:[],comments:[]};
    try{
      await Store.savePost(post);
      state.posts.push(post);newestFirst();
      state.pending=null;
      toast("Posted 💗");
      location.hash="#home";
      if(state.view==="home")render(false);
    }catch(e2){
      err.textContent="Couldn't save that post — your browser may be out of space.";
      btn.disabled=false;
    }
  });
}

/* ---------- likes ---------- */
async function toggleLike(id,forceOn){
  const p=state.posts.find(x=>x.id===id);if(!p)return;
  const i=p.likes.indexOf(CONFIG.me);
  if(i<0)p.likes.push(CONFIG.me);else if(!forceOn)p.likes.splice(i,1);
  try{await Store.savePost(p)}catch{toast("Couldn't save that like")}
  render(true);renderSheet();
}

/* ---------- sheets (comments + post viewer) ---------- */
let lastFocus=null;
function openSheet(s){lastFocus=document.activeElement;state.sheet=s;renderSheet();}
function closeSheet(silent){
  if(!state.sheet)return;
  state.sheet=null;$("sheet").hidden=true;$("sheet").innerHTML="";
  if(!silent&&lastFocus&&document.contains(lastFocus))lastFocus.focus();
}
function renderSheet(){
  const el=$("sheet"),s=state.sheet;
  if(!s){el.hidden=true;return}
  const p=state.posts.find(x=>x.id===s.id);
  if(!p){closeSheet();return}
  el.hidden=false;
  if(s.type==="post"){
    el.innerHTML=`<div class="sheetBody" role="dialog" aria-modal="true" aria-label="Photo">
      <div class="sheetHead"><h2>Photo</h2><button class="act" data-close aria-label="Close">${I.close}</button></div>
      <div class="sheetScroll">${postCard(p)}</div></div>`;
    el.querySelector("[data-close]").focus();
  }else{
    const draft=el.querySelector("#cInput")?el.querySelector("#cInput").value:"";
    el.innerHTML=`<div class="sheetBody" role="dialog" aria-modal="true" aria-label="Comments">
      <div class="sheetHead"><h2>Comments</h2><button class="act" data-close aria-label="Close">${I.close}</button></div>
      <div class="sheetScroll">${p.comments.length?`<div class="cList">${p.comments.map(c=>{
        const u=userOf(c.userId);
        return `<div class="cItem"><span class="ava sm"><img src="${esc(u.avatar)}" alt=""></span><div><b>${esc(u.username)}</b> ${esc(c.text)}<time>${ago(c.createdAt)}</time></div></div>`}).join("")}</div>`:`<div class="cNone">No comments yet. Say something nice 💗</div>`}</div>
      <form class="cForm" id="cForm"><input id="cInput" maxlength="${CONFIG.maxComment}" placeholder="Add a comment…" aria-label="Add a comment" autocomplete="off" value="${esc(draft)}"><button class="btn primary" type="submit" aria-label="Send comment">${I.send.replace('<svg','<svg width="20" height="20"')}</button></form></div>`;
    const list=el.querySelector(".sheetScroll");list.scrollTop=list.scrollHeight;
    if(!draft||s.focusInput){el.querySelector("#cInput").focus();}
  }
}
$("sheet").addEventListener("click",e=>{
  if(e.target.id==="sheet"||e.target.closest("[data-close]"))return closeSheet();
  handlePostClick(e);
});
$("sheet").addEventListener("submit",async e=>{
  e.preventDefault();
  const s=state.sheet;if(!s||s.type!=="comments")return;
  const inp=$("cInput"),text=inp.value.trim();if(!text)return;
  const p=state.posts.find(x=>x.id===s.id);if(!p)return;
  p.comments.push({id:uid(),userId:CONFIG.me,text,createdAt:Date.now()});
  try{await Store.savePost(p)}catch{toast("Couldn't save that comment")}
  inp.value="";
  render(true);renderSheet();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet()});

/* ---------- click handling ---------- */
function handlePostClick(e){
  const art=e.target.closest("[data-id]");
  if(e.target.closest("[data-like]")&&art)return toggleLike(art.dataset.id);
  if(e.target.closest("[data-comment]")&&art)return openSheet({type:"comments",id:art.dataset.id,focusInput:true});
}
$("view").addEventListener("click",e=>{
  const t=e.target.closest("[data-open]");
  if(t)return openSheet({type:"post",id:t.dataset.open});
  if(e.target.closest("#followBtn"))return toggleFollow();
  handlePostClick(e);
});
$("view").addEventListener("dblclick",e=>{
  const ph=e.target.closest("[data-dbl]"),art=e.target.closest("[data-id]");
  if(!ph||!art)return;
  ph.classList.remove("pop");void ph.offsetWidth;ph.classList.add("pop");
  toggleLike(art.dataset.id,true);
});

/* ---------- follow ---------- */
async function toggleFollow(){
  state.following=!state.following;
  try{await Store.setMeta("following:"+CONFIG.me,state.following)}catch{}
  render(true);
}

/* ---------- boot ---------- */
(async function boot(){
  await Store.init();
  try{
    state.posts=await Store.allPosts();newestFirst();
    state.following=await Store.getMeta("following:"+CONFIG.me,false);
  }catch{}
  route();
  if(!Store.persistent)toast("Heads up: this browser can't save posts");
})();
})();
