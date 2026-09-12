import { branches, WA_PUSAT } from "@/lib/data/branches";
import { articles, news, type Story } from "@/lib/data/stories";
import { getCabang, priceBranches, testsFor, type PriceBranchId } from "@/lib/data/prices";
import { formatRupiah } from "@/lib/utils";

export type BotLink = {
  kind: "artikel" | "berita" | "harga" | "reservasi";
  slug?: string;
  label: string;
};

export type BotMsg = {
  from: "bot" | "user";
  text: string;
  chips?: string[];
  wa?: boolean;
  link?: BotLink;
};

const WA = "0811 1234 988";
const STOP = new Set([
  "harga",
  "tarif",
  "biaya",
  "berapa",
  "tes",
  "test",
  "pemeriksaan",
  "lab",
  "di",
  "yang",
  "untuk",
  "apa",
  "itu",
  "saya",
  "mau",
  "tanya",
  "dong",
  "kah",
  "ya",
  "pak",
  "bu",
  "cabang",
  "biomed",
]);

const GREETING: BotMsg = {
  from: "bot",
  text:
    "Halo, saya asisten Laboratorium BIOMED. Jawaban diambil dari artikel dan daftar harga resmi. Tanya syarat pemeriksaan, tarif, diabetes, ginjal, TBC, atau cabang.",
  chips: ["Syarat pemeriksaan", "Harga tes", "Diabetes", "Ginjal", "Asam urat", "TBC", "WhatsApp admin"],
};

export function greeting(): BotMsg {
  return { ...GREETING };
}

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9à-ü\s]/gi, " ").replace(/\s+/g, " ").trim();
}

function tokens(s: string) {
  return norm(s)
    .split(" ")
    .filter((w) => w.length > 2 && !STOP.has(w));
}

function cabangText() {
  return branches
    .map((b) => `• ${b.name} — ${b.city}\n  ${b.address}\n  Telp ${b.phone}`)
    .join("\n\n");
}

function detectBranch(q: string): PriceBranchId | null {
  if (/cilegon/.test(q)) return "cilegon";
  if (/cikupa|tangerang/.test(q)) return "cikupa";
  if (/pandeglang/.test(q)) return "pandeglang";
  if (/rangkas|lebak/.test(q)) return "rangkas";
  if (/serang/.test(q)) return "serang";
  return null;
}

function storyKind(s: Story): "artikel" | "berita" {
  return news.some((n) => n.slug === s.slug) ? "berita" : "artikel";
}

function excerpt(story: Story, q: string): string {
  const words = tokens(q);
  const paras = story.body.filter((p) => p.length > 40 && !/^[A-Z0-9 /&-]{3,40}$/.test(p));
  const ranked = paras
    .map((p) => ({
      p,
      s: words.reduce((n, w) => n + (p.toLowerCase().includes(w) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.s - a.s);
  const pick = (ranked[0]?.s ? ranked.filter((x) => x.s > 0).slice(0, 3) : ranked.slice(0, 2)).map((x) => x.p);
  let text = `Dari artikel resmi “${story.title}”:\n\n${pick.join("\n\n")}`;
  if (text.length > 900) text = `${text.slice(0, 880)}…`;
  return text;
}

function findStories(q: string): Story[] {
  const words = tokens(q);
  if (!words.length) return [];
  const all = [...articles, ...news];
  return all
    .map((s) => {
      const blob = norm(`${s.title} ${s.summary} ${s.body.join(" ")}`);
      const sTitle = words.filter((w) => norm(s.title).includes(w)).length * 3;
      const sBody = words.filter((w) => blob.includes(w)).length;
      return { s, score: sTitle + sBody };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((x) => x.s);
}

function matchTests(q: string, branch: PriceBranchId) {
  const list = testsFor(branch);
  const words = tokens(q);
  const nq = norm(q);
  return list
    .map((t) => {
      const nt = norm(t.name);
      let score = 0;
      if (nq.includes(nt) || nt.includes(nq)) score += 20;
      for (const w of words) if (nt.includes(w)) score += w.length > 4 ? 3 : 1;
      return { t, score };
    })
    .filter((x) => x.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((x) => x.t);
}

function priceAcross(name: string) {
  const nt = norm(name);
  return priceBranches
    .map((b) => {
      const hit =
        testsFor(b.id).find((t) => norm(t.name) === nt) ??
        testsFor(b.id).find((t) => norm(t.name).includes(nt) || nt.includes(norm(t.name)));
      return hit ? `${b.label}: ${formatRupiah(hit.price)}` : `${b.label}: tidak di daftar`;
    })
    .join("\n");
}

function popularHint(branch: PriceBranchId) {
  const picks = ["Darah Lengkap", "Haemoglobin", "Gula Darah Puasa", "Asam Urat", "Cholesterol", "SGOT", "Kreatinin", "USG"];
  const list = testsFor(branch);
  const rows = picks
    .map((n) => list.find((t) => norm(t.name).includes(norm(n).split(" ")[0] ?? n)))
    .filter(Boolean)
    .slice(0, 6);
  if (!rows.length) return list.slice(0, 6).map((t) => `• ${t.name} — ${formatRupiah(t.price)}`).join("\n");
  return rows.map((t) => `• ${t!.name} — ${formatRupiah(t!.price)}`).join("\n");
}

function syaratMsg(): BotMsg {
  const ginjal = articles.find((s) => s.slug === "fungsi-ginjal");
  const dm = articles.find((s) => s.slug === "diabetes");
  const tbc = articles.find((s) => s.slug === "tuberkulosis");
  return {
    from: "bot",
    text: [
      "Syarat sebelum pemeriksaan, dirangkum dari artikel resmi BIOMED:",
      "",
      "• Gula darah puasa: tidak makan 8–10 jam, air putih boleh. Lanjut gula 2 jam setelah makan. (artikel Diabetes)",
      "• Urin lengkap: urin pagi pertama atau kedua, porsi tengah, wadah bersih. (artikel Fungsi Ginjal)",
      "• Bersihan kreatinin (CCT) & mikroalbumin: kumpulkan urin 24 jam, tidak boleh terbuang.",
      "• Dahak TBC: pagi hari, 3 hari berturut-turut, batuk kuat dari paru — bukan ludah. (artikel Tuberkulosis)",
      "• Rontgen ulang TBC: bawa foto sebelumnya.",
      "• Tes Mantoux: dibaca 48–72 jam setelah suntik.",
      "",
      "Sebut nama tes bila ingin syarat yang lebih spesifik.",
    ].join("\n"),
    chips: ["Harga tes", "Diabetes", "Ginjal", "TBC", "Reservasi"],
    link: ginjal
      ? { kind: "artikel", slug: ginjal.slug, label: `Baca: ${ginjal.title}` }
      : dm
        ? { kind: "artikel", slug: dm.slug, label: `Baca: ${dm.title}` }
        : tbc
          ? { kind: "artikel", slug: tbc.slug, label: `Baca: ${tbc.title}` }
          : undefined,
  };
}

function fromStory(s: Story, q: string, chips?: string[]): BotMsg {
  return {
    from: "bot",
    text: excerpt(s, q),
    chips: chips ?? ["Syarat pemeriksaan", "Harga tes", "WhatsApp admin"],
    link: { kind: storyKind(s), slug: s.slug, label: `Baca lengkap: ${s.title}` },
  };
}

export function replyTo(raw: string): BotMsg {
  const q = raw.toLowerCase().replace(/\s+/g, " ").trim();

  if (/wa|whatsapp|admin|orang|cs manusia|live/.test(q)) {
    return {
      from: "bot",
      text: `Sambungkan ke admin pusat di WhatsApp ${WA}. Chat dibuka di tab baru.`,
      wa: true,
      chips: ["Reservasi", "Cabang"],
    };
  }

  if (/syarat|persiapan|persiap|puasa dulu|harus puasa|sebelum periksa|sebelum tes|apa yang dibawa/.test(q) && !/ramadh?an/.test(q)) {
    if (/gula|diabetes|hba1c/.test(q)) {
      const s = articles.find((a) => a.slug === "diabetes");
      if (s) return fromStory(s, "gula darah puasa 8 10 jam air putih", ["Harga tes", "Diabetes"]);
    }
    if (/urin|ginjal|kreatinin|ureum/.test(q)) {
      const s = articles.find((a) => a.slug === "fungsi-ginjal");
      if (s) return fromStory(s, "urin pagi porsi tengah 24 jam", ["Harga tes", "Ginjal"]);
    }
    if (/dahak|sputum|tbc|tuber/.test(q)) {
      const s = articles.find((a) => a.slug === "tuberkulosis");
      if (s) return fromStory(s, "dahak pagi batuk", ["Harga tes", "TBC"]);
    }
    return syaratMsg();
  }

  const wantsPrice = /harga|tarif|biaya|berapa|pricelist|price/.test(q);
  const branch = detectBranch(q) ?? (typeof window === "undefined" ? "serang" : getCabang());
  const hits = matchTests(q, branch);

  if (wantsPrice || (hits.length && /rp|uang|bayar/.test(q))) {
    if (hits.length) {
      const first = hits[0];
      const rest = hits.slice(1, 4);
      const lines = [
        `Tarif resmi “${first.name}” (${first.category}), daftar pricelist cabang:`,
        priceAcross(first.name),
        "",
        `Harga dapat berbeda tiap kota dan berubah sebelum transaksi. Cabang aktif di perangkat: ${priceBranches.find((b) => b.id === branch)?.label}.`,
      ];
      if (rest.length) {
        lines.push("", "Tes mirip di cabang itu:");
        for (const t of rest) lines.push(`• ${t.name} — ${formatRupiah(t.price)}`);
      }
      return {
        from: "bot",
        text: lines.join("\n"),
        chips: ["Syarat pemeriksaan", "Cabang", "Reservasi"],
        link: { kind: "harga", label: "Buka daftar harga" },
      };
    }
    const meta = priceBranches.find((b) => b.id === branch);
    return {
      from: "bot",
      text: `Harga beda di tiap cabang. Cuplikan ${meta?.label ?? "Serang"} (update ${meta?.updated ?? ""}):\n\n${popularHint(branch)}\n\nKetik nama tes, misalnya “harga darah lengkap Cilegon” atau “berapa USG”.`,
      chips: ["Darah lengkap", "Gula darah puasa", "Asam urat", "USG", "Cabang"],
      link: { kind: "harga", label: "Buka daftar harga" },
    };
  }

  if (hits.length === 1 && /tes|test|periksa/.test(q)) {
    const t = hits[0];
    return {
      from: "bot",
      text: `Pemeriksaan “${t.name}” ada di pricelist ${priceBranches.find((b) => b.id === branch)?.label}: ${formatRupiah(t.price)}.\n\n${priceAcross(t.name)}`,
      chips: ["Syarat pemeriksaan", "Reservasi"],
      link: { kind: "harga", label: "Buka daftar harga" },
    };
  }

  if (/reserv|daftar|booking|janji|antri|antre/.test(q)) {
    return {
      from: "bot",
      text:
        "Reservasi lewat menu Reservasi di situs — form terkirim ke WhatsApp. Bayar di kasir cabang, bukan transfer di web.",
      chips: ["WhatsApp admin", "Syarat pemeriksaan", "Harga tes"],
      link: { kind: "reservasi", label: "Isi reservasi" },
    };
  }

  if (/cabang|lokasi|alamat|serang|cilegon|cikupa|pandeglang|rangkas/.test(q) && !hits.length) {
    return {
      from: "bot",
      text: `Lima cabang Banten (situs resmi):\n\n${cabangText()}\n\nWhatsApp pusat ${WA}.`,
      chips: ["Harga tes", "Reservasi"],
    };
  }

  if (/hasil|barcode|struk|link hasil|kapan keluar|selesai/.test(q)) {
    return {
      from: "bot",
      text:
        "Tes rutin biasanya hari yang sama. Tautan hasil ada di barcode struk kasir — hanya terbuka setelah lunas. Hutang mengunci tautan sampai sisa dibayar saat ambil hasil.",
      chips: ["Reservasi", "WhatsApp admin"],
    };
  }

  if (/jam|buka|tutup|operasional/.test(q)) {
    return {
      from: "bot",
      text: `Jam loket mengikuti cabang. Konfirmasi lewat WhatsApp ${WA}, telp Serang (0254) 220304, atau Cilegon (0254) 394489.`,
      chips: ["Cabang", "WhatsApp admin"],
    };
  }

  if (/iso|kalk|akredit|izin|legal/.test(q)) {
    return {
      from: "bot",
      text:
        "BIOMED terakreditasi ISO 9001:2015 dan KALK, izin klinik, NIB 8120012160143. Scan dokumen di menu Legalitas.",
      chips: ["Cabang", "MCU"],
    };
  }

  if (/halo|hai|hi|pagi|siang|sore|malam|terima kasih|makasih/.test(q) && tokens(q).length < 3) {
    return greeting();
  }

  const found = findStories(q);
  if (found[0]) {
    const extra = found[1] && found[1].slug !== found[0].slug ? [found[1].title] : [];
    return fromStory(found[0], q, ["Syarat pemeriksaan", "Harga tes", ...extra, "WhatsApp admin"]);
  }

  return {
    from: "bot",
    text: `Belum ketemu di artikel atau pricelist. Coba nama tes (“harga HbA1c”), topik kesehatan (diabetes, ginjal, TBC), atau chat admin WhatsApp ${WA} (+${WA_PUSAT}).`,
    chips: ["Syarat pemeriksaan", "Harga tes", "Diabetes", "Ginjal", "WhatsApp admin"],
  };
}
