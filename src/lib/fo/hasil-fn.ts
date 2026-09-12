import { createServerFn } from "@tanstack/react-start";
import type { PublicHasil } from "@/lib/fo/hasil-share";

export const publishLabHasil = createServerFn({ method: "POST" })
  .validator((d: PublicHasil) => d)
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql.query(
      `insert into lab_hasil (kode, payload) values ($1, $2)
       on conflict (kode) do update set payload = $2, updated = now()`,
      [data.kode, JSON.stringify(data)],
    );
    return { ok: true as const };
  });

export const readLabHasil = createServerFn({ method: "POST" })
  .validator((d: { kode: string }) => d)
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<{ payload: string }>(`select payload from lab_hasil where kode = $1`, [data.kode]);
    if (!rows[0]) return null;
    try {
      return JSON.parse(rows[0].payload) as PublicHasil;
    } catch {
      return null;
    }
  });
