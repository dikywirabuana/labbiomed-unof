import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hasil-fn-B12LFmmo.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var publishLabHasil_createServerFn_handler = createServerRpc({
	id: "e30b28a5373e1c69be24745a4d322d0db6d63bbc69f2974e07662b20606acebe",
	name: "publishLabHasil",
	filename: "src/lib/fo/hasil-fn.ts"
}, (opts) => publishLabHasil.__executeServer(opts));
var publishLabHasil = createServerFn({ method: "POST" }).validator((d) => d).handler(publishLabHasil_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-DeopHC_F.mjs");
	await (await getSql()).query(`insert into lab_hasil (kode, payload) values ($1, $2)
       on conflict (kode) do update set payload = $2, updated = now()`, [data.kode, JSON.stringify(data)]);
	return { ok: true };
});
var readLabHasil_createServerFn_handler = createServerRpc({
	id: "609ba6809a128126dca84a4c1fc1c5195d5fa574a3d0c45dc15957c55ca97c08",
	name: "readLabHasil",
	filename: "src/lib/fo/hasil-fn.ts"
}, (opts) => readLabHasil.__executeServer(opts));
var readLabHasil = createServerFn({ method: "POST" }).validator((d) => d).handler(readLabHasil_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-DeopHC_F.mjs");
	const rows = await (await getSql()).query(`select payload from lab_hasil where kode = $1`, [data.kode]);
	if (!rows[0]) return null;
	try {
		return JSON.parse(rows[0].payload);
	} catch {
		return null;
	}
});
//#endregion
export { publishLabHasil_createServerFn_handler, readLabHasil_createServerFn_handler };
