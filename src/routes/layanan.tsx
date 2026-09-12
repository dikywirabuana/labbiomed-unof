import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/layanan")({ component: LayananPage });

const groups = [
  {
    title: "Laboratorium",
    items: [
      "Hematologi & koagulasi",
      "Kimia klinik, diabetes, lemak, ginjal, hati",
      "Hormon tiroid & kesuburan (AMH, FSH, LH)",
      "Imunoserologi hepatitis, HIV, dengue",
      "Mikrobiologi & kultur resistensi",
      "PCR / biomolekuler (HPV, HBV, NIPT)",
    ],
  },
  {
    title: "Pencitraan",
    items: [
      "USG abdomen, kandungan, mamae, tiroid",
      "Doppler vaskuler & echo jantung",
      "Rontgen digital, panoramik, thorax ILO",
      "Rontgen mobile untuk MCU lapangan",
    ],
  },
  {
    title: "MCU & okupasi",
    items: [
      "MCU karyawan & calon karyawan",
      "On-site minimal 50 peserta",
      "Audiometri, spirometri, treadmill, MMPI",
      "Laporan individu + statistik industri",
      "Dokter Sp.PK, okupasi, radiologi ILO",
    ],
  },
];

function LayananPage() {
  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red">Layanan</p>
      <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Dari darah rutin sampai MCU lengkap</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Peralatan full automatic: hematology, kimia klinik, Vidas hormon, HbA1c,
        EKG, USG, rontgen. Dipimpin Dr. T.K. Darmawan, Sp.PK.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {groups.map((g) => (
          <section key={g.title} className="rounded-xl border border-line bg-surface p-6">
            <h2 className="font-display text-2xl">{g.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {g.items.map((i) => (
                <li key={i} className="border-b border-line/70 py-2 last:border-0">
                  {i}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="mt-14 rounded-xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-display text-3xl">Alur di cabang</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["1", "Reservasi", "Isi form di HP, pesan masuk WhatsApp pusat 0811 1234 988."],
            ["2", "Datang & bayar", "Kasir cabang. Harga mengikuti pricelist kota itu, bukan satu tarif nasional."],
            ["3", "Hasil", "Tes rutin sering hari yang sama. Tautan di barcode struk setelah lunas."],
          ].map(([n, t, b]) => (
            <li key={n}>
              <p className="font-display text-3xl text-red">{n}</p>
              <p className="mt-2 font-display text-xl">{t}</p>
              <p className="mt-1 text-sm text-muted">{b}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
