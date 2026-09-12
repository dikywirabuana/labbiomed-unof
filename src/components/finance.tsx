import { useMemo, useState } from "react";
import { priceBranches, type PriceBranchId } from "@/lib/data/prices";
import {
  expenseCats,
  inRange,
  loadExpenses,
  monthBounds,
  saleBranch,
  saveExpenses,
  type Expense,
  type ExpenseCat,
} from "@/lib/fo/finance";
import type { Sale } from "@/lib/fo/store";
import { hutangOf, lunasOf, paidOf } from "@/lib/fo/store";
import { formatRupiah } from "@/lib/utils";

function Bar({ value, max, label }: { value: number; max: number; label: string }) {
  const w = max <= 0 ? 0 : Math.min(100, Math.round((Math.abs(value) / max) * 100));
  return (
    <div>
      <div className="flex justify-between text-xs text-muted">
        <span>{label}</span>
        <span className="tabular-nums">{formatRupiah(value)}</span>
      </div>
      <div className="mt-1 h-3 overflow-hidden rounded-full bg-paper">
        <div className={`h-3 rounded-full ${value < 0 ? "bg-red" : "bg-gold"}`} style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

export function FinancePanel({ sales }: { sales: Sale[] }) {
  const bounds = monthBounds(0);
  const [from, setFrom] = useState(bounds.from);
  const [to, setTo] = useState(bounds.to);
  const [branch, setBranch] = useState<PriceBranchId | "all">("all");
  const [tab, setTab] = useState<"ringkas" | "masuk" | "piutang" | "keluar">("ringkas");
  const [expenses, setExpenses] = useState(loadExpenses);
  const [cat, setCat] = useState<ExpenseCat>("Reagen & alat");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [expBranch, setExpBranch] = useState<PriceBranchId>("serang");

  const payments = useMemo(() => {
    const rows: { id: string; at: string; amount: number; metode: string; sumber: string; nomor: string; nama: string; branch: PriceBranchId }[] = [];
    for (const s of sales) {
      const br = saleBranch(s);
      if (branch !== "all" && br !== branch) continue;
      const pays = s.payments?.length
        ? s.payments
        : [{ id: `${s.id}-awal`, at: s.created, amount: paidOf(s), metode: s.metode, note: "kasir" as const }];
      for (const p of pays) {
        if (!inRange(p.at, from, to)) continue;
        rows.push({
          id: p.id,
          at: p.at,
          amount: p.amount,
          metode: p.metode,
          sumber: p.note === "pelunasan" ? "Pelunasan hutang" : "Kasir",
          nomor: s.nomor,
          nama: s.nama,
          branch: br,
        });
      }
    }
    return rows.sort((a, b) => (a.at < b.at ? 1 : -1));
  }, [sales, from, to, branch]);

  const piutang = useMemo(
    () =>
      sales.filter((s) => {
        if (lunasOf(s)) return false;
        if (branch !== "all" && saleBranch(s) !== branch) return false;
        return true;
      }),
    [sales, branch],
  );

  const keluar = useMemo(
    () =>
      expenses.filter((e) => {
        if (!inRange(e.at, from, to)) return false;
        if (branch !== "all" && e.branch !== branch) return false;
        return true;
      }),
    [expenses, from, to, branch],
  );

  const masukTotal = payments.reduce((n, p) => n + p.amount, 0);
  const hutangTotal = piutang.reduce((n, s) => n + hutangOf(s), 0);
  const keluarTotal = keluar.reduce((n, e) => n + e.amount, 0);
  const laba = masukTotal - keluarTotal;

  const perCabang = priceBranches.map((b) => {
    const masuk = sales
      .filter((s) => saleBranch(s) === b.id)
      .flatMap((s) => s.payments ?? [{ at: s.created, amount: paidOf(s) }])
      .filter((p) => inRange(p.at, from, to))
      .reduce((n, p) => n + p.amount, 0);
    const out = expenses.filter((e) => inRange(e.at, from, to) && e.branch === b.id).reduce((n, e) => n + e.amount, 0);
    const piut = sales.filter((s) => saleBranch(s) === b.id && !lunasOf(s)).reduce((n, s) => n + hutangOf(s), 0);
    return { ...b, masuk, out, piut, laba: masuk - out };
  });
  const maxBar = Math.max(1, ...perCabang.flatMap((b) => [b.masuk, b.out]));

  const byMetode = payments.reduce<Record<string, number>>((acc, s) => {
    acc[s.metode] = (acc[s.metode] ?? 0) + s.amount;
    return acc;
  }, {});

  const byCat = keluar.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});

  function addExpense() {
    const n = Number(amount.replace(/\D/g, ""));
    if (n < 1) return;
    const row: Expense = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      branch: expBranch,
      category: cat,
      note: note.trim() || cat,
      amount: n,
    };
    const next = [row, ...expenses];
    setExpenses(next);
    saveExpenses(next);
    setAmount("");
    setNote("");
  }

  function removeExpense(id: string) {
    const next = expenses.filter((e) => e.id !== id);
    setExpenses(next);
    saveExpenses(next);
  }

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-hidden p-4">
      <div className="flex flex-wrap gap-2">
        {priceBranches.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setBranch(b.id)}
            className={`h-9 rounded-full px-3 text-xs font-semibold ${
              branch === b.id ? "bg-red text-chalk" : "border border-line bg-surface text-muted"
            }`}
          >
            {b.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setBranch("all")}
          className={`h-9 rounded-full px-3 text-xs font-semibold ${
            branch === "all" ? "bg-ink text-chalk" : "border border-line bg-surface text-muted"
          }`}
        >
          Semua cabang
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label className="text-xs font-medium">
          Dari
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 block h-10 rounded-lg border border-line bg-surface px-2 text-sm" />
        </label>
        <label className="text-xs font-medium">
          Sampai
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="mt-1 block h-10 rounded-lg border border-line bg-surface px-2 text-sm" />
        </label>
        <div className="flex gap-2">
          {(
            [
              ["ringkas", "Ringkasan"],
              ["masuk", "Uang masuk"],
              ["piutang", "Hutang"],
              ["keluar", "Pengeluaran"],
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
      </div>

      {tab === "ringkas" ? (
        <div className="mt-4 min-h-0 flex-1 space-y-6 overflow-auto">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-xs uppercase tracking-widest text-muted">Uang masuk</p>
              <p className="mt-1 font-display text-3xl">{formatRupiah(masukTotal)}</p>
              <p className="mt-1 text-xs text-muted">Kasir + pelunasan hutang</p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-xs uppercase tracking-widest text-muted">Piutang</p>
              <p className="mt-1 font-display text-3xl">{formatRupiah(hutangTotal)}</p>
              <p className="mt-1 text-xs text-muted">{piutang.length} pasien belum lunas</p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-xs uppercase tracking-widest text-muted">Pengeluaran</p>
              <p className="mt-1 font-display text-3xl">{formatRupiah(keluarTotal)}</p>
              <p className="mt-1 text-xs text-muted">{keluar.length} bukti keluar</p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-xs uppercase tracking-widest text-muted">Laba / rugi</p>
              <p className={`mt-1 font-display text-3xl ${laba < 0 ? "text-red" : ""}`}>{formatRupiah(laba)}</p>
              <p className="mt-1 text-xs text-muted">Uang masuk − pengeluaran</p>
            </div>
          </div>
          <section>
            <h2 className="font-display text-2xl">Per cabang</h2>
            <p className="text-sm text-muted">Kuning pendapatan, angka laba di kanan.</p>
            <div className="mt-3 space-y-4 rounded-xl border border-line bg-surface p-4">
              {perCabang.map((b) => (
                <div key={b.id}>
                  <p className="text-sm font-medium">
                    {b.label}
                    <span className={`ml-2 text-xs ${b.laba < 0 ? "text-red" : "text-muted"}`}>{formatRupiah(b.laba)}</span>
                  </p>
                  <div className="mt-2 space-y-2">
                    <Bar label="Masuk" value={b.masuk} max={maxBar} />
                    <Bar label="Keluar" value={b.out} max={maxBar} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : null}

      {tab === "masuk" ? (
        <div className="mt-4 min-h-0 flex-1 overflow-auto">
          <p className="text-sm text-muted">
            Uang masuk = bayar kasir + pelunasan hutang. {Object.entries(byMetode).map(([k, v]) => `${k} ${formatRupiah(v)}`).join(" · ") || "—"}
          </p>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
            {payments.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <div>
                  <p className="font-medium">{p.nomor} · {p.nama}</p>
                  <p className="text-xs text-muted">
                    {p.sumber} · {p.metode} · {new Date(p.at).toLocaleString("id-ID")}
                  </p>
                </div>
                <p className="font-display text-xl tabular-nums">{formatRupiah(p.amount)}</p>
              </li>
            ))}
            {payments.length === 0 ? <li className="px-4 py-6 text-sm text-muted">Belum ada uang masuk di rentang ini.</li> : null}
          </ul>
        </div>
      ) : null}

      {tab === "piutang" ? (
        <div className="mt-4 min-h-0 flex-1 overflow-auto">
          <p className="text-sm text-muted">Belum lunas — hasil lab terkunci sampai dilunasi di kasir (pasien lama).</p>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
            {piutang.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <div>
                  <p className="font-medium">{s.nomor} · {s.nama}</p>
                  <p className="text-xs text-muted">
                    {s.cabang} · tagihan {formatRupiah(s.total)} · sudah {formatRupiah(paidOf(s))}
                  </p>
                </div>
                <p className="font-display text-xl tabular-nums text-red">{formatRupiah(hutangOf(s))}</p>
              </li>
            ))}
            {piutang.length === 0 ? <li className="px-4 py-6 text-sm text-muted">Tidak ada hutang terbuka.</li> : null}
          </ul>
        </div>
      ) : null}

      {tab === "keluar" ? (
        <div className="mt-4 min-h-0 flex-1 space-y-4 overflow-auto">
          <form
            className="grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              addExpense();
            }}
          >
            <label className="text-sm font-medium">
              Cabang
              <select value={expBranch} onChange={(e) => setExpBranch(e.target.value as PriceBranchId)} className="mt-1 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm">
                {priceBranches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium">
              Kelompok
              <select value={cat} onChange={(e) => setCat(e.target.value as ExpenseCat)} className="mt-1 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm">
                {expenseCats.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium">
              Keterangan
              <input value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm" />
            </label>
            <label className="text-sm font-medium">
              Jumlah (Rp)
              <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))} inputMode="numeric" className="mt-1 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm tabular-nums" />
            </label>
            <button type="submit" className="h-11 rounded-full bg-red text-sm font-semibold text-chalk sm:col-span-2">
              Catat pengeluaran
            </button>
          </form>
          <p className="text-xs text-muted">
            {Object.entries(byCat)
              .map(([k, v]) => `${k} ${formatRupiah(v)}`)
              .join(" · ")}
          </p>
          <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
            {keluar.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <div>
                  <p className="font-medium">{e.note}</p>
                  <p className="text-xs text-muted">
                    {priceBranches.find((b) => b.id === e.branch)?.label} · {e.category} · {new Date(e.at).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-display text-xl tabular-nums">{formatRupiah(e.amount)}</p>
                  <button type="button" className="text-xs font-semibold text-red" onClick={() => removeExpense(e.id)}>
                    Hapus
                  </button>
                </div>
              </li>
            ))}
            {keluar.length === 0 ? <li className="px-4 py-6 text-sm text-muted">Belum ada pengeluaran di rentang ini.</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
