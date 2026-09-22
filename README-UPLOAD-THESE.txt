PERFORMANCE FIX — background polling was running nonstop
============================================================

5 files changed, all go in the ROOT of your "newtest" repo,
overwriting what's already there:

1. index.html
2. script.js
3. seed-store.js
4. mikael-connection.js
5. telegram-bank-sync.js

WHAT WAS CAUSING THE SLOWNESS
--------------------------------
Your site was making background network requests continuously,
for as long as the tab stayed open — even when nobody was doing
anything, and even when the tab was in the background:

  - checkAnnoy()      (script.js)            every  6 seconds
  - checkPending()    (seed-store.js)        every 15 seconds
  - sync()            (script.js, bank)      every 60 seconds
  - render()          (telegram-bank-sync.js) every 60 seconds
  - renderMessages()  (mikael-connection.js) every 60 seconds

That's roughly 17 requests a minute, nonstop, none of them
pausing when the tab was in the background. checkAnnoy() was the
worst offender at every 6 seconds.

WHAT CHANGED
-------------
- All five now pause completely while the tab is hidden/backgrounded
  (using document.hidden), and resume the moment you switch back —
  so nothing about how the site behaves for you changes, it just
  stops working in the background when you're not looking at it.
- checkAnnoy() also slowed from every 6s to every 20s even while the
  tab IS visible — still responsive, just far less aggressive.
- seed-store.js also still has your job-description fixes from
  before (Great Hide & Seek, The Artist, etc.) — nothing there was
  touched or lost.
- Bumped all the relevant script version tags in index.html so your
  browser/GitHub Pages won't serve a stale cached copy.

BEFORE YOU COMMIT
-------------------
Check GitHub Desktop's Changes list — all 5 files should show as
MODIFIED with visible diffs. If any is missing from that list, it
didn't land in the right folder.

AFTER PUSHING
--------------
Hard refresh (Ctrl/Cmd+Shift+R) or use a private window before
judging whether it feels faster — and give it a minute or two of
just sitting open to actually feel the difference, since the fix
is about background activity over time, not the very first load.
