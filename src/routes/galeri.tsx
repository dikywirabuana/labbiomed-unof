import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/galeri")({ component: GaleriPage });

const shots = [
  { src: "/cabang/serang.png", alt: "Gedung BIOMED Serang, Jl. Jend. A. Yani No. 59" },
  { src: "/cabang/cilegon.png", alt: "Gedung BIOMED Cilegon, Jl. Raya Cilegon No. 130" },
  { src: "/hero-dokter.jpg", alt: "Dr. T.K. Darmawan, Sp.PK di laboratorium" },
  { src: "/logo-wordmark.png", alt: "Logo Laboratorium BIOMED" },
];

function GaleriPage() {
  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
      <PageHero
        kicker="Galeri"
        title="Cabang, dokter, dan identitas BIOMED."
        lede="Foto gedung Serang dan Cilegon, pendiri, dan banner resmi. Cabang lain menyusul."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {shots.map((s) => (
          <figure key={s.src} className="overflow-hidden rounded-xl border border-line bg-surface">
            <img src={s.src} alt={s.alt} className="h-64 w-full object-cover object-center sm:h-80" />
            <figcaption className="p-4 text-sm text-muted">{s.alt}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
