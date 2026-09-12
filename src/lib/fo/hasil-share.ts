import { renderSVG } from "uqr";
import { company } from "@/lib/data/company";
import { ageOf, hutangOf, lunasOf, type Patient, type Sale } from "@/lib/fo/store";
import { code128Svg } from "@/lib/fo/barcode";

export type PublicHasil = {
  kode: string;
  nomor: string;
  nama: string;
  umur: string;
  kelamin: string;
  cabang: string;
  created: string;
  hasil: {
    name: string;
    nilai: string;
    satuan: string;
    rujukan: string;
    flag: string;
    ready: boolean;
  }[];
  ready: boolean;
  seal: string;
  lunas: boolean;
  hutang: number;
};

const PKEY = "biomed-fo-publik";

export function kodeOf(sale: Pick<Sale, "id" | "nomor" | "kode">) {
  if (sale.kode) return sale.kode;
  return `${sale.nomor}-${sale.id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}

export function sealOf(p: Pick<PublicHasil, "kode" | "nomor" | "nama" | "hasil">) {
  const raw = [p.kode, p.nomor, p.nama, ...p.hasil.map((h) => `${h.name}:${h.nilai}`)].join("|");
  let h = 2166136261;
  for (const c of raw) h ^= c.charCodeAt(0), h = Math.imul(h, 16777619);
  return `BM${(h >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
}

export function toPublic(sale: Sale, patient?: Patient | null): PublicHasil {
  const kode = kodeOf(sale);
  const hasil = sale.hasil.map((h) => ({
    name: h.name,
    nilai: h.nilai,
    satuan: h.satuan,
    rujukan: h.rujukan,
    flag: h.flag,
    ready: h.ready,
  }));
  const lunas = lunasOf(sale);
  const readyLab = hasil.length > 0 && hasil.every((h) => h.ready && h.nilai.trim().length > 0);
  const draft: PublicHasil = {
    kode,
    nomor: sale.nomor,
    nama: sale.nama,
    umur: patient ? ageOf(patient.lahir) : "",
    kelamin: patient ? (patient.kelamin === "P" ? "Perempuan" : "Laki-laki") : "",
    cabang: sale.cabang,
    created: sale.created,
    hasil: lunas
      ? hasil
      : hasil.map((h) => ({ ...h, nilai: "", flag: "", ready: false })),
    ready: readyLab,
    seal: "",
    lunas,
    hutang: hutangOf(sale),
  };
  draft.seal = sealOf(draft);
  return draft;
}

export function hasilUrl(kode: string) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/hasil/${encodeURIComponent(kode)}`;
}

export function validasiUrl(kode: string) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/validasi/${encodeURIComponent(kode)}`;
}

export function qrSvg(text: string) {
  return renderSVG(text, { ecc: "M", border: 2, pixelSize: 3, blackColor: "#1a2832", whiteColor: "#ffffff" });
}

export function linkMark(url: string, kode: string, caption: string) {
  return `<div class="mark">
    <div class="qr">${qrSvg(url)}</div>
    <div class="bc">${code128Svg(kode, 36)}</div>
    <p class="cap">${caption}<br><span class="url">${url}</span></p>
  </div>`;
}

export function markCss() {
  return `.mark{margin-top:16px;text-align:center}
  .qr{width:132px;margin:0 auto}.qr svg{width:132px;height:132px}
  .bc{margin-top:6px}.bc svg{width:100%;max-width:280px;height:36px}
  .cap{font-size:10px;color:#5d6d78;margin-top:6px}
  .url{word-break:break-all;font-size:9px}`;
}

export function savePublicLocal(p: PublicHasil) {
  const all = loadAllPublic();
  all[p.kode] = p;
  localStorage.setItem(PKEY, JSON.stringify(all));
}

export function loadPublicLocal(kode: string): PublicHasil | null {
  return loadAllPublic()[kode] ?? null;
}

function loadAllPublic(): Record<string, PublicHasil> {
  try {
    return JSON.parse(localStorage.getItem(PKEY) ?? "{}") as Record<string, PublicHasil>;
  } catch {
    return {};
  }
}

export { company };
