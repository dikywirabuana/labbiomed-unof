import { o as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as company, o as loadPublished, r as Route$1 } from "./router-D0DoDx79.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hasil_._kode-MM89DwAA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HasilPage() {
	const { kode } = Route$1.useParams();
	const [data, setData] = (0, import_react.useState)("load");
	(0, import_react.useEffect)(() => {
		let live = true;
		loadPublished(decodeURIComponent(kode)).then((p) => {
			if (live) setData(p);
		});
		return () => {
			live = false;
		};
	}, [kode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-red",
				children: "Hasil pemeriksaan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: company.brand
			}),
			data === "load" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted",
				children: "Membuka hasil…"
			}) : !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted",
				children: "Kode tidak ditemukan. Hasil terbit setelah loket mengisi dan menyelesaikan pemeriksaan."
			}) : !data.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl border border-line bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: data.nama
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							data.nomor,
							" · ",
							data.cabang,
							" · ",
							new Date(data.created).toLocaleDateString("id-ID")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm",
						children: "Hasil masih diproses laboratorium. Pindai ulang barcode di struk jika sudah selesai."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: data.nama
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							data.kelamin,
							" ",
							data.umur ? `· ${data.umur}` : "",
							" · ",
							data.nomor,
							" · ",
							data.cabang
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "mt-6 w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-left text-xs uppercase tracking-widest text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2",
									children: "Pemeriksaan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2",
									children: "Hasil"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2",
									children: "Satuan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2",
									children: "Rujukan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2",
									children: "Ket"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.hasil.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 font-medium",
									children: h.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: h.nilai || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-muted",
									children: h.satuan || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-muted",
									children: h.rujukan || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: `py-2 ${h.flag ? "text-red" : "text-muted"}`,
									children: h.flag || "N"
								})
							]
						}, h.name)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-xs text-muted",
						children: [
							"PJ ",
							company.director,
							". Bukan pengganti konsultasi dokter."
						]
					})
				]
			})
		]
	});
}
//#endregion
export { HasilPage as component };
