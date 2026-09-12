import { B as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageHero } from "./page-hero-BcFupbC2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkup-BW3TMkuU.js
var import_jsx_runtime = require_jsx_runtime();
var points = [
	{
		title: "MCU karyawan & calon karyawan",
		body: "Sejak 1991 BIOMED menjalankan medical check-up industri di Jabodetabek. Paket disesuaikan hazard kerja."
	},
	{
		title: "On-site minimal 50 peserta",
		body: "Tim datang ke lokasi perusahaan. Rontgen mobile, audiometri, spirometri, lab, dan EKG bisa dibawa."
	},
	{
		title: "Laporan industri",
		body: "Analisa per individu, resume, dan statistik. Konsultan dokter okupasi. Radiologi ILO oleh Sp.Rad bersertifikat."
	},
	{
		title: "MCU pribadi",
		body: "Pasien umum bisa checkup di cabang: darah, urin, thorax, EKG, USG. Booking lewat HP — pasang aplikasi lalu isi reservasi."
	}
];
function CheckupPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				kicker: "Checkup",
				title: "Medical check-up karyawan dan pribadi.",
				lede: "Divisi MCU khusus dengan dokter patologi klinik, okupasi, jantung, jiwa (MMPI), neurologi, dan radiologi ILO."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2",
				children: points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-line bg-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: p.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: p.body
					})]
				}, p.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/reservasi",
					className: "inline-flex h-11 items-center rounded-full bg-red px-5 text-sm font-semibold text-chalk",
					children: "Daftar MCU"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/harga",
					className: "inline-flex h-11 items-center rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink",
					children: "Lihat harga"
				})]
			})
		]
	});
}
//#endregion
export { CheckupPage as component };
