import { o as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as company, n as Route, o as loadPublished, s as sealOf } from "./router-D0DoDx79.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/validasi_._kode-BmqkmIYo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ValidasiPage() {
	const { kode } = Route.useParams();
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
	const asli = data && data !== "load" ? sealOf(data) === data.seal && data.ready : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-16 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-red",
				children: "Validasi keaslian"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "Surat hasil lab"
			}),
			data === "load" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted",
				children: "Memeriksa kode…"
			}) : !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted",
				children: "Kode tidak terdaftar. Surat ini tidak bisa divalidasi."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl border border-line bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `font-display text-3xl ${asli ? "" : "text-red"}`,
						children: asli ? "Asli" : data.ready ? "Tidak cocok" : "Belum final"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							data.nama,
							" · ",
							data.nomor,
							" · ",
							data.cabang
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: ["Kode sah ", data.seal]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: asli ? `Dikeluarkan ${company.legalName}. Penanggung jawab ${company.director}.` : "Jika angka di kertas berbeda, hubungi loket BIOMED."
					})
				]
			})
		]
	});
}
//#endregion
export { ValidasiPage as component };
