import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { articles } from "@/lib/data/stories";

export const Route = createFileRoute("/artikel")({ component: ArtikelPage });

function ArtikelPage() {
  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
      <PageHero
        kicker="Artikel"
        title="Edukasi lab dari arsip BIOMED."
        lede="Pranikah, kesuburan, diabetes, asam urat, fungsi ginjal, dan MCU okupasi — diolah ulang dari artikel resmi."
      />
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {articles.map((a) => (
          <li key={a.slug} className="rounded-xl border border-line bg-surface p-5">
            <p className="text-xs text-muted">{a.date}</p>
            <Link to="/artikel/$slug" params={{ slug: a.slug }} className="mt-2 block font-display text-2xl">
              {a.title}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
