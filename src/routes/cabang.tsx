import { createFileRoute } from "@tanstack/react-router";
import { branches, waLink } from "@/lib/data/branches";

export const Route = createFileRoute("/cabang")({ component: CabangPage });

function CabangPage() {
  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red">Jaringan</p>
      <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Lima cabang di Banten</h1>
      <p className="mt-4 max-w-xl text-muted">
        Serang, Cilegon, Cikupa, Pandeglang, dan Rangkasbitung. Home service tersedia.
      </p>
      <div className="mt-10 grid gap-6">
        {branches.map((b) => (
          <article
            key={b.id}
            className="grid overflow-hidden rounded-xl border border-line bg-surface md:grid-cols-2"
          >
            {b.photo ? (
              <img src={b.photo} alt={b.name} className="h-56 w-full object-cover md:h-full" />
            ) : (
              <div className="flex min-h-44 items-end bg-blue p-6 font-display text-4xl text-chalk/30">
                {b.city}
              </div>
            )}
            <div className="p-6">
              <h2 className="font-display text-3xl">{b.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{b.address}</p>
              {b.note ? <p className="mt-2 text-xs text-muted">{b.note}</p> : null}
              <p className="mt-4 text-sm font-semibold">{b.phone}</p>
              {b.email ? <p className="text-sm text-muted">{b.email}</p> : null}
              <a
                href={waLink(`Halo BIOMED ${b.city}, saya ingin informasi cabang.`)}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-red px-5 text-sm font-semibold text-chalk"
              >
                WhatsApp cabang
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
