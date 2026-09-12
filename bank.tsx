import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Masthead,
  SectionTitle,
  MarketBox,
  NoticeBox,
  Colophon,
  LabelChip,
} from "@/components/newspaper";
import { getDailyEdition } from "@/lib/news-data";

export const Route = createFileRoute("/bank")({
  head: () => ({
    meta: [
      { title: "The Bank & Funds — Micky's Daily News" },
      {
        name: "description",
        content:
          "The financial desk of Micky's Daily News: Lizzy's balance, the Lizzy Emergency Fund, and why 'it was on sale' is not a financial plan.",
      },
      { property: "og:title", content: "The Bank & Funds — Micky's Daily News" },
      {
        property: "og:description",
        content: "Bank officials confirm: her balance is not looking great.",
      },
    ],
  }),
  component: BankPage,
});

function BankPage() {
  const { leadStories, bankAlerts } = getDailyEdition();

  return (
    <div className="paper min-h-screen">
      <Masthead edition="Section 2 · The Bank & Funds — our economics desk, under pressure." />

      <main className="mx-auto max-w-6xl px-4 pb-10">
        <section className="grid gap-8 py-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <LabelChip name="bank" />
            <h2 className="pt-3 font-display text-4xl leading-[1.05] font-black uppercase sm:text-5xl">
              Lizzy's Bank Account Enters Recovery Programme
            </h2>
            <div className="mt-4 rule-double" />
            <div className="mt-4 gap-6 font-body text-[0.95rem] leading-relaxed sm:columns-2">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:font-black">
                Following a difficult quarter, officials have placed Lizzy's account into a
                supervised recovery programme. The account is described as “stable but emotional.”
              </p>
              <p className="mt-3">
                The programme includes weekly check-ins, a spending limit Lizzy has already taken
                personally, and a bank manager who now hides when she walks in.
              </p>
              <p className="mt-3">
                Micky, appointed Temporary Minister of Lizzy's Finances, issued a one-word
                statement: “Please.”
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <MarketBox />
            <NoticeBox label="warning">
              The following story contains irresponsible spending.
            </NoticeBox>
            <NoticeBox label="lizzy">
              Her account balance may be low. Her value is not.
            </NoticeBox>
          </div>
        </section>

        <section className="mt-6">
          <SectionTitle kicker="Three ongoing national situations.">
            📈 Financial Reports
          </SectionTitle>
          <div className="grid gap-8 md:grid-cols-3">
            {leadStories.map((s) => (
              <article key={s.title} className="border-t-2 border-border pt-3">
                <h3 className="font-display text-xl leading-tight font-bold">{s.title}</h3>
                {s.body.map((p) => (
                  <p key={p} className="mt-2 font-body text-sm leading-relaxed">
                    {p}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionTitle kicker="Filed daily by our long-suffering banking correspondent.">
            🏦 Bank Alerts
          </SectionTitle>
          <ol className="gap-8 md:columns-2">
            {bankAlerts.map((s, i) => (
              <li
                key={s}
                className="mb-3 break-inside-avoid border-b border-dashed border-border pb-3 font-body text-sm leading-relaxed"
              >
                <span className="mr-2 font-mono text-[0.7rem] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10 text-center">
          <Link
            to="/president"
            className="inline-block border-2 border-border px-5 py-2 font-mono text-[0.7rem] tracking-widest uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Next: Words From The President →
          </Link>
        </div>

        <Colophon />
      </main>
    </div>
  );
}
