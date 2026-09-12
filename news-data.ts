export type Label = {
  tag: string;
  className: string;
};

export const labels: Record<string, Label> = {
  breaking: { tag: "🔴 BREAKING NEWS", className: "label-breaking" },
  economy: { tag: "💰 ECONOMY WATCH", className: "label-economy" },
  bank: { tag: "🏦 BANK ALERT", className: "label-bank" },
  president: { tag: "🇿🇦 FROM THE PRESIDENT", className: "label-president" },
  lizzy: { tag: "❤️ LIZZY WATCH", className: "label-lizzy" },
  exclusive: { tag: "🚨 EXCLUSIVE", className: "label-exclusive" },
  sources: { tag: "👀 SOURCES SAY...", className: "label-sources" },
  warning: { tag: "⚠️ FINANCIAL WARNING", className: "label-warning" },
  good: { tag: "💗 GOOD NEWS", className: "label-good" },
  nonsense: { tag: "😂 NATIONAL NONSENSE", className: "label-nonsense" },
  romance: { tag: "💕 MICKY & LIZZY", className: "label-romance" },
};

export const tickerItems = [
  "BREAKING: LIZZY HAS ENTERED THE CHAT",
  "MARKETS RALLY AFTER LIZZY PROMISES NOT TO SHOP TODAY",
  "MARKETS CRASH AFTER LIZZY ENTERS THE MALL",
  "LIZZY SPOTTED SMILING — SCIENTISTS CONFIRM IT IS EXTREMELY CUTE",
  "NATIONAL EMERGENCY DECLARED AFTER LIZZY REPLIES “K.”",
  "GOVERNMENT ANNOUNCES NEW TAX: 15% ON BEING TOO PRETTY",
  "MICKY DENIES BEING OBSESSED WITH LIZZY — EVIDENCE SUGGESTS OTHERWISE",
];

export const marketUpdate = [
  { name: "Lizzy's mood", trend: "📈" },
  { name: "Micky's sanity", trend: "📉" },
  { name: "Lizzy's bank balance", trend: "📉📉📉" },
  { name: "Micky's feelings for Lizzy", trend: "📈📈📈📈📈" },
];

export type Headline = { label: keyof typeof labels; text: string };

export const financeHeadlines: Headline[] = [
  { label: "breaking", text: "COST OF LIVING HAS INCREASED — LIZZY BLAMES MICKY" },
  { label: "economy", text: "NATIONAL TREASURY CONFIRMS: LIZZY HAS SPENT MONEY AGAIN" },
  { label: "economy", text: "SHOPPING BUDGET REVISED UPWARDS AFTER UNEXPECTED LIZZY INCIDENT" },
  { label: "sources", text: "LOCAL WOMAN ENTERS SHOP FOR ONE ITEM — LEAVES WITH 17" },
  { label: "economy", text: "ECONOMISTS BAFFLED BY LIZZY'S ABILITY TO SPEND MONEY SHE DOESN'T HAVE" },
  { label: "economy", text: "MINIMUM WAGE GOES UP — LIZZY'S SHOPPING BUDGET SOMEHOW GOES UP FASTER" },
  { label: "sources", text: "ARE TAXES COMING SOON? LIZZY SAYS “I HOPE NOT, I'VE GOT THINGS TO BUY.”" },
  { label: "exclusive", text: "MICKY'S DAILY NEWS INVESTIGATION FINDS LIZZY HAS NEVER MET A SALE SHE DIDN'T LIKE" },
  { label: "breaking", text: "LIZZY'S BANK ACCOUNT HAS REQUESTED AN EMERGENCY MEETING" },
  { label: "bank", text: "BANK OFFICIALS CONFIRM LIZZY'S ACCOUNT IS “GOING THROUGH A LOT RIGHT NOW.”" },
  { label: "sources", text: "LIZZY SEEN LOOKING AT HER BANK BALANCE — SOURCES SAY SHE IMMEDIATELY CLOSED THE APP" },
  { label: "economy", text: "ECONOMY RECOVERS SLIGHTLY; LIZZY'S ACCOUNT DOES NOT" },
  { label: "warning", text: "FINANCIAL EXPERTS WARN: “SHE CANNOT KEEP DOING THIS.”" },
  { label: "bank", text: "LIZZY DENIES ALL ALLEGATIONS OF FINANCIAL IRRESPONSIBILITY" },
  { label: "exclusive", text: "RECEIPT DISCOVERED — LIZZY HAS NO COMMENT" },
  { label: "breaking", text: "GOVERNMENT ANNOUNCES NEW TAX: 15% ON BEING TOO PRETTY" },
  { label: "economy", text: "TREASURY CONSIDERS NEW “LIZZY TAX” TO FUND HER SHOPPING HABITS" },
  { label: "president", text: "MICKY APPOINTED TEMPORARY MINISTER OF LIZZY'S FINANCES" },
  { label: "breaking", text: "FIRST DAY IN OFFICE: MICKY DISCOVERS LIZZY HAS ALREADY IGNORED THE BUDGET" },
  { label: "bank", text: "NATIONAL BANK WARNS CUSTOMERS NOT TO COPY LIZZY'S FINANCIAL STRATEGY" },
  { label: "bank", text: "LIZZY'S CARD DECLINED — BANK APOLOGISES FOR “THE EMOTIONAL DAMAGE”" },
  { label: "economy", text: "SHOPPING CENTRE REPORTS RECORD SALES AFTER LIZZY'S ARRIVAL" },
  { label: "economy", text: "ECONOMISTS DISCOVER NEW FORM OF INFLATION: LIZZYFLATION" },
  { label: "exclusive", text: "ONE WOMAN. ONE BANK CARD. ZERO SELF-CONTROL." },
  { label: "sources", text: "LIZZY CLAIMS PURCHASE WAS “ESSENTIAL” — RECEIPT SAYS OTHERWISE" },
  { label: "breaking", text: "LIZZY HAS DISCOVERED ANOTHER THING SHE “NEEDS”" },
  { label: "economy", text: "BANK ACCOUNT BALANCE FALLS; LIZZY'S CONFIDENCE REMAINS HIGH" },
  { label: "economy", text: "MICKY'S DAILY NEWS ASKS: WHERE DID ALL THE MONEY GO? LIZZY RESPONDS: “NEXT QUESTION.”" },
  { label: "economy", text: "ECONOMY ENTERS UNCERTAIN PERIOD FOLLOWING LIZZY'S WEEKEND PLANS" },
  { label: "president", text: "FINANCE MINISTER CONFIRMS: “WE HAVE LOST CONTROL OF THE SITUATION.”" },
  { label: "bank", text: "LIZZY'S SAVINGS PLAN LASTED THREE BUSINESS DAYS" },
  { label: "exclusive", text: "NEW REPORT: LIZZY CAN TURN R500 INTO R37 WITH REMARKABLE EFFICIENCY" },
  { label: "good", text: "BANK OFFICIALS CELEBRATE: LIZZY HAS FINALLY CHECKED HER BALANCE" },
  { label: "sources", text: "LIZZY DECLARES HERSELF “FINANCIALLY RESPONSIBLE” — NATION LAUGHS" },
  { label: "exclusive", text: "MICKY FOUND HIDING LIZZY'S BANK CARD FOR HER OWN PROTECTION" },
  { label: "president", text: "GOVERNMENT ANNOUNCES EMERGENCY FUND FOR PEOPLE WHO SHOP LIKE LIZZY" },
  { label: "bank", text: "LIZZY'S WALLET HAS BEEN PLACED UNDER GOVERNMENT PROTECTION" },
  { label: "economy", text: "ECONOMIC ANALYSTS: “WE HAVE NEVER SEEN ANYTHING LIKE THIS.”" },
  { label: "breaking", text: "LIZZY HAS SAVED MONEY — SCIENTISTS BAFFLED" },
  { label: "good", text: "MARKETS RALLY AFTER LIZZY PROMISES NOT TO SHOP TODAY" },
  { label: "breaking", text: "MARKETS CRASH AFTER LIZZY ENTERS THE MALL" },
  { label: "bank", text: "BANK LAUNCHES NEW ACCOUNT TYPE: “THE LIZZY PACKAGE”" },
  { label: "exclusive", text: "MICKY'S DAILY NEWS EXCLUSIVE: LIZZY HAS A SHOPPING PROBLEM" },
  { label: "sources", text: "LIZZY INSISTS SHE'S “JUST LOOKING” — RETAILERS PREPARE FOR IMPACT" },
  { label: "economy", text: "TREASURY CONFIRMS LIZZY'S SPENDING IS NOW A MACROECONOMIC ISSUE" },
  { label: "breaking", text: "LIZZY HAS RECEIVED MONEY — BANK EXPECTS IT TO BE GONE BY FRIDAY" },
  { label: "sources", text: "NATION ASKS: CAN LIZZY MAKE IT TO PAYDAY? EXPERTS SAY YES. LIZZY SAYS “OBVIOUSLY.”" },
  { label: "good", text: "SPECIAL REPORT: DESPITE EVERYTHING, LIZZY REMAINS MICKY'S FAVOURITE PERSON" },
];

export const varietyHeadlines: Headline[] = [
  { label: "breaking", text: "LIZZY HAS ARRIVED — EVERYONE ELSE CAN GO HOME" },
  { label: "breaking", text: "LOCAL WOMAN CAUGHT BEING CUTE AGAIN — POLICE HAVE NO EXPLANATION" },
  { label: "exclusive", text: "MICKY DENIES BEING OBSESSED WITH LIZZY — EVIDENCE SUGGESTS OTHERWISE" },
  { label: "breaking", text: "NATION IN SHOCK AS LIZZY ACTUALLY AGREES WITH MICKY" },
  { label: "sources", text: "LIZZY HAS SAID “NOTHING” — MICKY IS CONVINCED SOMETHING IS WRONG" },
  { label: "sources", text: "MYSTERY SOLVED: LIZZY WASN'T IGNORING YOU, SHE WAS JUST BEING LIZZY" },
  { label: "lizzy", text: "LIZZY SPOTTED SMILING — SCIENTISTS CONFIRM IT IS EXTREMELY CUTE" },
  { label: "good", text: "MICKY SURVIVES AN ENTIRE CONVERSATION WITHOUT MENTIONING LIZZY — HISTORIC DAY" },
  { label: "breaking", text: "NATIONAL EMERGENCY DECLARED AFTER LIZZY REPLIES “K.”" },
  { label: "lizzy", text: "LIZZY OFFICIALLY NAMED THE PRETTIEST PERSON IN MICKY'S WORLD" },
  { label: "lizzy", text: "NEW STUDY CONFIRMS LIZZY'S SMILE CAN IMPROVE MOODS" },
  { label: "lizzy", text: "EXPERTS AGREE: LIZZY IS VERY DIFFICULT NOT TO LIKE" },
  { label: "lizzy", text: "LIZZY HAS BEEN HAVING A GOOD DAY — MICKY CLAIMS PARTIAL CREDIT" },
  { label: "lizzy", text: "LOCAL WOMAN CONTINUES TO BE BEAUTIFUL FOR NO APPARENT REASON" },
  { label: "lizzy", text: "LIZZY'S LAUGH NAMED ONE OF THE WORLD'S MOST DANGEROUS DISTRACTIONS" },
  { label: "romance", text: "MICKY ASKED WHAT HE LIKES MOST ABOUT LIZZY — ANSWER WAS “WHERE DO I START?”" },
  { label: "lizzy", text: "LIZZY REMAINS COMPLETELY UNAWARE OF HOW SPECIAL SHE IS" },
  { label: "good", text: "REPORT: LIZZY MAKES ORDINARY DAYS FEEL A LITTLE BETTER" },
  { label: "good", text: "NATION AGREES: LIZZY DESERVES A VERY GOOD DAY TODAY" },
  { label: "exclusive", text: "MICKY CAUGHT STARING AT LIZZY AGAIN" },
  { label: "sources", text: "INVESTIGATION UNDERWAY INTO WHO GAVE LIZZY THAT MUCH ATTITUDE" },
  { label: "sources", text: "SOURCES CLAIM LIZZY HAS A SECRET SOFT SIDE — SHE DENIES EVERYTHING" },
  { label: "exclusive", text: "MICKY'S PHONE SCREEN TIME RAISES SERIOUS QUESTIONS" },
  { label: "exclusive", text: "LEAKED REPORT: MICKY HAS WRITTEN ABOUT LIZZY WAY TOO MANY TIMES" },
  { label: "sources", text: "LIZZY REFUSES TO COMMENT ON ALLEGATIONS THAT SHE IS ACTUALLY A SWEETHEART" },
  { label: "breaking", text: "SHOCKING DEVELOPMENT: LIZZY MAY ACTUALLY LIKE MICKY" },
  { label: "sources", text: "MICKY CLAIMS HE IS “JUST BEING NICE” — INVESTIGATORS REMAIN SCEPTICAL" },
  { label: "exclusive", text: "TOP SECRET DOCUMENT REVEALS MICKY HAS A FAVOURITE PERSON" },
  { label: "sources", text: "LIZZY'S ATTITUDE UNDER INVESTIGATION — CASE REMAINS OPEN" },
  { label: "nonsense", text: "MAN SPENDS 20 MINUTES LOOKING FOR HIS PHONE WHILE HOLDING IT" },
  { label: "nonsense", text: "LOCAL CITIZEN OPENS FRIDGE FOR THE FOURTH TIME — STILL NOTHING NEW" },
  { label: "nonsense", text: "SCIENTISTS CONFIRM “I'M ALMOST READY” DOES NOT MEAN ALMOST READY" },
  { label: "nonsense", text: "NATION CELEBRATES: SOMEONE ACTUALLY REPLIED TO THE GROUP CHAT" },
  { label: "nonsense", text: "PERSON WHO SAID “I'M NOT TIRED” FALLS ASLEEP 7 MINUTES LATER" },
  { label: "nonsense", text: "STUDY FINDS 99% OF “QUICK NAPS” ARE COMPLETE LIES" },
  { label: "nonsense", text: "LOCAL MAN SAYS “I'LL DO IT TOMORROW” — TOMORROW REMAINS UNDER INVESTIGATION" },
  { label: "nonsense", text: "MYSTERY DEEPENS AS ONE SOCK DISAPPEARS FROM WASHING MACHINE" },
  { label: "nonsense", text: "WITNESSES REPORT PERSON WALKING INTO A ROOM AND FORGETTING WHY" },
  { label: "nonsense", text: "URGENT: SOMEONE HAS LEFT THE LIGHT ON IN AN EMPTY ROOM" },
  { label: "romance", text: "MICKY AND LIZZY SPOTTED TOGETHER — NATION DEMANDS ANSWERS" },
  { label: "romance", text: "ROMANCE EXPERTS CONFUSED BY MICKY'S OBVIOUSLY OBVIOUS FEELINGS" },
  { label: "romance", text: "MICKY CLAIMS “WE'RE JUST TALKING” — NEWSPAPER HAS QUESTIONS" },
  { label: "romance", text: "LIZZY MAKES MICKY SMILE — GOVERNMENT CALLS IT A POSITIVE DEVELOPMENT" },
  { label: "romance", text: "REPORT: MICKY'S MOOD IMPROVES SIGNIFICANTLY WHEN LIZZY IS AROUND" },
  { label: "romance", text: "MICKY HAS OFFICIALLY LOST THE ARGUMENT — LIZZY WAS RIGHT AGAIN" },
  { label: "romance", text: "LIZZY WINS ANOTHER ARGUMENT — MICKY REQUESTS AN INDEPENDENT INVESTIGATION" },
  { label: "romance", text: "MICKY SAYS HE DOESN'T MISS LIZZY — HIS FACE TELLS A DIFFERENT STORY" },
  { label: "romance", text: "SOURCES CLOSE TO MICKY SAY LIZZY IS “A LITTLE TOO SPECIAL”" },
  { label: "good", text: "SPECIAL REPORT: WHATEVER HAPPENS, MICKY IS VERY GLAD HE MET LIZZY" },
];

export type Story = { title: string; body: string[] };

export const leadStories: Story[] = [
  {
    title: "Cost of Living Has Increased — Lizzy Remains Unbothered",
    body: [
      "The cost of food, transport and basically everything else continues to rise. Economists recommend budgeting carefully.",
      "Lizzy has responded by continuing to spend money as though inflation is a personal challenge.",
    ],
  },
  {
    title: "Are Taxes Coming Soon? Treasury Refuses to Comment on Lizzy's Account",
    body: [
      "Rumours are circulating that a new tax could soon be introduced.",
      "The proposed Lizzy Tax would apply whenever Lizzy says, “It's not that expensive.”",
    ],
  },
  {
    title: "Minimum Wage Has Gone Up — Lizzy's Spending Wage Has Also Increased",
    body: [
      "Workers may be earning more, but economists have discovered that Lizzy somehow believes the increase applies directly to her shopping allowance.",
    ],
  },
];

export const bankStories: string[] = [
  "LIZZY'S BANK ACCOUNT ENTERS RECOVERY PROGRAMME",
  "BANK OFFICIALS CONFIRM: HER BALANCE IS “NOT LOOKING GREAT.”",
  "LIZZY'S SAVINGS ACCOUNT HAS ASKED TO BE LEFT ALONE",
  "NEW BUDGET PROPOSED — LIZZY IMMEDIATELY REJECTS IT",
  "LIZZY ALLOCATES 60% OF INCOME TO “IMPORTANT THINGS”",
  "INVESTMENT EXPERTS ASK LIZZY TO DEFINE “IMPORTANT THINGS”",
  "LIZZY: “CLOTHES ARE AN INVESTMENT.”",
  "BANK LAUNCHES LIZZY EMERGENCY FUND — for birthdays, shopping trips, unexpected cravings and seeing something cute in a shop window.",
  "MICKY OPENS SECRET SAVINGS ACCOUNT FOR LIZZY — it was emptied 14 minutes later after Lizzy somehow found out about it.",
  "LIZZY'S BANK CARD HAS BEEN SEEN MORE THAN HER SAVINGS ACCOUNT",
  "BANK STATEMENT REVEALS SUSPICIOUS AMOUNT OF “TREATS”",
  "TREASURY INVESTIGATES UNUSUALLY HIGH COFFEE EXPENDITURE",
  "LIZZY CLAIMS SHE'S “BEING RESPONSIBLE” — BANK MANAGER: “WE HAVE DIFFERENT DEFINITIONS OF RESPONSIBLE.”",
  "NEW FINANCIAL YEAR, SAME LIZZY",
  "LIZZY PROMISES TO SAVE MONEY — PROMISE LASTS UNTIL SATURDAY",
  "BANK INTRODUCES SPENDING LIMIT — LIZZY TAKES IT PERSONALLY",
  "LIZZY'S ACCOUNT BALANCE REACHES HISTORIC LOW",
  "MICKY'S FINANCIAL ADVICE: “PLEASE STOP.” — LIZZY'S FINANCIAL ADVICE: “MIND YOUR BUSINESS.”",
  "BANK CONFIRMS THAT “IT WAS ON SALE” IS NOT A FINANCIAL PLAN",
  "ECONOMISTS DISCOVER LIZZY'S MONEY HAS A VERY SHORT LIFE EXPECTANCY",
  "NEW SAVINGS CHALLENGE LAUNCHED — LIZZY LASTS 48 HOURS",
  "LIZZY OPENS INVESTMENT ACCOUNT — INVESTS IN LOOKING GOOD",
  "BANK WARNS AGAINST EMOTIONAL SPENDING — LIZZY RESPONDS: “BUT IT WAS CUTE.” — FINANCIAL EXPERTS ADMIT THEY HAVE NO RESPONSE TO THAT",
  "LIZZY'S EMERGENCY FUND USED FOR SOMETHING THAT WAS NOT AN EMERGENCY",
  "TREASURY CLASSIFIES SHOPPING AS A NATURAL DISASTER",
  "BANK STATEMENT RELEASED — NATION DEMANDS ANSWERS",
  "LIZZY REFUSES TO RELEASE FULL BANK STATEMENT",
  "MICKY: “I'M NOT SAYING SHE'S BAD WITH MONEY...” — BANK: “...BUT WE'RE SAYING IT.”",
  "LIZZY'S CREDIT CARD REQUESTS A HOLIDAY",
  "SAVINGS ACCOUNT REPORTS “EMOTIONAL DISTRESS”",
  "LIZZY ANNOUNCES NEW FINANCIAL STRATEGY: LOOK CUTE AND HOPE FOR THE BEST",
  "BANK OFFERS FINANCIAL COUNSELLING — LIZZY DECLINES",
  "LIZZY DISCOVERS BUDGETING — CALLS IT “LIMITING HERSELF”",
  "NEW REPORT: LIZZY SPENDS MORE WHEN SHE SAYS SHE'S NOT GOING TO BUY ANYTHING",
  "BANK MANAGER HIDES WHEN LIZZY WALKS IN",
  "LIZZY'S WALLET DECLARED A HIGH-RISK FINANCIAL INSTRUMENT",
  "MICKY PROPOSES NATIONAL SAVINGS DAY — LIZZY PROPOSES NATIONAL SHOPPING DAY — PARLIAMENT STILL DEBATING WHICH ONE TO APPROVE",
  "LIZZY'S ACCOUNT BALANCE MAY BE LOW — HER VALUE IS NOT",
  "FINANCIAL MARKETS REMAIN VOLATILE; LIZZY REMAINS BEAUTIFUL",
  "BANK CONCLUDES: “WE MAY NOT BE ABLE TO SAVE HER MONEY, BUT WE CAN SAVE HER.”",
];

export const presidentQuotes: string[] = [
  "My fellow citizens, I have reviewed the national situation. Everything is concerning. Except Lizzy. Lizzy is doing exceptionally well.",
  "I would like to remind the nation that Lizzy is not spending too much money. She is simply stimulating the economy.",
  "To Lizzy: You are beautiful, intelligent, and unfortunately completely incapable of walking past a shop without buying something.",
  "The government has investigated the rumours surrounding Lizzy. We can confirm she is guilty — of being adorable.",
  "I have been advised not to comment on Lizzy's spending. I have chosen to ignore that advice.",
  "Lizzy, if beauty were currency, you would have absolutely no financial problems.",
  "The national economy may be struggling, but my confidence in Lizzy remains extremely high.",
  "I have personally reviewed the evidence. Lizzy is indeed that girl.",
  "We must address the rising cost of living. Unfortunately, we cannot address the rising cost of Lizzy's shopping habits.",
  "My administration believes every citizen deserves happiness. Lizzy deserves slightly more.",
  "We have considered placing a spending limit on Lizzy. The proposal was rejected due to a lack of cooperation from Lizzy.",
  "Lizzy has informed me that she does not have an attitude. The government has chosen not to challenge her.",
  "I would like to thank Lizzy for continuing to look beautiful during these difficult economic times.",
  "Some people brighten a room when they enter. Lizzy enters and changes the entire economic forecast.",
  "I have seen Lizzy smile. Quite frankly, the national mood improved immediately.",
  "We cannot confirm whether Micky is obsessed with Lizzy. However, we have reviewed the evidence.",
  "The evidence is overwhelming.",
  "Lizzy remains the government's most important national treasure.",
  "Please do not ask the President about Lizzy's bank balance. I have chosen to remain alive.",
  "Lizzy has been accused of being difficult. The government prefers the term 'strong-minded.'",
  "She has been accused of having an attitude. I personally believe she simply has standards.",
  "Micky has been advised to stop talking about Lizzy. He has declined.",
  "We have asked Micky to remain professional. He laughed.",
  "The government wishes Lizzy a wonderful day, although we cannot guarantee Micky won't somehow make it about her.",
  "If kindness were taxable, Lizzy would bankrupt the government.",
  "Lizzy deserves flowers, compliments and approximately zero unnecessary stress.",
  "I have been informed that Lizzy is currently looking particularly beautiful. This is not breaking news because it happens every day.",
  "The nation has many problems. Lizzy's smile is not one of them.",
  "To the young people of this country: work hard, save money and do not let Lizzy convince you that 'just one more thing' is financially responsible.",
  "Lizzy's spending habits are concerning. Her personality is not.",
  "We have discovered that Micky's favourite subject is apparently Lizzy. Parliament has requested a new subject.",
  "I have personally instructed the Treasury to protect Lizzy from financial hardship. Micky has been instructed to protect Lizzy from boredom.",
  "Lizzy, you are officially exempt from criticism today. Tomorrow's situation will be reviewed.",
  "The government recognises the importance of strong women. Lizzy has demonstrated this strength repeatedly, particularly when arguing with Micky.",
  "I am pleased to announce that Lizzy has once again won the award for being unnecessarily cute.",
  "There are millions of people in this country. Micky only seems interested in one.",
  "We have asked Micky why Lizzy is mentioned in approximately 73% of his conversations. He had no defence.",
  "Lizzy, please know that you are appreciated, admired and occasionally financially investigated.",
  "Our nation is built on love, hope and responsible spending. Lizzy is responsible for the first two.",
  "Micky would like everyone to know that Lizzy is beautiful. The government confirms this statement is factually accurate.",
  "I have reviewed the situation between Micky and Lizzy. I will not comment further at this time.",
  "Actually, I will comment further. Micky clearly likes her.",
  "Lizzy has the government's full support in all matters except unnecessary spending.",
  "If Micky ever says he doesn't care about Lizzy, please remember that this newspaper exists.",
  "The President has officially declared Lizzy a national sweetheart.",
  "We would like to remind everyone that teasing Lizzy is permitted. Being genuinely mean to her is not.",
  "Lizzy deserves someone who makes her laugh, supports her dreams and occasionally tells her to put the card away.",
  "After careful consideration, the government has concluded that Lizzy is worth every penny.",
  "The economy may fluctuate. Interest rates may change. Prices may rise. But Micky's opinion of Lizzy remains remarkably stable.",
  "And finally, on behalf of the entire nation: Lizzy, you are loved, appreciated and very, very special. Please continue being exactly who you are — even if your bank account would prefer otherwise. ❤️",
];

/* ------------------------------------------------------------------
 * Daily rotation engine
 *
 * Every list above is a POOL. Each day the paper prints a fresh,
 * de-duplicated selection drawn from those pools using a seeded
 * shuffle keyed to the calendar date, so:
 *  - the same day always renders the same edition (server + browser
 *    agree, no hydration mismatch),
 *  - no headline, bulletin, bank alert, ticker line or presidential
 *    statement is ever printed twice in the same edition,
 *  - the order and selection change automatically at midnight.
 * ------------------------------------------------------------------ */

export const EDITION_TIME_ZONE = "Africa/Johannesburg";

/** Stable YYYY-MM-DD for the paper's timezone (identical on server & client). */
export function editionDateKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: EDITION_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function editionDateLabel(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-ZA", {
    timeZone: EDITION_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
}

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic PRNG (mulberry32). */
function rng(seed: number) {
  let a = seed || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: readonly T[], seed: string): T[] {
  const out = items.slice();
  const rand = rng(hashSeed(seed));
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

const normalise = (s: string) =>
  s
    .toUpperCase()
    .replace(/[“”"'’‘]/g, "")
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();

/** Drops repeats (ignoring punctuation/case) and anything already printed. */
function uniqueBy<T>(items: readonly T[], key: (item: T) => string, seen: Set<string>): T[] {
  const out: T[] = [];
  for (const item of items) {
    const k = normalise(key(item));
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

export type DailyEdition = {
  dateKey: string;
  dateLabel: string;
  editionNo: number;
  ticker: string[];
  lead: Headline;
  secondary: Headline[];
  bulletin: Headline[];
  money: Headline[];
  bankAlerts: string[];
  presidentQuotes: string[];
  closingQuote: string;
  leadStories: Story[];
};

const EPOCH = Date.UTC(2026, 0, 1);

function buildEdition(dateKey: string): DailyEdition {
  const seen = new Set<string>();

  // Front page picks first, so they always win the de-duplication race.
  const variety = shuffle(varietyHeadlines, `variety:${dateKey}`);
  const varietyPicks = uniqueBy(variety, (h) => h.text, seen);
  const lead = varietyPicks[0]!;
  const secondary = varietyPicks.slice(1, 4);
  const bulletin = varietyPicks.slice(4, 28);

  const money = uniqueBy(shuffle(financeHeadlines, `money:${dateKey}`), (h) => h.text, seen).slice(
    0,
    21,
  );

  const bankAlerts = uniqueBy(shuffle(bankStories, `bank:${dateKey}`), (s) => s, seen).slice(0, 16);

  // Ticker lines are pulled last from whatever hasn't been printed yet.
  const tickerPool = [
    ...uniqueBy(shuffle(tickerItems, `ticker:${dateKey}`), (s) => s, seen),
    ...varietyPicks.slice(28).map((h) => h.text),
  ];
  const ticker = tickerPool.slice(0, 6);

  const quotesSeen = new Set<string>();
  const quotes = uniqueBy(presidentQuotes, (q) => q, quotesSeen);
  const closingQuote = quotes[quotes.length - 1]!;
  const rotatingQuotes = shuffle(quotes.slice(0, -1), `president:${dateKey}`).slice(0, 18);

  const stories = shuffle(uniqueBy(leadStories, (s) => s.title, new Set()), `stories:${dateKey}`);

  const editionNo =
    Math.max(
      1,
      Math.round((Date.parse(`${dateKey}T00:00:00Z`) - EPOCH) / 86400000),
    ) + 1;

  return {
    dateKey,
    dateLabel: editionDateLabel(new Date(`${dateKey}T12:00:00Z`)),
    editionNo,
    ticker,
    lead,
    secondary,
    bulletin,
    money,
    bankAlerts,
    presidentQuotes: rotatingQuotes,
    closingQuote,
    leadStories: stories.slice(0, 3),
  };
}

let cache: DailyEdition | null = null;

/** The edition for today — cached per day, identical on server and client. */
export function getDailyEdition(now: Date = new Date()): DailyEdition {
  const dateKey = editionDateKey(now);
  if (!cache || cache.dateKey !== dateKey) cache = buildEdition(dateKey);
  return cache;
}
