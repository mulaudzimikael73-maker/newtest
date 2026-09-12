import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Masthead,
  SectionTitle,
  HeadlineItem,
  MarketBox,
  NoticeBox,
  Colophon,
  LabelChip,
} from "@/components/newspaper";
import { getDailyEdition } from "@/lib/news-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Micky's Daily News — Front Page" },
      {
        name: "description",
        content:
          "Breaking news, Lizzy Watch, investigations and national nonsense. Because somebody has to report the important stuff.",
      },
      { property: "og:title", content: "Micky's Daily News — Front Page" },
      {
        property: "og:description",
        content: "Because somebody has to report the important stuff.",
      },
    ],
  }),
  component: FrontPage,
});

function FrontPage() {
  const { lead, secondary, bulletin, money, leadStories } = getDailyEdition();

  return (
    <div className="paper min-h-screen">
      <Masthead edition="Because somebody has to report the important stuff." />

      <main className="mx-auto max-w-6xl px-4 pb-10">
        {/* Lead */}
        <section className="grid gap-8 py-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <LabelChip name={lead.label} />
            <h2 className="pt-3 font-display text-4xl leading-[1.05] font-black uppercase sm:text-6xl">
              {lead.text}
            </h2>
            <div className="mt-4 rule-double" />
            <div className="mt-4 gap-6 font-body text-[0.95rem] leading-relaxed sm:columns-2">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:font-black">
                Witnesses report that all ordinary activity in the area stopped the moment Lizzy
                walked in. Traffic slowed. Conversations ended. One man reportedly forgot his own
                name and had to be escorted home by officials.
              </p>
              <p className="mt-3">
                Our correspondent — who insists he was “just passing by” — described the scene as
                “completely normal, why are you asking me that.” The newspaper has chosen to print
                his statement anyway.
              </p>
              <p className="mt-3">
                Authorities have advised the public to remain calm, remain seated, and accept that
                for the remainder of the day nothing else is going to be the main story.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <MarketBox />
            <NoticeBox label="good">
              Lizzy smiled today. Markets immediately recovered.
            </NoticeBox>
            <NoticeBox label="warning">
              The following pages contain irresponsible spending. Reader discretion is advised.
            </NoticeBox>
            <div className="border-2 border-border bg-card p-4">
              <p className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">
                Inside today's edition
              </p>
              <ul className="mt-3 space-y-2 font-body text-sm">
                <li>
                  <Link to="/bank" className="underline decoration-dotted underline-offset-4 hover:text-accent">
                    🏦 The Bank &amp; Funds — the balance is not looking great
                  </Link>
                </li>
                <li>
                  <Link to="/president" className="underline decoration-dotted underline-offset-4 hover:text-accent">
                    🇿🇦 Words From The President — today's official statements
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Secondary */}
        <section className="grid gap-6 border-t-4 border-border pt-6 md:grid-cols-3">
          {secondary.map((h, i) => (
            <article key={h.text} className="border-l border-border pl-4 first:border-l-0 first:pl-0">
              <LabelChip name={h.label} />
              <h3 className="pt-2 font-display text-xl leading-tight font-bold uppercase">
                {h.text}
              </h3>
              <p className="pt-2 font-body text-sm leading-relaxed text-muted-foreground">
                Full story on page {(i % 8) + 2}. Sources declined to comment,
                then commented extensively.
              </p>
            </article>
          ))}
        </section>

        {/* Headlines bulletin */}
        <section className="mt-12">
          <SectionTitle kicker="Today's bulletin. Fresh headlines every morning, no fact-checking department.">
            🗞️ Headlines Bulletin
          </SectionTitle>
          <div className="gap-8 md:columns-2 lg:columns-3">
            {bulletin.map((h) => (
              <HeadlineItem key={h.text} item={h} />
            ))}
          </div>
        </section>

        {/* Lead financial stories */}
        <section className="mt-12">
          <SectionTitle kicker="Our economics desk, reporting under difficult conditions.">
            💰 Economy Watch
          </SectionTitle>
          <div className="grid gap-8 md:grid-cols-3">
            {leadStories.map((s) => (
              <article key={s.title}>
                <h3 className="font-display text-xl leading-tight font-bold">{s.title}</h3>
                <div className="mt-2 border-t border-border pt-2 font-body text-sm leading-relaxed">
                  {s.body.map((p) => (
                    <p key={p} className="mt-2 first:mt-0">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Finance headlines */}
        <section className="mt-12">
          <SectionTitle kicker="Everything involving Lizzy's money.">
            📉 The Money Pages
          </SectionTitle>
          <div className="gap-8 md:columns-2 lg:columns-3">
            {money.map((h) => (
              <HeadlineItem key={h.text} item={h} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/bank"
              className="inline-block border-2 border-border px-5 py-2 font-mono text-[0.7rem] tracking-widest uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Continue to The Bank &amp; Funds →
            </Link>
          </div>
        </section>

        <Colophon />
      </main>
    </div>
  );
}
