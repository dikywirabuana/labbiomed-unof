import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, FlaskConical, HeartPulse, Scan, ShieldCheck, Stethoscope, Truck } from "lucide-react";
import { StorySlider } from "@/components/story-slider";
import { branches } from "@/lib/data/branches";
import { tests } from "@/lib/data/tests";
import { formatRupiah } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const services = [
  {
    icon: FlaskConical,
    title: "Laboratorium klinik",
    body: "Hematologi, kimia, hormon, imunoserologi, dan biomolekuler.",
  },
  {
    icon: Scan,
    title: "USG & rontgen",
    body: "Abdomen, kandungan, mamae, thorax ILO, dan rontgen mobile.",
  },
  {
    icon: HeartPulse,
    title: "Jantung & MCU",
    body: "EKG, echo, treadmill, spirometri, audiometri, MMPI.",
  },
  {
    icon: Stethoscope,
    title: "Kesehatan kerja",
    body: "MCU karyawan on-site, radiologi ILO, dokter okupasi.",
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Mutu yang bisa dicek",
    body: "ISO 9001:2015, KALK, izin klinik, NIB, dan scan legalitas asli — bukan stempel hiasan.",
  },
  {
    icon: FlaskConical,
    title: "Alat full automatic",
    body: "Analyzer kimia, hormon, HbA1c, EKG, USG, rontgen digital dan mobile untuk MCU lapangan.",
  },
  {
    icon: Building2,
    title: "Lima cabang Banten",
    body: "Serang, Cilegon, Cikupa, Pandeglang, Rangkasbitung. Harga mengikuti daftar masing-masing kota.",
  },
  {
    icon: Truck,
    title: "MCU ke lokasi kerja",
    body: "Tim datang ke pabrik/kantor (minimal 50 peserta). Laporan individu plus statistik industri.",
  },
];

const faqs = [
  {
    q: "Reservasi bayar di web?",
    a: "Tidak. Daftar lewat form ke WhatsApp 0811 1234 988, bayar di kasir cabang saat datang.",
  },
  {
    q: "Hasil kapan keluar?",
    a: "Tes rutin biasanya hari yang sama. Paket MCU dan kultur mengikuti jenis pemeriksaan. Tautan hasil ada di barcode struk setelah lunas.",
  },
  {
    q: "Harga di semua cabang sama?",
    a: "Tidak. Tiap cabang punya pricelist sendiri. Pilih kota di menu Harga sebelum membandingkan.",
  },
  {
    q: "Bisa MCU di pabrik?",
    a: "Bisa, on-site mulai 50 peserta. Rontgen mobile, audiometri, spirometri, lab, dan EKG dibawa ke lokasi.",
  },
];

function Home() {
  const popular = tests.filter((t) => t.popular).slice(0, 8);

  return (
    <main>
      <section className="relative z-10 overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-none gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red">
              Biomed · sejak 1991
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              Laboratorium klinik Biomed.
              <span className="block italic text-blue">Hasil akurat, tubuh terjaga.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              Laboratorium BIOMED — klinik utama & lab terakreditasi ISO 9001:2015
              dan KALK. Lima cabang di Banten untuk pasien umum dan MCU industri.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/reservasi"
                className="inline-flex h-12 items-center rounded-full bg-red px-6 text-sm font-semibold text-chalk"
              >
                Reservasi dari HP
              </Link>
              <Link
                to="/harga"
                className="inline-flex h-12 items-center rounded-full border border-line bg-surface px-6 text-sm font-semibold text-ink"
              >
                Cek daftar harga
              </Link>
            </div>
            <Link to="/legalitas" className="mt-6 grid grid-cols-4 gap-2">
              {[
                { src: "/lencana/iso.png", label: "ISO 9001" },
                { src: "/legalitas/kalk.jpg", label: "KALK" },
                { src: "/legalitas/akreditasi-serang.jpg", label: "Kemenkes" },
                { src: "/legalitas/ilo.jpg", label: "ILO" },
              ].map((m) => (
                <span key={m.label} className="overflow-hidden rounded-xl border border-line bg-surface p-2">
                  <img src={m.src} alt={m.label} className="mx-auto h-16 w-full object-contain object-top sm:h-20" />
                  <span className="mt-1 block text-center text-xs text-muted">{m.label}</span>
                </span>
              ))}
            </Link>
          </div>
          <div className="relative isolate h-[28rem] overflow-hidden rounded-xl bg-blue-deep sm:h-[32rem]">
            <img
              src="/hero-dokter.jpg"
              alt="Dr. T.K. Darmawan, Sp.PK, pendiri Laboratorium BIOMED"
              className="h-full w-full object-cover object-[50%_12%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-deep via-blue-deep/80 to-transparent px-5 pb-5 pt-16 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Pendiri</p>
              <p className="mt-2 font-display text-2xl leading-snug text-chalk">Dr. T.K. Darmawan, Sp.PK</p>
              <p className="mt-2 text-sm leading-relaxed text-chalk">
                Memimpin BIOMED sejak 1991 — lima cabang di Banten, ISO 9001:2015 dan akreditasi KALK.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-deep text-chalk">
        <div className="mx-auto grid max-w-none gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            ["5", "Cabang di Banten"],
            ["1991", "Berdiri, dipimpin Sp.PK"],
            ["ISO + KALK", "Mutu lab & klinik"],
            ["MCU", "Industri & on-site"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-4xl text-gold">{n}</p>
              <p className="mt-1 text-sm text-chalk">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <StorySlider />

      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-none px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-red">Sejarah</p>
          <div className="mt-3 grid gap-10 lg:grid-cols-12">
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl lg:col-span-5">
              Tiga dekade hasil lab yang bisa dipercaya.
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted lg:col-span-7">
              <p>
                Tahun 1991 Laboratorium BIOMED didirikan dan hingga kini dipimpin langsung oleh Dr. T.K.
                Darmawan, Sp.PK. Sejak awal kami melayani masyarakat umum sekaligus MCU karyawan dan calon
                karyawan di perusahaan Jabodetabek.
              </p>
              <p>
                Apresiasi pasien dan mitra membawa cabang baru: Serang, Cilegon, Tangerang (Cikupa),
                Pandeglang, dan Rangkasbitung. Mutu dikunci lewat ISO 9001 (2007, transisi 2015 pada 2018) dan
                akreditasi penuh KALK, plus HIPERKES dan izin klinik utama.
              </p>
            </div>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1991", "Berdiri di Serang, MCU industri dimulai."],
              ["2007", "Sistem mutu ISO 9001 diterapkan."],
              ["2018", "Transisi ISO 9001:2015 dan NIB resmi."],
              ["Kini", "Lima cabang, lab + rontgen, USG, EKG."],
            ].map(([year, note]) => (
              <li key={year} className="rounded-xl border border-line p-5">
                <p className="font-display text-2xl text-ink">{year}</p>
                <p className="mt-2 text-sm text-muted">{note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-none px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Mengapa BIOMED</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <article key={r.title} className="rounded-xl border border-line bg-surface p-5">
              <r.icon className="size-6 text-red" />
              <h3 className="mt-4 font-display text-xl">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-none px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red">Layanan</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Satu atap, alat lengkap</h2>
          </div>
          <Link to="/layanan" className="hidden items-center gap-1 text-sm font-semibold text-blue md:inline-flex">
            Semua layanan <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article key={s.title} className="rounded-xl border border-line bg-surface p-5">
              <s.icon className="size-6 text-red" />
              <h3 className="mt-4 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-none px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red">Tarif</p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Pemeriksaan yang sering dicari</h2>
              <p className="mt-2 text-sm text-muted">Harga referensi Serang. Cabang lain di menu Harga.</p>
            </div>
            <Link to="/harga" className="hidden items-center gap-1 text-sm font-semibold text-blue md:inline-flex">
              Semua harga <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 divide-y divide-line rounded-xl border border-line bg-paper">
            {popular.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.category}</p>
                </div>
                <p className="font-display text-lg tabular-nums">{formatRupiah(t.price)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-none px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red">Cabang</p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Lima kota di Banten</h2>
            </div>
            <Link to="/cabang" className="hidden items-center gap-1 text-sm font-semibold text-blue md:inline-flex">
              Semua cabang <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {branches.map((b) => (
              <article key={b.id} className="overflow-hidden rounded-xl border border-line bg-paper">
                {b.photo ? (
                  <img src={b.photo} alt={b.name} className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 items-end bg-blue p-4 font-display text-3xl text-chalk">{b.city}</div>
                )}
                <div className="p-4">
                  <h3 className="font-display text-xl">{b.name}</h3>
                  <p className="mt-1 text-sm text-muted">{b.address}</p>
                  <p className="mt-2 text-sm font-medium">{b.phone}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-none px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red">Tanya dulu</p>
        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Yang sering ditanyakan di loket</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <article key={f.q} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-display text-xl">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
