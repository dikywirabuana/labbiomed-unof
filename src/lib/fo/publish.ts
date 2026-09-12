import { publishLabHasil } from "@/lib/fo/hasil-fn";
import { savePublicLocal, toPublic, type PublicHasil } from "@/lib/fo/hasil-share";
import { readLabHasil } from "@/lib/fo/hasil-fn";
import { loadPublicLocal } from "@/lib/fo/hasil-share";
import type { Patient, Sale } from "@/lib/fo/store";

export async function publishSale(sale: Sale, patient?: Patient | null) {
  const payload = toPublic(sale, patient);
  savePublicLocal(payload);
  try {
    await publishLabHasil({ data: payload });
  } catch {
    /* local copy remains */
  }
  return payload;
}

export async function loadPublished(kode: string): Promise<PublicHasil | null> {
  try {
    const remote = await readLabHasil({ data: { kode } });
    if (remote) return remote;
  } catch {
    /* fall back */
  }
  return loadPublicLocal(kode);
}
