import { o as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageHero } from "./page-hero-BcFupbC2.mjs";
import { d as isPriceBranch, g as waLink, h as branches, p as setCabang, u as getCabang } from "./router-D0DoDx79.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reservasi-D8EiXYOx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var kinds = [
	"Laboratorium",
	"MCU / checkup",
	"USG",
	"Rontgen",
	"EKG",
	"Lainnya"
];
var STORAGE = "biomed-reservasi";
function ReservasiPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	function onSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const payload = {
			nama: String(data.get("nama") ?? "").trim(),
			hp: String(data.get("hp") ?? "").trim(),
			cabang: String(data.get("cabang") ?? ""),
			jenis: String(data.get("jenis") ?? ""),
			tanggal: String(data.get("tanggal") ?? ""),
			catatan: String(data.get("catatan") ?? "").trim()
		};
		if (!payload.nama || !payload.hp) return;
		const prev = JSON.parse(localStorage.getItem(STORAGE) ?? "[]");
		localStorage.setItem(STORAGE, JSON.stringify([payload, ...prev].slice(0, 20)));
		const text = [
			"Halo BIOMED, saya ingin reservasi.",
			`Nama: ${payload.nama}`,
			`HP: ${payload.hp}`,
			`Cabang: ${payload.cabang}`,
			`Jenis: ${payload.jenis}`,
			`Tanggal: ${payload.tanggal}`,
			payload.catatan ? `Catatan: ${payload.catatan}` : ""
		].filter(Boolean).join("\n");
		setSent(true);
		window.open(waLink(text), "_blank", "noopener");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				kicker: "Reservasi",
				title: "Daftar dari HP, tanpa antre di loket.",
				lede: "Isi form ini — tersimpan di perangkat Anda — lalu lanjut chat WhatsApp admin. Pasang aplikasi BIOMED agar form selalu di layar utama."
			}),
			sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 rounded-xl border border-line bg-surface p-5 text-sm text-muted",
				children: "Permintaan tersimpan di HP ini. Lanjutkan di WhatsApp. Jika jendela tidak terbuka, ketuk tombol WhatsApp di header."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-10 max-w-xl space-y-4 rounded-xl border border-line bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Nama lengkap", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "nama",
							required: true,
							autoComplete: "name",
							className: "mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Nomor HP", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "hp",
							required: true,
							type: "tel",
							inputMode: "tel",
							autoComplete: "tel",
							className: "mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Cabang", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							name: "cabang",
							defaultValue: branches.find((b) => b.id === getCabang())?.name,
							onChange: (e) => {
								const b = branches.find((x) => x.name === e.target.value);
								if (b && isPriceBranch(b.id)) setCabang(b.id);
							},
							className: "mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm",
							children: branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: b.name,
								children: b.name
							}, b.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Jenis pemeriksaan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							name: "jenis",
							className: "mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm",
							children: kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: k }, k))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Tanggal rencana", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "tanggal",
							type: "date",
							className: "mt-2 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Catatan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							name: "catatan",
							rows: 3,
							className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-12 w-full rounded-full bg-red text-sm font-semibold text-chalk",
						children: "Kirim ke WhatsApp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Reservasi belum mengunci slot. Admin cabang akan konfirmasi jam dan persiapan (puasa, rujukan, dll.)."
					})
				]
			})
		]
	});
}
//#endregion
export { ReservasiPage as component };
