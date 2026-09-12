import type { Hasil, Sale } from "@/lib/fo/store";

export type ImagingKind = "usg" | "rontgen";

export type ImagingSlot = {
  id: string;
  saleId: string;
  itemId: string;
  kind: ImagingKind;
  at: string;
  nama: string;
  nomor: string;
  itemName: string;
};

const KEY = "biomed-fo-jadwal";

export function imagingKind(name: string): ImagingKind | null {
  const n = name.toLowerCase();
  if (/\busg\b|ultrason|echo/.test(n)) return "usg";
  if (/rontgen|\bx-?ray\b|\bro[\s.-]|thorax|lumbal|bno|ivp/.test(n)) return "rontgen";
  return null;
}

export function isImaging(name: string) {
  return imagingKind(name) !== null;
}

export function todayKey(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function imagingItems(sale: Sale, kind?: ImagingKind) {
  return sale.hasil.filter((h) => {
    const k = imagingKind(h.name);
    return k && (!kind || k === kind);
  });
}

export function todaySales(sales: Sale[], kind?: ImagingKind) {
  const day = todayKey();
  return sales.filter((s) => s.created.slice(0, 10) === day && imagingItems(s, kind).length > 0);
}

function loadAll(): ImagingSlot[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as ImagingSlot[];
  } catch {
    return [];
  }
}

function saveAll(list: ImagingSlot[]) {
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 400)));
}

function nextTime(existing: ImagingSlot[], kind: ImagingKind, after: Date) {
  const same = existing
    .filter((s) => s.kind === kind && s.at.slice(0, 10) === todayKey(after))
    .map((s) => new Date(s.at).getTime())
    .sort((a, b) => a - b);
  let t = new Date(after);
  if (t.getHours() < 8) t.setHours(8, 0, 0, 0);
  const step = kind === "usg" ? 20 : 10;
  while (same.some((ms) => Math.abs(ms - t.getTime()) < step * 60000)) {
    t = new Date(t.getTime() + step * 60000);
  }
  return t.toISOString();
}

export function syncSlots(sales: Sale[]): ImagingSlot[] {
  const day = todayKey();
  const prev = loadAll().filter((s) => s.at.slice(0, 10) >= day);
  const have = new Set(prev.map((s) => `${s.saleId}:${s.itemId}`));
  const extra: ImagingSlot[] = [];
  for (const sale of todaySales(sales)) {
    for (const h of imagingItems(sale)) {
      const key = `${sale.id}:${h.itemId}`;
      if (have.has(key)) continue;
      const kind = imagingKind(h.name);
      if (!kind) continue;
      extra.push({
        id: crypto.randomUUID(),
        saleId: sale.id,
        itemId: h.itemId,
        kind,
        at: nextTime([...prev, ...extra], kind, new Date(sale.created)),
        nama: sale.nama,
        nomor: sale.nomor,
        itemName: h.name,
      });
    }
  }
  const next = [...extra, ...prev];
  saveAll(next);
  return next;
}

export function slotsFor(kind: ImagingKind, list: ImagingSlot[]) {
  const day = todayKey();
  return list
    .filter((s) => s.kind === kind && s.at.slice(0, 10) === day)
    .sort((a, b) => a.at.localeCompare(b.at));
}

export function readyOf(h: Hasil) {
  return h.ready && h.nilai.trim().length > 0;
}
