export type Gender = "L" | "P";

export type Patient = {
  id: string;
  nama: string;
  hp: string;
  kelamin: Gender;
  lahir: string;
  ktp: string;
  created: string;
};

export type CartItem = { id: string; name: string; price: number; qty: number };

export type Hasil = {
  itemId: string;
  name: string;
  nilai: string;
  satuan: string;
  rujukan: string;
  flag: "" | "H" | "L";
  catatan: string;
  ready: boolean;
};

export type Payment = {
  id: string;
  at: string;
  amount: number;
  metode: string;
  note: "kasir" | "pelunasan";
};

export type Sale = {
  id: string;
  nomor: string;
  patientId: string;
  nama: string;
  hp: string;
  ktp: string;
  cabang: string;
  items: CartItem[];
  hasil: Hasil[];
  total: number;
  metode: string;
  bayar: number;
  kembali: number;
  created: string;
  kode?: string;
  payments?: Payment[];
};

export function paidOf(s: Sale) {
  if (s.payments && s.payments.length) return s.payments.reduce((n, p) => n + p.amount, 0);
  return s.bayar ?? 0;
}

export function hutangOf(s: Sale) {
  return Math.max(0, (s.total ?? 0) - paidOf(s));
}

export function lunasOf(s: Sale) {
  return hutangOf(s) <= 0;
}

const PKEY = "biomed-fo-pasien";
const SKEY = "biomed-fo-kasir";

function read<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "") as T;
  } catch {
    return fallback;
  }
}

export function loadPatients(): Patient[] {
  return read<Patient[]>(PKEY, []);
}

export function savePatients(list: Patient[]) {
  localStorage.setItem(PKEY, JSON.stringify(list.slice(0, 400)));
}

export function loadSales(): Sale[] {
  const raw = read<Sale[]>(SKEY, []);
  return raw.map((s) => ({
    ...s,
    patientId: s.patientId ?? "",
    ktp: s.ktp ?? "",
    kode: s.kode ?? `${s.nomor}-${String(s.id ?? "").replace(/-/g, "").slice(0, 6).toUpperCase()}`,
    payments:
      s.payments?.length
        ? s.payments
        : [
            {
              id: `${s.id}-awal`,
              at: s.created,
              amount: s.bayar ?? s.total ?? 0,
              metode: s.metode ?? "Tunai",
              note: "kasir" as const,
            },
          ],
    hasil:
      s.hasil?.map((h) => ({
        satuan: h.satuan ?? "",
        rujukan: h.rujukan ?? "",
        flag: h.flag ?? "",
        ...h,
      })) ??
      (s.items ?? []).map((i) => ({
        itemId: i.id,
        name: i.name,
        nilai: "",
        satuan: "",
        rujukan: "",
        flag: "" as const,
        catatan: "",
        ready: false,
      })),
  }));
}

export function saveSales(list: Sale[]) {
  localStorage.setItem(SKEY, JSON.stringify(list.slice(0, 400)));
}

export function findPatient(list: Patient[], q: string) {
  const n = q.trim().toLowerCase().replace(/\s/g, "");
  if (n.length < 2) return [];
  return list.filter((p) => {
    const ktp = p.ktp.replace(/\s/g, "");
    const hp = p.hp.replace(/\s/g, "");
    return (
      ktp.includes(n) ||
      hp.includes(n) ||
      p.nama.toLowerCase().includes(q.trim().toLowerCase())
    );
  }).slice(0, 12);
}

export function nextNomor(list: Sale[]) {
  const day = new Date().toISOString().slice(0, 10);
  const n = list.filter((t) => t.created.slice(0, 10) === day).length + 1;
  return `A${String(n).padStart(3, "0")}`;
}

export function ageOf(lahir: string) {
  if (!lahir) return "";
  const d = new Date(lahir);
  if (Number.isNaN(d.getTime())) return "";
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return `${age} th`;
}
