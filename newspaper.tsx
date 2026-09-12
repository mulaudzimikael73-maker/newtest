import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { labels, marketUpdate, getDailyEdition, type Headline } from "@/lib/news-data";

export function LabelChip({ name }: { name: keyof typeof labels }) {
  const l = labels[name]!;
  return <span className={`label-chip ${l.className}`}>{l.tag}</span>;
}

export function Ticker() {
  const { ticker } = getDailyEdition();
  const items = [...ticker, ...ticker];
  return (
    <div className="overflow-hidden border-y border-border bg-primary py-1.5 text-primary-foreground">
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap font-mono text-[0.68rem] tracking-widest uppercase">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span aria-hidden>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const nav = [
  { to: "/", label: "Front Page" },
  { to: "/bank", label: "The Bank & Funds" },
  { to: "/president", label: "Words From The President" },
];

export function Masthead({ edition }: { edition: string }) {
  const { dateLabel, editionNo } = getDailyEdition();

  return (
    <header className="border-b-4 border-border">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-2 py-2 font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
          <span>Vol. I — No. {editionNo}</span>
          <span>{dateLabel}</span>
          <span>Price: One Compliment</span>
        </div>
        <div className="rule-double" />
        <h1 className="pt-4 text-center font-display text-5xl leading-none font-black tracking-tight uppercase sm:text-7xl md:text-8xl">
          Micky's Daily News
        </h1>
        <p className="pt-3 pb-4 text-center font-body text-sm italic text-muted-foreground">
          “All the news that's fit to print… and some that absolutely isn't.”
        </p>
        <div className="rule-double" />
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 font-mono text-[0.68rem] tracking-widest uppercase">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="border-b-2 border-transparent pb-0.5 transition-colors hover:text-accent data-[status=active]:border-accent"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      <Ticker />
      <div className="mx-auto max-w-6xl px-4">
        <p className="py-2 text-center font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
          {edition}
        </p>
      </div>
    </header>
  );
}

export function SectionTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <div className="mb-5">
      <div className="rule-thick" />
      <h2 className="pt-2 font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">
        {children}
      </h2>
      {kicker ? (
        <p className="pt-1 font-body text-sm italic text-muted-foreground">{kicker}</p>
      ) : null}
      <div className="mt-2 border-t border-border" />
    </div>
  );
}

export function HeadlineItem({ item }: { item: Headline }) {
  return (
    <article className="break-inside-avoid border-b border-dashed border-border py-3">
      <LabelChip name={item.label} />
      <h3 className="pt-1.5 font-display text-lg leading-snug font-bold uppercase">
        {item.text}
      </h3>
    </article>
  );
}

export function MarketBox() {
  return (
    <aside className="border-2 border-border bg-card p-4">
      <p className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">
        📊 Market Update
      </p>
      <div className="mt-3 space-y-2">
        {marketUpdate.map((m) => (
          <div key={m.name} className="flex items-baseline justify-between gap-3 border-b border-dotted border-border pb-1">
            <span className="font-body text-sm">{m.name}</span>
            <span className="text-sm">{m.trend}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function NoticeBox({
  label,
  children,
}: {
  label: keyof typeof labels;
  children: ReactNode;
}) {
  return (
    <aside className="border-2 border-border bg-card p-4">
      <LabelChip name={label} />
      <p className="pt-2 font-body text-sm leading-relaxed">{children}</p>
    </aside>
  );
}

export function Colophon() {
  return (
    <footer className="mt-12 border-t-4 border-border py-6 text-center">
      <p className="font-display text-lg font-bold uppercase">Micky's Daily News</p>
      <p className="pt-1 font-body text-sm italic text-muted-foreground">
        Independent, unreliable, and entirely devoted to one subject.
      </p>
      <p className="pt-3 font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
        Printed daily · Circulation: 1 very important reader
      </p>
    </footer>
  );
}
