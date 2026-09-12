import { priceBranches, type PriceBranchId } from "@/lib/data/prices";
import type { Sale } from "@/lib/fo/store";

export const expenseCats = [
  "Gaji & honor",
  "Sewa gedung",
  "Listrik & air",
  "Reagen & alat",
  "APD & habis pakai",
  "Limbah B3",
  "Kalibrasi",
  "Distribusi antar cabang",
  "ATK & cetak",
  "Lainnya",
] as const;

export type ExpenseCat = (typeof expenseCats)[number];

export type Expense = {
  id: string;
  at: string;
  branch: PriceBranchId;
  category: ExpenseCat;
  note: string;
  amount: number;
};

const KEY = "biomed-fo-keluar";

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 33 + c.charCodeAt(0)) >>> 0;
  return h;
}

function seedExpenses(): Expense[] {
  const out: Expense[] = [];
  const now = Date.now();
  const base: Record<PriceBranchId, number> = {
    serang: 1,
    cilegon: 0.72,
    cikupa: 0.65,
    pandeglang: 0.48,
    rangkas: 0.52,
  };
  for (let d = 29; d >= 0; d--) {
    const day = new Date(now - d * 86400000).toISOString().slice(0, 10);
    for (const b of priceBranches) {
      if (d % 7 === 0) {
        out.push({
          id: `seed-gaji-${b.id}-${day}`,
          at: `${day}T08:00:00.000Z`,
          branch: b.id,
          category: "Gaji & honor",
          note: "Gaji mingguan ATLM & FO",
          amount: Math.round((1_800_000 + (hash(b.id) % 400_000)) * base[b.id]),
        });
      }
      if (d % 10 === 2) {
        out.push({
          id: `seed-listrik-${b.id}-${day}`,
          at: `${day}T09:00:00.000Z`,
          branch: b.id,
          category: "Listrik & air",
          note: "Token & PDAM",
          amount: Math.round((450_000 + (hash(day + b.id) % 120_000)) * base[b.id]),
        });
      }
      if (d % 5 === 1) {
        out.push({
          id: `seed-reagen-${b.id}-${day}`,
          at: `${day}T10:00:00.000Z`,
          branch: b.id,
          category: "Reagen & alat",
          note: "Pembelian reagen & kontrol",
          amount: Math.round((320_000 + (hash(day) % 180_000)) * base[b.id]),
        });
      }
    }
    if (d % 6 === 0) {
      out.push({
        id: `seed-dist-${day}`,
        at: `${day}T07:30:00.000Z`,
        branch: "serang",
        category: "Distribusi antar cabang",
        note: "BBM & packing kirim ke cabang",
        amount: 180_000 + (hash(day) % 90_000),
      });
    }
  }
  out.push(
    {
      id: "seed-sewa-serang",
      at: new Date(now - 20 * 86400000).toISOString(),
      branch: "serang",
      category: "Sewa gedung",
      note: "Sewa bulan berjalan — pusat",
      amount: 8_500_000,
    },
    {
      id: "seed-limbah",
      at: new Date(now - 8 * 86400000).toISOString(),
      branch: "serang",
      category: "Limbah B3",
      note: "Angkut limbah seluruh cabang",
      amount: 1_250_000,
    },
  );
  return out;
}

export function loadExpenses(): Expense[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "");
    if (Array.isArray(raw) && raw.length) return raw as Expense[];
  } catch {
    /* first run */
  }
  const seed = seedExpenses();
  saveExpenses(seed);
  return seed;
}

export function saveExpenses(list: Expense[]) {
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 800)));
}

export function saleBranch(sale: Sale): PriceBranchId {
  const hit = priceBranches.find((b) => b.label === sale.cabang || b.id === sale.cabang);
  return hit?.id ?? "serang";
}

export function inRange(iso: string, from: string, to: string) {
  const d = iso.slice(0, 10);
  return d >= from && d <= to;
}

export function monthBounds(offset = 0) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const end = new Date(now.getFullYear(), now.getMonth() + offset + 1, 0);
  const iso = (d: Date) => {
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${m}-${day}`;
  };
  return { from: iso(start), to: iso(end) };
}
