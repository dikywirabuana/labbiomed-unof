import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/layanan-Di35JeUL.js
var import_jsx_runtime = require_jsx_runtime();
var groups = [
	{
		title: "Laboratorium",
		items: [
			"Hematologi & koagulasi",
			"Kimia klinik, diabetes, lemak, ginjal, hati",
			"Hormon tiroid & kesuburan (AMH, FSH, LH)",
			"Imunoserologi hepatitis, HIV, dengue",
			"Mikrobiologi & kultur resistensi",
			"PCR / biomolekuler (HPV, HBV, NIPT)"
		]
	},
	{
		title: "Pencitraan",
		items: [
			"USG abdomen, kandungan, mamae, tiroid",
			"Doppler vaskuler & echo jantung",
			"Rontgen digital, panoramik, thorax ILO",
			"Rontgen mobile untuk MCU lapangan"
		]
	},
	{
		title: "MCU & okupasi",
		items: [
			"MCU karyawan & calon karyawan",
			"On-site minimal 50 peserta",
			"Audiometri, spirometri, treadmill, MMPI",
			"Laporan individu + statistik industri",
			"Dokter Sp.PK, okupasi, radiologi ILO"
		]
	}
];
function LayananPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.28em] text-red",
				children: "Layanan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl font-semibold sm:text-5xl",
				children: "Dari darah rutin sampai MCU lengkap"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted",
				children: "Peralatan full automatic: hematology, kimia klinik, Vidas hormon, HbA1c, EKG, USG, rontgen. Dipimpin Dr. T.K. Darmawan, Sp.PK."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-3",
				children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-line bg-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: g.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 text-sm text-muted",
						children: g.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-line/70 py-2 last:border-0",
							children: i
						}, i))
					})]
				}, g.title))
			})
		]
	});
}
//#endregion
export { LayananPage as component };
