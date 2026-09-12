import type { PriceBranchId } from "@/lib/data/prices";
import { priceBranches } from "@/lib/data/prices";

export const stockCategories = [
  "Tabung & spesimen",
  "Reagen hematologi",
  "Reagen kimia",
  "Reagen imunologi",
  "Urin & feses",
  "Habis pakai periksa",
  "Radiologi & USG",
  "APD karyawan",
  "Kebersihan / janitor",
  "Kantor & cetak",
  "K3 & limbah",
  "Umum & fasilitas",
] as const;

export type StockCategory = (typeof stockCategories)[number];

export type CatalogItem = {
  id: string;
  name: string;
  category: StockCategory;
  unit: string;
  min: number;
  seed: number;
  isi?: number;
};

export const packUnits = ["box", "pak", "pack", "rak", "vial"] as const;

export function needsIsi(unit: string) {
  return packUnits.includes(unit as (typeof packUnits)[number]);
}

export function isiOf(item: CatalogItem) {
  if (item.isi && item.isi > 1) return item.isi;
  if (needsIsi(item.unit)) return 100;
  return 1;
}

export function qtyLabel(item: CatalogItem, qty: number) {
  const isi = isiOf(item);
  if (isi > 1) return `${qty} ${item.unit} · ${qty * isi} pcs`;
  return `${qty} ${item.unit}`;
}

export const catalog: CatalogItem[] = [
  { id: "edta-3", name: "Tabung EDTA 3 mL (ungu)", category: "Tabung & spesimen", unit: "rak", min: 20, seed: 48 },
  { id: "sst-5", name: "Tabung serum SST 5 mL (kuning)", category: "Tabung & spesimen", unit: "rak", min: 20, seed: 36 },
  { id: "natrium-sitrat", name: "Tabung natrium sitrat 1.8 mL (biru)", category: "Tabung & spesimen", unit: "rak", min: 8, seed: 16 },
  { id: "fluorida", name: "Tabung NaF glukosa (abu)", category: "Tabung & spesimen", unit: "rak", min: 8, seed: 18 },
  { id: "heparin", name: "Tabung heparin (hijau)", category: "Tabung & spesimen", unit: "rak", min: 6, seed: 12 },
  { id: "urin-pot", name: "Pot urin steril 30 mL", category: "Tabung & spesimen", unit: "pcs", min: 80, seed: 200 },
  { id: "feses-pot", name: "Pot feses", category: "Tabung & spesimen", unit: "pcs", min: 40, seed: 100 },
  { id: "sputum", name: "Pot sputum", category: "Tabung & spesimen", unit: "pcs", min: 20, seed: 50 },
  { id: "swab", name: "Swab steril + transport", category: "Tabung & spesimen", unit: "pcs", min: 30, seed: 80 },
  { id: "holder", name: "Holder vacutainer", category: "Tabung & spesimen", unit: "pcs", min: 15, seed: 40 },

  { id: "reagen-cbc", name: "Reagen hematologi analyzer (diluent)", category: "Reagen hematologi", unit: "botol", min: 4, seed: 8 },
  { id: "lyse", name: "Lyse reagent CBC", category: "Reagen hematologi", unit: "botol", min: 4, seed: 7 },
  { id: "cleaner-cbc", name: "Pembersih probe hematologi", category: "Reagen hematologi", unit: "botol", min: 2, seed: 4 },
  { id: "kontrol-cbc", name: "Kontrol darah 3 level", category: "Reagen hematologi", unit: "vial", min: 3, seed: 6 },
  { id: "led-westergren", name: "Pipet LED Westergren", category: "Reagen hematologi", unit: "pcs", min: 20, seed: 50 },
  { id: "golongan-kit", name: "Kit ABO + rhesus", category: "Reagen hematologi", unit: "kit", min: 2, seed: 4 },
  { id: "pt-aptt", name: "Reagen PT / APTT", category: "Reagen hematologi", unit: "kit", min: 2, seed: 3 },

  { id: "glukosa-r", name: "Reagen glukosa oksidase", category: "Reagen kimia", unit: "kit", min: 3, seed: 6 },
  { id: "ureum-r", name: "Reagen ureum", category: "Reagen kimia", unit: "kit", min: 2, seed: 4 },
  { id: "kreatinin-r", name: "Reagen kreatinin", category: "Reagen kimia", unit: "kit", min: 2, seed: 4 },
  { id: "sgot-r", name: "Reagen SGOT (AST)", category: "Reagen kimia", unit: "kit", min: 2, seed: 4 },
  { id: "sgpt-r", name: "Reagen SGPT (ALT)", category: "Reagen kimia", unit: "kit", min: 2, seed: 4 },
  { id: "lipid-r", name: "Reagen kolesterol / HDL / LDL / TG", category: "Reagen kimia", unit: "kit", min: 2, seed: 3 },
  { id: "hba1c-r", name: "Reagen HbA1c", category: "Reagen kimia", unit: "kit", min: 1, seed: 2 },
  { id: "elektrolit-r", name: "Reagen ISE Na/K/Cl", category: "Reagen kimia", unit: "pack", min: 1, seed: 2 },
  { id: "kalibrator", name: "Kalibrator kimia klinik", category: "Reagen kimia", unit: "set", min: 1, seed: 2 },
  { id: "kontrol-kimia", name: "Kontrol serum 2 level", category: "Reagen kimia", unit: "vial", min: 4, seed: 8 },
  { id: "akuades", name: "Akuades / aquadest 5 L", category: "Reagen kimia", unit: "galon", min: 6, seed: 12 },
  { id: "nacl", name: "NaCl 0,9% 500 mL", category: "Reagen kimia", unit: "botol", min: 10, seed: 24 },

  { id: "hbsag-r", name: "Kit HBsAg ECLIA / rapid", category: "Reagen imunologi", unit: "kit", min: 2, seed: 4 },
  { id: "anti-hiv", name: "Kit Anti-HIV", category: "Reagen imunologi", unit: "kit", min: 2, seed: 3 },
  { id: "anti-hcv", name: "Kit Anti-HCV", category: "Reagen imunologi", unit: "kit", min: 1, seed: 2 },
  { id: "vdrl", name: "Kit VDRL / RPR", category: "Reagen imunologi", unit: "kit", min: 1, seed: 2 },
  { id: "widal", name: "Kit Widal", category: "Reagen imunologi", unit: "kit", min: 1, seed: 2 },
  { id: "ns1-dengue", name: "Kit NS1 + IgG/IgM dengue", category: "Reagen imunologi", unit: "kit", min: 2, seed: 4 },
  { id: "hcg", name: "Strip tes kehamilan", category: "Reagen imunologi", unit: "box", min: 3, seed: 8 },
  { id: "narkoba", name: "Strip narkoba 6 parameter", category: "Reagen imunologi", unit: "box", min: 2, seed: 5 },

  { id: "urine-strip", name: "Carik celup urin 10 parameter", category: "Urin & feses", unit: "vial", min: 4, seed: 8 },
  { id: "urin-kontrol", name: "Kontrol urin", category: "Urin & feses", unit: "vial", min: 2, seed: 3 },
  { id: "sedimen", name: "Tabung sedimen urin", category: "Urin & feses", unit: "pack", min: 4, seed: 10 },
  { id: "eosin", name: "Eosin / pewarna feses", category: "Urin & feses", unit: "botol", min: 2, seed: 4 },

  { id: "needle-21", name: "Jarum vacutainer 21G", category: "Habis pakai periksa", unit: "box", min: 8, seed: 16 },
  { id: "needle-23", name: "Jarum vacutainer 23G", category: "Habis pakai periksa", unit: "box", min: 6, seed: 12 },
  { id: "spuit-3", name: "Spuit 3 mL", category: "Habis pakai periksa", unit: "box", min: 10, seed: 20 },
  { id: "spuit-5", name: "Spuit 5 mL", category: "Habis pakai periksa", unit: "box", min: 8, seed: 16 },
  { id: "alkohol-swab", name: "Alkohol swab", category: "Habis pakai periksa", unit: "box", min: 12, seed: 30 },
  { id: "kapas", name: "Kapas pembalut", category: "Habis pakai periksa", unit: "pack", min: 8, seed: 18 },
  { id: "plester", name: "Plester / micropore", category: "Habis pakai periksa", unit: "roll", min: 10, seed: 24 },
  { id: "torniket", name: "Torniket", category: "Habis pakai periksa", unit: "pcs", min: 8, seed: 15 },
  { id: "tip-kuning", name: "Tip pipet kuning 2–200 µL", category: "Habis pakai periksa", unit: "rak", min: 10, seed: 24 },
  { id: "tip-biru", name: "Tip pipet biru 100–1000 µL", category: "Habis pakai periksa", unit: "rak", min: 8, seed: 20 },
  { id: "cuvette", name: "Kuvet fotometer", category: "Habis pakai periksa", unit: "pack", min: 6, seed: 12 },
  { id: "slide", name: "Object glass + cover glass", category: "Habis pakai periksa", unit: "box", min: 4, seed: 8 },
  { id: "lanset", name: "Lanset glukosa", category: "Habis pakai periksa", unit: "box", min: 6, seed: 12 },
  { id: "strip-glukosa", name: "Strip glukosa point-of-care", category: "Habis pakai periksa", unit: "vial", min: 4, seed: 8 },

  { id: "gel-usg", name: "Gel USG 5 L", category: "Radiologi & USG", unit: "galon", min: 3, seed: 6 },
  { id: "kertas-usg", name: "Kertas thermal USG", category: "Radiologi & USG", unit: "roll", min: 6, seed: 12 },
  { id: "film-xray", name: "Film rontgen / kertas dry", category: "Radiologi & USG", unit: "box", min: 4, seed: 8 },
  { id: "developer", name: "Cairan prosesing film (jika analog)", category: "Radiologi & USG", unit: "kanister", min: 1, seed: 2 },
  { id: "apron", name: "Apron timbal cadangan", category: "Radiologi & USG", unit: "pcs", min: 2, seed: 4 },
  { id: "ekg-kertas", name: "Kertas EKG", category: "Radiologi & USG", unit: "roll", min: 6, seed: 14 },
  { id: "elektroda", name: "Elektroda EKG", category: "Radiologi & USG", unit: "pack", min: 8, seed: 16 },

  { id: "sarung-s", name: "Sarung tangan S", category: "APD karyawan", unit: "box", min: 10, seed: 20 },
  { id: "sarung-m", name: "Sarung tangan M", category: "APD karyawan", unit: "box", min: 16, seed: 36 },
  { id: "sarung-l", name: "Sarung tangan L", category: "APD karyawan", unit: "box", min: 12, seed: 24 },
  { id: "masker", name: "Masker bedah 3 ply", category: "APD karyawan", unit: "box", min: 12, seed: 28 },
  { id: "n95", name: "Masker N95 / KN95", category: "APD karyawan", unit: "box", min: 4, seed: 8 },
  { id: "jas-lab", name: "Jas laboratorium", category: "APD karyawan", unit: "pcs", min: 8, seed: 16 },
  { id: "sepatu", name: "Sepatu safety / clog", category: "APD karyawan", unit: "pasang", min: 4, seed: 8 },
  { id: "kacamata", name: "Kacamata pelindung", category: "APD karyawan", unit: "pcs", min: 6, seed: 12 },
  { id: "face-shield", name: "Face shield", category: "APD karyawan", unit: "pcs", min: 6, seed: 10 },
  { id: "haircap", name: "Haircap / head cover", category: "APD karyawan", unit: "pack", min: 6, seed: 12 },

  { id: "klorin", name: "Klorin / kalsium hipoklorit", category: "Kebersihan / janitor", unit: "kg", min: 4, seed: 10 },
  { id: "alkohol-70", name: "Alkohol 70% 1 L", category: "Kebersihan / janitor", unit: "botol", min: 12, seed: 24 },
  { id: "handsoap", name: "Sabun cuci tangan", category: "Kebersihan / janitor", unit: "galon", min: 6, seed: 12 },
  { id: "handrub", name: "Handrub antiseptik", category: "Kebersihan / janitor", unit: "botol", min: 10, seed: 20 },
  { id: "disinfektan", name: "Disinfektan lantai", category: "Kebersihan / janitor", unit: "jerigen", min: 4, seed: 8 },
  { id: "sapu", name: "Sapu + pengki", category: "Kebersihan / janitor", unit: "set", min: 4, seed: 8 },
  { id: "pel", name: "Alat pel + ember", category: "Kebersihan / janitor", unit: "set", min: 4, seed: 6 },
  { id: "kain-lap", name: "Kain microfiber", category: "Kebersihan / janitor", unit: "pcs", min: 15, seed: 30 },
  { id: "plastik-hitam", name: "Kantong sampah hitam", category: "Kebersihan / janitor", unit: "pack", min: 8, seed: 16 },
  { id: "tisu", name: "Tisu toilet / wastafel", category: "Kebersihan / janitor", unit: "pack", min: 12, seed: 24 },
  { id: "pengharum", name: "Pengharum ruangan", category: "Kebersihan / janitor", unit: "pcs", min: 6, seed: 12 },
  { id: "tissue-lab", name: "Tissue lab / kimwipes", category: "Kebersihan / janitor", unit: "box", min: 8, seed: 16 },

  { id: "kertas-a4", name: "Kertas A4 hasil lab", category: "Kantor & cetak", unit: "rim", min: 8, seed: 16 },
  { id: "toner", name: "Toner / tinta printer hasil", category: "Kantor & cetak", unit: "pcs", min: 3, seed: 6 },
  { id: "stiker-edta", name: "Stiker barcode tabung", category: "Kantor & cetak", unit: "roll", min: 6, seed: 12 },
  { id: "ribbon", name: "Ribbon printer barcode", category: "Kantor & cetak", unit: "pcs", min: 3, seed: 6 },
  { id: "struk-roll", name: "Kertas struk kasir 58 mm", category: "Kantor & cetak", unit: "roll", min: 8, seed: 18 },
  { id: "amplop-hasil", name: "Amplop hasil laboratorium", category: "Kantor & cetak", unit: "pack", min: 6, seed: 12 },
  { id: "stempel", name: "Tinta stempel + pad", category: "Kantor & cetak", unit: "set", min: 2, seed: 4 },
  { id: "atasan", name: "Bolpen / spidol lab", category: "Kantor & cetak", unit: "pack", min: 6, seed: 12 },
  { id: "map", name: "Map rekam medis", category: "Kantor & cetak", unit: "pack", min: 4, seed: 8 },

  { id: "sharps", name: "Safety box / sharps container", category: "K3 & limbah", unit: "pcs", min: 10, seed: 20 },
  { id: "biohazard", name: "Kantong biohazard kuning", category: "K3 & limbah", unit: "pack", min: 8, seed: 16 },
  { id: "spill-kit", name: "Spill kit darah / kimia", category: "K3 & limbah", unit: "set", min: 2, seed: 3 },
  { id: "eyewash", name: "Cairan eyewash", category: "K3 & limbah", unit: "botol", min: 2, seed: 4 },
  { id: "p3k", name: "Isi ulang kotak P3K", category: "K3 & limbah", unit: "set", min: 2, seed: 4 },
  { id: "apd-tumpah", name: "APD tumpahan (apron plastik)", category: "K3 & limbah", unit: "pcs", min: 6, seed: 12 },

  { id: "galon-air", name: "Galon air minum karyawan", category: "Umum & fasilitas", unit: "galon", min: 8, seed: 16 },
  { id: "kopi-teh", name: "Kopi / teh / gula pantri", category: "Umum & fasilitas", unit: "pack", min: 4, seed: 8 },
  { id: "gelas", name: "Gelas / cup karyawan", category: "Umum & fasilitas", unit: "pack", min: 4, seed: 8 },
  { id: "baterai", name: "Baterai AA / AAA alat", category: "Umum & fasilitas", unit: "pack", min: 4, seed: 8 },
  { id: "lampu", name: "Lampu cadangan ruang periksa", category: "Umum & fasilitas", unit: "pcs", min: 6, seed: 12 },
  { id: "ac-filter", name: "Filter AC ruang lab", category: "Umum & fasilitas", unit: "pcs", min: 4, seed: 8 },
];

export const stockBranches = priceBranches;

export type MoveType = "masuk" | "pakai" | "distribusi";

export type StockMove = {
  id: string;
  at: string;
  itemId: string;
  qty: number;
  type: MoveType;
  from: string;
  to: string;
};

type QtyMap = Record<string, Record<string, number>>;

export type StockState = {
  qty: QtyMap;
  moves: StockMove[];
  extras: CatalogItem[];
};

const KEY = "biomed-fo-stok-v3";

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 33 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function seedQty(branch: PriceBranchId, item: CatalogItem) {
  if (branch === "serang") return item.seed * 3;
  const factor = 0.28 + (hash(branch + item.id) % 20) / 100;
  return Math.max(item.min, Math.round(item.seed * factor));
}

function emptyQty(): QtyMap {
  const qty: QtyMap = {};
  for (const b of stockBranches) {
    qty[b.id] = {};
    for (const item of catalog) qty[b.id][item.id] = seedQty(b.id, item);
  }
  return qty;
}

function seedMoves(): StockMove[] {
  const moves: StockMove[] = [];
  const now = Date.now();
  for (let d = 13; d >= 0; d--) {
    const day = new Date(now - d * 86400000).toISOString().slice(0, 10);
    for (const b of stockBranches) {
      const n = 4 + (hash(day + b.id) % 5);
      for (let i = 0; i < n; i++) {
        const item = catalog[hash(day + b.id + String(i)) % catalog.length];
        const qty = 1 + (hash(item.id + day) % 3);
        moves.push({
          id: `seed-${day}-${b.id}-${i}`,
          at: `${day}T0${(8 + i) % 9}:00:00.000Z`,
          itemId: item.id,
          qty,
          type: "pakai",
          from: b.id,
          to: "pakai",
        });
      }
    }
    if (d % 3 === 0) {
      const dest = stockBranches[1 + (hash(day) % 4)];
      const item = catalog[hash(day + "dist") % catalog.length];
      moves.push({
        id: `seed-dist-${day}`,
        at: `${day}T07:00:00.000Z`,
        itemId: item.id,
        qty: 4 + (hash(day) % 8),
        type: "distribusi",
        from: "serang",
        to: dest.id,
      });
    }
  }
  return moves;
}

function defaultState(): StockState {
  return { qty: emptyQty(), moves: seedMoves(), extras: [] };
}

export function allItems(state: StockState): CatalogItem[] {
  return [...catalog, ...(state.extras ?? [])];
}

function ensure(state: StockState): StockState {
  const extras = state.extras ?? [];
  const qty: QtyMap = { ...state.qty };
  for (const b of stockBranches) {
    qty[b.id] = { ...(qty[b.id] ?? {}) };
    for (const item of [...catalog, ...extras]) {
      if (qty[b.id][item.id] == null) {
        qty[b.id][item.id] = catalog.some((c) => c.id === item.id) ? seedQty(b.id, item) : 0;
      }
    }
  }
  return { qty, moves: state.moves ?? [], extras };
}

export function loadStock(): StockState {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "");
    if (raw?.qty && raw?.moves) return ensure(raw as StockState);
  } catch {
    /* first run */
  }
  const state = defaultState();
  saveStock(state);
  return state;
}

export function saveStock(state: StockState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function qtyOf(state: StockState, branch: string, itemId: string) {
  return state.qty[branch]?.[itemId] ?? 0;
}

export function itemLedger(state: StockState, branch: string, itemId: string) {
  const sisa = qtyOf(state, branch, itemId);
  const pakai = state.moves
    .filter((m) => m.type === "pakai" && m.itemId === itemId && m.from === branch)
    .reduce((n, m) => n + m.qty, 0);
  const last = state.moves.find((m) => m.type === "distribusi" && m.itemId === itemId && (m.to === branch || m.from === branch));
  const kirim = last?.qty ?? 0;
  const awal = sisa + kirim + pakai;
  return { awal, kirim, pakai, sisa };
}

export function setQty(state: StockState, branch: string, itemId: string, next: number, type: MoveType): StockState {
  const prev = qtyOf(state, branch, itemId);
  const n = Math.max(0, next);
  const delta = n - prev;
  if (delta === 0) return state;
  const qty = {
    ...state.qty,
    [branch]: { ...state.qty[branch], [itemId]: n },
  };
  const move: StockMove = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    itemId,
    qty: Math.abs(delta),
    type: delta < 0 ? "pakai" : type,
    from: branch,
    to: delta < 0 ? "pakai" : branch,
  };
  const nextState = { qty, moves: [move, ...state.moves].slice(0, 800) };
  saveStock(nextState);
  return nextState;
}

export function distribute(state: StockState, itemId: string, to: PriceBranchId, amount: number): StockState | string {
  if (to === "serang") return "Tujuan harus cabang, bukan Serang.";
  const have = qtyOf(state, "serang", itemId);
  if (amount < 1) return "Jumlah minimal 1.";
  if (amount > have) return "Stok Serang tidak cukup.";
  const qty = {
    ...state.qty,
    serang: { ...state.qty.serang, [itemId]: have - amount },
    [to]: { ...state.qty[to], [itemId]: qtyOf(state, to, itemId) + amount },
  };
  const move: StockMove = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    itemId,
    qty: amount,
    type: "distribusi",
    from: "serang",
    to,
  };
  const nextState = { qty, moves: [move, ...state.moves].slice(0, 800) };
  saveStock(nextState);
  return nextState;
}

export function itemName(id: string, state?: StockState) {
  return allItems(state ?? { qty: {}, moves: [], extras: [] }).find((c) => c.id === id)?.name ?? id;
}

export function addItem(
  state: StockState,
  input: { name: string; category: StockCategory; unit: string; min: number; isi?: number },
): StockState {
  const id = `x-${input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}-${Date.now().toString(36)}`;
  const item: CatalogItem = {
    id,
    name: input.name.trim(),
    category: input.category,
    unit: input.unit,
    min: Math.max(0, input.min),
    seed: 0,
    isi: needsIsi(input.unit) ? Math.max(1, input.isi ?? 100) : undefined,
  };
  const qty: QtyMap = { ...state.qty };
  for (const b of stockBranches) {
    qty[b.id] = { ...(qty[b.id] ?? {}), [id]: 0 };
  }
  const next = { qty, moves: state.moves, extras: [...(state.extras ?? []), item] };
  saveStock(next);
  return next;
}

export type StockAlert = {
  branch: string;
  item: CatalogItem;
  qty: number;
  status: "habis" | "menipis";
};

export function alerts(state: StockState): StockAlert[] {
  const out: StockAlert[] = [];
  for (const b of stockBranches) {
    for (const item of allItems(state)) {
      const q = qtyOf(state, b.id, item.id);
      if (q <= 0) out.push({ branch: b.id, item, qty: q, status: "habis" });
      else if (q <= item.min) out.push({ branch: b.id, item, qty: q, status: "menipis" });
    }
  }
  return out.sort((a, b) => (a.status === b.status ? a.qty - b.qty : a.status === "habis" ? -1 : 1));
}

