import { useMemo, useState } from "react";
import { Minus, Plus, Search } from "lucide-react";
import { getCabang, type PriceBranchId } from "@/lib/data/prices";
import {
  addItem,
  alerts,
  allItems,
  catalog,
  distribute,
  isiOf,
  itemLedger,
  itemName,
  loadStock,
  needsIsi,
  qtyLabel,
  qtyOf,
  setQty,
  stockBranches,
  stockCategories,
  type StockCategory,
  type StockState,
} from "@/lib/fo/inventory";

const units = ["pcs", "box", "pak", "rak", "botol", "kit", "vial", "roll", "galon", "set", "pack"];

function Bar({ value, max, label }: { value: number; max: number; label: string }) {
  const w = max <= 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-muted">
        <span>{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
      <div className="mt-1 h-3 overflow-hidden rounded-full bg-paper">
        <div className="h-3 rounded-full bg-red" style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

export function StockList() {
  const [state, setState] = useState<StockState>(loadStock);
  const [tab, setTab] = useState<"kontrol" | "stok" | "butuh" | "tambah" | "dist" | "grafik">("kontrol");
  const [branch, setBranch] = useState<PriceBranchId>(getCabang);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Semua");
  const [distItem, setDistItem] = useState(catalog[0]?.id ?? "edta-3");
  const [distTo, setDistTo] = useState<PriceBranchId>("cilegon");
  const [distQty, setDistQty] = useState("4");
  const [distMsg, setDistMsg] = useState("");
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState<StockCategory>("Habis pakai periksa");
  const [newUnit, setNewUnit] = useState("box");
  const [newIsi, setNewIsi] = useState("100");
  const [newMin, setNewMin] = useState("4");
  const [addMsg, setAddMsg] = useState("");

  const items = allItems(state);
  const flag = alerts(state);
  const habis = flag.filter((a) => a.status === "habis");
  const tipis = flag.filter((a) => a.status === "menipis");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((c) => {
      const okCat = cat === "Semua" || c.category === cat;
      const okQ = !needle || c.name.toLowerCase().includes(needle);
      return okCat && okQ;
    });
  }, [q, cat, items]);

  function bump(id: string, d: number) {
    setState((s) => setQty(s, branch, id, qtyOf(s, branch, id) + d, d > 0 ? "masuk" : "pakai"));
  }

  function sendDist() {
    const n = Number(distQty);
    const res = distribute(state, distItem, distTo, n);
    if (typeof res === "string") {
      setDistMsg(res);
      return;
    }
    setState(res);
    setDistMsg(`Terkirim ${n} ke ${stockBranches.find((b) => b.id === distTo)?.label}.`);
  }

  function submitItem() {
    if (newName.trim().length < 2) {
      setAddMsg("Nama barang wajib.");
      return;
    }
    const next = addItem(state, {
      name: newName,
      category: newCat,
      unit: newUnit,
      min: Number(newMin) || 0,
      isi: needsIsi(newUnit) ? Number(newIsi) || 100 : undefined,
    });
    setState(next);
    setNewName("");
    setAddMsg("Barang ditambahkan. Isi stok di tab Stok cabang atau kirim dari Serang.");
  }

  const days = useMemo(() => {
    const out: { day: string; pakai: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const day = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      const pakai = state.moves
        .filter((m) => m.type === "pakai" && m.at.slice(0, 10) === day)
        .reduce((s, m) => s + m.qty, 0);
      out.push({ day: day.slice(5), pakai });
    }
    return out;
  }, [state.moves]);

  const perBranchSisa = stockBranches.map((b) => ({
    id: b.id,
    label: b.label,
    sisa: items.reduce((s, c) => s + qtyOf(state, b.id, c.id), 0),
  }));

  const perBranchDist = stockBranches
    .filter((b) => b.id !== "serang")
    .map((b) => ({
      label: b.label,
      qty: state.moves.filter((m) => m.type === "distribusi" && m.to === b.id).reduce((s, m) => s + m.qty, 0),
    }));

  const maxPakai = Math.max(1, ...days.map((d) => d.pakai));
  const maxSisa = Math.max(1, ...perBranchSisa.map((b) => b.sisa));
  const maxDist = Math.max(1, ...perBranchDist.map((b) => b.qty));

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-hidden p-4">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["kontrol", "Kontrol"],
            ["butuh", "Kebutuhan cabang"],
            ["stok", "Stok cabang"],
            ["tambah", "Tambah barang"],
            ["dist", "Distribusi"],
            ["grafik", "Grafik"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`h-10 rounded-full px-4 text-sm font-semibold ${
              tab === id ? "bg-ink text-chalk" : "border border-line bg-surface text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "kontrol" ? (
        <div className="mt-4 min-h-0 flex-1 space-y-6 overflow-auto">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-xs uppercase tracking-widest text-muted">Habis</p>
              <p className="mt-1 font-display text-4xl text-red">{habis.length}</p>
              <p className="mt-1 text-xs text-muted">
                {stockBranches
                  .map((b) => {
                    const n = habis.filter((a) => a.branch === b.id).length;
                    return n ? `${b.label} ${n}` : "";
                  })
                  .filter(Boolean)
                  .join(" · ") || "Tidak ada"}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-xs uppercase tracking-widest text-muted">Menipis</p>
              <p className="mt-1 font-display text-4xl">{tipis.length}</p>
              <p className="mt-1 text-xs text-muted">
                {stockBranches
                  .map((b) => {
                    const n = tipis.filter((a) => a.branch === b.id).length;
                    return n ? `${b.label} ${n}` : "";
                  })
                  .filter(Boolean)
                  .join(" · ") || "Tidak ada"}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-xs uppercase tracking-widest text-muted">Aman</p>
              <p className="mt-1 font-display text-4xl">
                {items.length * stockBranches.length - flag.length}
              </p>
              <p className="mt-1 text-xs text-muted">Di atas minimum di semua cabang</p>
            </div>
          </div>
          {stockBranches.map((b) => {
            const list = flag.filter((a) => a.branch === b.id);
            return (
              <div key={b.id}>
                <h2 className="font-display text-2xl">
                  {b.label}
                  {b.id === "serang" ? " · gudang pusat" : ""}
                </h2>
                <p className="text-sm text-muted">sisa awal − dikirim − pakai = sisa</p>
                {list.length === 0 ? (
                  <p className="mt-2 text-sm text-muted">Tidak ada yang menipis di {b.label}.</p>
                ) : (
                  <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
                    {list.slice(0, 12).map((a) => {
                      const L = itemLedger(state, b.id, a.item.id);
                      return (
                        <li key={a.item.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                          <div>
                            <p className="font-medium">{a.item.name}</p>
                            <p className="text-xs tabular-nums text-muted">
                              {L.awal} − {L.kirim} − {L.pakai} = {L.sisa} {a.item.unit}
                            </p>
                          </div>
                          <p className={`font-display text-2xl tabular-nums ${L.sisa <= 0 ? "text-red" : ""}`}>{L.sisa}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "butuh" ? (
        <div className="mt-4 min-h-0 flex-1 overflow-auto">
          <div className="flex gap-2 overflow-x-auto">
            {stockBranches.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBranch(b.id)}
                className={`h-9 shrink-0 rounded-full px-3 text-xs font-semibold ${
                  branch === b.id ? "bg-red text-chalk" : "border border-line bg-surface text-muted"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            Daftar barang yang habis atau menipis di {stockBranches.find((b) => b.id === branch)?.label}. Jumlah usulan = sampai minimum. Kirim dari gudang Serang.
          </p>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
            {flag
              .filter((a) => a.branch === branch)
              .map((a) => {
                const need = Math.max(a.item.min - a.qty, 1);
                const pusat = qtyOf(state, "serang", a.item.id);
                const can = branch !== "serang" && pusat >= need;
                const L = itemLedger(state, branch, a.item.id);
                return (
                  <li key={a.item.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <p className="font-medium">{a.item.name}</p>
                      <p className="text-xs tabular-nums text-muted">
                        {L.awal} − {L.kirim} − {L.pakai} = {L.sisa} {a.item.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className={`font-display text-2xl tabular-nums ${L.sisa <= 0 ? "text-red" : ""}`}>{L.sisa}</p>
                      {branch === "serang" ? (
                        <p className="text-xs text-muted">Supplier</p>
                      ) : (
                        <button
                          type="button"
                          disabled={!can}
                          onClick={() => {
                            const res = distribute(state, a.item.id, branch, need);
                            if (typeof res === "string") {
                              setDistMsg(res);
                              return;
                            }
                            setState(res);
                            setDistMsg(`Terkirim ${need} ${a.item.unit}.`);
                          }}
                          className="h-9 rounded-full bg-gold px-3 text-xs font-semibold text-ink disabled:opacity-40"
                        >
                          Kirim {need}
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            {flag.filter((a) => a.branch === branch).length === 0 ? (
              <li className="px-4 py-6 text-sm text-muted">Tidak ada kebutuhan di cabang ini.</li>
            ) : null}
          </ul>
          {distMsg ? <p className="mt-3 text-sm text-muted">{distMsg}</p> : null}
        </div>
      ) : null}

      {tab === "stok" ? (
        <>
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {stockBranches.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBranch(b.id)}
                className={`h-9 shrink-0 rounded-full px-3 text-xs font-semibold ${
                  branch === b.id ? "bg-red text-chalk" : "border border-line bg-surface text-muted"
                }`}
              >
                {b.label}
                {b.id === "serang" ? " · gudang" : ""}
              </button>
            ))}
          </div>
          <label className="relative mt-3 block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari barang"
              className="h-12 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-blue"
            />
          </label>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {["Semua", ...stockCategories].map((c) => (
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
          <ul className="mt-4 min-h-0 flex-1 overflow-auto divide-y divide-line rounded-xl border border-line bg-surface">
            {rows.map((c) => {
              const qty = qtyOf(state, branch, c.id);
              const danger = qty <= c.min;
              return (
                <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted">
                      min {c.min} {c.unit}
                      {isiOf(c) > 1 ? ` · 1 ${c.unit} = ${isiOf(c)} pcs` : ""}
                      {danger ? " · restok dari Serang" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="grid size-9 place-items-center rounded-full border border-line" onClick={() => bump(c.id, -1)}>
                      <Minus className="size-3" />
                    </button>
                    <span className={`min-w-16 text-center font-display text-lg tabular-nums ${danger ? "text-red" : ""}`}>{qty}</span>
                    <button type="button" className="grid size-9 place-items-center rounded-full border border-line" onClick={() => bump(c.id, 1)}>
                      <Plus className="size-3" />
                    </button>
                    <span className="w-28 text-xs text-muted">{qtyLabel(c, qty)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}

      {tab === "tambah" ? (
        <form
          className="mt-4 max-w-xl space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            submitItem();
          }}
        >
          <p className="text-sm text-muted">Barang baru masuk katalog semua cabang, stok awal 0. Jika satuan box/pak/rak/vial, isi jumlah pcs di dalamnya.</p>
          <label className="block text-sm font-medium">
            Nama barang
            <input value={newName} onChange={(e) => setNewName(e.target.value)} className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm" />
          </label>
          <label className="block text-sm font-medium">
            Kelompok
            <select value={newCat} onChange={(e) => setNewCat(e.target.value as StockCategory)} className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm">
              {stockCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Satuan
              <select value={newUnit} onChange={(e) => setNewUnit(e.target.value)} className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm">
                {units.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Minimum
              <input value={newMin} onChange={(e) => setNewMin(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm" />
            </label>
          </div>
          {needsIsi(newUnit) ? (
            <label className="block text-sm font-medium">
              Isi per {newUnit} (pcs)
              <input value={newIsi} onChange={(e) => setNewIsi(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm" />
              <span className="mt-1 block text-xs text-muted">Contoh: 1 box = 100 pcs sarung tangan.</span>
            </label>
          ) : null}
          <button type="submit" className="h-12 w-full rounded-full bg-red text-sm font-semibold text-chalk">
            Simpan barang
          </button>
          {addMsg ? <p className="text-sm text-muted">{addMsg}</p> : null}
        </form>
      ) : null}

      {tab === "dist" ? (
        <div className="mt-4 max-w-xl space-y-4">
          <p className="text-sm text-muted">Gudang Serang mengirim ke cabang lain.</p>
          <label className="block text-sm font-medium">
            Barang
            <select value={distItem} onChange={(e) => setDistItem(e.target.value)} className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm">
              {items.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · Serang {qtyOf(state, "serang", c.id)} {c.unit}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Cabang tujuan
            <select value={distTo} onChange={(e) => setDistTo(e.target.value as PriceBranchId)} className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm">
              {stockBranches
                .filter((b) => b.id !== "serang")
                .map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Jumlah ({items.find((i) => i.id === distItem)?.unit ?? "unit"})
            <input value={distQty} onChange={(e) => setDistQty(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm" />
          </label>
          <button type="button" onClick={sendDist} className="h-12 w-full rounded-full bg-red text-sm font-semibold text-chalk">
            Kirim dari Serang
          </button>
          {distMsg ? <p className="text-sm text-muted">{distMsg}</p> : null}
          <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
            {state.moves
              .filter((m) => m.type === "distribusi")
              .slice(0, 8)
              .map((m) => (
                <li key={m.id} className="px-4 py-3 text-sm">
                  {itemName(m.itemId, state)} · {m.qty} · Serang → {stockBranches.find((b) => b.id === m.to)?.label ?? m.to}
                </li>
              ))}
          </ul>
        </div>
      ) : null}

      {tab === "grafik" ? (
        <div className="mt-4 min-h-0 flex-1 space-y-8 overflow-auto">
          <section>
            <h2 className="font-display text-2xl">Sisa stok per cabang</h2>
            <div className="mt-3 space-y-3 rounded-xl border border-line bg-surface p-4">
              {perBranchSisa.map((b) => (
                <Bar key={b.id} label={b.label} value={b.sisa} max={maxSisa} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl">Pemakaian 14 hari</h2>
            <div className="mt-3 flex h-40 items-end gap-1 rounded-xl border border-line bg-surface p-4">
              {days.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center justify-end gap-1">
                  <div className="w-full rounded-t bg-red" style={{ height: `${Math.round((d.pakai / maxPakai) * 100)}%` }} />
                  <span className="text-xs text-muted">{d.day.slice(3)}</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl">Distribusi dari Serang</h2>
            <div className="mt-3 space-y-3 rounded-xl border border-line bg-surface p-4">
              {perBranchDist.map((b) => (
                <Bar key={b.label} label={b.label} value={b.qty} max={maxDist} />
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
