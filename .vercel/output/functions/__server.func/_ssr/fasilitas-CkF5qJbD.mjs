import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageHero } from "./page-hero-BcFupbC2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fasilitas-CkF5qJbD.js
var import_jsx_runtime = require_jsx_runtime();
var equipment = [
	"Hematology Analyzer",
	"Kimia Klinik Analyzer",
	"Immuno Serology Analyzer",
	"Vidas Analyzer (Hormon)",
	"HbA1c Analyzer",
	"Elektrolit Analyzer",
	"EKG (rekam jantung)",
	"USG",
	"Urine Analyzer",
	"Mikroskop elektrik",
	"Audiometri",
	"Spirometri",
	"Washer",
	"Treadmill test",
	"Rontgen digital",
	"Rontgen mobile"
];
var specialists = [
	"Dokter Spesialis Patologi Klinik",
	"Dokter Spesialis Jantung",
	"Dokter Spesialis Jiwa (tes MMPI)",
	"Dokter Spesialis Neurologi",
	"Dokter Spesialis Okupasi",
	"Dokter Spesialis Radiologi bersertifikat ILO",
	"Analis kesehatan, perawat, dan penata rontgen berizin Dinas Kesehatan"
];
function FasilitasPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				kicker: "Fasilitas",
				title: "Peralatan laboratorium full automatic.",
				lede: "Daftar fasilitas dari situs resmi: analyzer kimia, hormon, HbA1c, EKG, USG, rontgen, hingga MCU lapangan."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: equipment.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-line bg-surface p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tabular-nums text-muted",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-xl",
						children: item
					})]
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl",
				children: "Tenaga ahli"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 divide-y divide-line border-y border-line",
				children: specialists.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-3 text-sm text-muted",
					children: s
				}, s))
			})
		]
	});
}
//#endregion
export { FasilitasPage as component };
