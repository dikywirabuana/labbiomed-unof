import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { equipment, specialists } from "@/lib/data/facilities";

export const Route = createFileRoute("/fasilitas")({ component: FasilitasPage });

function FasilitasPage() {
  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
      <PageHero
        kicker="Fasilitas"
        title="Peralatan laboratorium full automatic."
        lede="Daftar fasilitas dari situs resmi: analyzer kimia, hormon, HbA1c, EKG, USG, rontgen, hingga MCU lapangan."
      />
      <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {equipment.map((item, i) => (
          <li key={item} className="rounded-xl border border-line bg-surface p-5">
            <p className="text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-2 font-display text-xl">{item}</p>
          </li>
        ))}
      </ol>
      <h2 className="mt-14 font-display text-3xl">Tenaga ahli</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {specialists.map((s) => (
          <li key={s} className="py-3 text-sm text-muted">
            {s}
          </li>
        ))}
      </ul>
    </main>
  );
}
