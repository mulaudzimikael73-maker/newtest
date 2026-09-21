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
  sports: { tag: "🏃 SPORTS DESK", className: "label-sports" },
  chocolate: { tag: "🍫 CHOCOLATE WATCH", className: "label-chocolate" },
};

export const tickerItems = [
  "BREAKING: LIZZY HAS ENTERED THE CHAT",
  "MARKETS RALLY AFTER LIZZY PROMISES NOT TO SHOP TODAY",
  "MARKETS CRASH AFTER LIZZY ENTERS THE MALL",
  "LIZZY SPOTTED SMILING — SCIENTISTS CONFIRM IT IS EXTREMELY CUTE",
  "NATIONAL EMERGENCY DECLARED AFTER LIZZY REPLIES “K.”",
  "GOVERNMENT ANNOUNCES NEW TAX: 15% ON BEING TOO PRETTY",
  "MICKY DENIES BEING OBSESSED WITH LIZZY — EVIDENCE SUGGESTS OTHERWISE",
  "BREAKING: LIZZY CHALLENGES MIKAEL TO A RACE — RED BULL ALLEGEDLY INVOLVED",
  "CHOCOLATE SLAB SURVIVES ONLY TWO BITES AGAINST LIZZY — WORLD RECORD SUSPECTED",
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
  { label: "economy", text: "TREASURY UPDATE: LIZZY CONTINUES TO FIGHT AGAINST THE POSSIBILITY OF A PRESIDENTIAL TAX" },
  { label: "warning", text: "TAX WARNING: LIZZY HAS MADE IT CLEAR THAT THE PRESIDENT TOUCHING HER MONEY WILL BE CONSIDERED A PERSONAL ATTACK" },
  { label: "bank", text: "BANK ALERT: LIZZY'S WALLET HAS REQUESTED ADDITIONAL SECURITY FOLLOWING RECENT SHOPPING ACTIVITY" },
  { label: "president", text: "PRESIDENTIAL TAX REMAINS THE BIGGEST THREAT TO LIZZY'S PEACE — LIZZY HAS VOWED TO CONTINUE FIGHTING, THE PRESIDENT REMAINS AMUSED" },
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
  { label: "breaking", text: "BREAKING: LIZZY HAS ONCE AGAIN SAID “PEOPLE CHANGE” — NOBODY KNOWS WHAT IT MEANS, NOT EVEN LIZZY" },
  { label: "sources", text: "MYSTERY MAN SUCCESSFULLY SURVIVES ANOTHER PHONE CALL WITH LIZZY — SOURCES SAY IT WENT WELL, IDENTITY STILL UNKNOWN" },
  { label: "romance", text: "LIZZY CLAIMS SHE HATES MEN FOR THE 47TH TIME — THEN STAYS UP LATE TALKING TO ONE" },
  { label: "lizzy", text: "MIKAEL'S 11PM BEDTIME REMAINS IN EFFECT — LIZZY INSISTS THIS ISN'T CONTROLLING" },
  { label: "nonsense", text: "LIZZY REQUESTS BOWLING REMATCH — SCOREBOARD OFFICIALS CONFIRM THE DEFEAT STILL COUNTS" },
  { label: "lizzy", text: "LIZZY DESCRIBED AS “A WEIRD SOUL” — FRIENDS CONFIRM IT'S AN OFFICIAL CLASSIFICATION, NOT AN INSULT" },
  { label: "lizzy", text: "SCIENTISTS CONFIRM LIZZY IS STILL PRETTY — EVEN DURING DYING-CAT MODE" },
  { label: "romance", text: "MIKAEL NAMED THE STANDARD — SEVERAL MEN REQUEST A RECOUNT" },
  { label: "romance", text: "LIZZY DECLARES HERSELF THE WOMAN OF MIKAEL'S DREAMS — MIKAEL ADVISED TO CHOOSE HIS NEXT WORDS CAREFULLY" },
  { label: "breaking", text: "BREAKING: LIZZY HAS ONCE AGAIN DECLARED THAT SHE IS NOT BOSSY. EVIDENCE SUGGESTS OTHERWISE" },
  { label: "lizzy", text: "SLEEP ALERT: LIZZY HAS OFFICIALLY PLACED MIKAEL UNDER AN 11PM BEDTIME CURFEW — SHE INSISTS THIS IS “CARING”" },
  { label: "romance", text: "MEN UNDER INVESTIGATION: LIZZY CONTINUES TO COMPLAIN ABOUT MEN WHILE MAKING ONE PARTICULAR EXCEPTION" },
  { label: "sources", text: "MYSTERY CALLS: LIZZY HAS ONCE AGAIN SPENT A SUSPICIOUS AMOUNT OF TIME ON THE PHONE WITH AN UNIDENTIFIED GENTLEMAN" },
  { label: "romance", text: "THE MIKAEL EFFECT: LIZZY CONTINUES TO DENY ITS EXISTENCE DESPITE OVERWHELMING EVIDENCE" },
  { label: "romance", text: "LATE-NIGHT DEVELOPMENT: WOMAN WHO “HATES MEN” SOMEHOW KEEPS STAYING UP LATE TO TALK TO ONE" },
  { label: "nonsense", text: "SPORTS ALERT: LIZZY HAS OFFICIALLY DEMANDED A BOWLING REMATCH FOLLOWING HER PREVIOUS DEFEAT" },
  { label: "exclusive", text: "LEGAL NEWS: MIKAEL HAS BEEN ORDERED TO PROVE HE IS WORTHY OF BEING LIZZY'S LAWYER BEFORE BEING ALLOWED TO DEFEND HER" },
  { label: "exclusive", text: "COURT UPDATE: LIZZY SAYS MIKAEL CAN DEFEND HER IN COURT, BUT APPARENTLY HE STILL NEEDS TO PASS THE LOYALTY TEST" },
  { label: "nonsense", text: "PHILOSOPHICAL ALERT: LIZZY HAS SAID “PEOPLE CHANGE” APPROXIMATELY 400 TIMES THIS WEEK" },
  { label: "sources", text: "INVESTIGATION: EXPERTS ARE NOW QUESTIONING WHETHER “PEOPLE CHANGE” IS A STATEMENT, A WARNING OR A THREAT" },
  { label: "nonsense", text: "FASHION NEWS: LIZZY REMAINS COMMITTED TO HER DREAM OF OWNING APPROXIMATELY 50 MILLION PAIRS OF THE SAME SHOES" },
  { label: "nonsense", text: "PILLOW CRISIS: LIZZY CONTINUES TO BELIEVE THAT EVERY PART OF THE HUMAN BODY DESERVES ITS OWN PILLOW" },
  { label: "lizzy", text: "SCIENTIFIC BREAKTHROUGH: RESEARCHERS CONFIRM LIZZY CAN SOMEHOW LOOK PRETTY EVEN WHILE ALLEGEDLY LOOKING LIKE A DYING CAT" },
  { label: "romance", text: "ROYAL NEWS: LIZZY REPORTEDLY BELIEVES SHE IS THE WOMAN OF MIKAEL'S DREAMS — EXPERTS SAY SHE MAY BE CORRECT" },
  { label: "breaking", text: "BREAKING: LIZZY HAS OFFICIALLY DECLARED MIKAEL “THE STANDARD” — SEVERAL MEN HAVE BEEN ADVISED TO LOWER THEIR EXPECTATIONS" },
  { label: "nonsense", text: "MALE POPULATION ALERT: MEN BUILT LIKE GORILLAS HAVE REPORTEDLY BEEN REMOVED FROM CONSIDERATION" },
  { label: "romance", text: "RELATIONSHIP NEWS: LIZZY CONTINUES TO INSIST SHE HATES MEN — THE EVIDENCE CONTINUES TO DISAGREE" },
  { label: "sources", text: "CLASSIFIED: THE IDENTITY OF LIZZY'S FAVOURITE PHONE-CALL COMPANION REMAINS UNKNOWN — SOURCES REFUSE TO COMMENT" },
  { label: "breaking", text: "BREAKING: LIZZY SAYS SHE'S “JUST CARING” — MIKAEL HAS REPORTEDLY BEEN INSTRUCTED TO SLEEP" },
  { label: "sources", text: "EXPERT OPINION: LIZZY'S DEFINITION OF “NOT BOSSY” APPEARS TO DIFFER SIGNIFICANTLY FROM THE DICTIONARY" },
  { label: "lizzy", text: "CULTURAL NEWS: LIZZY HAS ONCE AGAIN DEMONSTRATED THAT BEING A WEIRD SOUL IS NOT SOMETHING SHE INTENDS TO APOLOGISE FOR" },
  { label: "nonsense", text: "SPORTS: ARCADE CHAMPION LIZZY CONTINUES TO CELEBRATE HER VICTORY AS THOUGH BOWLING NEVER HAPPENED" },
  { label: "president", text: "PRESIDENTIAL NEWS: LIZZY'S ALLEGED CRUSH ON THE PRESIDENT REMAINS ONE OF THE COUNTRY'S MOST POORLY KEPT SECRETS" },
  { label: "president", text: "ROMANCE ALERT: PRESIDENTIAL APPROVAL RATINGS HAVE RISEN SHARPLY FOLLOWING REPORTS OF LIZZY'S CRUSH" },
  { label: "warning", text: "NATIONAL SECURITY: LIZZY HAS BEEN ADVISED NOT TO USE THE PHRASE “PEOPLE CHANGE” WITHOUT FIRST INFORMING AUTHORITIES" },
  { label: "lizzy", text: "BEDTIME BULLETIN: MIKAEL'S BEDTIME REMAINS 11PM — LIZZY'S OWN BEDTIME REMAINS MYSTERIOUSLY FLEXIBLE" },
  { label: "warning", text: "LEGAL WARNING: IF LIZZY GETS HERSELF INTO TROUBLE, MIKAEL IS EXPECTED TO APPEAR IN COURT IMMEDIATELY" },
  { label: "romance", text: "THE MIKAEL EFFECT: DESPITE LIZZY'S CONTINUED DENIAL, THE PHENOMENON APPEARS TO BE GETTING STRONGER" },
  { label: "sources", text: "PUBLIC STATEMENT: LIZZY HAS DENIED BEING BOSSY, CONTROLLING, DRAMATIC, OR SUSPICIOUS — THE INVESTIGATION CONTINUES" },
  { label: "good", text: "GOOD NEWS: DESPITE ALL ALLEGATIONS, EXPERTS CONFIRM LIZZY REMAINS VERY EASY TO LIKE" },
  { label: "president", text: "PRESIDENTIAL DECREE: LIZZY IS OFFICIALLY PERMITTED TO BE WEIRD, DRAMATIC AND SLIGHTLY PROBLEMATIC — PROVIDED SHE REMAINS CUTE" },
  { label: "lizzy", text: "FINAL BULLETIN: LIZZY CONTINUES TO BE A STRANGE COMBINATION OF ATTITUDE, CHAOS, SWEETNESS AND QUESTIONABLE DECISION-MAKING" },

  // --- The Great Lizzy vs Mikael Race ---
  { label: "sports", text: "RED BULL ALERT: LIZZY BELIEVES HER FAVOURITE ENERGY DRINK CAN PROVIDE THE WINGS NEEDED TO DEFEAT MIKAEL" },
  { label: "sports", text: "WING WATCH: LIZZY CONTINUES WAITING FOR HER RED BULL WINGS TO ACTIVATE" },
  { label: "sports", text: "RACE PREP: LIZZY IS PREPARING FOR SPEED. MIKAEL IS PREPARING HIS KNEES" },
  { label: "sports", text: "UNDERDOG ALERT: MIKAEL'S QUESTIONABLE KNEES COULD MAKE THIS ONE OF THE STRANGEST RACES IN SPORTING HISTORY" },
  { label: "sports", text: "BREAKING: LIZZY HAS REPORTEDLY ADDED “DRINK RED BULL” TO HER OFFICIAL RACE STRATEGY" },
  { label: "sports", text: "SPORTS SCIENCE: LIZZY BELIEVES WINGS WILL BEAT KNEES" },
  { label: "sports", text: "MIKAEL CAMP: KNEES REMAIN DOUBTFUL BUT HAVE AGREED TO TRY" },
  { label: "sports", text: "RACE DAY COUNTDOWN: LIZZY SAYS VICTORY IS COMING. MIKAEL'S KNEES SAY “HOPEFULLY.”" },
  { label: "chocolate", text: "BACKUP PLAN: IF THE RED BULL FAILS TO PROVIDE WINGS, LIZZY MAY RESORT TO CHOCOLATE FOR ADDITIONAL MOTIVATION" },
  { label: "sports", text: "OFFICIAL: LIZZY HAS CHALLENGED MIKAEL. MIKAEL HAS ACCEPTED. HIS KNEES WERE NOT CONSULTED" },
  { label: "sports", text: "SPORTING WORLD: ONE COMPETITOR HAS CONFIDENCE. THE OTHER HAS FUNCTIONING-ISH KNEES" },
  { label: "sports", text: "RED BULL SALES: LIZZY'S RACE PREPARATION MAY SINGLE-HANDEDLY SUPPORT THE LOCAL RED BULL ECONOMY" },
  { label: "sports", text: "KNEE WATCH: MIKAEL'S KNEES REMAIN THE BIGGEST QUESTION MARK HEADING INTO THE RACE" },
  { label: "sports", text: "FINAL SPORTS BULLETIN: LIZZY WANTS WINGS. MIKAEL WANTS HIS KNEES TO SURVIVE. THE NATION WANTS THE RACE" },
  { label: "sports", text: "SPORTS ALERT: LIZZY CLAIMS SHE CAN BEAT MIKAEL IN A RACE" },
  { label: "sports", text: "RACE DAY: LIZZY HAS CONFIDENCE. MIKAEL HAS QUESTIONS" },
  { label: "sports", text: "SPORTING HEADLINE: LIZZY HAS ALREADY CELEBRATED A VICTORY IN A RACE THAT HASN'T HAPPENED YET" },
  { label: "sports", text: "EXCLUSIVE: LIZZY SAYS SPEED IS ONE OF HER MANY TALENTS. INDEPENDENT VERIFICATION PENDING" },
  { label: "sports", text: "RED BULL WATCH: LIZZY HAS ONCE AGAIN BEEN SPOTTED WITH A CAN IN HAND" },
  { label: "sports", text: "BREAKING: LIZZY'S RED BULL SUPPLY HAS BEEN DESCRIBED AS “STRATEGIC”" },

  // --- The Chocolate Files ---
  { label: "chocolate", text: "CHOCOLATE ALERT: LIZZY REPORTEDLY NEEDS ONLY TWO BITES TO FINISH AN ENTIRE SLAB" },
  { label: "chocolate", text: "SECURITY WARNING: AUTHORITIES ADVISE LIZZY NOT TO ACCEPT SUSPICIOUS CHOCOLATE FROM STRANGERS" },
  { label: "chocolate", text: "BREAKING: CHOCOLATE HAS BEEN CLASSIFIED AS LIZZY'S MOST EFFECTIVE KNOWN WEAKNESS" },
  { label: "chocolate", text: "NATIONAL EMERGENCY: LIZZY HAS DISCOVERED ANOTHER CHOCOLATE SLAB" },
  { label: "chocolate", text: "ECONOMIC REPORT: CHOCOLATE CONSUMPTION RISES SHARPLY WHENEVER LIZZY IS NEARBY" },
  { label: "chocolate", text: "WORLD RECORD WATCH: LIZZY REPORTEDLY FINISHES CHOCOLATE FASTER THAN SOME ATHLETES FINISH A 100M SPRINT" },
  { label: "chocolate", text: "CHOCOLATE SPRINT: LIZZY DOESN'T EAT CHOCOLATE — SHE RACES IT" },
  { label: "chocolate", text: "NEW SPORT: COMPETITIVE CHOCOLATE EATING MAY SOON BECOME LIZZY'S STRONGEST SPORTING DISCIPLINE" },
  { label: "chocolate", text: "STOPWATCH NEEDED: OFFICIALS ARE REQUESTING HIGH-SPEED CAMERAS TO ACCURATELY MEASURE LIZZY'S CHOCOLATE CONSUMPTION" },
  { label: "chocolate", text: "BREAKING: CHOCOLATE SLAB LASTS APPROXIMATELY TWO BITES AGAINST LIZZY" },
  { label: "chocolate", text: "GOLD MEDAL PERFORMANCE: LIZZY DESTROYS CHOCOLATE IN RECORD TIME" },
  { label: "chocolate", text: "SPORTING WARNING: DO NOT PLACE AN OPEN CHOCOLATE SLAB WITHIN LIZZY'S LINE OF SIGHT" },
  { label: "chocolate", text: "ATHLETIC SCIENCE: RESEARCHERS BELIEVE LIZZY'S CHOCOLATE-EATING SPEED COULD BE TRANSFERABLE TO OTHER SPORTING EVENTS" },
  { label: "nonsense", text: "SPORTING NEWS: LIZZY WANTS A BOWLING REMATCH, BUT EXPERTS HAVE SUGGESTED SHE FIRST COMPETE IN THE CHOCOLATE OLYMPICS" },
  { label: "chocolate", text: "CHAMPIONSHIP UPDATE: LIZZY'S CHOCOLATE RECORD REMAINS UNDEFEATED BECAUSE NOBODY ELSE HAS BEEN GIVEN ENOUGH TIME TO COMPETE" },
  { label: "chocolate", text: "BREAKING: LIZZY HAS BEEN DISQUALIFIED FROM A CHOCOLATE-EATING COMPETITION FOR FINISHING BEFORE THE STARTING OFFICIAL SAID “GO”" },
  { label: "warning", text: "SAFETY ALERT: CHOCOLATE SHOULD NEVER BE LEFT UNATTENDED AROUND LIZZY" },
  { label: "chocolate", text: "PERFORMANCE REPORT: LIZZY'S CHOCOLATE CONSUMPTION SPEED CONTINUES TO IMPROVE. SCIENTISTS ARE WORRIED" },
  { label: "chocolate", text: "CHOCOLATE VS LIZZY: THE CHOCOLATE NEVER STOOD A CHANCE" },
  { label: "chocolate", text: "SPORTS HISTORY: LIZZY HAS OFFICIALLY TURNED EATING CHOCOLATE INTO AN ENDURANCE SPORT FOR EVERYONE WATCHING HER TRY TO STOP" },

  // --- Horror Movie & Loyalty Files ---
  { label: "lizzy", text: "HORROR NEWS: LIZZY CONTINUES ATTEMPTING TO FORCE MIKAEL INTO WATCHING A HORROR MOVIE" },
  { label: "lizzy", text: "CULTURAL SHOCK: LIZZY HAS DESCRIBED HORROR MOVIES AS “CUTE”" },
  { label: "lizzy", text: "HORROR UPDATE: MIKAEL CONTINUES TO RESIST. LIZZY CONTINUES TO CAMPAIGN" },
  { label: "nonsense", text: "LOYALTY CRISIS: LIZZY LAUGHED WHILE MIKAEL WAS BEING BULLIED BY A CHILD" },
  { label: "exclusive", text: "LEGAL UPDATE: LIZZY CONFIRMS SHE WILL SUPPORT MIKAEL “MOST OF THE TIME”" },
  { label: "sources", text: "FINE PRINT: NOBODY KNOWS WHAT HAPPENS DURING THE REMAINING PERCENTAGE" },
  { label: "exclusive", text: "COURTROOM BULLETIN: LIZZY'S PROMISE TO “BE ON MIKAEL'S SIDE” CONTAINS SEVERAL UNDISCLOSED CONDITIONS" },
  { label: "good", text: "POSITIVE NEWS: BENEATH ALL THE TEASING, LIZZY APPARENTLY CARES ENOUGH TO KEEP MIKAEL IN CHECK — EVEN IF SHE OCCASIONALLY LAUGHS AT HIS SUFFERING" },
  { label: "breaking", text: "FINAL BULLETIN: LIZZY HATES MEN, LOVES CHOCOLATE, DRINKS RED BULL, ENJOYS HORROR MOVIES, WANTS TO WIN RACES AND SOMEHOW REMAINS CONVINCED SHE IS COMPLETELY NORMAL" },
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
  {
    title: "A Message To The People",
    body: [
      "The President Addresses the Nation After Lizzy Declares War on Taxes",
      "— Office of the President",
      "The President has officially acknowledged the concerns raised by Lizzy regarding the possibility of a new presidential tax.",
      "Lizzy has reportedly complained, protested, questioned the President's motives and generally made it very clear that she does not support the proposed taxation.",
      "The President would like to clarify that no final decision has been made.",
      "Lizzy remains unconvinced.",
    ],
  },
  {
    title: "A Presidential Reminder: People Do, In Fact, Change",
    body: [
      "— Office of the President",
      "The President has taken note of Lizzy's recent obsession with the phrase “people change.”",
      "The phrase has appeared with increasing frequency in conversations, leading experts to question whether Lizzy is simply making an observation or quietly preparing the nation for something.",
      "The President has ordered an investigation.",
      "Lizzy has refused to comment.",
    ],
  },
  {
    title: "The President Confirms: Lizzy Is Allowed To Be Weird",
    body: [
      "— Office of the President",
      "Following several reports describing Lizzy as a “weird soul,” the President has issued a statement confirming that weirdness is not a criminal offence.",
      "In fact, the President believes it is one of Lizzy's most entertaining qualities.",
      "Citizens are encouraged to remain themselves, embrace their weirdness and stop trying to act normal for the sake of society.",
    ],
  },
  {
    title: "Treasury Under Pressure As Lizzy Fights Proposed Tax",
    body: [
      "— Finance Desk",
      "The nation's financial department remains under intense pressure after Lizzy launched a campaign against the possibility of a new tax.",
      "Sources say she has questioned the President's intentions and strongly objected to the idea of giving away any more of her money.",
      "Treasury officials have reportedly concluded that Lizzy is extremely passionate about two things: keeping her money and spending it herself.",
    ],
  },
  {
    title: "Lizzy Demands To Know Where Her Money Is Going",
    body: [
      "— Finance Desk",
      "After rumours of additional taxation began circulating, Lizzy reportedly demanded transparency from the government.",
      "“What exactly is this tax for?” sources report she asked.",
      "The government has prepared a detailed response.",
      "Lizzy has requested that the response include a section explaining why the government is entitled to any of her money in the first place.",
    ],
  },
  {
    title: "Economists Discover New Form Of Financial Resistance",
    body: [
      "— Finance Desk",
      "Experts have identified a new economic phenomenon following Lizzy's refusal to accept the possibility of additional taxation.",
      "The phenomenon has been named: Lizzy's Financial Independence Movement.",
      "Its primary objective is simple: nobody touches Lizzy's money.",
    ],
  },
  {
    title: "Lizzy Claims She Hates Men — Then Stays Up Until 2AM Talking To One",
    body: [
      "— Lifestyle Desk",
      "In what experts are calling one of the year's greatest contradictions, Lizzy has repeatedly expressed her frustration with men.",
      "However, this position appears to have one significant exception.",
      "Sources confirm that Lizzy has repeatedly stayed up late talking to a certain male individual despite allegedly hating men.",
      "When confronted with the evidence, Lizzy reportedly denied the existence of what analysts have dubbed “The Mikael Effect.”",
      "Scientists remain unconvinced.",
    ],
  },
  {
    title: "The Mikael Effect: Myth Or Medical Condition?",
    body: [
      "— Special Investigation",
      "The Mikael Effect refers to the mysterious phenomenon whereby Lizzy suddenly becomes willing to stay awake significantly later than planned because she is talking to a certain person.",
      "Lizzy has denied that the phenomenon exists.",
      "Unfortunately for her, the evidence continues to accumulate.",
      "Experts have recommended that she simply admit it.",
      "Lizzy has declined.",
    ],
  },
  {
    title: "Lizzy Orders Mikael To Sleep At 11PM — Insists She Is Not Bossy",
    body: [
      "— Lifestyle Desk",
      "Lizzy has recently introduced a new policy requiring Mikael to sleep at approximately 11PM.",
      "When questioned about whether this constitutes controlling behaviour, Lizzy rejected the allegation.",
      "“I'm not being bossy. I care.”",
      "The distinction has been sent to legal experts for review.",
      "The legal experts are still laughing.",
    ],
  },
  {
    title: "Lizzy's New Sleep Policy Sparks National Debate",
    body: [
      "— Lifestyle Desk",
      "Citizens have questioned how someone who regularly stays up late talking to Mikael can simultaneously enforce an 11PM bedtime for him.",
      "Lizzy maintains that the rules are different because she is “looking after him.”",
      "The government has officially classified this argument as: Extremely Lizzy.",
    ],
  },
  {
    title: "Mystery Phone Calls Continue — Government Has No Idea Who The Man Is",
    body: [
      "— Lifestyle Desk",
      "Lizzy has once again been spotted enjoying lengthy phone conversations with an unidentified male.",
      "The identity of the individual remains classified.",
      "Officials have confirmed that the government will not be wiretapping Lizzy's phone.",
      "However, several highly curious journalists have admitted they would like to know.",
      "Lizzy has simply smiled and refused to provide answers.",
    ],
  },
  {
    title: "Lizzy's Phone Calls Become Subject Of National Investigation",
    body: [
      "— Special Report",
      "Who is she talking to? Why does she enjoy these calls so much? Why does she suddenly have so much to say?",
      "And most importantly... why does she claim to hate men?",
      "The Daily Gobshite has more questions than answers.",
    ],
  },
  {
    title: "Lizzy Demands Mikael Prove He Is Worthy Of Being Her Lawyer",
    body: [
      "— Court Correspondent",
      "Following several hypothetical incidents involving Lizzy and questionable decision-making, she has reportedly informed Mikael that he must continuously prove himself worthy of representing her in court.",
      "The reason? According to Lizzy: “People change.”",
      "Legal analysts have described this as an unusually aggressive hiring policy.",
      "Mikael remains employed. For now.",
    ],
  },
  {
    title: "Lizzy Confirms Mikael Will Defend Her In Court",
    body: [
      "— Legal Desk",
      "Despite constantly making Mikael prove his worth, Lizzy has reportedly confirmed that she would trust him to defend her should she ever find herself in legal trouble.",
      "This raises an important question: why does she trust him with her freedom but not with his bedtime?",
      "The court has no answer.",
    ],
  },
  {
    title: "Courtroom Preparations Begin After Lizzy Does Something Questionable",
    body: [
      "— Breaking News",
      "Legal preparations have reportedly begun following concerns that Lizzy may once again do something she probably shouldn't.",
      "Mikael has been instructed to prepare his opening statement, closing argument and emergency evidence file.",
      "Lizzy has denied wrongdoing.",
      "The phrase “people change” has once again been heard in the courtroom.",
      "The prosecution is concerned.",
    ],
  },
  {
    title: "Lawyer Mikael Faces Toughest Case Of His Career: Defending Lizzy From Her Own Decisions",
    body: [
      "— Court Special",
      "The case appears straightforward. The defendant is Lizzy. The lawyer is Mikael.",
      "The problem? The lawyer must somehow convince everyone that Lizzy is innocent while simultaneously knowing exactly what she did.",
      "Legal experts have called the case: “A nightmare.”",
      "Mikael has reportedly accepted the challenge.",
    ],
  },
  {
    title: "Lizzy Demands Bowling Rematch After Historic Defeat",
    body: [
      "— Sports Desk",
      "Following her shocking defeat at the hands of the President's favourite legal representative, Lizzy has formally requested a rematch.",
      "She has reportedly refused to accept the previous result as a true reflection of her ability.",
      "Officials have confirmed that the original scoreboard remains legally valid.",
      "Lizzy disagrees.",
    ],
  },
  {
    title: "Bowling Rematch Could Become The Most Anticipated Sporting Event Of The Year",
    body: [
      "— Sports Desk",
      "Fans are preparing for the highly anticipated rematch.",
      "Lizzy enters the contest determined to restore her reputation. Mikael enters knowing that victory could have consequences.",
      "Experts predict: drama, trash talk, questionable celebrations, and potentially another devastating defeat.",
    ],
  },
  {
    title: "Arcade Champion Lizzy Ready To Defend Her Honour",
    body: [
      "— Sports Desk",
      "After defeating Mikael at the arcade, Lizzy has officially restored some of the sporting reputation lost during the infamous bowling incident.",
      "The sporting series currently stands at: Bowling — Mikael. Arcade — Lizzy. Overall — War.",
    ],
  },
  {
    title: "Lizzy's Pillow Obsession Continues To Escalate",
    body: [
      "— Lifestyle Desk",
      "Lizzy continues to insist that a bed can never contain too many pillows.",
      "Her philosophy is simple: every part of the body deserves support.",
      "This has led experts to question whether Lizzy is sleeping in a bed or simply living inside a pillow warehouse.",
    ],
  },
  {
    title: "Lizzy Claims Even Her Toes Deserve A Pillow",
    body: [
      "— Lifestyle Investigation",
      "A new development in the ongoing pillow debate has shocked the nation.",
      "Lizzy reportedly believes that virtually every part of the human body deserves pillow support.",
      "Scientists have been unable to determine where the theory ends.",
      "Lizzy says it doesn't.",
    ],
  },
  {
    title: "Lizzy Declares Mikael “The Standard”",
    body: [
      "— Society & Culture Desk",
      "In an unexpected development, Lizzy has reportedly declared Mikael to be “THE STANDARD.”",
      "The statement has sent shockwaves through the male population.",
      "According to sources, the comment was specifically made while comparing Mikael favourably against certain men who are “built like gorillas.”",
      "The gorilla community has requested clarification.",
    ],
  },
  {
    title: "Lizzy Says She Is The Woman Of Mikael's Dreams",
    body: [
      "— Society Desk",
      "Lizzy has reportedly reached a conclusion regarding her position in Mikael's life.",
      "She believes she is the woman of his dreams.",
      "Experts have reviewed the available evidence. Their conclusion: she may actually have a point.",
    ],
  },
  {
    title: "New Study: Lizzy Remains Pretty Even When She Looks Like A Dying Cat",
    body: [
      "— Beauty & Science Desk",
      "Scientists have conducted extensive research into an unusual phenomenon.",
      "Even when Lizzy is tired, sick, exhausted or allegedly resembling a dying cat, she somehow remains attractive.",
      "Researchers have failed to identify the biological mechanism responsible.",
      "Lizzy has simply accepted the compliment.",
    ],
  },
  {
    title: "The People Change File",
    body: [
      "— Daily Gobshite Investigations Unit",
      "The phrase has become unavoidable. “People change.”",
      "Lizzy has used it repeatedly in recent conversations, prompting investigators to ask: is it merely an observation? A warning? A philosophical belief? Or is Lizzy preparing the public for a major character development?",
      "The Daily Gobshite will continue investigating.",
    ],
  },
  {
    title: "Who Is The Mystery Man?",
    body: [
      "— Classified Investigation",
      "Lizzy has been making frequent phone calls with an unidentified male.",
      "Sources confirm the conversations appear enjoyable.",
      "The identity of the man remains unknown.",
      "The Daily Gobshite has several theories.",
      "Unfortunately, none can be confirmed without access to classified information.",
      "Lizzy has refused to comment.",
    ],
  },
  {
    title: "The Case Of The Missing “I'm Not Bossy” Defence",
    body: [
      "— Special Investigation",
      "Lizzy has repeatedly insisted that she is not bossy. She simply cares.",
      "The evidence currently includes: establishing Mikael's bedtime, telling him when he should sleep, questioning his decisions, ensuring he takes care of himself, then insisting none of this constitutes bossiness.",
      "Investigators have concluded: the case remains open.",
    ],
  },

  // --- The Great Lizzy vs Mikael Race ---
  {
    title: "Lizzy Turns To Red Bull In Search Of The Wings Needed To Defeat Mikael",
    body: [
      "— Sports Desk",
      "With the highly anticipated Lizzy vs Mikael race approaching, Lizzy has reportedly identified the secret weapon she believes will secure victory: Red Bull.",
      "Sources say Lizzy believes enough cans could provide the speed — or more importantly, the wings — required to leave Mikael behind.",
      "Sports scientists have questioned whether the wings will actually appear.",
      "Lizzy remains confident.",
    ],
  },
  {
    title: "Red Bull Stock Rises As Lizzy Prepares For The Big Race",
    body: [
      "Red Bull suppliers are reportedly preparing for an unexpected surge in demand.",
      "Lizzy has apparently decided that normal training isn't enough. She needs wings.",
      "Mikael's camp has responded with a simple statement: “We'll see.”",
    ],
  },
  {
    title: "Lizzy's Race Strategy Revealed: Drink Red Bull And Run Very Fast",
    body: [
      "Sources close to Lizzy have revealed her highly sophisticated race strategy.",
      "Step one: Drink Red Bull. Step two: Obtain wings. Step three: Run. Step four: Defeat Mikael.",
      "Experts have praised the simplicity of the plan.",
      "Whether physics agrees remains unclear.",
    ],
  },
  {
    title: "Mikael Enters Race As Unexpected Underdog",
    body: [
      "Despite Lizzy's confidence, analysts have identified one major factor that could dramatically alter the contest: Mikael's knees.",
      "Reports indicate that Mikael will be entering the race with knees that are less than ideal for operating at maximum performance.",
      "This has led some experts to classify him as the underdog.",
      "However, Mikael has reportedly stated that he only needs his knees to cooperate for long enough to reach the finish line.",
      "His knees have not yet confirmed their participation.",
    ],
  },
  {
    title: "Knees Hold Emergency Meeting Ahead Of Lizzy Race",
    body: [
      "Mikael's knees have reportedly held a private meeting regarding their involvement in the upcoming race.",
      "Sources say the agenda included: whether running is absolutely necessary, how much pain is acceptable, whether walking would technically count, and whether Lizzy can be distracted with chocolate.",
      "No final decision has been reached.",
    ],
  },
  {
    title: "Lizzy Has Wings. Mikael Has Questionable Knees. The Race Is On.",
    body: [
      "The sporting world has never seen a matchup quite like this.",
      "On one side: Lizzy — powered by Red Bull and unreasonable confidence.",
      "On the other: Mikael — powered by determination and knees currently operating under questionable conditions.",
      "Experts have no idea what will happen. Which is exactly why they intend to watch.",
    ],
  },
  {
    title: "Mikael's Knees Issue Statement: “We'll Do Our Best”",
    body: [
      "With the race approaching, Mikael's knees have finally released an official statement.",
      "“We cannot guarantee anything.”",
      "The statement has done little to reassure supporters. Mikael remains committed to competing.",
    ],
  },
  {
    title: "Red Bull Becomes Official Lizzy Race Sponsor — Unofficially",
    body: [
      "— Lifestyle & Culture Desk",
      "Lizzy's love of Red Bull has taken a new turn after she reportedly began viewing the energy drink as a potential athletic performance strategy.",
      "Sources say she is convinced the drink can provide the wings necessary to defeat Mikael.",
      "Red Bull has yet to confirm whether it has officially accepted responsibility for this.",
    ],
  },
  {
    title: "Experts Ask: How Many Red Bulls Does It Take To Grow Wings?",
    body: [
      "Scientists have confirmed that drinking Red Bull does not literally cause wings to appear.",
      "Lizzy has reportedly rejected the scientific evidence.",
      "She believes they simply haven't tested enough cans.",
    ],
  },
  {
    title: "The Great Race: Nation Divided Over Whether Lizzy's Wings Or Mikael's Determination Will Prevail",
    body: [
      "The upcoming race has become one of the country's most discussed sporting events.",
      "Lizzy has confidence. Mikael has determination. Red Bull has allegedly been recruited. And Mikael's knees have been asked to perform above their current job description.",
      "Nobody knows who will win. Everyone wants to see it.",
    ],
  },
  {
    title: "Mystery Of Mikael's Knees Deepens",
    body: [
      "Medical experts have refused to comment on the condition of Mikael's knees after being told that the only available description was: “They're not exactly at 100%.”",
      "Mikael has nevertheless agreed to race.",
      "His knees have filed an objection.",
    ],
  },
  {
    title: "The President Comments On The Race",
    body: [
      "The President has been asked for his thoughts on the upcoming Lizzy vs Mikael race.",
      "His response: “I have full confidence in both competitors. However, I would advise Mikael's knees to begin negotiations immediately.”",
      "The Presidency has declined further comment.",
    ],
  },

  // --- The Chocolate Files ---
  {
    title: "Chocolate Slab Vanishes In Record Time — Lizzy Named Prime Suspect",
    body: [
      "— Lifestyle Desk",
      "A shocking new report has revealed that Lizzy's relationship with chocolate may have gone beyond what scientists consider reasonable.",
      "Sources claim that once a chocolate slab enters her possession, it has an extremely limited life expectancy.",
      "According to eyewitnesses, all it takes is two bites. The first bite establishes ownership. The second bite apparently establishes that the entire slab must now disappear.",
      "Chocolate manufacturers have been advised to increase security.",
    ],
  },
  {
    title: "Kidnapper's Dream Target: Lizzy And A Bar Of Chocolate",
    body: [
      "— Special Investigation",
      "Security experts have issued a bizarre warning after discovering Lizzy's extreme love for chocolate.",
      "According to investigators, a kidnapper attempting to lure Lizzy away would apparently need only one thing: chocolate. No elaborate plan, no suspicious van, no complicated negotiation — just hold up a chocolate bar and wait.",
      "Authorities have strongly advised Lizzy to reconsider her chocolate-based decision-making.",
      "Lizzy has reportedly ignored this advice.",
    ],
  },
  {
    title: "Chocolate Industry Declares Lizzy A “High-Value Customer”",
    body: [
      "Chocolate companies around the country are celebrating after reports revealed that Lizzy can apparently destroy an entire slab in approximately two bites.",
      "Industry analysts predict record chocolate sales.",
      "Dentists are concerned. Lizzy is not.",
    ],
  },
  {
    title: "Lizzy Breaks World Record For Fastest Chocolate Consumption",
    body: [
      "— Sports Desk, Special Chocolate Edition",
      "A new unofficial world record may have been set after Lizzy reportedly demolished an entire chocolate slab in just two bites.",
      "Sports scientists have reviewed the footage. Their conclusion? “We have never seen anything like it.”",
      "Officials are now considering whether competitive chocolate eating should become an Olympic sport.",
      "Lizzy has already entered herself.",
    ],
  },
  {
    title: "Chocolate Eating Championship: Lizzy Vs The Clock",
    body: [
      "The challenge appeared simple: one chocolate slab, one contestant, one stopwatch.",
      "The result was anything but simple.",
      "Lizzy reportedly finished the chocolate so quickly that officials initially believed she had dropped it. Upon closer inspection, they discovered she had simply eaten the entire thing.",
    ],
  },
  {
    title: "Lizzy's Two-Bite Technique Leaves Sports World Speechless",
    body: [
      "Athletes spend years perfecting their techniques. Sprinters train their starts. Swimmers perfect their turns. Footballers practise their finishing.",
      "Lizzy apparently just looks at a chocolate slab and thinks: “That's mine.”",
      "Two bites later, the competition is over.",
    ],
  },
  {
    title: "New Sport Proposed: The Lizzy Chocolate Speed Challenge",
    body: [
      "Following her extraordinary chocolate consumption speed, sporting officials have proposed a brand-new event: The Lizzy Challenge.",
      "Rules: 1. Receive chocolate. 2. Eat chocolate. 3. Try not to blink. 4. Hope the chocolate lasts longer than 30 seconds.",
      "Lizzy has reportedly requested a harder difficulty.",
    ],
  },
  {
    title: "Chocolate Slab Fails To Complete Full Match Against Lizzy",
    body: [
      "In what has become an increasingly common occurrence, a chocolate slab has failed to survive its encounter with Lizzy.",
      "The slab entered the contest confident. It left as a memory.",
      "Sports analysts have described the performance as: “Ruthless.”",
    ],
  },
  {
    title: "Lizzy Enters Chocolate Grand Prix",
    body: [
      "The Chocolate Grand Prix has officially begun, and Lizzy has emerged as the favourite after demonstrating extraordinary acceleration between opening the wrapper and taking her first bite.",
      "Experts say her reaction time is exceptional.",
      "Her opponents have been advised to hide their chocolate.",
    ],
  },

  // --- Horror Movie & Loyalty Files ---
  {
    title: "Lizzy Launches Campaign To Force Mikael Into Watching Horror Movie",
    body: [
      "— Entertainment Desk",
      "Lizzy has reportedly begun an aggressive campaign to convince Mikael to watch a horror movie.",
      "Despite repeated resistance, negotiations remain ongoing.",
      "Lizzy's primary argument appears to be: “It's cute.”",
      "The statement has confused the nation's horror experts.",
    ],
  },
  {
    title: "Lizzy Calls Horror Movies “Cute” — Psychologists Request Explanation",
    body: [
      "Most people describe horror movies using words such as terrifying, disturbing or frightening.",
      "Lizzy has chosen a different approach: cute.",
      "The Daily Gobshite has investigated several horror films and found absolutely nothing cute about people being chased through dark houses.",
      "Lizzy remains unconvinced.",
    ],
  },
  {
    title: "Horror Movie Negotiations Enter Second Week",
    body: [
      "Lizzy continues to pressure Mikael into watching a horror movie.",
      "Mikael has reportedly presented several reasonable objections. Lizzy has reportedly ignored all of them.",
      "The movie has still not been watched. The battle continues.",
    ],
  },
  {
    title: "Lizzy Laughs As Mikael Is Bullied By Child",
    body: [
      "— Breaking News, Mikael & Lizzy Desk",
      "In a shocking display of questionable loyalty, Lizzy was recently caught laughing while Mikael was being bullied by a child.",
      "Witnesses report that instead of immediately coming to his defence, Lizzy found the situation hilarious.",
      "When questioned about her actions, Lizzy reminded the public that she has previously promised to be on Mikael's side “most of the time.”",
      "The words “most of the time” have now been submitted as evidence.",
    ],
  },
  {
    title: "Lizzy Announces New Support Policy: “I'll Be On Your Side... Most Of The Time”",
    body: [
      "Lizzy has formally clarified her position regarding Mikael's future legal, personal and social battles.",
      "She will apparently support him. Usually. Probably. Unless something is funny. Or unless she disagrees. Or unless a child starts bullying him and she finds it entertaining.",
      "Mikael has reportedly requested the full terms and conditions.",
    ],
  },
  {
    title: "Loyalty Under Investigation After Lizzy Laughs During Mikael Incident",
    body: [
      "The nation is asking one important question: if Lizzy promises to be on Mikael's side most of the time... what happens during the other part?",
      "Investigators have been unable to obtain an answer.",
    ],
  },

  // --- The Great Lizzy Speed Trial ---
  {
    title: "Lizzy Claims She Can Beat Mikael In A Race",
    body: [
      "— Sports Desk",
      "Lizzy has reportedly made a bold declaration: she believes she can beat Mikael in a race.",
      "The statement has been met with scepticism from several sporting analysts. Lizzy, however, appears extremely confident.",
      "A race has yet to take place. The Daily Gobshite has officially classified the upcoming contest as: The Great Lizzy Speed Trial.",
    ],
  },
  {
    title: "Sporting World Awaits Lizzy Vs Mikael Race",
    body: [
      "Two competitors. One finish line. Absolutely no scientific evidence supporting Lizzy's confidence.",
      "The proposed race has already generated significant interest, with Lizzy insisting that victory is practically guaranteed.",
      "Mikael has reportedly been advised to train. Lizzy has reportedly been advised to prove it.",
    ],
  },
  {
    title: "Lizzy's Confidence Levels Reach Athletic Proportions",
    body: [
      "After claiming she could beat Mikael in a race, Lizzy has apparently accepted the responsibility of proving it.",
      "Sports analysts have one simple question: when is race day?",
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
