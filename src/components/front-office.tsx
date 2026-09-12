import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Minus, Plus, Search, Trash2, X } from "lucide-react";
import { branches } from "@/lib/data/branches";
import {
  getCabang,
  isPriceBranch,
  priceBranches,
  setCabang,
  testsFor,
  type PriceBranchId,
} from "@/lib/data/prices";
import { formatRupiah } from "@/lib/utils";
import { company } from "@/lib/data/company";
import {
  ageOf,
  findPatient,
  hutangOf,
  loadPatients,
  loadSales,
  lunasOf,
  nextNomor,
  paidOf,
  savePatients,
  saveSales,
  type CartItem,
  type Gender,
  type Hasil,
  type Patient,
  type Sale,
} from "@/lib/fo/store";
import { LabResults } from "@/components/lab-results";
import { StockList } from "@/components/stock-list";
import { ImagingDesk } from "@/components/imaging";
import { FinancePanel } from "@/components/finance";
import { refFor } from "@/lib/fo/ref-ranges";
import { code128Svg, sampleCode } from "@/lib/fo/barcode";
import { hasilUrl, kodeOf, linkMark, markCss, validasiUrl } from "@/lib/fo/hasil-share";
import { publishSale } from "@/lib/fo/publish";

const methods = ["Tunai", "QRIS", "Debit", "Asuransi", "Perusahaan"] as const;
const FO_PIN = "bio1234";

function printStruk(sale: Sale, patient?: Patient | null) {
  const rows = sale.items
    .map(
      (i) =>
        `<tr><td>${i.name}</td><td class="r">${i.qty}</td><td class="r">${formatRupiah(i.price * i.qty)}</td></tr>`,
    )
    .join("");
  const when = new Date(sale.created).toLocaleString("id-ID");
  const idLine = patient
    ? `${patient.kelamin === "P" ? "Perempuan" : "Laki-laki"} · ${ageOf(patient.lahir)} · KTP ${patient.ktp}`
    : `KTP ${sale.ktp}`;
  const kode = kodeOf(sale);
  const url = hasilUrl(kode);
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Struk ${sale.nomor}</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#1a2832;margin:0;padding:16px}
  h1{font-size:18px;margin:0} p,td{font-size:12px}
  table{width:100%;border-collapse:collapse;margin-top:8px}
  td{padding:4px 0;border-bottom:1px dashed #d4dce3} .r{text-align:right}
  .muted{color:#5d6d78} .big{font-size:22px;font-weight:700;letter-spacing:.12em}
  ${markCss()}
  @media print { button { display:none } }
</style></head><body>
  <p class="muted">${company.legalName}</p>
  <h1>${company.brand}</h1>
  <p>${sale.cabang}<br>${when}</p>
  <p class="big">${sale.nomor}</p>
  <p>Pasien: <strong>${sale.nama}</strong><br>HP: ${sale.hp}<br>${idLine}</p>
  <table>${rows}
    <tr><td colspan="2">Total</td><td class="r"><strong>${formatRupiah(sale.total)}</strong></td></tr>
    <tr><td colspan="2">${sale.metode}</td><td class="r">${formatRupiah(sale.bayar)}</td></tr>
    <tr><td colspan="2">Kembali</td><td class="r">${formatRupiah(sale.kembali)}</td></tr>
  </table>
  <p class="muted">Tanda pembayaran. Bukan hasil lab.${hutangOf(sale) > 0 ? ` Sisa hutang ${formatRupiah(hutangOf(sale))}. Hasil terkunci sampai lunas.` : " Pindai barcode untuk membuka hasil jika sudah selesai."}</p>
  ${linkMark(url, kode, "Barcode hasil pemeriksaan")}
  <button onclick="window.print()">Cetak</button>
  <script>window.onload=()=>window.print()<\/script>
</body></html>`;
  const w = window.open("", "struk-biomed", "width=420,height=760");
  if (!w) return;
  w.document.write(html);
  w.document.close();
}

function printStiker(sale: Sale, patient?: Patient | null) {
  const code = sampleCode(sale.nomor, sale.created);
  const umur = patient ? ageOf(patient.lahir) : "";
  const svg = code128Svg(code, 40);
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Stiker EDTA ${sale.nomor}</title>
<style>
  @page { size: 50mm 30mm; margin: 2mm }
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#111;margin:0;padding:4px;width:46mm}
  .bc{width:100%;height:14mm}
  .bc svg{width:100%;height:14mm}
  .nama{font-size:11px;font-weight:700;margin-top:2px;line-height:1.2}
  .meta{font-size:9px;margin-top:1px}
  .edta{font-size:8px;letter-spacing:.18em;margin-top:2px;font-weight:700}
  @media print { button { display:none } body { print-color-adjust: exact } }
</style></head><body>
  <div class="bc">${svg}</div>
  <div class="nama">${sale.nama}</div>
  <div class="meta">${umur ? `Umur ${umur}` : ""} · ${sale.nomor}</div>
  <div class="edta">EDTA</div>
  <button onclick="window.print()">Cetak stiker</button>
  <script>window.onload=()=>window.print()<\/script>
</body></html>`;
  const w = window.open("", "stiker-edta", "width=360,height=280");
  if (!w) return;
  w.document.write(html);
  w.document.close();
}

function printHasil(sale: Sale, patient?: Patient | null) {
  const rows = sale.hasil
    .map(
      (h) =>
        `<tr><td>${h.name}</td><td>${h.ready ? h.nilai || "—" : "Menunggu"}</td><td>${h.catatan || "—"}</td></tr>`,
    )
    .join("");
  const when = new Date(sale.created).toLocaleString("id-ID");
  const kode = kodeOf(sale);
  const url = validasiUrl(kode);
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Hasil ${sale.nomor}</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#1a2832;margin:0;padding:16px}
  h1{font-size:18px;margin:0} p,td,th{font-size:12px}
  table{width:100%;border-collapse:collapse;margin-top:8px}
  th,td{padding:6px 0;border-bottom:1px solid #d4dce3;text-align:left}
  .muted{color:#5d6d78}
  ${markCss()}
  @media print { button { display:none } }
</style></head><body>
  <p class="muted">${company.legalName}</p>
  <h1>Hasil laboratorium</h1>
  <p>${sale.cabang} · ${when} · ${sale.nomor}</p>
  <p><strong>${sale.nama}</strong><br>HP ${sale.hp}${patient ? `<br>${patient.kelamin === "P" ? "Perempuan" : "Laki-laki"} · ${ageOf(patient.lahir)} · KTP ${patient.ktp}` : ""}</p>
  <table><thead><tr><th>Pemeriksaan</th><th>Hasil</th><th>Catatan</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="muted">Pindai barcode untuk validasi keaslian surat hasil.</p>
  ${linkMark(url, kode, "Barcode keabsahan surat hasil")}
  <button onclick="window.print()">Cetak</button>
  <script>window.onload=()=>window.print()<\/script>
</body></html>`;
  const w = window.open("", "hasil-biomed", "width=520,height=800");
  if (!w) return;
  w.document.write(html);
  w.document.close();
}

export function FrontOffice() {
  const [open, setOpen] = useState(false);
  const [gate, setGate] = useState(false);
  const [desk, setDesk] = useState<"kasir" | "hasil" | "stok" | "uang" | "usg" | "radio" | null>(null);
  const [pin, setPin] = useState("");
  const [pinErr, setPinErr] = useState(false);
  const [cabang, setCabangId] = useState<PriceBranchId>("serang");
  const [mode, setMode] = useState<"baru" | "lama">("baru");
  const [nama, setNama] = useState("");
  const [hp, setHp] = useState("");
  const [kelamin, setKelamin] = useState<Gender>("L");
  const [lahir, setLahir] = useState("");
  const [ktp, setKtp] = useState("");
  const [lookup, setLookup] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [picked, setPicked] = useState<Patient | null>(null);
  const [openSale, setOpenSale] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [metode, setMetode] = useState<(typeof methods)[number]>("Tunai");
  const [tunai, setTunai] = useState("");
  const [sales, setSales] = useState<Sale[]>([]);
  const [settleAmt, setSettleAmt] = useState("");
  const [last, setLast] = useState<Sale | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSales(loadSales());
    setPatients(loadPatients());
    setCabangId(getCabang());
  }, [open]);

  const catalog = testsFor(cabang);
  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return catalog.slice(0, 12);
    return catalog.filter((t) => t.name.toLowerCase().includes(needle)).slice(0, 40);
  }, [q, catalog]);

  const found = useMemo(() => findPatient(patients, lookup), [patients, lookup]);
  const riwayat = picked ? sales.filter((s) => s.patientId === picked.id) : [];

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const paid = Number(tunai.replace(/\D/g, "")) || 0;
  const kembali = Math.max(0, paid - total);
  const hutangBaru = Math.max(0, total - paid);

  const baruOk =
    mode === "baru" &&
    nama.trim().length > 1 &&
    hp.trim().length >= 8 &&
    lahir.length === 10 &&
    ktp.replace(/\D/g, "").length >= 8;
  const lamaOk = mode === "lama" && !!picked;
  const canPay = (baruOk || lamaOk) && cart.length > 0;

  function addItem(id: string, name: string, price: number) {
    setCart((prev) => {
      const foundItem = prev.find((i) => i.id === id);
      if (foundItem) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id, name, price, qty: 1 }];
    });
    setQ("");
    searchRef.current?.focus();
  }

  function qty(id: string, d: number) {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0));
  }

  function pickPatient(p: Patient) {
    setPicked(p);
    setNama(p.nama);
    setHp(p.hp);
    setKelamin(p.kelamin);
    setLahir(p.lahir);
    setKtp(p.ktp);
    setMode("lama");
  }

  function persistPatients(list: Patient[]) {
    setPatients(list);
    savePatients(list);
  }

  function persistSales(list: Sale[]) {
    setSales(list);
    saveSales(list);
  }

  function checkout() {
    if (!canPay) return;
    const digits = ktp.replace(/\D/g, "");
    let patient = picked;
    if (mode === "baru") {
      const exist = patients.find((p) => p.ktp.replace(/\D/g, "") === digits);
      if (exist) {
        patient = exist;
      } else {
        patient = {
          id: crypto.randomUUID(),
          nama: nama.trim(),
          hp: hp.trim(),
          kelamin,
          lahir,
          ktp: digits,
          created: new Date().toISOString(),
        };
        persistPatients([patient, ...patients]);
      }
    }
    if (!patient) return;
    const hasil: Hasil[] = cart.map((i) => {
      const ref = refFor(i.name, patient.kelamin);
      return {
        itemId: i.id,
        name: i.name,
        nilai: "",
        satuan: ref.satuan,
        rujukan: ref.rujukan,
        flag: "" as const,
        catatan: "",
        ready: false,
      };
    });
    const id = crypto.randomUUID();
    const nomor = nextNomor(sales);
    const now = new Date().toISOString();
    const masuk = Math.min(paid, total);
    const sale: Sale = {
      id,
      nomor,
      kode: `${nomor}-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`,
      patientId: patient.id,
      nama: patient.nama,
      hp: patient.hp,
      ktp: patient.ktp,
      cabang: priceBranches.find((b) => b.id === cabang)?.label ?? cabang,
      items: cart,
      hasil,
      total,
      metode,
      bayar: masuk,
      kembali,
      created: now,
      payments:
        masuk > 0
          ? [{ id: crypto.randomUUID(), at: now, amount: masuk, metode, note: "kasir" }]
          : [],
    };
    persistSales([sale, ...sales]);
    void publishSale(sale, patient);
    setLast(sale);
    setPicked(patient);
    setCart([]);
    setTunai("");
    setQ("");
    if (mode === "baru") {
      setNama("");
      setHp("");
      setLahir("");
      setKtp("");
      setPicked(null);
    }
  }

  function settleHutang(saleId: string) {
    const amount = Number(settleAmt.replace(/\D/g, "")) || 0;
    const sale = sales.find((s) => s.id === saleId);
    if (!sale || amount < 1) return;
    const sisa = hutangOf(sale);
    const pay = Math.min(amount, sisa);
    if (pay < 1) return;
    const now = new Date().toISOString();
    const next: Sale = {
      ...sale,
      payments: [
        ...(sale.payments ?? []),
        { id: crypto.randomUUID(), at: now, amount: pay, metode, note: "pelunasan" },
      ],
    };
    next.bayar = paidOf(next);
    next.kembali = 0;
    persistSales(sales.map((s) => (s.id === saleId ? next : s)));
    void publishSale(next, patients.find((p) => p.id === next.patientId));
    setSettleAmt("");
    setLast(next);
  }

  function patchHasil(saleId: string, itemId: string, patch: Partial<Hasil>) {
    const next = sales.map((s) =>
      s.id !== saleId
        ? s
        : { ...s, hasil: s.hasil.map((h) => (h.itemId === itemId ? { ...h, ...patch } : h)) },
    );
    persistSales(next);
    const sale = next.find((s) => s.id === saleId);
    if (sale) void publishSale(sale, patients.find((p) => p.id === sale.patientId));
  }

  function unlock(e: FormEvent) {
    e.preventDefault();
    if (pin === FO_PIN) {
      setPin("");
      setPinErr(false);
      setGate(false);
      setOpen(true);
      return;
    }
    setPinErr(true);
  }

  function closeKasir() {
    setOpen(false);
    setGate(false);
    setDesk(null);
    setPin("");
    setPinErr(false);
  }

  if (!open && !gate) {
    return (
      <button
        type="button"
        aria-label="Buka kasir front office"
        onClick={() => {
          setPin("");
          setPinErr(false);
          setGate(true);
        }}
        className="fixed bottom-0 left-1/2 z-50 flex h-12 w-20 -translate-x-1/2 items-center justify-center rounded-t-xl bg-gold text-ink"
      >
        <svg viewBox="0 0 40 22" className="h-6 w-10" aria-hidden="true">
          <polygon points="20,0 40,22 0,22" fill="currentColor" />
        </svg>
      </button>
    );
  }

  if (gate && !open) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-blue-deep/60 p-4">
        <form
          onSubmit={unlock}
          className="w-full max-w-sm rounded-xl border border-line bg-paper p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-red">Front office</p>
          <h2 className="mt-1 font-display text-2xl">Masukkan sandi loket</h2>
          <label className="mt-5 block text-sm font-medium">
            Sandi
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setPinErr(false);
              }}
              autoFocus
              className="mt-2 h-12 w-full rounded-lg border border-line bg-surface px-3 text-sm"
            />
          </label>
          {pinErr ? <p className="mt-2 text-sm text-red">Sandi salah.</p> : null}
          <div className="mt-5 flex gap-2">
            <button type="submit" className="h-11 flex-1 rounded-full bg-red text-sm font-semibold text-chalk">
              Masuk
            </button>
            <button
              type="button"
              onClick={() => {
                setGate(false);
                setPin("");
              }}
              className="h-11 rounded-full border border-line px-4 text-sm font-semibold"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (open && !desk) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-paper text-ink">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red">Front office</p>
            <h1 className="font-display text-xl sm:text-2xl">Pilih meja</h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/manual-biomed.pdf"
              download="Buku-Panduan-Presentasi-BIOMED.pdf"
              className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-semibold"
            >
              Buku panduan
            </a>
            <button
              type="button"
              onClick={closeKasir}
              className="grid size-11 place-items-center rounded-full border border-line"
              aria-label="Tutup"
            >
              <X className="size-5" />
            </button>
          </div>
        </header>
        <div className="mx-auto grid w-full max-w-5xl gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          <button
            type="button"
            onClick={() => setDesk("kasir")}
            className="rounded-xl border border-line bg-surface p-8 text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-red">Loket</p>
            <h2 className="mt-2 font-display text-3xl">Kasir</h2>
            <p className="mt-3 text-sm text-muted">Daftar pasien, pilih pemeriksaan, bayar, cetak struk & stiker EDTA.</p>
          </button>
          <button
            type="button"
            onClick={() => setDesk("hasil")}
            className="rounded-xl border border-line bg-surface p-8 text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-red">Laboratorium</p>
            <h2 className="mt-2 font-display text-3xl">Hasil lab</h2>
            <p className="mt-3 text-sm text-muted">Isi nilai, satuan, rujukan, flag H/L, lalu cetak lembar hasil.</p>
          </button>
          <button
            type="button"
            onClick={() => setDesk("stok")}
            className="rounded-xl border border-line bg-surface p-8 text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-red">Gudang</p>
            <h2 className="mt-2 font-display text-3xl">Stok barang</h2>
            <p className="mt-3 text-sm text-muted">Reagen, tabung, APD, janitor, kertas hasil — stoklist persediaan.</p>
          </button>
          <button
            type="button"
            onClick={() => setDesk("uang")}
            className="rounded-xl border border-line bg-surface p-8 text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-red">Pemilik</p>
            <h2 className="mt-2 font-display text-3xl">Keuangan</h2>
            <p className="mt-3 text-sm text-muted">Pendapatan kasir dan pengeluaran per cabang, laba rugi.</p>
          </button>
          <button
            type="button"
            onClick={() => setDesk("usg")}
            className="rounded-xl border border-line bg-surface p-8 text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-red">Pencitraan</p>
            <h2 className="mt-2 font-display text-3xl">USG</h2>
            <p className="mt-3 text-sm text-muted">Pasien hari ini, jadwal panggil, isi temuan & kesan USG.</p>
          </button>
          <button
            type="button"
            onClick={() => setDesk("radio")}
            className="rounded-xl border border-line bg-surface p-8 text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-red">Pencitraan</p>
            <h2 className="mt-2 font-display text-3xl">Radiologi</h2>
            <p className="mt-3 text-sm text-muted">Antrian rontgen hari ini, pengingat jam, isi hasil foto.</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper text-ink">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-red">Front office</p>
          <h1 className="font-display text-xl sm:text-2xl">
            {desk === "hasil"
              ? "Pengisian hasil lab"
              : desk === "stok"
                ? "Stok persediaan"
                : desk === "uang"
                  ? "Keuangan"
                  : desk === "usg"
                    ? "Meja USG"
                    : desk === "radio"
                      ? "Meja radiologi"
                      : "Kasir BIOMED"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDesk(null)}
            className="h-10 rounded-full border border-line px-4 text-sm font-semibold"
          >
            Menu
          </button>
          {desk === "kasir" ? (
            <select
              value={cabang}
              onChange={(e) => {
                const id = e.target.value;
                if (isPriceBranch(id)) {
                  setCabangId(id);
                  setCabang(id);
                  setCart([]);
                }
              }}
              className="h-10 rounded-full border border-line bg-paper px-3 text-sm"
            >
              {priceBranches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          ) : null}
          <button
            type="button"
            onClick={closeKasir}
            className="grid size-11 place-items-center rounded-full border border-line"
            aria-label="Tutup kasir"
          >
            <X className="size-5" />
          </button>
        </div>
      </header>

      {desk === "hasil" ? (
        <LabResults sales={sales} patients={patients} onPatch={patchHasil} />
      ) : desk === "stok" ? (
        <StockList />
      ) : desk === "uang" ? (
        <FinancePanel sales={sales} />
      ) : desk === "usg" ? (
        <ImagingDesk kind="usg" sales={sales} patients={patients} onPatch={patchHasil} />
      ) : desk === "radio" ? (
        <ImagingDesk kind="rontgen" sales={sales} patients={patients} onPatch={patchHasil} />
      ) : (
      <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 overflow-hidden lg:grid-cols-5">
        <section className="min-h-0 overflow-auto border-b border-line p-4 lg:col-span-3 lg:border-b-0 lg:border-r">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              ref={searchRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari pemeriksaan yang mau dibayar"
              className="h-12 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-blue"
            />
          </label>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
            {hits.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => addItem(t.id, t.name, t.price)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    <span className="text-xs text-muted">{t.category}</span>
                  </span>
                  <span className="font-display tabular-nums">{formatRupiah(t.price)}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="flex min-h-0 flex-col overflow-auto p-4 lg:col-span-2">
          <div className="flex gap-2">
            {(["baru", "lama"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  if (m === "baru") setPicked(null);
                }}
                className={`h-10 rounded-full px-4 text-sm font-semibold ${
                  mode === m ? "bg-ink text-chalk" : "border border-line bg-surface text-muted"
                }`}
              >
                {m === "baru" ? "Pasien baru" : "Pasien lama"}
              </button>
            ))}
          </div>

          {mode === "baru" ? (
            <div className="mt-4 space-y-3">
              <label className="block text-sm font-medium">
                Nama lengkap
                <input value={nama} onChange={(e) => setNama(e.target.value)} className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm" />
              </label>
              <label className="block text-sm font-medium">
                Nomor HP
                <input value={hp} onChange={(e) => setHp(e.target.value)} type="tel" inputMode="tel" className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm" />
              </label>
              <label className="block text-sm font-medium">
                Nomor KTP
                <input
                  value={ktp}
                  onChange={(e) => setKtp(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  inputMode="numeric"
                  className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm tabular-nums"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Jenis kelamin
                  <select
                    value={kelamin}
                    onChange={(e) => setKelamin(e.target.value as Gender)}
                    className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Tanggal lahir
                  <input value={lahir} onChange={(e) => setLahir(e.target.value)} type="date" className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm" />
                </label>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  value={lookup}
                  onChange={(e) => setLookup(e.target.value)}
                  placeholder="Cari KTP, HP, atau nama"
                  className="h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm"
                />
              </label>
              {picked ? null : (
                <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
                  {found.map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => pickPatient(p)} className="flex w-full flex-col px-4 py-3 text-left">
                        <span className="font-medium">{p.nama}</span>
                        <span className="text-xs text-muted">
                          {p.kelamin === "P" ? "P" : "L"} · {ageOf(p.lahir)} · {p.ktp} · {p.hp}
                        </span>
                      </button>
                    </li>
                  ))}
                  {lookup.trim().length >= 2 && found.length === 0 ? (
                    <li className="px-4 py-3 text-sm text-muted">Tidak ketemu. Daftarkan sebagai pasien baru.</li>
                  ) : null}
                </ul>
              )}
              {picked ? (
                <div className="rounded-xl border border-line bg-surface p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display text-xl">{picked.nama}</p>
                      <p className="mt-1 text-sm text-muted">
                        {picked.kelamin === "P" ? "Perempuan" : "Laki-laki"} · {ageOf(picked.lahir)} · KTP {picked.ktp}
                      </p>
                      <p className="text-sm text-muted">{picked.hp}</p>
                    </div>
                    <button type="button" className="text-xs font-semibold text-red" onClick={() => setPicked(null)}>
                      Ganti
                    </button>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted">
                    Riwayat ({riwayat.length})
                  </p>
                  {riwayat.length === 0 ? (
                    <p className="mt-2 text-sm text-muted">Belum ada kunjungan tersimpan di perangkat ini.</p>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {riwayat.map((s) => (
                        <li key={s.id} className="rounded-lg border border-line p-3">
                          <button type="button" className="flex w-full items-baseline justify-between text-left" onClick={() => setOpenSale(openSale === s.id ? null : s.id)}>
                            <span className="font-display text-red">{s.nomor}</span>
                            <span className="text-xs text-muted">{new Date(s.created).toLocaleDateString("id-ID")}</span>
                          </button>
                          <p className="text-xs text-muted">
                            {s.items.map((i) => i.name).join(", ")} · {formatRupiah(s.total)}
                            {lunasOf(s) ? "" : ` · hutang ${formatRupiah(hutangOf(s))}`}
                          </p>
                          {openSale === s.id ? (
                            <div className="mt-3 space-y-2">
                              {!lunasOf(s) ? (
                                <div className="rounded-md bg-paper p-2">
                                  <p className="text-sm font-medium">Pelunasan · sisa {formatRupiah(hutangOf(s))}</p>
                                  <input
                                    value={settleAmt}
                                    onChange={(e) => setSettleAmt(e.target.value.replace(/\D/g, ""))}
                                    inputMode="numeric"
                                    placeholder="Jumlah dilunasi"
                                    className="mt-1 h-9 w-full rounded-md border border-line bg-surface px-2 text-sm"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => settleHutang(s.id)}
                                    className="mt-2 h-9 w-full rounded-full bg-gold text-xs font-semibold text-ink"
                                  >
                                    Terima pelunasan
                                  </button>
                                </div>
                              ) : null}
                              {s.hasil.map((h) => (
                                <div key={h.itemId} className="rounded-md bg-paper p-2">
                                  <p className="text-sm font-medium">{h.name}</p>
                                  <input
                                    value={h.nilai}
                                    onChange={(e) => patchHasil(s.id, h.itemId, { nilai: e.target.value, ready: e.target.value.trim().length > 0 })}
                                    placeholder="Nilai hasil"
                                    className="mt-1 h-9 w-full rounded-md border border-line bg-surface px-2 text-sm"
                                  />
                                  <input
                                    value={h.catatan}
                                    onChange={(e) => patchHasil(s.id, h.itemId, { catatan: e.target.value })}
                                    placeholder="Catatan"
                                    className="mt-1 h-9 w-full rounded-md border border-line bg-surface px-2 text-sm"
                                  />
                                </div>
                              ))}
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  type="button"
                                  onClick={() => printStruk(s, picked)}
                                  className="h-9 rounded-full border border-line text-xs font-semibold"
                                >
                                  Tanda bayar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => printStiker(s, picked)}
                                  className="h-9 rounded-full bg-gold text-xs font-semibold text-ink"
                                >
                                  Stiker EDTA
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => printHasil(s, picked)}
                                className="h-9 w-full rounded-full border border-line text-xs font-semibold"
                              >
                                Cetak hasil
                              </button>
                            </div>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>
          )}

          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted">Item pemeriksaan</p>
          {cart.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Belum ada item. Cari di kiri, ketuk untuk menambah.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {cart.map((i) => (
                <li key={i.id} className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{i.name}</p>
                    <p className="text-xs text-muted">{formatRupiah(i.price)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" className="grid size-8 place-items-center rounded-full border border-line" onClick={() => qty(i.id, -1)}>
                      <Minus className="size-3" />
                    </button>
                    <span className="w-6 text-center text-sm tabular-nums">{i.qty}</span>
                    <button type="button" className="grid size-8 place-items-center rounded-full border border-line" onClick={() => qty(i.id, 1)}>
                      <Plus className="size-3" />
                    </button>
                    <button type="button" className="grid size-8 place-items-center text-red" onClick={() => setCart((c) => c.filter((x) => x.id !== i.id))}>
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto space-y-3 pt-4">
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <span className="text-sm text-muted">Total</span>
              <span className="font-display text-3xl tabular-nums">{formatRupiah(total)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {methods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetode(m)}
                  className={`h-9 rounded-full px-3 text-xs font-semibold ${
                    metode === m ? "bg-ink text-chalk" : "border border-line bg-surface text-muted"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <label className="block text-sm font-medium">
              Dibayar sekarang
              <input
                value={tunai}
                onChange={(e) => setTunai(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="0"
                className="mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm tabular-nums"
              />
              <span className="mt-1 block text-xs text-muted">
                {hutangBaru > 0
                  ? `Hutang ${formatRupiah(hutangBaru)} — hasil terkunci sampai lunas`
                  : `Kembali ${formatRupiah(kembali)}`}
              </span>
            </label>
            <button
              type="button"
              disabled={!canPay}
              onClick={checkout}
              className="h-12 w-full rounded-full bg-red text-sm font-semibold text-chalk disabled:opacity-40"
            >
              {hutangBaru > 0 ? (paid > 0 ? "Bayar DP / hutang" : "Simpan hutang") : "Bayar lunas"}
            </button>
            {last ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => printStruk(last, patients.find((p) => p.id === last.patientId) ?? picked)}
                  className="h-11 rounded-full border border-line text-xs font-semibold"
                >
                  Cetak tanda pembayaran
                </button>
                <button
                  type="button"
                  onClick={() => printStiker(last, patients.find((p) => p.id === last.patientId) ?? picked)}
                  className="h-11 rounded-full bg-gold text-xs font-semibold text-ink"
                >
                  Cetak stiker EDTA
                </button>
              </div>
            ) : null}
            <p className="text-xs text-muted">
              {branches.find((b) => b.id === cabang)?.name}. Data pasien tersimpan di perangkat kasir ini.
            </p>
          </div>
        </aside>
      </div>
      )}
    </div>
  );
}
