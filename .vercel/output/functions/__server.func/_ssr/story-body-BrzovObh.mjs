import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as isHeading, r as isBullet } from "./stories-BHdyeotk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/story-body-BrzovObh.js
var import_jsx_runtime = require_jsx_runtime();
function StoryBody({ story }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mt-8",
		children: [
			story.images && story.images.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8 grid gap-4 sm:grid-cols-2",
				children: story.images.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: story.title,
					className: `w-full rounded-lg border border-line bg-surface object-contain ${story.images.length === 1 ? "sm:col-span-2" : ""}`
				}, src))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4 text-base leading-relaxed text-ink",
				children: story.body.map((line, i) => {
					if (isBullet(line)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pl-4 text-muted",
						children: line
					}, i);
					if (isHeading(line)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "pt-4 font-display text-2xl font-semibold",
						children: line
					}, i);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: line
					}, i);
				})
			}),
			story.source ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-xs text-muted",
				children: "Sumber: arsip resmi labbiomed.co.id. Edukasi umum, bukan pengganti nasihat dokter."
			}) : null
		]
	});
}
//#endregion
export { StoryBody as t };
