/**
 * LizzyOS Worker — existing notifications + Secret Shelf negotiation only
 * KV: LIZZY_CLAIMS
 * Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 * Telegram webhook: /telegram
 */
const H={"content-type":"application/json","access-control-allow-origin":"*","access-control-allow-headers":"Content-Type","access-control-allow-methods":"GET,POST,OPTIONS"};
const json=(x,s=200)=>new Response(JSON.stringify(x),{status:s,headers:H});
async function tg(env,m,p){const r=await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${m}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(p)});return r.json();}
async function getClaim(env,id){return env.LIZZY_CLAIMS.get(`claim:${id}`,{type:"json"})||env.LIZZY_CLAIMS.get(id,{type:"json"});}
async function putClaim(env,c){await env.LIZZY_CLAIMS.put(`claim:${c.claimId}`,JSON.stringify(c));}
const id=()=>`bid_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
const shelfStateKey=itemId=>`secret_shelf:item:${itemId}:latest`;
async function putShelfState(env,c){
 if(!c?.itemId)return;
 await env.LIZZY_CLAIMS.put(shelfStateKey(c.itemId),JSON.stringify({
   claimId:c.claimId,itemId:c.itemId,item:c.item,offer:c.offer,status:c.status,
   counterOffer:c.counterOffer??null,createdAt:c.createdAt,decidedAt:c.decidedAt||null,
   updatedAt:new Date().toISOString()
 }));
}



/* ===== CROSS-DEVICE MIKAEL REVERSE TOKENS ===== */
const MIKAEL_TOKEN_STATE_KEY="mikael:reverse_tokens:v1";
const MIKAEL_REDEMPTION_INDEX_KEY="mikael:redemptions:index:v1";
async function getMikaelTokenState(env){
  const s=await env.LIZZY_CLAIMS.get(MIKAEL_TOKEN_STATE_KEY,{type:"json"});
  return s&&typeof s==="object"?s:{inventory:{},history:[]};
}
async function putMikaelTokenState(env,s){
  await env.LIZZY_CLAIMS.put(MIKAEL_TOKEN_STATE_KEY,JSON.stringify(s));
}
async function getRedemptionIndex(env){
  const x=await env.LIZZY_CLAIMS.get(MIKAEL_REDEMPTION_INDEX_KEY,{type:"json"});
  return Array.isArray(x)?x:[];
}
async function putRedemptionIndex(env,x){
  await env.LIZZY_CLAIMS.put(MIKAEL_REDEMPTION_INDEX_KEY,JSON.stringify(x.slice(-100)));
}
function rid(){return `reverse_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;}


/* ===== 💰 MICKY BANK CLAIMABLE DEPOSITS =====
   A deposit created by Mikael sits in KV as "pending" forever (30 day TTL)
   until someone on Lizzy's side presses "Claim Deposit". */
const DEPOSIT_INDEX_KEY="micky_bank:deposits:index:v1";
const depositKey=id=>`micky_bank:deposit:${id}`;
const did=()=>`dep_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
async function getDepositIndex(env){
  const x=await env.LIZZY_CLAIMS.get(DEPOSIT_INDEX_KEY,{type:"json"});
  return Array.isArray(x)?x:[];
}
async function putDepositIndex(env,x){
  await env.LIZZY_CLAIMS.put(DEPOSIT_INDEX_KEY,JSON.stringify([...new Set(x)].slice(-200)));
}
async function getDeposit(env,id){
  return env.LIZZY_CLAIMS.get(depositKey(id),{type:"json"});
}
async function putDeposit(env,d){
  await env.LIZZY_CLAIMS.put(depositKey(d.id),JSON.stringify(d),{expirationTtl:2592000});
}
async function listDeposits(env,onlyPending=true){
  const ids=await getDepositIndex(env),out=[];
  for(const id of ids){
    const d=await getDeposit(env,id);
    if(!d)continue;
    if(onlyPending&&d.status!=="pending")continue;
    out.push(d);
  }
  return out.sort((a,b)=>String(a.createdAt).localeCompare(String(b.createdAt)));
}
async function createDeposit(env,amount,note,source){
  const amt=Math.max(1,Math.floor(Number(amount)||0));
  const d={
    id:did(),amount:amt,note:String(note||"").slice(0,300),
    source:String(source||"website").slice(0,60),
    status:"pending",createdAt:new Date().toISOString(),
    claimedAt:null,walletAfter:null
  };
  await putDeposit(env,d);
  const ids=await getDepositIndex(env);ids.push(d.id);await putDepositIndex(env,ids);
  const pending=await listDeposits(env,true);
  const total=pending.reduce((s,x)=>s+Number(x.amount||0),0);
  await tg(env,"sendMessage",{
    chat_id:env.TELEGRAM_CHAT_ID,
    text:`💰 MICKY BANK DEPOSIT CREATED\n\n+${amt} MB for Lizzy${d.note?`\nNote: ${d.note}`:""}\n\nPending vouchers: ${pending.length}\nPending total: ${total} MB\n\nIt stays unclaimed until Lizzy presses “Claim Deposit”.\n\nDeposit ID:\n${d.id}`
  });
  return {deposit:d,pendingCount:pending.length,pendingTotal:total};
}

/* ===== 💌 MESSAGES FROM MIKAEL =====
   A little note or "thinking of you" ping that sits in KV as "pending"
   until Lizzy's site shows it to her and she dismisses it. */
const MESSAGE_INDEX_KEY="lizzy_messages:index:v1";
const messageKey=id=>`lizzy_messages:message:${id}`;
const mid=()=>`msg_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
async function getMessageIndex(env){
  const x=await env.LIZZY_CLAIMS.get(MESSAGE_INDEX_KEY,{type:"json"});
  return Array.isArray(x)?x:[];
}
async function putMessageIndex(env,x){
  await env.LIZZY_CLAIMS.put(MESSAGE_INDEX_KEY,JSON.stringify([...new Set(x)].slice(-200)));
}
async function getMessage(env,id){
  return env.LIZZY_CLAIMS.get(messageKey(id),{type:"json"});
}
async function putMessage(env,m){
  await env.LIZZY_CLAIMS.put(messageKey(m.id),JSON.stringify(m),{expirationTtl:2592000});
}
async function listMessages(env,onlyPending=true){
  const ids=await getMessageIndex(env),out=[];
  for(const id of ids){
    const m=await getMessage(env,id);
    if(!m)continue;
    if(onlyPending&&m.status!=="pending")continue;
    out.push(m);
  }
  return out.sort((a,b)=>String(a.createdAt).localeCompare(String(b.createdAt)));
}
async function createMessage(env,text,source){
  const m={
    id:mid(),text:String(text||"").slice(0,500),
    source:String(source||"website").slice(0,60),
    status:"pending",createdAt:new Date().toISOString(),
    seenAt:null
  };
  await putMessage(env,m);
  const ids=await getMessageIndex(env);ids.push(m.id);await putMessageIndex(env,ids);
  const pending=await listMessages(env,true);
  await tg(env,"sendMessage",{
    chat_id:env.TELEGRAM_CHAT_ID,
    text:`💌 MESSAGE QUEUED FOR LIZZY\n\n"${m.text}"\n\nIt'll show up on her screen next time she has LizzyOS open.\n\nUnseen messages waiting: ${pending.length}`
  });
  return {message:m,pendingCount:pending.length};
}

/* ===== 💗 SYNCED FEELINGS — MIKAEL'S MOOD =====
   A single current value, not a queue — always just "what Mikael feels right now". */
const MIKAEL_MOOD_KEY="mikael_mood:current:v1";
async function getMikaelMood(env){
  return env.LIZZY_CLAIMS.get(MIKAEL_MOOD_KEY,{type:"json"});
}
async function setMikaelMood(env,text,source){
  const m={text:String(text||"").slice(0,200),at:new Date().toISOString(),source:String(source||"website").slice(0,60)};
  await env.LIZZY_CLAIMS.put(MIKAEL_MOOD_KEY,JSON.stringify(m));
  await tg(env,"sendMessage",{chat_id:env.TELEGRAM_CHAT_ID,text:`💗 YOUR MOOD SET\n\n"${m.text}"\n\nLizzy's Today's Connection screen will show this alongside her own mood.`});
  return m;
}

/* ===== 💭 "I WONDER IF…" — SHARED THOUGHT BOARD =====
   A running feed of open musings from either of you. Each thought can
   carry exactly one reply from the other person. */
const THOUGHT_INDEX_KEY="lizzy_thoughts:index:v1";
const LAST_UNANSWERED_KEY="lizzy_thoughts:last_unanswered_lizzy:v1";
const thoughtKey=id=>`lizzy_thoughts:thought:${id}`;
const thid=()=>`thought_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;

async function getThoughtIndex(env){
  const x=await env.LIZZY_CLAIMS.get(THOUGHT_INDEX_KEY,{type:"json"});
  return Array.isArray(x)?x:[];
}
async function putThoughtIndex(env,x){
  await env.LIZZY_CLAIMS.put(THOUGHT_INDEX_KEY,JSON.stringify([...new Set(x)].slice(-300)));
}
async function getThought(env,id){
  return env.LIZZY_CLAIMS.get(thoughtKey(id),{type:"json"});
}
async function putThought(env,t){
  await env.LIZZY_CLAIMS.put(thoughtKey(t.id),JSON.stringify(t),{expirationTtl:15552000});
}
async function listThoughts(env,limit=50){
  const ids=await getThoughtIndex(env);
  const out=[];
  for(const id of ids){
    const t=await getThought(env,id);
    if(t)out.push(t);
  }
  out.sort((a,b)=>String(a.createdAt).localeCompare(String(b.createdAt)));
  return out.slice(-limit);
}
async function createThought(env,author,text,source){
  const t={
    id:thid(),author:author==="Mikael"?"Mikael":"Lizzy",
    text:String(text||"").slice(0,500),
    createdAt:new Date().toISOString(),
    source:String(source||"website").slice(0,60),
    reply:null
  };
  await putThought(env,t);
  const ids=await getThoughtIndex(env);ids.push(t.id);await putThoughtIndex(env,ids);
  if(t.author==="Lizzy"){
    await env.LIZZY_CLAIMS.put(LAST_UNANSWERED_KEY,t.id);
    await tg(env,"sendMessage",{
      chat_id:env.TELEGRAM_CHAT_ID,
      text:`💭 LIZZY WONDERS...\n\n"${t.text}"\n\nReply with:\n/answer your reply here`
    });
  }else{
    await tg(env,"sendMessage",{
      chat_id:env.TELEGRAM_CHAT_ID,
      text:`💭 YOUR WONDER IS ON THE BOARD\n\n"${t.text}"\n\nIt'll show up for Lizzy to answer next time she opens the Thought Board.`
    });
  }
  return t;
}
async function answerThought(env,id,replyText,replyAuthor,source){
  const t=await getThought(env,id);
  if(!t)return null;
  if(t.reply)return t;
  t.reply={
    author:replyAuthor==="Mikael"?"Mikael":"Lizzy",
    text:String(replyText||"").slice(0,500),
    repliedAt:new Date().toISOString(),
    source:String(source||"website").slice(0,60)
  };
  await putThought(env,t);
  if(t.reply.author==="Lizzy"){
    await tg(env,"sendMessage",{
      chat_id:env.TELEGRAM_CHAT_ID,
      text:`💭 LIZZY ANSWERED YOUR WONDER\n\nYou wondered: "${t.text}"\n\nShe said: "${t.reply.text}"`
    });
  }else{
    await tg(env,"sendMessage",{
      chat_id:env.TELEGRAM_CHAT_ID,
      text:`💭 YOU ANSWERED LIZZY'S WONDER\n\nShe wondered: "${t.text}"\n\nYou said: "${t.reply.text}"`
    });
  }
  return t;
}
async function answerLatestUnansweredFromLizzy(env,replyText,source){
  const id=await env.LIZZY_CLAIMS.get(LAST_UNANSWERED_KEY);
  if(!id)return null;
  const t=await answerThought(env,id,replyText,"Mikael",source);
  if(t)await env.LIZZY_CLAIMS.delete(LAST_UNANSWERED_KEY);
  return t;
}

export default{async fetch(req,env){
 if(req.method==="OPTIONS")return json({ok:true});
 const u=new URL(req.url);

 if(req.method==="GET"){
   if(u.searchParams.get("mikaelTokens")==="1"){
     const state=await getMikaelTokenState(env);
     return json({success:true,state});
   }
   if(u.searchParams.get("pendingMickyDeposits")==="1"){
     const deposits=await listDeposits(env,true);
     return json({success:true,deposits,pendingCount:deposits.length,pendingTotal:deposits.reduce((s,x)=>s+Number(x.amount||0),0)});
   }
   if(u.searchParams.get("mickyDepositHistory")==="1"){
     const deposits=await listDeposits(env,false);
     return json({success:true,deposits});
   }
   if(u.searchParams.get("pendingLizzyMessages")==="1"){
     const messages=await listMessages(env,true);
     return json({success:true,messages,pendingCount:messages.length});
   }
   if(u.searchParams.get("mikaelMood")==="1"){
     const mood=await getMikaelMood(env);
     return json({success:true,mood:mood||null});
   }
   if(u.searchParams.get("thoughtBoard")==="1"){
     const thoughts=await listThoughts(env,50);
     return json({success:true,thoughts});
   }
   if(u.searchParams.get("pendingReverseRedemptions")==="1"){
     const ids=await getRedemptionIndex(env),items=[];
     for(const id of ids){
       const r=await env.LIZZY_CLAIMS.get(`mikael:redemption:${id}`,{type:"json"});
       if(r&&!r.acknowledged)items.push(r);
     }
     return json({success:true,redemptions:items});
   }
   const shelfItem=u.searchParams.get("shelfItem");
   if(shelfItem){
     const state=await env.LIZZY_CLAIMS.get(shelfStateKey(shelfItem),{type:"json"});
     return state?json({success:true,state}):json({success:false,error:"No negotiation yet"},404);
   }
   const claimId=u.searchParams.get("claimId");
   if(claimId){const c=await getClaim(env,claimId);return c?json({success:true,claim:c}):json({success:false,error:"Claim not found"},404);}
   return new Response("💗 LizzyOS Notification System: ONLINE",{headers:{"access-control-allow-origin":"*"}});
 }

 if(u.pathname==="/telegram"&&req.method==="POST"){
   const update=await req.json();
   if(update.callback_query){
     const q=update.callback_query,data=q.data||"",sep=data.indexOf(":");
     if(sep<0)return json({ok:true});
     const action=data.slice(0,sep),claimId=data.slice(sep+1),c=await getClaim(env,claimId);
     await tg(env,"answerCallbackQuery",{callback_query_id:q.id});
     if(!c)return json({ok:true});
     if(action==="accept"){
       c.status="accepted";c.acceptedPrice=Number(c.offer||0);c.decidedAt=new Date().toISOString();await putClaim(env,c);await putShelfState(env,c);
       await tg(env,"editMessageText",{chat_id:q.message.chat.id,message_id:q.message.message_id,text:`${q.message.text}\n\n━━━━━━━━━━━━━━\n✅ ACCEPTED BY MIKAEL`});
     }else if(action==="reject"){
       c.status="rejected";c.decidedAt=new Date().toISOString();await putClaim(env,c);await putShelfState(env,c);
       await tg(env,"editMessageText",{chat_id:q.message.chat.id,message_id:q.message.message_id,text:`${q.message.text}\n\n━━━━━━━━━━━━━━\n❌ REJECTED BY MIKAEL`});
     }else if(action==="counter"){
       await env.LIZZY_CLAIMS.put(`counter_wait:${q.message.chat.id}`,claimId,{expirationTtl:600});
       await tg(env,"sendMessage",{chat_id:q.message.chat.id,text:`💬 COUNTER OFFER\n\nItem: ${c.item}\nLizzy offered: ${c.offer} MB\n\nReply with your counter amount only. Example: 15`});
     }
     return json({ok:true});
   }
   if(update.message?.text){
     const chat=String(update.message.chat.id),txt=update.message.text.trim();

     // /deposit <amount> [note]  — create a claimable deposit straight from Telegram.
     const dep=txt.match(/^\/deposit(?:@\w+)?\s+(\d+)\s*(.*)$/i);
     if(dep){
       const r=await createDeposit(env,dep[1],dep[2],"telegram");
       await tg(env,"sendMessage",{chat_id:chat,text:`✅ Deposit queued: ${r.deposit.amount} MB\nWaiting for Lizzy to claim it.\nPending total: ${r.pendingTotal} MB`});
       return json({ok:true});
     }
     if(/^\/deposits?(?:@\w+)?$/i.test(txt)){
       const pending=await listDeposits(env,true);
       const total=pending.reduce((s,x)=>s+Number(x.amount||0),0);
       await tg(env,"sendMessage",{chat_id:chat,text:pending.length
         ?`⏳ UNCLAIMED DEPOSITS (${pending.length})\n\n${pending.map(d=>`• ${d.amount} MB${d.note?` — ${d.note}`:""}`).join("\n")}\n\nTotal: ${total} MB`
         :"✅ No unclaimed deposits. Lizzy has claimed everything."});
       return json({ok:true});
     }

     // /tolizzy <text> — send a message that shows up on her screen.
     const toL=txt.match(/^\/tolizzy(?:@\w+)?\s+([\s\S]+)$/i);
     if(toL){
       await createMessage(env,toL[1],"telegram");
       return json({ok:true});
     }
     // /miss — quick one-tap "missing you" message, no typing required.
     if(/^\/miss(?:@\w+)?$/i.test(txt)){
       await createMessage(env,"Mikael is missing you right now 💗","telegram");
       return json({ok:true});
     }
     // /mymood <text> — set Mikael's current mood for the Today's Connection screen.
     const mood=txt.match(/^\/mymood(?:@\w+)?\s+([\s\S]+)$/i);
     if(mood){
       await setMikaelMood(env,mood[1],"telegram");
       return json({ok:true});
     }
     // /wonder <text> — post a new thought to the shared "I Wonder If..." board.
     const wonder=txt.match(/^\/wonder(?:@\w+)?\s+([\s\S]+)$/i);
     if(wonder){
       await createThought(env,"Mikael",wonder[1],"telegram");
       return json({ok:true});
     }
     // /answer <text> — answer Lizzy's most recent unanswered wonder.
     const answer=txt.match(/^\/answer(?:@\w+)?\s+([\s\S]+)$/i);
     if(answer){
       const t=await answerLatestUnansweredFromLizzy(env,answer[1],"telegram");
       if(!t){
         await tg(env,"sendMessage",{chat_id:chat,text:"There's nothing waiting for an answer right now. 💭"});
       }
       return json({ok:true});
     }

     const claimId=await env.LIZZY_CLAIMS.get(`counter_wait:${chat}`);
     if(claimId){
       const amount=Math.floor(Number(update.message.text.trim()));
       if(!Number.isFinite(amount)||amount<1){await tg(env,"sendMessage",{chat_id:chat,text:"❌ Send only the MB amount. Example: 15"});return json({ok:true});}
       const c=await getClaim(env,claimId);
       if(c){c.status="countered";c.counterOffer=amount;c.decidedAt=new Date().toISOString();await putClaim(env,c);await putShelfState(env,c);}
       await env.LIZZY_CLAIMS.delete(`counter_wait:${chat}`);
       await tg(env,"sendMessage",{chat_id:chat,text:`💬 COUNTER RECORDED\n\nItem: ${c?.item||"Secret Shelf Item"}\nMikael's counter: ${amount} MB`});
     }
     return json({ok:true});
   }
   return json({ok:true});
 }

 if(req.method!=="POST")return json({error:"Method not allowed"},405);
 const b=await req.json();
/* =========================================================
   COMPLETE LIZZYOS TELEGRAM NOTIFICATION ROUTER
   ========================================================= */

const S=(v,max=1800)=>String(v??"").trim().slice(0,max);
const N=(v,d=0)=>Number.isFinite(Number(v))?Math.floor(Number(v)):d;
const eventType=String(b?.type||"").trim();

/* --- MONEY + BALANCE ENRICHMENT ---------------------------------
   Older parts of the website only send a human-readable "details"
   string. Pull the amount and the wallet balance out of that text so
   every notification below can always show the money involved and the
   balance remaining. Explicit fields always win. */
{
  const blob=`${b?.details??""}\n${b?.message??""}`;
  const grab=re=>{const m=blob.match(re);return m?Math.floor(Number(m[1])):null};
  if(b.balance==null){
    const v=grab(/(?:new\s+|remaining\s+|current\s+)?balance[^0-9+-]{0,20}([+-]?\d+)/i);
    if(v!=null)b.balance=v;
  }
  if(b.amount==null&&b.reward==null&&b.earned==null&&b.price==null&&b.cost==null&&b.paid==null){
    const v=grab(/(?:earned|received|paid|cost|price|amount|claimed)[^0-9+-]{0,20}([+-]?\d+)/i);
    if(v!=null)b.amount=v;
  }
}


async function notifyTelegram(text,type=eventType,reply_markup=null){
  const payload={
    chat_id:env.TELEGRAM_CHAT_ID,
    text:String(text).slice(0,3900)
  };
  if(reply_markup)payload.reply_markup=reply_markup;
  const sent=await tg(env,"sendMessage",payload);

  return json({
    success:true,
    type,
    telegram:!!sent?.ok
  });
}


/* =========================================================
   🎮 GAME RESULTS
   ========================================================= */

if(eventType==="game_result"){
  const game=S(b.game||b.title||"Game",500);
  const result=S(b.result||b.status||"",500);
  const details=S(b.details||"",1800);

  return notifyTelegram(
`🎮 LIZZYOS GAME RESULT

🎯 Game: ${game}
🏁 Result: ${result}${details?`\n\n${details}`:""}`,
    "game_result"
  );
}


/* =========================================================
   🧠 LIFE LESSONS
   ========================================================= */

if(
  eventType==="🧠 LIFE LESSON VOTE" ||
  eventType==="life_lesson_vote" ||
  eventType==="life_lesson_review"
){
  const lesson=S(
    b.title||
    b.lesson||
    "Life Lesson",
    700
  );

  const verdict=S(
    b.vote||
    b.rating||
    b.verdict||
    b.response||
    b.status||
    "",
    300
  );

  const details=S(
    b.details||
    b.reason||
    b.comment||
    "",
    1500
  );

  let decision="🗳️ VOTE RECORDED";

  if(/useful|helpful/i.test(verdict)){
    decision="💚 USEFUL / HELPFUL";
  }

  if(/useless|not useful/i.test(verdict)){
    decision="💀 USELESS / NOT HELPFUL";
  }

  return notifyTelegram(
`🧠 LIFE LESSON REVIEW

📚 Lesson:
"${lesson}"

${decision}${details?`\n\n💬 ${details}`:""}`,
    "life_lesson_vote"
  );
}


/* =========================================================
   ✨ LIZZY ASSISTANT
   ========================================================= */

if(
  eventType==="assistant_activity" ||
  eventType==="assistant_question" ||
  eventType==="assistant_response"
){
  const question=S(
    b.question||
    b.prompt||
    "",
    900
  );

  const answer=S(
    b.answer||
    b.response||
    b.reply||
    "",
    2200
  );

  return notifyTelegram(
`✨ LIZZY ASSISTANT ACTIVITY

👤 Lizzy asked:
"${question||"Question recorded"}"

🤖 LizzyOS responded:
"${answer||"Response recorded"}"`,
    "assistant_activity"
  );
}


/* =========================================================
   💌 LETTER PURCHASED
   ========================================================= */

if(
  eventType==="letter_purchased" ||
  eventType==="secret_shelf_letter_purchased" ||
  eventType==="💌 LETTER PURCHASED"
){
  const letter=S(
    b.letter||
    b.title||
    b.item||
    b.name||
    "Open When Letter",
    700
  );

  const paid=N(
    b.paid||
    b.price||
    b.cost||
    b.amount,
    0
  );

  const balance=
    b.balance!=null
      ? N(b.balance)
      : null;

  return notifyTelegram(
`💌 LETTER PURCHASED

🛒 ${letter}

💸 Paid:
${paid} MB
${balance!=null?`🏦 Balance after purchase:\n${balance} MB`:""}

Lizzy has purchased one of the letters. Not opened yet.`,
    "letter_purchased"
  );
}


/* =========================================================
   💌 LETTERS OPENED
   ========================================================= */

if(
  eventType==="letter_opened" ||
  eventType==="open_when_opened" ||
  eventType==="open_when_letter_opened" ||
  eventType==="secret_shelf_letter_opened" ||
  eventType==="💌 LETTER OPENED" ||
  eventType==="💌 OPEN WHEN LETTER OPENED"
){
  const letter=S(
    b.letter||
    b.title||
    b.name||
    "Open When Letter",
    700
  );

  const folder=S(
    b.category||
    b.folder||
    b.kind||
    "",
    300
  );

  return notifyTelegram(
`💌 LETTER OPENED

📖 ${letter}
${folder?`📂 ${folder}`:""}

Lizzy has opened one of the letters.`,
    "letter_opened"
  );
}


/* =========================================================
   🛍️ PURCHASES
   ========================================================= */

if(
  eventType==="purchase" ||
  eventType==="purchase_completed" ||
  eventType==="store_purchase" ||
  eventType==="🛍️ SEED STORE PURCHASE" ||
  eventType==="🛍️ STORE EXTRA PURCHASE"
){
  const item=S(
    b.item||
    b.title||
    b.name||
    "Purchase",
    700
  );

  const cost=N(
    b.cost||
    b.price||
    b.paid||
    b.amount,
    0
  );

  const balance=
    b.balance!=null
      ? N(b.balance)
      : null;

  const details=S(
    b.details||"",
    1400
  );

  return notifyTelegram(
`🛍️ LIZZYOS PURCHASE

🛒 Item:
${item}

💸 Paid:
${cost} MB
${balance!=null?`🏦 Balance after purchase:\n${balance} MB`:""}${details?`\n\n${details}`:""}`,
    "purchase"
  );
}


/* =========================================================
   🔐 SECRET SHELF PURCHASE
   ========================================================= */

if(
  eventType==="secret_shelf_purchase" ||
  eventType==="secret_shelf_purchase_completed"
){
  const item=S(
    b.item||
    b.title||
    "Secret Shelf Item",
    700
  );

  const kind=S(
    b.kind||
    b.typeName||
    "Unknown",
    200
  );

  const paid=N(
    b.paid||
    b.price||
    b.amount,
    0
  );

  const balance=
    b.balance!=null
      ? N(b.balance)
      : null;

  return notifyTelegram(
`🔐 SECRET SHELF PURCHASE COMPLETED

📦 Item:
${item}

🏷️ Type:
${kind}

💸 Paid:
${paid} MB
${balance!=null?`🏦 Balance:\n${balance} MB`:""}

🎁 Item has been granted to Lizzy.`,
    "secret_shelf_purchase"
  );
}


/* =========================================================
   💰 BIDS / OFFERS
   ========================================================= */

if(
  eventType==="secret_shelf_bid" ||
  eventType==="vault_bid" ||
  eventType==="bid" ||
  eventType==="offer" ||
  eventType==="offer_created" ||
  eventType==="new_offer" ||
  eventType==="secret_shelf_offer"
){
  const item=S(
    b.item||
    b.title||
    b.itemName||
    "Item",
    700
  );

  const amount=N(
    b.offer||
    b.bid||
    b.amount||
    b.price,
    0
  );

  const isVault=eventType==="vault_bid";

  const type=
    isVault
      ? "🎰 VAULT BID"
      : "💌 NEW OFFER / BID";

  // Persist the bid as a claim so the Telegram buttons can act on it
  const c={
    claimId:id(),
    type:isVault?"vault_bid":"secret_shelf_bid",
    item,
    itemId:S(b.itemId||b.item_id||b.id||(isVault?"vault":""),200)||null,
    offer:amount,
    status:"pending",
    counterOffer:null,
    lizzyOpened:false,
    createdAt:new Date().toISOString()
  };
  await putClaim(env,c);
  await putShelfState(env,c);

  return notifyTelegram(
`${type}

📦 Item:
${item}

💰 Lizzy offered:
${amount} MB

⏳ Status:
PENDING

Claim ID:
${c.claimId}`,
    "bid_or_offer",
    {inline_keyboard:[
      [
        {text:isVault?"🎰 ACCEPT VAULT":"✅ ACCEPT",callback_data:`accept:${c.claimId}`},
        {text:"❌ REJECT",callback_data:`reject:${c.claimId}`}
      ],
      [
        {text:"💬 COUNTER",callback_data:`counter:${c.claimId}`}
      ]
    ]}
  );
}


/* =========================================================
   💬 COUNTER OFFERS
   ========================================================= */

if(
  eventType==="counter_offer" ||
  eventType==="countered"
){
  const item=S(
    b.item||
    b.title||
    "Item",
    700
  );

  const original=N(
    b.originalOffer||
    b.offer||
    b.previousOffer,
    0
  );

  const counter=N(
    b.counterOffer||
    b.amount||
    b.price,
    0
  );

  return notifyTelegram(
`💬 COUNTER OFFER

📦 Item:
${item}

💌 Lizzy's offer:
${original} MB

🧠 Mikael's counter offer:
${counter} MB`,
    "counter_offer"
  );
}


/* =========================================================
   ✅ ACCEPTED OFFERS
   ========================================================= */

if(
  eventType==="offer_accepted" ||
  eventType==="bid_accepted" ||
  eventType==="secret_shelf_offer_accepted"
){
  const item=S(
    b.item||
    b.title||
    "Item",
    700
  );

  const price=N(
    b.acceptedPrice||
    b.price||
    b.offer||
    b.amount,
    0
  );

  return notifyTelegram(
`✅ OFFER ACCEPTED

📦 Item:
${item}

💰 Accepted price:
${price} MB

🎁 Status:
Accepted and ready for fulfilment.`,
    "offer_accepted"
  );
}


/* =========================================================
   ❌ REJECTED OFFERS
   ========================================================= */

if(
  eventType==="offer_rejected" ||
  eventType==="bid_rejected"
){
  const item=S(
    b.item||
    b.title||
    "Item",
    700
  );

  const offer=N(
    b.offer||
    b.bid||
    b.amount,
    0
  );

  return notifyTelegram(
`❌ OFFER REJECTED

📦 Item:
${item}

💰 Lizzy offered:
${offer} MB`,
    "offer_rejected"
  );
}


/* =========================================================
   💼 TASKS / JOBS
   ========================================================= */

if(
  eventType==="task_completed" ||
  eventType==="task_reward" ||
  eventType==="job_completed" ||
  eventType==="💼 MICKY BUCS JOB COMPLETED"
){
  const task=S(
    b.task||
    b.title||
    b.name||
    "Task",
    700
  );

  const earned=N(
    b.reward||
    b.earned||
    b.amount||
    b.payment,
    0
  );

  const balance=
    b.balance!=null
      ? N(b.balance)
      : null;

  return notifyTelegram(
`💼 MICKY BUCS TASK COMPLETED

✅ Task:
${task}

💰 Money received:
+${earned} MB
${balance!=null?`🏦 New balance:\n${balance} MB`:""}`,
    "task_completed"
  );
}


/* =========================================================
   💵 DAILY PAYMENT
   ========================================================= */

if(
  eventType==="💵 DAILY MICKY BUCS" ||
  eventType==="daily_allowance" ||
  eventType==="daily_reward"
){
  const amount=N(
    b.amount||
    b.reward||
    b.earned,
    0
  );

  const balance=
    b.balance!=null
      ? N(b.balance)
      : null;

  return notifyTelegram(
`💵 MICKY BUCS PAYMENT

💰 Received:
+${amount} MB
${balance!=null?`🏦 Balance:\n${balance} MB`:""}`,
    "daily_reward"
  );
}


/* =========================================================
   🏆 ACHIEVEMENTS
   ========================================================= */

if(
  eventType==="🏆 ACHIEVEMENT UNLOCKED" ||
  eventType==="achievement_unlocked" ||
  eventType==="achievement_reward"
){
  const achievement=S(
    b.title||
    b.achievement||
    "Achievement",
    700
  );

  const reward=N(
    b.reward||
    b.amount||
    b.payment,
    0
  );

  const balance=
    b.balance!=null
      ? N(b.balance)
      : null;

  return notifyTelegram(
`🏆 ACHIEVEMENT UNLOCKED

🎖️ ${achievement}

💰 Reward:
+${reward} MB
${balance!=null?`🏦 Balance:\n${balance} MB`:""}`,
    "achievement_unlocked"
  );
}


/* =========================================================
   🏦 BANK ACTIVITY
   ========================================================= */

if(
  eventType==="🏦 SAVINGS BONUS" ||
  eventType==="🏦 BANK OF MICKY" ||
  eventType==="bank_activity" ||
  eventType==="savings_bonus"
){
  const title=S(
    b.title||
    b.name||
    "Bank Activity",
    700
  );

  const amount=
    b.amount!=null
      ? N(b.amount)
      : null;

  const balance=
    b.balance!=null
      ? N(b.balance)
      : null;

  return notifyTelegram(
`🏦 MICKY BANK ACTIVITY

📌 ${title}
${amount!=null?`💰 Amount: ${amount} MB`:""}
${balance!=null?`🏦 Balance: ${balance} MB`:""}
${b.details?`\n${S(b.details,1400)}`:""}`,
    "bank_activity"
  );
}


/* =========================================================
   🎁 INTERACTIVE REWARDS
   ========================================================= */

if(
  eventType==="interactive_reward" ||
  eventType==="interactive_rewards"
){
  return notifyTelegram(
`🎁 INTERACTIVE REWARD

🎁 Reward:
${S(b.reward||"Unknown reward",800)}

📌 Status:
${S(b.status||"Updated",300)}`,
    "interactive_reward"
  );
}


/* =========================================================
   🎁 MYSTERY / RARE BOX
   ========================================================= */

if(eventType==="rare_box_redeemed"){
  return notifyTelegram(
`🎁 MYSTERY RARE BOX REDEEMED

📂 Category:
${S(b.category||"Unknown",300)}

🎁 Reward:
${S(b.reward||"Mystery reward",900)}
${b.balance!=null?`\n🏦 Balance: ${N(b.balance)} MB`:""}

📦 Box:
CONSUMED`,
    "rare_box_redeemed"
  );
}


/* =========================================================
   👑 VIP
   ========================================================= */

if(eventType==="vip_privilege"){
  const rows=Object.entries(b)
    .filter(([k])=>k!=="type")
    .map(([k,v])=>`${k}: ${S(v,400)}`)
    .join("\n");

  return notifyTelegram(
`👑 VIP PRIVILEGE

${rows}`,
    "vip_privilege"
  );
}

if(eventType==="vip_complaint"){
  return notifyTelegram(
`📣 VIP COMPLAINT AGAINST MIKAEL

${S(b.complaint||"No complaint text",2500)}

Estimated accountability:
${S(b.accountabilityChance||"2%",100)}`,
    "vip_complaint"
  );
}

if(eventType==="vip_priority_message"){
  return notifyTelegram(
`💌 VIP PRIORITY MESSAGE FROM LIZZY

${S(b.message||"No message",2500)}`,
    "vip_priority_message"
  );
}


/* =========================================================
   💰 TELEGRAM MICKY BANK
   ========================================================= */

/* create a persistent, claimable deposit */
if(
  eventType==="deposit_created" ||
  eventType==="micky_bank_deposit" ||
  eventType==="micky_bank_deposit_create"
){
  const amt=N(b.amount,0);
  if(amt<1)return json({success:false,error:"Deposit amount must be at least 1 MB"},400);
  const r=await createDeposit(env,amt,S(b.note||b.details||"",300),S(b.source||"website",60));
  return json({success:true,type:"deposit_created",deposit:r.deposit,pendingCount:r.pendingCount,pendingTotal:r.pendingTotal});
}

/* Lizzy presses Claim Deposit on one voucher */
if(eventType==="micky_bank_claim_one"){
  const depId=S(b.id,120);
  const d=depId?await getDeposit(env,depId):null;
  if(!d)return json({success:false,error:"Deposit not found"},404);
  if(d.status!=="pending")return json({success:false,alreadyClaimed:true,amount:d.amount,status:d.status},409);
  d.status="claimed";
  d.claimedAt=new Date().toISOString();
  d.walletBefore=N(b.walletBefore,0);
  await putDeposit(env,d);
  const pending=await listDeposits(env,true);
  await tg(env,"sendMessage",{
    chat_id:env.TELEGRAM_CHAT_ID,
    text:`💸 DEPOSIT CLAIMED\n\nLizzy claimed ${d.amount} MB${d.note?`\nNote: ${d.note}`:""}\n\nStill unclaimed: ${pending.length} voucher(s) / ${pending.reduce((s,x)=>s+Number(x.amount||0),0)} MB`
  });
  return json({success:true,id:d.id,amount:d.amount,pendingCount:pending.length});
}

/* device confirms the new local balance after applying the deposit */
if(eventType==="micky_bank_claim_confirm"||eventType==="deposit_claimed"){
  const depId=S(b.id,120);
  if(depId){
    const d=await getDeposit(env,depId);
    if(d){d.walletAfter=N(b.walletAfter,0);await putDeposit(env,d);}
  }
  return notifyTelegram(
`✅ DEPOSIT APPLIED

${b.amount!=null?`Amount: ${N(b.amount)} MB\n`:""}${b.walletAfter!=null?`This device's balance: ${N(b.walletAfter)} MB`:""}`,
    "deposit_claimed"
  );
}

/* cancel an unclaimed deposit */
if(eventType==="micky_bank_deposit_cancel"){
  const d=await getDeposit(env,S(b.id,120));
  if(!d)return json({success:false,error:"Deposit not found"},404);
  if(d.status!=="pending")return json({success:false,error:"Deposit already claimed"},409);
  d.status="cancelled";d.cancelledAt=new Date().toISOString();
  await putDeposit(env,d);
  return json({success:true,id:d.id});
}


/* =========================================================
   💌 MESSAGES FROM MIKAEL
   ========================================================= */

/* create a message from the website (in addition to the /tolizzy Telegram command) */
if(eventType==="lizzy_message_create"){
  const text=S(b.text||b.message||"",500);
  if(!text)return json({success:false,error:"Message text required"},400);
  const r=await createMessage(env,text,S(b.source||"website",60));
  return json({success:true,type:"message_created",message:r.message,pendingCount:r.pendingCount});
}

/* Lizzy's site has shown the message on screen — mark it seen */
if(eventType==="lizzy_message_seen"){
  const msgId=S(b.id,120);
  const m=msgId?await getMessage(env,msgId):null;
  if(!m)return json({success:false,error:"Message not found"},404);
  if(m.status==="pending"){
    m.status="seen";
    m.seenAt=new Date().toISOString();
    await putMessage(env,m);
    const pending=await listMessages(env,true);
    await tg(env,"sendMessage",{
      chat_id:env.TELEGRAM_CHAT_ID,
      text:`👀 MESSAGE SEEN BY LIZZY\n\n"${m.text}"\n\nStill unseen: ${pending.length} message(s)`
    });
  }
  return json({success:true,id:m.id});
}


/* =========================================================
   💗 SYNCED FEELINGS — MIKAEL'S MOOD
   ========================================================= */

/* set Mikael's mood from the website (in addition to the /mymood Telegram command) */
if(eventType==="mikael_mood_set"){
  const text=S(b.text||b.mood||"",200);
  if(!text)return json({success:false,error:"Mood text required"},400);
  const m=await setMikaelMood(env,text,S(b.source||"website",60));
  return json({success:true,mood:m});
}


/* =========================================================
   💭 "I WONDER IF…" — SHARED THOUGHT BOARD
   ========================================================= */

/* Lizzy posts a new wonder from the website */
if(eventType==="thought_create"){
  const text=S(b.text||"",500);
  if(!text)return json({success:false,error:"Thought text required"},400);
  const t=await createThought(env,"Lizzy",text,S(b.source||"website",60));
  return json({success:true,thought:t});
}

/* Lizzy answers one of Mikael's wonders from the website */
if(eventType==="thought_answer"){
  const id=S(b.id,120);
  const text=S(b.text||b.reply||"",500);
  if(!id||!text)return json({success:false,error:"Thought id and reply text required"},400);
  const t=await answerThought(env,id,text,"Lizzy",S(b.source||"website",60));
  if(!t)return json({success:false,error:"Thought not found"},404);
  return json({success:true,thought:t});
}


/* =========================================================
   💗 DATE / CALENDAR
   ========================================================= */

if(
  eventType==="date_response" ||
  eventType==="date_proposal_response" ||
  eventType==="date_confirmed" ||
  eventType==="calendar_booking"
){
  return notifyTelegram(
`💗 LIZZYOS DATE / CALENDAR UPDATE

Status:
${S(b.status||b.response||b.answer||"Updated",500)}

${b.date?`📅 Date: ${S(b.date,300)}`:""}
${b.time?`⏰ Time: ${S(b.time,200)}`:""}
${b.details?`\n${S(b.details,1500)}`:""}`,
    "date_update"
  );
}


/* =========================================================
   🔄 MIKAEL TOKEN EVENTS
   ========================================================= */

if(
  eventType==="mikael_reverse_token_award" ||
  eventType==="mikael_reverse_token_redeemed"
){
  return notifyTelegram(
`🔄 MIKAEL REVERSE TOKEN

${S(
  b.message||
  b.title||
  b.token||
  "Reverse Token activity",
 1800
)}`,
    eventType
  );
}

 if(b.type==="mikael_reverse_token_award"){
   const name=String(b.name||"").trim(),emoji=String(b.emoji||"🔄"),desc=String(b.desc||"").trim();
   if(!name)return json({success:false,error:"Missing token name"},400);
   const state=await getMikaelTokenState(env);
   state.inventory=state.inventory||{};state.history=Array.isArray(state.history)?state.history:[];
   state.inventory[name]=Number(state.inventory[name]||0)+1;
   state.history.push({type:"earned",token:name,source:String(b.source||"LizzyOS Daily Reward"),at:new Date().toISOString()});
   await putMikaelTokenState(env,state);
   return json({success:true,state});
 }
 if(b.type==="mikael_reverse_token_sync"){
   const local=b.inventory&&typeof b.inventory==="object"?b.inventory:{};
   const state=await getMikaelTokenState(env);
   state.inventory=state.inventory||{};state.history=Array.isArray(state.history)?state.history:[];
   for(const [name,count] of Object.entries(local)){
     const n=Math.max(0,Number(count)||0);
     if(n>Number(state.inventory[name]||0))state.inventory[name]=n;
   }
   state.history.push({type:"legacy_sync",at:new Date().toISOString()});
   await putMikaelTokenState(env,state);
   return json({success:true,state});
 }
 if(b.type==="mikael_reverse_token_test"){
   const redemption={id:rid(),name:String(b.name||"Reverse Token Test"),emoji:String(b.emoji||"🧪"),desc:String(b.desc||"Cross-device test."),remaining:0,redeemedAt:new Date().toISOString(),acknowledged:false,test:true};
   await env.LIZZY_CLAIMS.put(`mikael:redemption:${redemption.id}`,JSON.stringify(redemption),{expirationTtl:86400});
   const ids=await getRedemptionIndex(env);ids.push(redemption.id);await putRedemptionIndex(env,ids);
   return json({success:true,redemption});
 }
 if(b.type==="mikael_reverse_token_redeem"){
   const name=String(b.name||"").trim();
   const state=await getMikaelTokenState(env);
   state.inventory=state.inventory||{};state.history=Array.isArray(state.history)?state.history:[];
   const count=Number(state.inventory[name]||0);
   if(count<1)return json({success:false,error:"No token available"},409);
   state.inventory[name]=count-1;
   const redemption={id:rid(),name,emoji:String(b.emoji||"🔄"),desc:String(b.desc||""),remaining:state.inventory[name],redeemedAt:new Date().toISOString(),acknowledged:false};
   state.history.push({type:"redeemed",token:name,at:redemption.redeemedAt,redemptionId:redemption.id});
   await putMikaelTokenState(env,state);
   await env.LIZZY_CLAIMS.put(`mikael:redemption:${redemption.id}`,JSON.stringify(redemption),{expirationTtl:2592000});
   const ids=await getRedemptionIndex(env);ids.push(redemption.id);await putRedemptionIndex(env,ids);
   await tg(env,"sendMessage",{chat_id:env.TELEGRAM_CHAT_ID,text:`🔄 MIKAEL REVERSE TOKEN REDEEMED\\n\\n${redemption.emoji} ${name}\\n${redemption.desc}\\n\\nRemaining: ×${redemption.remaining}`});
   return json({success:true,state,redemption});
 }
 if(b.type==="mikael_reverse_token_ack"){
   const id=String(b.id||"").trim();
   const key=`mikael:redemption:${id}`;
   const r=await env.LIZZY_CLAIMS.get(key,{type:"json"});
   if(!r)return json({success:false,error:"Redemption not found"},404);
   r.acknowledged=true;r.acknowledgedAt=new Date().toISOString();
   await env.LIZZY_CLAIMS.put(key,JSON.stringify(r),{expirationTtl:2592000});
   return json({success:true});
 }


 if(b.type==="vault_bid"){
   const offer=Math.floor(Number(b.offer));
   if(!Number.isFinite(offer)||offer<1)return json({success:false,error:"Invalid Vault offer"},400);
   const c={claimId:id(),type:"vault_bid",item:"The Vault",itemId:"vault",offer,status:"pending",counterOffer:null,lizzyOpened:false,createdAt:new Date().toISOString()};
   await putClaim(env,c);await putShelfState(env,c);
   await tg(env,"sendMessage",{chat_id:env.TELEGRAM_CHAT_ID,text:`🎰 LIZZYOS VAULT BID\n\nLizzy offered: ${offer} MB\n\nStatus: ⏳ PENDING\n\nClaim ID:\n${c.claimId}`,reply_markup:{inline_keyboard:[[{text:"🎰 ACCEPT VAULT",callback_data:`accept:${c.claimId}`},{text:"❌ REJECT",callback_data:`reject:${c.claimId}`}],[{text:"💬 COUNTER",callback_data:`counter:${c.claimId}`}]]}});
   return json({success:true,claimId:c.claimId,status:"pending"});
 }
 if(b.type==="vault_claim_opened"){
   const key=`claim:${String(b.claimId||"")}`,c=await env.LIZZY_CLAIMS.get(key,{type:"json"});
   if(!c)return json({success:false,error:"Vault claim not found"},404);
   c.lizzyOpened=true;c.openedAt=new Date().toISOString();await env.LIZZY_CLAIMS.put(key,JSON.stringify(c),{expirationTtl:2592000});
   return json({success:true});
 }
 if(b.type==="secret_shelf_bid"){
   const names={
     letter_002:"Unreleased Letter #002",
     mystery_reward:"Mystery Reward",
     archive_x17:"Sealed Archive X-17 [Cody Legal Documents]",
     dossier_001:"Classified File #001 — Initial Subject Assessment",
     hater_file:"Classified File #002 — The Hater Investigation",
     mrperfect_file:"Classified File #003 — Operation: Mr Perfect"
   };
   if(!names[b.item])return json({success:false,error:"Unknown Secret Shelf item"},400);
   const offer=Math.floor(Number(b.offer));
   if(!Number.isFinite(offer)||offer<1)return json({success:false,error:"Invalid offer"},400);
   const c={claimId:id(),type:"secret_shelf_bid",item:names[b.item],itemId:b.item,offer,status:"pending",counterOffer:null,createdAt:new Date().toISOString()};
   await putClaim(env,c);
   await putShelfState(env,c);
   await tg(env,"sendMessage",{chat_id:env.TELEGRAM_CHAT_ID,text:`🛒 LIZZYOS SECRET SHELF\n\n💌 NEW OFFER\n\nItem: ${c.item}\nLizzy's Offer: ${offer} MB\n\nStatus: ⏳ PENDING\n\nClaim ID:\n${c.claimId}`,reply_markup:{inline_keyboard:[[{text:"✅ ACCEPT",callback_data:`accept:${c.claimId}`},{text:"❌ REJECT",callback_data:`reject:${c.claimId}`}],[{text:"💬 COUNTER",callback_data:`counter:${c.claimId}`}]]}});
   return json({success:true,claimId:c.claimId,status:"pending"});
 }

 // Safety net: forward unknown/new event types instead of silently dropping them.
 const type=b.type||"LIZZYOS";
 const title=b.title||"Notification";
 const details=b.details||b.message||b.description||"";
 const extra=Object.entries(b)
   .filter(([k])=>!["type","title","details","message","description"].includes(k))
   .slice(0,12)
   .map(([k,v])=>`${k}: ${S(v,500)}`)
   .join("\n");

 await tg(env,"sendMessage",{
   chat_id:env.TELEGRAM_CHAT_ID,
   text:`${type}

${title}${details?`\n\n${S(details,1800)}`:""}${extra?`\n\n${extra}`:""}`
 });

 return json({ok:true,type,telegram:true});
}};