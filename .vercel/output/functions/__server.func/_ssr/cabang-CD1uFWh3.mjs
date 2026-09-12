import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as waLink, h as branches } from "./router-D0DoDx79.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cabang-CD1uFWh3.js
var import_jsx_runtime = require_jsx_runtime();
function CabangPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.28em] text-red",
				children: "Jaringan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl font-semibold sm:text-5xl",
				children: "Lima cabang di Banten"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-muted",
				children: "Serang, Cilegon, Cikupa, Pandeglang, dan Rangkasbitung. Home service tersedia."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6",
				children: branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "grid overflow-hidden rounded-xl border border-line bg-surface md:grid-cols-2",
					children: [b.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: b.photo,
						alt: b.name,
						className: "h-56 w-full object-cover md:h-full"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-44 items-end bg-blue p-6 font-display text-4xl text-chalk/30",
						children: b.city
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl",
								children: b.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted",
								children: b.address
							}),
							b.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted",
								children: b.note
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-semibold",
								children: b.phone
							}),
							b.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: b.email
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: waLink(`Halo BIOMED ${b.city}, saya ingin informasi cabang.`),
								className: "mt-6 inline-flex h-11 items-center rounded-full bg-red px-5 text-sm font-semibold text-chalk",
								children: "WhatsApp cabang"
							})
						]
					})]
				}, b.id))
			})
		]
	});
}
//#endregion
export { CabangPage as component };
