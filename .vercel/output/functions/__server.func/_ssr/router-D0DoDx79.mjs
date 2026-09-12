import { o as __toESM } from "../_runtime.mjs";
import { B as require_jsx_runtime, _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { c as Plus, d as Menu, i as Sun, l as Moon, m as Download, n as TriangleAlert, o as Search, r as Trash2, t as X, u as Minus } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as renderSVG } from "../_libs/uqr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D0DoDx79.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Logo({ variant = "lockup", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo-wordmark.png",
		alt: "Laboratorium BIOMED",
		className: variant === "full" ? `h-auto w-full max-w-sm object-contain ${className}` : `h-12 w-auto max-h-14 object-contain object-left sm:h-14 ${className}`
	});
}
var KEY$1 = "biomed-theme";
var ThemeCtx = (0, import_react.createContext)({
	theme: "siang",
	toggle: () => {}
});
var themeBootScript = `(function(){try{if(localStorage.getItem("${KEY$1}")==="malam")document.documentElement.setAttribute("data-theme","malam")}catch(e){}})();`;
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("siang");
	(0, import_react.useEffect)(() => {
		const next = localStorage.getItem(KEY$1) === "malam" ? "malam" : "siang";
		setTheme(next);
		document.documentElement.setAttribute("data-theme", next);
	}, []);
	function toggle() {
		const next = theme === "malam" ? "siang" : "malam";
		setTheme(next);
		localStorage.setItem(KEY$1, next);
		document.documentElement.setAttribute("data-theme", next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeCtx.Provider, {
		value: {
			theme,
			toggle
		},
		children
	});
}
function useTheme() {
	return (0, import_react.useContext)(ThemeCtx);
}
function ThemeToggle() {
	const { theme, toggle } = useTheme();
	const malam = theme === "malam";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		className: "grid size-11 place-items-center rounded-full border border-line text-ink",
		"aria-label": malam ? "Mode siang" : "Mode malam",
		title: malam ? "Mode siang" : "Mode malam",
		children: malam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
	});
}
var company = {
	legalName: "PT. Biomed Husada",
	brand: "Laboratorium BIOMED",
	director: "Dr. T.K. Darmawan, Sp.PK",
	founded: 1991,
	nib: "8120012160143",
	nibDate: "7 September 2018"
};
var nav = [
	{
		to: "/",
		label: "Beranda"
	},
	{
		to: "/legalitas",
		label: "Legalitas"
	},
	{
		to: "/layanan",
		label: "Layanan"
	},
	{
		to: "/checkup",
		label: "Checkup"
	},
	{
		to: "/fasilitas",
		label: "Fasilitas"
	},
	{
		to: "/galeri",
		label: "Galeri"
	},
	{
		to: "/berita",
		label: "Berita"
	},
	{
		to: "/artikel",
		label: "Artikel"
	},
	{
		to: "/harga",
		label: "Harga"
	},
	{
		to: "/cabang",
		label: "Cabang"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const primary = nav.filter((l) => [
		"/",
		"/layanan",
		"/checkup",
		"/harga",
		"/cabang"
	].includes(l.to));
	const more = nav.filter((l) => !primary.includes(l));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line/80 bg-surface/95 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "Beranda BIOMED",
					className: "flex shrink-0 items-center",
					onClick: () => setOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-5 lg:flex",
					children: [
						primary.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: `text-sm font-medium ${pathname === l.to ? "text-red" : "text-muted hover:text-ink"}`,
							children: l.label
						}, l.to)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
								className: "cursor-pointer list-none text-sm font-medium text-muted hover:text-ink",
								children: "Menu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute right-0 mt-2 w-48 rounded-lg border border-line bg-surface p-2 shadow-md",
								children: more.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: l.to,
									className: "flex min-h-10 items-center rounded-md px-3 text-sm text-ink hover:bg-paper",
									children: l.label
								}, l.to))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/reservasi",
							className: "inline-flex h-10 items-center rounded-full bg-red px-4 text-sm font-semibold text-chalk",
							children: "Reservasi"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 shrink-0 place-items-center rounded-full border border-line",
						"aria-label": open ? "Tutup menu" : "Buka menu",
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					})]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-line bg-surface px-4 py-4 lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-muted",
				children: "Menu"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-col",
				children: [nav.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					className: "flex min-h-11 items-center border-b border-line/70 text-base font-medium text-ink",
					onClick: () => setOpen(false),
					children: l.label
				}, l.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/reservasi",
					className: "mt-3 inline-flex h-11 items-center justify-center rounded-full bg-red text-sm font-semibold text-chalk",
					onClick: () => setOpen(false),
					children: "Reservasi dari HP"
				})]
			})]
		}) : null]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line bg-blue-deep text-chalk",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { variant: "full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 max-w-xs text-sm leading-relaxed text-chalk/70",
					children: [
						company.legalName,
						" — ",
						company.brand,
						". Lab klinik Banten sejak ",
						company.founded,
						", dipimpin ",
						company.director,
						"."
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg",
					children: "Menu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2 text-sm text-chalk/75",
					children: [nav.filter((l) => l.to !== "/").map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						children: l.label
					}, l.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/reservasi",
						children: "Reservasi"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg",
						children: "Kontak pusat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-chalk/75",
						children: [
							"Serang (0254) 220304",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Cilegon (0254) 394489",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"WhatsApp 0811 1234 988"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/reservasi",
						className: "mt-4 inline-flex h-10 items-center rounded-full bg-red px-4 text-sm font-semibold text-chalk",
						children: "Reservasi"
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-chalk/10 py-4 text-center text-xs text-chalk/50",
			children: [
				"Harga dapat berubah sebelum transaksi. © ",
				company.legalName,
				" — ",
				company.brand
			]
		})]
	});
}
function InstallPrompt() {
	const [deferred, setDeferred] = (0, import_react.useState)(null);
	const [hidden, setHidden] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(display-mode: standalone)").matches) return;
		if (localStorage.getItem("biomed-hide-install") === "1") return;
		const onPrompt = (e) => {
			e.preventDefault();
			setDeferred(e);
			setHidden(false);
		};
		window.addEventListener("beforeinstallprompt", onPrompt);
		const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
		const isSafari = /safari/i.test(navigator.userAgent) && !/crios|fxios|android/i.test(navigator.userAgent);
		if (isIos && isSafari) setHidden(false);
		return () => window.removeEventListener("beforeinstallprompt", onPrompt);
	}, []);
	if (hidden) return null;
	async function install() {
		if (deferred) {
			await deferred.prompt();
			if ((await deferred.userChoice).outcome === "accepted") setHidden(true);
			setDeferred(null);
			return;
		}
		window.location.href = "/?install=1";
	}
	function dismiss() {
		localStorage.setItem("biomed-hide-install", "1");
		setHidden(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-5 shrink-0 text-red" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-w-0 flex-1 text-sm text-ink",
					children: "Pasang BIOMED di HP — reservasi dari layar utama, tanpa buka browser."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: install,
					className: "h-10 shrink-0 rounded-full bg-red px-4 text-sm font-semibold text-chalk",
					children: "Pasang"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: dismiss,
					className: "grid size-10 place-items-center",
					"aria-label": "Tutup",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})
			]
		})
	});
}
var WA_PUSAT = "628111234988";
var branches = [
	{
		id: "serang",
		name: "BIOMED Serang",
		city: "Kota Serang",
		address: "Jl. Jend. Ahmad Yani No. 59, Cimuncang, Kota Serang, Banten 42117",
		phone: "(0254) 220304",
		wa: WA_PUSAT,
		email: "serang@biomedhusada.com",
		photo: "/cabang/serang.png"
	},
	{
		id: "cilegon",
		name: "BIOMED Cilegon",
		city: "Kota Cilegon",
		address: "Jl. Raya Cilegon No. 130, Sukmajaya, Kec. Jombang, Kota Cilegon, Banten 42423",
		phone: "(0254) 394489",
		wa: WA_PUSAT,
		email: "Cilegon@biomedhusada.com",
		photo: "/cabang/cilegon.png"
	},
	{
		id: "cikupa",
		name: "BIOMED Cikupa",
		city: "Tangerang",
		address: "Cikupa, Kabupaten Tangerang",
		phone: "0811 1234 988",
		wa: WA_PUSAT,
		note: "Alamat lengkap dikonfirmasi ke admin saat booking."
	},
	{
		id: "pandeglang",
		name: "BIOMED Pandeglang",
		city: "Pandeglang",
		address: "Kabupaten Pandeglang, Banten",
		phone: "0811 1234 988",
		wa: WA_PUSAT,
		note: "Alamat lengkap dikonfirmasi ke admin saat booking."
	},
	{
		id: "rangkas",
		name: "BIOMED Rangkasbitung",
		city: "Lebak",
		address: "Rangkasbitung, Kabupaten Lebak, Banten",
		phone: "0811 1234 988",
		wa: WA_PUSAT,
		note: "Alamat lengkap dikonfirmasi ke admin saat booking."
	}
];
function waLink(text) {
	return `https://wa.me/${WA_PUSAT}?text=${encodeURIComponent(text)}`;
}
var prices_default = {
	serang: [
		{
			"id": "hb-cairan-0",
			"name": "Hb Cairan",
			"price": 9e4,
			"category": "Hematologi"
		},
		{
			"id": "haemoglobin-1",
			"name": "Haemoglobin",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "leukosit-2",
			"name": "Leukosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "retikulosit-3",
			"name": "Retikulosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "led-4",
			"name": "LED",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "eritrosit-5",
			"name": "Eritrosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "diff-6",
			"name": "Diff.",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "trombosit-7",
			"name": "Trombosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "ret-he-8",
			"name": "Ret-He",
			"price": 12e4,
			"category": "Hematologi"
		},
		{
			"id": "morfologi-darah-tepi-9",
			"name": "Morfologi Darah Tepi",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "total-eosinofil-10",
			"name": "Total Eosinofil",
			"price": 75e3,
			"category": "Hematologi"
		},
		{
			"id": "ipf-immature-platelet-fraction-11",
			"name": "IPF/Immature Platelet Fraction",
			"price": 24e4,
			"category": "Hematologi"
		},
		{
			"id": "golongan-darah-rhesus-12",
			"name": "Golongan Darah + Rhesus",
			"price": 6e4,
			"category": "Hematologi"
		},
		{
			"id": "malaria-13",
			"name": "Malaria",
			"price": 1e5,
			"category": "Hematologi"
		},
		{
			"id": "masa-perdarahan-bt-14",
			"name": "Masa Perdarahan (BT)",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "masa-pembekuan-ct-15",
			"name": "Masa Pembekuan (CT)",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "masa-protrombin-pt-16",
			"name": "Masa Protrombin (PT)",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "inr-17",
			"name": "INR",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "aptt-18",
			"name": "Aptt",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "fibrinogen-19",
			"name": "Fibrinogen",
			"price": 1e5,
			"category": "Hematologi"
		},
		{
			"id": "d-dimer-20",
			"name": "D-Dimer",
			"price": 35e4,
			"category": "Hematologi"
		},
		{
			"id": "sel-le-21",
			"name": "Sel LE",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "elektroforesa-hemoglobin-22",
			"name": "Elektroforesa Hemoglobin",
			"price": 76e4,
			"category": "Hematologi"
		},
		{
			"id": "serum-iron-si-23",
			"name": "Serum Iron (SI)",
			"price": 12e4,
			"category": "Hematologi"
		},
		{
			"id": "tibc-24",
			"name": "Tibc",
			"price": 16e4,
			"category": "Hematologi"
		},
		{
			"id": "saturasi-transferin-25",
			"name": "Saturasi Transferin",
			"price": 18e4,
			"category": "Hematologi"
		},
		{
			"id": "ferritin-eclia-26",
			"name": "Ferritin (ECLIA)",
			"price": 3e5,
			"category": "Hematologi"
		},
		{
			"id": "uibc-27",
			"name": "Uibc",
			"price": 26e4,
			"category": "Hematologi"
		},
		{
			"id": "transferin-serum-28",
			"name": "Transferin (Serum)",
			"price": 25e4,
			"category": "Hematologi"
		},
		{
			"id": "coomb-s-test-29",
			"name": "Coomb's test",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "g6pd-fia-30",
			"name": "G6Pd (Fia)",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "asam-folat-clia-31",
			"name": "Asam Folat (CLIA)",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "agregasi-trombosit-32",
			"name": "Agregasi Trombosit",
			"price": 55e4,
			"category": "Hematologi"
		},
		{
			"id": "anti-trombin-3-at3-33",
			"name": "Anti Trombin 3 (AT3)",
			"price": 405e3,
			"category": "Hematologi"
		},
		{
			"id": "vitamin-b12-clia-34",
			"name": "Vitamin B12 (CLIA)",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "protein-s-35",
			"name": "Protein S",
			"price": 1815e3,
			"category": "Hematologi"
		},
		{
			"id": "protein-c-36",
			"name": "Protein C",
			"price": 1355e3,
			"category": "Hematologi"
		},
		{
			"id": "fragilitas-osmotik-eritrosit-37",
			"name": "Fragilitas Osmotik Eritrosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "viskositas-darah-38",
			"name": "Viskositas Darah",
			"price": 35e4,
			"category": "Hematologi"
		},
		{
			"id": "anti-trombosit-39",
			"name": "Anti Trombosit",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "phenytoin-dilantin-40",
			"name": "Phenytoin / Dilantin",
			"price": 1895e3,
			"category": "Hematologi"
		},
		{
			"id": "retraksi-bekuan-41",
			"name": "Retraksi Bekuan",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "trombin-time-42",
			"name": "Trombin Time",
			"price": 55e4,
			"category": "Hematologi"
		},
		{
			"id": "mcv-43",
			"name": "MCV",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "mch-44",
			"name": "MCH",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "mchc-45",
			"name": "Mchc",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "anti-beta2-glikoprotein-46",
			"name": "Anti-Beta2 Glikoprotein",
			"price": 154e4,
			"category": "Hematologi"
		},
		{
			"id": "lupus-anti-coagulant-47",
			"name": "Lupus Anti Coagulant",
			"price": 885e3,
			"category": "Hematologi"
		},
		{
			"id": "i-t-ratio-48",
			"name": "I/T Ratio",
			"price": 8e4,
			"category": "Hematologi"
		},
		{
			"id": "analisa-hemoglobin-49",
			"name": "Analisa Hemoglobin",
			"price": 7e5,
			"category": "Hematologi"
		},
		{
			"id": "malaria-antigen-50",
			"name": "Malaria Antigen",
			"price": 2e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-lengkap-serum-51",
			"name": "Protein Lengkap (Serum)",
			"price": 1e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-lengkap-bayi-52",
			"name": "Protein Lengkap Bayi",
			"price": 1e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-total-serum-53",
			"name": "Protein Total (Serum)",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "albumin-serum-54",
			"name": "Albumin (Serum)",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "bilirubin-55",
			"name": "Bilirubin",
			"price": 1e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "bilirubin-neonatus-56",
			"name": "Bilirubin Neonatus",
			"price": 1e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "sgot-57",
			"name": "Sgot",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "sgpt-58",
			"name": "Sgpt",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "alkali-fosfatase-59",
			"name": "Alkali Fosfatase",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "gamma-gt-60",
			"name": "Gamma GT",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "gamma-gt-neonatus-61",
			"name": "Gamma GT Neonatus",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "ldh-serum-plasma-62",
			"name": "LDH (Serum/Plasma)",
			"price": 1e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "cholinesterase-63",
			"name": "Cholinesterase",
			"price": 14e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "elektroforesa-serum-protein-capillary-electropho-64",
			"name": "Elektroforesa Serum Protein (Capillary Electrophoresis)",
			"price": 42e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "asam-empedu-65",
			"name": "Asam empedu",
			"price": 15e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "ammonia-darah-nh3-66",
			"name": "Ammonia Darah (NH3)",
			"price": 25e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-sewaktu-67",
			"name": "Glukosa Sewaktu",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-puasa-68",
			"name": "Glukosa Puasa",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-2-jam-pp-69",
			"name": "Glukosa 2 jam PP",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "kurva-harian-glukosa-70",
			"name": "Kurva Harian Glukosa",
			"price": 16e4,
			"category": "Diabetes"
		},
		{
			"id": "tes-toleransi-glukosa-gtt-71",
			"name": "Tes Toleransi Glukosa (GTT)",
			"price": 2e5,
			"category": "Diabetes"
		},
		{
			"id": "hb-a1c-72",
			"name": "Hb A1C",
			"price": 16e4,
			"category": "Diabetes"
		},
		{
			"id": "glycated-albumin-73",
			"name": "Glycated Albumin",
			"price": 31e4,
			"category": "Diabetes"
		},
		{
			"id": "c-peptide-clia-74",
			"name": "C - peptide (CLIA)",
			"price": 5e5,
			"category": "Diabetes"
		},
		{
			"id": "resistensi-insulin-75",
			"name": "Resistensi Insulin",
			"price": 45e4,
			"category": "Diabetes"
		},
		{
			"id": "insulin-puasa-clia-76",
			"name": "Insulin Puasa (CLIA)",
			"price": 4e5,
			"category": "Diabetes"
		},
		{
			"id": "insulin-2-jam-pp-clia-77",
			"name": "Insulin 2 Jam PP (CLIA)",
			"price": 4e5,
			"category": "Jantung"
		},
		{
			"id": "ck-cpk-ck-nac-78",
			"name": "Ck/Cpk/Ck-Nac",
			"price": 2e5,
			"category": "Jantung"
		},
		{
			"id": "ck-mb-79",
			"name": "Ck-Mb",
			"price": 2e5,
			"category": "Jantung"
		},
		{
			"id": "ldh-darah-80",
			"name": "LDH (Darah)",
			"price": 1e5,
			"category": "Jantung"
		},
		{
			"id": "sgot-jantung-81",
			"name": "SGOT (Jantung)",
			"price": 45e3,
			"category": "Jantung"
		},
		{
			"id": "troponin-t-82",
			"name": "Troponin T",
			"price": 4e5,
			"category": "Jantung"
		},
		{
			"id": "hscrp-lpeita-83",
			"name": "hsCRP (LPEITA)",
			"price": 2e5,
			"category": "Jantung"
		},
		{
			"id": "troponin-i-84",
			"name": "Troponin I",
			"price": 35e4,
			"category": "Jantung"
		},
		{
			"id": "hs-troponin-i-clia-85",
			"name": "hs-Troponin I (CLIA)",
			"price": 35e4,
			"category": "Jantung"
		},
		{
			"id": "hs-troponin-t-eclia-86",
			"name": "hs-Troponin T (ECLIA)",
			"price": 4e5,
			"category": "Jantung"
		},
		{
			"id": "homocystein-87",
			"name": "Homocystein",
			"price": 1105e3,
			"category": "Lemak Darah"
		},
		{
			"id": "lemak-lengkap-88",
			"name": "Lemak Lengkap",
			"price": 2e5,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-total-89",
			"name": "Cholesterol Total",
			"price": 5e4,
			"category": "Lemak Darah"
		},
		{
			"id": "trigliserida-90",
			"name": "Trigliserida",
			"price": 5e4,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-hdl-direk-91",
			"name": "Cholesterol HDL (direk)",
			"price": 55e3,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-ldl-direk-92",
			"name": "Cholesterol LDL (direk)",
			"price": 6e4,
			"category": "Lemak Darah"
		},
		{
			"id": "lipid-total-93",
			"name": "Lipid Total",
			"price": 2e5,
			"category": "Lemak Darah"
		},
		{
			"id": "lp-a-94",
			"name": "Lp (a)",
			"price": 765e3,
			"category": "Lemak Darah"
		},
		{
			"id": "apo-b-95",
			"name": "Apo B",
			"price": 4e5,
			"category": "Lemak Darah"
		},
		{
			"id": "apo-a1-96",
			"name": "Apo A1",
			"price": 45e4,
			"category": "Lemak Darah"
		},
		{
			"id": "small-dense-ldl-97",
			"name": "Small Dense LDL",
			"price": 435e3,
			"category": "Lemak Darah"
		},
		{
			"id": "adiponektin-98",
			"name": "Adiponektin",
			"price": 115e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "ureum-serum-plasma-99",
			"name": "Ureum (Serum/Plasma)",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "kreatinin-serum-plasma-100",
			"name": "Kreatinin (Serum/Plasma)",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "asam-urat-serum-plasma-101",
			"name": "Asam Urat (Serum/Plasma)",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "creatinin-clearence-102",
			"name": "Creatinin Clearence",
			"price": 15e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "ureum-clearance-103",
			"name": "Ureum Clearance",
			"price": 15e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "cystatin-c-fia-104",
			"name": "Cystatin C (FIA)",
			"price": 4e5,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "2-microglobulin-clia-105",
			"name": "β2-Microglobulin (CLIA)",
			"price": 6e5,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "protein-creatinine-ratio-urine-106",
			"name": "Protein-Creatinine Ratio (Urine)",
			"price": 2e5,
			"category": "Elektrolit"
		},
		{
			"id": "asam-laktat-darah-107",
			"name": "Asam Laktat (Darah)",
			"price": 5e5,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-108",
			"name": "Natrium",
			"price": 7e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-109",
			"name": "Kalium",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-110",
			"name": "Chlorida",
			"price": 7e4,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-111",
			"name": "Calsium",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "fosfor-112",
			"name": "Fosfor",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "magnesium-113",
			"name": "Magnesium",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-urine-114",
			"name": "Natrium Urine",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-urine-sewaktu-115",
			"name": "Kalium Urine Sewaktu",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "klorida-urine-116",
			"name": "Klorida Urine",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-ion-117",
			"name": "Calsium Ion",
			"price": 2e5,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-bayi-118",
			"name": "Calsium Bayi",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-urine-24-jam-119",
			"name": "Natrium Urine 24 jam",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-urine-24-jam-120",
			"name": "Kalium Urine 24 jam",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-urine-24-jam-121",
			"name": "Chlorida Urine 24 jam",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "analisa-gas-darah-122",
			"name": "Analisa Gas Darah",
			"price": 38e4,
			"category": "Elektrolit"
		},
		{
			"id": "magnesium-urine-24-jam-123",
			"name": "Magnesium Urine 24 jam",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "fosfor-dalam-urin-124",
			"name": "Fosfor dalam urin",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-urine-24-jam-125",
			"name": "Calsium Urine 24 Jam",
			"price": 2e5,
			"category": "Elektrolit"
		},
		{
			"id": "keton-darah-hydroxybutyrate-126",
			"name": "Keton Darah (β- hydroxybutyrate)",
			"price": 2e5,
			"category": "Elektrolit"
		},
		{
			"id": "paket-elektrolit-127",
			"name": "Paket Elektrolit",
			"price": 18e4,
			"category": "Elektrolit"
		},
		{
			"id": "osmolalitas-plasma-pancreas-128",
			"name": "Osmolalitas Plasma PANCREAS",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "amilase-darah-129",
			"name": "Amilase Darah",
			"price": 225e3,
			"category": "Elektrolit"
		},
		{
			"id": "lipase-darah-130",
			"name": "Lipase Darah",
			"price": 225e3,
			"category": "Elektrolit"
		},
		{
			"id": "acid-phospatase-131",
			"name": "Acid Phospatase",
			"price": 675e3,
			"category": "Urinalisa"
		},
		{
			"id": "urine-kolektor-dewasa-132",
			"name": "Urine Kolektor Dewasa",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "glukosa-urine-133",
			"name": "Glukosa Urine",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-134",
			"name": "Protein",
			"price": 5e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-urin-sewaktu-135",
			"name": "Protein Urin Sewaktu",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-kuantitatif-136",
			"name": "Protein Kuantitatif",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "ureum-urine-137",
			"name": "Ureum Urine",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "kreatinin-urine-138",
			"name": "Kreatinin Urine",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "asam-urat-urine-139",
			"name": "Asam Urat Urine",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "trigliserida-urine-140",
			"name": "Trigliserida Urine",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "cholesterol-urine-141",
			"name": "Cholesterol Urine",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "mikroalbumin-urine-24-jam-nefelometri-test-narko-142",
			"name": "Mikroalbumin Urine 24 jam (Nefelometri) TEST NARKOBA",
			"price": 22e4,
			"category": "Urinalisa"
		},
		{
			"id": "amphetamine-amp-143",
			"name": "Amphetamine (AMP)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "mariyuana-thc-144",
			"name": "Mariyuana (THC)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "ophium-morfin-heroin-putaw-145",
			"name": "Ophium (Morfin, Heroin, Putaw)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "benzodiazepine-bzo-146",
			"name": "Benzodiazepine (BZO)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "alcohol-saliva-147",
			"name": "Alcohol (Saliva)",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "barbiturat-148",
			"name": "Barbiturat",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "cocaine-coc-149",
			"name": "Cocaine (COC)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "metamphetamin-sabu-sabu-150",
			"name": "Metamphetamin (Sabu- sabu)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "mdma-151",
			"name": "Mdma",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "k2-sintetik-marijuana-152",
			"name": "K2 (Sintetik Marijuana)",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "tramadol-153",
			"name": "Tramadol",
			"price": 7e4,
			"category": "Urinalisa"
		},
		{
			"id": "carisoprodol-soma-154",
			"name": "Carisoprodol (SOMA)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "phencyclidine-155",
			"name": "Phencyclidine",
			"price": 5e4,
			"category": "Urinalisa"
		},
		{
			"id": "narkoba-3-parameter-156",
			"name": "Narkoba 3 Parameter",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "narkoba-6-parameter-157",
			"name": "Narkoba 6 Parameter",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "amoniak-158",
			"name": "Amoniak",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "albumin-urine-159",
			"name": "Albumin Urine",
			"price": 2e5,
			"category": "Urinalisa"
		},
		{
			"id": "osmolaritas-urine-160",
			"name": "Osmolaritas Urine",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "morfologi-eritrosit-urine-fase-kontras-161",
			"name": "Morfologi Eritrosit Urine (Fase Kontras)",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kehamilan-rapid-162",
			"name": "Tes Kehamilan Rapid",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "beta-hcg-kuantitatif-urin-eclia-163",
			"name": "Beta HCG Kuantitatif Urin (ECLIA)",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kehamilan-titer-164",
			"name": "Tes Kehamilan Titer",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "protein-bence-jones-165",
			"name": "Protein Bence Jones",
			"price": 7e4,
			"category": "Urinalisa"
		},
		{
			"id": "acr-albumin-to-creatinine-ratio-166",
			"name": "ACR (Albumin-to- Creatinine Ratio)",
			"price": 25e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-creatinin-ratio-167",
			"name": "Protein Creatinin Ratio",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "benzene-biomonitoring-biomonitoring-168",
			"name": "Benzene (Biomonitoring) BIOMONITORING",
			"price": 6e5,
			"category": "Urinalisa"
		},
		{
			"id": "plumbum-pb-169",
			"name": "Plumbum (Pb)",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "cotinine-cot-faeces-170",
			"name": "Cotinine (COT) FAECES",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "fecal-calprotectin-171",
			"name": "Fecal Calprotectin",
			"price": 75e4,
			"category": "Urinalisa"
		},
		{
			"id": "m2pk-172",
			"name": "M2Pk",
			"price": 9e5,
			"category": "Urinalisa"
		},
		{
			"id": "faeces-lengkap-173",
			"name": "Faeces Lengkap",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "darah-samar-fobt-174",
			"name": "Darah Samar (FOBT)",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "laktosa-intolerans-175",
			"name": "Laktosa Intolerans",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "fobt-176",
			"name": "Fobt",
			"price": 9e4,
			"category": "Urinalisa"
		},
		{
			"id": "swab-dubur-untuk-cacing-177",
			"name": "Swab Dubur untuk Cacing",
			"price": 7e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-faeces-gastro-cairan-tubuh-178",
			"name": "Analisa Faeces Gastro Cairan Tubuh",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sperma-analisa-cairan-179",
			"name": "Analisa Sperma Analisa Cairan",
			"price": 17e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-pleura-180",
			"name": "Analisa Cairan Pleura",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-dialisat-capd-181",
			"name": "Analisa Cairan Dialisat (Capd)",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-lambung-182",
			"name": "Analisa Cairan Lambung",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "ada-adenosine-deaminase-183",
			"name": "ADA (Adenosine Deaminase)",
			"price": 55e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sekret-vagina-184",
			"name": "Analisa Sekret Vagina",
			"price": 17e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-batu-ginjal-185",
			"name": "Analisa Batu Ginjal",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-otak-lcs-186",
			"name": "Analisa Cairan Otak (Lcs)",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sekret-mata-187",
			"name": "Analisa Sekret Mata",
			"price": 12e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-sendi-analisa-cairan-188",
			"name": "Analisa Cairan Sendi Analisa Cairan",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-acites-189",
			"name": "Analisa Cairan Acites",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "cairan-tubuh-190",
			"name": "Cairan Tubuh",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "hemoglobin-cairan-immunoserologi-191",
			"name": "Hemoglobin (Cairan ) IMMUNOSEROLOGI",
			"price": 5e4,
			"category": "Imunoserologi"
		},
		{
			"id": "widal-192",
			"name": "Widal",
			"price": 9e4,
			"category": "Imunoserologi"
		},
		{
			"id": "salmonela-typhi-193",
			"name": "Salmonela Typhi",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "vdrl-194",
			"name": "Vdrl",
			"price": 8e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tpha-195",
			"name": "Tpha",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbsag-eclia-196",
			"name": "HBsAg (ECLIA)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbs-eclia-197",
			"name": "Anti HBs (ECLIA)",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbc-clia-198",
			"name": "Anti HBc (CLIA)",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbc-igm-cmia-199",
			"name": "Anti HBc IgM (CMIA)",
			"price": 95e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-total-rapid-200",
			"name": "Anti HAV Total (RAPID)",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-igm-201",
			"name": "Anti HCV IgM",
			"price": 93e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-antigen-antibodi-elfa-202",
			"name": "HIV Antigen, Antibodi (ELFA)",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "cd-4-203",
			"name": "cd 4",
			"price": 38e4,
			"category": "Imunoserologi"
		},
		{
			"id": "cd-8-204",
			"name": "Cd 8",
			"price": 5e5,
			"category": "Imunoserologi"
		},
		{
			"id": "rheumatoid-factor-nefelometri-205",
			"name": "Rheumatoid Factor (NEFELOMETRI)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "asto-nefelometri-206",
			"name": "ASTO (Nefelometri)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "crp-lpeita-207",
			"name": "Crp (Lpeita)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "c3-komplemen-208",
			"name": "C3 Komplemen",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "c4-komplemen-209",
			"name": "C4 Komplemen",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "igg-immunoturbidimetri-210",
			"name": "IgG (Immunoturbidimetri)",
			"price": 99e4,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-m-211",
			"name": "Ig M",
			"price": 925e3,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-a-212",
			"name": "Ig A",
			"price": 8e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-e-total-clia-213",
			"name": "Ig E Total (CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "ige-spesifik-atopy-214",
			"name": "IgE Spesifik (Atopy)",
			"price": 15e5,
			"category": "Imunoserologi"
		},
		{
			"id": "dengue-igg-igm-215",
			"name": "DENGUE IgG/IgM",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-tb-216",
			"name": "Anti TB",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-pylori-igg-217",
			"name": "Helicobacter pylori IgG",
			"price": 12e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-pylori-igm-218",
			"name": "Helicobacter pylori IgM",
			"price": 12e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-faeces-219",
			"name": "Helicobacter Faeces",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-helicobacter-rapid-220",
			"name": "Anti Helicobacter (Rapid)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "aca-igg-221",
			"name": "ACA IgG",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "aca-igm-222",
			"name": "ACA IgM",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "ana-if-223",
			"name": "Ana (If)",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-ds-dna-clia-224",
			"name": "Anti ds-DNA (CLIA)",
			"price": 55e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hcv-rna-kualitatif-225",
			"name": "HCV RNA Kualitatif",
			"price": 2e6,
			"category": "Imunoserologi"
		},
		{
			"id": "hcv-rna-kuantitatif-226",
			"name": "HCV RNA Kuantitatif",
			"price": 32e5,
			"category": "Imunoserologi"
		},
		{
			"id": "test-ige-spesifik-227",
			"name": "Test IgE Spesifik",
			"price": 15e5,
			"category": "Imunoserologi"
		},
		{
			"id": "dengue-ns1-ag-228",
			"name": "DENGUE NS1 Ag",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbsag-elfa-229",
			"name": "HBsAg (ELFA)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "crp-latex-230",
			"name": "CRP (Latex)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-kuantitatif-clia-231",
			"name": "HBs Ag Kuantitatif(CLIA)",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "procalcitonin-pct-232",
			"name": "Procalcitonin (PCT)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-antigen-antibodi-eclia-233",
			"name": "HIV Antigen, Antibodi (ECLIA)",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ana-profil-234",
			"name": "ANA Profil",
			"price": 13e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-mycoplasma-igg-235",
			"name": "Anti Mycoplasma IgG",
			"price": 15e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-rapid-236",
			"name": "HBs Ag (Rapid)",
			"price": 7e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbe-ag-rapid-237",
			"name": "HBe Ag (Rapid)",
			"price": 1e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-antibodi-rapid-238",
			"name": "HIV Antibodi (Rapid)",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-rapid-239",
			"name": "Anti HCV (Rapid)",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-igm-rapid-240",
			"name": "Anti HAV IgM (Rapid)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-dna-eia-kualitatif-241",
			"name": "HIV-DNA EIA (Kualitatif)",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "serologi-jamur-242",
			"name": "Serologi Jamur",
			"price": 65e4,
			"category": "Imunoserologi"
		},
		{
			"id": "igg-total-immunoturbidimetri-243",
			"name": "IgG Total (Immunoturbidimetri)",
			"price": 99e4,
			"category": "Imunoserologi"
		},
		{
			"id": "rapid-antigen-covid-19-244",
			"name": "Rapid Antigen Covid-19",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tacrolimus-cmia-245",
			"name": "Tacrolimus (: CMIA)",
			"price": 15e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anca-if-246",
			"name": "Anca (If)",
			"price": 72e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-determine-rapid-gen-4-247",
			"name": "HIV Determine (Rapid Gen-4)",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-ccp-fia-248",
			"name": "Anti CCP (FIA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "salmonela-typhi-igm-249",
			"name": "Salmonela typhi IgM",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "chikungunya-igg-igm-250",
			"name": "Chikungunya IgG/IgM",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-clia-251",
			"name": "Anti HCV (CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbc-clia-indeks-ml-252",
			"name": "Anti HBc (CLIA)indeks/mL",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-igm-clia-253",
			"name": "Anti HAV IgM (CLIA)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-syphilis-rapid-254",
			"name": "Anti Syphilis (Rapid)",
			"price": 1e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-e-spesifik-pediatrik-255",
			"name": "Ig E Spesifik Pediatrik",
			"price": 16e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hbeag-clia-256",
			"name": "HBeAg (CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "syphilis-rapid-257",
			"name": "Syphilis (Rapid)",
			"price": 1e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbe-clia-258",
			"name": "Anti HBe (CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tb-lam-ag-urine-259",
			"name": "TB LAM Ag (Urine)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "influenza-a-b-260",
			"name": "Influenza A & B",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-total-clia-261",
			"name": "Anti HAV Total (CLIA)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-measles-262",
			"name": "Anti Measles",
			"price": 13e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-measles-igg-elisa-263",
			"name": "Anti Measles IgG (ELISA)",
			"price": 65e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-measles-igm-elisa-264",
			"name": "Anti Measles IgM (ELISA)",
			"price": 65e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tubex-tf-265",
			"name": "Tubex Tf",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "il-6-266",
			"name": "Il - 6",
			"price": 65e4,
			"category": "Imunoserologi"
		},
		{
			"id": "trab-clia-267",
			"name": "TRAb (CLIA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-tpo-clia-268",
			"name": "Anti TPO (CLIA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "beta-2-glikoprotein-1-elisa-269",
			"name": "Beta-2 Glikoprotein 1 (ELISA)",
			"price": 17e5,
			"category": "Imunoserologi"
		},
		{
			"id": "nt-probnp-270",
			"name": "NT-ProBNP",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "mantoux-test-271",
			"name": "Mantoux Test",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "leptospira-272",
			"name": "Leptospira",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "vitamin-d-25-oh-total-torch-chlamydia-273",
			"name": "Vitamin D 25-OH Total TORCH & CHLAMYDIA",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igg-elfa-274",
			"name": "Anti Toxoplasma IgG (ELFA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igm-clia-275",
			"name": "Anti Toxoplasma IgM (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-rubella-igg-clia-276",
			"name": "Anti Rubella IgG (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-rubella-igm-clia-277",
			"name": "Anti Rubella IgM (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igg-clia-278",
			"name": "Anti CMV IgG (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igg-elfa-279",
			"name": "Anti CMV IgG (ELFA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igm-clia-280",
			"name": "Anti CMV IgM (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igg-elisa-281",
			"name": "Anti HSV I IgG (ELISA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igm-elisa-282",
			"name": "Anti HSV I IgM (ELISA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igg-elisa-283",
			"name": "Anti HSV II IgG (ELISA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igm-elisa-284",
			"name": "Anti HSV II IgM (ELISA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "toxoplasma-igg-aviditas-elfa-285",
			"name": "Toxoplasma IgG Aviditas (ELFA)",
			"price": 77e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-chlamydia-igg-eia-286",
			"name": "Anti Chlamydia IgG (EIA)",
			"price": 135e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-chlamydia-igm-eia-287",
			"name": "Anti Chlamydia IgM (EIA)",
			"price": 135e4,
			"category": "Imunoserologi"
		},
		{
			"id": "cmv-igg-aviditas-clia-288",
			"name": "CMV IgG Aviditas (CLIA)",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igg-clia-289",
			"name": "Anti HSV I IgG (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igm-clia-290",
			"name": "Anti HSV I IgM (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igg-clia-291",
			"name": "Anti HSV II IgG (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igm-clia-292",
			"name": "Anti HSV II IgM (CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "igf-1-1acth-293",
			"name": "Igf-1 1Acth",
			"price": 15e5,
			"category": "Hormon"
		},
		{
			"id": "dhea-s-eclia-294",
			"name": "Dhea-S (Eclia)",
			"price": 125e4,
			"category": "Hormon"
		},
		{
			"id": "beta-hcg-kuantitatif-eclia-295",
			"name": "Beta HCG Kuantitatif (ECLIA)",
			"price": 4e5,
			"category": "Hormon"
		},
		{
			"id": "cortisol-clia-1phenytoin-1growth-hormone-296",
			"name": "Cortisol (CLIA) 1Phenytoin 1Growth Hormone",
			"price": 4e5,
			"category": "Hormon"
		},
		{
			"id": "beta-2-glikoprotein-igm-297",
			"name": "Beta 2 Glikoprotein IgM",
			"price": 155e4,
			"category": "Hormon"
		},
		{
			"id": "t3-elfa-298",
			"name": "T3 (Elfa)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t4-elfa-299",
			"name": "T4 (Elfa)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "t3-uptake-300",
			"name": "T3 Uptake",
			"price": 5e5,
			"category": "Hormon"
		},
		{
			"id": "tsh-clia-301",
			"name": "Tsh (Clia)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "free-t3-clia-302",
			"name": "Free T3 (CLIA)",
			"price": 3e5,
			"category": "Hormon"
		},
		{
			"id": "tiroglobulin-clia-303",
			"name": "Tiroglobulin (CLIA)",
			"price": 6e5,
			"category": "Hormon"
		},
		{
			"id": "free-t4-clia-304",
			"name": "Free T4 (CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "pth-ipth-elfa-305",
			"name": "Pth/Ipth (Elfa)",
			"price": 125e4,
			"category": "Hormon"
		},
		{
			"id": "t3-clia-306",
			"name": "T3 (Clia)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "t4-clia-307",
			"name": "T4 (Clia)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "tsh-neonatus-anak-clia-308",
			"name": "TSH Neonatus/Anak (CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "free-t4-anak-clia-309",
			"name": "Free T4 Anak (CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "tshs-clia-310",
			"name": "TSHs (CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "tiroglobulin-antibodi-anti-tg-clia-311",
			"name": "Tiroglobulin Antibodi/Anti- Tg (CLIA)",
			"price": 6e5,
			"category": "Hormon"
		},
		{
			"id": "tshs-neonatus-anak-clia-312",
			"name": "TSHs Neonatus/ Anak (CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "fsh-clia-313",
			"name": "Fsh (Clia)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "lh-clia-314",
			"name": "Lh (Clia)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "estradiol-clia-315",
			"name": "Estradiol (CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "progesteron-clia-316",
			"name": "Progesteron (CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "prolaktin-clia-317",
			"name": "Prolaktin (CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "testosteron-clia-318",
			"name": "Testosteron (CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "anti-mullerian-hormone-amh-clia-319",
			"name": "Anti Mullerian Hormone / AMH (CLIA)",
			"price": 8e5,
			"category": "Hormon"
		},
		{
			"id": "free-testosteron-clia-320",
			"name": "Free Testosteron (CLIA)",
			"price": 7e5,
			"category": "Hormon"
		},
		{
			"id": "shbg-eclia-1bcr-abl-321",
			"name": "Shbg (Eclia) 1Bcr-Abl",
			"price": 231e4,
			"category": "Tumor Marker"
		},
		{
			"id": "afp-clia-322",
			"name": "Afp (Clia)",
			"price": 35e4,
			"category": "Tumor Marker"
		},
		{
			"id": "cea-clia-323",
			"name": "Cea (Clia)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-19-9-clia-324",
			"name": "Ca 19-9 (Clia)",
			"price": 75e4,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-125-eclia-325",
			"name": "Ca 125 (Eclia)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "psa-clia-326",
			"name": "Psa (Clia)",
			"price": 35e4,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-15-3-clia-327",
			"name": "Ca 15-3 (Clia)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "nse-eclia-328",
			"name": "Nse (Eclia)",
			"price": 88e4,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-72-4-329",
			"name": "Ca 72-4",
			"price": 85e4,
			"category": "Tumor Marker"
		},
		{
			"id": "pap-prostatic-acid-phospatase-330",
			"name": "PAP (Prostatic Acid Phospatase)",
			"price": 66e4,
			"category": "Tumor Marker"
		},
		{
			"id": "free-psa-clia-331",
			"name": "Free PSA (CLIA)",
			"price": 7e5,
			"category": "Tumor Marker"
		},
		{
			"id": "cifra-21-1-paru-332",
			"name": "CIFRA 21.1(Paru)",
			"price": 8e5,
			"category": "Tumor Marker"
		},
		{
			"id": "scc-cmia-333",
			"name": "Scc (Cmia)",
			"price": 75e4,
			"category": "Tumor Marker"
		},
		{
			"id": "b2-mikroglobulin-serum-334",
			"name": "B2 Mikroglobulin Serum",
			"price": 975e3,
			"category": "Tumor Marker"
		},
		{
			"id": "prostatic-acid-phospatase-pap-335",
			"name": "Prostatic Acid Phospatase (PAP)",
			"price": 66e4,
			"category": "Tumor Marker"
		},
		{
			"id": "he-4-ca125-roma-336",
			"name": "He-4 & Ca125 (Roma)",
			"price": 145e4,
			"category": "Tumor Marker"
		},
		{
			"id": "pivka-ii-cmia-direk-337",
			"name": "Pivka-Ii (Cmia) Direk",
			"price": 7e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "sekret-uretra-338",
			"name": "Sekret Uretra",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sekret-mata-339",
			"name": "Sekret Mata",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-340",
			"name": "BTA Sputum",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-3x-341",
			"name": "BTA Sputum (3x)",
			"price": 24e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-i-ii-iii-342",
			"name": "BTA Sputum(I-II-III)",
			"price": 24e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bakteriologi-343",
			"name": "Bakteriologi",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sediaan-langsung-gram-344",
			"name": "Sediaan Langsung Gram",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "m-hansen-345",
			"name": "M. Hansen",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-kulit-lepra-346",
			"name": "BTA Kulit (Lepra)",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "jamur-347",
			"name": "Jamur",
			"price": 1e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "gram-348",
			"name": "Gram",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "filaria-349",
			"name": "Filaria",
			"price": 1e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "tes-tzanck-kultur-resistensi-350",
			"name": "Tes Tzanck KULTUR RESISTENSI",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-gaal-351",
			"name": "Kultur GAAL",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-darah-352",
			"name": "Kultur DARAH",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-urine-353",
			"name": "Kultur URINE",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-bta-354",
			"name": "Kultur BTA",
			"price": 155e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-sputum-non-bta-355",
			"name": "Kultur SPUTUM NON BTA",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-hapus-tenggorok-356",
			"name": "Kultur HAPUS TENGGOROK",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-pus-357",
			"name": "Kultur PUS",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-sekret-vagina-358",
			"name": "Kultur SEKRET VAGINA",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-359",
			"name": "Kultur",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-jaringan-360",
			"name": "Kultur Jaringan",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "swab-tangan-361",
			"name": "Swab Tangan",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-cairan-tubuh-lain-362",
			"name": "Kultur Cairan Tubuh Lain",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-jamur-363",
			"name": "Kultur Jamur",
			"price": 85e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-ruangan-364",
			"name": "Kultur Ruangan",
			"price": 45e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-peralatan-operasi-365",
			"name": "Kultur Peralatan Operasi",
			"price": 45e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-non-bta-patologi-anatomi-366",
			"name": "Kultur Non BTA PATOLOGI ANATOMI",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "pap-smear-367",
			"name": "Pap Smear",
			"price": 37e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sitologi-cairan-368",
			"name": "Sitologi Cairan",
			"price": 45e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "histopatologi-jaringan-5-cm-369",
			"name": "HISTOPATOLOGI JARINGAN (<5 cm)",
			"price": 47e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "histopatologi-jaringan-5-cm-370",
			"name": "HISTOPATOLOGI JARINGAN (≥5 cm)",
			"price": 8e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "pa-prostat-lain-lain-371",
			"name": "PA Prostat LAIN-LAIN",
			"price": 55e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-schedel-ap-lat-372",
			"name": "RO Schedel AP + LAT",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-sinus-paranasal-3-373",
			"name": "RO Sinus Paranasal (3)",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-waters-374",
			"name": "RO Waters",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-mastoid-375",
			"name": "RO Mastoid",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-nasal-bone-376",
			"name": "RO Nasal Bone",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-panoramik-377",
			"name": "Ro Panoramik",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-mandibula-2x-378",
			"name": "RO Mandibula (2x)",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-temporo-mandibula-joint-tmj-379",
			"name": "RO Temporo Mandibula Joint (TMJ)",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-pa-380",
			"name": "RO Thorax PA",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-pa-lat-381",
			"name": "RO Thorax PA + LAT",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cervical-ap-lat-382",
			"name": "RO Cervical AP + LAT",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cervical-ap-lat-obl-383",
			"name": "RO Cervical AP+LAT+OBL",
			"price": 46e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-384",
			"name": "RO Thoracal AP + LAT",
			"price": 3e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-obl-385",
			"name": "RO Thoracal AP+LAT+OBL",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-386",
			"name": "RO Thoraco Lumbal AP + LAT",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-obl-387",
			"name": "RO Thoraco Lumbal AP+LAT+OBL",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-388",
			"name": "RO Lumbal AP + LAT",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-obl-389",
			"name": "RO Lumbal AP+LAT+OBL",
			"price": 41e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-390",
			"name": "RO Lumbo Sacral AP + LAT",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-obl-391",
			"name": "RO Lumbo Sacral AP+LAT+OBL",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-bno-abdomen-392",
			"name": "RO BNO (Abdomen)",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-abdomen-3-pss-393",
			"name": "RO Abdomen 3 PSS",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-coxae-pelvis-ap-lat-394",
			"name": "RO Coxae (Pelvis AP/LAT)",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-dental-395",
			"name": "RO Dental",
			"price": 12e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-clavicula-396",
			"name": "RO Clavicula",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-scapula-397",
			"name": "RO Scapula",
			"price": 16e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-shoulder-ap-lat-398",
			"name": "RO Shoulder AP + LAT",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-humerus-399",
			"name": "RO Humerus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cubiti-400",
			"name": "RO Cubiti",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-antebrachi-401",
			"name": "RO Antebrachi",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-wrist-402",
			"name": "RO Wrist",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-manus-403",
			"name": "RO Manus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-genu-skyline-404",
			"name": "RO Genu Skyline",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-femur-405",
			"name": "RO Femur",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-genu-ap-lat-406",
			"name": "RO Genu AP + LAT",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cruris-407",
			"name": "RO Cruris",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-ankle-408",
			"name": "RO Ankle",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-pedis-409",
			"name": "RO Pedis",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-calceneus-410",
			"name": "RO Calceneus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-pelvis-coxigis-411",
			"name": "RO Pelvis (Coxigis)",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-top-lordotik-412",
			"name": "RO Thorax Top Lordotik",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-maxilla-413",
			"name": "RO Maxilla",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-baby-gram-ic-414",
			"name": "RO Baby Gram (IC)",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-pelvis-415",
			"name": "Ro Pelvis",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-sacrum-ap-lat-416",
			"name": "Ro Sacrum Ap + Lat",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cephalometric-417",
			"name": "RO Cephalometric",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-basis-cranii-418",
			"name": "RO Basis Cranii",
			"price": 16e4,
			"category": "Rontgen"
		},
		{
			"id": "omd-419",
			"name": "OMD",
			"price": 36e4,
			"category": "Rontgen"
		},
		{
			"id": "appendicogram-usg-420",
			"name": "Appendicogram USG",
			"price": 47e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-atas-421",
			"name": "USG Abdomen Atas",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-bawah-422",
			"name": "USG Abdomen Bawah",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-lengkap-423",
			"name": "USG Abdomen Lengkap",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-kandungan-424",
			"name": "USG Kandungan",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-mamae-425",
			"name": "USG Mamae",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-tiroid-426",
			"name": "USG Tiroid",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-thorax-427",
			"name": "USG Thorax",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "kandungan-428",
			"name": "Kandungan",
			"price": 52e4,
			"category": "USG"
		},
		{
			"id": "echocardiografi-429",
			"name": "Echocardiografi",
			"price": 7e5,
			"category": "USG"
		},
		{
			"id": "usg-axilla-430",
			"name": "USG Axilla",
			"price": 35e4,
			"category": "USG"
		},
		{
			"id": "ekg-431",
			"name": "EKG",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "spirometri-432",
			"name": "Spirometri",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "audiometri-lain-lain-433",
			"name": "Audiometri Lain-Lain",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "ldh-cairan-434",
			"name": "LDH (Cairan)",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "hscrp-rat-elisa-ruo-435",
			"name": "hsCRP-Rat (ELISA) RUO",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "zinc-plasma-436",
			"name": "Zinc (Plasma)",
			"price": 45e4,
			"category": "USG"
		},
		{
			"id": "rotavirus-antigen-437",
			"name": "Rotavirus Antigen",
			"price": 56e4,
			"category": "USG"
		},
		{
			"id": "aldosteron-438",
			"name": "Aldosteron",
			"price": 2e6,
			"category": "USG"
		},
		{
			"id": "vaksin-hepatitis-b-439",
			"name": "Vaksin Hepatitis B",
			"price": 22e4,
			"category": "USG"
		},
		{
			"id": "tes-buta-warna-440",
			"name": "Tes Buta Warna",
			"price": 4e4,
			"category": "USG"
		},
		{
			"id": "lpk-fisik-441",
			"name": "LPK-Fisik",
			"price": 7e4,
			"category": "USG"
		},
		{
			"id": "fisik-covid-442",
			"name": "Fisik Covid",
			"price": 7e4,
			"category": "USG"
		},
		{
			"id": "dokter-spesialis-mata-443",
			"name": "Dokter Spesialis Mata",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "auto-refract-444",
			"name": "Auto Refract",
			"price": 5e4,
			"category": "USG"
		},
		{
			"id": "lpk-khusus-445",
			"name": "LPK Khusus",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "mmpi-446",
			"name": "Mmpi",
			"price": 35e4,
			"category": "USG"
		},
		{
			"id": "treadmill-test-447",
			"name": "Treadmill Test",
			"price": 55e4,
			"category": "USG"
		},
		{
			"id": "barthel-indeks-448",
			"name": "Barthel Indeks",
			"price": 7e4,
			"category": "USG"
		},
		{
			"id": "konsul-spesialis-saraf-449",
			"name": "Konsul Spesialis Saraf",
			"price": 2e5,
			"category": "USG"
		},
		{
			"id": "epilepsy-screening-450",
			"name": "Epilepsy Screening",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "home-service-obat-obatan-451",
			"name": "Home Service Obat-Obatan",
			"price": 5e4,
			"category": "USG"
		},
		{
			"id": "merkuri-452",
			"name": "Merkuri",
			"price": 6e5,
			"category": "USG"
		},
		{
			"id": "tindakan-dokter-453",
			"name": "Tindakan dokter",
			"price": 22e4,
			"category": "USG"
		},
		{
			"id": "swab-tenggorok-454",
			"name": "Swab Tenggorok",
			"price": 38e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "igra-tb-quantiferon-455",
			"name": "IGRA-TB (Quantiferon)",
			"price": 95e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-faeces-456",
			"name": "Kultur FAECES",
			"price": 25e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "swab-dubur-kultur-457",
			"name": "Swab Dubur (KULTUR)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "hla-b27-typing-pcr-458",
			"name": "HLA B27 Typing (PCR)",
			"price": 17e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hbv-dna-kuantitatif-pcr-459",
			"name": "HBV DNA Kuantitatif (PCR)",
			"price": 12e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hiv-1-rna-pcr-460",
			"name": "Hiv-1 Rna (Pcr)",
			"price": 95e4,
			"category": "Biomolekuler"
		},
		{
			"id": "hiv-1-rna-vl-pcr-461",
			"name": "Hiv-1 Rna Vl (Pcr)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hpv-dna-screening-pcr-462",
			"name": "HPV DNA Screening (PCR)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hpv-dna-genotyping-pcr-463",
			"name": "HPV DNA Genotyping (PCR)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "rt-pcr-sars-cov-2-variant-464",
			"name": "RT PCR SARS-CoV-2 + Variant",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hcv-rna-genotyping-465",
			"name": "HCV - RNA Genotyping",
			"price": 43e5,
			"category": "Biomolekuler"
		},
		{
			"id": "ct-ng-pcr-466",
			"name": "Ct/Ng (Pcr)",
			"price": 95e4,
			"category": "Biomolekuler"
		},
		{
			"id": "std-8-pcr-467",
			"name": "Std-8 (Pcr)",
			"price": 14e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-salmonella-typhi-468",
			"name": "PCR Salmonella Typhi",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "mtb-469",
			"name": "MTB",
			"price": 95e4,
			"category": "Biomolekuler"
		},
		{
			"id": "nipt-470",
			"name": "Nipt",
			"price": 5e6,
			"category": "Biomolekuler"
		},
		{
			"id": "cmv-kuantitatif-rt-pcr-471",
			"name": "CMV Kuantitatif (RT- PCR)",
			"price": 21e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-toxoplasma-472",
			"name": "PCR Toxoplasma",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-mtb-ntm-dr-tb-rt-pcr-473",
			"name": "Pcr Mtb/Ntm/Dr-Tb (Rt-Pcr)",
			"price": 95e4,
			"category": "Biomolekuler"
		},
		{
			"id": "tcm-mtb-474",
			"name": "Tcm-Mtb",
			"price": 9e5,
			"category": "Biomolekuler"
		}
	],
	cilegon: [
		{
			"id": "bayi-0",
			"name": "(Bayi)",
			"price": 95e3,
			"category": "Hematologi"
		},
		{
			"id": "haemoglobin-1",
			"name": "Haemoglobin",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "hematokrit-2",
			"name": "Hematokrit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "leukosit-3",
			"name": "Leukosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "trombosit-4",
			"name": "Trombosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "eritrosit-5",
			"name": "Eritrosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "led-6",
			"name": "LED",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "diff-7",
			"name": "Diff",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "retikulosit-8",
			"name": "Retikulosit",
			"price": 7e4,
			"category": "Hematologi"
		},
		{
			"id": "ipf-imature-platelet-fraction-9",
			"name": "IPF/Imature Platelet Fraction",
			"price": 24e4,
			"category": "Hematologi"
		},
		{
			"id": "limposit-plasma-biru-10",
			"name": "Limposit Plasma Biru",
			"price": 7e4,
			"category": "Hematologi"
		},
		{
			"id": "morfologi-11",
			"name": "Morfologi",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "total-eosinofil-12",
			"name": "Total Eosinofil",
			"price": 8e4,
			"category": "Hematologi"
		},
		{
			"id": "mcv-13",
			"name": "MCV",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "mch-14",
			"name": "MCH",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "mchc-15",
			"name": "Mchc",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "haemoglobin-bayi-16",
			"name": "Haemoglobin Bayi",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "malaria-rdt-antigen-17",
			"name": "Malaria (RDT) Antigen",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "masa-pendarahan-18",
			"name": "Masa Pendarahan",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "masa-pembekuan-19",
			"name": "Masa Pembekuan",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "masa-protrombin-pt-20",
			"name": "Masa Protrombin (PT)",
			"price": 22e4,
			"category": "Hematologi"
		},
		{
			"id": "aptt-21",
			"name": "Aptt",
			"price": 22e4,
			"category": "Hematologi"
		},
		{
			"id": "inr-22",
			"name": "INR",
			"price": 22e4,
			"category": "Hematologi"
		},
		{
			"id": "fibrinogen-23",
			"name": "Fibrinogen",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "d-dimer-24",
			"name": "D - Dimer",
			"price": 35e4,
			"category": "Hematologi"
		},
		{
			"id": "sel-le-25",
			"name": "Sel LE",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "elektroforesa-hemoglobin-26",
			"name": "Elektroforesa Hemoglobin",
			"price": 76e4,
			"category": "Hematologi"
		},
		{
			"id": "badan-inklusi-hbh-27",
			"name": "Badan Inklusi HbH",
			"price": 1e5,
			"category": "Hematologi"
		},
		{
			"id": "elektroforesa-hemoglobin-capillary-electrophores-28",
			"name": "Elektroforesa Hemoglobin (Capillary Electrophoresis)",
			"price": 76e4,
			"category": "Hematologi"
		},
		{
			"id": "serum-iron-si-29",
			"name": "Serum Iron (Si)",
			"price": 12e4,
			"category": "Hematologi"
		},
		{
			"id": "tibc-30",
			"name": "Tibc",
			"price": 16e4,
			"category": "Hematologi"
		},
		{
			"id": "ferritin-metode-eclia-31",
			"name": "Ferritin (Metode ECLIA)",
			"price": 3e5,
			"category": "Hematologi"
		},
		{
			"id": "rdw-32",
			"name": "RDW",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "coomb-s-test-33",
			"name": "Coomb's test",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "g6pd-metode-fia-34",
			"name": "G6PD (Metode FIA)",
			"price": 42e4,
			"category": "Hematologi"
		},
		{
			"id": "asam-folat-metode-clia-35",
			"name": "Asam Folat (Metode CLIA)",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "agregasi-trombosit-tat-36",
			"name": "Agregasi Trombosit (TAT)",
			"price": 55e4,
			"category": "Hematologi"
		},
		{
			"id": "vitamin-b12-metode-clia-37",
			"name": "Vitamin B12 (Metode CLIA)",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "viskositas-darah-38",
			"name": "Viskositas Darah",
			"price": 3e5,
			"category": "Hematologi"
		},
		{
			"id": "viskositas-plasma-39",
			"name": "Viskositas Plasma",
			"price": 3e5,
			"category": "Hematologi"
		},
		{
			"id": "antibodi-anti-trombosit-40",
			"name": "Antibodi Anti Trombosit",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "rumple-leed-41",
			"name": "Rumple Leed",
			"price": 3e4,
			"category": "Hematologi"
		},
		{
			"id": "golongan-darah-rhesus-42",
			"name": "Golongan Darah + Rhesus",
			"price": 6e4,
			"category": "Hematologi"
		},
		{
			"id": "leukosit-bayi-43",
			"name": "Leukosit Bayi",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "i-t-ratio-44",
			"name": "I/T Ratio",
			"price": 8e4,
			"category": "Hematologi"
		},
		{
			"id": "ret-he-45",
			"name": "RET-He",
			"price": 12e4,
			"category": "Hematologi"
		},
		{
			"id": "lupus-antikoagulan-46",
			"name": "Lupus Antikoagulan",
			"price": 885e3,
			"category": "Hematologi"
		},
		{
			"id": "sickle-cell-47",
			"name": "Sickle Cell",
			"price": 9e4,
			"category": "Hematologi"
		},
		{
			"id": "apt-test-48",
			"name": "Apt Test",
			"price": 95e3,
			"category": "Hematologi"
		},
		{
			"id": "saturasi-transferin-49",
			"name": "Saturasi Transferin",
			"price": 28e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-lengkap-50",
			"name": "Protein Lengkap",
			"price": 1e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-total-51",
			"name": "Protein total",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "albumin-52",
			"name": "Albumin",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "bilirubin-53",
			"name": "Bilirubin",
			"price": 1e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "bilirubin-bayi-54",
			"name": "Bilirubin Bayi",
			"price": 1e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "sgot-55",
			"name": "Sgot",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "sgpt-56",
			"name": "Sgpt",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "alkali-fosfatase-57",
			"name": "Alkali Fosfatase",
			"price": 7e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "alkali-fosfatase-anak-58",
			"name": "Alkali Fosfatase Anak",
			"price": 7e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "gamma-gt-59",
			"name": "Gamma GT",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "gamma-gt-anak-60",
			"name": "Gamma GT Anak",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "ldh-61",
			"name": "LDH",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "cholinesterase-62",
			"name": "Cholinesterase",
			"price": 14e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "elektroforesa-serum-protein-capillary-electropho-63",
			"name": "Elektroforesa Serum Protein (Capillary Electrophoresis)",
			"price": 46e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-total-bayi-64",
			"name": "Protein Total bayi",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "albumin-bayi-65",
			"name": "Albumin Bayi",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-lengkap-bayi-66",
			"name": "Protein Lengkap Bayi",
			"price": 1e5,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-sewaktu-67",
			"name": "Glukosa Sewaktu",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-sewaktu-poct-68",
			"name": "Glukosa Sewaktu (POCT)",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-puasa-69",
			"name": "Glukosa Puasa",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-puasa-poct-70",
			"name": "Glukosa Puasa (POCT)",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-2-jam-pp-71",
			"name": "Glukosa 2 jam PP",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-2-jam-pp-poct-72",
			"name": "Glukosa 2 jam PP (POCT)",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "kurva-harian-glukosa-73",
			"name": "Kurva Harian Glukosa",
			"price": 18e4,
			"category": "Diabetes"
		},
		{
			"id": "tes-toleransi-glukosa-gtt-74",
			"name": "Tes Toleransi Glukosa (GTT)",
			"price": 2e5,
			"category": "Diabetes"
		},
		{
			"id": "hb-a1c-75",
			"name": "Hb A1C",
			"price": 16e4,
			"category": "Diabetes"
		},
		{
			"id": "c-peptide-metode-eclia-76",
			"name": "C - Peptide (Metode ECLIA)",
			"price": 6e5,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-4-jam-pp-77",
			"name": "Glukosa 4 jam pp",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glycated-albumin-metode-enzymatic-78",
			"name": "Glycated Albumin (Metode Enzymatic)",
			"price": 27e4,
			"category": "Diabetes"
		},
		{
			"id": "glycated-albumin-ga-79",
			"name": "Glycated Albumin (GA)",
			"price": 3e5,
			"category": "Diabetes"
		},
		{
			"id": "c-peptide-metode-clia-80",
			"name": "C-Peptide (Metode CLIA)",
			"price": 5e5,
			"category": "Diabetes"
		},
		{
			"id": "insulin-81",
			"name": "Insulin",
			"price": 4e5,
			"category": "Diabetes"
		},
		{
			"id": "resistensi-insulin-82",
			"name": "Resistensi Insulin",
			"price": 45e4,
			"category": "Diabetes"
		},
		{
			"id": "insulin-puasa-metode-clia-83",
			"name": "Insulin Puasa (Metode CLIA)",
			"price": 4e5,
			"category": "Diabetes"
		},
		{
			"id": "insulin-2-jam-pp-metode-eclia-84",
			"name": "Insulin 2 Jam PP (Metode ECLIA)",
			"price": 4e5,
			"category": "Jantung"
		},
		{
			"id": "ck-mb-mass-85",
			"name": "CK-MB (mass)",
			"price": 25e4,
			"category": "Jantung"
		},
		{
			"id": "sgot-jantung-86",
			"name": "SGOT (Jantung)",
			"price": 5e4,
			"category": "Jantung"
		},
		{
			"id": "troponin-t-87",
			"name": "Troponin T",
			"price": 4e5,
			"category": "Jantung"
		},
		{
			"id": "hscrp-metode-nefelometri-88",
			"name": "hsCRP (Metode Nefelometri)",
			"price": 25e4,
			"category": "Jantung"
		},
		{
			"id": "ck-89",
			"name": "CK",
			"price": 1e5,
			"category": "Jantung"
		},
		{
			"id": "nt-probnp-90",
			"name": "NT-ProBNP",
			"price": 7e5,
			"category": "Jantung"
		},
		{
			"id": "homocystein-metode-cmia-91",
			"name": "Homocystein (Metode CMIA)",
			"price": 111e4,
			"category": "Jantung"
		},
		{
			"id": "troponin-i-metode-clia-92",
			"name": "TROPONIN I (Metode CLIA)",
			"price": 35e4,
			"category": "Jantung"
		},
		{
			"id": "hscrp-lpeita-93",
			"name": "hsCRP (LPEITA)",
			"price": 2e5,
			"category": "Jantung"
		},
		{
			"id": "hs-troponin-i-metode-clia-94",
			"name": "hs-Troponin I (Metode Clia)",
			"price": 35e4,
			"category": "Jantung"
		},
		{
			"id": "hs-troponin-t-95",
			"name": "Hs-Troponin T",
			"price": 35e4,
			"category": "Lemak Darah"
		},
		{
			"id": "lemak-lengkap-96",
			"name": "Lemak Lengkap",
			"price": 2e5,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-total-97",
			"name": "Cholesterol Total",
			"price": 5e4,
			"category": "Lemak Darah"
		},
		{
			"id": "trigliserida-98",
			"name": "Trigliserida",
			"price": 5e4,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-hdl-direk-99",
			"name": "Cholesterol HDL Direk",
			"price": 55e3,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-ldl-direk-100",
			"name": "Cholesterol LDL Direk",
			"price": 6e4,
			"category": "Lemak Darah"
		},
		{
			"id": "lemak-lengkap-2-101",
			"name": "Lemak Lengkap (2)",
			"price": 2e5,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "ureum-darah-102",
			"name": "Ureum Darah",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "kreatinin-darah-103",
			"name": "Kreatinin Darah",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "creatinin-clearence-104",
			"name": "Creatinin Clearence",
			"price": 21e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "ureum-clearence-105",
			"name": "Ureum Clearence",
			"price": 21e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "cystatin-c-metode-nefelometri-106",
			"name": "Cystatin C (Metode Nefelometri)",
			"price": 4e5,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "protein-kreatinin-ratio-107",
			"name": "Protein Kreatinin Ratio",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-108",
			"name": "Natrium",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-109",
			"name": "Kalium",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-110",
			"name": "Chlorida",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalsium-111",
			"name": "Kalsium",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "phospor-112",
			"name": "Phospor",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "magnesium-113",
			"name": "Magnesium",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-urine-24-jam-114",
			"name": "Kalium Urine (24 Jam )",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-urine-24-jam-115",
			"name": "Natrium Urine (24 Jam)",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-urine-24-jam-116",
			"name": "Chlorida Urine (24 jam)",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-urine-117",
			"name": "Calsium Urine",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "fosfor-urine-118",
			"name": "Fosfor Urine",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "magnesium-urine-119",
			"name": "Magnesium Urine",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "calcium-ion-120",
			"name": "Calcium Ion",
			"price": 2e5,
			"category": "Elektrolit"
		},
		{
			"id": "jenis-121",
			"name": "jenis)",
			"price": 18e4,
			"category": "Elektrolit"
		},
		{
			"id": "asam-laktat-darah-122",
			"name": "Asam Laktat (Darah)",
			"price": 5e5,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-urine-sewaktu-123",
			"name": "Natrium Urine (sewaktu)",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-urine-sewaktu-124",
			"name": "Kalium Urine (Sewaktu)",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-urine-sewaktu-125",
			"name": "Chlorida Urine (Sewaktu)",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "keton-darah-hydroxybutyrate-pancreas-126",
			"name": "Keton Darah (β - hydroxybutyrate ) PANCREAS",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "amilase-darah-127",
			"name": "Amilase Darah",
			"price": 22e4,
			"category": "Elektrolit"
		},
		{
			"id": "lipase-darah-128",
			"name": "Lipase Darah",
			"price": 22e4,
			"category": "Elektrolit"
		},
		{
			"id": "amilase-cairan-peritonium-129",
			"name": "Amilase Cairan Peritonium",
			"price": 22e4,
			"category": "Elektrolit"
		},
		{
			"id": "lipase-cairan-peritonium-130",
			"name": "Lipase Cairan Peritonium",
			"price": 22e4,
			"category": "Urinalisa"
		},
		{
			"id": "urine-kolektor-dewasa-131",
			"name": "Urine Kolektor Dewasa",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "glukosa-urin-132",
			"name": "Glukosa Urin",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-urine-133",
			"name": "Protein Urine",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "bilirubin-urine-134",
			"name": "Bilirubin Urine",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-kuantitatif-135",
			"name": "Protein Kuantitatif",
			"price": 21e4,
			"category": "Urinalisa"
		},
		{
			"id": "ureum-urine-136",
			"name": "Ureum Urine",
			"price": 16e4,
			"category": "Urinalisa"
		},
		{
			"id": "kreatinin-urine-137",
			"name": "Kreatinin Urine",
			"price": 16e4,
			"category": "Urinalisa"
		},
		{
			"id": "mikroalbumin-urine-24-jam-nefelometri-138",
			"name": "Mikroalbumin Urine 24 jam (Nefelometri)",
			"price": 25e4,
			"category": "Urinalisa"
		},
		{
			"id": "asam-urat-urine-test-narkoba-139",
			"name": "Asam Urat Urine TEST NARKOBA",
			"price": 12e4,
			"category": "Urinalisa"
		},
		{
			"id": "amphetamin-ecstacy-140",
			"name": "Amphetamin (Ecstacy)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "mariyuana-canabis-ganja-141",
			"name": "Mariyuana (Canabis, Ganja)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "ophium-morfin-heroin-putaw-142",
			"name": "Ophium (Morfin, Heroin, Putaw)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "benzodiazepim-143",
			"name": "Benzodiazepim",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "alkohol-urine-144",
			"name": "Alkohol (URINE)",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "barbiturat-145",
			"name": "Barbiturat",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "coccain-146",
			"name": "Coccain",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "metamphetamin-sabu-sabu-147",
			"name": "Metamphetamin (Sabu- sabu)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "phencyclidine-148",
			"name": "Phencyclidine",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "alkohol-darah-149",
			"name": "Alkohol (Darah)",
			"price": 7e5,
			"category": "Urinalisa"
		},
		{
			"id": "synthetic-marijuana-150",
			"name": "Synthetic Marijuana",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "methadone-151",
			"name": "Methadone",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "narkoba-3-parameter-152",
			"name": "Narkoba 3 Parameter",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "narkoba-6-parameter-153",
			"name": "Narkoba 6 Parameter",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "carisoprodol-154",
			"name": "Carisoprodol",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "tramadol-155",
			"name": "Tramadol",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "propoxyphene-156",
			"name": "Propoxyphene",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "mdma-157",
			"name": "Mdma",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "tca-158",
			"name": "TCA",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "codeine-159",
			"name": "Codeine",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kehamilan-kuantitatif-160",
			"name": "Tes Kehamilan (Kuantitatif)",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kehamilan-rapid-50-miu-ml-161",
			"name": "Tes Kehamilan Rapid (50 mIU/mL)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "beta-hcg-kuantitatif-urine-162",
			"name": "Beta HCG Kuantitatif Urine",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "benzene-163",
			"name": "Benzene",
			"price": 65e4,
			"category": "Urinalisa"
		},
		{
			"id": "osmolaritas-urine-164",
			"name": "Osmolaritas Urine",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "phenol-165",
			"name": "Phenol",
			"price": 65e4,
			"category": "Urinalisa"
		},
		{
			"id": "xylen-166",
			"name": "Xylen",
			"price": 65e4,
			"category": "Urinalisa"
		},
		{
			"id": "styrene-167",
			"name": "Styrene",
			"price": 65e4,
			"category": "Urinalisa"
		},
		{
			"id": "toluene-168",
			"name": "Toluene",
			"price": 65e4,
			"category": "Urinalisa"
		},
		{
			"id": "cobalt-169",
			"name": "Cobalt",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "acr-albumin-to-creatinine-ratio-170",
			"name": "ACR (Albumin-to- Creatinine Ratio)",
			"price": 25e4,
			"category": "Urinalisa"
		},
		{
			"id": "zinc-zn-171",
			"name": "ZINC (Zn)",
			"price": 45e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-bence-jones-faeces-172",
			"name": "Protein Bence Jones FAECES",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "faeces-lengkap-173",
			"name": "Faeces Lengkap",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "darah-samar-faeces-fobt-174",
			"name": "Darah Samar Faeces (FOBT)",
			"price": 12e4,
			"category": "Urinalisa"
		},
		{
			"id": "ph-tinja-175",
			"name": "pH Tinja",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "laktosa-intolerans-176",
			"name": "Laktosa Intolerans",
			"price": 7e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-faeces-gastro-177",
			"name": "Analisa Faeces Gastro",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "faeces-lengkap-analisa-faeces-gastro-cairan-tubu-178",
			"name": "Faeces Lengkap & Analisa Faeces Gastro Cairan Tubuh",
			"price": 17e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sperma-179",
			"name": "Analisa Sperma",
			"price": 17e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-pleura-180",
			"name": "Analisa Cairan Pleura",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sekret-vagina-181",
			"name": "Analisa Sekret Vagina",
			"price": 17e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-batu-ginjal-182",
			"name": "Analisa Batu Ginjal",
			"price": 45e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-otak-lcs-183",
			"name": "Analisa Cairan Otak (Lcs)",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-sendi-184",
			"name": "Analisa Cairan Sendi",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-acites-immunoserologi-185",
			"name": "Analisa Cairan Acites Immunoserologi",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "fecal-calprotectin-test-186",
			"name": "Fecal Calprotectin Test",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "widal-187",
			"name": "Widal",
			"price": 9e4,
			"category": "Imunoserologi"
		},
		{
			"id": "salmonela-typhi-igg-igm-188",
			"name": "Salmonela Typhi IgG/IgM",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "vdrl-189",
			"name": "Vdrl",
			"price": 8e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tpha-190",
			"name": "Tpha",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-metode-eclia-191",
			"name": "HBs Ag (Metode Eclia)",
			"price": 17e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-metode-elfa-192",
			"name": "HBs Ag (Metode ELFA)",
			"price": 17e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-metode-rapid-193",
			"name": "HBs Ag (Metode Rapid)",
			"price": 7e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbsag-kuantitatif-metode-clia-194",
			"name": "HBsAg Kuantitatif (Metode CLIA)",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbs-metode-eclia-195",
			"name": "Anti HBs (Metode ECLIA)",
			"price": 16e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbc-metode-clia-196",
			"name": "Anti HBc (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbc-igm-metode-cmia-197",
			"name": "Anti HBc IgM (Metode CMIA)",
			"price": 95e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbeag-metode-clia-198",
			"name": "HBeAg (Metode CLIA)",
			"price": 45e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbe-metode-elfa-199",
			"name": "Anti HBe (Metode ELFA)",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-metode-rapid-200",
			"name": "Anti HAV (Metode Rapid)",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hbe-ag-metode-elfa-201",
			"name": "HBe Ag (Metode ELFA)",
			"price": 45e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-metode-rapid-202",
			"name": "Anti HCV (Metode Rapid)",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "cd-4-203",
			"name": "Cd 4",
			"price": 38e4,
			"category": "Imunoserologi"
		},
		{
			"id": "cd-8-204",
			"name": "Cd 8",
			"price": 5e5,
			"category": "Imunoserologi"
		},
		{
			"id": "asto-nefelometri-205",
			"name": "ASTO (Nefelometri)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "crp-latex-206",
			"name": "CRP (Latex)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "c3-komplemen-207",
			"name": "C3 Komplemen",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "c4-komplemen-208",
			"name": "C4 Komplemen",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-g-209",
			"name": "Ig G",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-m-210",
			"name": "Ig M",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-a-211",
			"name": "Ig A",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-e-total-metode-eclia-212",
			"name": "Ig E Total (Metode ECLIA)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-metode-clia-213",
			"name": "Anti HCV (Metode CLIA )",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "crp-nefelometri-214",
			"name": "CRP (Nefelometri)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "rheumatoid-factor-nefelometri-215",
			"name": "Rheumatoid factor (Nefelometri)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "asto-kuantitatif-216",
			"name": "ASTO Kuantitatif",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "dengue-igg-igm-217",
			"name": "DENGUE IgG/ IgM",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "crp-metode-lpeita-218",
			"name": "CRP (Metode LPEITA)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-pylori-igg-219",
			"name": "Helicobacter Pylori IgG",
			"price": 11e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-pylori-igm-220",
			"name": "Helicobacter Pylori IgM",
			"price": 11e5,
			"category": "Imunoserologi"
		},
		{
			"id": "aca-igg-metode-elisa-221",
			"name": "ACA IgG (Metode ELISA)",
			"price": 85e4,
			"category": "Imunoserologi"
		},
		{
			"id": "aca-igm-metode-elisa-222",
			"name": "ACA IgM (Metode ELISA)",
			"price": 85e4,
			"category": "Imunoserologi"
		},
		{
			"id": "ana-test-metode-if-223",
			"name": "ANA Test (Metode IF)",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-dsdna-metode-clia-224",
			"name": "Anti-dsDNA (Metode CLIA)",
			"price": 55e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tubex-tf-225",
			"name": "Tubex TF",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "dengue-duo-seri-226",
			"name": "Dengue Duo/ Seri",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "dengue-antigen-ns-1-227",
			"name": "Dengue Antigen NS 1",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-ccp-228",
			"name": "Anti CCP",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbs-metode-elfa-229",
			"name": "Anti HBs (Metode ELFA)",
			"price": 16e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-ccp-metode-fia-230",
			"name": "Anti CCP (Metode FIA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hiv-metode-rapid-231",
			"name": "Anti HIV (Metode Rapid)",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "leptospira-igg-igm-232",
			"name": "Leptospira IgG/IgM",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ige-spesifik-aspergillus-233",
			"name": "IgE Spesifik Aspergillus",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-antigen-antibodi-metode-eclia-234",
			"name": "HIV Antigen, Antibodi (Metode ECLIA)",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-tb-igg-235",
			"name": "Anti TB IgG",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-ig-m-metode-eclia-236",
			"name": "Anti HAV Ig M (Metode ECLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "ana-if-237",
			"name": "Ana If",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ana-profil-238",
			"name": "Ana Profil",
			"price": 13e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-igm-metode-rapid-239",
			"name": "Anti HAV IgM (Metode Rapid)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-igm-metode-eclia-240",
			"name": "ANTI HAV IgM (Metode ECLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-beta2-glikoprotein-1-241",
			"name": "Anti-Beta2-Glikoprotein 1",
			"price": 17e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-b2-glikoprotein-1-igm-242",
			"name": "Anti-B2-Glikoprotein 1 IgM",
			"price": 154e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-b2-glikoprotein-1-igg-243",
			"name": "Anti-B2-Glikoprotein 1 IgG",
			"price": 154e4,
			"category": "Imunoserologi"
		},
		{
			"id": "rapid-antigen-sars-cov-2-244",
			"name": "Rapid Antigen SARS-CoV-2",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "chikungunya-igg-igm-245",
			"name": "Chikungunya IgG/IgM",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-igm-metode-clia-246",
			"name": "Anti HAV IgM (Metode CLIA)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "sypilis-rapid-247",
			"name": "Sypilis ( Rapid )",
			"price": 1e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-total-metode-rapid-248",
			"name": "Helicobacter Total (Metode Rapid)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-faeces-249",
			"name": "Helicobacter Faeces",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-viral-load-250",
			"name": "HIV Viral Load",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbe-metode-clia-251",
			"name": "Anti HBe ( Metode CLIA)",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "procalcitonin-252",
			"name": "Procalcitonin",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "il-6-253",
			"name": "Il - 6",
			"price": 65e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anca-if-immunofluorescense-assay-254",
			"name": "ANCA IF (Immunofluorescense assay)",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tb-lam-ag-urine-255",
			"name": "TB LAM Ag (Urine)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-total-clia-256",
			"name": "Anti HAV Total (CLIA)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hbe-ag-metode-cmia-257",
			"name": "HBe Ag (Metode CMIA)",
			"price": 45e4,
			"category": "Imunoserologi"
		},
		{
			"id": "syphilis-rapid-258",
			"name": "Syphilis (Rapid)",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-tpo-metode-clia-torch-chlamydia-259",
			"name": "Anti-TPO (Metode CLIA) TORCH & CHLAMYDIA",
			"price": 6e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igg-metode-elfa-260",
			"name": "Anti Toxoplasma IgG (Metode ELFA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igg-metode-clia-261",
			"name": "Anti Toxoplasma IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igm-metode-eclia-262",
			"name": "Anti Toxoplasma IgM (Metode ECLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igm-metode-elfa-263",
			"name": "Anti Toxoplasma IgM (Metode ELFA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igm-metode-clia-264",
			"name": "Anti Toxoplasma IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-rubella-igg-metode-clia-265",
			"name": "Anti Rubella IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-rubella-igm-metode-eclia-266",
			"name": "Anti Rubella IgM (Metode ECLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-rubella-igm-metode-clia-267",
			"name": "Anti Rubella IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igg-metode-elfa-268",
			"name": "Anti CMV IgG (Metode ELFA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igg-metode-clia-269",
			"name": "Anti CMV IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igm-metode-clia-270",
			"name": "Anti CMV IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igm-metode-eclia-271",
			"name": "Anti CMV IgM (Metode ECLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igg-metode-clia-272",
			"name": "Anti HSV I IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igm-metode-elisa-273",
			"name": "Anti HSV I IgM (Metode ELISA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igg-metode-elisa-274",
			"name": "Anti HSV II IgG (Metode ELISA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igm-metode-elisa-275",
			"name": "Anti HSV II IgM (Metode ELISA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "toxoplasma-igg-aviditas-metode-elfa-276",
			"name": "Toxoplasma IgG Aviditas (Metode ELFA)",
			"price": 8e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-chlamydia-trachomatis-igg-elisa-277",
			"name": "Anti Chlamydia trachomatis IgG (ELISA)",
			"price": 125e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-chlamydia-trachomatis-igm-elisa-278",
			"name": "Anti Chlamydia trachomatis IgM (ELISA)",
			"price": 125e4,
			"category": "Imunoserologi"
		},
		{
			"id": "cmv-igg-aviditas-metode-elfa-279",
			"name": "CMV IgG Aviditas (Metode ELFA)",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igm-metode-clia-280",
			"name": "Anti HSV I IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igg-metode-clia-281",
			"name": "Anti HSV II IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igm-metode-clia-282",
			"name": "Anti HSV II IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "cmv-igg-aviditas-metode-clia-283",
			"name": "CMV IgG Aviditas (Metode CLIA)",
			"price": 75e4,
			"category": "Hormon"
		},
		{
			"id": "cortisol-metode-clia-284",
			"name": "Cortisol (Metode CLIA)",
			"price": 4e5,
			"category": "Hormon"
		},
		{
			"id": "t3-elfa-285",
			"name": "T3 (Elfa)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t3-metode-clia-286",
			"name": "T3 (Metode CLIA)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t4-eclia-287",
			"name": "T4 (Eclia)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t4-clia-288",
			"name": "T4 (Clia)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t3-uptake-289",
			"name": "T3 Uptake",
			"price": 74e4,
			"category": "Hormon"
		},
		{
			"id": "fti-290",
			"name": "FTI",
			"price": 1285e3,
			"category": "Hormon"
		},
		{
			"id": "paratiroid-hormon-291",
			"name": "Paratiroid Hormon",
			"price": 85e4,
			"category": "Hormon"
		},
		{
			"id": "tshs-metode-clia-292",
			"name": "TSHs (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "free-t3-metode-clia-293",
			"name": "Free T3 (Metode CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "tiroglobulin-metode-clia-294",
			"name": "Tiroglobulin (Metode CLIA)",
			"price": 6e5,
			"category": "Hormon"
		},
		{
			"id": "tiroglobulin-antibodi-anti-tg-metode-clia-295",
			"name": "Tiroglobulin Antibodi/Anti- Tg (Metode CLIA)",
			"price": 6e5,
			"category": "Hormon"
		},
		{
			"id": "anti-tpo-metode-clia-296",
			"name": "Anti TPO (Metode CLIA)",
			"price": 7e5,
			"category": "Hormon"
		},
		{
			"id": "tshs-neonatus-anak-metode-clia-297",
			"name": "TSHs Neonatus/Anak (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "t3-neonatus-anak-298",
			"name": "T3 Neonatus/Anak",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t4-neonatus-anak-299",
			"name": "T4 Neonatus/Anak",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "trab-metode-clia-300",
			"name": "TRAb (Metode CLIA)",
			"price": 7e5,
			"category": "Hormon"
		},
		{
			"id": "free-t4-metode-clia-301",
			"name": "Free T4 (Metode CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "tshs-neonatus-anak-metode-clia-302",
			"name": "TSHs Neonatus /Anak (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "parathyroid-hormone-pth-303",
			"name": "Parathyroid Hormone (PTH)",
			"price": 125e4,
			"category": "Hormon"
		},
		{
			"id": "fsh-metode-clia-304",
			"name": "FSH (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "lh-metode-clia-305",
			"name": "LH (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "estradiol-metode-clia-306",
			"name": "Estradiol (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "progesteron-metode-clia-307",
			"name": "Progesteron (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "prolaktin-metode-clia-308",
			"name": "Prolaktin (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "testosteron-metode-clia-309",
			"name": "Testosteron (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "beta-hcg-kuantitatif-metode-eclia-310",
			"name": "Beta HCG Kuantitatif (Metode ECLIA)",
			"price": 4e5,
			"category": "Hormon"
		},
		{
			"id": "free-testosteron-311",
			"name": "Free Testosteron",
			"price": 9e5,
			"category": "Hormon"
		},
		{
			"id": "anti-mullerian-hormone-metode-clia-312",
			"name": "Anti Mullerian Hormone (Metode CLIA)",
			"price": 8e5,
			"category": "Hormon"
		},
		{
			"id": "dihydrotestoteron-metode-lc-ms-ms-313",
			"name": "Dihydrotestoteron (Metode LC-MS/MS)",
			"price": 154e4,
			"category": "Tumor Marker"
		},
		{
			"id": "afp-metode-clia-314",
			"name": "AFP (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "cea-metode-clia-315",
			"name": "CEA (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-19-9-metode-clia-316",
			"name": "CA 19-9 (Metode CLIA)",
			"price": 8e5,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-125-metode-eclia-317",
			"name": "CA 125 (Metode ECLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "psa-metode-clia-318",
			"name": "PSA (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-15-3-metode-clia-319",
			"name": "CA 15-3 (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "nse-tumor-metode-eclia-320",
			"name": "NSE Tumor (Metode ECLIA)",
			"price": 88e4,
			"category": "Tumor Marker"
		},
		{
			"id": "scc-metode-cmia-321",
			"name": "SCC (Metode CMIA)",
			"price": 8e5,
			"category": "Tumor Marker"
		},
		{
			"id": "cyfra-21-1-eclia-322",
			"name": "Cyfra 21-1 (ECLIA)",
			"price": 75e4,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-72-4-metode-clia-323",
			"name": "CA 72-4 (Metode CLIA)",
			"price": 75e4,
			"category": "Tumor Marker"
		},
		{
			"id": "he4-324",
			"name": "HE4",
			"price": 145e4,
			"category": "Tumor Marker"
		},
		{
			"id": "calprotectin-325",
			"name": "Calprotectin",
			"price": 75e4,
			"category": "Tumor Marker"
		},
		{
			"id": "ratio-free-psa-psa-total-326",
			"name": "Ratio Free PSA : PSA Total",
			"price": 8e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-faeces-327",
			"name": "Kultur Faeces",
			"price": 2e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "rectal-swab-328",
			"name": "Rectal Swab",
			"price": 2e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-anaerob-329",
			"name": "Kultur Anaerob",
			"price": 14e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "igra-tb-quantiferon-direk-330",
			"name": "IGRA - TB (Quantiferon) DIREK",
			"price": 9e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "malaria-331",
			"name": "Malaria",
			"price": 1e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "bakteriologi-332",
			"name": "Bakteriologi",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sekret-urethra-333",
			"name": "Sekret Urethra",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sekret-mata-334",
			"name": "Sekret Mata",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-335",
			"name": "BTA Sputum",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-sps-336",
			"name": "BTA Sputum SPS",
			"price": 21e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-3x-337",
			"name": "BTA Sputum (3X)",
			"price": 21e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "m-hansen-338",
			"name": "M. Hansen",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-kulit-lepra-339",
			"name": "BTA Kulit (Lepra)",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "jamur-koh-340",
			"name": "Jamur (KOH)",
			"price": 1e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "swab-tenggorok-neisser-341",
			"name": "Swab tenggorok (Neisser)",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "filaria-342",
			"name": "Filaria",
			"price": 1e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "sediaan-langsung-gram-343",
			"name": "Sediaan Langsung Gram",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "gram-344",
			"name": "Gram",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-ps-345",
			"name": "Bta Ps",
			"price": 14e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "indeks-bta-lepra-morfologi-346",
			"name": "Indeks BTA Lepra/Morfologi",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-2x-347",
			"name": "BTA Sputum (2X)",
			"price": 14e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-pus-348",
			"name": "Bta Pus",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "gram-kultur-resistensi-349",
			"name": "Gram Kultur Resistensi",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-gall-350",
			"name": "Kultur GALL",
			"price": 45e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-darah-351",
			"name": "Kultur DARAH",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-urine-352",
			"name": "Kultur URINE",
			"price": 47e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-faeces-aerofood-lama-353",
			"name": "Kultur FAECES (Aerofood lama)",
			"price": 2e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "swab-dubur-354",
			"name": "Swab Dubur",
			"price": 2e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-sputum-bta-355",
			"name": "Kultur SPUTUM BTA",
			"price": 16e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-sputum-non-bta-356",
			"name": "Kultur SPUTUM NON BTA",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-hapus-tenggorok-357",
			"name": "Kultur HAPUS TENGGOROK",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-pus-358",
			"name": "Kultur PUS",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-sekret-vagina-359",
			"name": "Kultur SEKRET VAGINA",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-cairan-tubuh-lain-360",
			"name": "Kultur CAIRAN TUBUH LAIN",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-jamur-361",
			"name": "Kultur JAMUR",
			"price": 85e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-sekret-uretra-362",
			"name": "Kultur Sekret Uretra",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-faeses-dan-resistensi-363",
			"name": "Kultur Faeses dan Resistensi",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "swab-dubur-cacing-patologi-anatomi-364",
			"name": "Swab Dubur Cacing PATOLOGI ANATOMI",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "pap-smear-365",
			"name": "Pap Smear",
			"price": 37e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sitologi-cairan-366",
			"name": "Sitologi Cairan",
			"price": 45e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "histopatologi-jaringan-5-cm-367",
			"name": "HISTOPATOLOGI JARINGAN (<5 cm)",
			"price": 47e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "histopatologi-jaringan-5-14-cm-368",
			"name": "HISTOPATOLOGI JARINGAN (5-14 cm)",
			"price": 45e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "histopatologi-jaringan-15-cm-369",
			"name": "HISTOPATOLOGI JARINGAN (≥ 15 cm)",
			"price": 12e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "hpv-dna-genotyping-lain-lain-370",
			"name": "HPV DNA Genotyping LAIN-LAIN",
			"price": 9e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-schedel-2x-371",
			"name": "RO Schedel (2x)",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-sinus-paranasal-3-372",
			"name": "RO Sinus Paranasal (3)",
			"price": 34e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-waters-373",
			"name": "RO Waters",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-mastoid-374",
			"name": "RO Mastoid",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-nasal-bone-375",
			"name": "RO Nasal Bone",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-tmj-376",
			"name": "Ro Tmj",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-mandibula-2x-377",
			"name": "RO Mandibula (2x)",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-pa-2-378",
			"name": "RO Thorax PA (2)",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-pa-1-379",
			"name": "RO Thorax PA (1)",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-pa-lat-380",
			"name": "RO Thorax PA + LAT",
			"price": 29e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cervical-ap-lat-381",
			"name": "RO Cervical AP + LAT",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cervical-ap-lat-obl-382",
			"name": "RO Cervical AP+LAT+OBL",
			"price": 47e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-383",
			"name": "RO Thoracal AP + LAT",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-obl-384",
			"name": "RO Thoracal AP + LAT + OBL",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-385",
			"name": "RO Thoraco Lumbal AP + LAT",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-obl-386",
			"name": "RO Thoraco Lumbal AP + LAT + OBL",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-387",
			"name": "RO Lumbal AP + LAT",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-obl-388",
			"name": "RO Lumbal AP + LAT + OBL",
			"price": 51e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-389",
			"name": "RO Lumbo Sacral AP + LAT",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-obl-390",
			"name": "RO Lumbo Sacral AP + LAT + OBL",
			"price": 51e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-bno-abdomen-391",
			"name": "RO BNO (Abdomen)",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-abdomen-3-pss-392",
			"name": "RO Abdomen 3 PSS",
			"price": 46e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-pelvis-coxae-393",
			"name": "RO Pelvis (Coxae)",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-dental-394",
			"name": "RO Dental",
			"price": 15e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-clavicula-395",
			"name": "RO Clavicula",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-scapula-396",
			"name": "RO Scapula",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-shoulder-397",
			"name": "RO Shoulder",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-humerus-398",
			"name": "RO Humerus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cubiti-399",
			"name": "RO Cubiti",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-antebrachi-400",
			"name": "RO Antebrachi",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-wrist-401",
			"name": "RO Wrist",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-manus-402",
			"name": "RO Manus",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-digiti-403",
			"name": "RO Digiti",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-femur-404",
			"name": "RO Femur",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-genu-405",
			"name": "RO Genu",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-genu-sinistra-406",
			"name": "RO Genu Sinistra",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-basis-cranii-407",
			"name": "RO Basis Cranii",
			"price": 16e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-pedis-408",
			"name": "RO Pedis",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-calceneus-409",
			"name": "RO Calceneus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cruris-410",
			"name": "RO Cruris",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-ankle-joint-411",
			"name": "RO Ankle Joint",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-top-lordotik-412",
			"name": "Ro Thorax Top Lordotik",
			"price": 16e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cocygeus-ap-lat-413",
			"name": "Ro Cocygeus AP+LAT",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-patella-414",
			"name": "Ro Patella",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-sacrum-ap-lat-415",
			"name": "Ro Sacrum AP + LAT",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-bone-age-416",
			"name": "Ro Bone Age",
			"price": 3e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-pa-ilo-417",
			"name": "Ro Thorax Pa Ilo",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-panoramik-418",
			"name": "Ro Panoramik",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-bone-survey-419",
			"name": "Ro Bone Survey",
			"price": 72e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-hip-joint-420",
			"name": "Ro Hip Joint",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-shoulder-ap-lat-421",
			"name": "Ro Shoulder Ap + Lat",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-scapula-ap-lat-422",
			"name": "RO Scapula AP+LAT",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "md-423",
			"name": "MD",
			"price": 41e4,
			"category": "Rontgen"
		},
		{
			"id": "omd-424",
			"name": "OMD",
			"price": 41e4,
			"category": "Rontgen"
		},
		{
			"id": "appendicogram-usg-425",
			"name": "Appendicogram USG",
			"price": 37e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-atas-426",
			"name": "USG Abdomen Atas",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-bawah-427",
			"name": "USG Abdomen Bawah",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-lengkap-428",
			"name": "USG Abdomen Lengkap",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-kandungan-429",
			"name": "USG Kandungan",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-lengkap-kandungan-430",
			"name": "USG Abdomen Lengkap & Kandungan",
			"price": 55e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-payudara-431",
			"name": "USG Payudara",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-prostat-432",
			"name": "USG Prostat",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-kepala-anak-433",
			"name": "USG Kepala Anak",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-soft-tissue-434",
			"name": "USG Soft Tissue",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-tiroid-435",
			"name": "USG Tiroid",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-genu-436",
			"name": "USG Genu",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "echocardiografy-437",
			"name": "Echocardiografy",
			"price": 7e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-dopler-testis-438",
			"name": "USG Dopler Testis",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-testis-439",
			"name": "USG Testis",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-thorax-440",
			"name": "USG Thorax",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "ekg-441",
			"name": "EKG",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "spirometri-442",
			"name": "Spirometri",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "audiometri-lain-lain-443",
			"name": "Audiometri Lain-Lain",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "analisa-batu-empedu-444",
			"name": "Analisa Batu Empedu",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "alkali-fosfatase-cairan-peritonium-445",
			"name": "Alkali Fosfatase Cairan Peritonium",
			"price": 7e4,
			"category": "USG"
		},
		{
			"id": "ldh-serum-446",
			"name": "LDH (Serum)",
			"price": 12e4,
			"category": "USG"
		},
		{
			"id": "asam-urat-darah-447",
			"name": "Asam Urat Darah",
			"price": 5e4,
			"category": "USG"
		},
		{
			"id": "timbal-pb-448",
			"name": "Timbal (Pb)",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "arsen-as-449",
			"name": "Arsen (As)",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "mercury-hg-450",
			"name": "Mercury (Hg)",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "kadmium-451",
			"name": "Kadmium",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "mangan-mn-452",
			"name": "Mangan (Mn)",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "nickel-ni-453",
			"name": "Nickel (Ni)",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "chromium-cr-454",
			"name": "Chromium (Cr)",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "alumunium-al-455",
			"name": "Alumunium (Al)",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "besi-fe-456",
			"name": "Besi (Fe)",
			"price": 4e5,
			"category": "USG"
		},
		{
			"id": "zinc-plasma-457",
			"name": "Zinc (Plasma)",
			"price": 45e4,
			"category": "USG"
		},
		{
			"id": "alkohol-saliva-458",
			"name": "Alkohol (SALIVA)",
			"price": 9e4,
			"category": "USG"
		},
		{
			"id": "analisa-cairan-capd-459",
			"name": "Analisa Cairan Capd",
			"price": 35e4,
			"category": "USG"
		},
		{
			"id": "ada-adenonisia-diaminase-460",
			"name": "ADA (Adenonisia Diaminase)",
			"price": 6e5,
			"category": "USG"
		},
		{
			"id": "vitamin-d-25-oh-metode-eclia-461",
			"name": "Vitamin D 25-OH (Metode ECLIA)",
			"price": 35e4,
			"category": "USG"
		},
		{
			"id": "visus-462",
			"name": "Visus",
			"price": 4e4,
			"category": "USG"
		},
		{
			"id": "mantoux-test-463",
			"name": "Mantoux Test",
			"price": 2e5,
			"category": "USG"
		},
		{
			"id": "vaksin-hepatitis-b-464",
			"name": "Vaksin Hepatitis B",
			"price": 21e4,
			"category": "USG"
		},
		{
			"id": "tes-buta-warna-ishihara-s-test-465",
			"name": "Tes Buta Warna (Ishihara's test)",
			"price": 4e4,
			"category": "USG"
		},
		{
			"id": "lpk-fisik-466",
			"name": "Lpk/ Fisik",
			"price": 7e4,
			"category": "USG"
		},
		{
			"id": "lpk-lengkap-pem-fisik-quistionare-467",
			"name": "LPK Lengkap (Pem. Fisik & quistionare)",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "treadmill-468",
			"name": "Treadmill",
			"price": 55e4,
			"category": "USG"
		},
		{
			"id": "mata-spesialis-469",
			"name": "Mata, (Spesialis)",
			"price": 5e5,
			"category": "USG"
		},
		{
			"id": "gigi-spesialis-470",
			"name": "Gigi, (Spesialis )",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "fisik-covid-471",
			"name": "Fisik Covid",
			"price": 6e4,
			"category": "USG"
		},
		{
			"id": "tht-spesialis-472",
			"name": "THT, (Spesialis)",
			"price": 15e4,
			"category": "USG"
		},
		{
			"id": "ige-spesifik-atopik-473",
			"name": "IgE Spesifik/Atopik",
			"price": 15e5,
			"category": "USG"
		},
		{
			"id": "shades-of-grey-perception-474",
			"name": "Shades of Grey Perception",
			"price": 5e4,
			"category": "USG"
		},
		{
			"id": "mmpi-test-475",
			"name": "Mmpi Test",
			"price": 35e4,
			"category": "USG"
		},
		{
			"id": "jagger-test-476",
			"name": "Jagger Test",
			"price": 3e4,
			"category": "USG"
		},
		{
			"id": "tes-epilepsi-foto-sensitif-477",
			"name": "Tes Epilepsi & Foto Sensitif",
			"price": 7e4,
			"category": "USG"
		},
		{
			"id": "vertigo-neurologi-478",
			"name": "Vertigo / Neurologi",
			"price": 6e4,
			"category": "USG"
		},
		{
			"id": "home-service-479",
			"name": "Home Service",
			"price": 7e4,
			"category": "USG"
		},
		{
			"id": "tensi-480",
			"name": "Tensi",
			"price": 2e4,
			"category": "USG"
		},
		{
			"id": "konsultasi-dr-sp-jp-481",
			"name": "KONSULTASI Dr. Sp.JP",
			"price": 2e5,
			"category": "USG"
		},
		{
			"id": "effort-test-482",
			"name": "Effort Test",
			"price": 15e4,
			"category": "USG"
		},
		{
			"id": "tinggi-badan-483",
			"name": "Tinggi Badan",
			"price": 2e4,
			"category": "USG"
		},
		{
			"id": "berat-badan-484",
			"name": "Berat Badan",
			"price": 2e4,
			"category": "USG"
		},
		{
			"id": "test-grip-485",
			"name": "Test Grip",
			"price": 5e4,
			"category": "USG"
		},
		{
			"id": "lpk-fisik-homeservice-486",
			"name": "Lpk/Fisik Homeservice",
			"price": 25e4,
			"category": "USG"
		},
		{
			"id": "romberg-test-487",
			"name": "Romberg test",
			"price": 3e4,
			"category": "Urinalisa"
		},
		{
			"id": "penglihatan-3-dimensi-488",
			"name": "Penglihatan 3 Dimensi",
			"price": 3e4,
			"category": "Urinalisa"
		},
		{
			"id": "dass-42-depression-anxiety-stress-scales-489",
			"name": "DASS 42 (Depression Anxiety Stress Scales)",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "visus-autorefraksi-490",
			"name": "Visus ( autorefraksi )",
			"price": 5e4,
			"category": "Urinalisa"
		},
		{
			"id": "jasa-kirim-hasil-491",
			"name": "Jasa Kirim Hasil",
			"price": 2e4,
			"category": "Urinalisa"
		},
		{
			"id": "tes-mantoux-492",
			"name": "Tes mantoux",
			"price": 2e5,
			"category": "Urinalisa"
		},
		{
			"id": "ergonomi-493",
			"name": "Ergonomi",
			"price": 3e4,
			"category": "Urinalisa"
		},
		{
			"id": "lpk-fisik-neuro-494",
			"name": "Lpk/Fisik + Neuro",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "snack-495",
			"name": "Snack",
			"price": 2e4,
			"category": "Urinalisa"
		},
		{
			"id": "lapang-pandang-dan-3-dimensi-496",
			"name": "Lapang Pandang dan 3 dimensi",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "neurologi-497",
			"name": "Neurologi",
			"price": 3e4,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kebugaran-jasmani-498",
			"name": "Tes Kebugaran Jasmani",
			"price": 25e4,
			"category": "Urinalisa"
		},
		{
			"id": "ergometri-499",
			"name": "Ergometri",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "srq-20-srq-29-500",
			"name": "Srq 20 / Srq 29",
			"price": 5e4,
			"category": "Urinalisa"
		},
		{
			"id": "lpk-rujukan-klinik-501",
			"name": "LPK Rujukan Klinik",
			"price": 7e4,
			"category": "Urinalisa"
		},
		{
			"id": "lpk-fisik-dass-42-jagger-test-502",
			"name": "LPK/FISIK + DASS 42 + Jagger test",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "harvard-step-test-503",
			"name": "Harvard Step Test",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "tacrolimus-cmia-504",
			"name": "Tacrolimus (CMIA)",
			"price": 145e4,
			"category": "Urinalisa"
		},
		{
			"id": "lpk-fisik-dass-21-505",
			"name": "Lpk/Fisik + Dass 21",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "lpk-fisk-kardiovaskular-jakarta-506",
			"name": "LPK/FISK + Kardiovaskular Jakarta",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-hasil-kesimpulan-konsulta-si-507",
			"name": "Analisa hasil/Kesimpulan/Konsulta si",
			"price": 15e4,
			"category": "Penunjang"
		},
		{
			"id": "vibrasi-508",
			"name": "Vibrasi",
			"price": 3e4,
			"category": "Biomolekuler"
		},
		{
			"id": "hbv-dna-kuantitatif-real-time-pcr-509",
			"name": "HBV DNA Kuantitatif (Real time PCR)",
			"price": 12e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hcv-rna-kuantitatif-rt-pcr-510",
			"name": "HCV RNA Kuantitatif (RT- PCR)",
			"price": 23e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hpv-dna-511",
			"name": "Hpv Dna",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hbe-ag-metode-rapid-512",
			"name": "Hbe Ag (Metode Rapid)",
			"price": 12e4,
			"category": "Biomolekuler"
		},
		{
			"id": "rt-pcr-sars-cov-2-513",
			"name": "RT PCR SARS-CoV-2",
			"price": 6e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hiv-rna-metode-pcr-514",
			"name": "HIV-RNA (Metode PCR)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hpv-dna-screening-metode-pcr-515",
			"name": "HPV DNA Screening (Metode PCR)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "rt-pcr-sars-cov-2-variant-516",
			"name": "RT PCR SARS-CoV 2 + Variant",
			"price": 6e5,
			"category": "Biomolekuler"
		},
		{
			"id": "ct-ng-pcr-517",
			"name": "Ct/Ng (Pcr)",
			"price": 95e4,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-mtb-sputum-rt-pcr-518",
			"name": "PCR MTB Sputum (RT- PCR)",
			"price": 95e4,
			"category": "Biomolekuler"
		},
		{
			"id": "nipt-519",
			"name": "Nipt",
			"price": 5e6,
			"category": "Biomolekuler"
		},
		{
			"id": "toxoplasma-gondii-pcr-520",
			"name": "Toxoplasma gondii (PCR)",
			"price": 85e4,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-tb-521",
			"name": "Pcr Tb",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-mtb-ntm-dr-tb-rt-pcr-522",
			"name": "Pcr Mtb/Ntm/Dr-Tb(Rt- Pcr)",
			"price": 9e5,
			"category": "Biomolekuler"
		}
	],
	cikupa: [
		{
			"id": "ipf-0",
			"name": "IPF",
			"price": 265e3,
			"category": "Hematologi"
		},
		{
			"id": "ret-he-1",
			"name": "Ret-He",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "haemoglobin-2",
			"name": "Haemoglobin",
			"price": 6e4,
			"category": "Hematologi"
		},
		{
			"id": "hematokrit-3",
			"name": "Hematokrit",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "leukosit-4",
			"name": "Leukosit",
			"price": 6e4,
			"category": "Hematologi"
		},
		{
			"id": "trombosit-5",
			"name": "Trombosit",
			"price": 6e4,
			"category": "Hematologi"
		},
		{
			"id": "eritrosit-6",
			"name": "Eritrosit",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "led-7",
			"name": "LED",
			"price": 6e4,
			"category": "Hematologi"
		},
		{
			"id": "led-2-jam-8",
			"name": "LED (2 jam)",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "diff-9",
			"name": "Diff",
			"price": 6e4,
			"category": "Hematologi"
		},
		{
			"id": "retikulosit-10",
			"name": "Retikulosit",
			"price": 8e4,
			"category": "Hematologi"
		},
		{
			"id": "morfologi-darah-tepi-11",
			"name": "Morfologi Darah Tepi",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "total-eosinofil-12",
			"name": "Total Eosinofil",
			"price": 75e3,
			"category": "Hematologi"
		},
		{
			"id": "mcv-13",
			"name": "MCV",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "mch-14",
			"name": "MCH",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "mchc-15",
			"name": "Mchc",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "golongan-darah-rhesus-16",
			"name": "Golongan Darah + Rhesus",
			"price": 6e4,
			"category": "Hematologi"
		},
		{
			"id": "malaria-17",
			"name": "Malaria",
			"price": 1e5,
			"category": "Hematologi"
		},
		{
			"id": "masa-pendarahan-bt-18",
			"name": "Masa Pendarahan (BT)",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "masa-pembekuan-ct-19",
			"name": "Masa Pembekuan (CT)",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "masa-protrombin-pt-20",
			"name": "Masa Protrombin (PT)",
			"price": 18e4,
			"category": "Hematologi"
		},
		{
			"id": "aptt-21",
			"name": "Aptt",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "inr-22",
			"name": "INR",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "fibrinogen-23",
			"name": "Fibrinogen",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "d-dimer-24",
			"name": "D - Dimer",
			"price": 35e4,
			"category": "Hematologi"
		},
		{
			"id": "sel-le-25",
			"name": "Sel LE",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "analisa-hb-capillary-electrophoresis-26",
			"name": "Analisa Hb (Capillary Electrophoresis)",
			"price": 76e4,
			"category": "Hematologi"
		},
		{
			"id": "serum-iron-si-27",
			"name": "Serum Iron (Si)",
			"price": 12e4,
			"category": "Hematologi"
		},
		{
			"id": "tibc-28",
			"name": "Tibc",
			"price": 16e4,
			"category": "Hematologi"
		},
		{
			"id": "saturasi-transferin-29",
			"name": "Saturasi Transferin",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "ferritin-metode-eclia-30",
			"name": "Ferritin (Metode ECLIA)",
			"price": 3e5,
			"category": "Hematologi"
		},
		{
			"id": "it-ratio-31",
			"name": "It Ratio",
			"price": 8e4,
			"category": "Hematologi"
		},
		{
			"id": "coomb-s-test-32",
			"name": "Coomb's test",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "g-6-pd-33",
			"name": "G-6 Pd",
			"price": 42e4,
			"category": "Hematologi"
		},
		{
			"id": "asam-folat-clia-34",
			"name": "Asam Folat (CLIA)",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "agregasi-trombosit-tat-35",
			"name": "Agregasi Trombosit (TAT)",
			"price": 55e4,
			"category": "Hematologi"
		},
		{
			"id": "transferin-36",
			"name": "Transferin",
			"price": 35e4,
			"category": "Hematologi"
		},
		{
			"id": "vitamin-b-12-clia-37",
			"name": "Vitamin B 12 (CLIA)",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "protein-s-38",
			"name": "Protein S",
			"price": 189e4,
			"category": "Hematologi"
		},
		{
			"id": "protein-c-39",
			"name": "Protein C",
			"price": 141e4,
			"category": "Hematologi"
		},
		{
			"id": "viskositas-darah-40",
			"name": "Viskositas Darah",
			"price": 25e4,
			"category": "Hematologi"
		},
		{
			"id": "viskositas-plasma-41",
			"name": "Viskositas Plasma",
			"price": 25e4,
			"category": "Hematologi"
		},
		{
			"id": "microfilaria-42",
			"name": "Microfilaria",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "uibc-43",
			"name": "Uibc",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "lupus-antikoagulan-la-44",
			"name": "Lupus Antikoagulan (LA)",
			"price": 885e3,
			"category": "Hematologi"
		},
		{
			"id": "malaria-antigen-45",
			"name": "Malaria Antigen",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "indeks-trombosit-46",
			"name": "Indeks Trombosit",
			"price": 265e3,
			"category": "Hematologi"
		},
		{
			"id": "indeks-retikulosit-47",
			"name": "Indeks Retikulosit",
			"price": 8e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-lengkap-48",
			"name": "Protein Lengkap",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-total-49",
			"name": "Protein total",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "albumin-50",
			"name": "Albumin",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "globulin-51",
			"name": "Globulin",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "bilirubin-52",
			"name": "Bilirubin",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "bilirubin-bayi-53",
			"name": "Bilirubin (Bayi)",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "sgot-54",
			"name": "Sgot",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "sgpt-55",
			"name": "Sgpt",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "alkali-fosfatase-56",
			"name": "Alkali Fosfatase",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "gamma-gt-57",
			"name": "Gamma GT",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "ldh-58",
			"name": "LDH",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "cholinesterase-59",
			"name": "Cholinesterase",
			"price": 14e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "elektroforesa-protein-60",
			"name": "Elektroforesa Protein",
			"price": 45e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "asam-empedu-61",
			"name": "Asam empedu",
			"price": 15e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "ammonia-darah-nh3-62",
			"name": "Ammonia Darah (NH3)",
			"price": 15e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-sewaktu-63",
			"name": "Glukosa Sewaktu",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-sewaktu-cito-64",
			"name": "Glukosa Sewaktu (Cito)",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-puasa-65",
			"name": "Glukosa Puasa",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-puasa-cito-66",
			"name": "Glukosa Puasa (Cito)",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-2-jam-pp-67",
			"name": "Glukosa 2 jam PP",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-sewaktu-bayi-68",
			"name": "Glukosa Sewaktu Bayi",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "kurva-harian-glukosa-69",
			"name": "Kurva Harian Glukosa",
			"price": 18e4,
			"category": "Diabetes"
		},
		{
			"id": "gtt-tes-toleransi-glukosa-70",
			"name": "GTT (Tes Toleransi Glukosa)",
			"price": 18e4,
			"category": "Diabetes"
		},
		{
			"id": "hb-a1c-71",
			"name": "Hb A1C",
			"price": 16e4,
			"category": "Diabetes"
		},
		{
			"id": "c-peptide-72",
			"name": "C - Peptide",
			"price": 5e5,
			"category": "Diabetes"
		},
		{
			"id": "diabetes-73",
			"name": "Diabetes",
			"price": 8e4,
			"category": "Diabetes"
		},
		{
			"id": "glycated-albumin-74",
			"name": "Glycated Albumin",
			"price": 31e4,
			"category": "Diabetes"
		},
		{
			"id": "resistensi-insulin-75",
			"name": "Resistensi Insulin",
			"price": 45e4,
			"category": "Jantung"
		},
		{
			"id": "ck-cpk-76",
			"name": "Ck/ Cpk",
			"price": 25e4,
			"category": "Jantung"
		},
		{
			"id": "ck-mb-77",
			"name": "Ck-Mb",
			"price": 25e4,
			"category": "Jantung"
		},
		{
			"id": "sgot-jantung-78",
			"name": "SGOT (Jantung)",
			"price": 4e4,
			"category": "Jantung"
		},
		{
			"id": "troponin-t-79",
			"name": "Troponin T",
			"price": 35e4,
			"category": "Jantung"
		},
		{
			"id": "homocystein-80",
			"name": "Homocystein",
			"price": 1105e3,
			"category": "Jantung"
		},
		{
			"id": "nt-pro-bnp-81",
			"name": "NT Pro BNP",
			"price": 75e4,
			"category": "Jantung"
		},
		{
			"id": "troponin-i-82",
			"name": "Troponin I",
			"price": 35e4,
			"category": "Jantung"
		},
		{
			"id": "hs-troponin-t-83",
			"name": "Hs-Troponin T",
			"price": 4e5,
			"category": "Jantung"
		},
		{
			"id": "hs-troponin-i-metode-clia-84",
			"name": "HS-TROPONIN I (Metode CLIA)",
			"price": 4e5,
			"category": "Lemak Darah"
		},
		{
			"id": "lemak-lengkap-85",
			"name": "Lemak Lengkap",
			"price": 2e5,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-total-86",
			"name": "Cholesterol Total",
			"price": 5e4,
			"category": "Lemak Darah"
		},
		{
			"id": "trigliserida-87",
			"name": "Trigliserida",
			"price": 5e4,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-hdl-88",
			"name": "Cholesterol HDL",
			"price": 55e3,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-ldl-direk-89",
			"name": "Cholesterol LDL (direk)",
			"price": 6e4,
			"category": "Lemak Darah"
		},
		{
			"id": "lp-a-90",
			"name": "Lp (a)",
			"price": 765e3,
			"category": "Lemak Darah"
		},
		{
			"id": "chol-apo-b-91",
			"name": "Chol Apo B",
			"price": 25e4,
			"category": "Lemak Darah"
		},
		{
			"id": "small-dense-ldl-92",
			"name": "Small Dense LDL",
			"price": 35e4,
			"category": "Lemak Darah"
		},
		{
			"id": "apo-b-93",
			"name": "Apo-B",
			"price": 35e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "ureum-serum-plasma-94",
			"name": "Ureum (Serum/Plasma)",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "kreatinin-darah-95",
			"name": "Kreatinin Darah",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "creatinin-clearence-96",
			"name": "Creatinin Clearence",
			"price": 25e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "ureum-clearence-97",
			"name": "Ureum Clearence",
			"price": 25e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "cystatin-c-nefelometri-98",
			"name": "Cystatin C (NEFELOMETRI)",
			"price": 4e5,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "fungsi-ginjal-99",
			"name": "Fungsi Ginjal",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-100",
			"name": "Natrium",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-101",
			"name": "Kalium",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "fosfor-102",
			"name": "Fosfor",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "magnesium-urin-sewaktu-103",
			"name": "Magnesium Urin (Sewaktu)",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-104",
			"name": "Chlorida",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-105",
			"name": "Calsium",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-ion-106",
			"name": "Calsium Ion",
			"price": 2e5,
			"category": "Elektrolit"
		},
		{
			"id": "asam-laktat-darah-107",
			"name": "Asam Laktat (Darah)",
			"price": 5e5,
			"category": "Elektrolit"
		},
		{
			"id": "magnesium-108",
			"name": "Magnesium",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-urine-109",
			"name": "Natrium Urine",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-urine-110",
			"name": "Kalium Urine",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-urine-111",
			"name": "Chlorida Urine",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "osmolaritas-urine-112",
			"name": "Osmolaritas Urine",
			"price": 255e3,
			"category": "Elektrolit"
		},
		{
			"id": "osmolaritas-serum-113",
			"name": "Osmolaritas Serum",
			"price": 255e3,
			"category": "Elektrolit"
		},
		{
			"id": "zinc-plasma-pancreas-114",
			"name": "Zinc (Plasma) PANCREAS",
			"price": 45e4,
			"category": "Elektrolit"
		},
		{
			"id": "amilase-darah-115",
			"name": "Amilase Darah",
			"price": 225e3,
			"category": "Elektrolit"
		},
		{
			"id": "amilase-darah-pancreatic-116",
			"name": "Amilase Darah (Pancreatic)",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "insulin-puasa-117",
			"name": "Insulin Puasa",
			"price": 4e5,
			"category": "Elektrolit"
		},
		{
			"id": "lipase-darah-118",
			"name": "Lipase Darah",
			"price": 225e3,
			"category": "Urinalisa"
		},
		{
			"id": "urine-kolektor-dewasa-119",
			"name": "Urine Kolektor Dewasa",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-kuantitatif-esbach-120",
			"name": "Protein Kuantitatif (Esbach)",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "ureum-urine-121",
			"name": "Ureum Urine",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "kreatinin-urine-122",
			"name": "Kreatinin Urine",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "asam-urat-urin-123",
			"name": "Asam Urat Urin",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "glukosa-urine-124",
			"name": "Glukosa Urine",
			"price": 35e3,
			"category": "Urinalisa"
		},
		{
			"id": "protein-urine-125",
			"name": "Protein Urine",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "bilirubin-urine-126",
			"name": "Bilirubin Urine",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "keton-urine-127",
			"name": "Keton urine",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "mikroalbumin-urin-24-jam-metode-nefelometri-128",
			"name": "Mikroalbumin Urin 24 jam (METODE NEFELOMETRI)",
			"price": 2e5,
			"category": "Urinalisa"
		},
		{
			"id": "mikroalbumin-urin-sewaktu-129",
			"name": "Mikroalbumin (Urin Sewaktu)",
			"price": 25e4,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kehamilan-rapid-130",
			"name": "Tes Kehamilan Rapid",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kehamilan-titer-sens-200-miu-ml-131",
			"name": "Tes Kehamilan titer (Sens. 200 miu/ml)",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "albumin-creatinin-ratio-acr-132",
			"name": "Albumin Creatinin Ratio (ACR)",
			"price": 25e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-creatinin-ratio-133",
			"name": "Protein Creatinin Ratio",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "acr-albumin-to-creatinine-ratio-134",
			"name": "ACR (Albumin-to- Creatinine Ratio)",
			"price": 25e4,
			"category": "Urinalisa"
		},
		{
			"id": "morfologi-eritrosit-urine-fase-kontras-test-nark-135",
			"name": "Morfologi Eritrosit Urine (Fase Kontras) TEST NARKOBA",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "amphetamin-ecstacy-136",
			"name": "Amphetamin (Ecstacy)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "mariyuana-canabis-ganja-137",
			"name": "Mariyuana (Canabis, Ganja)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "ophium-morfin-heroin-putaw-138",
			"name": "Ophium (Morfin, Heroin, Putaw)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "benzodiazepim-139",
			"name": "Benzodiazepim",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "barbiturat-140",
			"name": "Barbiturat",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "coccain-141",
			"name": "Coccain",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "phencyclidine-142",
			"name": "Phencyclidine",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "methampetamine-143",
			"name": "Methampetamine",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "narkoba-3-144",
			"name": "Narkoba 3",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "tramadol-urine-145",
			"name": "Tramadol Urine",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "gorilla-sintetik-mariyuana-146",
			"name": "Gorilla (Sintetik Mariyuana)",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "soma-147",
			"name": "Soma",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "nikotin-rokok-faeces-148",
			"name": "Nikotin (Rokok) FAECES",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "faeces-lengkap-149",
			"name": "Faeces Lengkap",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "darah-samar-faeces-fobt-150",
			"name": "Darah samar faeces (FOBT)",
			"price": 9e4,
			"category": "Urinalisa"
		},
		{
			"id": "laktosa-intolerans-151",
			"name": "Laktosa Intolerans",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-faeces-gastro-cairan-tubuh-152",
			"name": "Analisa Faeces Gastro Cairan Tubuh",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sperma-analisa-cairan-tubuh-153",
			"name": "Analisa Sperma ANALISA CAIRAN TUBUH",
			"price": 17e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-sendi-154",
			"name": "Analisa Cairan Sendi",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-pericard-jantung-155",
			"name": "Analisa Cairan Pericard (Jantung)",
			"price": 25e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-pleura-156",
			"name": "Analisa Cairan Pleura",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-asites-157",
			"name": "Analisa Cairan Asites",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-otak-lcs-158",
			"name": "Analisa Cairan Otak (LCS)",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sekret-vagina-159",
			"name": "Analisa Sekret Vagina",
			"price": 17e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-batu-ginjal-immunoserologi-160",
			"name": "Analisa Batu Ginjal IMMUNOSEROLOGI",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "chikungunya-161",
			"name": "Chikungunya",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "vitamin-d-25-oh-total-metode-clia-162",
			"name": "Vitamin D 25-OH Total (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tb-lam-ag-urine-163",
			"name": "TB LAM Ag (Urine)",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "widal-164",
			"name": "Widal",
			"price": 9e4,
			"category": "Elektrolit"
		},
		{
			"id": "salmonella-igg-igm-165",
			"name": "Salmonella IgG/IgM",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "vdrl-166",
			"name": "Vdrl",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "rpr-test-167",
			"name": "Rpr Test",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "tpha-168",
			"name": "Tpha",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "hbsag-metode-eclia-169",
			"name": "HBsAg (Metode ECLIA)",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hbs-metode-eclia-170",
			"name": "Anti HBs (Metode ECLIA)",
			"price": 18e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hbc-metode-clia-171",
			"name": "Anti HBc (Metode CLIA)",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hbc-igm-cmia-172",
			"name": "Anti HBc IgM (CMIA)",
			"price": 95e4,
			"category": "Elektrolit"
		},
		{
			"id": "hbeag-metode-clia-173",
			"name": "HBeAg (Metode CLIA)",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hbe-elfa-174",
			"name": "Anti HBe (ELFA)",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hav-igm-metode-clia-175",
			"name": "Anti HAV IgM (Metode CLIA)",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hav-total-176",
			"name": "Anti HAV Total",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hcv-metode-clia-177",
			"name": "Anti HCV (Metode CLIA)",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hcv-igm-178",
			"name": "Anti HCV IgM",
			"price": 955e3,
			"category": "Elektrolit"
		},
		{
			"id": "cd-4-179",
			"name": "Cd 4",
			"price": 38e4,
			"category": "Elektrolit"
		},
		{
			"id": "cd-8-180",
			"name": "Cd 8",
			"price": 5e5,
			"category": "Elektrolit"
		},
		{
			"id": "rheumatoid-factor-metode-nefelometri-181",
			"name": "Rheumatoid Factor (Metode Nefelometri)",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "asto-nefelometri-182",
			"name": "Asto (Nefelometri)",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "crp-metode-nefelometri-183",
			"name": "CRP (Metode Nefelometri)",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "c3-komplemen-metode-nefelometri-184",
			"name": "C3 Komplemen (Metode Nefelometri)",
			"price": 4e5,
			"category": "Elektrolit"
		},
		{
			"id": "c4-komplemen-metode-nefelometri-185",
			"name": "C4 Komplemen (Metode Nefelometri)",
			"price": 4e5,
			"category": "Elektrolit"
		},
		{
			"id": "ig-a-186",
			"name": "Ig A",
			"price": 9e5,
			"category": "Elektrolit"
		},
		{
			"id": "ige-total-187",
			"name": "IgE Total",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "ige-spesifik-anak-188",
			"name": "IgE Spesifik Anak",
			"price": 16e5,
			"category": "Elektrolit"
		},
		{
			"id": "hbs-ag-rapid-189",
			"name": "HBs Ag (Rapid)",
			"price": 7e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hav-igm-rapid-190",
			"name": "Anti HAV IgM (Rapid)",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "hbe-ag-cmia-191",
			"name": "Hbe Ag (CMIA)",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "hiv-metode-eclia-192",
			"name": "HIV (Metode ECLIA)",
			"price": 2e5,
			"category": "Elektrolit"
		},
		{
			"id": "salmonella-typhi-igm-193",
			"name": "Salmonella Typhi IgM",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "dengue-igg-igm-194",
			"name": "DENGUE IgG/ IgM",
			"price": 18e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-tb-igg-igm-195",
			"name": "Anti TB IgG/IgM",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "serologi-amuba-196",
			"name": "Serologi Amuba",
			"price": 585e3,
			"category": "Elektrolit"
		},
		{
			"id": "helicobacter-pylory-igg-197",
			"name": "Helicobacter Pylory IgG",
			"price": 9e5,
			"category": "Elektrolit"
		},
		{
			"id": "helicobacter-pylory-igm-198",
			"name": "Helicobacter Pylory IgM",
			"price": 9e5,
			"category": "Elektrolit"
		},
		{
			"id": "aca-igg-metode-elisa-199",
			"name": "ACA IgG (Metode ELISA)",
			"price": 75e4,
			"category": "Elektrolit"
		},
		{
			"id": "aca-igm-metode-elisa-200",
			"name": "ACA IgM (Metode ELISA)",
			"price": 75e4,
			"category": "Elektrolit"
		},
		{
			"id": "ana-test-iift-201",
			"name": "ANA Test (IIFT)",
			"price": 75e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-ds-dna-metode-clia-202",
			"name": "Anti ds-DNA (Metode CLIA)",
			"price": 7e5,
			"category": "Elektrolit"
		},
		{
			"id": "hcv-rna-kuantitatif-203",
			"name": "HCV RNA Kuantitatif",
			"price": 23e5,
			"category": "Elektrolit"
		},
		{
			"id": "hs-crp-204",
			"name": "hs-CRP",
			"price": 2e5,
			"category": "Elektrolit"
		},
		{
			"id": "anti-ccp-metode-elisa-205",
			"name": "Anti-CCP (Metode ELISA)",
			"price": 7e5,
			"category": "Elektrolit"
		},
		{
			"id": "tubex-tf-206",
			"name": "Tubex Tf",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "dengue-antigen-ns1-207",
			"name": "Dengue Antigen NS1",
			"price": 18e4,
			"category": "Elektrolit"
		},
		{
			"id": "pap-tb-208",
			"name": "Pap TB",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "ige-spesifik-atopy-209",
			"name": "IgE Spesifik (Atopy)",
			"price": 15e5,
			"category": "Elektrolit"
		},
		{
			"id": "beta-2-glikoprotein-1-igg-210",
			"name": "Beta 2 Glikoprotein 1 IgG",
			"price": 154e4,
			"category": "Elektrolit"
		},
		{
			"id": "beta-2-glikoprotein-1-igm-211",
			"name": "Beta 2 Glikoprotein 1 IgM",
			"price": 154e4,
			"category": "Elektrolit"
		},
		{
			"id": "ana-profil-immunoblot-212",
			"name": "Ana Profil (Immunoblot)",
			"price": 125e4,
			"category": "Elektrolit"
		},
		{
			"id": "helicobacter-total-metode-rapid-213",
			"name": "Helicobacter Total (Metode Rapid)",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "helicobacter-antigen-faeces-214",
			"name": "Helicobacter Antigen (Faeces)",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "ana-igg-215",
			"name": "ANA IgG",
			"price": 65e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hcv-rapid-216",
			"name": "Anti HCV (rapid)",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-b2-glikoprotein-1-217",
			"name": "Anti B2 Glikoprotein 1",
			"price": 1695e3,
			"category": "Elektrolit"
		},
		{
			"id": "anti-b2-glikoprotein-i-igg-metode-elisa-218",
			"name": "Anti B2 Glikoprotein I IgG (Metode ELISA)",
			"price": 11e5,
			"category": "Elektrolit"
		},
		{
			"id": "anti-b2-glikoprotein-i-igm-219",
			"name": "Anti B2 Glikoprotein I IgM",
			"price": 11e5,
			"category": "Elektrolit"
		},
		{
			"id": "rapid-antigen-sars-cov-2-220",
			"name": "Rapid Antigen SARS-CoV-2",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-leptospira-221",
			"name": "Anti Leptospira",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hav-igm-clia-222",
			"name": "Anti HAV IgM (Clia)",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "hbeag-rapid-223",
			"name": "HBeAg (Rapid)",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "hiv-antibodi-rapid-224",
			"name": "HIV Antibodi (Rapid)",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "syphilis-rapid-225",
			"name": "Syphilis (Rapid)",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "hbsag-kuantitatif-clia-226",
			"name": "HBsAg Kuantitatif (CLIA)",
			"price": 18e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-hbe-metode-clia-227",
			"name": "Anti HBe (Metode CLIA)",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-tb-igg-igm-228",
			"name": "Anti TB IgG / IgM",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "ige-spesifik-susu-229",
			"name": "IgE Spesifik Susu",
			"price": 106e4,
			"category": "Elektrolit"
		},
		{
			"id": "anti-h-pylory-igg-230",
			"name": "Anti H-Pylory IgG",
			"price": 8e5,
			"category": "Elektrolit"
		},
		{
			"id": "anca-if-231",
			"name": "Anca (If)",
			"price": 72e4,
			"category": "Elektrolit"
		},
		{
			"id": "tacrolimus-232",
			"name": "Tacrolimus",
			"price": 145e4,
			"category": "Elektrolit"
		},
		{
			"id": "ca-72-4-clia-233",
			"name": "Ca 72-4 (CLIA)",
			"price": 85e4,
			"category": "Biomolekuler"
		},
		{
			"id": "bcr-abl-real-time-pcr-234",
			"name": "BCR-ABL (Real Time PCR)",
			"price": 3e6,
			"category": "Biomolekuler"
		},
		{
			"id": "hbv-dna-kuantitatif-pcr-235",
			"name": "HBV DNA Kuantitatif (PCR)",
			"price": 12e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hpv-dna-screening-pcr-236",
			"name": "Hpv Dna Screening (Pcr)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "rt-pcr-sars-cov-2-237",
			"name": "RT PCR SARS-CoV-2",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hpv-dna-genotyping-238",
			"name": "Hpv Dna Genotyping",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "std-8-pcr-239",
			"name": "Std-8 (Pcr)",
			"price": 12e5,
			"category": "Biomolekuler"
		},
		{
			"id": "ct-ng-pcr-240",
			"name": "Ct/Ng (Pcr)",
			"price": 95e4,
			"category": "Biomolekuler"
		},
		{
			"id": "hla-b27-pcr-241",
			"name": "Hla-B27 Pcr",
			"price": 19e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-herpes-zoster-varicela-zoster-242",
			"name": "PCR (Herpes Zoster/Varicela Zoster)",
			"price": 8e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-salmonella-typhi-243",
			"name": "PCR Salmonella Typhi",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-mtb-rt-pcr-244",
			"name": "Pcr Mtb (Rt-Pcr)",
			"price": 95e4,
			"category": "Biomolekuler"
		},
		{
			"id": "hiv-1-rna-viral-load-pcr-245",
			"name": "HIV-1 RNA/Viral Load (PCR)",
			"price": 95e4,
			"category": "Biomolekuler"
		},
		{
			"id": "hiv-dna-eia-metode-kualitatif-246",
			"name": "Hiv-Dna Eia (Metode Kualitatif)",
			"price": 85e4,
			"category": "Biomolekuler"
		},
		{
			"id": "tcm-tb-torch-247",
			"name": "Tcm-Tb Torch",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-toxoplasma-igg-metode-clia-248",
			"name": "Anti Toxoplasma IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-toxoplasma-igg-metode-elfa-249",
			"name": "Anti Toxoplasma IgG (Metode ELFA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-toxoplasma-igm-metode-clia-250",
			"name": "Anti Toxoplasma IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-toxoplasma-igm-metode-eclia-251",
			"name": "Anti Toxoplasma IgM (Metode ECLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-rubella-igg-metode-clia-252",
			"name": "Anti Rubella IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-rubella-igm-metode-clia-253",
			"name": "Anti Rubella IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-toxoplasma-igg-aviditas-elfa-254",
			"name": "Anti Toxoplasma IgG Aviditas (ELFA)",
			"price": 7e5,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-rubella-igm-metode-eclia-255",
			"name": "Anti Rubella IgM (Metode ECLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-cmv-igg-metode-clia-256",
			"name": "Anti CMV IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-cmv-igg-metode-elfa-257",
			"name": "Anti CMV IgG (Metode ELFA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-cmv-igm-metode-eclia-258",
			"name": "Anti CMV IgM (Metode ECLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-cmv-igm-metode-elfa-259",
			"name": "Anti CMV IgM (Metode ELFA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-cmv-igm-metode-clia-260",
			"name": "Anti CMV IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-hsv-i-igg-metode-elisa-261",
			"name": "Anti HSV I IgG (Metode ELISA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-hsv-i-igg-metode-clia-262",
			"name": "Anti HSV I IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-hsv-i-igm-metode-clia-263",
			"name": "Anti HSV I IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-hsv-i-igm-metode-elisa-264",
			"name": "Anti HSV I IgM (Metode ELISA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-hsv-ii-igg-metode-clia-265",
			"name": "Anti HSV II IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-hsv-ii-igg-metode-elisa-266",
			"name": "Anti HSV II IgG (Metode ELISA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "toxoplasma-igg-aviditas-elfa-267",
			"name": "Toxoplasma IgG Aviditas (ELFA)",
			"price": 75e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-chlamydia-igg-268",
			"name": "Anti Chlamydia IgG",
			"price": 125e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-chlamydia-igm-metode-eia-269",
			"name": "Anti Chlamydia IgM (Metode EIA)",
			"price": 131e4,
			"category": "Biomolekuler"
		},
		{
			"id": "cmv-igg-avidity-270",
			"name": "CMV IgG (Avidity)",
			"price": 75e4,
			"category": "Biomolekuler"
		},
		{
			"id": "cmv-igg-aviditas-metode-clia-271",
			"name": "CMV IgG Aviditas (Metode CLIA)",
			"price": 75e4,
			"category": "Biomolekuler"
		},
		{
			"id": "toxoplasma-ig-m-aviditas-272",
			"name": "Toxoplasma Ig M Aviditas",
			"price": 56e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-measles-igg-metode-elisa-273",
			"name": "Anti Measles IgG (Metode ELISA)",
			"price": 65e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-hsv-ii-igm-metode-elisa-274",
			"name": "Anti HSV II IgM (Metode ELISA)",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "anti-hsv-ii-igm-metode-clia-275",
			"name": "Anti HSV II IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "beta-hcg-kuantitatif-metode-eclia-276",
			"name": "Beta hCG Kuantitatif (Metode ECLIA)",
			"price": 4e5,
			"category": "Hormon"
		},
		{
			"id": "beta-hcg-titer-urine-277",
			"name": "Beta hCG Titer (urine)",
			"price": 4e5,
			"category": "Hormon"
		},
		{
			"id": "t3-278",
			"name": "T3",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "prolaktin-metode-clia-279",
			"name": "Prolaktin (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "cortisol-clia-280",
			"name": "Cortisol (CLIA)",
			"price": 4e5,
			"category": "Hormon"
		},
		{
			"id": "cortisol-darah-clia-281",
			"name": "Cortisol Darah (CLIA)",
			"price": 45e4,
			"category": "Hormon"
		},
		{
			"id": "anti-tpo-clia-282",
			"name": "Anti TPO (CLIA)",
			"price": 7e5,
			"category": "Hormon"
		},
		{
			"id": "igf-1-283",
			"name": "Igf - 1",
			"price": 15e5,
			"category": "Hormon"
		},
		{
			"id": "growth-hormone-284",
			"name": "Growth Hormone",
			"price": 93e4,
			"category": "Hormon"
		},
		{
			"id": "procalcitonin-285",
			"name": "Procalcitonin",
			"price": 7e5,
			"category": "Hormon"
		},
		{
			"id": "t3-metode-clia-286",
			"name": "T3 (Metode CLIA)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t4-metode-clia-287",
			"name": "T4 (Metode CLIA)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "fti-288",
			"name": "FTI",
			"price": 1285e3,
			"category": "Hormon"
		},
		{
			"id": "tshs-metode-clia-289",
			"name": "TSHs (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "tshs-bayi-anak-metode-clia-290",
			"name": "TSHs Bayi/Anak (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "free-t3-metode-clia-291",
			"name": "Free T3 (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "free-t4-metode-clia-292",
			"name": "Free T4 (Metode CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "free-t4-bayi-anak-metode-clia-293",
			"name": "Free T4 Bayi/Anak (Metode CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "thyroglobulin-antibody-294",
			"name": "Thyroglobulin Antibody",
			"price": 5e5,
			"category": "Hormon"
		},
		{
			"id": "thyroglobulin-metode-clia-295",
			"name": "Thyroglobulin (Metode CLIA)",
			"price": 6e5,
			"category": "Hormon"
		},
		{
			"id": "paratyroid-hormon-pth-intact-296",
			"name": "Paratyroid Hormon(PTH Intact)",
			"price": 12e5,
			"category": "Hormon"
		},
		{
			"id": "trab-metode-clia-297",
			"name": "TRAb (Metode CLIA)",
			"price": 7e5,
			"category": "Hormon"
		},
		{
			"id": "tpo-ab-thyroid-peroxidase-anti-body-298",
			"name": "TPO AB (thyroid peroxidase Anti Body)",
			"price": 105e4,
			"category": "Hormon"
		},
		{
			"id": "tsh-metode-clia-299",
			"name": "TSH (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "tshs-bayi-anak-300",
			"name": "TSHs Bayi/Anak",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t3-uptake-301",
			"name": "T3 Uptake",
			"price": 5e5,
			"category": "Hormon"
		},
		{
			"id": "t4-neonatus-302",
			"name": "T4 Neonatus",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "fsh-metode-clia-303",
			"name": "FSH (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "lh-metode-clia-304",
			"name": "LH (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "estradiol-metode-clia-305",
			"name": "Estradiol (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "progesteron-metode-clia-306",
			"name": "Progesteron (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "testosteron-metode-clia-307",
			"name": "Testosteron (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "amh-anti-mullerian-clia-308",
			"name": "AMH (Anti Mullerian-CLIA)",
			"price": 8e5,
			"category": "Hormon"
		},
		{
			"id": "dhea-s-309",
			"name": "Dhea-S",
			"price": 11e5,
			"category": "Hormon"
		},
		{
			"id": "free-testosteron-metode-clia-310",
			"name": "Free Testosteron (Metode CLIA)",
			"price": 6e5,
			"category": "Hormon"
		},
		{
			"id": "shbg-sex-hormone-binding-globulin-311",
			"name": "SHBG (Sex hormone binding globulin)",
			"price": 231e4,
			"category": "Tumor Marker"
		},
		{
			"id": "afp-metode-clia-312",
			"name": "AFP (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "cea-metode-clia-313",
			"name": "CEA (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-19-9-metode-clia-314",
			"name": "CA 19-9 (Metode CLIA)",
			"price": 75e4,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-125-metode-eclia-315",
			"name": "CA 125 (Metode ECLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "psa-clia-316",
			"name": "Psa (Clia)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-15-3-clia-317",
			"name": "Ca 15-3 (Clia)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "nse-paru-318",
			"name": "NSE (Paru)",
			"price": 88e4,
			"category": "Tumor Marker"
		},
		{
			"id": "cyfra-21-1-eclia-319",
			"name": "CYfra 21-1 (ECLIA)",
			"price": 8e5,
			"category": "Tumor Marker"
		},
		{
			"id": "he-4-metode-cmia-320",
			"name": "HE-4 (Metode CMIA)",
			"price": 12e5,
			"category": "Tumor Marker"
		},
		{
			"id": "free-psa-metode-clia-321",
			"name": "Free PSA (Metode CLIA)",
			"price": 7e5,
			"category": "Tumor Marker"
		},
		{
			"id": "scc-squamous-cell-carcinoma-antigen-322",
			"name": "SCC (Squamous Cell Carcinoma Antigen)",
			"price": 75e4,
			"category": "Tumor Marker"
		},
		{
			"id": "he-4-ca-125-roma-323",
			"name": "He-4 & Ca 125 (Roma)",
			"price": 145e4,
			"category": "Tumor Marker"
		},
		{
			"id": "pivka-ii-direk-324",
			"name": "Pivka Ii Direk",
			"price": 6e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "igra-tb-quantiferon-325",
			"name": "IGRA TB (QuantiFERON)",
			"price": 9e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "analisa-sekret-uretra-326",
			"name": "Analisa Sekret Uretra",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "analisa-sekret-mata-327",
			"name": "Analisa Sekret Mata",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "gram-328",
			"name": "Gram",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-329",
			"name": "BTA Sputum",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-3x-330",
			"name": "BTA Sputum (3X)",
			"price": 24e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-kulit-lepra-331",
			"name": "BTA Kulit (Lepra)",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-pus-332",
			"name": "Bta Pus",
			"price": 7e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "jamur-333",
			"name": "Jamur",
			"price": 55e3,
			"category": "Mikrobiologi"
		},
		{
			"id": "dipteri-334",
			"name": "Dipteri",
			"price": 1e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "filaria-335",
			"name": "Filaria",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-2x-336",
			"name": "Bta Sputum (2X)",
			"price": 16e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sediaan-langsung-gram-kultur-resistensi-337",
			"name": "Sediaan Langsung Gram KULTUR RESISTENSI",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "faeces-jamur-338",
			"name": "Faeces jamur",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-gall-339",
			"name": "Kultur Gall",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-darah-340",
			"name": "Kultur Darah",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-urine-341",
			"name": "Kultur Urine",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-faeces-342",
			"name": "Kultur Faeces",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "rectal-swab-343",
			"name": "Rectal Swab",
			"price": 2e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-bta-344",
			"name": "Kultur BTA",
			"price": 155e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-sputum-non-bta-345",
			"name": "Kultur Sputum Non BTA",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-hapus-tenggorok-346",
			"name": "Kultur Hapus Tenggorok",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-pus-347",
			"name": "Kultur PUS",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-sekret-vagina-348",
			"name": "Kultur Sekret Vagina",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-cairan-tubuh-lain-349",
			"name": "Kultur Cairan Tubuh Lain",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "biakan-faeces-jamur-350",
			"name": "Biakan Faeces Jamur",
			"price": 32e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-sperma-351",
			"name": "Kultur Sperma",
			"price": 5e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "kultur-jamur-352",
			"name": "Kultur Jamur",
			"price": 95e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "swab-dubur-cacing-patologi-anatomi-353",
			"name": "Swab Dubur Cacing PATOLOGI ANATOMI",
			"price": 7e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "pap-smear-354",
			"name": "Pap Smear",
			"price": 37e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sitologi-cairan-355",
			"name": "Sitologi Cairan",
			"price": 425e3,
			"category": "Mikrobiologi"
		},
		{
			"id": "histopatologi-jaringan-i-5-cm-356",
			"name": "Histopatologi Jaringan I (<5 cm)",
			"price": 45e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "histopatologi-jaringan-5-cm-357",
			"name": "Histopatologi Jaringan (≥5 cm)",
			"price": 75e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "histopatologi-jaringan-besar-358",
			"name": "Histopatologi Jaringan Besar",
			"price": 12e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-schedel-359",
			"name": "RO Schedel",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-sinus-paranasal-3-360",
			"name": "RO Sinus Paranasal (3)",
			"price": 36e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-waters-361",
			"name": "RO Waters",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-mastoid-362",
			"name": "RO Mastoid",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-nasal-bone-363",
			"name": "RO Nasal Bone",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-tmj-364",
			"name": "Ro Tmj",
			"price": 23e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-mandibula-365",
			"name": "Ro Mandibula",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-366",
			"name": "RO Thorax",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-pa-lat-367",
			"name": "RO Thorax PA + LAT",
			"price": 3e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-cervical-ap-lat-368",
			"name": "RO Cervical AP + LAT",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cervical-ap-lat-obl-369",
			"name": "RO Cervical AP + LAT + OBL",
			"price": 39e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-370",
			"name": "RO Thoracal AP + LAT",
			"price": 27e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-obl-371",
			"name": "RO Thoracal AP + LAT + OBL",
			"price": 37e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-372",
			"name": "Ro Thoraco Lumbal AP",
			"price": 27e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-373",
			"name": "RO Thoraco Lumbal AP + LAT",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-obl-374",
			"name": "RO Thoraco Lumbal AP + LAT + OBL",
			"price": 51e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-375",
			"name": "RO Lumbal AP + LAT",
			"price": 33e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-obl-376",
			"name": "RO Lumbal AP + LAT + OBL",
			"price": 51e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-377",
			"name": "RO Lumbo Sacral AP + LAT",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-obl-378",
			"name": "RO Lumbo Sacral AP + LAT + OBL",
			"price": 51e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-bno-ap-lat-379",
			"name": "Ro Bno Ap/Lat",
			"price": 27e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-bno-abdomen-380",
			"name": "RO BNO - Abdomen",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-hip-joint-381",
			"name": "RO Hip Joint",
			"price": 47e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-pelvis-coxae-382",
			"name": "RO Pelvis (Coxae)",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-dental-383",
			"name": "RO Dental",
			"price": 1e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-clavicula-384",
			"name": "RO Clavicula",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-scapula-385",
			"name": "RO Scapula",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-shoulder-386",
			"name": "RO Shoulder",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-humerus-387",
			"name": "RO Humerus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-elbow-cubiti-388",
			"name": "RO Elbow (Cubiti)",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-antebrachi-389",
			"name": "RO Antebrachi",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-wrist-390",
			"name": "RO Wrist",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-manus-391",
			"name": "RO Manus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-digiti-392",
			"name": "RO Digiti",
			"price": 21e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-femur-393",
			"name": "RO Femur",
			"price": 27e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-genu-ap-lat-394",
			"name": "RO Genu AP-LAT",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cruris-395",
			"name": "RO Cruris",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-ankle-396",
			"name": "RO Ankle",
			"price": 27e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-pedis-397",
			"name": "RO Pedis",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-calceneus-398",
			"name": "RO Calceneus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-top-lordotic-399",
			"name": "Ro Top Lordotic",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "baca-rontgen-elektromedis-400",
			"name": "Baca Rontgen ELEKTROMEDIS",
			"price": 7e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-atas-401",
			"name": "USG Abdomen Atas",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-bawah-402",
			"name": "USG Abdomen Bawah",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-lengkap-403",
			"name": "USG Abdomen Lengkap",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-kandungan-404",
			"name": "USG Kandungan",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-tiroid-405",
			"name": "USG TIroid",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-mammae-406",
			"name": "USG Mammae",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "ekstrimitas-407",
			"name": "Ekstrimitas",
			"price": 6e5,
			"category": "USG"
		},
		{
			"id": "fase-408",
			"name": "Fase)",
			"price": 5e5,
			"category": "USG"
		},
		{
			"id": "ekg-409",
			"name": "EKG",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "spirometri-410",
			"name": "Spirometri",
			"price": 15e4,
			"category": "USG"
		},
		{
			"id": "audiometri-lain-lain-411",
			"name": "Audiometri LAIN-LAIN",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "protein-total-lcs-412",
			"name": "Protein Total (LCS)",
			"price": 12e4,
			"category": "USG"
		},
		{
			"id": "asam-urat-serum-plasma-413",
			"name": "Asam Urat (Serum/Plasma)",
			"price": 5e4,
			"category": "USG"
		},
		{
			"id": "phenytoin-dilantin-cmia-414",
			"name": "Phenytoin/Dilantin (CMIA)",
			"price": 148e4,
			"category": "USG"
		},
		{
			"id": "alkohol-415",
			"name": "Alkohol",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "fecal-calprotectin-416",
			"name": "Fecal Calprotectin",
			"price": 75e4,
			"category": "USG"
		},
		{
			"id": "ada-adenosine-deaminase-417",
			"name": "ADA (Adenosine Deaminase)",
			"price": 55e4,
			"category": "USG"
		},
		{
			"id": "styrene-418",
			"name": "Styrene",
			"price": 5e5,
			"category": "USG"
		},
		{
			"id": "mmpi-419",
			"name": "Mmpi",
			"price": 35e4,
			"category": "USG"
		},
		{
			"id": "mantoux-test-420",
			"name": "Mantoux Test",
			"price": 2e5,
			"category": "USG"
		},
		{
			"id": "test-buta-warna-421",
			"name": "Test Buta Warna",
			"price": 4e4,
			"category": "USG"
		},
		{
			"id": "fisik-422",
			"name": "Fisik",
			"price": 7e4,
			"category": "USG"
		},
		{
			"id": "home-service-423",
			"name": "Home Service",
			"price": 1e5,
			"category": "USG"
		},
		{
			"id": "theophyllin-424",
			"name": "Theophyllin",
			"price": 18e5,
			"category": "USG"
		},
		{
			"id": "shades-of-grey-perception-425",
			"name": "Shades of Grey Perception",
			"price": 3e4,
			"category": "USG"
		},
		{
			"id": "jegger-test-426",
			"name": "Jegger Test",
			"price": 3e4,
			"category": "USG"
		},
		{
			"id": "lpk-khusus-427",
			"name": "Lpk Khusus",
			"price": 1e5,
			"category": "USG"
		}
	],
	pandeglang: [
		{
			"id": "bayi-0",
			"name": "(Bayi)",
			"price": 9e4,
			"category": "Hematologi"
		},
		{
			"id": "hb-elektroforesa-1",
			"name": "Hb Elektroforesa",
			"price": 7e5,
			"category": "Hematologi"
		},
		{
			"id": "haemoglobin-2",
			"name": "Haemoglobin",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "hematokrit-3",
			"name": "Hematokrit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "leukosit-4",
			"name": "Leukosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "trombosit-5",
			"name": "Trombosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "eritrosit-6",
			"name": "Eritrosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "led-7",
			"name": "LED",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "diff-8",
			"name": "Diff",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "retikulosit-9",
			"name": "Retikulosit",
			"price": 7e4,
			"category": "Hematologi"
		},
		{
			"id": "limposit-plasma-biru-10",
			"name": "Limposit Plasma Biru",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "morfologi-11",
			"name": "Morfologi",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "total-eosinofil-12",
			"name": "Total Eosinofil",
			"price": 75e3,
			"category": "Hematologi"
		},
		{
			"id": "mcv-13",
			"name": "MCV",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "mch-14",
			"name": "MCH",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "mchc-15",
			"name": "Mchc",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "golongan-darah-rhesus-16",
			"name": "Golongan Darah + Rhesus",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "malaria-17",
			"name": "Malaria",
			"price": 1e5,
			"category": "Hematologi"
		},
		{
			"id": "masa-pendarahan-18",
			"name": "Masa Pendarahan",
			"price": 3e4,
			"category": "Hematologi"
		},
		{
			"id": "masa-pembekuan-19",
			"name": "Masa Pembekuan",
			"price": 3e4,
			"category": "Hematologi"
		},
		{
			"id": "masa-protrombin-pt-20",
			"name": "Masa Protrombin (PT)",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "inr-21",
			"name": "INR",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "aptt-22",
			"name": "Aptt",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "fibrinogen-23",
			"name": "Fibrinogen",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "d-dimer-24",
			"name": "D - Dimer",
			"price": 35e4,
			"category": "Hematologi"
		},
		{
			"id": "sel-le-25",
			"name": "Sel LE",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "elektroforesa-hemoglobin-capillary-electrophores-26",
			"name": "Elektroforesa Hemoglobin (Capillary Electrophoresis)",
			"price": 7e5,
			"category": "Hematologi"
		},
		{
			"id": "serum-iron-si-27",
			"name": "Serum Iron (Si)",
			"price": 12e4,
			"category": "Hematologi"
		},
		{
			"id": "tibc-28",
			"name": "Tibc",
			"price": 16e4,
			"category": "Hematologi"
		},
		{
			"id": "ferritin-eclia-29",
			"name": "Ferritin (ECLIA)",
			"price": 3e5,
			"category": "Hematologi"
		},
		{
			"id": "saturasi-transferin-30",
			"name": "Saturasi Transferin",
			"price": 25e4,
			"category": "Hematologi"
		},
		{
			"id": "coomb-s-test-31",
			"name": "Coomb's test",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "g-6-pd-32",
			"name": "G-6 Pd",
			"price": 42e4,
			"category": "Hematologi"
		},
		{
			"id": "asam-folat-metode-clia-33",
			"name": "Asam Folat (Metode CLIA)",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "agregasi-trombosit-tat-1transferin-1anti-trombin-34",
			"name": "Agregasi Trombosit (TAT) 1Transferin 1Anti Trombin 3 (AT3)",
			"price": 55e4,
			"category": "Hematologi"
		},
		{
			"id": "vitamin-b12-metode-clia-35",
			"name": "Vitamin B12 (Metode CLIA)",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "viskositas-darah-36",
			"name": "Viskositas Darah",
			"price": 35e4,
			"category": "Hematologi"
		},
		{
			"id": "anti-trombosit-37",
			"name": "Anti Trombosit",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "retikulosit-absolut-38",
			"name": "Retikulosit Absolut",
			"price": 1e5,
			"category": "Hematologi"
		},
		{
			"id": "malaria-rdt-antigen-39",
			"name": "Malaria (RDT) Antigen",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "ret-he-40",
			"name": "Ret-He",
			"price": 18e4,
			"category": "Hematologi"
		},
		{
			"id": "malaria-rapid-41",
			"name": "Malaria (Rapid)",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "ipf-42",
			"name": "IPF",
			"price": 24e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-lengkap-43",
			"name": "Protein Lengkap",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-total-44",
			"name": "Protein total",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "albumin-45",
			"name": "Albumin",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "bilirubin-46",
			"name": "Bilirubin",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "bilirubin-bayi-neonatus-47",
			"name": "Bilirubin Bayi/ Neonatus",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "sgot-48",
			"name": "Sgot",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "sgpt-49",
			"name": "Sgpt",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "alp-50",
			"name": "ALP",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "gamma-gt-51",
			"name": "Gamma GT",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "ldh-52",
			"name": "LDH",
			"price": 1e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "cholinesterase-53",
			"name": "Cholinesterase",
			"price": 14e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "elektroforesa-serum-protein-capillary-electropho-54",
			"name": "Elektroforesa Serum Protein (Capillary Electrophoresis)",
			"price": 4e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "asam-empedu-55",
			"name": "Asam empedu",
			"price": 15e5,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-sewaktu-56",
			"name": "Glukosa Sewaktu",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-puasa-57",
			"name": "Glukosa Puasa",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-2-jam-pp-58",
			"name": "Glukosa 2 jam PP",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "insulin-59",
			"name": "Insulin",
			"price": 4e5,
			"category": "Diabetes"
		},
		{
			"id": "kurva-harian-glukosa-60",
			"name": "Kurva Harian Glukosa",
			"price": 16e4,
			"category": "Diabetes"
		},
		{
			"id": "tes-toleransi-glukosa-gtt-61",
			"name": "Tes Toleransi Glukosa (GTT)",
			"price": 2e5,
			"category": "Diabetes"
		},
		{
			"id": "hb-a1c-62",
			"name": "Hb A1C",
			"price": 16e4,
			"category": "Diabetes"
		},
		{
			"id": "c-peptide-metode-clia-63",
			"name": "C - Peptide (METODE CLIA)",
			"price": 5e5,
			"category": "Diabetes"
		},
		{
			"id": "glycated-albumin-64",
			"name": "Glycated Albumin",
			"price": 32e4,
			"category": "Diabetes"
		},
		{
			"id": "resistensi-insulin-65",
			"name": "Resistensi Insulin",
			"price": 45e4,
			"category": "Jantung"
		},
		{
			"id": "ck-cpk-ck-nac-66",
			"name": "Ck/Cpk/Ck-Nac",
			"price": 25e4,
			"category": "Jantung"
		},
		{
			"id": "ck-mb-67",
			"name": "Ck-Mb",
			"price": 2e5,
			"category": "Jantung"
		},
		{
			"id": "ldh-jantung-68",
			"name": "LDH (Jantung)",
			"price": 15e4,
			"category": "Jantung"
		},
		{
			"id": "sgot-jantung-69",
			"name": "SGOT (Jantung)",
			"price": 45e3,
			"category": "Jantung"
		},
		{
			"id": "troponin-t-70",
			"name": "Troponin T",
			"price": 4e5,
			"category": "Jantung"
		},
		{
			"id": "hscrp-lpeita-71",
			"name": "hsCRP (LPEITA)",
			"price": 2e5,
			"category": "Jantung"
		},
		{
			"id": "troponin-i-72",
			"name": "Troponin I",
			"price": 35e4,
			"category": "Jantung"
		},
		{
			"id": "nt-pro-bnp-73",
			"name": "Nt-Pro Bnp",
			"price": 7e5,
			"category": "Lemak Darah"
		},
		{
			"id": "lemak-lengkap-74",
			"name": "Lemak Lengkap",
			"price": 2e5,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-total-75",
			"name": "Cholesterol Total",
			"price": 5e4,
			"category": "Lemak Darah"
		},
		{
			"id": "trigliserida-76",
			"name": "Trigliserida",
			"price": 5e4,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-hdl-direk-77",
			"name": "Cholesterol HDL (Direk)",
			"price": 55e3,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-ldl-78",
			"name": "Cholesterol LDL",
			"price": 55e3,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-ldl-direk-79",
			"name": "Cholesterol LDL (direk)",
			"price": 6e4,
			"category": "Lemak Darah"
		},
		{
			"id": "lp-a-80",
			"name": "Lp (a)",
			"price": 765e3,
			"category": "Lemak Darah"
		},
		{
			"id": "apo-b-81",
			"name": "Apo B",
			"price": 6e5,
			"category": "Lemak Darah"
		},
		{
			"id": "apo-a1-82",
			"name": "Apo A1",
			"price": 6e5,
			"category": "Lemak Darah"
		},
		{
			"id": "small-dense-ldl-83",
			"name": "Small Dense LDL",
			"price": 435e3,
			"category": "Lemak Darah"
		},
		{
			"id": "ureum-serum-plasma-84",
			"name": "Ureum (Serum/Plasma)",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "kreatinin-serum-plasma-85",
			"name": "Kreatinin (Serum/Plasma)",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "creatinin-clearence-86",
			"name": "Creatinin Clearence",
			"price": 15e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "ureum-clearence-87",
			"name": "Ureum Clearence",
			"price": 12e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "cystatin-c-metode-nefelometri-88",
			"name": "Cystatin C (Metode NEFELOMETRI)",
			"price": 4e5,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "protein-creatinin-rasio-89",
			"name": "Protein creatinin rasio",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-90",
			"name": "Natrium",
			"price": 9e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-91",
			"name": "Kalium",
			"price": 9e4,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-92",
			"name": "Chlorida",
			"price": 9e4,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-93",
			"name": "Calsium",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "fosfor-ip-94",
			"name": "Fosfor/IP",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "magnesium-95",
			"name": "Magnesium",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-urin-96",
			"name": "Natrium Urin",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-urin-97",
			"name": "Kalium Urin",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-urin-98",
			"name": "Chlorida Urin",
			"price": 15e4,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-ion-99",
			"name": "Calsium Ion",
			"price": 2e5,
			"category": "Elektrolit"
		},
		{
			"id": "keton-darah-b-hydroxybutyrate-100",
			"name": "Keton Darah (B- HYDROXYBUTYRATE)",
			"price": 2e5,
			"category": "Elektrolit"
		},
		{
			"id": "asam-laktat-101",
			"name": "Asam Laktat",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "elektrolit-natrium-kalium-chlorida-pancreas-102",
			"name": "ELEKTROLIT (Natrium, Kalium, Chlorida) PANCREAS",
			"price": 17e4,
			"category": "Elektrolit"
		},
		{
			"id": "amilase-darah-103",
			"name": "Amilase Darah",
			"price": 225e3,
			"category": "Elektrolit"
		},
		{
			"id": "lipase-darah-104",
			"name": "Lipase Darah",
			"price": 22e4,
			"category": "Urinalisa"
		},
		{
			"id": "urine-kolektor-dewasa-105",
			"name": "Urine Kolektor Dewasa",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "glukosa-106",
			"name": "Glukosa",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-107",
			"name": "Protein",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-kuantitatif-esbach-108",
			"name": "Protein Kuantitatif (ESBACH)",
			"price": 2e5,
			"category": "Urinalisa"
		},
		{
			"id": "ureum-urine-109",
			"name": "Ureum Urine",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "kreatinin-urine-110",
			"name": "Kreatinin Urine",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "mikroalbumin-urine-111",
			"name": "Mikroalbumin Urine",
			"price": 2e5,
			"category": "Urinalisa"
		},
		{
			"id": "osmolaritas-urin-test-narkoba-112",
			"name": "Osmolaritas Urin TEST NARKOBA",
			"price": 2e5,
			"category": "Urinalisa"
		},
		{
			"id": "amphetamin-sabu-sabu-ecstacy-113",
			"name": "Amphetamin (Sabu-sabu, Ecstacy)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "mariyuana-canabis-ganja-114",
			"name": "Mariyuana (Canabis, Ganja)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "ophium-morfin-heroin-putaw-115",
			"name": "Ophium (Morfin, Heroin, Putaw)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "benzodiazepim-116",
			"name": "Benzodiazepim",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "narkoba-3-parameter-117",
			"name": "Narkoba 3 parameter",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "barbiturat-118",
			"name": "Barbiturat",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "coccain-119",
			"name": "Coccain",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "methamphetamine-120",
			"name": "Methamphetamine",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "k2-sintetik-mariyuana-121",
			"name": "K2 (Sintetik Mariyuana)",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "tramadol-122",
			"name": "Tramadol",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "amoniak-123",
			"name": "Amoniak",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kehamilan-rapide-124",
			"name": "Tes Kehamilan Rapide",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "beta-h-cg-kuantitatif-urine-125",
			"name": "Beta h CG Kuantitatif (Urine)",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kehamilan-titer-sens-25-miu-ml-126",
			"name": "Tes Kehamilan Titer (Sens.25 mIU/mL)",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "acr-albumin-to-creatinine-ratio-127",
			"name": "ACR (Albumin-to- Creatinine Ratio)",
			"price": 2e5,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kehamilan-titer-faeces-128",
			"name": "Tes Kehamilan Titer FAECES",
			"price": 4e5,
			"category": "Urinalisa"
		},
		{
			"id": "faeces-lengkap-129",
			"name": "Faeces Lengkap",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "gram-faeces-130",
			"name": "Gram Faeces",
			"price": 12e4,
			"category": "Urinalisa"
		},
		{
			"id": "darah-samar-131",
			"name": "Darah Samar",
			"price": 9e4,
			"category": "Urinalisa"
		},
		{
			"id": "laktosa-intolerans-132",
			"name": "Laktosa Intolerans",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "benzidine-tes-133",
			"name": "Benzidine Tes",
			"price": 95e3,
			"category": "Urinalisa"
		},
		{
			"id": "m2-pk-cairan-tubuh-analisa-cairan-pericard-134",
			"name": "M2-Pk Cairan Tubuh Analisa Cairan Pericard",
			"price": 98e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-135",
			"name": "Analisa Cairan",
			"price": 3e5,
			"category": "Jantung"
		},
		{
			"id": "analisa-sperma-analisa-cairan-pleura-136",
			"name": "Analisa Sperma Analisa Cairan Pleura",
			"price": 17e4,
			"category": "Jantung"
		},
		{
			"id": "ada-adenosin-deaminase-137",
			"name": "ADA (Adenosin Deaminase)",
			"price": 5e5,
			"category": "Jantung"
		},
		{
			"id": "analisa-cairan-pleura-138",
			"name": "Analisa Cairan Pleura",
			"price": 3e5,
			"category": "Jantung"
		},
		{
			"id": "analisa-sekret-vagina-139",
			"name": "Analisa Sekret Vagina",
			"price": 17e4,
			"category": "Jantung"
		},
		{
			"id": "analisa-batu-ginjal-140",
			"name": "Analisa Batu Ginjal",
			"price": 45e4,
			"category": "Jantung"
		},
		{
			"id": "analisa-cairan-otak-lcs-141",
			"name": "Analisa Cairan Otak (Lcs)",
			"price": 35e4,
			"category": "Jantung"
		},
		{
			"id": "analisa-cairan-acites-142",
			"name": "Analisa Cairan Acites",
			"price": 3e5,
			"category": "Jantung"
		},
		{
			"id": "analisa-cairan-sendi-immunoserologi-143",
			"name": "Analisa Cairan Sendi Immunoserologi",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "cd-4-144",
			"name": "Cd 4",
			"price": 38e4,
			"category": "Imunoserologi"
		},
		{
			"id": "widal-145",
			"name": "Widal",
			"price": 9e4,
			"category": "Imunoserologi"
		},
		{
			"id": "salmonela-typhi-146",
			"name": "Salmonela Typhi",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "vdrl-147",
			"name": "Vdrl",
			"price": 8e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tpha-148",
			"name": "Tpha",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-metode-eclia-149",
			"name": "HBs Ag (Metode Eclia)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbs-metode-eclia-150",
			"name": "Anti HBs (Metode Eclia)",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbc-metode-clia-151",
			"name": "Anti HBc (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbc-igm-152",
			"name": "Anti HBc IgM",
			"price": 8e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hbe-ag-metode-clia-153",
			"name": "HBe Ag (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbe-metode-clia-154",
			"name": "Anti HBe (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-total-155",
			"name": "Anti HAV Total",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-igm-metode-clia-156",
			"name": "Anti HAV IgM (Metode CLIA)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-metode-rapid-157",
			"name": "Anti HCV (Metode Rapid)",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-igm-158",
			"name": "Anti HCV IgM",
			"price": 955e3,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-antigen-antibodi-metode-eclia-159",
			"name": "HIV Antigen, Antibodi (Metode Eclia)",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "cd-8-160",
			"name": "Cd 8",
			"price": 5e5,
			"category": "Imunoserologi"
		},
		{
			"id": "rheumatoid-factor-metode-nefelometri-161",
			"name": "Rheumatoid Factor (Metode NEFELOMETRI)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "asto-metode-nefelometri-162",
			"name": "ASTO (Metode NEFELOMETRI)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "crp-metode-lpeita-163",
			"name": "CRP (Metode LPEITA)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "c3-komplemen-metode-nefelometri-164",
			"name": "C3 Komplemen (Metode Nefelometri)",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "c4-komplemen-metode-nefelometri-165",
			"name": "C4 Komplemen (Metode Nefelometri)",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-g-166",
			"name": "Ig G",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-m-167",
			"name": "Ig M",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-a-168",
			"name": "Ig A",
			"price": 8e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ige-total-metode-eclia-169",
			"name": "IgE Total (Metode ECLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "ige-spesifik-atopy-170",
			"name": "IgE Spesifik (Atopy)",
			"price": 15e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-ccp-metode-elisa-171",
			"name": "Anti CCP (Metode ELISA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "dengue-igg-igm-172",
			"name": "DENGUE IgG/ IgM",
			"price": 17e4,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-total-metode-rapid-173",
			"name": "Helicobacter Total (Metode Rapid)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-pylori-igg-174",
			"name": "Helicobacter Pylori IgG",
			"price": 12e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-pylori-igm-175",
			"name": "Helicobacter Pylori IgM",
			"price": 12e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-faeces-176",
			"name": "Helicobacter Faeces",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cardiolipin-aca-igg-177",
			"name": "Anti-Cardiolipin/ACA IgG",
			"price": 6e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cardiolipin-aca-igm-178",
			"name": "Anti-Cardiolipin/ACA IgM",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "ana-if-179",
			"name": "Ana If",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-ds-dna-metode-clia-180",
			"name": "Anti ds-DNA (Metode CLIA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "test-ige-spesifik-181",
			"name": "Test IgE Spesifik",
			"price": 15e5,
			"category": "Imunoserologi"
		},
		{
			"id": "dengue-ns1-ag-182",
			"name": "Dengue NS1 Ag",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-metode-elfa-183",
			"name": "HBs Ag (Metode ELFA)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-metode-clia-184",
			"name": "Anti HCV (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "sypilis-rapid-185",
			"name": "Sypilis (Rapid)",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anca-if-186",
			"name": "Anca If",
			"price": 72e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-tb-187",
			"name": "Anti TB",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "crp-kuantitatif-188",
			"name": "CRP Kuantitatif",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "procalcitonin-pct-189",
			"name": "Procalcitonin (PCT)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ana-profile-190",
			"name": "ANA Profile",
			"price": 13e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hiv-rapid-191",
			"name": "Anti HIV (Rapid)",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "rapid-antigen-covid-19-192",
			"name": "Rapid Antigen Covid-19",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-sars-cov-2-kuantitatif-193",
			"name": "Anti SARS-CoV-2 Kuantitatif",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-rna-kuantitatif-metode-pcr-194",
			"name": "HIV RNA KUANTITATIF (Metode PCR)",
			"price": 95e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-metode-elfa-1shbg-metode-eclia-195",
			"name": "Anti HCV (Metode ELFA) 1SHBG (METODE ECLIA)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hbsag-kuantitatif-196",
			"name": "HBsAg Kuantitatif",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-tpo-metode-clia-197",
			"name": "ANTI-TPO (Metode CLIA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "il-6-1tpo-198",
			"name": "Il 6 1Tpo",
			"price": 65e4,
			"category": "Imunoserologi"
		},
		{
			"id": "trab-metode-clia-199",
			"name": "TRAb (Metode CLIA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-ig-m-rapid-200",
			"name": "Anti HAV Ig M (Rapid)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hpv-dna-genotyping-201",
			"name": "HPV DNA Genotyping",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ige-spesifik-protia-202",
			"name": "IgE Spesifik Protia",
			"price": 15e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ige-spesifik-pediatric-203",
			"name": "IgE Spesifik Pediatric",
			"price": 15e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-rapid-204",
			"name": "HBs Ag (Rapid)",
			"price": 7e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbeag-metode-clia-205",
			"name": "HBeAg (Metode CLIA)",
			"price": 45e4,
			"category": "Imunoserologi"
		},
		{
			"id": "leptrospira-1anti-aquaporin-4-metode-if-206",
			"name": "Leptrospira 1Anti-Aquaporin 4 (Metode IF)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "chikungunya-igg-igm-207",
			"name": "Chikungunya IgG/IgM",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tubex-tf-208",
			"name": "Tubex Tf",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-beta-2-glikoprotein-1-209",
			"name": "Anti Beta-2 Glikoprotein 1",
			"price": 17e5,
			"category": "Imunoserologi"
		},
		{
			"id": "beta-2-glikoprotein-igg-210",
			"name": "Beta 2 Glikoprotein IgG",
			"price": 154e4,
			"category": "Imunoserologi"
		},
		{
			"id": "beta-2-glikoprotein-igm-211",
			"name": "Beta 2 Glikoprotein IgM",
			"price": 154e4,
			"category": "Imunoserologi"
		},
		{
			"id": "vitamin-d-25-oh-total-eclia-torch-chlamydia-212",
			"name": "Vitamin D 25-OH Total (ECLIA) TORCH & CHLAMYDIA",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igg-metode-elfa-213",
			"name": "Anti Toxoplasma IgG (Metode ELFA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igg-metode-clia-214",
			"name": "Anti Toxoplasma IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igm-metode-clia-215",
			"name": "Anti Toxoplasma IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-rubella-igg-metode-clia-216",
			"name": "Anti Rubella IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-rubella-igm-metode-clia-217",
			"name": "Anti Rubella IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igg-metode-clia-218",
			"name": "Anti CMV IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igm-metode-clia-219",
			"name": "Anti CMV IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igg-metode-elisa-220",
			"name": "Anti HSV I IgG (Metode ELISA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igm-metode-clia-221",
			"name": "Anti HSV I IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igg-metode-elisa-222",
			"name": "Anti HSV II IgG (Metode ELISA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igm-metode-clia-223",
			"name": "Anti HSV II IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igg-metode-clia-224",
			"name": "Anti HSV II IgG (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-chlamydia-lgg-metode-elisa-225",
			"name": "Anti Chlamydia lgG (Metode ELISA)",
			"price": 12e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-chlamydia-lgm-metode-elisa-226",
			"name": "Anti Chlamydia lgM (Metode ELISA)",
			"price": 12e5,
			"category": "Imunoserologi"
		},
		{
			"id": "cmv-lgg-aviditas-metode-clia-227",
			"name": "CMV lgG Aviditas (Metode CLIA)",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-rubella-igm-eclia-228",
			"name": "Anti Rubella IgM (ECLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igm-metode-elfa-229",
			"name": "Anti Toxoplasma IgM (Metode ELFA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igm-metode-elfa-230",
			"name": "Anti CMV IgM (Metode ELFA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igm-metode-elisa-231",
			"name": "Anti HSV I IgM (Metode ELISA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igm-metode-elisa-232",
			"name": "Anti HSV II IgM (Metode ELISA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "toxoplasma-igg-aviditas-metode-elfa-233",
			"name": "Toxoplasma IgG Aviditas (Metode ELFA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igg-clia-234",
			"name": "Anti HSV I IgG (CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "homocystein-235",
			"name": "Homocystein",
			"price": 1102e3,
			"category": "Hormon"
		},
		{
			"id": "prolaktin-metode-clia-236",
			"name": "Prolaktin (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "beta-hcg-kuantitatif-metode-eclia-237",
			"name": "Beta HCG Kuantitatif (Metode ECLIA)",
			"price": 4e5,
			"category": "Hormon"
		},
		{
			"id": "cortisol-metode-clia-238",
			"name": "Cortisol (Metode CLIA)",
			"price": 4e5,
			"category": "Hormon"
		},
		{
			"id": "growth-hormon-excersice-239",
			"name": "Growth Hormon Excersice",
			"price": 93e4,
			"category": "Hormon"
		},
		{
			"id": "amh-clia-240",
			"name": "Amh (Clia)",
			"price": 8e5,
			"category": "Hormon"
		},
		{
			"id": "thyroglobulin-antibody-clia-241",
			"name": "Thyroglobulin Antibody (CLIA)",
			"price": 5e5,
			"category": "Hormon"
		},
		{
			"id": "igf-1-somatomedin-eia-242",
			"name": "IGF-1 Somatomedin (EIA)",
			"price": 15e5,
			"category": "Hormon"
		},
		{
			"id": "cortisol-darah-clia-243",
			"name": "Cortisol Darah (CLIA)",
			"price": 5e5,
			"category": "Hormon"
		},
		{
			"id": "free-psa-clia-244",
			"name": "Free PSA (CLIA)",
			"price": 7e5,
			"category": "Hormon"
		},
		{
			"id": "t3-metode-clia-245",
			"name": "T3 (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "t4-metode-clia-246",
			"name": "T4 (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "tshs-metode-clia-247",
			"name": "TSHs (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "free-t3-metode-clia-248",
			"name": "Free T3 (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "tiroglobulin-metode-clia-249",
			"name": "Tiroglobulin (Metode CLIA)",
			"price": 6e5,
			"category": "Hormon"
		},
		{
			"id": "t3-bayi-anak-metode-clia-250",
			"name": "T3 Bayi/anak (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "t4-bayi-anak-metode-clia-251",
			"name": "T4 Bayi/Anak (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "free-t4-metode-clia-252",
			"name": "Free T4 (Metode CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "tshs-neonatus-anak-metode-clia-253",
			"name": "TSHs Neonatus/Anak (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "free-t4-bayi-anak-metode-clia-254",
			"name": "Free T4 Bayi/Anak (Metode CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "pth-ipth-255",
			"name": "Pth/Ipth",
			"price": 12e5,
			"category": "Hormon"
		},
		{
			"id": "fsh-metode-clia-256",
			"name": "FSH (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "lh-metode-clia-257",
			"name": "LH (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "estradiol-metode-clia-258",
			"name": "Estradiol (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "progesteron-metode-clia-259",
			"name": "Progesteron (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "testosteron-metode-clia-260",
			"name": "Testosteron (Metode CLIA)",
			"price": 35e4,
			"category": "Tumor Marker"
		},
		{
			"id": "roma-he4-261",
			"name": "Roma-He4",
			"price": 13e5,
			"category": "Tumor Marker"
		},
		{
			"id": "afp-metode-clia-262",
			"name": "AFP (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "cea-metode-clia-263",
			"name": "CEA (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-19-9-metode-clia-264",
			"name": "CA 19-9 (Metode CLIA)",
			"price": 75e4,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-125-metode-eclia-265",
			"name": "CA 125 (Metode ECLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "psa-metode-clia-266",
			"name": "PSA (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-15-3-metode-clia-267",
			"name": "CA 15-3 (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "nse-paru-268",
			"name": "NSE (Paru)",
			"price": 88e4,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-72-4-269",
			"name": "Ca 72-4",
			"price": 85e4,
			"category": "Tumor Marker"
		},
		{
			"id": "scc-servix-270",
			"name": "SCC (Servix)",
			"price": 75e4,
			"category": "Tumor Marker"
		},
		{
			"id": "cifra-21-1-direk-271",
			"name": "Cifra 21.1 Direk",
			"price": 8e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "sekret-uretra-272",
			"name": "Sekret Uretra",
			"price": 17e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sekret-mata-273",
			"name": "Sekret mata",
			"price": 17e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-274",
			"name": "BTA Sputum",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-sps-275",
			"name": "BTA Sputum SPS",
			"price": 21e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-3x-276",
			"name": "BTA Sputum (3X)",
			"price": 21e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-kulit-lepra-277",
			"name": "BTA Kulit (Lepra)",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "jamur-278",
			"name": "Jamur",
			"price": 1e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "dipteri-279",
			"name": "Dipteri",
			"price": 25e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "filaria-280",
			"name": "Filaria",
			"price": 1e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-feses-281",
			"name": "BTA Feses",
			"price": 7e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-1x-282",
			"name": "BTA Sputum 1x",
			"price": 7e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-2x-283",
			"name": "BTA Sputum 2x",
			"price": 14e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sediaan-langsung-gram-284",
			"name": "Sediaan Langsung Gram",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "pewarnaan-gram-285",
			"name": "Pewarnaan Gram",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "igra-tb-quantiferon-286",
			"name": "IGRA-TB (Quantiferon)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hbv-dna-kuantitatif-pcr-287",
			"name": "Hbv Dna Kuantitatif (Pcr)",
			"price": 12e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hcv-rna-kuantitatif-288",
			"name": "HCV RNA Kuantitatif",
			"price": 23e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hiv-1-rna-vl-pcr-289",
			"name": "Hiv-1 Rna Vl (Pcr)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "rt-pcr-sars-cov-2-290",
			"name": "RT PCR SARS-CoV-2",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hpv-dna-screening-pcr-291",
			"name": "HPV DNA Screening (PCR)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hbv-dna-292",
			"name": "Hbv Dna",
			"price": 12e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-ct-ng-293",
			"name": "Pcr Ct Ng",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-salmonella-typhi-294",
			"name": "PCR Salmonella Typhi",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-mtb-sputum-rt-pcr-295",
			"name": "PCR MTB Sputum (RT- PCR)",
			"price": 95e4,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-tb-sputum-296",
			"name": "PCR TB Sputum",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "tcm-sputum-tb-297",
			"name": "TCM Sputum TB",
			"price": 14e5,
			"category": "Biomolekuler"
		},
		{
			"id": "nipt-298",
			"name": "Nipt",
			"price": 5e6,
			"category": "Biomolekuler"
		},
		{
			"id": "tcm-tb-kultur-resistensi-299",
			"name": "Tcm-Tb Kultur Resistensi",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-darah-300",
			"name": "Kultur DARAH",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-urine-301",
			"name": "Kultur URINE",
			"price": 47e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-faeces-302",
			"name": "Kultur FAECES",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "rectal-swab-303",
			"name": "Rectal Swab",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-bta-304",
			"name": "Kultur BTA",
			"price": 16e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-sputum-non-bta-305",
			"name": "Kultur SPUTUM NON BTA",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-hapus-tenggorok-306",
			"name": "Kultur HAPUS TENGGOROK",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-pus-307",
			"name": "Kultur PUS",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-sekret-vagina-308",
			"name": "Kultur SEKRET VAGINA",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-cairan-tubuh-lain-309",
			"name": "Kultur CAIRAN TUBUH LAIN",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-jaringan-310",
			"name": "Kultur Jaringan",
			"price": 45e4,
			"category": "Biomolekuler"
		},
		{
			"id": "swab-dubur-311",
			"name": "Swab Dubur",
			"price": 7e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-jamur-patologi-anatomi-312",
			"name": "Kultur Jamur PATOLOGI ANATOMI",
			"price": 85e4,
			"category": "Biomolekuler"
		},
		{
			"id": "pap-smear-313",
			"name": "Pap Smear",
			"price": 37e4,
			"category": "Biomolekuler"
		},
		{
			"id": "sitologi-cairan-314",
			"name": "Sitologi Cairan",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "histopatologi-jaringan-5-cm-315",
			"name": "HISTOPATOLOGI JARINGAN (<5 cm)",
			"price": 47e4,
			"category": "Biomolekuler"
		},
		{
			"id": "histopatologi-jaringan-5-cm-316",
			"name": "HISTOPATOLOGI JARINGAN (≥5 cm)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pa-prostat-lain-lain-317",
			"name": "PA Prostat LAIN-LAIN",
			"price": 55e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-schedel-318",
			"name": "RO Schedel",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-sinus-paranasal-3-319",
			"name": "RO Sinus Paranasal (3)",
			"price": 34e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-waters-320",
			"name": "RO Waters",
			"price": 15e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-mastoid-321",
			"name": "RO Mastoid",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-nasal-bone-322",
			"name": "RO Nasal Bone",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-tmj-323",
			"name": "Ro Tmj",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-mandibula-2x-324",
			"name": "RO Mandibula (2x)",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-pa-325",
			"name": "RO Thorax PA",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-pa-lat-326",
			"name": "RO Thorax PA + LAT",
			"price": 29e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cervical-ap-lat-327",
			"name": "RO Cervical AP + LAT",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cervical-ap-lat-obl-328",
			"name": "RO Cervical AP + LAT + OBL",
			"price": 47e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-329",
			"name": "RO Thoracal AP + LAT",
			"price": 28e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-obl-330",
			"name": "RO Thoracal AP + LAT + OBL",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-331",
			"name": "RO Thoraco Lumbal AP + LAT",
			"price": 34e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-obl-332",
			"name": "RO Thoraco Lumbal AP + LAT + OBL",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-333",
			"name": "RO Lumbal AP + LAT",
			"price": 34e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-obl-334",
			"name": "RO Lumbal AP + LAT + OBL",
			"price": 51e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-335",
			"name": "RO Lumbo Sacral AP + LAT",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-obl-336",
			"name": "RO Lumbo Sacral AP + LAT + OBL",
			"price": 51e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-bno-abdomen-337",
			"name": "RO BNO (Abdomen)",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-abdomen-3-pss-338",
			"name": "RO Abdomen 3 PSS",
			"price": 46e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-pelvis-339",
			"name": "RO Pelvis",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-ap-340",
			"name": "RO Thorax AP",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-clavicula-341",
			"name": "RO Clavicula",
			"price": 16e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-scapula-342",
			"name": "RO Scapula",
			"price": 16e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-shoulder-3-posisi-343",
			"name": "RO Shoulder 3 Posisi",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-humerus-344",
			"name": "RO Humerus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cubiti-345",
			"name": "RO Cubiti",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-antebrachi-346",
			"name": "RO Antebrachi",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-wrist-347",
			"name": "RO Wrist",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-manus-348",
			"name": "RO Manus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-digiti-349",
			"name": "RO Digiti",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-femur-350",
			"name": "RO Femur",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-genu-351",
			"name": "RO Genu",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cruris-352",
			"name": "RO Cruris",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-ankle-353",
			"name": "RO Ankle",
			"price": 22e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-pedis-354",
			"name": "RO Pedis",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-calceneus-355",
			"name": "RO Calceneus",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-coxigis-356",
			"name": "RO Coxigis",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-top-lordotik-357",
			"name": "RO Thorax Top Lordotik",
			"price": 16e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-shoulder-ap-lat-358",
			"name": "RO Shoulder AP + Lat",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-dental-359",
			"name": "RO Dental",
			"price": 1e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-sacrum-usg-360",
			"name": "RO Sacrum USG",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-doppler-361",
			"name": "USG Abdomen + doppler",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-inguinal-362",
			"name": "USG Inguinal",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-soft-tissue-363",
			"name": "USG Soft Tissue",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-colli-364",
			"name": "USG Colli",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-bawah-365",
			"name": "USG Abdomen Bawah",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-lengkap-366",
			"name": "USG Abdomen Lengkap",
			"price": 43e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-axilla-367",
			"name": "USG Axilla",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-prostat-368",
			"name": "USG Prostat",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-tyroid-369",
			"name": "USG Tyroid",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-testis-370",
			"name": "USG Testis",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-thoraks-371",
			"name": "USG Thoraks",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-appendiks-372",
			"name": "USG Appendiks",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-payudara-373",
			"name": "USG Payudara",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "usg-inguinal-doppler-374",
			"name": "USG Inguinal + doppler",
			"price": 5e5,
			"category": "Rontgen"
		},
		{
			"id": "ekg-375",
			"name": "EKG",
			"price": 1e5,
			"category": "Rontgen"
		},
		{
			"id": "audiometri-lain-lain-376",
			"name": "Audiometri Lain-Lain",
			"price": 1e5,
			"category": "Rontgen"
		},
		{
			"id": "lupus-anti-coagulant-377",
			"name": "Lupus Anti Coagulant",
			"price": 885e3,
			"category": "Rontgen"
		},
		{
			"id": "asam-urat-darah-378",
			"name": "Asam Urat Darah",
			"price": 45e3,
			"category": "Rontgen"
		},
		{
			"id": "fecal-calprotectin-379",
			"name": "Fecal Calprotectin",
			"price": 75e4,
			"category": "Rontgen"
		},
		{
			"id": "analisa-faeces-gastro-380",
			"name": "Analisa Faeces Gastro",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "ada-381",
			"name": "ADA",
			"price": 55e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-genu-382",
			"name": "Analisa Cairan Genu",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sekret-vulva-383",
			"name": "Analisa Sekret Vulva",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "vaksin-hepatitis-b-384",
			"name": "Vaksin Hepatitis B",
			"price": 21e4,
			"category": "Urinalisa"
		},
		{
			"id": "tes-buta-warna-385",
			"name": "Tes Buta Warna",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "lpk-fisik-386",
			"name": "LPK - Fisik",
			"price": 7e4,
			"category": "Urinalisa"
		},
		{
			"id": "mppi-387",
			"name": "Mppi",
			"price": 35e4,
			"category": "Urinalisa"
		}
	],
	rangkas: [
		{
			"id": "bayi-0",
			"name": "(Bayi)",
			"price": 9e4,
			"category": "Hematologi"
		},
		{
			"id": "retikulosit-1",
			"name": "Retikulosit",
			"price": 12e4,
			"category": "Hematologi"
		},
		{
			"id": "viskositas-darah-metode-oswald-2",
			"name": "VISKOSITAS DARAH (Metode OSWALD)",
			"price": 35e4,
			"category": "Hematologi"
		},
		{
			"id": "haemoglobin-3",
			"name": "Haemoglobin",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "hematokrit-4",
			"name": "Hematokrit",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "leukosit-5",
			"name": "Leukosit",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "trombosit-6",
			"name": "Trombosit",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "eritrosit-7",
			"name": "Eritrosit",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "led-8",
			"name": "LED",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "limposit-plasma-biru-9",
			"name": "Limposit Plasma Biru",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "total-eosinofil-10",
			"name": "Total Eosinofil",
			"price": 75e3,
			"category": "Hematologi"
		},
		{
			"id": "mcv-11",
			"name": "MCV",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "mch-12",
			"name": "MCH",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "mchc-13",
			"name": "Mchc",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "golongan-darah-rhesus-14",
			"name": "Golongan Darah + Rhesus",
			"price": 5e4,
			"category": "Hematologi"
		},
		{
			"id": "malaria-15",
			"name": "Malaria",
			"price": 1e5,
			"category": "Hematologi"
		},
		{
			"id": "masa-pendarahan-16",
			"name": "Masa Pendarahan",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "masa-pembekuan-17",
			"name": "Masa Pembekuan",
			"price": 4e4,
			"category": "Hematologi"
		},
		{
			"id": "masa-protrombin-pt-18",
			"name": "Masa Protrombin (PT)",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "inr-19",
			"name": "INR",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "aptt-20",
			"name": "Aptt",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "fibrinogen-21",
			"name": "Fibrinogen",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "d-dimer-22",
			"name": "D - Dimer",
			"price": 35e4,
			"category": "Hematologi"
		},
		{
			"id": "sel-le-23",
			"name": "Sel LE",
			"price": 16e4,
			"category": "Hematologi"
		},
		{
			"id": "elektroforesa-hemoglobin-24",
			"name": "Elektroforesa Hemoglobin",
			"price": 76e4,
			"category": "Hematologi"
		},
		{
			"id": "serum-iron-si-25",
			"name": "Serum Iron (Si)",
			"price": 12e4,
			"category": "Hematologi"
		},
		{
			"id": "tibc-26",
			"name": "Tibc",
			"price": 16e4,
			"category": "Hematologi"
		},
		{
			"id": "ferritin-eclia-27",
			"name": "Ferritin (ECLIA)",
			"price": 3e5,
			"category": "Hematologi"
		},
		{
			"id": "malaria-rdt-antigen-28",
			"name": "Malaria (RDT) Antigen",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "substitusi-test-29",
			"name": "Substitusi Test",
			"price": 6e5,
			"category": "Hematologi"
		},
		{
			"id": "coomb-s-test-30",
			"name": "Coomb's test",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "g-6-pd-31",
			"name": "G-6 Pd",
			"price": 42e4,
			"category": "Hematologi"
		},
		{
			"id": "asam-folat-metode-clia-32",
			"name": "Asam Folat (Metode CLIA)",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "agregasi-trombosit-tat-1transferin-33",
			"name": "Agregasi Trombosit (TAT) 1Transferin",
			"price": 65e4,
			"category": "Hematologi"
		},
		{
			"id": "vitamin-b12-clia-1protein-s-1protein-c-34",
			"name": "Vitamin B12 (CLIA) 1Protein S 1Protein C",
			"price": 5e5,
			"category": "Hematologi"
		},
		{
			"id": "antibodi-trombosit-35",
			"name": "Antibodi Trombosit",
			"price": 2e5,
			"category": "Hematologi"
		},
		{
			"id": "morfologi-36",
			"name": "Morfologi",
			"price": 15e4,
			"category": "Hematologi"
		},
		{
			"id": "ipf-immature-platelet-fraction-37",
			"name": "IPF/Immature Platelet Fraction",
			"price": 24e4,
			"category": "Hematologi"
		},
		{
			"id": "lupus-antikoagulan-38",
			"name": "Lupus Antikoagulan",
			"price": 885e3,
			"category": "Hematologi"
		},
		{
			"id": "protein-lengkap-39",
			"name": "Protein Lengkap",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "protein-total-40",
			"name": "Protein total",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "albumin-1globulin-41",
			"name": "Albumin 1Globulin",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "bilirubin-42",
			"name": "Bilirubin",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "bilirubin-bayi-43",
			"name": "Bilirubin (Bayi)",
			"price": 12e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "sgot-44",
			"name": "Sgot",
			"price": 5e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "sgpt-45",
			"name": "Sgpt",
			"price": 55e3,
			"category": "Fungsi Hati"
		},
		{
			"id": "alkali-fosfatase-46",
			"name": "Alkali Fosfatase",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "gamma-gt-47",
			"name": "Gamma GT",
			"price": 6e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "ldh-serum-plasma-48",
			"name": "LDH (Serum/Plasma)",
			"price": 1e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "cholinesterase-49",
			"name": "Cholinesterase",
			"price": 14e4,
			"category": "Fungsi Hati"
		},
		{
			"id": "elektroforesa-serum-protein-capillary-electropho-50",
			"name": "Elektroforesa Serum Protein (Capillary Electrophoreses)",
			"price": 4e5,
			"category": "Fungsi Hati"
		},
		{
			"id": "beta-2-globulin-elp-1asam-empedu-serum-51",
			"name": "Beta 2 Globulin (ELP) 1Asam Empedu (Serum)",
			"price": 18e5,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-sewaktu-52",
			"name": "Glukosa Sewaktu",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-puasa-53",
			"name": "Glukosa Puasa",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-2-jam-pp-54",
			"name": "Glukosa 2 jam PP",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "kurva-harian-glukosa-55",
			"name": "Kurva Harian Glukosa",
			"price": 18e4,
			"category": "Diabetes"
		},
		{
			"id": "tes-toleransi-glukosa-gtt-56",
			"name": "Tes Toleransi Glukosa (GTT)",
			"price": 2e5,
			"category": "Diabetes"
		},
		{
			"id": "hb-a1c-57",
			"name": "Hb A1C",
			"price": 16e4,
			"category": "Diabetes"
		},
		{
			"id": "glukosa-sewaktu-cito-58",
			"name": "Glukosa Sewaktu Cito",
			"price": 4e4,
			"category": "Diabetes"
		},
		{
			"id": "glycated-albumin-59",
			"name": "Glycated Albumin",
			"price": 32e4,
			"category": "Diabetes"
		},
		{
			"id": "c-peptide-metode-clia-60",
			"name": "C - Peptide (Metode CLIA)",
			"price": 5e5,
			"category": "Diabetes"
		},
		{
			"id": "insulin-puasa-eclia-61",
			"name": "Insulin Puasa (ECLIA)",
			"price": 4e5,
			"category": "Jantung"
		},
		{
			"id": "ck-cpk-62",
			"name": "Ck/ Cpk",
			"price": 15e4,
			"category": "Jantung"
		},
		{
			"id": "ck-mb-63",
			"name": "Ck-Mb",
			"price": 2e5,
			"category": "Jantung"
		},
		{
			"id": "ldh-64",
			"name": "LDH",
			"price": 1e5,
			"category": "Jantung"
		},
		{
			"id": "hs-troponin-i-clia-65",
			"name": "hs-Troponin I (CLIA)",
			"price": 35e4,
			"category": "Jantung"
		},
		{
			"id": "troponin-t-1homocystein-66",
			"name": "Troponin T 1Homocystein",
			"price": 35e4,
			"category": "Jantung"
		},
		{
			"id": "nt-pro-bnp-67",
			"name": "NT-Pro BNP",
			"price": 7e5,
			"category": "Jantung"
		},
		{
			"id": "troponin-i-68",
			"name": "Troponin I",
			"price": 35e4,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-total-69",
			"name": "Cholesterol Total",
			"price": 5e4,
			"category": "Lemak Darah"
		},
		{
			"id": "trigliserida-70",
			"name": "Trigliserida",
			"price": 5e4,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-hdl-direk-71",
			"name": "Cholesterol HDL (Direk)",
			"price": 55e3,
			"category": "Lemak Darah"
		},
		{
			"id": "cholesterol-ldl-direk-72",
			"name": "Cholesterol LDL (Direk)",
			"price": 6e4,
			"category": "Lemak Darah"
		},
		{
			"id": "lemak-lengkap-73",
			"name": "Lemak Lengkap",
			"price": 2e5,
			"category": "Lemak Darah"
		},
		{
			"id": "lp-a-74",
			"name": "Lp (a)",
			"price": 78e4,
			"category": "Lemak Darah"
		},
		{
			"id": "apo-a-1-1lipid-total-75",
			"name": "Apo A-1 1Lipid Total",
			"price": 6e5,
			"category": "Lemak Darah"
		},
		{
			"id": "apo-b-76",
			"name": "Apo B",
			"price": 6e5,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "ureum-serum-plasma-77",
			"name": "Ureum (Serum/Plasma)",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "kreatinin-serum-plasma-78",
			"name": "Kreatinin (Serum/Plasma)",
			"price": 5e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "ureum-clearence-79",
			"name": "Ureum Clearence",
			"price": 18e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "creatinin-clearence-80",
			"name": "Creatinin Clearence",
			"price": 18e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "cystatin-c-nefelometri-81",
			"name": "Cystatin C (Nefelometri)",
			"price": 45e4,
			"category": "Fungsi Ginjal"
		},
		{
			"id": "protein-creatinin-ratio-urine-82",
			"name": "Protein-Creatinin Ratio (Urine)",
			"price": 35e4,
			"category": "Elektrolit"
		},
		{
			"id": "asam-laktat-darah-83",
			"name": "Asam Laktat (Darah)",
			"price": 5e5,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-84",
			"name": "Natrium",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-85",
			"name": "Kalium",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-86",
			"name": "Chlorida",
			"price": 8e4,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-87",
			"name": "Calsium",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "elektrolit-3-test-natrium-kalium-chlorida-88",
			"name": "Elektrolit 3 Test (Natrium, Kalium, Chlorida)",
			"price": 17e4,
			"category": "Elektrolit"
		},
		{
			"id": "natrium-urine-89",
			"name": "Natrium Urine",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "kalium-urine-90",
			"name": "Kalium Urine",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "chlorida-urine-91",
			"name": "Chlorida Urine",
			"price": 12e4,
			"category": "Elektrolit"
		},
		{
			"id": "fosfor-92",
			"name": "Fosfor",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "magnesium-93",
			"name": "Magnesium",
			"price": 1e5,
			"category": "Elektrolit"
		},
		{
			"id": "calsium-ion-pancreas-94",
			"name": "Calsium Ion PANCREAS",
			"price": 3e5,
			"category": "Elektrolit"
		},
		{
			"id": "amilase-darah-95",
			"name": "Amilase Darah",
			"price": 225e3,
			"category": "Elektrolit"
		},
		{
			"id": "lipase-darah-96",
			"name": "Lipase Darah",
			"price": 225e3,
			"category": "Urinalisa"
		},
		{
			"id": "urine-kolektor-dewasa-97",
			"name": "Urine Kolektor Dewasa",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "glukosa-urine-98",
			"name": "Glukosa Urine",
			"price": 3e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-urine-99",
			"name": "Protein Urine",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "bilirubin-urine-100",
			"name": "Bilirubin Urine",
			"price": 4e4,
			"category": "Urinalisa"
		},
		{
			"id": "protein-urine-bence-jones-101",
			"name": "Protein Urine Bence Jones",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "protein-kuantitatif-urine-102",
			"name": "Protein Kuantitatif Urine",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "ureum-urine-103",
			"name": "Ureum Urine",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "kreatinin-urine-104",
			"name": "Kreatinin Urine",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "mikroalbumin-creatinin-ratio-nefelometri-test-na-105",
			"name": "Mikroalbumin/Creatinin Ratio (Nefelometri) TEST NARKOBA",
			"price": 2e5,
			"category": "Urinalisa"
		},
		{
			"id": "amphetamin-sabu-sabu-ectacy-106",
			"name": "Amphetamin (Sabu-sabu, Ectacy)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "mariyuana-canabis-ganja-107",
			"name": "Mariyuana (Canabis, Ganja)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "morfin-ophium-heroin-putau-108",
			"name": "Morfin (Ophium, Heroin, Putau)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "benzodiazepim-109",
			"name": "Benzodiazepim",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "alkohol-110",
			"name": "Alkohol",
			"price": 9e4,
			"category": "Urinalisa"
		},
		{
			"id": "barbiturat-111",
			"name": "Barbiturat",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "coccain-112",
			"name": "Coccain",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "metampethamin-113",
			"name": "Metampethamin",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "narkoba-3-parameter-114",
			"name": "Narkoba 3 Parameter",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "tramadol-115",
			"name": "Tramadol",
			"price": 1e5,
			"category": "Urinalisa"
		},
		{
			"id": "tes-kehamilan-rapide-25-miu-ml-116",
			"name": "Tes Kehamilan Rapide (25 mIU/mL)",
			"price": 6e4,
			"category": "Urinalisa"
		},
		{
			"id": "mikroalbumin-urine-sewaktu-117",
			"name": "Mikroalbumin Urine Sewaktu",
			"price": 2e5,
			"category": "Urinalisa"
		},
		{
			"id": "mikroalbumin-urine-118",
			"name": "Mikroalbumin Urine",
			"price": 2e5,
			"category": "Urinalisa"
		},
		{
			"id": "acr-albumin-to-creatinine-ratio-faeces-119",
			"name": "ACR (Albumin-to- Creatinine Ratio) FAECES",
			"price": 22e4,
			"category": "Urinalisa"
		},
		{
			"id": "faeces-lengkap-cairan-tubuh-120",
			"name": "Faeces Lengkap CAIRAN TUBUH",
			"price": 8e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sperma-121",
			"name": "Analisa Sperma",
			"price": 17e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-pleura-122",
			"name": "Analisa Cairan Pleura",
			"price": 3e5,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sekret-vagina-123",
			"name": "Analisa Sekret Vagina",
			"price": 17e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-otak-lcs-124",
			"name": "Analisa Cairan Otak (LCS)",
			"price": 35e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-sekret-mata-125",
			"name": "Analisa Sekret Mata",
			"price": 15e4,
			"category": "Urinalisa"
		},
		{
			"id": "analisa-cairan-sendi-immunoserologi-126",
			"name": "Analisa Cairan Sendi IMMUNOSEROLOGI",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "widal-127",
			"name": "Widal",
			"price": 9e4,
			"category": "Imunoserologi"
		},
		{
			"id": "salmonela-typhi-igg-igm-128",
			"name": "Salmonela Typhi IgG/IgM",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "vdrl-129",
			"name": "Vdrl",
			"price": 8e4,
			"category": "Imunoserologi"
		},
		{
			"id": "syphilis-rapid-130",
			"name": "Syphilis (Rapid)",
			"price": 1e5,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-metode-eclia-131",
			"name": "HBs Ag (Metode ECLIA)",
			"price": 16e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbs-metode-eclia-132",
			"name": "Anti HBs (Metode ECLIA)",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbc-igm-metode-cmia-133",
			"name": "Anti HBc IgM (Metode CMIA)",
			"price": 95e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbe-metode-clia-134",
			"name": "Anti HBe (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-total-metode-clia-135",
			"name": "Anti HAV Total (Metode CLIA)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-igm-rapid-1anti-hcv-igm-136",
			"name": "Anti HAV IgM (Rapid) 1Anti HCV IgM",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-antibodi-rapid-137",
			"name": "HIV Antibodi (Rapid)",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "cd-4-138",
			"name": "Cd 4",
			"price": 38e4,
			"category": "Imunoserologi"
		},
		{
			"id": "cd-8-139",
			"name": "Cd 8",
			"price": 5e5,
			"category": "Imunoserologi"
		},
		{
			"id": "rheumatoid-factor-metode-nefelometri-140",
			"name": "Rheumatoid Factor (Metode Nefelometri)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "asto-metode-nefelometri-141",
			"name": "ASTO (Metode Nefelometri)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "crp-latex-142",
			"name": "CRP (Latex)",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "c3-komplemen-143",
			"name": "C3 Komplemen",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "c4-komplemen-144",
			"name": "C4 Komplemen",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-m-145",
			"name": "Ig M",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ige-total-eclia-146",
			"name": "IgE Total (ECLIA)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-rapid-147",
			"name": "Anti HCV (Rapid)",
			"price": 1e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hcv-metode-clia-148",
			"name": "Anti HCV (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tpha-149",
			"name": "Tpha",
			"price": 15e4,
			"category": "Imunoserologi"
		},
		{
			"id": "dengue-duo-150",
			"name": "Dengue Duo",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "dengue-igg-igm-151",
			"name": "Dengue Igg/Igm",
			"price": 17e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-tb-igg-152",
			"name": "Anti TB - IgG",
			"price": 1e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-pylori-igg-153",
			"name": "Helicobacter Pylori IgG",
			"price": 12e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-pylori-igm-154",
			"name": "Helicobacter Pylori IgM",
			"price": 12e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-faeces-155",
			"name": "Helicobacter Faeces",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "helicobacter-total-metode-rapid-156",
			"name": "Helicobacter Total (Metode Rapid)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "aca-igg-157",
			"name": "ACA IgG",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "aca-igm-158",
			"name": "ACA IgM",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "ana-if-159",
			"name": "Ana (If)",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-ds-dna-ncx-metode-elisa-160",
			"name": "Anti DS DNA-NCX (Metode ELISA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "tubex-tf-161",
			"name": "Tubex TF",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "beta-hcg-metode-eclia-162",
			"name": "Beta hCG (Metode ECLIA)",
			"price": 4e5,
			"category": "Imunoserologi"
		},
		{
			"id": "pro-calcitonin-pct-163",
			"name": "Pro Calcitonin (PCT)",
			"price": 8e5,
			"category": "Imunoserologi"
		},
		{
			"id": "dengue-ns1-ag-164",
			"name": "Dengue NS1 Ag",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "adenosin-deaminase-a-d-a-165",
			"name": "Adenosin Deaminase(A.D.A)",
			"price": 55e4,
			"category": "Imunoserologi"
		},
		{
			"id": "pap-tb-igg-igm-166",
			"name": "Pap TB IgG/IgM",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-rapid-167",
			"name": "HBs Ag (Rapid)",
			"price": 7e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbs-ag-kuantitatif-clia-168",
			"name": "HBs Ag Kuantitatif (CLIA)",
			"price": 18e4,
			"category": "Imunoserologi"
		},
		{
			"id": "leptospira-169",
			"name": "Leptospira",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hs-crp-kuantitatif-170",
			"name": "Hs-CRP Kuantitatif",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-e-spesifik-atopi-indonesia-171",
			"name": "Ig E Spesifik Atopi Indonesia",
			"price": 15e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-ds-dna-metode-clia-172",
			"name": "Anti Ds DNA (Metode CLIA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-e-spesifik-pediatrik-173",
			"name": "Ig E Spesifik Pediatrik",
			"price": 16e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ig-e-spesifik-umum-174",
			"name": "Ig E Spesifik Umum",
			"price": 15e5,
			"category": "Imunoserologi"
		},
		{
			"id": "ana-profile-175",
			"name": "ANA Profile",
			"price": 13e5,
			"category": "Imunoserologi"
		},
		{
			"id": "crp-metode-lpeita-176",
			"name": "CRP (Metode LPEITA)",
			"price": 16e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hiv-antigen-antibodi-eclia-177",
			"name": "HIV Antigen, Antibodi (ECLIA)",
			"price": 2e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-beta-2-glikoprotein-1-178",
			"name": "Anti Beta 2 Glikoprotein 1",
			"price": 17e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-beta-2-glikoprotein-igm-179",
			"name": "Anti Beta 2 Glikoprotein IgM",
			"price": 17e5,
			"category": "Imunoserologi"
		},
		{
			"id": "rapid-antigen-covid-19-180",
			"name": "Rapid Antigen Covid-19",
			"price": 12e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hpv-dna-screening-pcr-181",
			"name": "Hpv Dna Screening (Pcr)",
			"price": 9e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hbc-metode-clia-182",
			"name": "Anti HBc (METODE CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "hbe-ag-metode-clia-183",
			"name": "HBe Ag (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "tb-lam-ag-urine-184",
			"name": "TB LAM Ag (Urine)",
			"price": 3e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hav-igm-metode-clia-185",
			"name": "Anti HAV IgM (Metode CLIA)",
			"price": 35e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-measles-metode-elisa-186",
			"name": "Anti-Measles (Metode ELISA)",
			"price": 11e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-ccp-187",
			"name": "Anti-CCP",
			"price": 85e4,
			"category": "Imunoserologi"
		},
		{
			"id": "il-6-torch-chlamydia-188",
			"name": "Il-6 Torch & Chlamydia",
			"price": 65e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igg-elfa-189",
			"name": "Anti Toxoplasma IgG (ELFA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-toxoplasma-igm-clia-190",
			"name": "Anti Toxoplasma IgM (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-rubella-igg-clia-191",
			"name": "Anti Rubella IgG (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-rubella-igm-clia-192",
			"name": "Anti Rubella IgM (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igg-clia-193",
			"name": "Anti CMV IgG (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igg-elfa-194",
			"name": "Anti CMV IgG (ELFA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "toxoplasma-igg-aviditas-elfa-195",
			"name": "Toxoplasma IgG Aviditas (ELFA)",
			"price": 7e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-chlamydia-trachomatis-lgg-196",
			"name": "Anti Chlamydia trachomatis lgG",
			"price": 12e5,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-chlamydia-trachomatis-lgm-197",
			"name": "Anti Chlamydia trachomatis lgM",
			"price": 12e5,
			"category": "Imunoserologi"
		},
		{
			"id": "cmv-lgg-aviditas-198",
			"name": "CMV lgG Aviditas",
			"price": 75e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-cmv-igm-clia-199",
			"name": "Anti CMV IgM (CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igg-metode-clia-200",
			"name": "Anti HSV I IgG (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-i-igm-metode-clia-201",
			"name": "Anti HSV I IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-lgg-metode-clia-202",
			"name": "Anti HSV II lgG (Metode CLIA)",
			"price": 25e4,
			"category": "Imunoserologi"
		},
		{
			"id": "anti-hsv-ii-igm-metode-clia-203",
			"name": "Anti HSV II IgM (Metode CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "resistensi-insulin-homa-ir-204",
			"name": "Resistensi Insulin(Homa IR)",
			"price": 45e4,
			"category": "Hormon"
		},
		{
			"id": "cortisol-clia-1igf-1-205",
			"name": "Cortisol (CLIA) 1IgF-1",
			"price": 4e5,
			"category": "Hormon"
		},
		{
			"id": "anti-tpo-206",
			"name": "Anti-TPO",
			"price": 7e5,
			"category": "Hormon"
		},
		{
			"id": "ipth-207",
			"name": "Ipth",
			"price": 14e5,
			"category": "Hormon"
		},
		{
			"id": "t3-metode-clia-208",
			"name": "T3 (Metode CLIA)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t4-metode-clia-209",
			"name": "T4 (Metode CLIA)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t3-uptake-210",
			"name": "T3 Uptake",
			"price": 75e4,
			"category": "Hormon"
		},
		{
			"id": "fti-211",
			"name": "FTI",
			"price": 62e4,
			"category": "Hormon"
		},
		{
			"id": "free-t3-metode-clia-212",
			"name": "Free T3 (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "tshs-metode-clia-213",
			"name": "TSHs (Metode CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "free-t4-metode-clia-214",
			"name": "Free T4 (Metode CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "pth-elfa-215",
			"name": "Pth (Elfa)",
			"price": 12e5,
			"category": "Hormon"
		},
		{
			"id": "tiroglobulin-clia-216",
			"name": "Tiroglobulin (CLIA)",
			"price": 5e5,
			"category": "Hormon"
		},
		{
			"id": "anti-tyroglobulin-217",
			"name": "Anti Tyroglobulin",
			"price": 6e5,
			"category": "Hormon"
		},
		{
			"id": "thyroid-antibodies-clia-218",
			"name": "Thyroid Antibodies (CLIA)",
			"price": 45e4,
			"category": "Hormon"
		},
		{
			"id": "t3-anak-clia-219",
			"name": "T3 Anak (CLIA)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "t4-anak-clia-220",
			"name": "T4 Anak (CLIA)",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "tshs-anak-clia-221",
			"name": "TSHs Anak (CLIA)",
			"price": 22e4,
			"category": "Hormon"
		},
		{
			"id": "free-t3-anak-clia-222",
			"name": "Free T3 Anak (CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "free-t4-anak-clia-223",
			"name": "Free T4 Anak (CLIA)",
			"price": 25e4,
			"category": "Hormon"
		},
		{
			"id": "trab-tsh-receptor-antibodies-224",
			"name": "TRAb (TSH Receptor Antibodies)",
			"price": 7e5,
			"category": "Hormon"
		},
		{
			"id": "tshs-anak-225",
			"name": "TSHs Anak",
			"price": 2e5,
			"category": "Hormon"
		},
		{
			"id": "estrogen-metode-clia-226",
			"name": "Estrogen (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "lh-metode-clia-227",
			"name": "Lh (Metode Clia)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "fsh-metode-clia-228",
			"name": "Fsh (Metode Clia)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "prolaktin-metode-clia-229",
			"name": "Prolaktin (Metode CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "estradiol-metode-clia-230",
			"name": "Estradiol (METODE CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "progesteron-metode-clia-231",
			"name": "Progesteron (METODE CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "testosteron-metode-clia-232",
			"name": "Testosteron (METODE CLIA)",
			"price": 35e4,
			"category": "Hormon"
		},
		{
			"id": "anti-mullerian-hormon-metode-clia-233",
			"name": "Anti Mullerian Hormon (Metode CLIA)",
			"price": 8e5,
			"category": "Hormon"
		},
		{
			"id": "free-testosteron-clia-234",
			"name": "Free Testosteron (CLIA)",
			"price": 6e5,
			"category": "Hormon"
		},
		{
			"id": "shbg-metode-eclia-235",
			"name": "SHBG (Metode ECLIA)",
			"price": 231e4,
			"category": "Tumor Marker"
		},
		{
			"id": "afp-metode-clia-236",
			"name": "AFP (Metode CLIA)",
			"price": 35e4,
			"category": "Tumor Marker"
		},
		{
			"id": "cea-metode-clia-237",
			"name": "CEA (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-19-9-metode-clia-238",
			"name": "CA 19-9 (Metode CLIA)",
			"price": 75e4,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-125-metode-eclia-239",
			"name": "CA 125 (Metode ECLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "psa-metode-clia-240",
			"name": "PSA (Metode CLIA)",
			"price": 35e4,
			"category": "Tumor Marker"
		},
		{
			"id": "ca-15-3-metode-clia-241",
			"name": "CA 15-3 (Metode CLIA)",
			"price": 4e5,
			"category": "Tumor Marker"
		},
		{
			"id": "ratio-free-psa-psa-total-242",
			"name": "Ratio FREE PSA : PSA Total",
			"price": 9e5,
			"category": "Tumor Marker"
		},
		{
			"id": "free-psa-243",
			"name": "Free PSA",
			"price": 7e5,
			"category": "Tumor Marker"
		},
		{
			"id": "scc-244",
			"name": "SCC",
			"price": 8e5,
			"category": "Tumor Marker"
		},
		{
			"id": "cyfra-21-1-paru-245",
			"name": "Cyfra 21-1 (PARU)",
			"price": 8e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "igra-tb-direk-246",
			"name": "Igra-Tb Direk",
			"price": 9e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "analisa-sekret-uretra-247",
			"name": "Analisa Sekret Uretra",
			"price": 17e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-248",
			"name": "BTA Sputum",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-sps-249",
			"name": "BTA Sputum SPS",
			"price": 24e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-sputum-3x-250",
			"name": "BTA Sputum (3X)",
			"price": 24e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-kulit-lepra-251",
			"name": "BTA Kulit (Lepra)",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "jamur-252",
			"name": "Jamur",
			"price": 5e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "dipteri-253",
			"name": "Dipteri",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "filaria-254",
			"name": "Filaria",
			"price": 1e5,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-faeces-direk-255",
			"name": "BTA Faeces Direk",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "sediaan-langsung-gram-256",
			"name": "Sediaan Langsung Gram",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "gram-257",
			"name": "Gram",
			"price": 15e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-cairan-otak-lcs-258",
			"name": "BTA Cairan Otak (LCS)",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-bjh-259",
			"name": "Bta Bjh",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "bta-pus-260",
			"name": "Bta Pus",
			"price": 8e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "morfologi-indeks-bta-lepra-261",
			"name": "Morfologi / Indeks BTA Lepra",
			"price": 12e4,
			"category": "Mikrobiologi"
		},
		{
			"id": "hbv-dna-kuantitatif-pcr-262",
			"name": "HBV DNA Kuantitatif (PCR)",
			"price": 12e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hcv-rna-kuantitatif-263",
			"name": "HCV RNA Kuantitatif",
			"price": 23e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-sars-cov-2-264",
			"name": "Pcr Sars-Cov-2",
			"price": 65e4,
			"category": "Biomolekuler"
		},
		{
			"id": "rt-pcr-sars-cov-2-265",
			"name": "RT PCR SARS-CoV-2",
			"price": 65e4,
			"category": "Biomolekuler"
		},
		{
			"id": "hpv-dna-genotyping-pcr-266",
			"name": "HPV DNA Genotyping (PCR)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "std-8-pcr-267",
			"name": "Std-8 (Pcr)",
			"price": 14e5,
			"category": "Biomolekuler"
		},
		{
			"id": "ct-ng-pcr-268",
			"name": "Ct/Ng (Pcr)",
			"price": 1e6,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-salmonella-typhi-269",
			"name": "PCR Salmonella Typhi",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-dengue-270",
			"name": "PCR Dengue",
			"price": 6e5,
			"category": "Biomolekuler"
		},
		{
			"id": "pcr-malaria-271",
			"name": "PCR Malaria",
			"price": 6e5,
			"category": "Biomolekuler"
		},
		{
			"id": "mtb-rif-inh-tcm-272",
			"name": "Mtb/Rif/Inh (Tcm)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "hiv-rna-viralload-273",
			"name": "HIV-RNA (Viralload)",
			"price": 9e5,
			"category": "Biomolekuler"
		},
		{
			"id": "nipt-kultur-resistensi-274",
			"name": "Nipt Kultur Resistensi",
			"price": 5e6,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-gaal-275",
			"name": "Kultur Gaal",
			"price": 45e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-darah-276",
			"name": "Kultur Darah",
			"price": 45e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-urine-277",
			"name": "Kultur Urine",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-faeces-278",
			"name": "Kultur Faeces",
			"price": 45e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-rectal-swab-279",
			"name": "Kultur Rectal Swab",
			"price": 25e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-sputum-non-bta-280",
			"name": "Kultur Sputum Non BTA",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-hapus-tenggorok-281",
			"name": "Kultur Hapus Tenggorok",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-pus-282",
			"name": "Kultur PUS",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-sekret-283",
			"name": "Kultur Sekret",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-cairan-tubuh-lain-284",
			"name": "Kultur Cairan Tubuh Lain",
			"price": 5e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-bta-285",
			"name": "Kultur BTA",
			"price": 16e5,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-ruangan-286",
			"name": "Kultur Ruangan",
			"price": 45e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-sekret-mata-287",
			"name": "Kultur Sekret Mata",
			"price": 45e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-sperma-288",
			"name": "Kultur Sperma",
			"price": 45e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-jaringan-289",
			"name": "Kultur Jaringan",
			"price": 45e4,
			"category": "Biomolekuler"
		},
		{
			"id": "kultur-pus-resistensi-bta-patologi-anatomi-290",
			"name": "Kultur Pus Resistensi BTA PATOLOGI ANATOMI",
			"price": 45e4,
			"category": "Biomolekuler"
		},
		{
			"id": "pap-smear-291",
			"name": "Pap Smear",
			"price": 37e4,
			"category": "Biomolekuler"
		},
		{
			"id": "sitologi-cairan-292",
			"name": "Sitologi Cairan",
			"price": 42e4,
			"category": "Biomolekuler"
		},
		{
			"id": "histopatologi-jaringan-5-cm-293",
			"name": "Histopatologi Jaringan (<5 cm)",
			"price": 47e4,
			"category": "Biomolekuler"
		},
		{
			"id": "histopatologi-jaringan-5-cm-294",
			"name": "Histopatologi Jaringan (≥5 cm)",
			"price": 75e4,
			"category": "Biomolekuler"
		},
		{
			"id": "histopatologi-prostat-lain-lain-295",
			"name": "Histopatologi Prostat LAIN-LAIN",
			"price": 55e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-schedel-296",
			"name": "RO Schedel",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-sinus-paranasal-3-297",
			"name": "RO Sinus Paranasal (3)",
			"price": 3e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-waters-298",
			"name": "RO Waters",
			"price": 15e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-mastoid-299",
			"name": "RO Mastoid",
			"price": 15e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-nasal-bone-300",
			"name": "RO Nasal Bone",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-tmj-301",
			"name": "Ro Tmj",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-mandibula-302",
			"name": "RO Mandibula",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-303",
			"name": "RO Thorax",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-pa-lat-304",
			"name": "RO Thorax PA + LAT",
			"price": 3e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-cervical-ap-lat-305",
			"name": "RO Cervical AP + LAT",
			"price": 3e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-cervical-ap-lat-obl-306",
			"name": "RO Cervical AP + LAT + OBL",
			"price": 46e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-307",
			"name": "RO Thoracal AP + LAT",
			"price": 3e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-obl-308",
			"name": "RO Thoracal AP + LAT + OBL",
			"price": 43e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-309",
			"name": "RO Thoraco Lumbal AP + LAT",
			"price": 34e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-obl-310",
			"name": "RO Thoraco Lumbal AP + LAT + OBL",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-311",
			"name": "RO Lumbal AP + LAT",
			"price": 32e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-obl-312",
			"name": "RO Lumbal AP + LAT + OBL",
			"price": 34e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-313",
			"name": "RO Lumbo Sacral AP + LAT",
			"price": 34e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-obl-314",
			"name": "RO Lumbo Sacral AP + LAT + OBL",
			"price": 45e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-bno-abdomen-315",
			"name": "RO BNO ( Abdomen )",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-abdomen-3-pss-316",
			"name": "RO Abdomen 3 PSS",
			"price": 4e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-pelvis-coxae-317",
			"name": "RO Pelvis ( Coxae )",
			"price": 16e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-dental-318",
			"name": "RO Dental",
			"price": 1e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-clavicula-319",
			"name": "RO Clavicula",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-scapula-320",
			"name": "RO Scapula",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-shoulder-joint-321",
			"name": "RO Shoulder Joint",
			"price": 26e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-humerus-322",
			"name": "RO Humerus",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-cubiti-323",
			"name": "RO Cubiti",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-antebrachi-324",
			"name": "RO Antebrachi",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-wrist-325",
			"name": "RO Wrist",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-manus-326",
			"name": "RO Manus",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-digiti-327",
			"name": "RO Digiti",
			"price": 18e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-femur-328",
			"name": "RO Femur",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-genu-329",
			"name": "RO Genu",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-cruris-330",
			"name": "RO Cruris",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-ankle-331",
			"name": "RO Ankle",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-pedis-332",
			"name": "RO Pedis",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-calcaneus-333",
			"name": "RO Calcaneus",
			"price": 24e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-elbow-334",
			"name": "RO Elbow",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-sacrum-ap-lateral-335",
			"name": "RO Sacrum AP + LATERAL",
			"price": 25e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-servical-ap-lat-336",
			"name": "RO Servical AP + LAT",
			"price": 36e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoracal-ap-lat-obl-2x-337",
			"name": "Ro Thoracal Ap + Lat + Obl(2X)",
			"price": 41e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-thoraco-lumbal-ap-lat-obl-2x-338",
			"name": "Ro Thoraco Lumbal Ap + Lat + Obl(2X)",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbal-ap-lat-obl-2x-339",
			"name": "Ro Lumbal Ap + Lat + Obl(2X)",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-lumbo-sacral-ap-lat-obl-2x-340",
			"name": "Ro Lumbo Sacral Ap + Lat + Obl(2X)",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-patella-341",
			"name": "RO Patella",
			"price": 15e4,
			"category": "Rontgen"
		},
		{
			"id": "ro-malleolus-342",
			"name": "RO Malleolus",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "ro-thorax-top-lordotik-usg-343",
			"name": "RO Thorax Top Lordotik USG",
			"price": 17e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-344",
			"name": "USG Abdomen",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-muskuloskleletal-doppler-345",
			"name": "USG Muskuloskleletal+Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-antebrachii-doppler-346",
			"name": "USG Antebrachii + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-payudara-347",
			"name": "USG Payudara",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-tyroid-348",
			"name": "USG Tyroid",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-testis-349",
			"name": "USG Testis",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-prostat-350",
			"name": "USG Prostat",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-kepala-351",
			"name": "USG Kepala",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-inguinal-352",
			"name": "USG Inguinal",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-umbilikus-doppler-353",
			"name": "USG Umbilikus + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-colli-354",
			"name": "USG Colli",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-cruris-doppler-355",
			"name": "USG Cruris + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-mammae-doppler-356",
			"name": "USG Mammae + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-doppler-357",
			"name": "USG Abdomen + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-tyroid-doppler-358",
			"name": "USG Tyroid + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-inguinal-doppler-359",
			"name": "USG Inguinal + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-testis-doppler-360",
			"name": "USG Testis + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-buccal-361",
			"name": "USG Buccal",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-pedis-doppler-362",
			"name": "USG Pedis + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-parotis-doppler-363",
			"name": "USG Parotis + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-abdomen-bawah-364",
			"name": "USG Abdomen Bawah",
			"price": 42e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-kepala-doppler-365",
			"name": "USG Kepala + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-shoulder-doppler-366",
			"name": "USG Shoulder + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "usg-soft-tissue-doppler-367",
			"name": "USG Soft Tissue + Doppler",
			"price": 52e4,
			"category": "Rontgen"
		},
		{
			"id": "ekg-lain-lain-368",
			"name": "Ekg Lain-Lain",
			"price": 1e5,
			"category": "Rontgen"
		},
		{
			"id": "analisa-cairan-acites-369",
			"name": "Analisa Cairan Acites",
			"price": 3e5,
			"category": "Rontgen"
		},
		{
			"id": "analisa-cairan-tubuh-370",
			"name": "Analisa Cairan Tubuh",
			"price": 3e5,
			"category": "Rontgen"
		},
		{
			"id": "vitamin-d-25-oh-total-eclia-371",
			"name": "Vitamin D 25-OH Total (ECLIA)",
			"price": 35e4,
			"category": "Rontgen"
		},
		{
			"id": "fecal-calprotectin-372",
			"name": "Fecal Calprotectin",
			"price": 75e4,
			"category": "Rontgen"
		},
		{
			"id": "buta-warna-373",
			"name": "Buta warna",
			"price": 4e4,
			"category": "Rontgen"
		},
		{
			"id": "fisik-lpk-374",
			"name": "Fisik/Lpk",
			"price": 6e4,
			"category": "Rontgen"
		},
		{
			"id": "asam-urat-serum-plasma-375",
			"name": "Asam Urat (Serum/Plasma)",
			"price": 5e4,
			"category": "Rontgen"
		},
		{
			"id": "keton-darah-376",
			"name": "Keton Darah",
			"price": 2e5,
			"category": "Rontgen"
		},
		{
			"id": "refraction-mata-377",
			"name": "Refraction Mata",
			"price": 5e4,
			"category": "Rontgen"
		},
		{
			"id": "homeservice-378",
			"name": "Homeservice",
			"price": 5e4,
			"category": "Rontgen"
		},
		{
			"id": "transport-rujukan-379",
			"name": "Transport Rujukan",
			"price": 5e4,
			"category": "Rontgen"
		},
		{
			"id": "darah-samar-faeces-380",
			"name": "Darah Samar Faeces",
			"price": 9e4,
			"category": "Rontgen"
		}
	]
};
var priceBranches = [
	{
		id: "serang",
		label: "Serang",
		updated: "15 Agustus 2026"
	},
	{
		id: "cilegon",
		label: "Cilegon",
		updated: "16 Agustus 2026"
	},
	{
		id: "cikupa",
		label: "Cikupa",
		updated: "16 Agustus 2026"
	},
	{
		id: "pandeglang",
		label: "Pandeglang",
		updated: "21 Agustus 2026"
	},
	{
		id: "rangkas",
		label: "Rangkasbitung",
		updated: "20 Agustus 2026"
	}
];
var data = prices_default;
var CABANG_KEY = "biomed-cabang";
function isPriceBranch(v) {
	return priceBranches.some((b) => b.id === v);
}
function getCabang() {
	if (typeof localStorage === "undefined") return "serang";
	const v = localStorage.getItem("biomed-cabang") ?? "";
	return isPriceBranch(v) ? v : "serang";
}
function setCabang(id) {
	localStorage.setItem(CABANG_KEY, id);
}
function testsFor(id) {
	return data[id] ?? data.serang;
}
function categoriesFor(id) {
	return [...new Set(testsFor(id).map((t) => t.category))];
}
function formatRupiah(n) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0
	}).format(n);
}
var PKEY$1 = "biomed-fo-pasien";
var SKEY = "biomed-fo-kasir";
function read(key, fallback) {
	try {
		return JSON.parse(localStorage.getItem(key) ?? "");
	} catch {
		return fallback;
	}
}
function loadPatients() {
	return read(PKEY$1, []);
}
function savePatients(list) {
	localStorage.setItem(PKEY$1, JSON.stringify(list.slice(0, 400)));
}
function loadSales() {
	return read(SKEY, []).map((s) => ({
		...s,
		patientId: s.patientId ?? "",
		ktp: s.ktp ?? "",
		kode: s.kode ?? `${s.nomor}-${String(s.id ?? "").replace(/-/g, "").slice(0, 6).toUpperCase()}`,
		hasil: s.hasil?.map((h) => ({
			satuan: h.satuan ?? "",
			rujukan: h.rujukan ?? "",
			flag: h.flag ?? "",
			...h
		})) ?? (s.items ?? []).map((i) => ({
			itemId: i.id,
			name: i.name,
			nilai: "",
			satuan: "",
			rujukan: "",
			flag: "",
			catatan: "",
			ready: false
		}))
	}));
}
function saveSales(list) {
	localStorage.setItem(SKEY, JSON.stringify(list.slice(0, 400)));
}
function findPatient(list, q) {
	const n = q.trim().toLowerCase().replace(/\s/g, "");
	if (n.length < 2) return [];
	return list.filter((p) => {
		const ktp = p.ktp.replace(/\s/g, "");
		const hp = p.hp.replace(/\s/g, "");
		return ktp.includes(n) || hp.includes(n) || p.nama.toLowerCase().includes(q.trim().toLowerCase());
	}).slice(0, 12);
}
function nextNomor(list) {
	const day = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const n = list.filter((t) => t.created.slice(0, 10) === day).length + 1;
	return `A${String(n).padStart(3, "0")}`;
}
function ageOf(lahir) {
	if (!lahir) return "";
	const d = new Date(lahir);
	if (Number.isNaN(d.getTime())) return "";
	const now = /* @__PURE__ */ new Date();
	let age = now.getFullYear() - d.getFullYear();
	const m = now.getMonth() - d.getMonth();
	if (m < 0 || m === 0 && now.getDate() < d.getDate()) age -= 1;
	return `${age} th`;
}
var R = [
	{
		match: /haemoglobin|hemoglobin|\bhb\b/i,
		satuan: "g/dL",
		l: [13, 18],
		p: [12, 16]
	},
	{
		match: /hematokrit|\bht\b|\bhct\b/i,
		satuan: "%",
		l: [40, 48],
		p: [37, 43]
	},
	{
		match: /leukosit|wbc/i,
		satuan: "/µL",
		both: [4e3, 1e4]
	},
	{
		match: /trombosit|platelet/i,
		satuan: "/µL",
		both: [15e4, 45e4]
	},
	{
		match: /eritrosit|\brbc\b/i,
		satuan: "juta/µL",
		l: [4.5, 5.5],
		p: [4, 5]
	},
	{
		match: /\bled\b|laju endap/i,
		satuan: "mm/jam",
		l: [0, 15],
		p: [0, 20]
	},
	{
		match: /glukosa puasa|gdp/i,
		satuan: "mg/dL",
		both: [70, 100]
	},
	{
		match: /glukosa 2|2 jam|2jpp/i,
		satuan: "mg/dL",
		both: [0, 140]
	},
	{
		match: /glukosa sewaktu|gds/i,
		satuan: "mg/dL",
		both: [0, 200]
	},
	{
		match: /hba1c|hb a1c/i,
		satuan: "%",
		both: [4, 5.6]
	},
	{
		match: /sgot|\bast\b/i,
		satuan: "U/L",
		both: [10, 40]
	},
	{
		match: /sgpt|\balt\b/i,
		satuan: "U/L",
		both: [10, 41]
	},
	{
		match: /gamma gt|\bggt\b/i,
		satuan: "U/L",
		both: [8, 61]
	},
	{
		match: /alkali fosfatase|\balp\b/i,
		satuan: "U/L",
		both: [40, 129]
	},
	{
		match: /bilirubin/i,
		satuan: "mg/dL",
		both: [.3, 1.2]
	},
	{
		match: /albumin/i,
		satuan: "g/dL",
		both: [3.5, 5]
	},
	{
		match: /protein/i,
		satuan: "g/dL",
		both: [6, 8.3]
	},
	{
		match: /ureum|urea/i,
		satuan: "mg/dL",
		both: [10, 50]
	},
	{
		match: /kreatinin/i,
		satuan: "mg/dL",
		l: [.7, 1.3],
		p: [.6, 1.1]
	},
	{
		match: /asam urat|uric/i,
		satuan: "mg/dL",
		l: [3.4, 7],
		p: [2.4, 5.7]
	},
	{
		match: /cholesterol total|kolesterol total|chol total/i,
		satuan: "mg/dL",
		both: [0, 200]
	},
	{
		match: /\bhdl\b/i,
		satuan: "mg/dL",
		both: [40, 90]
	},
	{
		match: /\bldl\b/i,
		satuan: "mg/dL",
		both: [0, 100]
	},
	{
		match: /trigliserida/i,
		satuan: "mg/dL",
		both: [0, 150]
	},
	{
		match: /natrium|sodium|\bna\b/i,
		satuan: "mmol/L",
		both: [136, 145]
	},
	{
		match: /kalium|potassium|\bk\b/i,
		satuan: "mmol/L",
		both: [3.5, 5.1]
	},
	{
		match: /chlorida|chloride/i,
		satuan: "mmol/L",
		both: [98, 107]
	},
	{
		match: /troponin/i,
		satuan: "ng/mL",
		both: [0, .04]
	},
	{
		match: /hbsag|anti hiv|hiv|vdrl|tes hamil|hcg/i,
		satuan: "",
		rujukan: "Negatif"
	}
];
function refFor(name, gender) {
	const row = R.find((r) => r.match.test(name));
	if (!row) return {
		satuan: "",
		rujukan: ""
	};
	if (row.rujukan) return {
		satuan: row.satuan,
		rujukan: row.rujukan
	};
	const pair = row.both ?? (gender === "P" ? row.p : row.l);
	if (!pair) return {
		satuan: row.satuan,
		rujukan: ""
	};
	const [low, high] = pair;
	return {
		satuan: row.satuan,
		rujukan: `${low} – ${high}`,
		low,
		high
	};
}
function flagOf(nilai, ref) {
	const n = Number(String(nilai).replace(",", ".").replace(/[^\d.-]/g, ""));
	if (!Number.isFinite(n) || ref.low == null || ref.high == null) return "";
	if (n < ref.low) return "L";
	if (n > ref.high) return "H";
	return "";
}
/** Code 128B patterns: 0–106 (start B=104, stop=106). */
var PAT = [
	"11011001100",
	"11001101100",
	"11001100110",
	"10010011000",
	"10010001100",
	"10001001100",
	"10011001000",
	"10011000100",
	"10001100100",
	"11001001000",
	"11001000100",
	"11000100100",
	"10110011100",
	"10011011100",
	"10011001110",
	"10111001100",
	"10011101100",
	"10011100110",
	"11001110010",
	"11001011100",
	"11001001110",
	"11011100100",
	"11001110100",
	"11101101110",
	"11101001100",
	"11100101100",
	"11100100110",
	"11101100100",
	"11100110100",
	"11100110010",
	"11011011000",
	"11011000110",
	"11000110110",
	"10100011000",
	"10001011000",
	"10001000110",
	"10110001000",
	"10001101000",
	"10001100010",
	"11010001000",
	"11000101000",
	"11000100010",
	"10110111000",
	"10110001110",
	"10001101110",
	"10111011000",
	"10111000110",
	"10001110110",
	"11101110110",
	"11010001110",
	"11000101110",
	"11011101000",
	"11011100010",
	"11011101110",
	"11101011000",
	"11101000110",
	"11100010110",
	"11101101000",
	"11101100010",
	"11100011010",
	"11101111010",
	"11001000010",
	"11110001010",
	"10100110000",
	"10100001100",
	"10010110000",
	"10010000110",
	"10000101100",
	"10000100110",
	"10110010000",
	"10110000100",
	"10011010000",
	"10011000010",
	"10000110100",
	"10000110010",
	"11000010010",
	"11001010000",
	"11110111010",
	"11000010100",
	"10001111010",
	"10100111100",
	"10010111100",
	"10010011110",
	"10111100100",
	"10011110100",
	"10011110010",
	"11110100100",
	"11110010100",
	"11110010010",
	"11011011110",
	"11011110110",
	"11110110110",
	"10101111000",
	"10100011110",
	"10001011110",
	"10111101000",
	"10111100010",
	"11110101000",
	"11110100010",
	"10111011110",
	"10111101110",
	"11101011110",
	"11110101110",
	"11010000100",
	"11010010000",
	"11010011100",
	"1100011101011"
];
function code128Svg(text, height = 48) {
	const chars = [...text].map((c) => c.charCodeAt(0));
	const values = [104];
	for (const code of chars) {
		if (code < 32 || code > 126) continue;
		values.push(code - 32);
	}
	let sum = 104;
	values.slice(1).forEach((v, i) => {
		sum += v * (i + 1);
	});
	values.push(sum % 103);
	const bits = values.map((v) => PAT[v]).join("") + PAT[106];
	const bars = [];
	let x = 0;
	for (const b of bits) {
		if (b === "1") bars.push(`<rect x="${x}" y="0" width="1" height="${height}"/>`);
		x += 1;
	}
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x} ${height}" width="100%" height="${height}" shape-rendering="crispEdges">${bars.join("")}</svg>`;
}
function sampleCode(nomor, created) {
	return `${nomor}${created.slice(2, 10).replaceAll("-", "")}`;
}
var PKEY = "biomed-fo-publik";
function kodeOf(sale) {
	if (sale.kode) return sale.kode;
	return `${sale.nomor}-${sale.id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}
function sealOf(p) {
	const raw = [
		p.kode,
		p.nomor,
		p.nama,
		...p.hasil.map((h) => `${h.name}:${h.nilai}`)
	].join("|");
	let h = 2166136261;
	for (const c of raw) h ^= c.charCodeAt(0), h = Math.imul(h, 16777619);
	return `BM${(h >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
}
function toPublic(sale, patient) {
	const kode = kodeOf(sale);
	const hasil = sale.hasil.map((h) => ({
		name: h.name,
		nilai: h.nilai,
		satuan: h.satuan,
		rujukan: h.rujukan,
		flag: h.flag,
		ready: h.ready
	}));
	const draft = {
		kode,
		nomor: sale.nomor,
		nama: sale.nama,
		umur: patient ? ageOf(patient.lahir) : "",
		kelamin: patient ? patient.kelamin === "P" ? "Perempuan" : "Laki-laki" : "",
		cabang: sale.cabang,
		created: sale.created,
		hasil,
		ready: hasil.length > 0 && hasil.every((h) => h.ready && h.nilai.trim().length > 0),
		seal: ""
	};
	draft.seal = sealOf(draft);
	return draft;
}
function hasilUrl(kode) {
	return `${typeof window !== "undefined" ? window.location.origin : ""}/hasil/${encodeURIComponent(kode)}`;
}
function validasiUrl(kode) {
	return `${typeof window !== "undefined" ? window.location.origin : ""}/validasi/${encodeURIComponent(kode)}`;
}
function qrSvg(text) {
	return renderSVG(text, {
		ecc: "M",
		border: 2,
		pixelSize: 3,
		blackColor: "#1a2832",
		whiteColor: "#ffffff"
	});
}
function linkMark(url, kode, caption) {
	return `<div class="mark">
    <div class="qr">${qrSvg(url)}</div>
    <div class="bc">${code128Svg(kode, 36)}</div>
    <p class="cap">${caption}<br><span class="url">${url}</span></p>
  </div>`;
}
function markCss() {
	return `.mark{margin-top:16px;text-align:center}
  .qr{width:132px;margin:0 auto}.qr svg{width:132px;height:132px}
  .bc{margin-top:6px}.bc svg{width:100%;max-width:280px;height:36px}
  .cap{font-size:10px;color:#5d6d78;margin-top:6px}
  .url{word-break:break-all;font-size:9px}`;
}
function savePublicLocal(p) {
	const all = loadAllPublic();
	all[p.kode] = p;
	localStorage.setItem(PKEY, JSON.stringify(all));
}
function loadPublicLocal(kode) {
	return loadAllPublic()[kode] ?? null;
}
function loadAllPublic() {
	try {
		return JSON.parse(localStorage.getItem(PKEY) ?? "{}");
	} catch {
		return {};
	}
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var publishLabHasil = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("e30b28a5373e1c69be24745a4d322d0db6d63bbc69f2974e07662b20606acebe"));
var readLabHasil = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("609ba6809a128126dca84a4c1fc1c5195d5fa574a3d0c45dc15957c55ca97c08"));
async function publishSale(sale, patient) {
	const payload = toPublic(sale, patient);
	savePublicLocal(payload);
	try {
		await publishLabHasil({ data: payload });
	} catch {}
	return payload;
}
async function loadPublished(kode) {
	try {
		const remote = await readLabHasil({ data: { kode } });
		if (remote) return remote;
	} catch {}
	return loadPublicLocal(kode);
}
function printLembar(sale, patient) {
	const gender = patient?.kelamin ?? "L";
	const rows = sale.hasil.map((h) => {
		const ref = refFor(h.name, gender);
		const satuan = h.satuan || ref.satuan;
		const rujukan = h.rujukan || ref.rujukan;
		const flag = h.flag || flagOf(h.nilai, ref);
		return `<tr>
        <td>${h.name}</td>
        <td><strong>${h.nilai || "—"}</strong></td>
        <td>${satuan}</td>
        <td>${rujukan}</td>
        <td style="color:${flag === "H" ? "#c81e24" : flag === "L" ? "#3d5a73" : "inherit"}">${flag || ""}</td>
      </tr>`;
	}).join("");
	const when = new Date(sale.created).toLocaleString("id-ID");
	const kode = kodeOf(sale);
	const url = validasiUrl(kode);
	const seal = toPublic(sale, patient).seal;
	const html = `<!doctype html><html><head><meta charset="utf-8"><title>Hasil lab ${sale.nomor}</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#1a2832;margin:24px;max-width:720px}
  h1{font-size:20px;margin:0} h2{font-size:14px;margin:16px 0 8px;letter-spacing:.12em;text-transform:uppercase}
  p,td,th{font-size:12px}
  table{width:100%;border-collapse:collapse}
  th,td{border-bottom:1px solid #d4dce3;padding:6px 4px;text-align:left}
  th{color:#5d6d78;font-weight:600}
  .muted{color:#5d6d78}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;margin:12px 0}
  .sign{margin-top:32px;text-align:right}
  ${markCss()}
  @media print { button{display:none} }
</style></head><body>
  <p class="muted">${company.legalName}</p>
  <h1>Laboratorium BIOMED — Hasil pemeriksaan</h1>
  <p class="muted">Cabang ${sale.cabang} · No. ${sale.nomor}</p>
  <div class="grid">
    <p>Nama: <strong>${sale.nama}</strong></p>
    <p>No. lab: <strong>${sale.nomor}</strong></p>
    <p>HP: ${sale.hp}</p>
    <p>KTP: ${sale.ktp}</p>
    <p>${patient ? `${patient.kelamin === "P" ? "Perempuan" : "Laki-laki"} · ${ageOf(patient.lahir)}` : ""}</p>
    <p>Tgl: ${when}</p>
  </div>
  <h2>Hasil</h2>
  <table>
    <thead><tr><th>Pemeriksaan</th><th>Hasil</th><th>Satuan</th><th>Nilai rujukan</th><th>Ket</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="muted">H = tinggi, L = rendah terhadap nilai rujukan laboratorium. Interpretasi bersama dokter.</p>
  <div class="sign">
    <p>Penanggung jawab</p>
    <p><strong>${company.director}</strong></p>
    <p class="muted">Kode sah ${seal}</p>
  </div>
  ${linkMark(url, kode, "Barcode validasi keaslian surat hasil")}
  <button onclick="window.print()">Cetak</button>
  <script>window.onload=()=>window.print()<\/script>
</body></html>`;
	const w = window.open("", "lembar-hasil", "width=720,height=900");
	if (!w) return;
	w.document.write(html);
	w.document.close();
	publishSale(sale, patient);
}
function LabResults({ sales, patients, onPatch }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [active, setActive] = (0, import_react.useState)(sales[0]?.id ?? null);
	const list = (0, import_react.useMemo)(() => {
		const n = q.trim().toLowerCase();
		return sales.filter((s) => {
			if (!n) return true;
			return s.nomor.toLowerCase().includes(n) || s.nama.toLowerCase().includes(n) || s.ktp.includes(n) || s.hp.includes(n);
		});
	}, [q, sales]);
	const sale = sales.find((s) => s.id === active) ?? list[0];
	const patient = sale ? patients.find((p) => p.id === sale.patientId) : void 0;
	const gender = patient?.kelamin ?? "L";
	function setNilai(h, nilai) {
		if (!sale) return;
		const ref = refFor(h.name, gender);
		onPatch(sale.id, h.itemId, {
			nilai,
			satuan: h.satuan || ref.satuan,
			rujukan: h.rujukan || ref.rujukan,
			flag: flagOf(nilai, ref),
			ready: nilai.trim().length > 0
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 overflow-hidden lg:grid-cols-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "min-h-0 overflow-auto border-b border-line p-4 lg:border-b-0 lg:border-r",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Cari no. lab, nama, KTP",
					className: "h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 divide-y divide-line rounded-xl border border-line bg-surface",
				children: [list.map((s) => {
					const pending = s.hasil.some((h) => !h.ready);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActive(s.id),
						className: `flex w-full flex-col px-4 py-3 text-left ${sale?.id === s.id ? "bg-paper" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-red",
								children: s.nomor
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: pending ? "Isi hasil" : "Selesai"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: s.nama
						})]
					}) }, s.id);
				}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-6 text-sm text-muted",
					children: "Belum ada sampel dari kasir."
				}) : null]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "min-h-0 overflow-auto p-4 lg:col-span-4",
			children: !sale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Bayar dulu di kasir supaya nomor lab muncul di sini."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-muted",
							children: "Lembar hasil"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: sale.nama
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								sale.nomor,
								" · ",
								sale.cabang,
								" · ",
								patient ? `${patient.kelamin === "P" ? "P" : "L"} · ${ageOf(patient.lahir)}` : "",
								" · KTP ",
								sale.ktp
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto rounded-xl border border-line bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-left text-xs uppercase tracking-widest text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2",
									children: "Pemeriksaan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2",
									children: "Hasil"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2",
									children: "Satuan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2",
									children: "Nilai rujukan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2",
									children: "Ket"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sale.hasil.map((h) => {
							const ref = refFor(h.name, gender);
							const satuan = h.satuan || ref.satuan;
							const rujukan = h.rujukan || ref.rujukan;
							const flag = h.flag || flagOf(h.nilai, ref);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 font-medium",
										children: h.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: h.nilai,
											onChange: (e) => setNilai(h, e.target.value),
											className: "h-10 w-28 rounded-md border border-line bg-paper px-2 tabular-nums"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-muted",
										children: satuan || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-muted",
										children: rujukan || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: `px-3 py-2 font-semibold ${flag ? "text-red" : "text-muted"}`,
										children: flag || "N"
									})
								]
							}, h.itemId);
						}) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => printLembar(sale, patient),
					className: "mt-4 h-12 rounded-full bg-red px-6 text-sm font-semibold text-chalk",
					children: "Cetak lembar hasil"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted",
					children: [
						"Format mengikuti lembar lab klinik: hasil, satuan, nilai rujukan, flag H/L. PJ ",
						company.director,
						"."
					]
				})
			] })
		})]
	});
}
var stockCategories = [
	"Tabung & spesimen",
	"Reagen hematologi",
	"Reagen kimia",
	"Reagen imunologi",
	"Urin & feses",
	"Habis pakai periksa",
	"Radiologi & USG",
	"APD karyawan",
	"Kebersihan / janitor",
	"Kantor & cetak",
	"K3 & limbah",
	"Umum & fasilitas"
];
var packUnits = [
	"box",
	"pak",
	"pack",
	"rak",
	"vial"
];
function needsIsi(unit) {
	return packUnits.includes(unit);
}
function isiOf(item) {
	if (item.isi && item.isi > 1) return item.isi;
	if (needsIsi(item.unit)) return 100;
	return 1;
}
function qtyLabel(item, qty) {
	const isi = isiOf(item);
	if (isi > 1) return `${qty} ${item.unit} · ${qty * isi} pcs`;
	return `${qty} ${item.unit}`;
}
var catalog = [
	{
		id: "edta-3",
		name: "Tabung EDTA 3 mL (ungu)",
		category: "Tabung & spesimen",
		unit: "rak",
		min: 20,
		seed: 48
	},
	{
		id: "sst-5",
		name: "Tabung serum SST 5 mL (kuning)",
		category: "Tabung & spesimen",
		unit: "rak",
		min: 20,
		seed: 36
	},
	{
		id: "natrium-sitrat",
		name: "Tabung natrium sitrat 1.8 mL (biru)",
		category: "Tabung & spesimen",
		unit: "rak",
		min: 8,
		seed: 16
	},
	{
		id: "fluorida",
		name: "Tabung NaF glukosa (abu)",
		category: "Tabung & spesimen",
		unit: "rak",
		min: 8,
		seed: 18
	},
	{
		id: "heparin",
		name: "Tabung heparin (hijau)",
		category: "Tabung & spesimen",
		unit: "rak",
		min: 6,
		seed: 12
	},
	{
		id: "urin-pot",
		name: "Pot urin steril 30 mL",
		category: "Tabung & spesimen",
		unit: "pcs",
		min: 80,
		seed: 200
	},
	{
		id: "feses-pot",
		name: "Pot feses",
		category: "Tabung & spesimen",
		unit: "pcs",
		min: 40,
		seed: 100
	},
	{
		id: "sputum",
		name: "Pot sputum",
		category: "Tabung & spesimen",
		unit: "pcs",
		min: 20,
		seed: 50
	},
	{
		id: "swab",
		name: "Swab steril + transport",
		category: "Tabung & spesimen",
		unit: "pcs",
		min: 30,
		seed: 80
	},
	{
		id: "holder",
		name: "Holder vacutainer",
		category: "Tabung & spesimen",
		unit: "pcs",
		min: 15,
		seed: 40
	},
	{
		id: "reagen-cbc",
		name: "Reagen hematologi analyzer (diluent)",
		category: "Reagen hematologi",
		unit: "botol",
		min: 4,
		seed: 8
	},
	{
		id: "lyse",
		name: "Lyse reagent CBC",
		category: "Reagen hematologi",
		unit: "botol",
		min: 4,
		seed: 7
	},
	{
		id: "cleaner-cbc",
		name: "Pembersih probe hematologi",
		category: "Reagen hematologi",
		unit: "botol",
		min: 2,
		seed: 4
	},
	{
		id: "kontrol-cbc",
		name: "Kontrol darah 3 level",
		category: "Reagen hematologi",
		unit: "vial",
		min: 3,
		seed: 6
	},
	{
		id: "led-westergren",
		name: "Pipet LED Westergren",
		category: "Reagen hematologi",
		unit: "pcs",
		min: 20,
		seed: 50
	},
	{
		id: "golongan-kit",
		name: "Kit ABO + rhesus",
		category: "Reagen hematologi",
		unit: "kit",
		min: 2,
		seed: 4
	},
	{
		id: "pt-aptt",
		name: "Reagen PT / APTT",
		category: "Reagen hematologi",
		unit: "kit",
		min: 2,
		seed: 3
	},
	{
		id: "glukosa-r",
		name: "Reagen glukosa oksidase",
		category: "Reagen kimia",
		unit: "kit",
		min: 3,
		seed: 6
	},
	{
		id: "ureum-r",
		name: "Reagen ureum",
		category: "Reagen kimia",
		unit: "kit",
		min: 2,
		seed: 4
	},
	{
		id: "kreatinin-r",
		name: "Reagen kreatinin",
		category: "Reagen kimia",
		unit: "kit",
		min: 2,
		seed: 4
	},
	{
		id: "sgot-r",
		name: "Reagen SGOT (AST)",
		category: "Reagen kimia",
		unit: "kit",
		min: 2,
		seed: 4
	},
	{
		id: "sgpt-r",
		name: "Reagen SGPT (ALT)",
		category: "Reagen kimia",
		unit: "kit",
		min: 2,
		seed: 4
	},
	{
		id: "lipid-r",
		name: "Reagen kolesterol / HDL / LDL / TG",
		category: "Reagen kimia",
		unit: "kit",
		min: 2,
		seed: 3
	},
	{
		id: "hba1c-r",
		name: "Reagen HbA1c",
		category: "Reagen kimia",
		unit: "kit",
		min: 1,
		seed: 2
	},
	{
		id: "elektrolit-r",
		name: "Reagen ISE Na/K/Cl",
		category: "Reagen kimia",
		unit: "pack",
		min: 1,
		seed: 2
	},
	{
		id: "kalibrator",
		name: "Kalibrator kimia klinik",
		category: "Reagen kimia",
		unit: "set",
		min: 1,
		seed: 2
	},
	{
		id: "kontrol-kimia",
		name: "Kontrol serum 2 level",
		category: "Reagen kimia",
		unit: "vial",
		min: 4,
		seed: 8
	},
	{
		id: "akuades",
		name: "Akuades / aquadest 5 L",
		category: "Reagen kimia",
		unit: "galon",
		min: 6,
		seed: 12
	},
	{
		id: "nacl",
		name: "NaCl 0,9% 500 mL",
		category: "Reagen kimia",
		unit: "botol",
		min: 10,
		seed: 24
	},
	{
		id: "hbsag-r",
		name: "Kit HBsAg ECLIA / rapid",
		category: "Reagen imunologi",
		unit: "kit",
		min: 2,
		seed: 4
	},
	{
		id: "anti-hiv",
		name: "Kit Anti-HIV",
		category: "Reagen imunologi",
		unit: "kit",
		min: 2,
		seed: 3
	},
	{
		id: "anti-hcv",
		name: "Kit Anti-HCV",
		category: "Reagen imunologi",
		unit: "kit",
		min: 1,
		seed: 2
	},
	{
		id: "vdrl",
		name: "Kit VDRL / RPR",
		category: "Reagen imunologi",
		unit: "kit",
		min: 1,
		seed: 2
	},
	{
		id: "widal",
		name: "Kit Widal",
		category: "Reagen imunologi",
		unit: "kit",
		min: 1,
		seed: 2
	},
	{
		id: "ns1-dengue",
		name: "Kit NS1 + IgG/IgM dengue",
		category: "Reagen imunologi",
		unit: "kit",
		min: 2,
		seed: 4
	},
	{
		id: "hcg",
		name: "Strip tes kehamilan",
		category: "Reagen imunologi",
		unit: "box",
		min: 3,
		seed: 8
	},
	{
		id: "narkoba",
		name: "Strip narkoba 6 parameter",
		category: "Reagen imunologi",
		unit: "box",
		min: 2,
		seed: 5
	},
	{
		id: "urine-strip",
		name: "Carik celup urin 10 parameter",
		category: "Urin & feses",
		unit: "vial",
		min: 4,
		seed: 8
	},
	{
		id: "urin-kontrol",
		name: "Kontrol urin",
		category: "Urin & feses",
		unit: "vial",
		min: 2,
		seed: 3
	},
	{
		id: "sedimen",
		name: "Tabung sedimen urin",
		category: "Urin & feses",
		unit: "pack",
		min: 4,
		seed: 10
	},
	{
		id: "eosin",
		name: "Eosin / pewarna feses",
		category: "Urin & feses",
		unit: "botol",
		min: 2,
		seed: 4
	},
	{
		id: "needle-21",
		name: "Jarum vacutainer 21G",
		category: "Habis pakai periksa",
		unit: "box",
		min: 8,
		seed: 16
	},
	{
		id: "needle-23",
		name: "Jarum vacutainer 23G",
		category: "Habis pakai periksa",
		unit: "box",
		min: 6,
		seed: 12
	},
	{
		id: "spuit-3",
		name: "Spuit 3 mL",
		category: "Habis pakai periksa",
		unit: "box",
		min: 10,
		seed: 20
	},
	{
		id: "spuit-5",
		name: "Spuit 5 mL",
		category: "Habis pakai periksa",
		unit: "box",
		min: 8,
		seed: 16
	},
	{
		id: "alkohol-swab",
		name: "Alkohol swab",
		category: "Habis pakai periksa",
		unit: "box",
		min: 12,
		seed: 30
	},
	{
		id: "kapas",
		name: "Kapas pembalut",
		category: "Habis pakai periksa",
		unit: "pack",
		min: 8,
		seed: 18
	},
	{
		id: "plester",
		name: "Plester / micropore",
		category: "Habis pakai periksa",
		unit: "roll",
		min: 10,
		seed: 24
	},
	{
		id: "torniket",
		name: "Torniket",
		category: "Habis pakai periksa",
		unit: "pcs",
		min: 8,
		seed: 15
	},
	{
		id: "tip-kuning",
		name: "Tip pipet kuning 2–200 µL",
		category: "Habis pakai periksa",
		unit: "rak",
		min: 10,
		seed: 24
	},
	{
		id: "tip-biru",
		name: "Tip pipet biru 100–1000 µL",
		category: "Habis pakai periksa",
		unit: "rak",
		min: 8,
		seed: 20
	},
	{
		id: "cuvette",
		name: "Kuvet fotometer",
		category: "Habis pakai periksa",
		unit: "pack",
		min: 6,
		seed: 12
	},
	{
		id: "slide",
		name: "Object glass + cover glass",
		category: "Habis pakai periksa",
		unit: "box",
		min: 4,
		seed: 8
	},
	{
		id: "lanset",
		name: "Lanset glukosa",
		category: "Habis pakai periksa",
		unit: "box",
		min: 6,
		seed: 12
	},
	{
		id: "strip-glukosa",
		name: "Strip glukosa point-of-care",
		category: "Habis pakai periksa",
		unit: "vial",
		min: 4,
		seed: 8
	},
	{
		id: "gel-usg",
		name: "Gel USG 5 L",
		category: "Radiologi & USG",
		unit: "galon",
		min: 3,
		seed: 6
	},
	{
		id: "kertas-usg",
		name: "Kertas thermal USG",
		category: "Radiologi & USG",
		unit: "roll",
		min: 6,
		seed: 12
	},
	{
		id: "film-xray",
		name: "Film rontgen / kertas dry",
		category: "Radiologi & USG",
		unit: "box",
		min: 4,
		seed: 8
	},
	{
		id: "developer",
		name: "Cairan prosesing film (jika analog)",
		category: "Radiologi & USG",
		unit: "kanister",
		min: 1,
		seed: 2
	},
	{
		id: "apron",
		name: "Apron timbal cadangan",
		category: "Radiologi & USG",
		unit: "pcs",
		min: 2,
		seed: 4
	},
	{
		id: "ekg-kertas",
		name: "Kertas EKG",
		category: "Radiologi & USG",
		unit: "roll",
		min: 6,
		seed: 14
	},
	{
		id: "elektroda",
		name: "Elektroda EKG",
		category: "Radiologi & USG",
		unit: "pack",
		min: 8,
		seed: 16
	},
	{
		id: "sarung-s",
		name: "Sarung tangan S",
		category: "APD karyawan",
		unit: "box",
		min: 10,
		seed: 20
	},
	{
		id: "sarung-m",
		name: "Sarung tangan M",
		category: "APD karyawan",
		unit: "box",
		min: 16,
		seed: 36
	},
	{
		id: "sarung-l",
		name: "Sarung tangan L",
		category: "APD karyawan",
		unit: "box",
		min: 12,
		seed: 24
	},
	{
		id: "masker",
		name: "Masker bedah 3 ply",
		category: "APD karyawan",
		unit: "box",
		min: 12,
		seed: 28
	},
	{
		id: "n95",
		name: "Masker N95 / KN95",
		category: "APD karyawan",
		unit: "box",
		min: 4,
		seed: 8
	},
	{
		id: "jas-lab",
		name: "Jas laboratorium",
		category: "APD karyawan",
		unit: "pcs",
		min: 8,
		seed: 16
	},
	{
		id: "sepatu",
		name: "Sepatu safety / clog",
		category: "APD karyawan",
		unit: "pasang",
		min: 4,
		seed: 8
	},
	{
		id: "kacamata",
		name: "Kacamata pelindung",
		category: "APD karyawan",
		unit: "pcs",
		min: 6,
		seed: 12
	},
	{
		id: "face-shield",
		name: "Face shield",
		category: "APD karyawan",
		unit: "pcs",
		min: 6,
		seed: 10
	},
	{
		id: "haircap",
		name: "Haircap / head cover",
		category: "APD karyawan",
		unit: "pack",
		min: 6,
		seed: 12
	},
	{
		id: "klorin",
		name: "Klorin / kalsium hipoklorit",
		category: "Kebersihan / janitor",
		unit: "kg",
		min: 4,
		seed: 10
	},
	{
		id: "alkohol-70",
		name: "Alkohol 70% 1 L",
		category: "Kebersihan / janitor",
		unit: "botol",
		min: 12,
		seed: 24
	},
	{
		id: "handsoap",
		name: "Sabun cuci tangan",
		category: "Kebersihan / janitor",
		unit: "galon",
		min: 6,
		seed: 12
	},
	{
		id: "handrub",
		name: "Handrub antiseptik",
		category: "Kebersihan / janitor",
		unit: "botol",
		min: 10,
		seed: 20
	},
	{
		id: "disinfektan",
		name: "Disinfektan lantai",
		category: "Kebersihan / janitor",
		unit: "jerigen",
		min: 4,
		seed: 8
	},
	{
		id: "sapu",
		name: "Sapu + pengki",
		category: "Kebersihan / janitor",
		unit: "set",
		min: 4,
		seed: 8
	},
	{
		id: "pel",
		name: "Alat pel + ember",
		category: "Kebersihan / janitor",
		unit: "set",
		min: 4,
		seed: 6
	},
	{
		id: "kain-lap",
		name: "Kain microfiber",
		category: "Kebersihan / janitor",
		unit: "pcs",
		min: 15,
		seed: 30
	},
	{
		id: "plastik-hitam",
		name: "Kantong sampah hitam",
		category: "Kebersihan / janitor",
		unit: "pack",
		min: 8,
		seed: 16
	},
	{
		id: "tisu",
		name: "Tisu toilet / wastafel",
		category: "Kebersihan / janitor",
		unit: "pack",
		min: 12,
		seed: 24
	},
	{
		id: "pengharum",
		name: "Pengharum ruangan",
		category: "Kebersihan / janitor",
		unit: "pcs",
		min: 6,
		seed: 12
	},
	{
		id: "tissue-lab",
		name: "Tissue lab / kimwipes",
		category: "Kebersihan / janitor",
		unit: "box",
		min: 8,
		seed: 16
	},
	{
		id: "kertas-a4",
		name: "Kertas A4 hasil lab",
		category: "Kantor & cetak",
		unit: "rim",
		min: 8,
		seed: 16
	},
	{
		id: "toner",
		name: "Toner / tinta printer hasil",
		category: "Kantor & cetak",
		unit: "pcs",
		min: 3,
		seed: 6
	},
	{
		id: "stiker-edta",
		name: "Stiker barcode tabung",
		category: "Kantor & cetak",
		unit: "roll",
		min: 6,
		seed: 12
	},
	{
		id: "ribbon",
		name: "Ribbon printer barcode",
		category: "Kantor & cetak",
		unit: "pcs",
		min: 3,
		seed: 6
	},
	{
		id: "struk-roll",
		name: "Kertas struk kasir 58 mm",
		category: "Kantor & cetak",
		unit: "roll",
		min: 8,
		seed: 18
	},
	{
		id: "amplop-hasil",
		name: "Amplop hasil laboratorium",
		category: "Kantor & cetak",
		unit: "pack",
		min: 6,
		seed: 12
	},
	{
		id: "stempel",
		name: "Tinta stempel + pad",
		category: "Kantor & cetak",
		unit: "set",
		min: 2,
		seed: 4
	},
	{
		id: "atasan",
		name: "Bolpen / spidol lab",
		category: "Kantor & cetak",
		unit: "pack",
		min: 6,
		seed: 12
	},
	{
		id: "map",
		name: "Map rekam medis",
		category: "Kantor & cetak",
		unit: "pack",
		min: 4,
		seed: 8
	},
	{
		id: "sharps",
		name: "Safety box / sharps container",
		category: "K3 & limbah",
		unit: "pcs",
		min: 10,
		seed: 20
	},
	{
		id: "biohazard",
		name: "Kantong biohazard kuning",
		category: "K3 & limbah",
		unit: "pack",
		min: 8,
		seed: 16
	},
	{
		id: "spill-kit",
		name: "Spill kit darah / kimia",
		category: "K3 & limbah",
		unit: "set",
		min: 2,
		seed: 3
	},
	{
		id: "eyewash",
		name: "Cairan eyewash",
		category: "K3 & limbah",
		unit: "botol",
		min: 2,
		seed: 4
	},
	{
		id: "p3k",
		name: "Isi ulang kotak P3K",
		category: "K3 & limbah",
		unit: "set",
		min: 2,
		seed: 4
	},
	{
		id: "apd-tumpah",
		name: "APD tumpahan (apron plastik)",
		category: "K3 & limbah",
		unit: "pcs",
		min: 6,
		seed: 12
	},
	{
		id: "galon-air",
		name: "Galon air minum karyawan",
		category: "Umum & fasilitas",
		unit: "galon",
		min: 8,
		seed: 16
	},
	{
		id: "kopi-teh",
		name: "Kopi / teh / gula pantri",
		category: "Umum & fasilitas",
		unit: "pack",
		min: 4,
		seed: 8
	},
	{
		id: "gelas",
		name: "Gelas / cup karyawan",
		category: "Umum & fasilitas",
		unit: "pack",
		min: 4,
		seed: 8
	},
	{
		id: "baterai",
		name: "Baterai AA / AAA alat",
		category: "Umum & fasilitas",
		unit: "pack",
		min: 4,
		seed: 8
	},
	{
		id: "lampu",
		name: "Lampu cadangan ruang periksa",
		category: "Umum & fasilitas",
		unit: "pcs",
		min: 6,
		seed: 12
	},
	{
		id: "ac-filter",
		name: "Filter AC ruang lab",
		category: "Umum & fasilitas",
		unit: "pcs",
		min: 4,
		seed: 8
	}
];
var stockBranches = priceBranches;
var KEY = "biomed-fo-stok-v3";
function hash(s) {
	let h = 0;
	for (const c of s) h = h * 33 + c.charCodeAt(0) >>> 0;
	return h;
}
function seedQty(branch, item) {
	if (branch === "serang") return item.seed * 3;
	const factor = .28 + hash(branch + item.id) % 20 / 100;
	return Math.max(item.min, Math.round(item.seed * factor));
}
function emptyQty() {
	const qty = {};
	for (const b of stockBranches) {
		qty[b.id] = {};
		for (const item of catalog) qty[b.id][item.id] = seedQty(b.id, item);
	}
	return qty;
}
function seedMoves() {
	const moves = [];
	const now = Date.now();
	for (let d = 13; d >= 0; d--) {
		const day = (/* @__PURE__ */ new Date(now - d * 864e5)).toISOString().slice(0, 10);
		for (const b of stockBranches) {
			const n = 4 + hash(day + b.id) % 5;
			for (let i = 0; i < n; i++) {
				const item = catalog[hash(day + b.id + String(i)) % catalog.length];
				const qty = 1 + hash(item.id + day) % 3;
				moves.push({
					id: `seed-${day}-${b.id}-${i}`,
					at: `${day}T0${(8 + i) % 9}:00:00.000Z`,
					itemId: item.id,
					qty,
					type: "pakai",
					from: b.id,
					to: "pakai"
				});
			}
		}
		if (d % 3 === 0) {
			const dest = stockBranches[1 + hash(day) % 4];
			const item = catalog[hash(day + "dist") % catalog.length];
			moves.push({
				id: `seed-dist-${day}`,
				at: `${day}T07:00:00.000Z`,
				itemId: item.id,
				qty: 4 + hash(day) % 8,
				type: "distribusi",
				from: "serang",
				to: dest.id
			});
		}
	}
	return moves;
}
function defaultState() {
	return {
		qty: emptyQty(),
		moves: seedMoves(),
		extras: []
	};
}
function allItems(state) {
	return [...catalog, ...state.extras ?? []];
}
function ensure(state) {
	const extras = state.extras ?? [];
	const qty = { ...state.qty };
	for (const b of stockBranches) {
		qty[b.id] = { ...qty[b.id] ?? {} };
		for (const item of [...catalog, ...extras]) if (qty[b.id][item.id] == null) qty[b.id][item.id] = catalog.some((c) => c.id === item.id) ? seedQty(b.id, item) : 0;
	}
	return {
		qty,
		moves: state.moves ?? [],
		extras
	};
}
function loadStock() {
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) ?? "");
		if (raw?.qty && raw?.moves) return ensure(raw);
	} catch {}
	const state = defaultState();
	saveStock(state);
	return state;
}
function saveStock(state) {
	localStorage.setItem(KEY, JSON.stringify(state));
}
function qtyOf(state, branch, itemId) {
	return state.qty[branch]?.[itemId] ?? 0;
}
function itemLedger(state, branch, itemId) {
	const sisa = qtyOf(state, branch, itemId);
	const pakai = state.moves.filter((m) => m.type === "pakai" && m.itemId === itemId && m.from === branch).reduce((n, m) => n + m.qty, 0);
	const kirim = state.moves.find((m) => m.type === "distribusi" && m.itemId === itemId && (m.to === branch || m.from === branch))?.qty ?? 0;
	return {
		awal: sisa + kirim + pakai,
		kirim,
		pakai,
		sisa
	};
}
function setQty(state, branch, itemId, next, type) {
	const prev = qtyOf(state, branch, itemId);
	const n = Math.max(0, next);
	const delta = n - prev;
	if (delta === 0) return state;
	const nextState = {
		qty: {
			...state.qty,
			[branch]: {
				...state.qty[branch],
				[itemId]: n
			}
		},
		moves: [{
			id: crypto.randomUUID(),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			itemId,
			qty: Math.abs(delta),
			type: delta < 0 ? "pakai" : type,
			from: branch,
			to: delta < 0 ? "pakai" : branch
		}, ...state.moves].slice(0, 800)
	};
	saveStock(nextState);
	return nextState;
}
function distribute(state, itemId, to, amount) {
	if (to === "serang") return "Tujuan harus cabang, bukan Serang.";
	const have = qtyOf(state, "serang", itemId);
	if (amount < 1) return "Jumlah minimal 1.";
	if (amount > have) return "Stok Serang tidak cukup.";
	const nextState = {
		qty: {
			...state.qty,
			serang: {
				...state.qty.serang,
				[itemId]: have - amount
			},
			[to]: {
				...state.qty[to],
				[itemId]: qtyOf(state, to, itemId) + amount
			}
		},
		moves: [{
			id: crypto.randomUUID(),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			itemId,
			qty: amount,
			type: "distribusi",
			from: "serang",
			to
		}, ...state.moves].slice(0, 800)
	};
	saveStock(nextState);
	return nextState;
}
function itemName(id, state) {
	return allItems(state ?? {
		qty: {},
		moves: [],
		extras: []
	}).find((c) => c.id === id)?.name ?? id;
}
function addItem(state, input) {
	const id = `x-${input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}-${Date.now().toString(36)}`;
	const item = {
		id,
		name: input.name.trim(),
		category: input.category,
		unit: input.unit,
		min: Math.max(0, input.min),
		seed: 0,
		isi: needsIsi(input.unit) ? Math.max(1, input.isi ?? 100) : void 0
	};
	const qty = { ...state.qty };
	for (const b of stockBranches) qty[b.id] = {
		...qty[b.id] ?? {},
		[id]: 0
	};
	const next = {
		qty,
		moves: state.moves,
		extras: [...state.extras ?? [], item]
	};
	saveStock(next);
	return next;
}
function alerts(state) {
	const out = [];
	for (const b of stockBranches) for (const item of allItems(state)) {
		const q = qtyOf(state, b.id, item.id);
		if (q <= 0) out.push({
			branch: b.id,
			item,
			qty: q,
			status: "habis"
		});
		else if (q <= item.min) out.push({
			branch: b.id,
			item,
			qty: q,
			status: "menipis"
		});
	}
	return out.sort((a, b) => a.status === b.status ? a.qty - b.qty : a.status === "habis" ? -1 : 1);
}
var units = [
	"pcs",
	"box",
	"pak",
	"rak",
	"botol",
	"kit",
	"vial",
	"roll",
	"galon",
	"set",
	"pack"
];
function Bar({ value, max, label }) {
	const w = max <= 0 ? 0 : Math.round(value / max * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between text-xs text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			children: value
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-3 overflow-hidden rounded-full bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-3 rounded-full bg-red",
			style: { width: `${w}%` }
		})
	})] });
}
function StockList() {
	const [state, setState] = (0, import_react.useState)(loadStock);
	const [tab, setTab] = (0, import_react.useState)("kontrol");
	const [branch, setBranch] = (0, import_react.useState)(getCabang);
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("Semua");
	const [distItem, setDistItem] = (0, import_react.useState)(catalog[0]?.id ?? "edta-3");
	const [distTo, setDistTo] = (0, import_react.useState)("cilegon");
	const [distQty, setDistQty] = (0, import_react.useState)("4");
	const [distMsg, setDistMsg] = (0, import_react.useState)("");
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newCat, setNewCat] = (0, import_react.useState)("Habis pakai periksa");
	const [newUnit, setNewUnit] = (0, import_react.useState)("box");
	const [newIsi, setNewIsi] = (0, import_react.useState)("100");
	const [newMin, setNewMin] = (0, import_react.useState)("4");
	const [addMsg, setAddMsg] = (0, import_react.useState)("");
	const items = allItems(state);
	const flag = alerts(state);
	const habis = flag.filter((a) => a.status === "habis");
	const tipis = flag.filter((a) => a.status === "menipis");
	const rows = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return items.filter((c) => {
			const okCat = cat === "Semua" || c.category === cat;
			const okQ = !needle || c.name.toLowerCase().includes(needle);
			return okCat && okQ;
		});
	}, [
		q,
		cat,
		items
	]);
	function bump(id, d) {
		setState((s) => setQty(s, branch, id, qtyOf(s, branch, id) + d, d > 0 ? "masuk" : "pakai"));
	}
	function sendDist() {
		const n = Number(distQty);
		const res = distribute(state, distItem, distTo, n);
		if (typeof res === "string") {
			setDistMsg(res);
			return;
		}
		setState(res);
		setDistMsg(`Terkirim ${n} ke ${stockBranches.find((b) => b.id === distTo)?.label}.`);
	}
	function submitItem() {
		if (newName.trim().length < 2) {
			setAddMsg("Nama barang wajib.");
			return;
		}
		const next = addItem(state, {
			name: newName,
			category: newCat,
			unit: newUnit,
			min: Number(newMin) || 0,
			isi: needsIsi(newUnit) ? Number(newIsi) || 100 : void 0
		});
		setState(next);
		setNewName("");
		setAddMsg("Barang ditambahkan. Isi stok di tab Stok cabang atau kirim dari Serang.");
	}
	const days = (0, import_react.useMemo)(() => {
		const out = [];
		for (let i = 13; i >= 0; i--) {
			const day = (/* @__PURE__ */ new Date(Date.now() - i * 864e5)).toISOString().slice(0, 10);
			const pakai = state.moves.filter((m) => m.type === "pakai" && m.at.slice(0, 10) === day).reduce((s, m) => s + m.qty, 0);
			out.push({
				day: day.slice(5),
				pakai
			});
		}
		return out;
	}, [state.moves]);
	const perBranchSisa = stockBranches.map((b) => ({
		id: b.id,
		label: b.label,
		sisa: items.reduce((s, c) => s + qtyOf(state, b.id, c.id), 0)
	}));
	const perBranchDist = stockBranches.filter((b) => b.id !== "serang").map((b) => ({
		label: b.label,
		qty: state.moves.filter((m) => m.type === "distribusi" && m.to === b.id).reduce((s, m) => s + m.qty, 0)
	}));
	const maxPakai = Math.max(1, ...days.map((d) => d.pakai));
	const maxSisa = Math.max(1, ...perBranchSisa.map((b) => b.sisa));
	const maxDist = Math.max(1, ...perBranchDist.map((b) => b.qty));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-hidden p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					["kontrol", "Kontrol"],
					["butuh", "Kebutuhan cabang"],
					["stok", "Stok cabang"],
					["tambah", "Tambah barang"],
					["dist", "Distribusi"],
					["grafik", "Grafik"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: `h-10 rounded-full px-4 text-sm font-semibold ${tab === id ? "bg-ink text-chalk" : "border border-line bg-surface text-muted"}`,
					children: label
				}, id))
			}),
			tab === "kontrol" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 min-h-0 flex-1 space-y-6 overflow-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-line bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-widest text-muted",
									children: "Habis"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-4xl text-red",
									children: habis.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: stockBranches.map((b) => {
										const n = habis.filter((a) => a.branch === b.id).length;
										return n ? `${b.label} ${n}` : "";
									}).filter(Boolean).join(" · ") || "Tidak ada"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-line bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-widest text-muted",
									children: "Menipis"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-4xl",
									children: tipis.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: stockBranches.map((b) => {
										const n = tipis.filter((a) => a.branch === b.id).length;
										return n ? `${b.label} ${n}` : "";
									}).filter(Boolean).join(" · ") || "Tidak ada"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-line bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-widest text-muted",
									children: "Aman"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-4xl",
									children: items.length * stockBranches.length - flag.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: "Di atas minimum di semua cabang"
								})
							]
						})
					]
				}), stockBranches.map((b) => {
					const list = flag.filter((a) => a.branch === b.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-2xl",
							children: [b.label, b.id === "serang" ? " · gudang pusat" : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "sisa awal − dikirim − pakai = sisa"
						}),
						list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								"Tidak ada yang menipis di ",
								b.label,
								"."
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 divide-y divide-line rounded-xl border border-line bg-surface",
							children: list.slice(0, 12).map((a) => {
								const L = itemLedger(state, b.id, a.item.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex flex-wrap items-center justify-between gap-2 px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: a.item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs tabular-nums text-muted",
										children: [
											L.awal,
											" − ",
											L.kirim,
											" − ",
											L.pakai,
											" = ",
											L.sisa,
											" ",
											a.item.unit
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `font-display text-2xl tabular-nums ${L.sisa <= 0 ? "text-red" : ""}`,
										children: L.sisa
									})]
								}, a.item.id);
							})
						})
					] }, b.id);
				})]
			}) : null,
			tab === "butuh" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 min-h-0 flex-1 overflow-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto",
						children: stockBranches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setBranch(b.id),
							className: `h-9 shrink-0 rounded-full px-3 text-xs font-semibold ${branch === b.id ? "bg-red text-chalk" : "border border-line bg-surface text-muted"}`,
							children: b.label
						}, b.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: [
							"Daftar barang yang habis atau menipis di ",
							stockBranches.find((b) => b.id === branch)?.label,
							". Jumlah usulan = sampai minimum. Kirim dari gudang Serang."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 divide-y divide-line rounded-xl border border-line bg-surface",
						children: [flag.filter((a) => a.branch === branch).map((a) => {
							const need = Math.max(a.item.min - a.qty, 1);
							const pusat = qtyOf(state, "serang", a.item.id);
							const can = branch !== "serang" && pusat >= need;
							const L = itemLedger(state, branch, a.item.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: a.item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs tabular-nums text-muted",
									children: [
										L.awal,
										" − ",
										L.kirim,
										" − ",
										L.pakai,
										" = ",
										L.sisa,
										" ",
										a.item.unit
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `font-display text-2xl tabular-nums ${L.sisa <= 0 ? "text-red" : ""}`,
										children: L.sisa
									}), branch === "serang" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: "Supplier"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: !can,
										onClick: () => {
											const res = distribute(state, a.item.id, branch, need);
											if (typeof res === "string") {
												setDistMsg(res);
												return;
											}
											setState(res);
											setDistMsg(`Terkirim ${need} ${a.item.unit}.`);
										},
										className: "h-9 rounded-full bg-gold px-3 text-xs font-semibold text-ink disabled:opacity-40",
										children: ["Kirim ", need]
									})]
								})]
							}, a.item.id);
						}), flag.filter((a) => a.branch === branch).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-4 py-6 text-sm text-muted",
							children: "Tidak ada kebutuhan di cabang ini."
						}) : null]
					}),
					distMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: distMsg
					}) : null
				]
			}) : null,
			tab === "stok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex gap-2 overflow-x-auto",
					children: stockBranches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setBranch(b.id),
						className: `h-9 shrink-0 rounded-full px-3 text-xs font-semibold ${branch === b.id ? "bg-red text-chalk" : "border border-line bg-surface text-muted"}`,
						children: [b.label, b.id === "serang" ? " · gudang" : ""]
					}, b.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative mt-3 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Cari barang",
						className: "h-12 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-blue"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2 overflow-x-auto pb-1",
					children: ["Semua", ...stockCategories].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCat(c),
						className: `h-9 shrink-0 rounded-full px-3 text-xs font-semibold ${cat === c ? "bg-ink text-chalk" : "border border-line bg-surface text-muted"}`,
						children: c
					}, c))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 min-h-0 flex-1 overflow-auto divide-y divide-line rounded-xl border border-line bg-surface",
					children: rows.map((c) => {
						const qty = qtyOf(state, branch, c.id);
						const danger = qty <= c.min;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									"min ",
									c.min,
									" ",
									c.unit,
									isiOf(c) > 1 ? ` · 1 ${c.unit} = ${isiOf(c)} pcs` : "",
									danger ? " · restok dari Serang" : ""
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-9 place-items-center rounded-full border border-line",
										onClick: () => bump(c.id, -1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `min-w-16 text-center font-display text-lg tabular-nums ${danger ? "text-red" : ""}`,
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-9 place-items-center rounded-full border border-line",
										onClick: () => bump(c.id, 1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-28 text-xs text-muted",
										children: qtyLabel(c, qty)
									})
								]
							})]
						}, c.id);
					})
				})
			] }) : null,
			tab === "tambah" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 max-w-xl space-y-4",
				onSubmit: (e) => {
					e.preventDefault();
					submitItem();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Barang baru masuk katalog semua cabang, stok awal 0. Jika satuan box/pak/rak/vial, isi jumlah pcs di dalamnya."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Nama barang", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: newName,
							onChange: (e) => setNewName(e.target.value),
							className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Kelompok", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: newCat,
							onChange: (e) => setNewCat(e.target.value),
							className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm",
							children: stockCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["Satuan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: newUnit,
								onChange: (e) => setNewUnit(e.target.value),
								className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm",
								children: units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: u }, u))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["Minimum", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: newMin,
								onChange: (e) => setNewMin(e.target.value.replace(/\D/g, "")),
								inputMode: "numeric",
								className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
							})]
						})]
					}),
					needsIsi(newUnit) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: [
							"Isi per ",
							newUnit,
							" (pcs)",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: newIsi,
								onChange: (e) => setNewIsi(e.target.value.replace(/\D/g, "")),
								inputMode: "numeric",
								className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-muted",
								children: "Contoh: 1 box = 100 pcs sarung tangan."
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-12 w-full rounded-full bg-red text-sm font-semibold text-chalk",
						children: "Simpan barang"
					}),
					addMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: addMsg
					}) : null
				]
			}) : null,
			tab === "dist" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 max-w-xl space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Gudang Serang mengirim ke cabang lain."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Barang", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: distItem,
							onChange: (e) => setDistItem(e.target.value),
							className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm",
							children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: c.id,
								children: [
									c.name,
									" · Serang ",
									qtyOf(state, "serang", c.id),
									" ",
									c.unit
								]
							}, c.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Cabang tujuan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: distTo,
							onChange: (e) => setDistTo(e.target.value),
							className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm",
							children: stockBranches.filter((b) => b.id !== "serang").map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: b.id,
								children: b.label
							}, b.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: [
							"Jumlah (",
							items.find((i) => i.id === distItem)?.unit ?? "unit",
							")",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: distQty,
								onChange: (e) => setDistQty(e.target.value.replace(/\D/g, "")),
								inputMode: "numeric",
								className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: sendDist,
						className: "h-12 w-full rounded-full bg-red text-sm font-semibold text-chalk",
						children: "Kirim dari Serang"
					}),
					distMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: distMsg
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line rounded-xl border border-line bg-surface",
						children: state.moves.filter((m) => m.type === "distribusi").slice(0, 8).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "px-4 py-3 text-sm",
							children: [
								itemName(m.itemId, state),
								" · ",
								m.qty,
								" · Serang → ",
								stockBranches.find((b) => b.id === m.to)?.label ?? m.to
							]
						}, m.id))
					})
				]
			}) : null,
			tab === "grafik" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 min-h-0 flex-1 space-y-8 overflow-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Sisa stok per cabang"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-3 rounded-xl border border-line bg-surface p-4",
						children: perBranchSisa.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							label: b.label,
							value: b.sisa,
							max: maxSisa
						}, b.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Pemakaian 14 hari"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex h-40 items-end gap-1 rounded-xl border border-line bg-surface p-4",
						children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col items-center justify-end gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full rounded-t bg-red",
								style: { height: `${Math.round(d.pakai / maxPakai * 100)}%` }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: d.day.slice(3)
							})]
						}, d.day))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Distribusi dari Serang"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-3 rounded-xl border border-line bg-surface p-4",
						children: perBranchDist.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							label: b.label,
							value: b.qty,
							max: maxDist
						}, b.label))
					})] })
				]
			}) : null
		]
	});
}
var methods = [
	"Tunai",
	"QRIS",
	"Debit",
	"Asuransi",
	"Perusahaan"
];
var FO_PIN = "bio1234";
function printStruk(sale, patient) {
	const rows = sale.items.map((i) => `<tr><td>${i.name}</td><td class="r">${i.qty}</td><td class="r">${formatRupiah(i.price * i.qty)}</td></tr>`).join("");
	const when = new Date(sale.created).toLocaleString("id-ID");
	const idLine = patient ? `${patient.kelamin === "P" ? "Perempuan" : "Laki-laki"} · ${ageOf(patient.lahir)} · KTP ${patient.ktp}` : `KTP ${sale.ktp}`;
	const kode = kodeOf(sale);
	const url = hasilUrl(kode);
	const html = `<!doctype html><html><head><meta charset="utf-8"><title>Struk ${sale.nomor}</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#1a2832;margin:0;padding:16px}
  h1{font-size:18px;margin:0} p,td{font-size:12px}
  table{width:100%;border-collapse:collapse;margin-top:8px}
  td{padding:4px 0;border-bottom:1px dashed #d4dce3} .r{text-align:right}
  .muted{color:#5d6d78} .big{font-size:22px;font-weight:700;letter-spacing:.12em}
  ${markCss()}
  @media print { button { display:none } }
</style></head><body>
  <p class="muted">${company.legalName}</p>
  <h1>${company.brand}</h1>
  <p>${sale.cabang}<br>${when}</p>
  <p class="big">${sale.nomor}</p>
  <p>Pasien: <strong>${sale.nama}</strong><br>HP: ${sale.hp}<br>${idLine}</p>
  <table>${rows}
    <tr><td colspan="2">Total</td><td class="r"><strong>${formatRupiah(sale.total)}</strong></td></tr>
    <tr><td colspan="2">${sale.metode}</td><td class="r">${formatRupiah(sale.bayar)}</td></tr>
    <tr><td colspan="2">Kembali</td><td class="r">${formatRupiah(sale.kembali)}</td></tr>
  </table>
  <p class="muted">Tanda pembayaran. Bukan hasil lab. Pindai barcode untuk membuka hasil jika sudah selesai.</p>
  ${linkMark(url, kode, "Barcode hasil pemeriksaan")}
  <button onclick="window.print()">Cetak</button>
  <script>window.onload=()=>window.print()<\/script>
</body></html>`;
	const w = window.open("", "struk-biomed", "width=420,height=760");
	if (!w) return;
	w.document.write(html);
	w.document.close();
}
function printStiker(sale, patient) {
	const code = sampleCode(sale.nomor, sale.created);
	const umur = patient ? ageOf(patient.lahir) : "";
	const svg = code128Svg(code, 40);
	const html = `<!doctype html><html><head><meta charset="utf-8"><title>Stiker EDTA ${sale.nomor}</title>
<style>
  @page { size: 50mm 30mm; margin: 2mm }
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#111;margin:0;padding:4px;width:46mm}
  .bc{width:100%;height:14mm}
  .bc svg{width:100%;height:14mm}
  .nama{font-size:11px;font-weight:700;margin-top:2px;line-height:1.2}
  .meta{font-size:9px;margin-top:1px}
  .edta{font-size:8px;letter-spacing:.18em;margin-top:2px;font-weight:700}
  @media print { button { display:none } body { print-color-adjust: exact } }
</style></head><body>
  <div class="bc">${svg}</div>
  <div class="nama">${sale.nama}</div>
  <div class="meta">${umur ? `Umur ${umur}` : ""} · ${sale.nomor}</div>
  <div class="edta">EDTA</div>
  <button onclick="window.print()">Cetak stiker</button>
  <script>window.onload=()=>window.print()<\/script>
</body></html>`;
	const w = window.open("", "stiker-edta", "width=360,height=280");
	if (!w) return;
	w.document.write(html);
	w.document.close();
}
function printHasil(sale, patient) {
	const rows = sale.hasil.map((h) => `<tr><td>${h.name}</td><td>${h.ready ? h.nilai || "—" : "Menunggu"}</td><td>${h.catatan || "—"}</td></tr>`).join("");
	const when = new Date(sale.created).toLocaleString("id-ID");
	const kode = kodeOf(sale);
	const url = validasiUrl(kode);
	const html = `<!doctype html><html><head><meta charset="utf-8"><title>Hasil ${sale.nomor}</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#1a2832;margin:0;padding:16px}
  h1{font-size:18px;margin:0} p,td,th{font-size:12px}
  table{width:100%;border-collapse:collapse;margin-top:8px}
  th,td{padding:6px 0;border-bottom:1px solid #d4dce3;text-align:left}
  .muted{color:#5d6d78}
  ${markCss()}
  @media print { button { display:none } }
</style></head><body>
  <p class="muted">${company.legalName}</p>
  <h1>Hasil laboratorium</h1>
  <p>${sale.cabang} · ${when} · ${sale.nomor}</p>
  <p><strong>${sale.nama}</strong><br>HP ${sale.hp}${patient ? `<br>${patient.kelamin === "P" ? "Perempuan" : "Laki-laki"} · ${ageOf(patient.lahir)} · KTP ${patient.ktp}` : ""}</p>
  <table><thead><tr><th>Pemeriksaan</th><th>Hasil</th><th>Catatan</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="muted">Pindai barcode untuk validasi keaslian surat hasil.</p>
  ${linkMark(url, kode, "Barcode keabsahan surat hasil")}
  <button onclick="window.print()">Cetak</button>
  <script>window.onload=()=>window.print()<\/script>
</body></html>`;
	const w = window.open("", "hasil-biomed", "width=520,height=800");
	if (!w) return;
	w.document.write(html);
	w.document.close();
}
function FrontOffice() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [gate, setGate] = (0, import_react.useState)(false);
	const [desk, setDesk] = (0, import_react.useState)(null);
	const [pin, setPin] = (0, import_react.useState)("");
	const [pinErr, setPinErr] = (0, import_react.useState)(false);
	const [cabang, setCabangId] = (0, import_react.useState)("serang");
	const [mode, setMode] = (0, import_react.useState)("baru");
	const [nama, setNama] = (0, import_react.useState)("");
	const [hp, setHp] = (0, import_react.useState)("");
	const [kelamin, setKelamin] = (0, import_react.useState)("L");
	const [lahir, setLahir] = (0, import_react.useState)("");
	const [ktp, setKtp] = (0, import_react.useState)("");
	const [lookup, setLookup] = (0, import_react.useState)("");
	const [patients, setPatients] = (0, import_react.useState)([]);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [openSale, setOpenSale] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const [cart, setCart] = (0, import_react.useState)([]);
	const [metode, setMetode] = (0, import_react.useState)("Tunai");
	const [tunai, setTunai] = (0, import_react.useState)("");
	const [sales, setSales] = (0, import_react.useState)([]);
	const [last, setLast] = (0, import_react.useState)(null);
	const searchRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setSales(loadSales());
		setPatients(loadPatients());
		setCabangId(getCabang());
	}, [open]);
	const catalog = testsFor(cabang);
	const hits = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		if (needle.length < 2) return catalog.slice(0, 12);
		return catalog.filter((t) => t.name.toLowerCase().includes(needle)).slice(0, 40);
	}, [q, catalog]);
	const found = (0, import_react.useMemo)(() => findPatient(patients, lookup), [patients, lookup]);
	const riwayat = picked ? sales.filter((s) => s.patientId === picked.id) : [];
	const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
	const paid = metode === "Tunai" ? Number(tunai.replace(/\D/g, "")) || 0 : total;
	const kembali = Math.max(0, paid - total);
	const canPay = (mode === "baru" && nama.trim().length > 1 && hp.trim().length >= 8 && lahir.length === 10 && ktp.replace(/\D/g, "").length >= 8 || mode === "lama" && !!picked) && cart.length > 0 && (metode !== "Tunai" || paid >= total);
	function addItem(id, name, price) {
		setCart((prev) => {
			if (prev.find((i) => i.id === id)) return prev.map((i) => i.id === id ? {
				...i,
				qty: i.qty + 1
			} : i);
			return [...prev, {
				id,
				name,
				price,
				qty: 1
			}];
		});
		setQ("");
		searchRef.current?.focus();
	}
	function qty(id, d) {
		setCart((prev) => prev.map((i) => i.id === id ? {
			...i,
			qty: i.qty + d
		} : i).filter((i) => i.qty > 0));
	}
	function pickPatient(p) {
		setPicked(p);
		setNama(p.nama);
		setHp(p.hp);
		setKelamin(p.kelamin);
		setLahir(p.lahir);
		setKtp(p.ktp);
		setMode("lama");
	}
	function persistPatients(list) {
		setPatients(list);
		savePatients(list);
	}
	function persistSales(list) {
		setSales(list);
		saveSales(list);
	}
	function checkout() {
		if (!canPay) return;
		const digits = ktp.replace(/\D/g, "");
		let patient = picked;
		if (mode === "baru") {
			const exist = patients.find((p) => p.ktp.replace(/\D/g, "") === digits);
			if (exist) patient = exist;
			else {
				patient = {
					id: crypto.randomUUID(),
					nama: nama.trim(),
					hp: hp.trim(),
					kelamin,
					lahir,
					ktp: digits,
					created: (/* @__PURE__ */ new Date()).toISOString()
				};
				persistPatients([patient, ...patients]);
			}
		}
		if (!patient) return;
		const hasil = cart.map((i) => {
			const ref = refFor(i.name, patient.kelamin);
			return {
				itemId: i.id,
				name: i.name,
				nilai: "",
				satuan: ref.satuan,
				rujukan: ref.rujukan,
				flag: "",
				catatan: "",
				ready: false
			};
		});
		const id = crypto.randomUUID();
		const nomor = nextNomor(sales);
		const sale = {
			id,
			nomor,
			kode: `${nomor}-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`,
			patientId: patient.id,
			nama: patient.nama,
			hp: patient.hp,
			ktp: patient.ktp,
			cabang: priceBranches.find((b) => b.id === cabang)?.label ?? cabang,
			items: cart,
			hasil,
			total,
			metode,
			bayar: paid,
			kembali,
			created: (/* @__PURE__ */ new Date()).toISOString()
		};
		persistSales([sale, ...sales]);
		publishSale(sale, patient);
		setLast(sale);
		setPicked(patient);
		setCart([]);
		setTunai("");
		setQ("");
		if (mode === "baru") {
			setNama("");
			setHp("");
			setLahir("");
			setKtp("");
			setPicked(null);
		}
	}
	function patchHasil(saleId, itemId, patch) {
		const next = sales.map((s) => s.id !== saleId ? s : {
			...s,
			hasil: s.hasil.map((h) => h.itemId === itemId ? {
				...h,
				...patch
			} : h)
		});
		persistSales(next);
		const sale = next.find((s) => s.id === saleId);
		if (sale) publishSale(sale, patients.find((p) => p.id === sale.patientId));
	}
	function unlock(e) {
		e.preventDefault();
		if (pin === FO_PIN) {
			setPin("");
			setPinErr(false);
			setGate(false);
			setOpen(true);
			return;
		}
		setPinErr(true);
	}
	function closeKasir() {
		setOpen(false);
		setGate(false);
		setDesk(null);
		setPin("");
		setPinErr(false);
	}
	if (!open && !gate) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": "Buka kasir front office",
		onClick: () => {
			setPin("");
			setPinErr(false);
			setGate(true);
		},
		className: "fixed bottom-0 left-1/2 z-50 flex h-12 w-20 -translate-x-1/2 items-center justify-center rounded-t-xl bg-gold text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 40 22",
			className: "h-6 w-10",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "20,0 40,22 0,22",
				fill: "currentColor"
			})
		})
	});
	if (gate && !open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-blue-deep/60 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: unlock,
			className: "w-full max-w-sm rounded-xl border border-line bg-paper p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-red",
					children: "Front office"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl",
					children: "Masukkan sandi loket"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-5 block text-sm font-medium",
					children: ["Sandi", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: pin,
						onChange: (e) => {
							setPin(e.target.value);
							setPinErr(false);
						},
						autoFocus: true,
						className: "mt-2 h-12 w-full rounded-lg border border-line bg-surface px-3 text-sm"
					})]
				}),
				pinErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-red",
					children: "Sandi salah."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 flex-1 rounded-full bg-red text-sm font-semibold text-chalk",
						children: "Masuk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setGate(false);
							setPin("");
						},
						className: "h-11 rounded-full border border-line px-4 text-sm font-semibold",
						children: "Batal"
					})]
				})
			]
		})
	});
	if (open && !desk) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-paper text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex shrink-0 items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-red",
				children: "Front office"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl sm:text-2xl",
				children: "Pilih meja"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: closeKasir,
				className: "grid size-11 place-items-center rounded-full border border-line",
				"aria-label": "Tutup",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-5xl gap-4 p-6 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setDesk("kasir"),
					className: "rounded-xl border border-line bg-surface p-8 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-red",
							children: "Loket"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl",
							children: "Kasir"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Daftar pasien, pilih pemeriksaan, bayar, cetak struk & stiker EDTA."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setDesk("hasil"),
					className: "rounded-xl border border-line bg-surface p-8 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-red",
							children: "Laboratorium"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl",
							children: "Hasil lab"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Isi nilai, satuan, rujukan, flag H/L, lalu cetak lembar hasil."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setDesk("stok"),
					className: "rounded-xl border border-line bg-surface p-8 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-red",
							children: "Gudang"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl",
							children: "Stok barang"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Reagen, tabung, APD, janitor, kertas hasil — stoklist persediaan."
						})
					]
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-paper text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex shrink-0 items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-red",
				children: "Front office"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl sm:text-2xl",
				children: desk === "hasil" ? "Pengisian hasil lab" : desk === "stok" ? "Stok persediaan" : "Kasir BIOMED"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setDesk(null),
						className: "h-10 rounded-full border border-line px-4 text-sm font-semibold",
						children: "Menu"
					}),
					desk === "kasir" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: cabang,
						onChange: (e) => {
							const id = e.target.value;
							if (isPriceBranch(id)) {
								setCabangId(id);
								setCabang(id);
								setCart([]);
							}
						},
						className: "h-10 rounded-full border border-line bg-paper px-3 text-sm",
						children: priceBranches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: b.id,
							children: b.label
						}, b.id))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: closeKasir,
						className: "grid size-11 place-items-center rounded-full border border-line",
						"aria-label": "Tutup kasir",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})
				]
			})]
		}), desk === "hasil" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabResults, {
			sales,
			patients,
			onPatch: patchHasil
		}) : desk === "stok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockList, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 overflow-hidden lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "min-h-0 overflow-auto border-b border-line p-4 lg:col-span-3 lg:border-b-0 lg:border-r",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: searchRef,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Cari pemeriksaan yang mau dibayar",
						className: "h-12 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-blue"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line rounded-xl border border-line bg-surface",
					children: hits.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => addItem(t.id, t.name, t.price),
						className: "flex w-full items-center justify-between gap-3 px-4 py-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: t.category
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display tabular-nums",
							children: formatRupiah(t.price)
						})]
					}) }, t.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex min-h-0 flex-col overflow-auto p-4 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: ["baru", "lama"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMode(m);
								if (m === "baru") setPicked(null);
							},
							className: `h-10 rounded-full px-4 text-sm font-semibold ${mode === m ? "bg-ink text-chalk" : "border border-line bg-surface text-muted"}`,
							children: m === "baru" ? "Pasien baru" : "Pasien lama"
						}, m))
					}),
					mode === "baru" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-medium",
								children: ["Nama lengkap", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: nama,
									onChange: (e) => setNama(e.target.value),
									className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-medium",
								children: ["Nomor HP", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: hp,
									onChange: (e) => setHp(e.target.value),
									type: "tel",
									inputMode: "tel",
									className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-medium",
								children: ["Nomor KTP", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: ktp,
									onChange: (e) => setKtp(e.target.value.replace(/\D/g, "").slice(0, 16)),
									inputMode: "numeric",
									className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm tabular-nums"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-sm font-medium",
									children: ["Jenis kelamin", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: kelamin,
										onChange: (e) => setKelamin(e.target.value),
										className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "L",
											children: "Laki-laki"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "P",
											children: "Perempuan"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-sm font-medium",
									children: ["Tanggal lahir", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: lahir,
										onChange: (e) => setLahir(e.target.value),
										type: "date",
										className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
									})]
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "relative block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: lookup,
									onChange: (e) => setLookup(e.target.value),
									placeholder: "Cari KTP, HP, atau nama",
									className: "h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm"
								})]
							}),
							picked ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "divide-y divide-line rounded-xl border border-line bg-surface",
								children: [found.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => pickPatient(p),
									className: "flex w-full flex-col px-4 py-3 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: p.nama
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted",
										children: [
											p.kelamin === "P" ? "P" : "L",
											" · ",
											ageOf(p.lahir),
											" · ",
											p.ktp,
											" · ",
											p.hp
										]
									})]
								}) }, p.id)), lookup.trim().length >= 2 && found.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "px-4 py-3 text-sm text-muted",
									children: "Tidak ketemu. Daftarkan sebagai pasien baru."
								}) : null]
							}),
							picked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-line bg-surface p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-xl",
												children: picked.nama
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm text-muted",
												children: [
													picked.kelamin === "P" ? "Perempuan" : "Laki-laki",
													" · ",
													ageOf(picked.lahir),
													" · KTP ",
													picked.ktp
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted",
												children: picked.hp
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-xs font-semibold text-red",
											onClick: () => setPicked(null),
											children: "Ganti"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-4 text-xs font-semibold uppercase tracking-widest text-muted",
										children: [
											"Riwayat (",
											riwayat.length,
											")"
										]
									}),
									riwayat.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: "Belum ada kunjungan tersimpan di perangkat ini."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-2 space-y-2",
										children: riwayat.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "rounded-lg border border-line p-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "flex w-full items-baseline justify-between text-left",
													onClick: () => setOpenSale(openSale === s.id ? null : s.id),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-display text-red",
														children: s.nomor
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-muted",
														children: new Date(s.created).toLocaleDateString("id-ID")
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted",
													children: [
														s.items.map((i) => i.name).join(", "),
														" · ",
														formatRupiah(s.total)
													]
												}),
												openSale === s.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3 space-y-2",
													children: [
														s.hasil.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "rounded-md bg-paper p-2",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-sm font-medium",
																	children: h.name
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																	value: h.nilai,
																	onChange: (e) => patchHasil(s.id, h.itemId, {
																		nilai: e.target.value,
																		ready: e.target.value.trim().length > 0
																	}),
																	placeholder: "Nilai hasil",
																	className: "mt-1 h-9 w-full rounded-md border border-line bg-surface px-2 text-sm"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																	value: h.catatan,
																	onChange: (e) => patchHasil(s.id, h.itemId, { catatan: e.target.value }),
																	placeholder: "Catatan",
																	className: "mt-1 h-9 w-full rounded-md border border-line bg-surface px-2 text-sm"
																})
															]
														}, h.itemId)),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "grid grid-cols-2 gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => printStruk(s, picked),
																className: "h-9 rounded-full border border-line text-xs font-semibold",
																children: "Tanda bayar"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => printStiker(s, picked),
																className: "h-9 rounded-full bg-gold text-xs font-semibold text-ink",
																children: "Stiker EDTA"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => printHasil(s, picked),
															className: "h-9 w-full rounded-full border border-line text-xs font-semibold",
															children: "Cetak hasil"
														})
													]
												}) : null
											]
										}, s.id))
									})
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs font-semibold uppercase tracking-widest text-muted",
						children: "Item pemeriksaan"
					}),
					cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Belum ada item. Cari di kiri, ketuk untuk menambah."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-2",
						children: cart.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: i.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: formatRupiah(i.price)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-8 place-items-center rounded-full border border-line",
										onClick: () => qty(i.id, -1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-6 text-center text-sm tabular-nums",
										children: i.qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-8 place-items-center rounded-full border border-line",
										onClick: () => qty(i.id, 1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-8 place-items-center text-red",
										onClick: () => setCart((c) => c.filter((x) => x.id !== i.id)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})
								]
							})]
						}, i.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto space-y-3 pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between border-t border-line pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-3xl tabular-nums",
									children: formatRupiah(total)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: methods.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setMetode(m),
									className: `h-9 rounded-full px-3 text-xs font-semibold ${metode === m ? "bg-ink text-chalk" : "border border-line bg-surface text-muted"}`,
									children: m
								}, m))
							}),
							metode === "Tunai" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-medium",
								children: [
									"Uang diterima",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: tunai,
										onChange: (e) => setTunai(e.target.value.replace(/\D/g, "")),
										inputMode: "numeric",
										placeholder: "0",
										className: "mt-1 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm tabular-nums"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1 block text-xs text-muted",
										children: ["Kembali ", formatRupiah(kembali)]
									})
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !canPay,
								onClick: checkout,
								className: "h-12 w-full rounded-full bg-red text-sm font-semibold text-chalk disabled:opacity-40",
								children: "Bayar"
							}),
							last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => printStruk(last, patients.find((p) => p.id === last.patientId) ?? picked),
									className: "h-11 rounded-full border border-line text-xs font-semibold",
									children: "Cetak tanda pembayaran"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => printStiker(last, patients.find((p) => p.id === last.patientId) ?? picked),
									className: "h-11 rounded-full bg-gold text-xs font-semibold text-ink",
									children: "Cetak stiker EDTA"
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [branches.find((b) => b.id === cabang)?.name, ". Data pasien tersimpan di perangkat kasir ini."]
							})
						]
					})
				]
			})]
		})]
	});
}
var styles_default = "/assets/styles-Bv2aQbx_.css";
var APP_NAME = `${company.brand}`;
var Route$15 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "PT. Biomed Husada — Laboratorium BIOMED. Lab klinik Banten sejak 1991. Reservasi MCU, USG, rontgen, EKG dari HP. PWA."
			},
			{
				name: "theme-color",
				content: "#4e6270"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "BIOMED"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Sora:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "id",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: themeBootScript } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh bg-paper font-sans text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallPrompt, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrontOffice, {})
				] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$14 = () => import("./routes-HfTx4hHb.mjs");
var Route$14 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./artikel-CygmAAh_.mjs");
var Route$13 = createFileRoute("/artikel")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./berita-Bn_qmAF7.mjs");
var Route$12 = createFileRoute("/berita")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./cabang-CD1uFWh3.mjs");
var Route$11 = createFileRoute("/cabang")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./checkup-BW3TMkuU.mjs");
var Route$10 = createFileRoute("/checkup")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./fasilitas-CkF5qJbD.mjs");
var Route$9 = createFileRoute("/fasilitas")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./galeri-aNHKsK8_.mjs");
var Route$8 = createFileRoute("/galeri")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./harga-DJmjF4I2.mjs");
var Route$7 = createFileRoute("/harga")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./layanan-Di35JeUL.mjs");
var Route$6 = createFileRoute("/layanan")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./legalitas-C61Msq4p.mjs");
var Route$5 = createFileRoute("/legalitas")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./reservasi-D8EiXYOx.mjs");
var Route$4 = createFileRoute("/reservasi")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./artikel_._slug-DCHP7CRk.mjs");
var Route$3 = createFileRoute("/artikel_/$slug")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./berita_._slug-Nnx0GRo0.mjs");
var Route$2 = createFileRoute("/berita_/$slug")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./hasil_._kode-MM89DwAA.mjs");
var Route$1 = createFileRoute("/hasil_/$kode")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./validasi_._kode-BmqkmIYo.mjs");
var Route = createFileRoute("/validasi_/$kode")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$14.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$15
	}),
	ArtikelRoute: Route$13.update({
		id: "/artikel",
		path: "/artikel",
		getParentRoute: () => Route$15
	}),
	BeritaRoute: Route$12.update({
		id: "/berita",
		path: "/berita",
		getParentRoute: () => Route$15
	}),
	CabangRoute: Route$11.update({
		id: "/cabang",
		path: "/cabang",
		getParentRoute: () => Route$15
	}),
	CheckupRoute: Route$10.update({
		id: "/checkup",
		path: "/checkup",
		getParentRoute: () => Route$15
	}),
	FasilitasRoute: Route$9.update({
		id: "/fasilitas",
		path: "/fasilitas",
		getParentRoute: () => Route$15
	}),
	GaleriRoute: Route$8.update({
		id: "/galeri",
		path: "/galeri",
		getParentRoute: () => Route$15
	}),
	HargaRoute: Route$7.update({
		id: "/harga",
		path: "/harga",
		getParentRoute: () => Route$15
	}),
	LayananRoute: Route$6.update({
		id: "/layanan",
		path: "/layanan",
		getParentRoute: () => Route$15
	}),
	LegalitasRoute: Route$5.update({
		id: "/legalitas",
		path: "/legalitas",
		getParentRoute: () => Route$15
	}),
	ReservasiRoute: Route$4.update({
		id: "/reservasi",
		path: "/reservasi",
		getParentRoute: () => Route$15
	}),
	ArtikelSlugRoute: Route$3.update({
		id: "/artikel_/$slug",
		path: "/artikel/$slug",
		getParentRoute: () => Route$15
	}),
	BeritaSlugRoute: Route$2.update({
		id: "/berita_/$slug",
		path: "/berita/$slug",
		getParentRoute: () => Route$15
	}),
	HasilKodeRoute: Route$1.update({
		id: "/hasil_/$kode",
		path: "/hasil/$kode",
		getParentRoute: () => Route$15
	}),
	ValidasiKodeRoute: Route.update({
		id: "/validasi_/$kode",
		path: "/validasi/$kode",
		getParentRoute: () => Route$15
	})
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { company as _, Route$3 as a, formatRupiah as c, isPriceBranch as d, priceBranches as f, waLink as g, branches as h, Route$2 as i, categoriesFor as l, testsFor as m, Route as n, loadPublished as o, setCabang as p, Route$1 as r, sealOf as s, router_exports as t, getCabang as u };
