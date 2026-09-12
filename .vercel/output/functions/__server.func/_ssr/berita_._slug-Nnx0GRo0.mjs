import { B as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as news, n as findStory } from "./stories-BHdyeotk.mjs";
import { i as Route$2 } from "./router-D0DoDx79.mjs";
import { t as StoryBody } from "./story-body-BrzovObh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/berita_._slug-Nnx0GRo0.js
var import_jsx_runtime = require_jsx_runtime();
function BeritaDetail() {
	const { slug } = Route$2.useParams();
	const story = findStory(news, slug);
	if (!story) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-16 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Berita tidak ditemukan."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/berita",
			className: "mt-4 inline-block text-sm font-semibold text-red",
			children: "Kembali ke berita"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-red",
				children: "Berita"
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
				to: "/berita",
				className: "mt-10 inline-block text-sm font-semibold text-blue",
				children: "Semua berita"
			})
		]
	});
}
//#endregion
export { BeritaDetail as component };
