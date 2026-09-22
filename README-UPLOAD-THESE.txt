VIP CASINO — FIX + BIGGER SCREEN + NEW LOOK
=============================================

Only 2 files, both go in the ROOT of your "newtest" repo, overwriting
what's already there:

1. index.html
2. vip-casino.js

WHAT CHANGED THIS ROUND
-------------------------
- Roulette: moved the bet-amount chips + SPIN button up so they sit
  right under the wheel, instead of at the very bottom of a long
  scrolling list of numbers. On a tall board like Roulette's, a tap
  near the bottom of a scrolling area can land on the Close button
  sitting just below it — this fixes that by keeping Spin higher up.
- All button clicks (chips, numbers, outside bets, spin) now go
  through one robust click handler instead of many separate ones,
  and spins are wrapped so if anything ever does go wrong, you get
  a message and your bet back instead of the game just misbehaving.
- The whole VIP Casino window is noticeably bigger now (up to
  1180px wide / 95% of the screen height, versus ~920px before).
- New look: a proper casino display font (Cinzel) for headers and
  numbers, a felt-style textured background, gold corner accents on
  each game panel, bigger glowing reels and roulette wheel, and
  poker-chip-style bet buttons with a hover lift.
- Bumped the script's version tag so your browser/GitHub Pages
  won't serve a stale cached copy.

BEFORE YOU COMMIT
-------------------
In GitHub Desktop, check the Changes list:
  - index.html should show as MODIFIED with a visible diff.
  - vip-casino.js should show as MODIFIED (or new, if this is your
    first time getting it) — not missing from the list.
Then commit both together and Push origin.

AFTER PUSHING
--------------
Hard refresh the live site (Ctrl/Cmd+Shift+R, or a private window).

IF SOMETHING STILL MISBEHAVES
--------------------------------
Open the site, right-click → Inspect → Console tab, try the action
that's breaking, and send me any red error text that shows up —
the spin handlers now log real errors there instead of failing
silently, so this will pinpoint it fast.
