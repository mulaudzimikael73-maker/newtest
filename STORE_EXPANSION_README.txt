LIZZYOS STORE EXPANSION V2
==========================

WHAT IS PRESERVED
- Existing streak storage
- Existing Micky Bucs wallet/balance
- Existing daily jobs and completed-job records
- Existing Garden and seed inventory
- Existing Token Jar and Argument Winner Pass
- Existing games and Telegram notification bridge

NEW FEATURES
- Verified job system
- Mikael approval queue through Telegram
- Daily Classified store item
- Mystery Seed Pack and cosmetic extras
- Micky Bank + weekly savings bonus
- Achievements with MB bonuses
- Mikael's Secret Shelf

IMPORTANT: TELEGRAM APPROVAL BUTTONS
The website portion works immediately, but actual Approve/Reject buttons require
upgrading your existing Cloudflare Worker with cloudflare-worker-approval.js.

Cloudflare setup:
1. Open the same Worker currently used by LizzyOS.
2. Create a KV namespace and bind it to the Worker as LIZZY_CLAIMS.
3. Keep your existing TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID secrets.
4. Replace the Worker code with cloudflare-worker-approval.js and deploy.
5. Set the Telegram bot webhook to:
   https://YOUR-WORKER.workers.dev/telegram-webhook
6. Test one Mikael-approval job on the TEST site first.

The frontend never calls localStorage.clear() and does not reset protected progress keys.
