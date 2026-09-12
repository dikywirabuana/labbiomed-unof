import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { news } from "@/lib/data/stories";

export const Route = createFileRoute("/berita")({ component: BeritaPage });

function BeritaPage() {
  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
      <PageHero
        kicker="Berita"
        title="Kabar alat dan layanan baru."
        lede="Diangkat dari kanal News situs resmi: USG, echo, HPLC, dan edukasi kesehatan."
      />
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {news.map((n) => (
          <li key={n.slug} className="py-5">
            <p className="text-xs text-muted">{n.date}</p>
            <Link to="/berita/$slug" params={{ slug: n.slug }} className="mt-1 block font-display text-2xl text-ink">
              {n.title}
            </Link>
            <p className="mt-2 max-w-2xl text-sm text-muted">{n.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
