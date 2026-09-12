import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  categoriesFor,
  getCabang,
  priceBranches,
  setCabang,
  testsFor,
  type PriceBranchId,
} from "@/lib/data/prices";
import { formatRupiah } from "@/lib/utils";

export const Route = createFileRoute("/harga")({ component: HargaPage });

function HargaPage() {
  const [cabang, setCabangState] = useState<PriceBranchId>(() => getCabang());
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Semua");

  const tests = testsFor(cabang);
  const categories = categoriesFor(cabang);
  const meta = priceBranches.find((b) => b.id === cabang)!;

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return tests.filter((t) => {
      const okCat = cat === "Semua" || t.category === cat;
      const okQ = !needle || t.name.toLowerCase().includes(needle);
      return okCat && okQ;
    });
  }, [q, cat, tests]);

  function pick(id: PriceBranchId) {
    setCabangState(id);
    setCabang(id);
    setCat("Semua");
  }

  return (
    <main className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red">Tarif</p>
      <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Daftar harga</h1>
      <p className="mt-4 max-w-2xl text-sm text-muted">
        Tarif {meta.label}, {meta.updated}. Tidak mengikat — konfirmasi saat reservasi.
        Pilih cabang untuk melihat harga di kota itu.
      </p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {priceBranches.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => pick(b.id)}
            className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${
              cabang === b.id ? "bg-red text-chalk" : "border border-line bg-surface text-muted"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="sticky top-20 z-20 mt-6 bg-paper/95 py-3 backdrop-blur">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari pemeriksaan, misal HbA1c"
            className="h-12 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-blue"
          />
        </label>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {["Semua", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`h-9 shrink-0 rounded-full px-3 text-xs font-semibold ${
                cat === c ? "bg-ink text-chalk" : "border border-line bg-surface text-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-2 text-xs text-muted">
        {filtered.length} pemeriksaan · {meta.label}
      </p>
      <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-surface">
        {filtered.map((t) => (
          <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="font-medium">{t.name}</p>
              <p className="text-xs text-muted">{t.category}</p>
            </div>
            <p className="font-display text-lg tabular-nums">{formatRupiah(t.price)}</p>
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted">Tidak ada hasil. Coba kata lain atau cabang lain.</p>
      ) : null}
    </main>
  );
}
