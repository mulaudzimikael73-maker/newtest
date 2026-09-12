
(() => {
"use strict";

const $ = (id) => document.getElementById(id);

const facts = [
  "Middle name: Thembinkosi.",
  "Favourite colour: Purple.",
  "Favourite season: Winter.",
  "Favourite TV show: The Office.",
  "Favourite movie genre: Comedy.",
  "Football teams: Liverpool and Orlando Pirates.",
  "Favourite superhero: Batman.",
  "Favourite Batman movie: The Dark Knight.",
  "Dream holiday: Dagestan.",
  "Mikael would happily spend six months in Dagestan.",
  "Favourite sport to play: Basketball.",
  "High-school basketball number: 4.",
  "All-time athlete: Michael Jordan.",
  "Current NBA player: Steph Curry.",
  "Favourite artists include Dave and J. Cole.",
  "Local artist favourites include Kwesta and Sjava.",
  "Cody's middle name is Aladeen.",
  "Mikael was born in England.",
  "Mikael moved to South Africa.",
  "Coach Micky is one of Mikael's aliases.",
  "Mikael has built shelves and a lamp.",
  "Purple has survived every colour audit.",
  "Basketball is the answer even when soccer looks like the obvious trap.",
  "Mr Perfect is an officially unofficial title.",
  "Mikhail Petrov has appeared as a suspicious alias.",
  "Bank of Micky is somehow a functioning LizzyOS financial institution.",
  "Micky Bucs are accepted currency inside LizzyOS.",
  "Life Lessons with Micky should not be used as accredited educational material.",
  "Crack the Code knows far too much about Mikael.",
  "A Monster can become a Reverse Token debt.",
  "Mikael's Reverse Tokens sync across devices.",
  "The Office counts as educational material according to this database.",
  "Mikael enjoys hiding secrets inside other secrets.",
  "The classified folder is never as innocent as it looks.",
  "There is an alarming amount of Mikael lore in LizzyOS."
];

const quotes = [
  "Yeah my folder is deep like that.",
  "Justice for Lizzy.",
  "Miss Bob The Builder.",
  "You're actually stunning.",
  "No weapon formed against my JavaScript shall prosper.",
  "This definitely needs its own feature.",
  "We can make that more dramatic.",
  "Mr Perfect has entered the chat.",
  "Technically, Micky Bucs are a stable currency.",
  "The website needs more unnecessary lore.",
  "I have an idea.",
  "Why make it normal when we can make it LizzyOS?",
  "The Office is educational material.",
  "Batman would understand.",
  "I refuse to elaborate.",
  "The database has spoken."
];

const lizzyIntel = [
  "They had a chance to be Mr Perfect.",
  "He doesn't deserve that.",
  "That's just how I am.",
  "You're being so dramatic.",
  "It makes me feel girly."
];

const opinions = [
  "The Office is objectively educational material.",
  "Winter is superior and the database will not accept appeals.",
  "Purple works with basically everything.",
  "Batman is the correct answer to more questions than people realise.",
  "Every website needs at least one completely unnecessary secret.",
  "A joke becomes funnier once it has its own user interface.",
  "Micky Bucs should probably be regulated.",
  "Mr Perfect is a title, a lifestyle and potentially a clerical error.",
  "Four is a very good number. Evidence: high-school jersey.",
  "Reverse Tokens are an important advancement in modern economics."
];

const questions = [
  ["What number did Mikael wear in high school?", "4", ["4", "9"]],
  ["Which sport is Mikael's favourite to play?", "Basketball", ["Basketball", "Soccer"]],
  ["Mikael's favourite superhero?", "Batman", ["Batman", "Spider-Man"]],
  ["Favourite season?", "Winter", ["Winter", "Summer"]],
  ["Favourite colour?", "Purple", ["Purple", "Blue"]],
  ["Favourite TV show?", "The Office", ["The Office", "Brooklyn Nine-Nine"]],
  ["All-time athlete?", "Michael Jordan", ["Michael Jordan", "LeBron James"]],
  ["Current NBA favourite?", "Steph Curry", ["Steph Curry", "Seth Curry"]],
  ["Favourite Batman movie?", "The Dark Knight", ["The Dark Knight", "The Batman"]],
  ["Cody's middle name?", "Aladeen", ["Aladeen", "Bruce"]]
];

const files = [
  {
    id:"FILE 04", name:"THE NUMBER FOUR", status:"UNLOCKED",
    classification:"PERSONAL INTELLIGENCE", icon:"🔢",
    body:[
      "Investigations have confirmed that the number 4 has followed Subject Mikael for longer than LizzyOS initially realised.",
      "During his high-school basketball career, Mikael wore #4.",
      "This information has since appeared suspiciously often throughout LizzyOS and has even been used as classified intelligence in previous missions.",
      "AGENT NOTE: If a LizzyOS question randomly asks for a number and you have absolutely no idea what the answer is… 4 isn't the worst guess.",
      "STATUS: Case remains unnecessarily open."
    ]
  },
  {
    id:"FILE BAT", name:"GOTHAM PROTOCOL", status:"UNLOCKED",
    classification:"EXTREME BATMAN BIAS", icon:"🦇",
    body:[
      "Intelligence has conclusively established that Mikael's favourite superhero is Batman, with The Dark Knight holding the position of favourite Batman movie.",
      "More concerningly, Mikael appears to have taken this admiration slightly too far.",
      "Multiple reports indicate that the subject has a tendency to become Batman in broad daylight, despite darkness generally being considered an important part of the job.",
      "He has also been observed periodically working on his fighting moves. On certain occasions, Lizzy has unfortunately been selected as the opposition.",
      "Whether Lizzy actually agreed to participate in these training sessions remains under investigation.",
      "This may explain Mikael's suspicious interest in secret identities, classified documents, dramatic aliases and unnecessarily complicated technology.",
      "KNOWN ALIAS: Batman",
      "OPERATING HOURS: Apparently whenever he feels like it.",
      "CURRENT THREAT LEVEL: Vengeance.",
      "AGENT WARNING: If Mikael suddenly says “I'm Batman,” maintain a safe distance."
    ]
  },
  {
    id:"FILE CODY", name:"SUBJECT: CODY", status:"UNLOCKED",
    classification:"VERY GOOD BOY", icon:"🐶",
    body:[
      "Cody's classified middle name has officially been confirmed as Aladeen.",
      "His grappling abilities have also been assessed. RESULT: Decent.",
      "Mikael remains confident that he could probably handle the situation if necessary. Probably.",
      "However, there is one significant complication: Cody may be the first dog in recorded LizzyOS history to have his own lawyer.",
      "Said lawyer has been identified as Lizzy.",
      "This has significantly reduced Mikael's willingness to take any questionable action against Cody, as any altercation could immediately result in legal proceedings.",
      "Cody therefore enjoys an unusual combination of grappling ability and legal representation.",
      "LEGAL COUNSEL: Lizzy",
      "GRAPPLING: Decent",
      "LAWYER: Unfortunately, yes.",
      "MIKAEL'S CONFIDENCE: Declining.",
      "AGENT NOTE: Do not fight someone who can both grapple you and sue you."
    ]
  },
  {
    id:"FILE DAG", name:"DAGESTAN DOSSIER", status:"UNLOCKED",
    classification:"INTERNATIONAL TRAINING OPERATION", icon:"🏔️",
    body:[
      "Mikael's dream destination has been identified as Dagestan.",
      "Initial intelligence suggested that this would simply be a holiday. Further investigation determined that Mikael intends to remain there for approximately six months.",
      "At this point, LizzyOS Intelligence stopped referring to it as a holiday.",
      "The subject's proposed itinerary reportedly includes training, improving his grappling skills and, for reasons investigators still do not fully understand, wrestling bears.",
      "Mikael apparently believes this will contribute positively to his grappling development.",
      "LizzyOS would like it formally recorded that wrestling a bear is not an approved training method. Mikael appears unlikely to care.",
      "MISSION: Improve grappling",
      "DURATION: Approximately six months",
      "TRAINING PARTNERS: Humans, presumably",
      "BEARS: Disturbingly possible",
      "EXPECTED RETURN: Eventually",
      "AGENT NOTE: If Mikael returns capable of double-legging a bear, the investigation will be permanently closed."
    ]
  },
  {
    id:"FILE MP", name:"MR PERFECT", status:"ENCRYPTED",
    classification:"TOP SECRET", icon:"👤",
    body:[
      "The individual known as Mr Perfect has been operating within LizzyOS for some time.",
      "Despite what the name may suggest, investigators have discovered surprisingly little evidence of actual perfection.",
      "What they have discovered is someone who will turn one small joke into an entire website feature, create fictional currencies, establish a bank that probably shouldn't have a banking licence, hide classified files inside other classified files and then act surprised when Lizzy discovers them.",
      "Subject demonstrates a severe Batman bias, an unhealthy confidence in Micky Bucs, suspicious loyalty to the number 4, and an inability to leave LizzyOS alone without adding another feature.",
      "There is, however, another reason the alias Mr Perfect continues to appear throughout the system.",
      "Intelligence suggests that underneath all the jokes, ridiculous missions, Reverse Tokens, secret files and unnecessary security systems, Mikael genuinely enjoys finding new ways to make Lizzy laugh and smile.",
      "This appears to be one of the few objectives within LizzyOS that he takes completely seriously.",
      "Further investigation has also revealed that Mikael considers Lizzy to be super kind, smart, beautiful, stunning and amazing.",
      "This information has appeared repeatedly enough that investigators no longer consider it an isolated incident.",
      "KNOWN WEAKNESSES: Currently classified. Lizzy probably knows most of them anyway.",
      "KNOWN STRENGTHS: Making simple ideas unnecessarily elaborate.",
      "KNOWN ASSOCIATES: Cody Aladeen, despite ongoing legal tensions.",
      "PRIMARY ADVERSARY: JavaScript.",
      "SECONDARY ADVERSARY: Mikael's knees.",
      "LEGAL STATUS: Questionable.",
      "MR PERFECT STATUS: Self-appointed.",
      "FINAL INTELLIGENCE ASSESSMENT: Mr Perfect probably isn't actually perfect. But when it comes to Lizzy… he's definitely trying.",
      "END OF FILE.",
      "P.S. If you're reading this, you somehow figured out that the password was “Micky The Greatest.” Mikael's humility rating has therefore been reduced from 3% to 1%."
    ]
  }
];

let currentTab = "profile";

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  }[c]));
}

function profileHTML() {
  return `
    <div class="mikaelProfileGrid">
      <article><small>IDENTITY</small><h3>Mikael Thembinkosi Mulaudzi</h3><p>Also known around here as Coach Micky, Mr Perfect and, under suspicious circumstances, Mikhail Petrov.</p></article>
      <article><small>CORE FAVOURITES</small><h3>💜 Purple • ❄️ Winter</h3><p>📺 The Office<br>🦇 Batman / The Dark Knight<br>🎬 Comedy</p></article>
      <article><small>SPORTS FILE</small><h3>🏀 Basketball</h3><p>High-school number: <b>4</b><br>All-time: Michael Jordan<br>Current: Steph Curry</p></article>
      <article><small>FOOTBALL ALLEGIANCE</small><h3>⚽ Liverpool / Orlando Pirates</h3><p>Dual-club intelligence confirmed.</p></article>
      <article><small>MUSIC FILE</small><h3>🎧 Dave • J. Cole</h3><p>Local favourites include Kwesta and Sjava.</p></article>
      <article><small>TRAVEL FILE</small><h3>📍 Dagestan</h3><p>Dream trip. Six-month duration, because apparently a normal holiday wasn't enough.</p></article>
    </div>`;
}

function statsHTML() {
  const stats = [
    ["Humour", "94%"], ["Humility", "3%"], ["Mr Perfect Status", "100%"],
    ["Batman Bias", "99%"], ["Website Feature Restraint", "2%"],
    ["Folder Depth", "97%"], ["Knee Durability", "CLASSIFIED"],
    ["Micky Buc Financial Confidence", "101%"],
    ["Likelihood of Adding Another Secret", "98%"]
  ];
  return `
    <div class="mikaelStats">
      ${stats.map(([name, value]) => `
        <div><span>${esc(name)}</span><b>${esc(value)}</b>
        <i style="--w:${parseInt(value,10) || 72}%"></i></div>`).join("")}
    </div>
    <button type="button" class="mikaelOpinionBtn" id="generateMikaelOpinion">🎲 Generate Mikael Opinion</button>
    <div id="mikaelOpinion" class="mikaelOpinion">The database is awaiting a controversial opinion.</div>`;
}

function factHTML() {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  return `
    <div class="mikaelRandomCard">
      <small>RANDOM MIKAEL INTELLIGENCE</small>
      <div>🎲</div>
      <p>${esc(fact)}</p>
      <button type="button" id="nextMikaelFact">Give me another</button>
    </div>`;
}

function quotesHTML() {
  return `<div class="mikaelQuoteGrid">
    ${quotes.map((q) => `<blockquote><span>“${esc(q)}”</span><small>— Mikael.exe</small></blockquote>`).join("")}
  </div>`;
}

function intelHTML() {
  return `
    <div class="lizzyIntelHero"><span>🕵️</span><div><small>INTERCEPTED LIZZY INTELLIGENCE</small><h3>Things Lizzy has said</h3></div></div>
    <div class="mikaelQuoteGrid">
      ${lizzyIntel.map((q) => `<blockquote class="lizzyIntelQuote"><span>“${esc(q)}”</span><small>— Lizzy • VERIFIED</small></blockquote>`).join("")}
    </div>`;
}

function challengeHTML() {
  const best = Number(localStorage.getItem("mikaelProfileChallengeBest") || 0);
  return `
    <div class="mikaelChallenge">
      <div class="mikaelChallengeTop">
        <div><small>QUICK AUTHENTICATION</small><h3>Do You Actually Know Mikael?</h3></div>
        <b>Best: ${best}/${questions.length}</b>
      </div>
      <p>Ten quick A/B questions. No consulting the classified files. 👀</p>
      <button type="button" id="startMikaelChallenge">Start Challenge</button>
      <div id="mikaelChallengeBody"></div>
    </div>`;
}

function classifiedHTML() {
  const mpUnlocked = localStorage.getItem("mikaelMrPerfectDecryptedV1") === "yes";
  return `<div class="mikaelFiles">
    ${files.map((file, i) => `
      <article class="${file.status === "ENCRYPTED" && !mpUnlocked ? "restricted" : ""}">
        <small>${esc(file.id)} // ${file.status === "ENCRYPTED" && mpUnlocked ? "DECRYPTED" : esc(file.status)}</small>
        <h3>${file.icon} ${esc(file.name)}</h3>
        <p>${esc(file.classification)}</p>
        <button type="button" class="mikaelOpenFile" data-file-index="${i}">${file.status === "ENCRYPTED" && !mpUnlocked ? "🔒 OPEN ENCRYPTED FILE" : "OPEN FILE"}</button>
      </article>`).join("")}
  </div>`;
}


function showDossier(file) {
  const host = $("mikaelTabContent");
  if (!host) return;
  host.innerHTML = `
    <div class="mikaelDossier">
      <button type="button" id="backToClassified">← Back to Classified</button>
      <div class="dossierStamp">CLASSIFIED</div>
      <small>${esc(file.id)} // ${esc(file.classification)}</small>
      <h2>${file.icon} ${esc(file.name)}</h2>
      <div class="dossierMeta"><b>STATUS:</b> ${file.id === "FILE MP" ? "DECRYPTED 🔓" : "UNLOCKED"}</div>
      <div class="dossierBody">${file.body.map(p => `<p>${esc(p)}</p>`).join("")}</div>
    </div>`;
}

function showDecrypt() {
  const host = $("mikaelTabContent");
  if (!host) return;
  host.innerHTML = `
    <div class="mikaelDecrypt">
      <button type="button" id="backToClassified">← Back to Classified</button>
      <div class="decryptIcon">🔐</div>
      <small>FILE MP // TOP SECRET</small>
      <h2>ENCRYPTED DOCUMENT</h2>
      <p>FILE MP contains highly classified information regarding the individual operating under the alias “Mr Perfect.”</p>
      <p>Enter the decryption phrase to continue.</p>
      <input id="mikaelDecryptCode" autocomplete="off" placeholder="ENTER DECRYPTION CODE">
      <button type="button" id="decryptMrPerfect">DECRYPT FILE</button>
      <p class="decryptHint"><b>HINT:</b> Remember your birthday gift… one of the cards may have been signed with the answer. 👀</p>
      <div id="decryptFeedback"></div>
    </div>`;
}

function openFile(index) {
  const file = files[index];
  if (!file) return;
  if (file.id === "FILE MP" && localStorage.getItem("mikaelMrPerfectDecryptedV1") !== "yes") {
    showDecrypt();
  } else {
    showDossier(file);
  }
}

function decryptMrPerfect() {
  const input = $("mikaelDecryptCode");
  const feedback = $("decryptFeedback");
  if (!input || !feedback) return;
  const entered = input.value.trim().toLowerCase();
  if (entered === "micky the greatest") {
    feedback.innerHTML = "<b>DECRYPTING… IDENTITY CONFIRMED… ACCESS GRANTED 🔓</b>";
    localStorage.setItem("mikaelMrPerfectDecryptedV1", "yes");
    setTimeout(() => showDossier(files.find(f => f.id === "FILE MP")), 850);
  } else {
    const fails = ["ACCESS DENIED.", "Nice try, Agent Yelizaveta.", "Mr Perfect says absolutely not.", "Incorrect. The ego required for this password is apparently higher."];
    feedback.textContent = fails[Math.floor(Math.random() * fails.length)];
  }
}

function render() {
  const host = $("mikaelTabContent");
  if (!host) return;

  const map = {
    profile: profileHTML,
    stats: statsHTML,
    facts: factHTML,
    quotes: quotesHTML,
    intel: intelHTML,
    challenge: challengeHTML,
    classified: classifiedHTML
  };

  host.innerHTML = (map[currentTab] || profileHTML)();
}

function open() {
  const win = $("mikaelDatabaseWindow");
  if (!win) return;
  win.classList.remove("hidden");
  currentTab = currentTab || "profile";
  render();
}

function close() {
  $("mikaelDatabaseWindow")?.classList.add("hidden");
}

function startChallenge() {
  const body = $("mikaelChallengeBody");
  if (!body) return;

  const order = [...questions].sort(() => Math.random() - 0.5);
  let i = 0;
  let score = 0;

  function next() {
    if (i >= order.length) {
      const best = Math.max(score, Number(localStorage.getItem("mikaelProfileChallengeBest") || 0));
      localStorage.setItem("mikaelProfileChallengeBest", String(best));
      body.innerHTML = `
        <div class="mikaelChallengeResult">
          <span>${score >= 8 ? "🏆" : score >= 5 ? "😌" : "😭"}</span>
          <h3>${score}/${order.length}</h3>
          <p>${score === 10 ? "Okay this is suspicious. Perfect score." : score >= 8 ? "Agent Yelizaveta knows her subject." : score >= 5 ? "Respectable. The database expected slightly more though." : "Mr Perfect has filed a formal complaint."}</p>
          <button type="button" id="challengeAgain">Try Again</button>
        </div>`;
      return;
    }

    const [question, answer, options] = order[i];
    body.innerHTML = `
      <div class="mikaelQuestion">
        <small>QUESTION ${i + 1}/${order.length}</small>
        <h3>${esc(question)}</h3>
        <div>${options.map((option) => `<button type="button" data-mikael-answer="${esc(option)}">${esc(option)}</button>`).join("")}</div>
        <p id="mikaelQFeedback"></p>
      </div>`;

    body.querySelectorAll("[data-mikael-answer]").forEach((button) => {
      button.addEventListener("click", () => {
        const correct = button.dataset.mikaelAnswer === answer;
        if (correct) score++;
        const feedback = $("mikaelQFeedback");
        if (feedback) feedback.textContent = correct ? "✓ Correct" : "✗ Nope — " + answer;
        body.querySelectorAll("[data-mikael-answer]").forEach((b) => b.disabled = true);
        i++;
        setTimeout(next, 550);
      }, { once: true });
    });
  }

  next();
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest("#openMikaelDatabase")) {
    event.preventDefault();
    open();
    return;
  }

  if (target.closest("#mikaelDatabaseClose, #mikaelDatabaseCloseBtn")) {
    event.preventDefault();
    close();
    return;
  }

  const tab = target.closest("[data-mikael-tab]");
  if (tab) {
    event.preventDefault();
    currentTab = tab.dataset.mikaelTab;
    document.querySelectorAll("[data-mikael-tab]").forEach((b) => b.classList.remove("active"));
    tab.classList.add("active");
    render();
    return;
  }

  if (target.closest("#nextMikaelFact")) {
    event.preventDefault();
    render();
    return;
  }

  if (target.closest("#generateMikaelOpinion")) {
    event.preventDefault();
    const box = $("mikaelOpinion");
    if (box) box.textContent = "“" + opinions[Math.floor(Math.random() * opinions.length)] + "” — Mikael.exe";
    return;
  }

  const fileButton = target.closest("[data-file-index]");
  if (fileButton) {
    event.preventDefault();
    openFile(Number(fileButton.dataset.fileIndex));
    return;
  }

  if (target.closest("#backToClassified")) {
    event.preventDefault();
    currentTab = "classified";
    render();
    return;
  }

  if (target.closest("#decryptMrPerfect")) {
    event.preventDefault();
    decryptMrPerfect();
    return;
  }

  if (target.closest("#startMikaelChallenge, #challengeAgain")) {
    event.preventDefault();
    startChallenge();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement?.id === "mikaelDecryptCode") {
    event.preventDefault();
    decryptMrPerfect();
  }
});
window.MikaelDatabaseV27 = { open, close, render, startChallenge, openFile, decryptMrPerfect };
})();
