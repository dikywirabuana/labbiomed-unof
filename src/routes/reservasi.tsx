import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero } from "@/components/page-hero";
import { branches, waLink } from "@/lib/data/branches";
import { getCabang, setCabang, isPriceBranch } from "@/lib/data/prices";

export const Route = createFileRoute("/reservasi")({ component: ReservasiPage });

const kinds = ["Laboratorium", "MCU / checkup", "USG", "Rontgen", "EKG", "Lainnya"];
const STORAGE = "biomed-reservasi";

function ReservasiPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      nama: String(data.get("nama") ?? "").trim(),
      hp: String(data.get("hp") ?? "").trim(),
      cabang: String(data.get("cabang") ?? ""),
      jenis: String(data.get("jenis") ?? ""),
      tanggal: String(data.get("tanggal") ?? ""),
      catatan: String(data.get("catatan") ?? "").trim(),
    };
    if (!payload.nama || !payload.hp) return;
    const prev = JSON.parse(localStorage.getItem(STORAGE) ?? "[]") as unknown[];
    localStorage.setItem(STORAGE, JSON.stringify([payload, ...prev].slice(0, 20)));
    const text = [
      "Halo BIOMED, saya ingin reservasi.",
      `Nama: ${payload.nama}`,
      `HP: ${payload.hp}`,
      `Cabang: ${payload.cabang}`,
      `Jenis: ${payload.jenis}`,
      `Tanggal: ${payload.tanggal}`,
      payload.catatan ? `Catatan: ${payload.catatan}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    setSent(true);
    window.open(waLink(text), "_blank", "noopener");
  }

  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
      <PageHero
        kicker="Reservasi"
        title="Daftar dari HP, tanpa antre di loket."
        lede="Isi form ini — tersimpan di perangkat Anda — lalu lanjut chat WhatsApp admin. Pasang aplikasi BIOMED agar form selalu di layar utama."
      />
      {sent ? (
        <p className="mt-8 rounded-xl border border-line bg-surface p-5 text-sm text-muted">
          Permintaan tersimpan di HP ini. Lanjutkan di WhatsApp. Jika jendela tidak terbuka, ketuk tombol
          WhatsApp di header.
        </p>
      ) : null}
      <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-4 rounded-xl border border-line bg-surface p-6">
        <label className="block text-sm font-medium">
          Nama lengkap
          <input
            name="nama"
            required
            autoComplete="name"
            className="mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm"
          />
        </label>
        <label className="block text-sm font-medium">
          Nomor HP
          <input
            name="hp"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm"
          />
        </label>
        <label className="block text-sm font-medium">
          Cabang
          <select
            name="cabang"
            defaultValue={branches.find((b) => b.id === getCabang())?.name}
            onChange={(e) => {
              const b = branches.find((x) => x.name === e.target.value);
              if (b && isPriceBranch(b.id)) setCabang(b.id);
            }}
            className="mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Jenis pemeriksaan
          <select name="jenis" className="mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm">
            {kinds.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Tanggal rencana
          <input name="tanggal" type="date" className="mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm" />
        </label>
        <label className="block text-sm font-medium">
          Catatan
          <textarea name="catatan" rows={3} className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm" />
        </label>
        <button type="submit" className="h-12 w-full rounded-full bg-red text-sm font-semibold text-chalk">
          Kirim ke WhatsApp
        </button>
        <p className="text-xs text-muted">
          Reservasi belum mengunci slot. Admin cabang akan konfirmasi jam dan persiapan (puasa, rujukan, dll.).
        </p>
      </form>
    </main>
  );
}
