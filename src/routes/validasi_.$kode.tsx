import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { company } from "@/lib/data/company";
import { loadPublished } from "@/lib/fo/publish";
import { sealOf, type PublicHasil } from "@/lib/fo/hasil-share";

export const Route = createFileRoute("/validasi_/$kode")({ component: ValidasiPage });

function ValidasiPage() {
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

  const asli = data && data !== "load" ? sealOf(data) === data.seal && data.ready : false;

  return (
    <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-red">Validasi keaslian</p>
      <h1 className="mt-2 font-display text-4xl">Surat hasil lab</h1>
      {data === "load" ? (
        <p className="mt-6 text-sm text-muted">Memeriksa kode…</p>
      ) : !data ? (
        <p className="mt-6 text-sm text-muted">Kode tidak terdaftar. Surat ini tidak bisa divalidasi.</p>
      ) : (
        <div className="mt-6 rounded-xl border border-line bg-surface p-6">
          <p className={`font-display text-3xl ${asli && data.lunas !== false ? "" : "text-red"}`}>
            {data.lunas === false ? "Belum lunas" : asli ? "Asli" : data.ready ? "Tidak cocok" : "Belum final"}
          </p>
          <p className="mt-3 text-sm">
            {data.nama} · {data.nomor} · {data.cabang}
          </p>
          <p className="mt-1 text-xs text-muted">Kode sah {data.seal}</p>
          <p className="mt-4 text-sm text-muted">
            {data.lunas === false
              ? "Tagihan belum lunas. Hasil dan keabsahan surat dikunci sampai pelunasan di loket."
              : asli
                ? `Dikeluarkan ${company.legalName}. Penanggung jawab ${company.director}.`
                : "Jika angka di kertas berbeda, hubungi loket BIOMED."}
          </p>
        </div>
      )}
    </main>
  );
}
