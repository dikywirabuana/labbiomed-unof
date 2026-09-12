import catalog from "./prices.json";

export const priceBranches = [
  { id: "serang", label: "Serang", updated: "15 Agustus 2026" },
  { id: "cilegon", label: "Cilegon", updated: "16 Agustus 2026" },
  { id: "cikupa", label: "Cikupa", updated: "16 Agustus 2026" },
  { id: "pandeglang", label: "Pandeglang", updated: "21 Agustus 2026" },
  { id: "rangkas", label: "Rangkasbitung", updated: "20 Agustus 2026" },
] as const;

export type PriceBranchId = (typeof priceBranches)[number]["id"];

export type BranchTest = {
  id: string;
  name: string;
  price: number;
  category: string;
};

const data = catalog as Record<PriceBranchId, BranchTest[]>;

export const CABANG_KEY = "biomed-cabang";

export function isPriceBranch(v: string): v is PriceBranchId {
  return priceBranches.some((b) => b.id === v);
}

export function getCabang(): PriceBranchId {
  if (typeof localStorage === "undefined") return "serang";
  const v = localStorage.getItem(CABANG_KEY) ?? "";
  return isPriceBranch(v) ? v : "serang";
}

export function setCabang(id: PriceBranchId) {
  localStorage.setItem(CABANG_KEY, id);
}

export function testsFor(id: PriceBranchId): BranchTest[] {
  return data[id] ?? data.serang;
}

export function categoriesFor(id: PriceBranchId): string[] {
  return [...new Set(testsFor(id).map((t) => t.category))];
}

export function branchMeta(id: PriceBranchId) {
  return priceBranches.find((b) => b.id === id) ?? priceBranches[0];
}
