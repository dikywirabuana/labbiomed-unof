import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { company } from "@/lib/data/company";
import { isImaging } from "@/lib/fo/imaging";
import { flagOf, refFor } from "@/lib/fo/ref-ranges";
import { kodeOf, linkMark, markCss, toPublic, validasiUrl } from "@/lib/fo/hasil-share";
import { publishSale } from "@/lib/fo/publish";
import { ageOf, type Gender, type Hasil, type Patient, type Sale } from "@/lib/fo/store";

function printLembar(sale: Sale, patient: Patient | undefined) {
  const gender: Gender = patient?.kelamin ?? "L";
  const rows = sale.hasil
    .map((h) => {
      const ref = refFor(h.name, gender);
      const satuan = h.satuan || ref.satuan;
      const rujukan = h.rujukan || ref.rujukan;
      const flag = h.flag || flagOf(h.nilai, ref);
      return `<tr>
        <td>${h.name}</td>
        <td><strong>${h.nilai || "—"}</strong></td>
        <td>${satuan}</td>
        <td>${rujukan}</td>
        <td style="color:${flag === "H" ? "#c81e24" : flag === "L" ? "#3d5a73" : "inherit"}">${flag || ""}</td>
      </tr>`;
    })
    .join("");
  const when = new Date(sale.created).toLocaleString("id-ID");
  const kode = kodeOf(sale);
  const url = validasiUrl(kode);
  const seal = toPublic(sale, patient).seal;
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Hasil lab ${sale.nomor}</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#1a2832;margin:24px;max-width:720px}
  h1{font-size:20px;margin:0} h2{font-size:14px;margin:16px 0 8px;letter-spacing:.12em;text-transform:uppercase}
  p,td,th{font-size:12px}
  table{width:100%;border-collapse:collapse}
  th,td{border-bottom:1px solid #d4dce3;padding:6px 4px;text-align:left}
  th{color:#5d6d78;font-weight:600}
  .muted{color:#5d6d78}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;margin:12px 0}
  .sign{margin-top:32px;text-align:right}
  ${markCss()}
  @media print { button{display:none} }
</style></head><body>
  <p class="muted">${company.legalName}</p>
  <h1>Laboratorium BIOMED — Hasil pemeriksaan</h1>
  <p class="muted">Cabang ${sale.cabang} · No. ${sale.nomor}</p>
  <div class="grid">
    <p>Nama: <strong>${sale.nama}</strong></p>
    <p>No. lab: <strong>${sale.nomor}</strong></p>
    <p>HP: ${sale.hp}</p>
    <p>KTP: ${sale.ktp}</p>
    <p>${patient ? `${patient.kelamin === "P" ? "Perempuan" : "Laki-laki"} · ${ageOf(patient.lahir)}` : ""}</p>
    <p>Tgl: ${when}</p>
  </div>
  <h2>Hasil</h2>
  <table>
    <thead><tr><th>Pemeriksaan</th><th>Hasil</th><th>Satuan</th><th>Nilai rujukan</th><th>Ket</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="muted">H = tinggi, L = rendah terhadap nilai rujukan laboratorium. Interpretasi bersama dokter.</p>
  <div class="sign">
    <p>Penanggung jawab</p>
    <p><strong>${company.director}</strong></p>
    <p class="muted">Kode sah ${seal}</p>
  </div>
  ${linkMark(url, kode, "Barcode validasi keaslian surat hasil")}
  <button onclick="window.print()">Cetak</button>
  <script>window.onload=()=>window.print()<\/script>
</body></html>`;
  const w = window.open("", "lembar-hasil", "width=720,height=900");
  if (!w) return;
  w.document.write(html);
  w.document.close();
  void publishSale(sale, patient);
}

export function LabResults({
  sales,
  patients,
  onPatch,
}: {
  sales: Sale[];
  patients: Patient[];
  onPatch: (saleId: string, itemId: string, patch: Partial<Hasil>) => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(sales[0]?.id ?? null);

  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return sales.filter((s) => {
      const lab = s.hasil.some((h) => !isImaging(h.name));
      if (!lab) return false;
      if (!n) return true;
      return (
        s.nomor.toLowerCase().includes(n) ||
        s.nama.toLowerCase().includes(n) ||
        s.ktp.includes(n) ||
        s.hp.includes(n)
      );
    });
  }, [q, sales]);

  const sale = sales.find((s) => s.id === active) ?? list[0];
  const patient = sale ? patients.find((p) => p.id === sale.patientId) : undefined;
  const gender: Gender = patient?.kelamin ?? "L";

  function setNilai(h: Hasil, nilai: string) {
    if (!sale) return;
    const ref = refFor(h.name, gender);
    onPatch(sale.id, h.itemId, {
      nilai,
      satuan: h.satuan || ref.satuan,
      rujukan: h.rujukan || ref.rujukan,
      flag: flagOf(nilai, ref),
      ready: nilai.trim().length > 0,
    });
  }

  return (
    <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 overflow-hidden lg:grid-cols-5">
      <aside className="min-h-0 overflow-auto border-b border-line p-4 lg:border-b-0 lg:border-r">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari no. lab, nama, KTP"
            className="h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm"
          />
        </label>
        <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
          {list.map((s) => {
            const pending = s.hasil.filter((h) => !isImaging(h.name)).some((h) => !h.ready);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActive(s.id)}
                  className={`flex w-full flex-col px-4 py-3 text-left ${sale?.id === s.id ? "bg-paper" : ""}`}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-red">{s.nomor}</span>
                    <span className="text-xs text-muted">{pending ? "Isi hasil" : "Selesai"}</span>
                  </span>
                  <span className="text-sm font-medium">{s.nama}</span>
                </button>
              </li>
            );
          })}
          {list.length === 0 ? <li className="px-4 py-6 text-sm text-muted">Belum ada sampel dari kasir.</li> : null}
        </ul>
      </aside>

      <section className="min-h-0 overflow-auto p-4 lg:col-span-4">
        {!sale ? (
          <p className="text-sm text-muted">Bayar dulu di kasir supaya nomor lab muncul di sini.</p>
        ) : (
          <>
            <div className="rounded-xl border border-line bg-surface p-4">
              <p className="text-xs uppercase tracking-widest text-muted">Lembar hasil</p>
              <h2 className="font-display text-2xl">{sale.nama}</h2>
              <p className="mt-1 text-sm text-muted">
                {sale.nomor} · {sale.cabang} · {patient ? `${patient.kelamin === "P" ? "P" : "L"} · ${ageOf(patient.lahir)}` : ""} · KTP {sale.ktp}
              </p>
            </div>
            <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-widest text-muted">
                  <tr>
                    <th className="px-3 py-2">Pemeriksaan</th>
                    <th className="px-3 py-2">Hasil</th>
                    <th className="px-3 py-2">Satuan</th>
                    <th className="px-3 py-2">Nilai rujukan</th>
                    <th className="px-3 py-2">Ket</th>
                  </tr>
                </thead>
                <tbody>
                  {sale.hasil.filter((h) => !isImaging(h.name)).map((h) => {
                    const ref = refFor(h.name, gender);
                    const satuan = h.satuan || ref.satuan;
                    const rujukan = h.rujukan || ref.rujukan;
                    const flag = h.flag || flagOf(h.nilai, ref);
                    return (
                      <tr key={h.itemId} className="border-t border-line">
                        <td className="px-3 py-2 font-medium">{h.name}</td>
                        <td className="px-3 py-2">
                          <input
                            value={h.nilai}
                            onChange={(e) => setNilai(h, e.target.value)}
                            className="h-10 w-28 rounded-md border border-line bg-paper px-2 tabular-nums"
                          />
                        </td>
                        <td className="px-3 py-2 text-muted">{satuan || "—"}</td>
                        <td className="px-3 py-2 text-muted">{rujukan || "—"}</td>
                        <td className={`px-3 py-2 font-semibold ${flag ? "text-red" : "text-muted"}`}>{flag || "N"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => printLembar(sale, patient)}
              className="mt-4 h-12 rounded-full bg-red px-6 text-sm font-semibold text-chalk"
            >
              Cetak lembar hasil
            </button>
            <p className="mt-2 text-xs text-muted">
              Format mengikuti lembar lab klinik: hasil, satuan, nilai rujukan, flag H/L. PJ {company.director}.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
