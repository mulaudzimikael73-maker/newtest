LizzyOS — Micky Bank claimable deposits
=======================================

Files updated / included:
- cloudflare-worker.js   (fixed: Python removed, all JavaScript + new deposit/claim system)
- index.html             (now loads telegram-bank-sync.js)
- telegram-bank-sync.js  (shows the "Claim Deposit" popup on the site)
- script.js, style.css, seed-store.js, living-desktop.js, fun-apps.js,
  cloudflare-worker-approval.js, upload.html  (unchanged originals)

Deploy steps
------------
1. Cloudflare dashboard -> your Worker -> paste cloudflare-worker.js -> Deploy.
2. Worker -> Settings -> Variables -> KV Namespace Bindings:
   add binding named  LIZZY_KV  (create a namespace if you don't have one).
   Without this binding deposits cannot be stored.
3. Upload the site files (index.html, telegram-bank-sync.js, etc.) to your host.

How to use
----------
In Telegram, message your bot:
   /deposit 50            -> creates a pending 50 MB deposit for Lizzy
   /deposit 50 birthday   -> same, with a note
   /deposits              -> lists deposits that are still unclaimed

On the site a purple "Claim Deposit" card appears bottom-right.
The money stays pending until someone presses Claim Deposit.
Each deposit can only be claimed once, and expires after 30 days.
