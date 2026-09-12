import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { company } from "@/lib/data/company";
import { loadPublished } from "@/lib/fo/publish";
import type { PublicHasil } from "@/lib/fo/hasil-share";

export const Route = createFileRoute("/hasil_/$kode")({ component: HasilPage });

function HasilPage() {
  const { kode } = Route.useParams();
  const [data, setData] = useState<PublicHasil | null | "load">("load");

  useEffect(() => {
    let live = true;
    loadPublished(decodeURIComponent(kode)).then((p) => {
      if (live) setData(p);
    });
    return () => {
      live = false;
    };
  }, [kode]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-red">Hasil pemeriksaan</p>
      <h1 className="mt-2 font-display text-4xl">{company.brand}</h1>
      {data === "load" ? (
        <p className="mt-6 text-sm text-muted">Membuka hasil…</p>
      ) : !data ? (
        <p className="mt-6 text-sm text-muted">Kode tidak ditemukan. Hasil terbit setelah loket mengisi dan menyelesaikan pemeriksaan.</p>
      ) : data.lunas === false ? (
        <div className="mt-6 rounded-xl border border-line bg-surface p-5">
          <p className="font-display text-2xl">{data.nama}</p>
          <p className="mt-1 text-sm text-muted">
            {data.nomor} · {data.cabang}
          </p>
          <p className="mt-4 text-sm">
            Belum lunas. Sisa {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(data.hutang)}. Lunasi di loket saat ambil hasil, baru tautan ini bisa dibuka.
          </p>
        </div>
      ) : !data.ready ? (
        <div className="mt-6 rounded-xl border border-line bg-surface p-5">
          <p className="font-display text-2xl">{data.nama}</p>
          <p className="mt-1 text-sm text-muted">
            {data.nomor} · {data.cabang} · {new Date(data.created).toLocaleDateString("id-ID")}
          </p>
          <p className="mt-4 text-sm">Hasil masih diproses laboratorium. Pindai ulang barcode di struk jika sudah selesai.</p>
        </div>
      ) : (
        <div className="mt-6">
          <p className="font-display text-2xl">{data.nama}</p>
          <p className="mt-1 text-sm text-muted">
            {data.kelamin} {data.umur ? `· ${data.umur}` : ""} · {data.nomor} · {data.cabang}
          </p>
          <table className="mt-6 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-widest text-muted">
              <tr>
                <th className="py-2">Pemeriksaan</th>
                <th className="py-2">Hasil</th>
                <th className="py-2">Satuan</th>
                <th className="py-2">Rujukan</th>
                <th className="py-2">Ket</th>
              </tr>
            </thead>
            <tbody>
              {data.hasil.map((h) => (
                <tr key={h.name} className="border-t border-line">
                  <td className="py-2 font-medium">{h.name}</td>
                  <td className="py-2">{h.nilai || "—"}</td>
                  <td className="py-2 text-muted">{h.satuan || "—"}</td>
                  <td className="py-2 text-muted">{h.rujukan || "—"}</td>
                  <td className={`py-2 ${h.flag ? "text-red" : "text-muted"}`}>{h.flag || "N"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-muted">PJ {company.director}. Bukan pengganti konsultasi dokter.</p>
        </div>
      )}
    </main>
  );
}
