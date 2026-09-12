import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageHero } from "./page-hero-BcFupbC2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/galeri-aNHKsK8_.js
var import_jsx_runtime = require_jsx_runtime();
var shots = [
	{
		src: "/cabang/serang.png",
		alt: "Gedung BIOMED Serang, Jl. Jend. A. Yani No. 59"
	},
	{
		src: "/cabang/cilegon.png",
		alt: "Gedung BIOMED Cilegon, Jl. Raya Cilegon No. 130"
	},
	{
		src: "/hero-dokter.jpg",
		alt: "Dr. T.K. Darmawan, Sp.PK di laboratorium"
	},
	{
		src: "/logo-wordmark.png",
		alt: "Logo Laboratorium BIOMED"
	}
];
function GaleriPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Galeri",
			title: "Cabang, dokter, dan identitas BIOMED.",
			lede: "Foto gedung Serang dan Cilegon, pendiri, dan banner resmi. Cabang lain menyusul."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 sm:grid-cols-2",
			children: shots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "overflow-hidden rounded-xl border border-line bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.src,
					alt: s.alt,
					className: "h-64 w-full object-cover object-center sm:h-80"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "p-4 text-sm text-muted",
					children: s.alt
				})]
			}, s.src))
		})]
	});
}
//#endregion
export { GaleriPage as component };
