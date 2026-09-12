import { o as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Search } from "../_libs/lucide-react.mjs";
import { c as formatRupiah, f as priceBranches, l as categoriesFor, m as testsFor, p as setCabang, u as getCabang } from "./router-D0DoDx79.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/harga-DJmjF4I2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HargaPage() {
	const [cabang, setCabangState] = (0, import_react.useState)(() => getCabang());
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("Semua");
	const tests = testsFor(cabang);
	const categories = categoriesFor(cabang);
	const meta = priceBranches.find((b) => b.id === cabang);
	const filtered = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return tests.filter((t) => {
			const okCat = cat === "Semua" || t.category === cat;
			const okQ = !needle || t.name.toLowerCase().includes(needle);
			return okCat && okQ;
		});
	}, [
		q,
		cat,
		tests
	]);
	function pick(id) {
		setCabangState(id);
		setCabang(id);
		setCat("Semua");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.28em] text-red",
				children: "Tarif"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl font-semibold sm:text-5xl",
				children: "Daftar harga"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 max-w-2xl text-sm text-muted",
				children: [
					"Tarif ",
					meta.label,
					", ",
					meta.updated,
					". Tidak mengikat — konfirmasi saat reservasi. Pilih cabang untuk melihat harga di kota itu."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex gap-2 overflow-x-auto pb-1",
				children: priceBranches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => pick(b.id),
					className: `h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${cabang === b.id ? "bg-red text-chalk" : "border border-line bg-surface text-muted"}`,
					children: b.label
				}, b.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-20 z-20 mt-6 bg-paper/95 py-3 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Cari pemeriksaan, misal HbA1c",
						className: "h-12 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-blue"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2 overflow-x-auto pb-1",
					children: ["Semua", ...categories].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCat(c),
						className: `h-9 shrink-0 rounded-full px-3 text-xs font-semibold ${cat === c ? "bg-ink text-chalk" : "border border-line bg-surface text-muted"}`,
						children: c
					}, c))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					filtered.length,
					" pemeriksaan · ",
					meta.label
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-line rounded-xl border border-line bg-surface",
				children: filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: t.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: t.category
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg tabular-nums",
						children: formatRupiah(t.price)
					})]
				}, t.id))
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-12 text-center text-muted",
				children: "Tidak ada hasil. Coba kata lain atau cabang lain."
			}) : null
		]
	});
}
//#endregion
export { HargaPage as component };
