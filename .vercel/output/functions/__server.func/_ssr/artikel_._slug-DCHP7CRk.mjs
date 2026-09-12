import { B as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as findStory, t as articles } from "./stories-BHdyeotk.mjs";
import { a as Route$3 } from "./router-D0DoDx79.mjs";
import { t as StoryBody } from "./story-body-BrzovObh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artikel_._slug-DCHP7CRk.js
var import_jsx_runtime = require_jsx_runtime();
function ArtikelDetail() {
	const { slug } = Route$3.useParams();
	const story = findStory(articles, slug);
	if (!story) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-16 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Artikel tidak ditemukan."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/artikel",
			className: "mt-4 inline-block text-sm font-semibold text-red",
			children: "Kembali ke artikel"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-red",
				children: "Artikel"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl font-semibold leading-tight",
				children: story.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: story.date
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryBody, { story }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/reservasi",
				className: "mt-8 inline-flex h-11 items-center rounded-full bg-red px-5 text-sm font-semibold text-chalk",
				children: "Reservasi tes ini"
			})
		]
	});
}
//#endregion
export { ArtikelDetail as component };
