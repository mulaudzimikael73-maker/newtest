UPDATE V3-MAIN WITH NEWTEST'S FEATURES
========================================
This zip brings your live "YourUltimateFanV3-main" site up to date with
everything currently in "newtest". It includes the mood-match fix from
before, PLUS three newer things newtest has that v3 doesn't yet:

  1. "Our World" — a new co-op page (letters + a real 2-player chess
     game between you and Lizzy)
  2. A private "Mikael HQ" page for you to read Lizzy's letters and
     reply, and play your side of the chess game
  3. A `/token` and `/tokens` Telegram command so you can grant Lizzy
     any Reverse Token by just texting the bot, plus 34 new dares and
     a batch of new fake-newspaper headlines

FILES IN THIS ZIP (14 total) — upload all of them to the ROOT of your
YourUltimateFanV3-main repo, overwriting the existing ones:

  NEW FILES (not in v3 yet):
    chess-fallback.js     — backup chess engine, used only if the chess.js
                             CDN is unreachable
    coop.css               \
    coop.html               } Lizzy's "Our World" page (letters + chess)
    coop.js                /
    mikael-hq.css          \
    mikael-hq.html          } your private HQ page (read/reply to letters,
    mikael-hq.js            } play your side of chess)

  UPDATED FILES:
    index.html             — adds the "Our World" ❤️ icon to the desktop
    living-desktop.js      — adds the 4 mood options (Missing My Standard,
                             Feeling Like Catwoman, Excited, Funky)
    mikael-connection.js   — the mood-match fix from before (Missing ↔
                             Missing, Catwoman ↔ Batman, same-word matches)
    cloudflare-worker.js   — backend support for Our World letters/chess,
                             Mikael HQ, and the new /token Telegram command
    news-data.ts           — new newspaper headlines and articles
    seed-store.js          — 34 new dares added to the daily jobs board
    style.css              — small scroll-bar fix for the token list

DEPLOYMENT STEPS
-----------------
1. STATIC SITE FILES (everything except cloudflare-worker.js):
   Copy all of them into your GitHub repo (overwriting existing files),
   commit, and push — same as your usual process (see README.md /
   UPLOAD_THE_WHOLE_SITE.txt in your repo). GitHub Pages will redeploy
   automatically.

2. CLOUDFLARE WORKER (cloudflare-worker.js) — separate step:
   This file does NOT live on GitHub Pages — it's your Cloudflare Worker
   backend. You need to open your Cloudflare dashboard (or use wrangler)
   and paste/deploy this file's contents there directly, replacing the
   current worker code.

3. NEW SECRET REQUIRED — MIKAEL_HQ_KEY:
   Mikael HQ is protected by a password stored as a Worker secret called
   MIKAEL_HQ_KEY. In the Cloudflare dashboard, go to your Worker →
   Settings → Variables, and add MIKAEL_HQ_KEY with any password you
   choose. That's the password you'll type into mikael-hq.html to log in.
   (If you skip this step, Mikael HQ's login will always fail.)

4. FINDING MIKAEL HQ:
   mikael-hq.html is intentionally NOT linked anywhere in the site's
   navigation, so Lizzy won't stumble onto it. Once uploaded, you reach
   it directly at:
     https://<your-site-url>/mikael-hq.html
   Bookmark that URL for yourself.

5. Hard refresh (Ctrl+Shift+R) after the GitHub Pages deploy finishes,
   same as usual, so the browser doesn't serve old cached files.

NOTHING ELSE CHANGES
----------------------
Your content/ folder (photos, videos, readme data) and .nojekyll file
are untouched — this zip only contains code files.
