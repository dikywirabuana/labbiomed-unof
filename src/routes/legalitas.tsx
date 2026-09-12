import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { company } from "@/lib/data/company";
import {
  certifications,
  documents,
  isoNote,
  licenses,
  type LegalDoc,
} from "@/lib/data/legalitas";

export const Route = createFileRoute("/legalitas")({ component: LegalitasPage });

function LegalitasPage() {
  const groups = useMemo(() => {
    const map = new Map<string, LegalDoc[]>();
    for (const d of documents) {
      const list = map.get(d.group) ?? [];
      list.push(d);
      map.set(d.group, list);
    }
    return [...map.entries()];
  }, []);
  const [open, setOpen] = useState<LegalDoc | null>(null);

  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
      <PageHero
        kicker="Legalitas"
        title={`${company.legalName} — ${company.brand}`}
        lede="Scan dokumen resmi dari labbiomed.co.id: NIB, izin klinik, ISO, KALK, K3, dan kendali mutu."
      />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
        Dipimpin {company.director}. NIB {company.nib} ditetapkan {company.nibDate}.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {licenses.map((l) => (
          <article key={l.number} className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-xl">{l.title}</h2>
            <p className="mt-2 text-sm text-muted">{l.issuer}</p>
            <p className="mt-4 font-display text-lg tabular-nums text-ink">{l.number}</p>
            <p className="mt-2 text-sm text-muted">{l.note}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl">Sertifikasi & mutu</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {certifications.map((c) => (
          <li key={c} className="py-3 text-sm leading-relaxed text-muted">
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-8 max-w-2xl space-y-3 text-sm leading-relaxed text-muted">
        {isoNote.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {groups.map(([group, docs]) => (
        <section key={group} className="mt-14">
          <h2 className="font-display text-3xl">{group}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((d) => (
              <button
                key={d.src}
                type="button"
                onClick={() => setOpen(d)}
                className="overflow-hidden rounded-xl border border-line bg-surface text-left"
              >
                <img
                  src={d.src}
                  alt={d.title}
                  className="h-72 w-full bg-paper object-cover object-top"
                />
                <span className="block p-4">
                  <span className="block font-display text-lg text-ink">{d.title}</span>
                  <span className="mt-1 block text-xs text-muted">{d.note}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}

      {open ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-blue-deep/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpen(null)}
        >
          <figure className="max-h-full max-w-3xl overflow-auto rounded-xl bg-surface p-3">
            <img src={open.src} alt={open.title} className="mx-auto max-h-[80vh] w-auto" />
            <figcaption className="px-2 py-3 text-center text-sm text-muted">
              {open.title} — {open.note}. Ketuk di luar untuk menutup.
            </figcaption>
          </figure>
        </div>
      ) : null}

      <Link
        to="/reservasi"
        className="mt-12 inline-flex h-11 items-center rounded-full bg-red px-5 text-sm font-semibold text-chalk"
      >
        Reservasi pemeriksaan
      </Link>
    </main>
  );
}
