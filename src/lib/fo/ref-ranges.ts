import type { Gender } from "./store";

export type Ref = {
  satuan: string;
  rujukan: string;
  low?: number;
  high?: number;
};

const R: {
  match: RegExp;
  satuan: string;
  l?: [number, number];
  p?: [number, number];
  both?: [number, number];
  rujukan?: string;
}[] = [
  { match: /haemoglobin|hemoglobin|\bhb\b/i, satuan: "g/dL", l: [13, 18], p: [12, 16] },
  { match: /hematokrit|\bht\b|\bhct\b/i, satuan: "%", l: [40, 48], p: [37, 43] },
  { match: /leukosit|wbc/i, satuan: "/µL", both: [4000, 10000] },
  { match: /trombosit|platelet/i, satuan: "/µL", both: [150000, 450000] },
  { match: /eritrosit|\brbc\b/i, satuan: "juta/µL", l: [4.5, 5.5], p: [4.0, 5.0] },
  { match: /\bled\b|laju endap/i, satuan: "mm/jam", l: [0, 15], p: [0, 20] },
  { match: /glukosa puasa|gdp/i, satuan: "mg/dL", both: [70, 100] },
  { match: /glukosa 2|2 jam|2jpp/i, satuan: "mg/dL", both: [0, 140] },
  { match: /glukosa sewaktu|gds/i, satuan: "mg/dL", both: [0, 200] },
  { match: /hba1c|hb a1c/i, satuan: "%", both: [4, 5.6] },
  { match: /sgot|\bast\b/i, satuan: "U/L", both: [10, 40] },
  { match: /sgpt|\balt\b/i, satuan: "U/L", both: [10, 41] },
  { match: /gamma gt|\bggt\b/i, satuan: "U/L", both: [8, 61] },
  { match: /alkali fosfatase|\balp\b/i, satuan: "U/L", both: [40, 129] },
  { match: /bilirubin/i, satuan: "mg/dL", both: [0.3, 1.2] },
  { match: /albumin/i, satuan: "g/dL", both: [3.5, 5.0] },
  { match: /protein/i, satuan: "g/dL", both: [6.0, 8.3] },
  { match: /ureum|urea/i, satuan: "mg/dL", both: [10, 50] },
  { match: /kreatinin/i, satuan: "mg/dL", l: [0.7, 1.3], p: [0.6, 1.1] },
  { match: /asam urat|uric/i, satuan: "mg/dL", l: [3.4, 7.0], p: [2.4, 5.7] },
  { match: /cholesterol total|kolesterol total|chol total/i, satuan: "mg/dL", both: [0, 200] },
  { match: /\bhdl\b/i, satuan: "mg/dL", both: [40, 90] },
  { match: /\bldl\b/i, satuan: "mg/dL", both: [0, 100] },
  { match: /trigliserida/i, satuan: "mg/dL", both: [0, 150] },
  { match: /natrium|sodium|\bna\b/i, satuan: "mmol/L", both: [136, 145] },
  { match: /kalium|potassium|\bk\b/i, satuan: "mmol/L", both: [3.5, 5.1] },
  { match: /chlorida|chloride/i, satuan: "mmol/L", both: [98, 107] },
  { match: /troponin/i, satuan: "ng/mL", both: [0, 0.04] },
  { match: /hbsag|anti hiv|hiv|vdrl|tes hamil|hcg/i, satuan: "", rujukan: "Negatif" },
];

export function refFor(name: string, gender: Gender): Ref {
  const row = R.find((r) => r.match.test(name));
  if (!row) return { satuan: "", rujukan: "" };
  if (row.rujukan) return { satuan: row.satuan, rujukan: row.rujukan };
  const pair = row.both ?? (gender === "P" ? row.p : row.l);
  if (!pair) return { satuan: row.satuan, rujukan: "" };
  const [low, high] = pair;
  return {
    satuan: row.satuan,
    rujukan: `${low} – ${high}`,
    low,
    high,
  };
}

export function flagOf(nilai: string, ref: Ref): "" | "H" | "L" {
  const n = Number(String(nilai).replace(",", ".").replace(/[^\d.-]/g, ""));
  if (!Number.isFinite(n) || ref.low == null || ref.high == null) return "";
  if (n < ref.low) return "L";
  if (n > ref.high) return "H";
  return "";
}
