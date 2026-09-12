/**
 * LizzyOS Cloudflare Worker — Approval Upgrade
 *
 * Bind a KV namespace as: LIZZY_CLAIMS
 * Keep your existing secrets:
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_CHAT_ID
 *
 * Set your Telegram webhook to:
 *   https://YOUR-WORKER.workers.dev/telegram-webhook
 */
const json=(x,s=200)=>new Response(JSON.stringify(x),{status:s,headers:{
  "content-type":"application/json","access-control-allow-origin":"*",
  "access-control-allow-headers":"Content-Type","access-control-allow-methods":"GET,POST,OPTIONS"
}});
async function tg(env,method,payload){
 const r=await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`,{
  method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)
 }); return r.json();
}
export default {
 async fetch(req,env){
  if(req.method==="OPTIONS")return json({ok:true});
  const u=new URL(req.url);

  // Website polls claim status.
  if(req.method==="GET"&&u.searchParams.get("action")==="claim_status"){
    const id=u.searchParams.get("claimId"); if(!id)return json({error:"missing claimId"},400);
    const c=await env.LIZZY_CLAIMS.get(id,{type:"json"});
    return json(c||{status:"unknown"});
  }

  // Telegram button callback.
  if(u.pathname==="/telegram-webhook"&&req.method==="POST"){
    const update=await req.json(),q=update.callback_query;
    if(!q)return json({ok:true});
    const [decision,id]=(q.data||"").split(":");
    if(!["approve","reject"].includes(decision)||!id)return json({ok:true});
    const c=await env.LIZZY_CLAIMS.get(id,{type:"json"});
    if(!c)return json({ok:true});
    c.status=decision==="approve"?"approved":"rejected";
    c.decidedAt=new Date().toISOString();
    await env.LIZZY_CLAIMS.put(id,JSON.stringify(c));
    await tg(env,"answerCallbackQuery",{callback_query_id:q.id,text:c.status==="approved"?"Approved ✅":"Rejected ❌"});
    await tg(env,"editMessageText",{
      chat_id:q.message.chat.id,message_id:q.message.message_id,
      text:`${c.status==="approved"?"✅ APPROVED":"❌ REJECTED"}\n\nJob: ${c.title}\nReward: ${c.reward} MB\nClaim: ${id}`
    });
    return json({ok:true});
  }

  if(req.method==="POST"){
    const b=await req.json();

    // New approval claim.
    if(b.action==="submit_claim"){
      const c={claimId:b.claimId,jobId:b.jobId,title:b.title,reward:Number(b.reward||0),date:b.date,status:"pending",createdAt:new Date().toISOString()};
      await env.LIZZY_CLAIMS.put(c.claimId,JSON.stringify(c),{expirationTtl:60*60*24*14});
      await tg(env,"sendMessage",{
        chat_id:env.TELEGRAM_CHAT_ID,
        text:`🕵🏾 LIZZYOS JOB APPROVAL\n\nJob: ${c.title}\nReward: ${c.reward} MB\nStatus: Awaiting approval\nClaim: ${c.claimId}`,
        reply_markup:{inline_keyboard:[[
          {text:"✅ APPROVE",callback_data:`approve:${c.claimId}`},
          {text:"❌ REJECT",callback_data:`reject:${c.claimId}`}
        ]]}
      });
      return json({ok:true,status:"pending",claimId:c.claimId});
    }

    // Preserve ordinary LizzyOS notification behavior.
    const type=b.type||"LIZZYOS",title=b.title||"Notification",details=b.details||"";
    await tg(env,"sendMessage",{chat_id:env.TELEGRAM_CHAT_ID,text:`${type}\n\n${title}\n${details}`});
    return json({ok:true});
  }
  return json({ok:true});
 }
};