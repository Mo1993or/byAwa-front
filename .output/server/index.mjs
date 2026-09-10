globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"b29-Zb+s7x9OSVXLvN9icjXN0Cqghao\"",
		"mtime": "2026-09-10T21:03:20.520Z",
		"size": 2857,
		"path": "../public/favicon.png"
	},
	"/assets/DashboardShell-Urc8BhkJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1333-VHDabrdmGFfw99DwOgjMHJJkSR4\"",
		"mtime": "2026-09-10T21:03:19.716Z",
		"size": 4915,
		"path": "../public/assets/DashboardShell-Urc8BhkJ.js"
	},
	"/assets/ImageUploader-cTrivOhu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1733-TjWaaTZnPvr56SuONG4Bvh8eKvA\"",
		"mtime": "2026-09-10T21:03:19.716Z",
		"size": 5939,
		"path": "../public/assets/ImageUploader-cTrivOhu.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-10T21:03:20.513Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/SmartImage-CL7zDZdj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d2-i9yc7pE0LX05p6BWUFJoHNDf7Hg\"",
		"mtime": "2026-09-10T21:03:19.716Z",
		"size": 722,
		"path": "../public/assets/SmartImage-CL7zDZdj.js"
	},
	"/assets/ProductCard-C4Q7ghPo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b46-oJgwo9bVmTUFpZWU8ysx2w772Fs\"",
		"mtime": "2026-09-10T21:03:19.716Z",
		"size": 2886,
		"path": "../public/assets/ProductCard-C4Q7ghPo.js"
	},
	"/assets/aide-t75F3aU0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2623-sTyRkZ4FLaXITAHhV9LfVYoIPeU\"",
		"mtime": "2026-09-10T21:03:19.717Z",
		"size": 9763,
		"path": "../public/assets/aide-t75F3aU0.js"
	},
	"/assets/admin-D_0w8lkz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9c1-5/rloChD+SYXnuL+p9gxVVJuq+c\"",
		"mtime": "2026-09-10T21:03:19.716Z",
		"size": 43457,
		"path": "../public/assets/admin-D_0w8lkz.js"
	},
	"/assets/arrow-right-CIncW2Qm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-lS5YX3io9fz+dM/LbgLSZxC2fRo\"",
		"mtime": "2026-09-10T21:03:19.717Z",
		"size": 155,
		"path": "../public/assets/arrow-right-CIncW2Qm.js"
	},
	"/assets/boutique._slug-CJJB2x2v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a97-ko0o11xlI5JJZIBk/i/ohLlps7Y\"",
		"mtime": "2026-09-10T21:03:19.717Z",
		"size": 2711,
		"path": "../public/assets/boutique._slug-CJJB2x2v.js"
	},
	"/assets/auth-DTjj7CRp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2236-HH9bk6bG04sT51YNhCBAcWZUa5A\"",
		"mtime": "2026-09-10T21:03:19.717Z",
		"size": 8758,
		"path": "../public/assets/auth-DTjj7CRp.js"
	},
	"/assets/boutiques-D3uPCnqR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f7-PurGRI8x189TzE0ohIBtg5xjxDU\"",
		"mtime": "2026-09-10T21:03:19.717Z",
		"size": 2039,
		"path": "../public/assets/boutiques-D3uPCnqR.js"
	},
	"/assets/categories-BWrc3kPK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"637-n1fAXsV4WFPcNgXq9T2YIt6JJ70\"",
		"mtime": "2026-09-10T21:03:19.717Z",
		"size": 1591,
		"path": "../public/assets/categories-BWrc3kPK.js"
	},
	"/assets/categorie._slug-CVdbbT48.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c6e-5ra2uLbXbJ02iOZvG2G0uA/PqU0\"",
		"mtime": "2026-09-10T21:03:19.717Z",
		"size": 3182,
		"path": "../public/assets/categorie._slug-CVdbbT48.js"
	},
	"/assets/chevron-down-DSl86pfT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-GrHN3jVmEJgePHkkejQtB3oOmLo\"",
		"mtime": "2026-09-10T21:03:19.717Z",
		"size": 118,
		"path": "../public/assets/chevron-down-DSl86pfT.js"
	},
	"/assets/byawa-logo-D7VC61Ew.png": {
		"type": "image/png",
		"etag": "\"4c01b-ke1hXHaKXFmtpPdUp9e7QaCLgrM\"",
		"mtime": "2026-09-10T21:03:19.723Z",
		"size": 311323,
		"path": "../public/assets/byawa-logo-D7VC61Ew.png"
	},
	"/assets/circle-check-aT0dtQG3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-SUFbV+8zYDtzcTiZotZLlB2d0zg\"",
		"mtime": "2026-09-10T21:03:19.717Z",
		"size": 168,
		"path": "../public/assets/circle-check-aT0dtQG3.js"
	},
	"/assets/DashboardCharts-ltdVvQQD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"640a6-DLlfPkP8XoyG+jK+n9JcSbEZCCs\"",
		"mtime": "2026-09-10T21:03:19.716Z",
		"size": 409766,
		"path": "../public/assets/DashboardCharts-ltdVvQQD.js"
	},
	"/assets/commander-DARwHrHi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1919-y+W9HDRlO/K2F3GoM6dbZhIJH+0\"",
		"mtime": "2026-09-10T21:03:19.717Z",
		"size": 6425,
		"path": "../public/assets/commander-DARwHrHi.js"
	},
	"/assets/compte-z3_E1hO_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c9-6U4i4D5CdfZuoJ1hFvhsd2FLkrs\"",
		"mtime": "2026-09-10T21:03:19.718Z",
		"size": 4553,
		"path": "../public/assets/compte-z3_E1hO_.js"
	},
	"/assets/dist-Cap226gb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3c-tAZN66Eugc2n0SyYqrL+islybXk\"",
		"mtime": "2026-09-10T21:03:19.718Z",
		"size": 2876,
		"path": "../public/assets/dist-Cap226gb.js"
	},
	"/assets/devenir-vendeur-BsyKjnSb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f3c-pEiTCwKuZEhNXf5Z/7CqlI/+9cU\"",
		"mtime": "2026-09-10T21:03:19.718Z",
		"size": 16188,
		"path": "../public/assets/devenir-vendeur-BsyKjnSb.js"
	},
	"/assets/format-Dxq2Pehh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-n6DKQJ+PynCNT7Nh4bNiBBDS7Nc\"",
		"mtime": "2026-09-10T21:03:19.718Z",
		"size": 290,
		"path": "../public/assets/format-Dxq2Pehh.js"
	},
	"/assets/jsx-runtime-D3jfb0Ew.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c5-Qh7NbnnF5pPMnr2eoPNshytf37o\"",
		"mtime": "2026-09-10T21:03:19.718Z",
		"size": 8901,
		"path": "../public/assets/jsx-runtime-D3jfb0Ew.js"
	},
	"/assets/index-CTzFuacn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bb9f4-n/cSXanCjqyjC3GUtcrjb/asa2Y\"",
		"mtime": "2026-09-10T21:03:19.716Z",
		"size": 768500,
		"path": "../public/assets/index-CTzFuacn.js"
	},
	"/assets/label-BHObkUc4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28f-4LCzDCrN0cjCDXl2hSvNtOuDqPE\"",
		"mtime": "2026-09-10T21:03:19.718Z",
		"size": 655,
		"path": "../public/assets/label-BHObkUc4.js"
	},
	"/assets/link-U_XD0g_K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"111c-w2As4ANiLyGDRtp7YLIv0O8VrAE\"",
		"mtime": "2026-09-10T21:03:19.718Z",
		"size": 4380,
		"path": "../public/assets/link-U_XD0g_K.js"
	},
	"/assets/livreur-D-O4r6k5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165f-tdj65Q1TTYQKQ4n2vgfZGWadIRQ\"",
		"mtime": "2026-09-10T21:03:19.718Z",
		"size": 5727,
		"path": "../public/assets/livreur-D-O4r6k5.js"
	},
	"/assets/life-buoy-B7zL4r_B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173-5/6gNrvotdlEhgKmgu/pgTNCS74\"",
		"mtime": "2026-09-10T21:03:19.718Z",
		"size": 371,
		"path": "../public/assets/life-buoy-B7zL4r_B.js"
	},
	"/assets/loader-circle-zoDea3Mo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86-2tYyDGAdbZ4de+31DW3aq6HkPos\"",
		"mtime": "2026-09-10T21:03:19.719Z",
		"size": 134,
		"path": "../public/assets/loader-circle-zoDea3Mo.js"
	},
	"/assets/minus-SQvbEr01.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b-myyurR9pntsIkIxzu0ToiMEtpcQ\"",
		"mtime": "2026-09-10T21:03:19.719Z",
		"size": 107,
		"path": "../public/assets/minus-SQvbEr01.js"
	},
	"/assets/orders.functions-tZwbKHK0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1383-dwmsuQghz+zR3Vhxt8wde3cdqd4\"",
		"mtime": "2026-09-10T21:03:19.719Z",
		"size": 4995,
		"path": "../public/assets/orders.functions-tZwbKHK0.js"
	},
	"/assets/package-lcteZ6Fw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16a-RyPfpqMWCKLM1KfRlv39nlMQDys\"",
		"mtime": "2026-09-10T21:03:19.719Z",
		"size": 362,
		"path": "../public/assets/package-lcteZ6Fw.js"
	},
	"/assets/panier-Bo_MkNqO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13ad-+nt0wfUTZmtGeG/wRuYbHlNywc4\"",
		"mtime": "2026-09-10T21:03:19.719Z",
		"size": 5037,
		"path": "../public/assets/panier-Bo_MkNqO.js"
	},
	"/assets/phone-DPWQsRkj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"213-cMtO8jT4/AJZtlsJy9NHB1lsnDI\"",
		"mtime": "2026-09-10T21:03:19.719Z",
		"size": 531,
		"path": "../public/assets/phone-DPWQsRkj.js"
	},
	"/assets/plus-i0kHLdxK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-Mlg/RIU7B6lVtQgpqMyoWEhxrFk\"",
		"mtime": "2026-09-10T21:03:19.719Z",
		"size": 143,
		"path": "../public/assets/plus-i0kHLdxK.js"
	},
	"/assets/placeholder-DCT98PFE.jpg": {
		"type": "image/jpeg",
		"etag": "\"3224-etW8fDW1a+xhl7rD24hUH93Uh0c\"",
		"mtime": "2026-09-10T21:03:19.723Z",
		"size": 12836,
		"path": "../public/assets/placeholder-DCT98PFE.jpg"
	},
	"/assets/produit._slug-BeOPcslT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec5-lJivapfc2GMOb+wqO+5w3sfFcTE\"",
		"mtime": "2026-09-10T21:03:19.719Z",
		"size": 7877,
		"path": "../public/assets/produit._slug-BeOPcslT.js"
	},
	"/assets/matchContext-BVEm4KIG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-MlvmCfuvwl7v7/HY3t0bO2071Fs\"",
		"mtime": "2026-09-10T21:03:19.719Z",
		"size": 162,
		"path": "../public/assets/matchContext-BVEm4KIG.js"
	},
	"/assets/politique-de-confidentialite-tr2xktAX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191d-wJqavncFU8pE7fiq2l5wiJcjd+s\"",
		"mtime": "2026-09-10T21:03:19.719Z",
		"size": 6429,
		"path": "../public/assets/politique-de-confidentialite-tr2xktAX.js"
	},
	"/assets/qss-Bqk2G4CH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc-2N+JPG3965eWSB0QcbrDwgkqrgU\"",
		"mtime": "2026-09-10T21:03:19.720Z",
		"size": 444,
		"path": "../public/assets/qss-Bqk2G4CH.js"
	},
	"/assets/react-dom-BLfE8rC8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1b-oc7yeCRDmOzvYmS+ojB0orw2QkI\"",
		"mtime": "2026-09-10T21:03:19.720Z",
		"size": 3867,
		"path": "../public/assets/react-dom-BLfE8rC8.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-09-10T21:03:19.720Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/rotate-ccw-C8cy-Uwu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-KptxtiHPzZh5o1UB+9tJOs14Tsw\"",
		"mtime": "2026-09-10T21:03:19.720Z",
		"size": 190,
		"path": "../public/assets/rotate-ccw-C8cy-Uwu.js"
	},
	"/assets/route-CLgWKp6p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-5vvpTIzkV5xD92CWhtgWWoB2JZ4\"",
		"mtime": "2026-09-10T21:03:19.720Z",
		"size": 142,
		"path": "../public/assets/route-CLgWKp6p.js"
	},
	"/assets/recherche-D6rZiMHl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"958-Bbu46Up28EElGHMfjd/1x1YOgmw\"",
		"mtime": "2026-09-10T21:03:19.720Z",
		"size": 2392,
		"path": "../public/assets/recherche-D6rZiMHl.js"
	},
	"/assets/routes-oicfYek9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2863-ynfN1p0IiwlxM0HQ+Zou2SCTZzc\"",
		"mtime": "2026-09-10T21:03:19.720Z",
		"size": 10339,
		"path": "../public/assets/routes-oicfYek9.js"
	},
	"/assets/separator-BLwZQlyP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"332-JzGd0Q83qmxPpOEmQrZMduYZqto\"",
		"mtime": "2026-09-10T21:03:19.721Z",
		"size": 818,
		"path": "../public/assets/separator-BLwZQlyP.js"
	},
	"/assets/select-CkoQ4mtD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"575a-Gil32H0wofr7/x7DcHq1RvNL8cE\"",
		"mtime": "2026-09-10T21:03:19.721Z",
		"size": 22362,
		"path": "../public/assets/select-CkoQ4mtD.js"
	},
	"/assets/shopping-bag-BxXVw6hA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a-IyVenrqeMECAAZMBiTZjK2RvtG0\"",
		"mtime": "2026-09-10T21:03:19.721Z",
		"size": 330,
		"path": "../public/assets/shopping-bag-BxXVw6hA.js"
	},
	"/assets/star-ClX8pVeM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce-ujIf7OpC7zLrPN4lP8ng6ZKEZv8\"",
		"mtime": "2026-09-10T21:03:19.721Z",
		"size": 462,
		"path": "../public/assets/star-ClX8pVeM.js"
	},
	"/assets/suivi-3WSDHU4O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1924-59VSupxQn97mOaKJqtbMkGDXXJw\"",
		"mtime": "2026-09-10T21:03:19.721Z",
		"size": 6436,
		"path": "../public/assets/suivi-3WSDHU4O.js"
	},
	"/assets/styles-CblGBDIW.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"18ade-O8lOrXO+ds5zyAFUwhQAhW3l2Mo\"",
		"mtime": "2026-09-10T21:03:19.723Z",
		"size": 101086,
		"path": "../public/assets/styles-CblGBDIW.css"
	},
	"/assets/slug-2SSneNhn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-lvp70TtDeP1101A7kt9YcNTlz+A\"",
		"mtime": "2026-09-10T21:03:19.721Z",
		"size": 240,
		"path": "../public/assets/slug-2SSneNhn.js"
	},
	"/assets/textarea-B69qMzWi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"208-7aazghrLr0WW/efbkKflX7AUkC0\"",
		"mtime": "2026-09-10T21:03:19.722Z",
		"size": 520,
		"path": "../public/assets/textarea-B69qMzWi.js"
	},
	"/assets/tabs-C9k3cIkn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d83-xeab4PKSXbtRFPmRF0Emzi6Gsc0\"",
		"mtime": "2026-09-10T21:03:19.722Z",
		"size": 3459,
		"path": "../public/assets/tabs-C9k3cIkn.js"
	},
	"/assets/trash-2-nKjkNiMF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-Kb6lJHW08Ad0u36pHuiz9DDaoSc\"",
		"mtime": "2026-09-10T21:03:19.722Z",
		"size": 318,
		"path": "../public/assets/trash-2-nKjkNiMF.js"
	},
	"/assets/useStore-NtJLzaRI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4aec-VQlxJGkbtFhST8u0m1lrBeMn5ls\"",
		"mtime": "2026-09-10T21:03:19.722Z",
		"size": 19180,
		"path": "../public/assets/useStore-NtJLzaRI.js"
	},
	"/assets/useMutation-C2j4mYf3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92f-YixPex6I7ZY89CgwQfSx9ZRmUqo\"",
		"mtime": "2026-09-10T21:03:19.722Z",
		"size": 2351,
		"path": "../public/assets/useMutation-C2j4mYf3.js"
	},
	"/assets/users-D4R64GcM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"128-wu8ZrSl6JhrnVNif8joSDgug8lg\"",
		"mtime": "2026-09-10T21:03:19.722Z",
		"size": 296,
		"path": "../public/assets/users-D4R64GcM.js"
	},
	"/assets/wallet-DgUp0imY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-kVYxr7l2/5khwvgOn6lnZV2bSSM\"",
		"mtime": "2026-09-10T21:03:19.723Z",
		"size": 276,
		"path": "../public/assets/wallet-DgUp0imY.js"
	},
	"/assets/vendre-TxCBHdpG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f18-eWJ+S8r3UF62u6Ge5Skh+J3o99o\"",
		"mtime": "2026-09-10T21:03:19.723Z",
		"size": 3864,
		"path": "../public/assets/vendre-TxCBHdpG.js"
	},
	"/assets/vendeur-DaVrt1xs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f1d-SBnptWsNP27bmiQ+VqShh4XClvc\"",
		"mtime": "2026-09-10T21:03:19.722Z",
		"size": 24349,
		"path": "../public/assets/vendeur-DaVrt1xs.js"
	},
	"/images/banners/banner-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"31556-Md2GxlQNTEcuZ6gXxggR/whuD2U\"",
		"mtime": "2026-09-10T21:03:20.520Z",
		"size": 202070,
		"path": "../public/images/banners/banner-1.jpg"
	},
	"/images/categories/auto-moto.jpg": {
		"type": "image/jpeg",
		"etag": "\"10555-6L1i1X0ApV3CfqPEBJ8Vd74b9n8\"",
		"mtime": "2026-09-10T21:03:20.514Z",
		"size": 66901,
		"path": "../public/images/categories/auto-moto.jpg"
	},
	"/images/categories/beaute.jpg": {
		"type": "image/jpeg",
		"etag": "\"c5e6-h06tQfxA6zsySjbofpsOVSOzZtk\"",
		"mtime": "2026-09-10T21:03:20.521Z",
		"size": 50662,
		"path": "../public/images/categories/beaute.jpg"
	},
	"/images/banners/banner-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b4fe-cnJBGjdkJFHN126ABJ7y99a4C7I\"",
		"mtime": "2026-09-10T21:03:20.515Z",
		"size": 111870,
		"path": "../public/images/banners/banner-2.jpg"
	},
	"/images/categories/alimentation.jpg": {
		"type": "image/jpeg",
		"etag": "\"11d17-+PBg19lbECBkK65TSEAP4XpEOsM\"",
		"mtime": "2026-09-10T21:03:20.514Z",
		"size": 72983,
		"path": "../public/images/categories/alimentation.jpg"
	},
	"/images/categories/bricolage.jpg": {
		"type": "image/jpeg",
		"etag": "\"9dda-rBO0KhZRyVS3GNydbJKID4Azn3g\"",
		"mtime": "2026-09-10T21:03:20.518Z",
		"size": 40410,
		"path": "../public/images/categories/bricolage.jpg"
	},
	"/images/categories/electromenager.jpg": {
		"type": "image/jpeg",
		"etag": "\"aed9-4T+AgxpFkgnfTXd64jRzXeH2qyQ\"",
		"mtime": "2026-09-10T21:03:20.520Z",
		"size": 44761,
		"path": "../public/images/categories/electromenager.jpg"
	},
	"/images/categories/electronique.jpg": {
		"type": "image/jpeg",
		"etag": "\"7237-xPfOCb7YYnejsLYnXkfvDy7UJ1U\"",
		"mtime": "2026-09-10T21:03:20.522Z",
		"size": 29239,
		"path": "../public/images/categories/electronique.jpg"
	},
	"/images/categories/cuisine.jpg": {
		"type": "image/jpeg",
		"etag": "\"a12e-PX479fL7v+k7u22yXko6NNR3L14\"",
		"mtime": "2026-09-10T21:03:20.520Z",
		"size": 41262,
		"path": "../public/images/categories/cuisine.jpg"
	},
	"/images/banners/banner-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"321ee-u6wWacrxJ7jDW1ZGruYk3Di0vgY\"",
		"mtime": "2026-09-10T21:03:20.521Z",
		"size": 205294,
		"path": "../public/images/banners/banner-3.jpg"
	},
	"/images/categories/autres.jpg": {
		"type": "image/jpeg",
		"etag": "\"104d7-W6DEh8v2rGqCLBtL6uuPUR+Ctbo\"",
		"mtime": "2026-09-10T21:03:20.521Z",
		"size": 66775,
		"path": "../public/images/categories/autres.jpg"
	},
	"/images/categories/enfants.jpg": {
		"type": "image/jpeg",
		"etag": "\"af91-kxuFAN5Y+4vQBmY5UrPzu6sJ3tU\"",
		"mtime": "2026-09-10T21:03:20.522Z",
		"size": 44945,
		"path": "../public/images/categories/enfants.jpg"
	},
	"/images/categories/jardinage.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a6d1-h+rl+v9Bmfn2bWRXcp246wPj1QU\"",
		"mtime": "2026-09-10T21:03:20.523Z",
		"size": 108241,
		"path": "../public/images/categories/jardinage.jpg"
	},
	"/images/categories/maison.jpg": {
		"type": "image/jpeg",
		"etag": "\"fb51-yUlPgW/qGbOmd/F8WnpiyqNo65g\"",
		"mtime": "2026-09-10T21:03:20.523Z",
		"size": 64337,
		"path": "../public/images/categories/maison.jpg"
	},
	"/images/categories/mode.jpg": {
		"type": "image/jpeg",
		"etag": "\"12ea0-Omi5YMwLUwYw0Im6HrxmFyVx9xQ\"",
		"mtime": "2026-09-10T21:03:20.523Z",
		"size": 77472,
		"path": "../public/images/categories/mode.jpg"
	},
	"/images/categories/papeterie.jpg": {
		"type": "image/jpeg",
		"etag": "\"b6b5-b/9uugj4sp+WZ9Xlk6E6dRwo/xY\"",
		"mtime": "2026-09-10T21:03:20.523Z",
		"size": 46773,
		"path": "../public/images/categories/papeterie.jpg"
	},
	"/images/categories/sport.jpg": {
		"type": "image/jpeg",
		"etag": "\"a6dc-kw60UJLPxBj5YVYZ3iH2yxltgaw\"",
		"mtime": "2026-09-10T21:03:20.524Z",
		"size": 42716,
		"path": "../public/images/categories/sport.jpg"
	},
	"/images/products/boubou-homme.jpg": {
		"type": "image/jpeg",
		"etag": "\"f624-zKbc9/1sheQ/QdvgRqx/SDu3vNQ\"",
		"mtime": "2026-09-10T21:03:20.525Z",
		"size": 63012,
		"path": "../public/images/products/boubou-homme.jpg"
	},
	"/images/products/enfant-wax.jpg": {
		"type": "image/jpeg",
		"etag": "\"14ca7-Aa3jDckVQkDz4/C2hierFCLD0pw\"",
		"mtime": "2026-09-10T21:03:20.526Z",
		"size": 85159,
		"path": "../public/images/products/enfant-wax.jpg"
	},
	"/images/products/foulard-soie.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fbd4-5I4JzkFT/4ELGEIaqZMg+RaX+9o\"",
		"mtime": "2026-09-10T21:03:20.526Z",
		"size": 130004,
		"path": "../public/images/products/foulard-soie.jpg"
	},
	"/images/products/robe-wax.jpg": {
		"type": "image/jpeg",
		"etag": "\"19443-bMA8JguvVYXddRrmj/Le4aJbJ0E\"",
		"mtime": "2026-09-10T21:03:20.525Z",
		"size": 103491,
		"path": "../public/images/products/robe-wax.jpg"
	},
	"/images/products/sac-wax.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e9f7-zk59CQa6mHFnYNmmSmuTYo/aLpU\"",
		"mtime": "2026-09-10T21:03:20.526Z",
		"size": 125431,
		"path": "../public/images/products/sac-wax.jpg"
	},
	"/images/products/sandales-cuir.jpg": {
		"type": "image/jpeg",
		"etag": "\"11935-NUmFe9pNA8LSjkvKLpF4rI78CkU\"",
		"mtime": "2026-09-10T21:03:20.525Z",
		"size": 71989,
		"path": "../public/images/products/sandales-cuir.jpg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_QM0_yL = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_QM0_yL
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
