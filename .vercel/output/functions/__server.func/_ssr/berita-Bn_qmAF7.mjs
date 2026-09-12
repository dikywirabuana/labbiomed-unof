import { B as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageHero } from "./page-hero-BcFupbC2.mjs";
import { a as news } from "./stories-BHdyeotk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/berita-Bn_qmAF7.js
var import_jsx_runtime = require_jsx_runtime();
function BeritaPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Berita",
			title: "Kabar alat dan layanan baru.",
			lede: "Diangkat dari kanal News situs resmi: USG, echo, HPLC, dan edukasi kesehatan."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-10 divide-y divide-line border-y border-line",
			children: news.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: n.date
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/berita/$slug",
						params: { slug: n.slug },
						className: "mt-1 block font-display text-2xl text-ink",
						children: n.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted",
						children: n.summary
					})
				]
			}, n.slug))
		})]
	});
}
//#endregion
export { BeritaPage as component };
