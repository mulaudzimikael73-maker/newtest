/* LizzyOS Recovery Add-on — standalone file */
(() => {
  "use strict";
  const RECOVERY_KEY = "lizzyRecoveryModeAddon";
  const OPENED_KEY = "lizzySickLetterOpenedAddon";
  const WORKER = window.LIZZY_TELEGRAM_WORKER_URL || "https://lizzyos-notifications.mulaudzimikael73.workers.dev/";

  const LETTER = `Dear Lizzy,

So apparently Little Miss Attitude has been defeated by… germs.

Embarrassing.

I’m not saying you’re weak, but I am saying I think you’re weak. 😂 And hopefully you won’t go telling your mommy that Mikael is bullying a sick person, because that would be a dramatic misrepresentation of events.

But jokes aside, you actually need to get better soon.

Because Mikael—
I mean Lizzy—
can’t survive without a healthy Lizzy.

That may sound wrong.

But I said what I said.

Unfortunately, this also means you can’t even properly use your Hug Token right now because you’ll probably get Mikael sick too.

Mikael thinks that wouldn’t be good.

Although… he would probably risk it anyway. 😭

So your official instructions are:
• Rest properly.
• Drink water.
• Eat something.
• Take care of yourself.
• Stop pretending you’re perfectly fine when you clearly aren’t.

And yes, you are allowed one of your famous “cleansing/detox” crying sessions if medically necessary. 😂

Your only job is to get better. LizzyOS, Cody Legal Counsel, Agent Yelizaveta and even Mr Perfect need you back at full operating capacity.

Get better soon, Four Eyes. 💗

I’ll try to be nice while you’re sick.

Try.

No promises.

Mikael
a.k.a. Mr Perfect 💗`;

  const $ = id => document.getElementById(id);
  const recoveryOn = () => localStorage.getItem(RECOVERY_KEY) === "1";

  async function notifyOpen() {
    try {
      await fetch(WORKER, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          type:"sick_letter_opened",
          letter:"Open When You're Sick",
          openedAt:new Date().toISOString()
        })
      });
    } catch(e) { console.warn("Sick-letter notification failed", e); }
  }

  function setRecovery(on) {
    localStorage.setItem(RECOVERY_KEY, on ? "1" : "0");
    renderRecovery();
  }

  function renderRecovery() {
    const on = recoveryOn();
    document.body.classList.toggle("recovery-mode-active", on);
    let banner = $("recoveryAddonBanner");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "recoveryAddonBanner";
      banner.innerHTML = `<div><b>🤒 RECOVERY MODE ACTIVE</b><small>Patient: Lizzy • Condition: Weak apparently 😂 • Doctor: Absolutely not Mikael</small></div><button id="recoveryAddonEnd">END</button>`;
      document.body.appendChild(banner);
      $("recoveryAddonEnd").onclick = () => setRecovery(false);
    }
    banner.hidden = !on;
    const status = $("recoveryAddonStatus");
    if (status) status.textContent = on ? "Recovering 💗" : "Currently off";
    const btn = $("recoveryAddonToggle");
    if (btn) btn.textContent = on ? "End Recovery Mode" : "Activate Recovery Mode";
  }

  function openSickLetter() {
    let modal = $("recoverySickLetter");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "recoverySickLetter";
      modal.className = "recovery-letter-modal";
      document.body.appendChild(modal);
    }
    modal.innerHTML = `<div class="recovery-letter-window">
      <header><b>💌 OPEN WHEN YOU’RE SICK</b><button id="recoveryLetterClose">×</button></header>
      <div class="recovery-letter-paper"><div class="recovery-stamp">RECOVERY NOTICE</div><pre></pre></div>
    </div>`;
    modal.querySelector("pre").textContent = LETTER;
    modal.classList.add("open");
    $("recoveryLetterClose").onclick = () => modal.classList.remove("open");
    localStorage.setItem(OPENED_KEY, new Date().toISOString());
    notifyOpen();
  }

  function mountOpenWhen() {
    const w = $("openWhenWindow") || $("openWhenFolderWindow") ||
      [...document.querySelectorAll(".window")].find(x => /open when/i.test(x.textContent || ""));
    if (!w || $("recoverySickLetterCard")) return;
    const host = w.querySelector(".windowScroll,.window-content,.windowBody") || w;
    const card = document.createElement("button");
    card.id = "recoverySickLetterCard";
    card.className = "recovery-sick-card";
    card.innerHTML = `<span>🤒💌</span><div><small>OPEN WHEN…</small><b>You’re Sick</b><em>For when germs defeat Little Miss Attitude.</em></div>`;
    card.onclick = openSickLetter;
    host.appendChild(card);
  }

  function mountLivingDesktop() {
    const w = $("livingDesktopWindow") ||
      [...document.querySelectorAll(".window")].find(x => /living desktop/i.test(x.textContent || ""));
    if (!w || $("recoveryAddonControl")) return;
    const host = w.querySelector(".windowScroll,.window-content,.windowBody") || w;
    const box = document.createElement("div");
    box.id = "recoveryAddonControl";
    box.className = "recovery-addon-control";
    box.innerHTML = `<span>🤒</span><div><b>Recovery Mode</b><small id="recoveryAddonStatus">Currently off</small></div><button id="recoveryAddonToggle">Activate Recovery Mode</button>`;
    host.appendChild(box);
    $("recoveryAddonToggle").onclick = () => setRecovery(!recoveryOn());
    renderRecovery();
  }

  function mountAssistantQuestions() {
    if (!recoveryOn()) return;
    const w = $("lizzyAssistantWindow");
    const host = w?.querySelector(".assistantQuestions");
    if (!host || host.dataset.recoveryAddon) return;
    host.dataset.recoveryAddon = "1";
    const questions = {
      "What should I do while I’m sick?":"Rest, hydrate, eat something and stop pretending you’re invincible.",
      "Can I use my Hug Token?":"Technically yes. Biohazard department says absolutely not 😂 Mikael would probably risk it though.",
      "Am I dying?":"LizzyOS has zero medical qualifications. Current system diagnosis: sick and dramatic 😂",
      "Can Mikael come see me?":"Mikael says probably. Germ Control says this is a terrible idea."
    };
    Object.entries(questions).forEach(([q,a]) => {
      const b=document.createElement("button"); b.textContent=q;
      b.onclick=()=>{ const ans=$("assistantAnswer"); if(ans) ans.textContent=a;
        if(typeof window.notifyAssistantTelegram==="function") window.notifyAssistantTelegram(q,a); };
      host.appendChild(b);
    });
  }

  function mount() {
    mountOpenWhen();
    mountLivingDesktop();
    mountAssistantQuestions();
    renderRecovery();
  }

  window.openLizzySickLetter = openSickLetter;
  window.setLizzyRecoveryMode = setRecovery;
// HOTFIX: Do NOT observe the entire document.
  // The previous observer retriggered itself whenever Recovery Mode changed the DOM,
  // causing an infinite mutation loop and Chrome's "Page Unresponsive" warning.

  // SAFE MOUNT: finite attempts only; cannot block LizzyOS startup.
  let safeMountAttempts=0;
  const safeMountTimer=setInterval(()=>{
    safeMountAttempts++;
    try{ mount(); }catch(e){ console.warn("Recovery mount skipped",e); }
    if(safeMountAttempts>=12) clearInterval(safeMountTimer);
  },1000);
  try{ mount(); }catch(e){ console.warn("Recovery initial mount skipped",e); }
})();