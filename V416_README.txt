V4.16 SELF-CONTAINED FUN APPS

ROOT FIX:
The four apps no longer depend on the older living-desktop.js window helper,
its private scope, or its event-binding lifecycle.

A new fun-apps.js is loaded LAST in index.html. It owns:
- Lizzy Assistant
- How's Today?
- Cody Court (24 cases)
- Rock Paper Scissors
- their modal windows
- their click handling
- their local scores/state
- Telegram notification requests

The new windows append directly to document.body at z-index 50000, so they are
not trapped inside the desktop grid or another stacking context.

Existing Cody photo, Batman wallpaper, Secret Shelf, Mikael.exe, Telegram Worker,
and the rest of LizzyOS remain unchanged.

UPLOAD THESE 3 FILES:
- index.html
- style.css
- fun-apps.js

Do not replace living-desktop.js for this hotfix.
