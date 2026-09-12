import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./logo";
import { branches, waLink } from "@/lib/data/branches";
import { company, nav } from "@/lib/data/company";

const steps = [
  ["01", "Pasang di HP", "Buka situs, tambah ke layar utama. Jadi aplikasi tanpa Play Store."],
  ["02", "Isi reservasi", "Form terkirim ke WhatsApp pusat. Admin cabang yang mengonfirmasi."],
  ["03", "Datang & bayar", "Bayar di kasir. Hasil lewat barcode struk setelah lunas."],
];

export function SiteFooter() {
  return (
    <footer className="bg-blue-deep pb-16 text-chalk">
      <div className="border-b border-gold/40 bg-surface text-ink">
        <div className="mx-auto grid w-full gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-16">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red">Reservasi</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Daftar dari HP.
              <span className="italic text-blue"> Bayar di loket.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              PWA BIOMED menempel di layar utama. Reservasi lewat WhatsApp 0811 1234 988 — bukan transfer di
              web.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/reservasi"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-red px-6 text-sm font-semibold text-chalk"
              >
                Isi reservasi <ArrowRight className="size-4" />
              </Link>
              <a
                href={waLink("Halo BIOMED, saya ingin reservasi pemeriksaan.")}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-paper px-6 text-sm font-semibold text-ink"
              >
                <MessageCircle className="size-4 text-red" />
                Chat WhatsApp
              </a>
            </div>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3 lg:col-span-6 lg:grid-cols-1">
            {steps.map(([n, t, b]) => (
              <li key={n} className="flex gap-4 rounded-xl border border-line bg-paper p-4">
                <span className="font-display text-2xl text-gold">{n}</span>
                <span>
                  <span className="block font-display text-lg">{t}</span>
                  <span className="mt-1 block text-sm text-muted">{b}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mx-auto grid w-full gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Logo variant="full" className="max-w-xs" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-chalk">
            {company.legalName} — {company.brand}. Lab klinik Banten sejak {company.founded}, dipimpin{" "}
            {company.director}.
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Menu</p>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {nav
              .filter((l) => l.to !== "/")
              .map((l) => (
                <Link key={l.to} to={l.to} className="min-h-8 py-1 hover:text-gold">
                  {l.label}
                </Link>
              ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Cabang</p>
          <ul className="mt-4 space-y-3 text-sm">
            {branches.map((b) => (
              <li key={b.id} className="flex items-start justify-between gap-4 border-b border-chalk/15 pb-3 last:border-0">
                <span>
                  <span className="block font-medium">{b.name}</span>
                  <span className="text-chalk/80">{b.city}</span>
                </span>
                <a href={`tel:${b.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-1 whitespace-nowrap hover:text-gold">
                  <Phone className="size-3.5" />
                  {b.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-chalk/15 py-4 text-center text-xs text-chalk">
        Harga dapat berubah sebelum transaksi. © {company.legalName} — {company.brand}
      </div>
    </footer>
  );
}
