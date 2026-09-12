
(() => {
"use strict";
const $=id=>document.getElementById(id);
const KEYS={
 wallet:"lizzyMickyBucsV1",
 jobs:"lizzyMickyJobsV1",
 allowance:"lizzyMickyDailyAllowanceV1",
 activity:"lizzyMickyActivityV1"
};
const JOBS=[{"id": "visit_garden", "title": "Visit Lizzy's Garden", "reward": 14, "desc": "Open the Garden today."}, {"id": "water_one", "title": "Water one plant", "reward": 15, "desc": "Give one Garden plant some water."}, {"id": "water_two", "title": "Water two plants", "reward": 17, "desc": "Water two plants today."}, {"id": "water_three", "title": "Water three plants", "reward": 17, "desc": "Water three plants today."}, {"id": "plant_seed", "title": "Plant a seed", "reward": 17, "desc": "Plant any seed in an empty Garden plot."}, {"id": "plant_two", "title": "Plant two seeds", "reward": 19, "desc": "Plant two seeds today."}, {"id": "check_plant", "title": "Check on a plant", "reward": 15, "desc": "Use the Garden check button."}, {"id": "collect_flower", "title": "Grow or collect a flower", "reward": 17, "desc": "Add a flower to the Garden collection."}, {"id": "visit_store", "title": "Window shopping", "reward": 14, "desc": "Open the Seed Store."}, {"id": "buy_seed", "title": "Buy any seed", "reward": 15, "desc": "Make one Seed Store purchase."}, {"id": "play_mikhail", "title": "Complete Mikhail Quiz", "reward": 17, "desc": "Finish any Mikhail Quiz level."}, {"id": "perfect_mikhail", "title": "Perfect Mikhail Quiz", "reward": 20, "desc": "Get a perfect score."}, {"id": "play_would", "title": "Complete Would Mikael Rather?", "reward": 17, "desc": "Finish today's five questions."}, {"id": "perfect_would", "title": "Perfect Would Mikael Rather?", "reward": 20, "desc": "Score 5/5."}, {"id": "play_crack", "title": "Complete a Crack the Code mission", "reward": 19, "desc": "Finish any Crack the Code mission."}, {"id": "play_ttt", "title": "Play Tic-Tac-Toe", "reward": 15, "desc": "Finish a Tic-Tac-Toe game."}, {"id": "win_ttt", "title": "Beat Mikael at Tic-Tac-Toe", "reward": 19, "desc": "Win a Tic-Tac-Toe game."}, {"id": "play_heart", "title": "Play Heart Catch", "reward": 15, "desc": "Complete a Heart Catch round."}, {"id": "play_lizzy_quiz", "title": "Complete Lizzy Quiz", "reward": 17, "desc": "Finish the Lizzy Quiz."}, {"id": "play_two_games", "title": "Play two different games", "reward": 19, "desc": "Complete two different games today."}, {"id": "play_three_games", "title": "Game Night", "reward": 22, "desc": "Complete three different games today."}, {"id": "daily_reward", "title": "Claim Daily Reward", "reward": 15, "desc": "Open today's Daily Mystery reward."}, {"id": "streak_check", "title": "Protect the streak", "reward": 15, "desc": "Visit the Daily Reward screen today."}, {"id": "open_token_jar", "title": "Check the Token Jar", "reward": 14, "desc": "Open Lizzy's Token Jar."}, {"id": "redeem_token", "title": "Redeem a token", "reward": 17, "desc": "Use any token from the Jar."}, {"id": "open_readme", "title": "Read Me check-in", "reward": 14, "desc": "Open Read Me."}, {"id": "open_date", "title": "Visit Our Date", "reward": 14, "desc": "Open the Our Date folder."}, {"id": "open_letter", "title": "Open an Open When letter", "reward": 15, "desc": "Read any Open When letter."}, {"id": "open_mission", "title": "Check Mission Log", "reward": 14, "desc": "Open the Mission Log."}, {"id": "open_recycle", "title": "Inspect the Recycle Bin", "reward": 14, "desc": "Check what LizzyOS has rejected today."}, {"id": "nice_mikael", "title": "Say one nice thing about Mikael", "reward": 17, "desc": "Self-confirmed. Difficulty may vary 😂."}, {"id": "no_hating", "title": "Five-minute Hater Break", "reward": 17, "desc": "Go five minutes without hating on Mikael. Self-confirmed."}, {"id": "compliment", "title": "Give Mikael a compliment", "reward": 17, "desc": "A genuine one. Yes, LizzyOS is serious."}, {"id": "mikael_joke", "title": "Laugh at one of Mikael's jokes", "reward": 17, "desc": "Self-confirmed. Pity laughs technically count."}, {"id": "hydrate", "title": "Drink some water", "reward": 15, "desc": "Hydration mission. Self-confirmed."}, {"id": "stretch", "title": "Quick stretch", "reward": 15, "desc": "Do a short stretch. Self-confirmed."}, {"id": "smile", "title": "Smile mission", "reward": 15, "desc": "Find one reason to smile today."}, {"id": "song", "title": "Play a favourite song", "reward": 15, "desc": "Listen to one song you love."}, {"id": "pasta_thought", "title": "Think about pasta", "reward": 14, "desc": "Probably the easiest job on the board."}, {"id": "pink_spot", "title": "Spot something pink", "reward": 15, "desc": "Find something pink in real life."}, {"id": "kind_act", "title": "Do one kind thing", "reward": 17, "desc": "Any small kind act counts."}, {"id": "message_mikael", "title": "Send Mikael a nice message", "reward": 17, "desc": "Self-confirmed."}, {"id": "roast_mikael", "title": "Roast Mikael creatively", "reward": 17, "desc": "One creative roast. Keep it harmless 😂."}, {"id": "beat_score", "title": "Try to beat a game score", "reward": 17, "desc": "Make one serious attempt."}, {"id": "garden_photo", "title": "Admire the Garden", "reward": 14, "desc": "Spend a moment checking your plants."}, {"id": "choose_flower", "title": "Pick today's favourite flower", "reward": 15, "desc": "Choose your favourite flower in the Garden."}, {"id": "organize_tokens", "title": "Token inventory check", "reward": 14, "desc": "Look through the Token Jar."}, {"id": "date_idea", "title": "Think of a future date idea", "reward": 17, "desc": "Self-confirmed."}, {"id": "little_attitude", "title": "Little Miss Attitude challenge", "reward": 17, "desc": "Deliver one iconic but harmless attitude moment."}, {"id": "lizzyos_tour", "title": "LizzyOS Tour", "reward": 19, "desc": "Visit the Garden, Games folder and Token Jar today."}, {"id": "dare_51_do_10_dramatic_victory_jumps_for_absolut", "title": "🏆 Do 10 dramatic victory jumps for absolutely no reason.", "reward": 25, "desc": "Proof required: Video."}, {"id": "dare_52_walk_across_the_room_like_you_re_on_a_fa", "title": "🕺 Walk across the room like you're on a fashion runway.", "reward": 30, "desc": "Proof required: Video."}, {"id": "dare_53_make_your_weirdest_face", "title": "🤪 Make your weirdest face.", "reward": 23, "desc": "Proof required: Photo."}, {"id": "dare_54_give_your_favourite_stuffed_animal_perso", "title": "🧸 Give your favourite stuffed animal, person, or object a name.", "reward": 18, "desc": "Proof required: Photo."}, {"id": "dare_55_recreate_a_celebrity_pose", "title": "🧑‍🎤 Recreate a celebrity pose.", "reward": 29, "desc": "Proof required: Photo."}, {"id": "dare_56_wear_something_as_a_crown", "title": "👑 Wear something as a crown.", "reward": 17, "desc": "Proof required: Photo."}, {"id": "dare_57_balance_toilet_paper_on_your_head", "title": "🧻 Balance toilet paper on your head.", "reward": 17, "desc": "Proof required: Photo or Video."}, {"id": "dare_58_freeze_like_a_statue_for_30_seconds_whil", "title": "🧍‍♀️ Freeze like a statue for 30 seconds while someone tries to make you laugh.", "reward": 23, "desc": "Proof required: Video."}, {"id": "dare_59_hold_something_cold_to_your_cheek_for_20", "title": "🥶 Hold something cold to your cheek for 20 seconds.", "reward": 24, "desc": "Proof required: Video."}, {"id": "dare_60_give_a_plant_a_name", "title": "🪴 Give a plant a name.", "reward": 18, "desc": "Proof required: Photo."}, {"id": "dare_61_draw_a_terrible_picture_of_mikael", "title": "🎨 Draw a terrible picture of Mikael.", "reward": 19, "desc": "Proof required: Photo."}, {"id": "dare_62_open_a_random_book_and_send_the_first_se", "title": "📖 Open a random book and send the first sentence you see.", "reward": 16, "desc": "Proof required: Photo."}, {"id": "dare_63_take_a_photo_of_something_that_starts_wi", "title": "🌍 Take a photo of something that starts with M.", "reward": 16, "desc": "Proof required: Photo."}, {"id": "dare_64_take_a_photo_of_something_you_walk_past_", "title": "👀 Take a photo of something you walk past every day but never notice.", "reward": 17, "desc": "Proof required: Photo."}, {"id": "dare_65_pick_up_one_piece_of_litter", "title": "🍃 Pick up one piece of litter.", "reward": 18, "desc": "Proof required: Photo."}, {"id": "dare_66_give_yourself_a_compliment_in_the_mirror", "title": "🪞 Give yourself a compliment in the mirror.", "reward": 17, "desc": "Proof required: Photo or Video."}, {"id": "dare_67_send_mikael_a_completely_unnecessary_com", "title": "💌 Send Mikael a completely unnecessary compliment.", "reward": 18, "desc": "Proof required: Screenshot."}, {"id": "dare_68_find_a_pretty_flower", "title": "🌸 Find a pretty flower.", "reward": 15, "desc": "Proof required: Photo."}, {"id": "dare_69_take_a_photo_of_a_bird_bonus_points_if_i", "title": "🐦 Take a photo of a bird. Bonus points if it looks angry.", "reward": 18, "desc": "Proof required: Photo."}, {"id": "dare_70_find_a_cloud_that_looks_like_something", "title": "☁️ Find a cloud that looks like something.", "reward": 16, "desc": "Proof required: Photo."}, {"id": "dare_71_hug_a_tree_bonus_if_you_talk_to_it_bigge", "title": "🌳 Hug a tree. Bonus if you talk to it (Bigger Bonus if it somehow talks back)", "reward": 16, "desc": "Proof required: Photo."}, {"id": "dare_72_annoy_your_sister_then_apologise_immedia", "title": "😈 Annoy your sister — then apologise immediately.", "reward": 21, "desc": "Proof required: Video."}, {"id": "dare_73_take_a_dramatic_selfie_no_explanation_re", "title": "🪞 Take a dramatic selfie. No explanation required.", "reward": 15, "desc": "Proof required: Photo."}, {"id": "dare_74_wear_two_different_socks", "title": "🧦 Wear two different socks.", "reward": 14, "desc": "Proof required: Photo."}, {"id": "dare_75_drink_a_glass_of_water", "title": "🥤 Drink a glass of water.", "reward": 15, "desc": "Proof required: Photo."}, {"id": "dare_76_find_an_animal", "title": "🐱 Find an animal.", "reward": 15, "desc": "Proof required: Photo."}, {"id": "dare_77_take_a_photo_of_the_sky_pretty_points_aw", "title": "🌅 Take a photo of the sky. Pretty points awarded.", "reward": 15, "desc": "Proof required: Photo."}, {"id": "dare_78_send_mikael_your_best_meme_make_him_laug", "title": "😂 Send Mikael your best meme. Make him laugh.", "reward": 18, "desc": "Proof required: Screenshot."}, {"id": "dare_79_hug_something_unnecessarily_large", "title": "🧸 Hug something unnecessarily large.", "reward": 17, "desc": "Proof required: Photo."}, {"id": "dare_80_send_mikael_the_song_currently_stuck_in_", "title": "🎵 Send Mikael the song currently stuck in your head.", "reward": 16, "desc": "Proof required: Screenshot."}, {"id": "dare_81_put_your_shoes_on_the_wrong_feet", "title": "👟 Put your shoes on the wrong feet.", "reward": 14, "desc": "Proof required: Photo."}, {"id": "dare_82_take_a_selfie_without_smiling_maximum_at", "title": "😎 Take a selfie without smiling. Maximum attitude.", "reward": 14, "desc": "Proof required: Photo."}, {"id": "dare_83_find_the_best_snack_in_your_house_photo_", "title": "🍫 Find the best snack in your house. Photo + explanation.", "reward": 17, "desc": "Proof required: Photo."}, {"id": "dare_84_send_someone_a_random_hope_you_re_having", "title": "❤️ Send someone a random \"hope you're having a good day.\"", "reward": 17, "desc": "Proof required: Screenshot."}, {"id": "dare_85_take_a_photo_of_something_pink", "title": "📸 Take a photo of something pink.", "reward": 18, "desc": "Proof required: Photo."}, {"id": "dare_86_touch_some_grass_literally", "title": "🌿 Touch some grass — literally.", "reward": 14, "desc": "Proof required: Photo."}, {"id": "dare_87_find_something_moving_slower_than_you", "title": "🐌 Find something moving slower than you.", "reward": 16, "desc": "Proof required: Photo or Video."}, {"id": "dare_88_put_a_sock_on_your_hand_and_introduce_yo", "title": "🧦 Put a sock on your hand and introduce your new friend.", "reward": 17, "desc": "Proof required: Photo or Video."}, {"id": "dare_89_change_your_wallpaper_for_5_minutes_it_m", "title": "📱 Change your wallpaper for 5 minutes. It must be ridiculous.", "reward": 23, "desc": "Proof required: Screenshot."}, {"id": "dare_90_take_a_fake_i_just_woke_up_selfie_maximu", "title": "🥱 Take a fake \"I just woke up\" selfie. Maximum chaos.", "reward": 35, "desc": "Proof required: Photo."}, {"id": "dare_91_talk_like_a_duck_for_30_seconds", "title": "🗣️ Talk like a duck for 30 seconds.", "reward": 31, "desc": "Proof required: Video."}, {"id": "dare_92_read_the_first_sentence_of_a_random_book", "title": "📖 Read the first sentence of a random book dramatically.", "reward": 22, "desc": "Proof required: Video."}, {"id": "dare_93_sit_somewhere_you_re_not_supposed_to_sit", "title": "🪑 Sit somewhere you're not supposed to sit.", "reward": 34, "desc": "Proof required: Photo."}, {"id": "dare_94_compliment_a_plant", "title": "🪴 Compliment a plant. 😂", "reward": 19, "desc": "Proof required: Video."}, {"id": "dare_95_put_one_ice_cube_in_your_hand_and_see_ho", "title": "🧊 Put one ice cube in your hand and see how long you last.", "reward": 31, "desc": "Proof required: Video."}, {"id": "dare_96_give_yourself_a_motivational_speech", "title": "🧍 Give yourself a motivational speech.", "reward": 26, "desc": "Proof required: Video."}, {"id": "dare_97_do_your_best_animal_impression", "title": "🐸 Do your best animal impression.", "reward": 28, "desc": "Proof required: Video."}, {"id": "dare_98_take_the_most_suspicious_looking_selfie_", "title": "🤨 Take the most suspicious-looking selfie possible.", "reward": 28, "desc": "Proof required: Photo."}, {"id": "dare_99_name_a_random_object_and_introduce_it_to", "title": "🧸 Name a random object and introduce it to Mikael.", "reward": 23, "desc": "Proof required: Video."}, {"id": "dare_100_the_artist", "title": "🎨 The Artist", "reward": 60, "desc": "Proof required: Photo."}, {"id": "dare_101_the_accent_challenge", "title": "🗣️ The Accent Challenge", "reward": 65, "desc": "Proof required: Video."}, {"id": "dare_102_the_paper_airplane_olympics", "title": "🏆 The Paper Airplane Olympics", "reward": 62, "desc": "Proof required: Video."}, {"id": "dare_103_the_floor_is_lava", "title": "🌍 The Floor Is Lava", "reward": 58, "desc": "Proof required: Video."}, {"id": "dare_104_make_your_sister_laugh", "title": "😂 Make Your Sister Laugh", "reward": 57, "desc": "Proof required: Screenshot or Video."}, {"id": "dare_105_the_weird_snack_chef", "title": "🧑‍🍳 The Weird Snack Chef", "reward": 60, "desc": "Proof required: Photo + Rating."}, {"id": "dare_106_backwards_alphabet", "title": "🔤 Backwards Alphabet", "reward": 63, "desc": "Proof required: Video."}, {"id": "dare_107_terrible_singer", "title": "🎤 Terrible Singer", "reward": 55, "desc": "Proof required: Video."}, {"id": "dare_108_the_great_hide_seek", "title": "🕵️ The Great Hide & Seek", "reward": 58, "desc": "Proof required: Video."}, {"id": "dare_109_flamingo_stand", "title": "🧍 Flamingo Stand", "reward": 38, "desc": "Proof required: Video."}, {"id": "dare_110_spoon_nose", "title": "🥄 Spoon Nose", "reward": 40, "desc": "Proof required: Video."}, {"id": "dare_111_frog_impression", "title": "🐸 Frog Impression", "reward": 42, "desc": "Proof required: Video."}, {"id": "dare_112_penguin_walk", "title": "🐧 Penguin Walk", "reward": 40, "desc": "Proof required: Video."}, {"id": "dare_113_worst_dance_move", "title": "🕺 Worst Dance Move", "reward": 38, "desc": "Proof required: Video."}, {"id": "dare_114_10_second_dance_party", "title": "💃 10-Second Dance Party", "reward": 35, "desc": "Proof required: Video."}, {"id": "dare_115_mirror_stare_down", "title": "🪞 Mirror Stare-Down", "reward": 42, "desc": "Proof required: Video."}, {"id": "dare_116_responsible_adult", "title": "🗣️ Responsible Adult", "reward": 45, "desc": "Proof required: Video."}, {"id": "dare_117_one_sentence_comedian", "title": "😂 One-Sentence Comedian", "reward": 45, "desc": "Proof required: Screenshot or Video."}, {"id": "dare_118_movie_entrance", "title": "🚪 Movie Entrance", "reward": 40, "desc": "Proof required: Video."}, {"id": "dare_119_change_your_wallpaper_for_1_hour_to_a_ph", "title": "📱 Change your wallpaper for 1 hour to a photo of Mikael", "reward": 70, "desc": "Proof required: Screenshot."}, {"id": "dare_120_change_your_wallpaper_for_1_hour_to_a_ph", "title": "📱 Change your wallpaper for 1 hour to a photo of us or one that reminds you of us", "reward": 80, "desc": "Proof required: Screenshot."}];
const SEEDS=[
 {id:"tulipSeed",name:"Tulip Seed",emoji:"🌷",price:3},
 {id:"roseSeed",name:"Rose Seed",emoji:"🌹",img:"assets/flowers/redRose.png",price:4},
 {id:"sunflowerSeed",name:"Sunflower Seed",emoji:"🌻",price:4},
 {id:"snapdragonSeed",name:"Snapdragon Seed",emoji:"🌺",img:"assets/flowers/snapdragon.png",price:5},
 {id:"lavenderSeed",name:"Lavender Seed",emoji:"🪻",img:"assets/flowers/lavender.png",price:5},
 {id:"lilySeed",name:"Lily of the Valley Seed",emoji:"🤍",img:"assets/flowers/lilyValley.png",price:7},
 {id:"cryingLilySeed",name:"Crying Lily Seed",emoji:"🥀",img:"assets/flowers/cryingLily.png",price:8},
 {id:"orchidSeed",name:"Orchid Seed",emoji:"🌸",img:"assets/flowers/orchid.png",price:9},
 {id:"mysterySeed",name:"Mystery Seed",emoji:"❓",img:"assets/flowers/mysteryBloom.png",price:12},
 {id:"moonSeed",name:"Moonflower Seed",emoji:"🌙",img:"assets/flowers/moonflower.png",price:20},
 {id:"jacarandaSeed",name:"Jacaranda Sapling",emoji:"🌳",img:"assets/flowers/jacaranda.png",price:18},
 {id:"lemonTreeSeed",name:"Lemon Tree Sapling",emoji:"🍋",img:"assets/flowers/lemonTree.png",price:18},
 {id:"willowSeed",name:"Willow Sapling",emoji:"🌳",img:"assets/flowers/willow.png",price:22},
 {id:"cherryTreeSeed",name:"Cherry Blossom Sapling",emoji:"🌸",img:"assets/flowers/cherryTree.png",price:24},
 {id:"pinkDogwoodSeed",name:"Pink Dogwood Sapling",emoji:"🌸",img:"assets/flowers/pinkDogwood.png",price:26},
 {id:"bottlebrushSeed",name:"Bottlebrush Sapling",emoji:"🌳",img:"assets/flowers/bottlebrush.png",price:28},
 {id:"silkTreeSeed",name:"Persian Silk Sapling",emoji:"🌸",img:"assets/flowers/silkTree.png",price:30},
 {id:"japaneseMapleSeed",name:"Japanese Maple Sapling",emoji:"🍁",img:"assets/flowers/japaneseMaple.png",price:34},
 {id:"saucerMagnoliaSeed",name:"Saucer Magnolia Sapling",emoji:"🌷",img:"assets/flowers/saucerMagnolia.png",price:38},
 {id:"mikaelSeed",name:"Mikael's Favourite",emoji:"🍌",img:"assets/flowers/bananaTree.png",price:25,note:"Grows into something suspiciously banana-shaped."}
];
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
const read=(k,f)=>{try{let v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const balance=()=>Number(localStorage.getItem(KEYS.wallet)||0);
const setBalance=n=>localStorage.setItem(KEYS.wallet,String(Math.max(0,n)));
function notify(type,title,details,extra){if(typeof window.lizzyTelegramNotify==="function")return window.lizzyTelegramNotify(type,title,details,extra);if(typeof lizzyTelegramNotify==="function")return lizzyTelegramNotify(type,title,details,extra);return Promise.resolve(false)}
function hash(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function dailyJobs(){
 let state=read(KEYS.jobs,{date:"",selected:[],completed:{}});
 if(state.date!==today()){
   const ranked=[...JOBS].sort((a,b)=>(hash(today()+a.id)%100000)-(hash(today()+b.id)%100000));
   state={date:today(),selected:ranked.slice(0,5).map(x=>x.id),completed:{}};
   write(KEYS.jobs,state);
 }
 return state;
}
function render(){
 if($("mickyBalance"))$("mickyBalance").textContent=balance();
 const state=dailyJobs();
 const host=$("mickyJobsList");
 if(host)host.innerHTML=state.selected.map(id=>{
   const j=JOBS.find(x=>x.id===id),done=!!state.completed[id];
   return `<div class="mickyJobCard ${done?"completed":""}"><h4>🎯 ${j.title}</h4><p>${j.desc}</p><div class="mickyJobReward">💵 +${j.reward} MB</div><button data-job="${j.id}" ${done?"disabled":""}>${done?"Completed ✓":"Mark Complete"}</button></div>`;
 }).join("");
 host?.querySelectorAll("[data-job]").forEach(b=>b.onclick=()=>completeJob(b.dataset.job));
 const shop=$("seedShopList");
 if(shop)shop.innerHTML=SEEDS.map(s=>`<div class="seedShopCard">${s.img?`<img class="seedPhoto" src="${s.img}" alt="${s.name}">`:`<div class="seedPhoto" aria-hidden="true">${s.emoji}</div>`}<h4>${s.name}</h4><div class="seedPrice">💵 ${s.price} MB</div><button data-buy="${s.id}">Buy Seed</button></div>`).join("");
 shop?.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>buySeed(b.dataset.buy));
 const claimed=localStorage.getItem(KEYS.allowance)===today();
 if($("claimMickyAllowance")){$("claimMickyAllowance").disabled=claimed;$("claimMickyAllowance").textContent=claimed?"Minimum Wage Claimed ✓":"Claim Minimum Wage +12 MB"}
}
function completeJob(id){
 const state=dailyJobs(),j=JOBS.find(x=>x.id===id);
 if(!j||!state.selected.includes(id)||state.completed[id])return;
 state.completed[id]={at:new Date().toISOString(),reward:j.reward};
 write(KEYS.jobs,state);setBalance(balance()+j.reward);
 if($("seedStoreStatus"))$("seedStoreStatus").textContent=`✅ Job complete! +${j.reward} MB`;
 notify("💼 MICKY BUCS JOB COMPLETED",j.title,`Status: COMPLETED\nEarned: +${j.reward} MB\nNew Balance: ${balance()} MB\nDate: ${today()}`,{task:j.title,reward:j.reward,amount:j.reward,balance:balance()});
 render();
}
function claimAllowance(){
 if(localStorage.getItem(KEYS.allowance)===today())return;
 localStorage.setItem(KEYS.allowance,today());setBalance(balance()+12);
 if($("mickyAllowanceStatus"))$("mickyAllowanceStatus").textContent="💵 Minimum Wage claimed: +12 MB";
 notify("💵 DAILY MICKY BUCS","Minimum Wage Claimed",`Lizzy claimed +12 MB Minimum Wage\nNew balance: ${balance()} MB\nDate: ${today()}`,{amount:12,reward:12,balance:balance()});
 render();
}
function buySeed(id){
 const s=SEEDS.find(x=>x.id===id);if(!s)return;
 if(balance()<s.price){if($("seedStoreStatus"))$("seedStoreStatus").textContent=`😭 Not enough Micky Bucs. You need ${s.price} MB.`;return}
 // ADD to the existing Garden only. Never recreate/reset Garden progress.
 // Preferred path: the Garden's own safe entry point. It re-reads the saved
 // Garden first, so purchased seeds can never be overwritten by a later save.
 let added=false;
 try{
   if(window.LizzyRewards&&typeof window.LizzyRewards.addSeed==="function"){
     added=window.LizzyRewards.addSeed(id,1)===true;
   }
 }catch(e){added=false}
 if(!added){
   // Fallback: write straight to storage, then tell the Garden to reload
   // so the in-memory copy picks the new seed up immediately.
   const garden=read("lizzyGardenV1",null)||{};
   if(typeof garden!=="object"){if($("seedStoreStatus"))$("seedStoreStatus").textContent="Garden data wasn't found, so no purchase was made.";return}
   garden.seeds=garden.seeds||{};
   garden.seeds[id]=Number(garden.seeds[id]||0)+1;
   write("lizzyGardenV1",garden);
   window.dispatchEvent(new Event("lizzyGardenUpdated"));
 }
 setBalance(balance()-s.price);
 if($("seedStoreStatus"))$("seedStoreStatus").textContent=`🌱 Purchased ${s.name}! Check Lizzy's Garden.`;
 notify("🛍️ SEED STORE PURCHASE",`${s.emoji} ${s.name}`,`Quantity: 1\nPaid: ${s.price} MB\nRemaining balance: ${balance()} MB\nGarden inventory updated successfully.`,{item:`${s.emoji} ${s.name}`,cost:s.price,price:s.price,balance:balance()});
 window.dispatchEvent(new CustomEvent("lizzySeedStorePurchase",{detail:{seed:s.id,name:s.name,price:s.price}}));
 window.dispatchEvent(new Event("lizzyGardenUpdated"));
 render();
}
function openStore(){$("seedStoreWindow")?.classList.remove("hidden");render()}
function closeStore(){$("seedStoreWindow")?.classList.add("hidden")}
$("seedStoreIcon")?.addEventListener("click",openStore);
$("seedStoreClose")?.addEventListener("click",closeStore);
$("closeSeedStore")?.addEventListener("click",closeStore);
$("claimMickyAllowance")?.addEventListener("click",claimAllowance);
render();
})();


/* =========================================================
   STORE EXPANSION V2 — VERIFIED JOBS + BANK + EXTRAS
   IMPORTANT: this module NEVER initializes/overwrites:
   lizzyMickyBucsV1, lizzyMickyJobsV1, lizzyGardenV1,
   lizzyTokenJarV1, lizzyMysteryStreak.
   ========================================================= */
(() => {
"use strict";
const $=id=>document.getElementById(id);
const V2={
 bank:"lizzyMickyBankV1", stats:"lizzyMickyStatsV1",
 achievements:"lizzyMickyAchievementsV1", extras:"lizzyStoreExtrasV1",
 pending:"lizzyMickyPendingClaimsV1", proof:"lizzyMickyProofV1"
};
const WALLET="lizzyMickyBucsV1", JOBSKEY="lizzyMickyJobsV1";
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL || "https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const wallet=()=>Number(localStorage.getItem(WALLET)||0);
const setWallet=n=>localStorage.setItem(WALLET,String(Math.max(0,n)));
const dateKey=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
const uid=()=>`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;

function stat(name,amount=1){
 const s=read(V2.stats,{earned:0,spent:0,purchases:0,jobs:0});
 s[name]=Number(s[name]||0)+amount; write(V2.stats,s); checkAchievements();
}
function notify(type,title,details){
 if(typeof window.lizzyTelegramNotify==="function") return window.lizzyTelegramNotify(type,title,details);
 return Promise.resolve(false);
}

/* ORIGINAL MICKY JOBS VERIFICATION PRESERVED.
   The original completeJob() above remains the only task completion path. */

/* Store extras */
const EXTRAS=[
 {id:"mystery_pack",name:"🎁 Mystery Seed Pack",price:8,kind:"pack"},
 {id:"heart_pot",name:"💗 Heart Pot",price:6,kind:"decor"},
 {id:"gotham_pot",name:"🦇 Gotham Pot",price:8,kind:"decor"},
 {id:"moon_pot",name:"🌙 Moon Pot",price:10,kind:"decor"},
 {id:"fairy_lights",name:"✨ Fairy Lights",price:5,kind:"decor"},
 {id:"butterflies",name:"🦋 Garden Butterflies",price:6,kind:"decor"},
 {id:"falling_petals",name:"🌸 Falling Petals",price:8,kind:"effect"},
 {id:"name_plant",name:"🏷️ Name-a-Plant Pass",price:3,kind:"pass"},
 {id:"discount25",name:"🎟️ 25% Seed Coupon",price:5,kind:"coupon"}
];
const CLASSIFIED=[
 {id:"classified_moon",name:"🌙 Classified Moonflower Pack",price:12},
 {id:"classified_lily",name:"🤍 Lily Collector Pack",price:11},
 {id:"classified_pink",name:"💗 Pink Garden Pack",price:10},
 {id:"classified_agent",name:"🕵🏾 Agent Garden Pot",price:9}
];
function buyExtra(item){
 if(wallet()<item.price){alert("Not enough Micky Bucs 😭");return}
 setWallet(wallet()-item.price); stat("spent",item.price);stat("purchases",1);
 const x=read(V2.extras,{owned:{},coupons:[]});
 x.owned[item.id]=Number(x.owned[item.id]||0)+1;
 if(item.kind==="coupon")x.coupons.push({id:item.id,unused:true,bought:new Date().toISOString()});
 write(V2.extras,x);
 notify("🛍️ STORE EXTRA PURCHASE",item.name,`Paid: ${item.price} MB\nBalance: ${wallet()} MB`);
 renderExtras();renderBank();
}
function renderExtras(){
 const host=$("storeExtrasList");
 if(host)host.innerHTML=EXTRAS.map(x=>`<div class="seedShopCard"><h4>${x.name}</h4><div class="seedPrice">💵 ${x.price} MB</div><button data-extra="${x.id}">Buy</button></div>`).join("");
 host?.querySelectorAll("[data-extra]").forEach(b=>b.onclick=()=>buyExtra(EXTRAS.find(x=>x.id===b.dataset.extra)));
 const classified=$("classifiedItemCard"); if(classified)classified.innerHTML="";
 window.dispatchEvent(new Event("lizzyExtrasChanged"));
}

/* Bank */
function bank(){return read(V2.bank,{savings:0,qualifyingSince:null,lastBonus:null})}
function renderBank(){const b=bank();if($("bankWalletBalance"))$("bankWalletBalance").textContent=wallet();if($("bankSavingsBalance"))$("bankSavingsBalance").textContent=b.savings}
function bankMove(dir){
 const b=bank();
 if(dir==="deposit"){if(wallet()<5)return alert("You need 5 MB in your wallet.");setWallet(wallet()-5);b.savings+=5;if(b.savings>=15&&!b.qualifyingSince)b.qualifyingSince=Date.now()}
 else{if(b.savings<5)return alert("Not enough savings.");b.savings-=5;setWallet(wallet()+5);if(b.savings<15)b.qualifyingSince=null}
 write(V2.bank,b);renderBank();notify("🏦 BANK OF MICKY",dir==="deposit"?"Deposit":"Withdrawal",`5 MB\nWallet: ${wallet()} MB\nSavings: ${b.savings} MB`);
}
function claimBonus(){
 const b=bank(),week=7*24*60*60*1000;
 if(b.savings<15||!b.qualifyingSince||Date.now()-b.qualifyingSince<week)return alert("Keep at least 15 MB saved for 7 days first.");
 if(b.lastBonus&&Date.now()-b.lastBonus<week)return alert("Weekly bonus already claimed.");
 b.lastBonus=Date.now();write(V2.bank,b);setWallet(wallet()+5);stat("earned",5);renderBank();notify("🏦 SAVINGS BONUS","Weekly bonus claimed","+5 MB");
}

/* Achievements */
const ACH=[
 ["first_paycheck","First Paycheck","Complete your first verified job",s=>s.jobs>=1,2],
 ["employee_day","Employee of the Day","Complete 5 verified jobs",s=>s.jobs>=5,3],
 ["big_spender","Big Spender","Spend 25 MB",s=>s.spent>=25,3],
 ["financially_irresponsible","Financially Irresponsible 😂","Spend 50 MB",s=>s.spent>=50,5],
 ["garden_investor","Garden Investor","Make 10 store purchases",s=>s.purchases>=10,5],
 ["ceo","CEO of Micky Bucs","Have 100 MB in your wallet",s=>wallet()>=100,5]
];
function checkAchievements(){
 const s=read(V2.stats,{earned:0,spent:0,purchases:0,jobs:0}), a=read(V2.achievements,{});
 for(const [id,name,desc,test,bonus] of ACH){
   if(!a[id]&&test(s)){a[id]={at:new Date().toISOString(),bonus};setWallet(wallet()+bonus);notify("🏆 ACHIEVEMENT UNLOCKED",name,`${desc}\nBonus: +${bonus} MB`)}
 }
 write(V2.achievements,a);renderAchievements();
}
function renderAchievements(){
 const a=read(V2.achievements,{}),host=$("storeAchievementsList");if(!host)return;
 host.innerHTML=ACH.map(([id,n,d,,bonus])=>`<div class="achievementCard ${a[id]?"unlocked":""}"><strong>${a[id]?"🏆":"🔒"} ${n}</strong><p>${d}</p><small>${a[id]?`Unlocked • +${bonus} MB bonus`:`Reward: +${bonus} MB`}</small></div>`).join("");
}

/* Tabs + refresh */
document.querySelectorAll("[data-store-tab]").forEach(b=>b.addEventListener("click",()=>{
 ["storeExtrasPanel","mickyBankPanel","storeAchievementsPanel","secretShelfPanel"].forEach(id=>$(id)?.classList.add("hidden"));
 const map={extras:"storeExtrasPanel",bank:"mickyBankPanel",achievements:"storeAchievementsPanel",secret:"secretShelfPanel"};
 $(map[b.dataset.storeTab])?.classList.remove("hidden");
}));
document.querySelectorAll("[data-bank]").forEach(b=>b.onclick=()=>bankMove(b.dataset.bank));
$("claimSavingsBonus")?.addEventListener("click",claimBonus);
window.addEventListener("lizzyStoreRefresh",()=>{renderBank();checkAchievements()});
$("seedStoreIcon")?.addEventListener("click",()=>setTimeout(()=>{renderExtras();renderBank();checkAchievements()},30));

window.LizzyBankAPI={
  getState(){
    const b=bank();
    return {
      wallet:wallet(),
      savings:Number(b.savings||0),
      qualifyingSince:b.qualifyingSince||null,
      lastBonus:b.lastBonus||null
    };
  },
  deposit(){bankMove("deposit");return this.getState();},
  withdraw(){bankMove("withdraw");return this.getState();},
  claimBonus(){claimBonus();return this.getState();},
  refresh(){renderBank();return this.getState();}
};
window.dispatchEvent(new Event("lizzyBankReady"));
renderExtras();renderBank();renderAchievements();
})();


/* =========================================================
   SECRET SHELF V4 — persistent negotiation + classified routing
   ========================================================= */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const WALLET="lizzyMickyBucsV1",SHELF="lizzySecretShelfV1",LETTERS="lizzyPurchasedLettersV1",DOSSIERS="lizzyPurchasedDossiers",MTOKENS="lizzyMikaelTokensV1";
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const LETTER002=`Lizzy,

I think one of the funniest things about getting to know someone is that eventually you start remembering things you never actually tried to remember.

Just little things.

The things you like. The things that annoy you. The way you react to certain jokes. The things I know are going to earn me a look before I've even finished saying them.

Somehow I've collected a ridiculous amount of Lizzy information.

I know you love pink — apparently every possible shade of it.

I know pasta has a suspiciously strong position in your life.

I know there are approximately seventeen different versions of you depending on the situation.

There's Lizzy.
There's Mabebeza.
There's Agent Yelizaveta.
There's Little Miss Attitude — who, for legal reasons, I will not comment on further.

And then there's the version of you that laughs when you're trying very hard not to give me the satisfaction of knowing I made you laugh.

That's probably one of my favourites.

I also notice how much you enjoy crying.

At this point, I refuse to believe it is accidental. It appears to be one of your hobbies. 😂

I know you will try to tell me it's “cleansing,” a “detox,” an “emotional release,” or whatever propaganda you decide to give me that day.

LizzyOS Intelligence remains unconvinced.

As far as this investigation is concerned, you simply enjoy a good cry and have developed excellent PR around it.

But it's not really the big things I've enjoyed learning.

It's the random little details.

The things you mention once that somehow stay in my head.

The conversations that weren't supposed to be important but become things I remember anyway.

The jokes that go on for far longer than they should.

Even the arguments where I'm obviously right and you require a little extra time to realise it.

(Please don't close the letter.)

And somewhere along the way, all those little things started becoming part of this ridiculous world we've created.

That's probably what LizzyOS really is when you remove all the missions, Micky Bucs, classified documents, Reverse Tokens, Batman sightings and highly questionable financial institutions.

It's just a collection of little things I've remembered about you.

And apparently I cared enough about those little things to turn them into an entire operating system.

Which, now that I've written it down, sounds slightly insane.

Anyway.

There isn't some massive secret hidden at the end of this letter.

I just wanted you to know that I notice you.

Probably more than you realise.

And I really like the person I've been getting to know.

Even Little Miss Attitude.

Occasionally.

— Mikael
a.k.a. Mr Perfect 😌

P.S. If you paid an unreasonable amount of Micky Bucs for this letter, please direct all refund requests to the Bank of Micky.

They will be ignored.`;
const DOSSIER001=`LIZZYOS INTELLIGENCE DIVISION
CASE: #001-YEL — INITIAL SUBJECT ASSESSMENT
CLASSIFICATION: CONFIDENTIAL 🔴

SUBJECT: Lebone Elizabeth Kganyago
CODENAME: Agent Yelizaveta
KNOWN ALIASES: Lizzy, Little Miss Attitude, Mabebeza, Four Eyes
INVESTIGATING OFFICER: Agent Mikhail Petrov

PURPOSE OF FILE:
Establish an initial intelligence profile for the individual who somehow became important enough to require an entire operating system.

PRELIMINARY FINDINGS

01 — INTELLIGENCE
Subject is smart, opinionated and very capable of forming her own conclusions.
Operational downside: she frequently uses these abilities to disagree with Mikael.

02 — ATTITUDE
Levels fluctuate between reasonable and Little Miss Attitude.
Estimated attitude capacity: Extremely high.
Likelihood of admitting this assessment is accurate: Low.

03 — COMPETITIVE BEHAVIOUR
Subject has demonstrated suspicious confidence during competitive activities.
Bowling threat level: HIGH.
Mikael survival probability: Under review.

04 — PERSONAL INTERESTS
Pink appears to have achieved near-total control of the subject's colour preferences.
Pasta remains a strategically important food group.

05 — MIKAEL TOLERANCE
Despite repeated exposure to Mikael's jokes, unnecessary confidence, Batman behaviour and Mr Perfect propaganda, the subject continues to communicate with him.
Investigators consider this statistically unusual.

BEHAVIOURAL SUMMARY
Kindness: High
Intelligence: High
Attitude: Also high
Competitive instinct: Dangerous
Ability to make Mikael laugh: Confirmed
Ability to argue: Elite
Tolerance for nonsense: Higher than expected
Likelihood of becoming the subject of additional classified files: 100%

FINAL ASSESSMENT:
Agent Yelizaveta is officially classified as:
HIGH VALUE • HIGH ATTITUDE • REQUIRES CONTINUED OBSERVATION

CASE STATUS: OPEN 🔐

NOTE FROM INVESTIGATING OFFICER:
This was supposed to be one file.
That plan has already failed.`;
const DOSSIER002=`LIZZYOS INTELLIGENCE DIVISION
CASE: #002-H8R — THE HATER INVESTIGATION
CLASSIFICATION: TOP SECRET 🔴
SUBJECT: Agent Yelizaveta
ALIAS: Little Miss Attitude
INVESTIGATING OFFICER: Agent Mikhail Petrov

LizzyOS has detected an unusually high level of hater activity originating from Agent Yelizaveta. Following numerous suspicious comments, questionable opinions and completely unnecessary attacks on Mikael, a formal investigation was launched.

Subject has also openly expressed a general dislike of men. This raises an important question: How did Mikael somehow survive the selection process?

OFFICIAL CHARGES
01 — Unprovoked Mikael Slander. GUILTY.
02 — Excessive Attitude. VERY GUILTY.
03 — Being a Professional Hater. GUILTY WITH DISTINCTION. 🏆
04 — Refusing to Admit When Mikael Is Right. GUILTY.
05 — The Mr Perfect Incident. Evidence confirms that “Mr Perfect” originated from the subject herself. EXTREMELY GUILTY. 😌

BEHAVIOURAL ASSESSMENT
Hater Level: 98%
Attitude: 97%
Stubbornness: [SYSTEM OVERLOAD]
Ability to argue: Elite
Likelihood of admitting Mikael is right: 2%
Likelihood of arguing with this report: 100%

FINAL VERDICT: GUILTY ON ALL COUNTS.
SENTENCE: Continued association with Mikael. No possibility of parole. 😂

CASE STATUS: CLOSED*
*Subject will almost certainly provide enough evidence to reopen this investigation.*`;
const DOSSIER003=`LIZZYOS SPECIAL INVESTIGATIONS UNIT
CASE: #003-MP — OPERATION: MR PERFECT
CLASSIFICATION: ULTRA SECRET 🔴

Agent Yelizaveta referred to Mikhail as “MR PERFECT.” This was not a nickname created by Mikael. It came directly from Lizzy herself.

CENTRAL QUESTION:
Why would a woman with such a well-documented history of hating men willingly give one of them the title Mr Perfect?

THEORY #001 — Temporary Loss of Judgement
Probability: 8%.

THEORY #002 — Sarcasm
LizzyOS ruling: BORING. NEXT THEORY.

THEORY #003 — THE DANCE INCIDENT 🕺🏾
Intelligence reports indicate that Agent Mikhail possesses exceptional dancing abilities.
Technique: Incredible
Rhythm: Unmatched
Footwork: World class
Confidence: Possibly excessive
Effect on Agent Yelizaveta: Significant

Investigators believe there is a strong possibility that Mikael's amazing dance skills won her heart. Agent Yelizaveta's objection has already been rejected. 😂

THEORY #004 — She Secretly Thinks Mikael Is Amazing
Exhibit A: She called him Mr Perfect.
Exhibit B: She continues talking to him despite allegedly being a professional hater.
Exhibit C: The aforementioned dancing.
Exhibit D: [REDACTED]
Exhibit E: [REDACTED]
Exhibit F: Why are you still reading this file, Lizzy? 👀

MIKHAIL PETROV ASSESSMENT
Cheekiness: 96%
Confidence: 99%
Dancing: 100% 🕺🏾
Ability to annoy Lizzy: Elite
Actually Perfect: Under investigation
Believes he's perfect: Unfortunately, yes.

CRITICAL CONTRADICTION
FACT ONE: Lizzy hates men.
FACT TWO: Mikael is a man.
FACT THREE: Lizzy called Mikael Mr Perfect.

Leading theory: D — ALL OF THE ABOVE.

CASE STATUS: UNSOLVED 🔐
Denial will be recorded as additional evidence.`;
const CODY_LEGAL_DOCS=`LIZZYOS LEGAL DEPARTMENT
CONFIDENTIAL CASE FILE

CASE: CODY ALADEEN v. MIKAEL MULAUDZI
CLIENT: Cody Aladeen
LEGAL COUNSEL: Lizzy
STATUS: Counsel has been retained.

NOTICE TO MIKAEL:

This document serves as formal notice that Cody Aladeen is now represented by Lizzy in all present and future disputes involving alleged bullying, suspicious grappling, unnecessary wrestling attempts, intimidation, treat-related disagreements, or comments regarding Cody's grappling ability.

The client would like the record to show that his grappling skills have been assessed as DECENT.

Mikael may disagree with this assessment.
Mikael is strongly advised to keep those disagreements to himself.

SPECIAL PROVISIONS:
1. Mikael may not test new grappling techniques on Cody without prior approval from legal counsel.
2. Cody retains the right to defend himself using paws, speed, strategic retreat, dramatic staring, or immediate contact with his lawyer.
3. Any attempt by Mikael to claim that he could “probably take Cody” may be used against him in the Court of LizzyOS.
4. Cody is entitled to reasonable access to treats, naps, windows and legal representation.
5. Lizzy reserves the right to introduce additional charges whenever Mikael is being suspicious.

LEGAL RISK ASSESSMENT:
Cody's grappling: Decent.
Cody's legal team: Extremely dangerous.
Mikael's confidence before legal representation: High.
Mikael's confidence after discovering Lizzy is the lawyer: Significantly reduced.

FINAL NOTICE:
Mikael is reminded that fighting someone who can grapple you is one problem.

Fighting someone who can grapple you AND sue you is a completely different administrative situation.

Signed,
Lizzy
Legal Counsel for Cody Aladeen

Filed by: LizzyOS Legal Department
Mikael's objection: DENIED.`;
const LETTER003="Dear Lizzy,\n\nI’ve realised something slightly annoying.\n\nI notice a lot about you.\n\nYour facial expressions when I say something stupid. The way you try not to laugh because apparently admitting Mikael is funny would damage your reputation. How competitive you suddenly become the second there’s a winner and a loser.\n\nI notice your attitude — obviously. I notice when you’re excited, tired, when something is bothering you, and when you're pretending everything is fine.\n\nI notice your smile, your laugh, your glasses and obviously your beauty too. You are very pretty. Like… very pretty. But I’ll try not to mention that too much. Your head is already big enough.\n\nI also notice your “personality.”\n\nYou know…\n\nYour personality.\n\nVery noticeable. Great personality, actually.\n\nMoving on before this investigation becomes inappropriate. 😂\n\nSomehow I remember more of the random things you tell me than you probably realise — even your “crying is a detox” propaganda.\n\nApparently my brain has decided Lizzy information deserves an unreasonable amount of storage.\n\nVery inefficient.\n\nBut I suppose I’ll keep noticing.\n\nEspecially the little things. 💗\n\nMikael\na.k.a. Mr Perfect";
const LETTER004="Dear Lizzy,\n\nI have some unfortunate news.\n\nI’ve gotten used to you.\n\nUsed to talking to you, annoying you, hearing your stories, arguing about nonsense and trying to make you laugh.\n\nI've even gotten used to you doing absolutely everything in your power to ragebait me and generally be a menace to my peace.\n\nSometimes I genuinely believe you wake up and think: How can I irritate Mikael today?\n\nAnd apparently I've accepted this as part of my life now.\n\nSomething funny happens? I want to tell Lizzy. Something ridiculous happens? Lizzy needs to hear this.\n\nAnd then there's the constant bamboozling.\n\nEvery now and then I'll look at you and somehow forget that Four Eyes is actually ridiculously pretty. Beautiful. Stunning. Very, very easy on the eyes.\n\nAnd stuff.\n\nImportant that I add “and stuff” so this letter doesn't become too romantic. We have standards.\n\nSomehow you've become part of what feels normal. When we haven't spoken properly, I notice. When something's wrong with you, I care. And apparently when you're sick, I start writing letters.\n\nThis is getting completely out of hand.\n\nSo no, this is NOT Mikael admitting anything. All evidence is circumstantial. Mr Perfect maintains plausible deniability.\n\nBut unfortunately, Four Eyes…\n\nI've gotten pretty used to having you around.\n\nThe ragebaiting. The menace behaviour. The bamboozling. The beauty and stuff.\n\nAll of it.\n\nAnd I don't particularly want that to change. 💗\n\nMikael\na.k.a. Mr Perfect";
const O4E004="LIZZYOS INTELLIGENCE DIVISION\nCASE: O4E-004 — OPERATION FOUR EYES\nCLASSIFICATION: TOP SECRET 🔴\nSUBJECT: Lizzy\nALIASES: Four Eyes / Specsy / Agent Yelizaveta\n\nOBJECTIVES\n1. Determine how blind Four Eyes actually is.\n2. Determine whether spectacles increase Lizzy’s already concerning attitude.\n3. Determine whether the Four Eyes somehow make Lizzy even prettier.\n\nThe third objective was added reluctantly by the lead investigator.\n\nFINDINGS\nSubject operates with four theoretical eyes yet still demonstrates occasional selective blindness — particularly when Mikael is obviously correct.\n\nPossible causes:\nA) Spectacle malfunction\nB) Selective vision\nC) Hater behaviour\nD) Mikael being wrong\n\nOption D has been dismissed due to lack of credible evidence.\n\nSPECSY EFFECT\nMajor problem: the glasses actually appear to suit her. Potentially very well.\n\nLizzy + Spectacles = Specsy.\n\nWhether the Four Eyes make Lizzy even prettier remains under investigation. Early results are unfortunately concerning.\n\nATTITUDE TEST\nWithout glasses: HIGH\nWith glasses: HIGH but more professional-looking\nAgent Yelizaveta: NATIONAL SECURITY CONCERN\n\nFINAL ASSESSMENT\nIs Lizzy Four Eyes? YES.\nIs she actually blind? INCONCLUSIVE.\nDo the glasses suit her? REDACTED.\nDo they possibly make her prettier? EXTREMELY REDACTED.\n\nINVESTIGATOR’S PRIVATE NOTE:\nThey might.\n\nDelete this file.";
const MWA005="LIZZYOS INTELLIGENCE DIVISION\nFILE: MWA-005 — MIKAEL WEAKNESS ASSESSMENT\nCLASSIFICATION: ULTRA SECRET 🔴\nSUBJECT: Mikael\nALIASES: Micky / Mr Perfect / Batman\nAUTHORIZED ACCESS: Agent Yelizaveta\n\nWEAKNESS 01 — THE EYES 👀\nSEVERITY: CRITICAL\n\nResearch indicates prolonged eye contact with Lizzy may interfere with Mikael’s normal operating ability.\n\nCountermeasure tested:\nLOOK AT HER FOREHEAD INSTEAD.\n\nThis reduces exposure to the eyes.\n\nUnfortunately, Mikael rejected continued use.\n\nOfficial statement:\n“I prefer the risk.”\n\nWEAKNESS 02 — THE GIGGLE\nSEVERITY: HIGH\n\nResearch suggests Lizzy’s particular giggle causes Mikael to experience some sort of unidentified feeling.\n\nPossible symptoms: smiling, losing his train of thought and wanting to make her giggle again.\n\nIf questioned, Mikael is expected to deny these findings.\n\nWEAKNESS 03 — THE SMILE\nKnown to reduce sarcasm efficiency and occasionally compromise Mr Perfect protocols.\n\nWEAKNESS 04 — LIZZY BEING SWEET\nParticularly dangerous when unexpected.\n\nWEAKNESS 05 — WORRYING ABOUT LIZZY\nWhen something is genuinely wrong with Lizzy, normal joking protocols appear to shut down.\nEXPLOITABILITY: STRICTLY PROHIBITED.\n\nFINAL ASSESSMENT\nDespite repeated claims of perfection, Mikael possesses several vulnerabilities.\n\nUnfortunately, Agent Yelizaveta appears to have accidentally discovered most of them.\n\nMIKAEL’S OFFICIAL RESPONSE:\n“This dossier is fake. I have no weaknesses. And stop asking about the giggle.”";
const AYPP006="LIZZYOS INTELLIGENCE DIVISION\nFILE: AYPP-006 — AGENT YELIZAVETA PSYCHOLOGICAL PROFILE\nCLASSIFICATION: TOP SECRET // EYES ONLY\nSUBJECT: Agent Yelizaveta\nALIASES: Lizzy / Little Miss Attitude / Four Eyes / Specsy\nTHREAT LEVEL: 💗 PINK — ELEVATED\n\nINTELLIGENCE — HIGH\nQuick to notice inconsistencies and dangerously capable of questioning Mikael propaganda.\n\nCOMPETITIVENESS — EXTREME\nCan turn almost anything into a competition. Losing may result in allegations, investigations or an immediate rematch.\n\nATTITUDE — CRITICAL\nBaseline levels are already high. When Mikael is deliberately annoying, readings become difficult to measure.\n\nKINDNESS — SUSPICIOUSLY HIGH\nDespite extensive hater evidence, Subject is actually extremely kind.\n\nKNOWN TACTICS\nTHE LOOK — communicates an entire complaint without speaking.\nTHE LAUGH/GIGGLE — may compromise Mikael. See MWA-005.\nFOUR EYES MODE — somehow increases professionalism while maintaining attitude.\nTHE SIDE-EYE — commonly deployed after Mikael says something she considers stupid.\n\nEMOTIONAL ACTIVITY\nSubject occasionally cries and insists this is “cleansing” or “detoxing.”\nMikael maintains this is an extremely successful PR campaign for crying.\n\nCODY AFFILIATION\nSubject currently acts as Cody’s lawyer. Any Cody dispute is high risk for Mikael.\n\nMIKAEL RELATIONSHIP ASSESSMENT\nSubject regularly argues with, judges, ragebaits and annoys Mikael.\nShe also continues voluntarily spending time with him.\nAnalysts find this suspicious.\n\nFINAL ASSESSMENT\nSmart. Funny. Kind. Stubborn. Competitive. Beautiful. Significant attitude problem.\n\nAnd apparently more important to Mikael than this report was originally supposed to reveal.\n\nSTATUS: 💗 HIGH-VALUE ASSET\n\nMIKAEL’S NOTE:\n“I approved most of this report. Not the parts that make me look vulnerable. Those are propaganda.”";
const ITEMS=[
{id:"letter_002",icon:"💌",publicName:"Unreleased Letter #002",kind:"letter",content:LETTER002,teaser:"An unreleased letter. Contents unavailable before purchase."},
{id:"mystery_reward",icon:"🎁",publicName:"Mystery Reward",kind:"mikael_token",teaser:"Contents remain classified until the deal is complete."},
{id:"archive_x17",icon:"🗃️",publicName:"Sealed Archive X-17",kind:"document",content:CODY_LEGAL_DOCS,teaser:"Origin: REDACTED • Contents: SEALED • Clearance: UNKNOWN"},
{id:"dossier_001",icon:"📁",publicName:"Classified File #001",kind:"dossier",title:"Classified File #001 — Initial Subject Assessment",content:DOSSIER001,teaser:"SUBJECT DATA: REDACTED • CASE: #001"},
{id:"hater_file",icon:"📁",publicName:"Classified File #002",kind:"dossier",title:"Classified File #002 — The Hater Investigation",content:DOSSIER002,teaser:"CASE: #002-H8R • CONTENTS: CLASSIFIED"},
{id:"mrperfect_file",icon:"📁",publicName:"Classified File #003",kind:"dossier",title:"Classified File #003 — Operation: Mr Perfect",content:DOSSIER003,teaser:"CASE: #003-MP • ULTRA SECRET"},
{id:"letter_003",icon:"💌",publicName:"Unreleased Letter #003",kind:"letter",content:LETTER003,teaser:"An unreleased letter. Contents unavailable before purchase."},
{id:"letter_004",icon:"💌",publicName:"Unreleased Letter #004",kind:"letter",content:LETTER004,teaser:"An unreleased letter. Contents unavailable before purchase."},
{id:"o4e_004",icon:"👓",publicName:"Classified File #004",kind:"dossier",title:"O4E-004 — Operation Four Eyes",content:O4E004,teaser:"CASE: O4E-004 • SUBJECT DATA: REDACTED"},
{id:"mwa_005",icon:"🎯",publicName:"Classified File #005",kind:"dossier",title:"MWA-005 — Mikael Weakness Assessment",content:MWA005,teaser:"FILE: MWA-005 • VULNERABILITIES: CLASSIFIED"},
{id:"aypp_006",icon:"🔐",publicName:"Classified File #006",kind:"dossier",title:"AYPP-006 — Agent Yelizaveta Psychological Profile",content:AYPP006,encrypted:true,teaser:"FILE: AYPP-006 • ENCRYPTED • CLEARANCE REQUIRED"}
];
const SHELF_PRICES=[32,23];
const VAULT_PRICE=32;
function priceOf(i){const n=ITEMS.findIndex(x=>x.id===(i&&i.id?i.id:i));return SHELF_PRICES[(n<0?0:n)%SHELF_PRICES.length]}
const wallet=()=>Number(localStorage.getItem(WALLET)||0),setWallet=n=>localStorage.setItem(WALLET,String(Math.max(0,Math.floor(Number(n)||0))));
const REWARD_PERKS="lizzyRewardPerksV1";
function rewardPerks(){const p=read(REWARD_PERKS,{vaultFree:0,vaultDiscount:0});p.vaultFree=Math.max(0,Number(p.vaultFree||0));return p}
function saveRewardPerks(p){write(REWARD_PERKS,p)}
function freeVaultCredits(){return rewardPerks().vaultFree}

const shelf=()=>{const s=read(SHELF,{owned:{},bids:{}});s.owned=s.owned||{};s.bids=s.bids||{};return s},saveShelf=s=>write(SHELF,s);
function addDossier(i,price=0){let l=read(DOSSIERS,[]);if(!Array.isArray(l))l=[];if(!l.some(x=>x.id===i.id)){l.push({id:i.id,title:i.title,content:i.content,encrypted:!!i.encrypted,price,acquiredAt:new Date().toISOString()});write(DOSSIERS,l)}window.dispatchEvent(new Event("lizzyClassifiedUpdated"))}
function migrate(){const s=shelf();if(s.owned.archive_x17){const c=ITEMS.find(x=>x.id==="archive_x17");addDossier({id:"archive_x17",title:"Cody Legal Documents",content:c.content},s.owned.archive_x17.price||0)}if(s.owned.hater_file)addDossier(ITEMS.find(x=>x.id==="hater_file"),s.owned.hater_file.price||0);if(s.owned.vault||s.owned.mrperfect_file)addDossier(ITEMS.find(x=>x.id==="mrperfect_file"),s.owned.vault?.price||s.owned.mrperfect_file?.price||0);const old=read("lizzyVaultRewardsV1",[]);if(Array.isArray(old)&&old.some(x=>x.id==="mrperfect_file"||String(x.title||"").includes("#003")))addDossier(ITEMS.find(x=>x.id==="mrperfect_file"),0);let l=read(LETTERS,[]);if(Array.isArray(l)){const f=l.filter(x=>!(x.id==="letter_002"&&String(x.content||"").includes("I like us.")));if(f.length!==l.length)write(LETTERS,f)}}
function st(b,o){return o?"OWNED 🔓":"AVAILABLE"}
function repairPurchasedDestinations(){const s=shelf();if(s.owned.archive_x17){const c=ITEMS.find(x=>x.id==="archive_x17");if(c)addDossier({id:"archive_x17",title:"Cody Legal Documents",content:c.content},s.owned.archive_x17.price||0)}for(const id of ["dossier_001","hater_file","mrperfect_file","o4e_004","mwa_005","aypp_006"]){if(s.owned[id]){const i=ITEMS.find(x=>x.id===id);if(i)addDossier(i,s.owned[id].price||0)}}}

const VAULT_STATE="lizzyVaultStateV3";
const VAULT_TOKEN="lizzyVaultTokenV1";
const VAULT_PRIZES=[
 {r:"common",icon:"💰",name:"+10 Micky Bucs",type:"money",value:10},
 {r:"common",icon:"💰",name:"+15 Micky Bucs",type:"money",value:15},
 {r:"common",icon:"🌱",name:"Seed Pack",type:"seed"},
 {r:"common",icon:"🪙",name:"Second Chance",type:"second_chance"},
 {r:"rare",icon:"💰",name:"+25 Micky Bucs",type:"money",value:25},
 {r:"rare",icon:"🎧",name:"Song Exchange",type:"token",token:"Song Exchange"},
 {r:"rare",icon:"🎤",name:"Voice Note Request",type:"token",token:"Voice Note Request"},
 {r:"rare",icon:"🃏",name:"Truth Card",type:"token",token:"Truth Card"},
 {r:"epic",icon:"📞",name:"Question Call",type:"token",token:"Question Call"},
 {r:"epic",icon:"💸",name:"Bank Heist",type:"money_random",min:30,max:60},
 {r:"legendary",icon:"💰",name:"Vault Jackpot",type:"money",value:75},
 {r:"legendary",icon:"🃏",name:"Mikael's Wild Card",type:"token",token:"Mikael's Wild Card"},
 {r:"legendary",icon:"👑",name:"The Queen's Cut",type:"money",value:50}
];
function vaultState(){return read(VAULT_STATE,{opens:0,lastPrize:null,lastRarity:null})}
function saveVaultState(v){write(VAULT_STATE,v)}
function vaultTokenCount(){return Number(freeVaultCredits?.()||0)+Number(localStorage.getItem(VAULT_TOKEN)||0)}
function consumeVaultToken(){
 const p=rewardPerks();
 if(Number(p.vaultFree||0)>0){p.vaultFree--;saveRewardPerks(p);return true}
 const n=Number(localStorage.getItem(VAULT_TOKEN)||0);
 if(n>0){localStorage.setItem(VAULT_TOKEN,String(n-1));return true}
 return false
}
function vaultPick(){
 const roll=Math.random()*100;
 const r=roll<45?"common":roll<75?"rare":roll<92?"epic":"legendary";
 const pool=VAULT_PRIZES.filter(x=>x.r===r);
 return pool[Math.floor(Math.random()*pool.length)];
}
function vaultPrizeGrant(prize,source){
 let detail=prize.name;
 if(prize.type==="money"||prize.type==="money_random"){
  const amount=prize.type==="money"?prize.value:(prize.min+Math.floor(Math.random()*(prize.max-prize.min+1)));
  setWallet(Number(wallet())+amount);detail=`${prize.name} → +${amount} MB`;
 }else if(prize.type==="second_chance"){
  const t=read("lizzyTokenJarV1",{inventory:{},history:[],rerollCredits:0});t.rerollCredits=Number(t.rerollCredits||0)+1;write("lizzyTokenJarV1",t);
 }else if(prize.type==="token"){
  const t=read("lizzyTokenJarV1",{inventory:{},history:[],rerollCredits:0});t.inventory=t.inventory||{};t.inventory[prize.token]=Number(t.inventory[prize.token]||0)+1;write("lizzyTokenJarV1",t);
 }else if(prize.type==="seed"){
  const g=read("lizzyGardenV1",{seeds:{},flowers:{}});g.seeds=g.seeds||{};g.seeds.vault_seed=Number(g.seeds.vault_seed||0)+1;write("lizzyGardenV1",g);
 }
 const v=vaultState();v.opens++;v.lastPrize=detail;v.lastRarity=prize.r;v.lastSource=source;saveVaultState(v);
 try{fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"vault_prize_won",source,rarity:prize.r,prize:detail})}).catch(()=>{})}catch(e){}
 return detail
}
async function showVaultResult(prize,source,acceptedBid=0){
 const h=$("vaultResult");
 if(!h)return;
 if(acceptedBid>0){
  if(wallet()<acceptedBid){h.innerHTML=`<div class="vaultResultGlow"><h3>⚠️ Vault bid could not be charged</h3><p>Your accepted bid was ${acceptedBid} MB, but the current wallet balance is too low.</p></div>`;return}
  setWallet(Math.max(0,wallet()-acceptedBid));
 }
 h.innerHTML=`<div class="vaultOpening" aria-live="polite"><div class="vaultLock">🔐</div><small>SECRET SHELF // VAULT ACCESS</small><h3>OPENING VAULT...</h3><div class="vaultSpinner"></div><p>Decrypting reward chamber…</p></div>`;
 h.classList.remove("vaultRevealActive");h.classList.add("vaultOpeningActive");
 await new Promise(r=>setTimeout(r,2200));
 const detail=vaultPrizeGrant(prize,source);
 h.classList.remove("vaultOpeningActive");h.classList.add("vaultRevealActive");
 h.innerHTML=`<div class="vaultResultGlow vaultPrizeReveal"><div class="vaultBurst">✦</div><div class="vaultPrizeIcon">${prize.icon}</div><small>${prize.r.toUpperCase()} VAULT REWARD</small><h3>${esc(prize.name)}</h3><p>${esc(detail)}</p>${acceptedBid>0?`<p class="vaultBidCharged">💸 ${acceptedBid} MB bid charged</p>`:""}<p>🎉 The Vault has released your reward.</p></div>`;
 renderShelf()
}
function openVault(source="token"){
 if(source==="token"&&!consumeVaultToken()){alert("You don't have a Free Vault Token.");renderShelf();return}
 showVaultResult(vaultPick(),source)
}
function vaultBidAccepted(acceptedBid=0){showVaultResult(vaultPick(),"accepted_bid",Number(acceptedBid)||0)}
function vaultStatusText(){const t=vaultTokenCount(),v=vaultState();return `${t>0?`🎟️ FREE VAULT TOKEN ×${t}`:"No Free Vault Tokens"}${v.lastPrize?` · Last prize: ${v.lastPrize}`:""}`}
function renderShelf(){
 const h=$("secretShelfPanel");if(!h)return;
 const sh=shelf(),t=vaultTokenCount();
 h.innerHTML=`<div class="secretVaultHeader"><div><small>SECRET SHELF // RESTRICTED MARKET</small><h3>🔒 Mikael's Secret Shelf</h3></div><div class="vaultWallet">AVAILABLE: <b>${wallet()} MB</b><br><span class="vaultFreeCredit">${vaultStatusText()}</span></div></div>
 <section class="vaultFeature"><div class="vaultFeatureTop"><div><small>RESTRICTED FEATURE</small><h3>🎰 THE VAULT</h3></div><span class="vaultBadge">RANDOM PRIZES</span></div>
 <p>Vault access is now a fixed price of <b>${VAULT_PRICE} MB</b>, or free with a Free Vault Token. Every opening gives <b>one random prize</b>.</p>
 <div class="vaultPrizePreview"><span>🟢 Common</span><span>🔵 Rare</span><span>🟣 Epic</span><span>🟡 Legendary</span></div>
 ${t>0?`<button id="openFreeVaultBtn" class="vaultOpenBtn">🎟️ OPEN VAULT WITH FREE TOKEN</button>`:`<small>No Free Vault Token available.</small>`}
 <div id="vaultResult"></div></section>
 <div class="vaultBidBox"><button id="vaultBuyBtn">🎰 OPEN THE VAULT — ${VAULT_PRICE} MB</button><small id="vaultBidStatus">Fixed price: ${VAULT_PRICE} MB. No bidding, no waiting.</small></div>
 <div class="secretShelfGrid">${(()=>{const avail=ITEMS.filter(x=>!sh.owned[x.id]);if(!avail.length)return `<p class="seedStoreIntro">🗃️ Every Secret Shelf item has been purchased. Purchased items now live in Open When → Purchased Letters, Classified Dossiers and the Token Jar.</p>`;return avail.map(i=>{const p=priceOf(i),afford=wallet()>=p,free=freeVaultCredits()>0;return `<article class="secretItem vaultItem"><div class="vaultItemIcon">${i.icon}</div><strong>${i.publicName}</strong><p>${i.teaser}</p><small class="vaultStatus">PRICE: ${p} MB</small><div class="vaultBidControls"><button data-buy-shelf="${i.id}" ${afford?"":"disabled"}>${afford?`BUY FOR ${p} MB`:`NEED ${p} MB`}</button>${free?`<button data-free-claim="${i.id}">🎟️ USE FREE CREDIT</button>`:""}</div></article>`}).join("")})()}</div>`;
 h.querySelector("#openFreeVaultBtn")?.addEventListener("click",()=>openVault("token"));
 h.querySelector("#vaultBuyBtn")?.addEventListener("click",buyVaultOpen);
 h.querySelectorAll("[data-buy-shelf]").forEach(x=>x.addEventListener("click",()=>buyShelfItem(x.dataset.buyShelf)));
 h.querySelectorAll("[data-free-claim]").forEach(x=>x.addEventListener("click",()=>claimFreeVaultItem(x.dataset.freeClaim)));
}
function openDoc(id){const i=ITEMS.find(x=>x.id===id),s=shelf(),h=$("vaultOwnedFileReader");if(!i||!s.owned[id]||!h)return;const safe=i.content.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));h.innerHTML=`<section class="vaultDocumentReader"><button id="closeVaultDocument">×</button><small>ACQUIRED SECRET SHELF DOCUMENT // CONFIDENTIAL</small><h3>⚖️ Cody Legal Documents</h3><pre>${safe}</pre></section>`;$("closeVaultDocument")?.addEventListener("click",()=>h.innerHTML="");h.scrollIntoView({behavior:"smooth",block:"nearest"})}
function claimFreeVaultItem(id){
 const i=ITEMS.find(x=>x.id===id),sh=shelf(),perks=rewardPerks();
 if(!i||sh.owned[id])return;
 if(Number(perks.vaultFree||0)<=0){alert("No Free Vault Item credits available.");renderShelf();return}
 const ok=confirm(`Use 1 Free Vault Item token on ${i.publicName}?\n\nCost: 0 Micky Bucs\nThis will consume one free Vault credit.`);
 if(!ok)return;
 if(!grant(i,0,true)){alert("The free claim could not be completed.");return}
 perks.vaultFree=Math.max(0,Number(perks.vaultFree||0)-1);saveRewardPerks(perks);
 window.dispatchEvent(new CustomEvent("lizzyFreeVaultItemClaimed",{detail:{itemId:i.id,item:i.publicName,remaining:perks.vaultFree}}));
 try{fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"free_vault_item_claimed",item:i.id,itemName:i.publicName,remaining:perks.vaultFree})}).catch(()=>{})}catch(e){}
 renderShelf();
 alert(`🔓 ${i.publicName} claimed for FREE.\n\nRemaining Free Vault Item credits: ${perks.vaultFree}`);
}

function shelfNotifyPurchase(i,paid,balanceAfter){
 try{fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"secret_shelf_purchase",item:i.publicName,itemId:i.id,kind:i.kind||"item",paid,price:paid,cost:paid,balance:balanceAfter,details:`Paid: ${paid} MB\nRemaining balance: ${balanceAfter} MB`})}).catch(()=>{})}catch(e){}
}
function buyShelfItem(id){
 const i=ITEMS.find(x=>x.id===id);if(!i)return;
 const s=shelf();if(s.owned[id]){renderShelf();return}
 const price=priceOf(i),before=wallet();
 if(before<price)return alert(`${i.publicName} costs ${price} MB.\n\nYour balance: ${before} MB.`);
 if(!confirm(`Buy ${i.publicName} for ${price} MB?\n\nBalance after purchase: ${before-price} MB`))return;
 if(!grant(i,price))return alert("The purchase could not be completed.");
 const after=wallet(),paid=Math.max(0,before-after);
 shelfNotifyPurchase(i,paid,after);
 window.dispatchEvent(new CustomEvent("lizzySecretPurchaseGranted",{detail:{itemId:i.id,kind:i.kind}}));
 repairPurchasedDestinations();renderShelf();renderLetters();renderMikaelTokens();
 alert(`✅ ${i.publicName} purchased.\n\nPaid: ${paid} MB\nRemaining balance: ${after} MB`);
}
function buyVaultOpen(){
 const before=wallet();
 if(before<VAULT_PRICE)return alert(`Opening the Vault costs ${VAULT_PRICE} MB.\n\nYour balance: ${before} MB.`);
 if(!confirm(`Open the Vault for ${VAULT_PRICE} MB?\n\nBalance after: ${before-VAULT_PRICE} MB`))return;
 try{fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"secret_shelf_purchase",item:"The Vault — one opening",itemId:"vault",kind:"vault",paid:VAULT_PRICE,price:VAULT_PRICE,cost:VAULT_PRICE,balance:before-VAULT_PRICE,details:`Paid: ${VAULT_PRICE} MB\nRemaining balance: ${before-VAULT_PRICE} MB`})}).catch(()=>{})}catch(e){}
 showVaultResult(vaultPick(),"purchase",VAULT_PRICE);
}
function grant(i,price,serverAccepted=false){const s=shelf();if(s.owned[i.id])return true;price=Math.max(0,Math.floor(Number(price)||0));const vd=Number(localStorage.getItem("lizzyVipShelfDiscount")||0),rd=Number(localStorage.getItem("lizzyRareShelfDiscount")||0),discount=Math.max(vd,rd),originalPrice=price;if(discount>0&&price>0){price=Math.max(1,Math.ceil(price*(100-discount)/100));localStorage.removeItem("lizzyVipShelfDiscount");localStorage.removeItem("lizzyRareShelfDiscount")}if(!serverAccepted&&(price<1||wallet()<price))return false;if(price>0)setWallet(Math.max(0,wallet()-price));s.owned[i.id]={at:new Date().toISOString(),price,originalPrice,discount};saveShelf(s);if(i.kind==="letter"){let l=read(LETTERS,[]);if(!Array.isArray(l))l=[];const entry={id:i.id,title:i.publicName,content:i.content,folder:"open_when_purchased",purchasedAt:new Date().toISOString()};const at=l.findIndex(x=>x.id===i.id);if(at>=0)l[at]={...l[at],...entry};else l.push(entry);write(LETTERS,l);renderLetters();window.dispatchEvent(new Event("lizzyPurchasedLettersUpdated"))}if(i.kind==="dossier")addDossier(i,price);if(i.kind==="document"&&i.id==="archive_x17"){addDossier({id:"archive_x17",title:"Cody Legal Documents",content:i.content},price)}if(i.kind==="mikael_token"){const t=read(MTOKENS,{inventory:{},history:[]});t.inventory=t.inventory||{};t.history=t.history||[];t.inventory["UNO Reverse"]=Number(t.inventory["UNO Reverse"]||0)+1;t.history.push({type:"earned",token:"UNO Reverse",source:"Mystery Reward",at:new Date().toISOString()});write(MTOKENS,t);renderMikaelTokens()}window.dispatchEvent(new Event("lizzyStoreRefresh"));return true}
async function sync(){return}
async function pollVault(){return}
async function poll(){repairPurchasedDestinations();renderShelf();renderLetters();renderMikaelTokens()}
async function notifyPurchasedLetterOpened(letter){
 try{
  await fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
   type:"secret_shelf_letter_opened",
   letterId:String(letter?.id||""),
   title:String(letter?.title||"Purchased Letter"),
   openedAt:new Date().toISOString()
  })});
 }catch(e){console.warn("Letter-open notification failed",e)}
}
function renderLetters(){const w=$("openWhenWindow")||$("openWhenFolderWindow");if(!w)return;const host=w.querySelector(".windowScroll")||w;let b=$("purchasedLettersBox");if(!b){b=document.createElement("section");b.id="purchasedLettersBox";host.appendChild(b)}const l=read(LETTERS,[]);b.innerHTML=Array.isArray(l)&&l.length?`<h3>🛍️ Purchased Letters</h3>${l.map((x,i)=>`<article class="purchasedLetter"><div class="purchasedLetterHead"><strong>💌 ${x.title}</strong><button type="button" data-purchased-letter-open="${i}">OPEN LETTER</button></div><div class="purchasedLetterBody hidden" data-purchased-letter-body="${i}"><pre>${x.content}</pre></div></article>`).join("")}`:"";b.querySelectorAll("[data-purchased-letter-open]").forEach(btn=>btn.addEventListener("click",()=>{const i=Number(btn.dataset.purchasedLetterOpen),letter=l[i],body=b.querySelector(`[data-purchased-letter-body="${i}"]`);if(!letter||!body)return;const opening=body.classList.contains("hidden");body.classList.toggle("hidden");btn.textContent=opening?"CLOSE LETTER":"OPEN LETTER";if(opening)notifyPurchasedLetterOpened(letter)}))}
function renderMikaelTokens(){const w=$("tokenJarWindow");if(!w)return;const host=w.querySelector(".windowScroll")||w;let b=$("mikaelTokensBox");if(!b){b=document.createElement("section");b.id="mikaelTokensBox";host.appendChild(b)}const t=read(MTOKENS,{inventory:{}}),n=Number(t.inventory?.["UNO Reverse"]||0);b.innerHTML=n?`<h3>🕴️ Mikael's Tokens</h3><div class="tokenCard"><div class="tokenCardEmoji">🔄</div><div><strong>UNO Reverse</strong><p>Mikael has the power: one playful, reasonable request for Lizzy.</p></div><div class="tokenCount">×${n}</div></div>`:""}
migrate();repairPurchasedDestinations();$("seedStoreIcon")?.addEventListener("click",()=>setTimeout(()=>{renderShelf();poll()},60));document.querySelector('[data-store-tab="secret"]')?.addEventListener("click",()=>setTimeout(poll,30));$("openWhenIcon")?.addEventListener("click",()=>setTimeout(renderLetters,60));window.addEventListener("lizzyPurchasedLettersUpdated",renderLetters);window.addEventListener("lizzySecretPurchaseGranted",e=>{if(e.detail?.kind==="letter")renderLetters()});$("tokenJarIcon")?.addEventListener("click",()=>setTimeout(renderMikaelTokens,60));window.addEventListener("focus",()=>{if(!$("secretShelfPanel")?.classList.contains("hidden"))poll()});document.addEventListener("visibilitychange",()=>{if(!document.hidden)poll()});window.addEventListener("focus",()=>poll());renderShelf();pollVault();renderLetters();renderMikaelTokens();setTimeout(poll,500);
})();


/* =========================================================
   PURCHASED EXTRAS — REAL WEBSITE FINAL
   ========================================================= */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const EXTRA="lizzyStoreExtrasV1", NAMES="lizzyCustomPlantNamesV1";
const LABELS={mystery_pack:"🎁 Mystery Seed Pack",heart_pot:"💗 Heart Pot",gotham_pot:"🦇 Gotham Pot",moon_pot:"🌙 Moon Pot",fairy_lights:"✨ Fairy Lights",butterflies:"🦋 Garden Butterflies",falling_petals:"🌸 Falling Petals",name_plant:"🏷️ Name-a-Plant Pass",discount25:"🎟️ 25% Seed Coupon"};

function renderMyExtras(){
 const panel=$("storeExtrasPanel");if(!panel)return;
 let box=$("purchasedExtrasBox");
 if(!box){box=document.createElement("section");box.id="purchasedExtrasBox";box.className="purchasedExtrasBox";panel.appendChild(box);}
 const x=read(EXTRA,{owned:{},coupons:[]}),rows=Object.entries(x.owned||{}).filter(([,n])=>Number(n)>0);
 box.innerHTML=`<h3>🎒 My Extras</h3>${rows.length?rows.map(([id,n])=>`<div class="ownedExtraRow"><span><strong>${LABELS[id]||id}</strong> ×${n}</span>${id==="name_plant"?'<button id="useNamePlantPass">Use Pass</button>':""}</div>`).join(""):'<p class="seedStoreIntro">Purchased extras will appear here.</p>'}`;
 $("useNamePlantPass")?.addEventListener("click",useNamePass);
}

function useNamePass(){
 const x=read(EXTRA,{owned:{},coupons:[]});
 if(Number(x.owned?.name_plant||0)<1)return alert("No Name-a-Plant Pass available.");
 const g=read("lizzyGardenV1",null);
 if(!g?.plants?.length)return alert("Plant something in the Garden first 🌱");
 const names=read(NAMES,{});
 const choices=g.plants.map((p,i)=>`${i+1}. ${names[p.id]||p.flowerId||"Plant"}`).join("\n");
 const num=Number(prompt(`Choose a plant to name:\n\n${choices}\n\nEnter the number:`));
 if(!Number.isInteger(num)||num<1||num>g.plants.length)return;
 const p=g.plants[num-1],name=(prompt("What should this plant be called?")||"").trim();
 if(!name)return;
 names[p.id]=name;write(NAMES,names);
 x.owned.name_plant=Math.max(0,Number(x.owned.name_plant)-1);write(EXTRA,x);
 applyNames();renderMyExtras();
 window.lizzyTelegramNotify?.("🏷️ NAME-A-PLANT PASS USED",name,"Lizzy named a plant in her Garden.");
}

function applyNames(){
 const names=read(NAMES,{});
 document.querySelectorAll(".gardenPlot[data-plant]").forEach(plot=>{
   const name=names[plot.dataset.plant];if(!name)return;
   const title=plot.querySelector(".plantMeta strong");if(title)title.textContent=name;
 });
}

function deliverAndDecorate(){
 const x=read(EXTRA,{owned:{},coupons:[]}),o=x.owned||{},g=read("lizzyGardenV1",null),ledger=read("lizzyExtrasDeliveryLedgerV2",{});
 if(g&&typeof g==="object"){
   g.seeds=g.seeds||{};
   while(Number(ledger.mystery_pack||0)<Number(o.mystery_pack||0)){
     const pool=["tulipSeed","roseSeed","jacarandaSeed","sunflowerSeed","lilySeed"];
     const id=pool[Math.floor(Math.random()*pool.length)];
     g.seeds[id]=Number(g.seeds[id]||0)+1;
     ledger.mystery_pack=Number(ledger.mystery_pack||0)+1;
   }
   write("lizzyGardenV1",g);write("lizzyExtrasDeliveryLedgerV2",ledger);
 }
 const root=$("gardenWindow")||document.querySelector(".gardenWindow");if(root){
   let fx=$("lizzyRealExtrasFx");if(!fx){fx=document.createElement("div");fx.id="lizzyRealExtrasFx";fx.className="lizzyRealExtrasFx";root.appendChild(fx);}
   fx.innerHTML="";
   if(o.fairy_lights)fx.innerHTML+=`<div class="realFairyLights"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
   if(o.butterflies)fx.innerHTML+=`<span class="realButterfly rb1">🦋</span><span class="realButterfly rb2">🦋</span>`;
   if(o.falling_petals)fx.innerHTML+=`<span class="realPetal rp1">🌸</span><span class="realPetal rp2">🌸</span><span class="realPetal rp3">🌸</span>`;
   const pot=o.heart_pot?"heart":o.gotham_pot?"gotham":o.moon_pot?"moon":null;
   document.querySelectorAll(".gardenPlot .plantVisual").forEach(v=>{
     v.querySelector(".realCustomPot")?.remove();
     if(pot)v.insertAdjacentHTML("beforeend",`<span class="realCustomPot ${pot}">${pot==="heart"?"♥":pot==="gotham"?"🦇":"🌙"}</span>`);
   });
 }
 applyNames();renderMyExtras();
}

let obs;
function watchGarden(){
 const host=$("gardenPlots");if(!host)return;
 obs?.disconnect();obs=new MutationObserver(()=>setTimeout(()=>{applyNames();deliverAndDecorate()},30));
 obs.observe(host,{childList:true,subtree:true});
}

setTimeout(()=>{renderMyExtras();deliverAndDecorate();watchGarden()},500);
$("seedStoreIcon")?.addEventListener("click",()=>setTimeout(renderMyExtras,80));
$("gardenIcon")?.addEventListener("click",()=>setTimeout(()=>{deliverAndDecorate();watchGarden()},100));
window.addEventListener("lizzyStoreRefresh",()=>setTimeout(()=>{renderMyExtras();deliverAndDecorate()},60));
window.addEventListener("lizzyExtrasChanged",()=>setTimeout(()=>{renderMyExtras();deliverAndDecorate()},60));
})();




/* =========================================================
   SECRET SHELF DELIVERY GUARANTEE V2
   Letter #001 -> Open When / Purchased Letters
   Mystery Reward -> Token Jar / Mikael's Tokens / UNO Reverse
   Idempotent: never duplicates an already-delivered reward.
   ========================================================= */
(()=>{
"use strict";
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(e){return f}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const SHELF="lizzySecretShelfV1",LETTERS="lizzyPurchasedLettersV1",TOKENS="lizzyMikaelTokensV1";
const LETTER_ID="letter_001";
const LETTER_TITLE="Unreleased Letter #001";

function reconcileSecretShelfDelivery(){
 const s=read(SHELF,{owned:{}});
 // Letter: if ownership exists, guarantee a Purchased Letters record exists.
 if(s.owned?.[LETTER_ID]){
   const list=read(LETTERS,[]);
   if(!list.some(x=>x.id===LETTER_ID)){
     // Pull the authoritative letter content from the already-rendered purchased record if
     // possible; otherwise the main grant() will create it during normal accepted purchase.
     const existingText=document.querySelector("#purchasedLettersBox .purchasedLetter pre")?.textContent||"";
     if(existingText) list.push({id:LETTER_ID,title:LETTER_TITLE,content:existingText});
     write(LETTERS,list);
   }
   try{renderLetters();}catch(e){}
 }
 // Mystery Reward: ownership guarantees exactly one UNO Reverse entitlement.
 if(s.owned?.mystery_reward){
   const t=read(TOKENS,{inventory:{},history:[]});
   t.inventory=t.inventory||{};t.history=t.history||[];
   const delivered=t.history.some(h=>h?.source==="Mystery Reward"&&h?.token==="UNO Reverse");
   if(!delivered){
     t.inventory["UNO Reverse"]=Number(t.inventory["UNO Reverse"]||0)+1;
     t.history.push({type:"earned",token:"UNO Reverse",source:"Mystery Reward",at:new Date().toISOString(),reconciled:true});
     write(TOKENS,t);
   }
   try{renderMikaelTokens();}catch(e){}
 }
}
setTimeout(reconcileSecretShelfDelivery,700);
window.addEventListener("focus",reconcileSecretShelfDelivery);
window.addEventListener("lizzyStoreRefresh",()=>setTimeout(reconcileSecretShelfDelivery,80));
document.getElementById("openWhenIcon")?.addEventListener("click",()=>setTimeout(reconcileSecretShelfDelivery,80));
document.getElementById("tokenJarIcon")?.addEventListener("click",()=>setTimeout(reconcileSecretShelfDelivery,80));
})();




/* =========================================================
   REAL SITE DAY-7 NON-DESTRUCTIVE UPDATE GUARD V3
   Lizzy has ALREADY claimed Day 7.
   This module snapshots existing persistent state only.
   It NEVER resets balances, streaks, rewards, Garden or tokens.
   ========================================================= */
(()=>{
"use strict";
const SNAP="lizzyRealDay7PreUpdateSnapshotV3";
if(localStorage.getItem(SNAP))return;

const preservePatterns=[
 /^lizzy/i,
 /micky/i,
 /garden/i,
 /seed/i,
 /token/i,
 /reward/i,
 /streak/i,
 /mystery/i,
 /bank/i,
 /shelf/i,
 /letter/i,
 /extra/i,
 /coupon/i,
 /job/i,
 /achievement/i
];

const snapshot={
 createdAt:new Date().toISOString(),
 note:"Pre-update snapshot after Lizzy claimed Day 7. Read-only backup; no live values changed.",
 values:{}
};

for(let i=0;i<localStorage.length;i++){
 const key=localStorage.key(i);
 if(key && preservePatterns.some(rx=>rx.test(key))){
   const value=localStorage.getItem(key);
   if(value!==null)snapshot.values[key]=value;
 }
}
localStorage.setItem(SNAP,JSON.stringify(snapshot));
})();















/* =========================================================
   MIKAEL REVERSE TOKENS — CLEAN CROSS-DEVICE SYSTEM V3
   - Cloudflare KV is authoritative.
   - Mikael/admin device NEVER consumes Lizzy's popup.
   - Lizzy device polls and acknowledges redemptions.
   - Existing local inventory migrates once.
   ========================================================= */
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const WORKER=window.LIZZY_TELEGRAM_WORKER_URL||"https://lizzyos-notifications.mulaudzimikael73.workers.dev/";
const LOCAL="lizzyMikaelTokensV1";
const MIG="lizzyMikaelTokensCloudMigratedV2";
const ADMIN_DEVICE="lizzyMikaelAdminDeviceV1";
const SESSION="lizzyMikaelRedeemSessionV2";
const ACCESS="MRPERFECT";
const DEFS={"Reverse Token — Lizzy Owes Mikael a Monster":{"emoji":"🥤","desc":"Lizzy owes Mikael one Monster."},"Reverse Token — Mikael Gets a Hug":{"emoji":"🫂","desc":"Lizzy owes Mikael one proper hug."},"Reverse Token — Mikael Gets Ice Cream":{"emoji":"🍦","desc":"Lizzy owes Mikael one ice cream."},"Reverse Token — Mikael Gets Dessert":{"emoji":"🍰","desc":"Lizzy owes Mikael one dessert."},"Reverse Token — Mikael Gets a Chocolate":{"emoji":"🍫","desc":"Lizzy owes Mikael one chocolate."},"Reverse Token — Mikael Gets Sweets":{"emoji":"🍬","desc":"Lizzy owes Mikael some sweets."},"Reverse Token — Mikael Gets a Coke":{"emoji":"🥤","desc":"Lizzy owes Mikael one Coke."},"Reverse Token — Mikael Gets a Drink":{"emoji":"☕","desc":"Lizzy owes Mikael one reasonable drink."},"Reverse Token — Mikael Gets a Snack":{"emoji":"🍔","desc":"Lizzy owes Mikael one snack."},"Reverse Token — Mikael Gets Fries":{"emoji":"🍟","desc":"Lizzy owes Mikael some fries."},"Reverse Token — Mikael Picks the Movie":{"emoji":"🎬","desc":"Mikael chooses the movie for one movie night."},"Reverse Token — Mikael Picks What We Watch":{"emoji":"📺","desc":"Mikael chooses what you watch once."},"Reverse Token — Mikael Controls the Aux":{"emoji":"🎵","desc":"Mikael controls the music for one reasonable trip or session."},"Reverse Token — Mikael Picks One Song":{"emoji":"🎶","desc":"Mikael chooses one song, no skipping."},"Reverse Token — Mikael Picks Where We Eat":{"emoji":"🍽️","desc":"Mikael chooses where to eat once."},"Reverse Token — Mikael Picks the Activity":{"emoji":"🎯","desc":"Mikael chooses one reasonable activity."},"Reverse Token — Mikael Picks the Next Date Activity":{"emoji":"🎳","desc":"Mikael chooses the next activity date."},"Reverse Token — Mikael Gets One Nice Photo":{"emoji":"📸","desc":"Lizzy owes Mikael one nice photo."},"Reverse Token — Mikael Gets One Selfie Together":{"emoji":"🤳","desc":"One selfie together, Mikael's choice of moment."},"Reverse Token — Mikael Gets a Nice Message":{"emoji":"💌","desc":"Lizzy owes Mikael one genuinely nice message."},"Reverse Token — Mikael Gets a Little Letter":{"emoji":"📝","desc":"Lizzy owes Mikael one little letter."},"Reverse Token — Lizzy Answers One Random Question":{"emoji":"💬","desc":"Lizzy answers one harmless random question properly."},"Reverse Token — Mikael Gets One Honest Answer":{"emoji":"🤔","desc":"Mikael gets one honest answer to a reasonable question."},"Reverse Token — Mikael Gets a Call":{"emoji":"📞","desc":"Mikael gets one reasonable call."},"Reverse Token — Mikael Gets a Voice Note":{"emoji":"🎙️","desc":"Lizzy owes Mikael one voice note."},"Reverse Token — Mikael Gets One Joke":{"emoji":"😂","desc":"Lizzy owes Mikael one joke."},"Reverse Token — Lizzy Says Something Nice About Mikael":{"emoji":"😌","desc":"Lizzy must say one genuinely nice thing about Mikael."},"Reverse Token — Mikael Wins One Harmless Argument":{"emoji":"👑","desc":"Mikael automatically wins one harmless argument."},"Reverse Token — No Bullying Mikael for One Hour":{"emoji":"🧑‍⚖️","desc":"Mikael gets one full hour of protection from bullying."},"Reverse Token — Mikael's Knees Are Protected for One Day":{"emoji":"🦵","desc":"No knee slander for one full day."},"Reverse Token — No You're So Annoying for One Hour":{"emoji":"😭","desc":"Lizzy cannot say 'You're so annoying' to Mikael for one hour."},"Reverse Token — Lizzy Admits Mikael Was Right":{"emoji":"🏆","desc":"Lizzy must admit Mikael was right once."},"Reverse Token — Be Nice to Mikael for 30 Minutes":{"emoji":"😇","desc":"Thirty uninterrupted minutes of kindness to Mikael."},"Reverse Token — Four Eyes Compliments Mr Perfect":{"emoji":"👓","desc":"Four Eyes owes Mr Perfect one compliment."},"Reverse Token — Mikael Gets One Free Roast":{"emoji":"😭","desc":"Mikael gets one consequence-free playful roast."},"Reverse Token — Mikael Gets One UNO Reverse":{"emoji":"🃏","desc":"Mikael can reverse one playful situation."},"Reverse Token — Mikael Chooses":{"emoji":"🎲","desc":"Mikael chooses between two reasonable options."},"Reverse Token — One Small Favour":{"emoji":"🤝","desc":"Lizzy owes Mikael one small reasonable favour."},"Reverse Token — Mikael Gets the Comfortable Seat":{"emoji":"🛋️","desc":"Mikael gets first choice of the comfortable seat once."},"Reverse Token — Mikael Picks the Game":{"emoji":"🎮","desc":"Mikael chooses the game once."},"Reverse Token — Watch Football With Mikael":{"emoji":"⚽","desc":"One football watch session with Mikael."},"Reverse Token — Mikael Gets a Peace & Quiet Pass":{"emoji":"💤","desc":"One reasonable period of uninterrupted peace and quiet."},"Reverse Token — Mikael Gets One Please":{"emoji":"🥺","desc":"Lizzy has to ask nicely once. Very serious legislation."},"Reverse Token — Mr Perfect Privilege":{"emoji":"👑","desc":"One small reasonable Mr Perfect privilege."},"UNO Reverse":{"emoji":"🔄","desc":"Mikael gets one playful, reasonable request."}};
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch{return f}};
async function getJSON(url){
 const r=await fetch(url,{cache:"no-store"});
 const d=await r.json().catch(()=>({success:false,error:"Invalid server response"}));
 if(!r.ok||!d.success)throw new Error(d.error||`Server error ${r.status}`);
 return d;
}
async function post(body){
 const r=await fetch(WORKER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
 const d=await r.json().catch(()=>({success:false,error:"Invalid server response"}));
 if(!r.ok||!d.success)throw new Error(d.error||`Server error ${r.status}`);
 return d;
}
async function cloudState(){return (await getJSON(`${WORKER}?mikaelTokens=1&t=${Date.now()}`)).state}
async function migrate(){
 if(localStorage.getItem(MIG)==="yes")return;
 const old=read(LOCAL,{inventory:{}});
 if(old?.inventory&&Object.values(old.inventory).some(v=>Number(v)>0)){
   await post({type:"mikael_reverse_token_sync",inventory:old.inventory});
 }
 localStorage.setItem(MIG,"yes");
}
async function renderPublic(){
 const win=$("tokenJarWindow");if(!win)return;
 const host=win.querySelector(".windowScroll")||win;
 let box=$("mikaelTokensBox");
 if(!box){box=document.createElement("section");box.id="mikaelTokensBox";host.appendChild(box)}
 try{
  const t=await cloudState();
  const rows=Object.entries(t.inventory||{}).filter(([n,c])=>Number(c)>0&&DEFS[n]);
  box.innerHTML=`<h3>🕴️ Mikael's Tokens</h3>
  <p class="mikaelTokenIntro">Reverse Tokens are synced across devices. Lizzy can see them here, but only Mikael can redeem them.</p>
  ${rows.length?rows.map(([n,c])=>{const d=DEFS[n];return `<div class="tokenCard mikaelReverseCard"><div class="tokenCardEmoji">${d.emoji}</div><div><strong>${n}</strong><p>${d.desc}</p></div><div class="tokenCount">×${c}</div></div>`}).join(""):`<div class="memoryMessage">Mikael has no Reverse Tokens yet. 😭</div>`}`;
 }catch(e){
  box.innerHTML=`<h3>🕴️ Mikael's Tokens</h3><div class="memoryMessage">⚠️ Could not reach the synced Mikael Token inventory.</div>`;
 }
}
function openPrivate(){
 $("mikaelRedeemWindow")?.classList.remove("hidden");
 if(sessionStorage.getItem(SESSION)==="yes")showDashboard();else showLogin();
}
function closePrivate(){$("mikaelRedeemWindow")?.classList.add("hidden")}
function showLogin(){
 $("mikaelRedeemLogin")?.classList.remove("hidden");
 $("mikaelRedeemDashboard")?.classList.add("hidden");
 if($("mikaelRedeemPassword"))$("mikaelRedeemPassword").value="";
 if($("mikaelRedeemLoginStatus"))$("mikaelRedeemLoginStatus").textContent="";
 setTimeout(()=>$("mikaelRedeemPassword")?.focus(),80);
}
function login(){
 const attempt=($("mikaelRedeemPassword")?.value||"").trim().toUpperCase().replace(/\s+/g,"");
 if(attempt!==ACCESS){
   $("mikaelRedeemLoginStatus").textContent="❌ Access denied.";
   $("mikaelRedeemPassword").value="";return;
 }
 // This is the crucial device separation:
 // once Mikael unlocks admin here, this browser will never acknowledge Lizzy's popups.
 localStorage.setItem(ADMIN_DEVICE,"yes");
 sessionStorage.setItem(SESSION,"yes");
 showDashboard();
}
async function showDashboard(){
 $("mikaelRedeemLogin")?.classList.add("hidden");
 $("mikaelRedeemDashboard")?.classList.remove("hidden");
 await renderPrivate();
}
async function renderPrivate(){
 const host=$("mikaelPrivateTokenList");if(!host)return;
 host.innerHTML='<div class="memoryMessage">☁️ Loading synced Reverse Tokens…</div>';
 try{
  const t=await cloudState();
  const rows=Object.entries(t.inventory||{}).filter(([n,c])=>Number(c)>0&&DEFS[n]);
  host.innerHTML=`<div class="mikaelCloudStatus">☁️ CLOUD SYNC: CONNECTED ✓</div>
  ${rows.length?rows.map(([n,c])=>{const d=DEFS[n];return `<div class="mikaelPrivateToken"><div class="mikaelPrivateEmoji">${d.emoji}</div><div><strong>${n}</strong><p>${d.desc}</p><small>Synced quantity: ×${c}</small></div><button type="button" data-cloud-redeem="${encodeURIComponent(n)}">Redeem 🔄</button></div>`}).join(""):`<div class="memoryMessage">No Mikael Reverse Tokens are currently available in Cloudflare.</div>`}
  <button type="button" id="testLizzyReverseAlert" class="mikaelTestAlert">Send Test Alert to Lizzy's Device 🧪</button>`;
  host.querySelectorAll("[data-cloud-redeem]").forEach(b=>b.onclick=()=>redeem(decodeURIComponent(b.dataset.cloudRedeem)));
  $("testLizzyReverseAlert")?.addEventListener("click",sendTestAlert);
 }catch(e){
  host.innerHTML=`<div class="memoryMessage">❌ CLOUD SYNC FAILED<br><small>${e.message}</small><br><br>Make sure the new Cloudflare Worker is deployed.</div>`;
 }
}
async function redeem(name){
 const d=DEFS[name];if(!d)return;
 if(!confirm(`Redeem ${name}?\\n\\n${d.desc}`))return;
 try{
  const x=await post({type:"mikael_reverse_token_redeem",name,emoji:d.emoji,desc:d.desc});
  alert(`✅ REDEEMED IN CLOUDFLARE\\n\\n${d.emoji} ${name}\\nRemaining: ×${x.redemption.remaining}\\n\\nLizzy's device has NOT acknowledged this yet.`);
  await renderPrivate();await renderPublic();
 }catch(e){alert(`❌ Redemption failed\\n\\n${e.message}`)}
}
async function sendTestAlert(){
 try{
  await post({type:"mikael_reverse_token_test",name:"Reverse Token Test",emoji:"🧪",desc:"This is a cross-device test from Mikael. No real token was used."});
  alert("🧪 Test alert queued in Cloudflare. Open LizzyOS on Lizzy's device and wait up to 15 seconds.");
 }catch(e){alert(`❌ Test failed: ${e.message}`)}
}
function ensureModal(){
 let m=$("reverseRedemptionModal");
 if(!m){m=document.createElement("div");m.id="reverseRedemptionModal";m.className="reverseRedemptionOverlay hidden";document.body.appendChild(m)}
 return m;
}
function showLizzyAlert(r){
 const m=ensureModal();
 m.innerHTML=`<div class="reverseRedemptionCard"><div class="reverseAlarm">🚨</div><small>${r.test?"CROSS-DEVICE TEST":"MIKAEL REVERSE TOKEN REDEEMED"}</small><h2>${r.emoji} ${r.name}</h2><p>${r.desc}</p>${r.test?"":`<div class="reverseRemaining">Mikael has ×${r.remaining} remaining</div>`}<button id="reverseAckBtn" type="button">${r.test?"Test Received ✓":"Fine 🙄"}</button><div id="reverseAckStatus"></div></div>`;
 m.classList.remove("hidden");
 $("reverseAckBtn").onclick=async()=>{
   $("reverseAckBtn").disabled=true;$("reverseAckStatus").textContent="Acknowledging…";
   try{
     await post({type:"mikael_reverse_token_ack",id:r.id});
     m.classList.add("hidden");setTimeout(checkPending,200);
   }catch(e){$("reverseAckStatus").textContent="Could not acknowledge. Try again.";$("reverseAckBtn").disabled=false}
 };
}
async function checkPending(){
 // Mikael's own laptop MUST NOT consume or acknowledge Lizzy's notification.
 if(localStorage.getItem(ADMIN_DEVICE)==="yes")return;
 if(!$("reverseRedemptionModal")?.classList.contains("hidden")&&$("reverseRedemptionModal"))return;
 try{
  const d=await getJSON(`${WORKER}?pendingReverseRedemptions=1&t=${Date.now()}`);
  if(d.redemptions?.length)showLizzyAlert(d.redemptions[0]);
 }catch(e){}
}
async function awardCloud(e){
 const r=e.detail?.reward;if(r?.[0]!=="REVERSE TOKEN")return;
 const d=DEFS[r[2]]||{emoji:r[1]||"🔄",desc:r[3]||""};
 try{
   await post({type:"mikael_reverse_token_award",name:r[2],emoji:d.emoji,desc:d.desc,source:"Daily Reward"});
   await renderPublic();
 }catch(e){console.warn("Reverse Token cloud award failed",e)}
}
window.addEventListener("lizzyDailyRewardClaimed",awardCloud);
$("tokenJarIcon")?.addEventListener("click",()=>setTimeout(renderPublic,100));
document.addEventListener("keydown",e=>{if(e.ctrlKey&&e.altKey&&e.key.toLowerCase()==="m"){e.preventDefault();openPrivate()}});
$("mikaelRedeemLoginBtn")?.addEventListener("click",login);
$("mikaelRedeemPassword")?.addEventListener("keydown",e=>{if(e.key==="Enter")login()});
$("mikaelRedeemClose")?.addEventListener("click",closePrivate);
$("mikaelRedeemCloseBtn")?.addEventListener("click",closePrivate);
$("mikaelRedeemLogout")?.addEventListener("click",()=>{sessionStorage.removeItem(SESSION);showLogin()});
setTimeout(async()=>{try{await migrate()}catch(e){}await renderPublic();await checkPending()},900);
setInterval(checkPending,15000);
window.MikaelCloudTokens={openPrivate,renderPublic,renderPrivate,checkPending};
})();

