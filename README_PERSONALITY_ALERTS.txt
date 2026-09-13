PERSONALITY POP-UP ALERTS + MIKAEL TAKEOVER — 2 files to upload
==================================================================
This adds a big batch of new random pop-up alerts for the 4 existing
LizzyOS personalities, plus gives Mikael Takeover its own dedicated set
of pop-ups that completely replaces the others while it's active.

FILES
-----
1. script.js
2. style.css

WHAT CHANGED
------------
Previously, each personality (Lizzy, Princess Four Eyes, Little Miss
Attitude, Agent Yelizaveta) only had 2 pop-up pools: "SYSTEM ERROR" and
"SYSTEM WARNING". I added a third pool ("SYSTEM ALERT") to each,
loaded with the new lines you sent — the mixed
NOTICE/ALERT/STATUS/UPDATE style messages. So now every ~30 seconds,
LizzyOS randomly shows an error, a warning, or one of these new
alerts (roughly equal odds of each).

- Lizzy: 22 new alerts (your 15, plus 7 more I added mixing in some
  cheekier lines alongside the sweet ones, like you asked)
- Princess Four Eyes: your 15 alerts
- Little Miss Attitude: your 15 alerts
- Agent Yelizaveta: your 15 alerts

MIKAEL TAKEOVER now has its own 25 pop-ups (exactly the list you sent),
and — this is the important part — while Mikael Takeover is active:
  - None of the 4 personality pop-up pools above will show
  - Only the 25 Mikael Takeover pop-ups appear instead
  - The pop-up uses the Bat-Signal image as its icon instead of a
    persona photo, and gets its own blue-tinted styling

As soon as Mikael Takeover is switched off, everything reverts
automatically to whichever personality Lizzy has selected — no extra
step needed, it's driven by the same "Activate/End Mikael Takeover"
button that already exists on the Living Desktop.

HOW TO UPLOAD
--------------
Upload both files to the root of your YourUltimateFanV3-main repo,
overwriting the existing script.js and style.css, then commit and
push as usual. No Cloudflare Worker changes needed for this one.
