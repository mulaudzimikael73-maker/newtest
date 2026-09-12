import { createFileRoute, Link } from "@tanstack/react-router";
import { Masthead, SectionTitle, Colophon, LabelChip } from "@/components/newspaper";
import { getDailyEdition } from "@/lib/news-data";

export const Route = createFileRoute("/president")({
  head: () => ({
    meta: [
      { title: "Words From The President — Micky's Daily News" },
      {
        name: "description",
        content:
          "Official statements from the President on Lizzy, the economy, and Micky's refusal to remain professional.",
      },
      { property: "og:title", content: "Words From The President — Micky's Daily News" },
      {
        property: "og:description",
        content: "The President has officially declared Lizzy a national sweetheart.",
      },
    ],
  }),
  component: PresidentPage,
});

function PresidentPage() {
  const { presidentQuotes: quotes, closingQuote: closing } = getDailyEdition();

  return (
    <div className="paper min-h-screen">
      <Masthead edition="Section 3 · Words From The President — official and unedited." />

      <main className="mx-auto max-w-6xl px-4 pb-10">
        <section className="py-8 text-center">
          <LabelChip name="president" />
          <h2 className="pt-3 font-display text-4xl leading-[1.05] font-black uppercase sm:text-6xl">
            🎙️ Words From The President
          </h2>
          <p className="mx-auto max-w-2xl pt-3 font-body text-base italic text-muted-foreground">
            Delivered from the podium, transcribed faithfully, and printed without permission.
          </p>
          <div className="mx-auto mt-5 max-w-3xl rule-double" />
        </section>

        <SectionTitle kicker="Today's statements to the nation.">
          Official Statements
        </SectionTitle>

        <div className="gap-10 md:columns-2">
          {quotes.map((q, i) => (
            <blockquote
              key={q}
              className="mb-6 break-inside-avoid border-l-4 border-accent bg-card px-4 py-3"
            >
              <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground">
                STATEMENT {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-1.5 font-body text-[0.95rem] leading-relaxed italic">“{q}”</p>
            </blockquote>
          ))}
        </div>

        <section className="mt-8 border-4 border-double border-border bg-card p-6 text-center sm:p-10">
          <span className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">
            Closing Address
          </span>
          <p className="mx-auto max-w-3xl pt-4 font-display text-xl leading-relaxed font-semibold italic sm:text-2xl">
            “{closing}”
          </p>
        </section>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block border-2 border-border px-5 py-2 font-mono text-[0.7rem] tracking-widest uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            ← Back to the Front Page
          </Link>
        </div>

        <Colophon />
      </main>
    </div>
  );
}
