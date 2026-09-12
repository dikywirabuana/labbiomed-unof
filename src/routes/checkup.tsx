import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/checkup")({ component: CheckupPage });

const points = [
  {
    title: "MCU karyawan & calon karyawan",
    body: "Sejak 1991 BIOMED menjalankan medical check-up industri di Jabodetabek. Paket disesuaikan hazard kerja.",
  },
  {
    title: "On-site minimal 50 peserta",
    body: "Tim datang ke lokasi perusahaan. Rontgen mobile, audiometri, spirometri, lab, dan EKG bisa dibawa.",
  },
  {
    title: "Laporan industri",
    body: "Analisa per individu, resume, dan statistik. Konsultan dokter okupasi. Radiologi ILO oleh Sp.Rad bersertifikat.",
  },
  {
    title: "MCU pribadi",
    body: "Pasien umum bisa checkup di cabang: darah, urin, thorax, EKG, USG. Booking lewat HP — pasang aplikasi lalu isi reservasi.",
  },
];

function CheckupPage() {
  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
      <PageHero
        kicker="Checkup"
        title="Medical check-up karyawan dan pribadi."
        lede="Divisi MCU khusus dengan dokter patologi klinik, okupasi, jantung, jiwa (MMPI), neurologi, dan radiologi ILO."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {points.map((p) => (
          <article key={p.title} className="rounded-xl border border-line bg-surface p-6">
            <h2 className="font-display text-2xl">{p.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
          </article>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="font-display text-3xl">Yang biasa masuk paket MCU</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Darah lengkap, gula, lemak, fungsi hati & ginjal",
            "Urine lengkap",
            "Rontgen thorax (ILO untuk industri)",
            "EKG; treadmill jika diminta",
            "Audiometri & spirometri",
            "USG / echo sesuai hazard",
          ].map((i) => (
            <li key={i} className="rounded-xl border border-line bg-surface px-4 py-3 text-sm">
              {i}
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/reservasi" className="inline-flex h-11 items-center rounded-full bg-red px-5 text-sm font-semibold text-chalk">
          Daftar MCU
        </Link>
        <Link to="/harga" className="inline-flex h-11 items-center rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink">
          Lihat harga
        </Link>
      </div>
    </main>
  );
}
