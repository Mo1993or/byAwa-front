import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SmartImage-W4xELWJj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var placeholder_default = "/assets/placeholder-DCT98PFE.jpg";
/**
* Image robuste : évite les images cassées / clignotantes.
* - remplace automatiquement une source invalide par un visuel BYAWA
* - fond neutre pendant le chargement (pas de saut de mise en page)
*/
function SmartImage({ src, alt, className, width, height, eager = false, fallback = placeholder_default }) {
	const initial = src && src.trim().length > 0 ? src : fallback;
	const [current, setCurrent] = (0, import_react.useState)(initial);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setCurrent(src && src.trim().length > 0 ? src : fallback);
	}, [src, fallback]);
	(0, import_react.useEffect)(() => {
		if (ref.current?.complete) setLoaded(true);
	}, [current]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		ref,
		src: current,
		alt,
		...width ? { width } : {},
		...height ? { height } : {},
		loading: eager ? "eager" : "lazy",
		decoding: "async",
		onLoad: () => setLoaded(true),
		onError: () => {
			if (current !== fallback) setCurrent(fallback);
			setLoaded(true);
		},
		className: cn("bg-muted transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0", className)
	});
}
//#endregion
export { SmartImage as t };
