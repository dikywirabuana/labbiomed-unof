import { useEffect, useMemo, useState } from "react";
import { company } from "@/lib/data/company";
import {
  imagingItems,
  imagingKind,
  readyOf,
  slotsFor,
  syncSlots,
  todaySales,
  type ImagingKind,
  type ImagingSlot,
} from "@/lib/fo/imaging";
import { publishSale } from "@/lib/fo/publish";
import { ageOf, hutangOf, lunasOf, type Hasil, type Patient, type Sale } from "@/lib/fo/store";

function printImaging(sale: Sale, h: Hasil, patient?: Patient) {
  const kind = imagingKind(h.name) === "rontgen" ? "Radiologi" : "USG";
  const when = new Date(sale.created).toLocaleString("id-ID");
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${kind} ${sale.nomor}</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#1a2832;margin:24px;max-width:720px}
  h1{font-size:20px;margin:0} h2{font-size:13px;letter-spacing:.12em;text-transform:uppercase;margin:16px 0 6px}
  p{font-size:13px;white-space:pre-wrap} .muted{color:#5d6d78;font-size:12px}
  .box{border:1px solid #d4dce3;border-radius:8px;padding:12px;min-height:80px}
  .sign{margin-top:32px;text-align:right}
  @media print { button{display:none} }
</style></head><body>
  <p class="muted">${company.legalName}</p>
  <h1>Hasil ${kind}</h1>
  <p class="muted">${sale.cabang} · ${sale.nomor} · ${when}</p>
  <p><strong>${sale.nama}</strong>${patient ? ` · ${patient.kelamin === "P" ? "Perempuan" : "Laki-laki"} · ${ageOf(patient.lahir)}` : ""}</p>
  <p>Pemeriksaan: <strong>${h.name}</strong></p>
  <h2>Temuan</h2>
  <div class="box">${h.catatan || "—"}</div>
  <h2>Kesan</h2>
  <div class="box">${h.nilai || "—"}</div>
  <div class="sign"><p>Penanggung jawab</p><p><strong>${company.director}</strong></p></div>
  <button onclick="window.print()">Cetak</button>
  <script>window.onload=()=>window.print()<\/script>
</body></html>`;
  const w = window.open("", "hasil-citra", "width=720,height=900");
  if (!w) return;
  w.document.write(html);
  w.document.close();
}

function clock(iso: string) {
  return new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export function ImagingDesk({
  kind,
  sales,
  patients,
  onPatch,
}: {
  kind: ImagingKind;
  sales: Sale[];
  patients: Patient[];
  onPatch: (saleId: string, itemId: string, patch: Partial<Hasil>) => void;
}) {
  const title = kind === "usg" ? "USG" : "Radiologi";
  const [slots, setSlots] = useState<ImagingSlot[]>([]);
  const [now, setNow] = useState(Date.now());
  const [active, setActive] = useState<string | null>(null);

  const antrian = useMemo(() => todaySales(sales, kind), [sales, kind]);

  useEffect(() => {
    setSlots(syncSlots(sales));
  }, [sales]);

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(t);
  }, []);

  const agenda = slotsFor(kind, slots);
  const due = agenda.filter((s) => {
    const sale = sales.find((x) => x.id === s.saleId);
    const item = sale?.hasil.find((h) => h.itemId === s.itemId);
    return item && !readyOf(item);
  });
  const next = due.find((s) => new Date(s.at).getTime() >= now - 5 * 60000) ?? due[0];

  const sale = antrian.find((s) => s.id === active) ?? antrian[0];
  const patient = sale ? patients.find((p) => p.id === sale.patientId) : undefined;
  const items = sale ? imagingItems(sale, kind) : [];

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-hidden">
      {next ? (
        <div className="shrink-0 border-b border-gold bg-surface px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-red">Pengingat {title}</p>
          <p className="font-display text-2xl">
            {clock(next.at)} · {next.nama} · {next.itemName}
          </p>
          <p className="text-xs text-muted">
            {new Date(next.at).getTime() < now ? "Sudah lewat jam. Panggil pasien." : "Jadwal berikutnya hari ini."} No. {next.nomor}
          </p>
        </div>
      ) : (
        <div className="shrink-0 border-b border-line px-4 py-3">
          <p className="text-sm text-muted">Tidak ada antrian {title} tersisa hari ini.</p>
        </div>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-5">
        <aside className="min-h-0 overflow-auto border-b border-line p-4 lg:border-b-0 lg:border-r">
          <h2 className="font-display text-2xl">Pasien hari ini</h2>
          <p className="text-xs text-muted">{antrian.length} orang · {title}</p>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
            {antrian.map((s) => {
              const pending = imagingItems(s, kind).some((h) => !readyOf(h));
              const slot = agenda.find((x) => x.saleId === s.id);
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActive(s.id)}
                    className={`flex w-full flex-col px-4 py-3 text-left ${sale?.id === s.id ? "bg-paper" : ""}`}
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-display text-red">{s.nomor}</span>
                      <span className="text-xs text-muted">{slot ? clock(slot.at) : ""} {pending ? "isi hasil" : "selesai"}</span>
                    </span>
                    <span className="text-sm font-medium">{s.nama}</span>
                    <span className="text-xs text-muted">{imagingItems(s, kind).map((h) => h.name).join(", ")}</span>
                  </button>
                </li>
              );
            })}
            {antrian.length === 0 ? <li className="px-4 py-6 text-sm text-muted">Belum ada pasien {title} hari ini.</li> : null}
          </ul>
          <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted">Jadwal</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {agenda.map((s) => (
              <li key={s.id} className="flex justify-between gap-2">
                <span className="truncate">{clock(s.at)} {s.nama}</span>
                <span className="text-xs text-muted">{s.itemName}</span>
              </li>
            ))}
          </ul>
        </aside>

        <section className="min-h-0 overflow-auto p-4 lg:col-span-4">
          {!sale ? (
            <p className="text-sm text-muted">Pilih pasien dari antrian.</p>
          ) : (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red">{title}</p>
              <h2 className="font-display text-3xl">{sale.nama}</h2>
              <p className="text-sm text-muted">
                {sale.nomor} · {sale.cabang}
                {patient ? ` · ${patient.kelamin === "P" ? "Perempuan" : "Laki-laki"} · ${ageOf(patient.lahir)}` : ""}
                {lunasOf(sale) ? "" : ` · hutang belum lunas`}
              </p>
              {items.map((h) => (
                <article key={h.itemId} className="mt-6 rounded-xl border border-line bg-surface p-4">
                  <h3 className="font-display text-2xl">{h.name}</h3>
                  <label className="mt-4 block text-sm font-medium">
                    Temuan
                    <textarea
                      value={h.catatan}
                      onChange={(e) => onPatch(sale.id, h.itemId, { catatan: e.target.value, ready: h.nilai.trim().length > 0 })}
                      rows={5}
                      className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
                      placeholder={kind === "usg" ? "Ukuran, echostructure, lesi…" : "Corakan, infiltrat, tulang…"}
                    />
                  </label>
                  <label className="mt-3 block text-sm font-medium">
                    Kesan
                    <textarea
                      value={h.nilai}
                      onChange={(e) =>
                        onPatch(sale.id, h.itemId, {
                          nilai: e.target.value,
                          satuan: "",
                          rujukan: "",
                          flag: "",
                          ready: e.target.value.trim().length > 0,
                        })
                      }
                      rows={3}
                      className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
                      placeholder="Kesan / kesimpulan"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      printImaging(sale, h, patient);
                      void publishSale(sale, patient);
                    }}
                    disabled={!readyOf(h)}
                    className="mt-4 h-11 rounded-full bg-gold px-5 text-sm font-semibold text-ink disabled:opacity-40"
                  >
                    Cetak hasil {title}
                  </button>
                  {hutangOf(sale) > 0 ? (
                    <p className="mt-2 text-xs text-muted">Hutang masih ada. Tautan pasien tetap terkunci sampai kasir melunasi.</p>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
