(()=>{
"use strict";

const WORKER = window.LIZZY_TELEGRAM_WORKER_URL ||
  "https://lizzyos-notifications.mulaudzimikael73.workers.dev/";

const BUILTIN_NAMES = {
  miss: "❤️ Open When You Miss Me",
  amazing: "🌸 Open When You Need Reminding How Amazing You Are",
  hug: "🫂 Open When You Need a Hug",
  laugh: "😂 Open When You Need to Laugh",
  sick: "🤒 Open When You’re Sick"
};

const recentlySent = new Map();

function persona(){
  const el =
    document.querySelector("[data-current-persona]") ||
    document.getElementById("currentPersona") ||
    document.getElementById("personaStatus");
  return el?.dataset?.currentPersona ||
    el?.textContent?.trim() ||
    localStorage.getItem("lizzyPersona") ||
    localStorage.getItem("selectedPersona") ||
    "Lizzy";
}

async function sendLetterOpened(id, title, kind){
  const now = Date.now();
  const dedupeKey = `${kind}:${id}:${title}`;
  if (now - (recentlySent.get(dedupeKey) || 0) < 1800) return;
  recentlySent.set(dedupeKey, now);

  try {
    const opened = new Date();
    const response = await fetch(WORKER, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        type: "💌 OPEN WHEN LETTER OPENED",
        title: title,
        details:
          `Lizzy opened an Open When letter.\n` +
          `Letter: ${title}\n` +
          `Type: ${kind}\n` +
          `Persona: ${persona()}\n` +
          `Opened: ${opened.toLocaleString()}`,
        meta: {
          event: "open_when_letter_opened",
          letter_id: id,
          letter_title: title,
          letter_kind: kind,
          opened_at: opened.toISOString()
        },
        source: "LizzyOS"
      })
    });
    if (!response.ok) console.warn("Letter Telegram notification failed:", response.status);
  } catch (err) {
    console.warn("Letter Telegram notification failed:", err);
  }
}

// Built-in Open When buttons. Capture phase means this fires even if another listener changes the view immediately.
document.addEventListener("click", (event) => {
  const button = event.target.closest("#letterList [data-letter]");
  if (!button) return;
  const key = button.dataset.letter;
  sendLetterOpened(key, BUILTIN_NAMES[key] || button.textContent.trim() || "Open When Letter", "Built-in");
}, true);

// Purchased letters are native <details> elements created dynamically by seed-store.js.
// Bind each details element directly because it may be created after page load.
const bound = new WeakSet();

function bindPurchasedLetters(){
  document.querySelectorAll("#purchasedLettersBox details.purchasedLetter").forEach(details => {
    if (bound.has(details)) return;
    bound.add(details);

    details.addEventListener("toggle", () => {
      if (!details.open) return;
      const summary = details.querySelector("summary");
      const rawTitle = summary?.textContent?.trim() || "Purchased Open When Letter";
      const title = rawTitle.replace(/^💌\s*/, "");
      sendLetterOpened(title, title, "Purchased");
    });
  });
}

const observer = new MutationObserver(bindPurchasedLetters);
observer.observe(document.documentElement, {childList:true, subtree:true});
bindPurchasedLetters();

document.getElementById("openWhenIcon")?.addEventListener("click", () => {
  setTimeout(bindPurchasedLetters, 100);
});

console.log("LizzyOS Open When Telegram notifications: ONLINE");
})();