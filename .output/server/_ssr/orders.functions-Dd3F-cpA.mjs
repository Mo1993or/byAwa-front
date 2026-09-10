import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { O as isRedirect, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TSS_SERVER_FUNCTION, i as createServerFn, o as getServerFnById } from "./server-DEji5lDE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-Dd3F-cpA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
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
function clean(v, max = 200) {
	return String(v ?? "").trim().slice(0, max);
}
var createOrder = createServerFn({ method: "POST" }).inputValidator((input) => {
	if (!Array.isArray(input?.lines) || input.lines.length === 0) throw new Error("Panier vide");
	if (input.lines.length > 50) throw new Error("Trop d'articles");
	if (!clean(input.name)) throw new Error("Nom requis");
	if (clean(input.phone).length < 6) throw new Error("Téléphone invalide");
	if (!clean(input.city)) throw new Error("Ville requise");
	return {
		lines: input.lines.map((l) => ({
			productId: String(l.productId),
			quantity: Math.max(1, Math.min(99, Math.floor(Number(l.quantity) || 1)))
		})),
		name: clean(input.name, 120),
		phone: clean(input.phone, 30),
		email: clean(input.email, 160),
		city: clean(input.city, 80),
		zone: clean(input.zone, 80),
		street: clean(input.street, 200),
		details: clean(input.details, 300),
		paymentMethod: input.paymentMethod === "wave" || input.paymentMethod === "orange_money" ? input.paymentMethod : "cod"
	};
}).handler(createSsrRpc("7f92d135aa3763ddd5bf6d4d9f84832b6b591cbaa35dcc4048b4b1beed8e7bf3"));
var trackOrder = createServerFn({ method: "POST" }).inputValidator((input) => ({ reference: clean(input?.reference, 80) })).handler(createSsrRpc("d74efaed9d368b50c737966712aaf37f9bc30edca8be1eed754f166b39b69dcd"));
//#endregion
export { trackOrder as n, useServerFn as r, createOrder as t };
