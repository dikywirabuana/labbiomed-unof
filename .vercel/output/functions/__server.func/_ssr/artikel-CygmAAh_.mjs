import { B as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageHero } from "./page-hero-BcFupbC2.mjs";
import { t as articles } from "./stories-BHdyeotk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artikel-CygmAAh_.js
var import_jsx_runtime = require_jsx_runtime();
function ArtikelPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "Artikel",
			title: "Edukasi lab dari arsip BIOMED.",
			lede: "Pranikah, kesuburan, diabetes, asam urat, fungsi ginjal, dan MCU okupasi — diolah ulang dari artikel resmi."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-10 grid gap-4 md:grid-cols-2",
			children: articles.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-line bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: a.date
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/artikel/$slug",
						params: { slug: a.slug },
						className: "mt-2 block font-display text-2xl",
						children: a.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: a.summary
					})
				]
			}, a.slug))
		})]
	});
}
//#endregion
export { ArtikelPage as component };
