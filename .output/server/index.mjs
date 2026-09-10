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
		"mtime": "2026-09-10T17:58:59.550Z",
		"size": 2857,
		"path": "../public/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-10T17:58:59.553Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/DashboardShell-CAYR_EFE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1333-uvcNiNSeQ/VXakblEZzWitTquqM\"",
		"mtime": "2026-09-10T17:58:58.773Z",
		"size": 4915,
		"path": "../public/assets/DashboardShell-CAYR_EFE.js"
	},
	"/assets/ImageUploader-DCKTPmKf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1733-z7EXZDrSrbFt1leFgSjMPjXC7Gw\"",
		"mtime": "2026-09-10T17:58:58.774Z",
		"size": 5939,
		"path": "../public/assets/ImageUploader-DCKTPmKf.js"
	},
	"/assets/ProductCard-CHdwo3YS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b46-VEc+aU5fYG1emyPr1K41Whuw2R8\"",
		"mtime": "2026-09-10T17:58:58.774Z",
		"size": 2886,
		"path": "../public/assets/ProductCard-CHdwo3YS.js"
	},
	"/assets/DashboardCharts-BZXXqxoM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"640a6-pSjznUJdTFQCJjwr1hb1L6lMfBI\"",
		"mtime": "2026-09-10T17:58:58.773Z",
		"size": 409766,
		"path": "../public/assets/DashboardCharts-BZXXqxoM.js"
	},
	"/assets/SmartImage-CvquE6pW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d2-/Ru8nM/koUI6YYkVvzQZn4EwT4Y\"",
		"mtime": "2026-09-10T17:58:58.774Z",
		"size": 722,
		"path": "../public/assets/SmartImage-CvquE6pW.js"
	},
	"/assets/admin-BrcMAE7J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9c1-/A+bB9KRSBba3Rr7SJNfOGzJRWk\"",
		"mtime": "2026-09-10T17:58:58.774Z",
		"size": 43457,
		"path": "../public/assets/admin-BrcMAE7J.js"
	},
	"/assets/aide-CAHIdj6i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2623-AJZtCS5c5ulY4HQR+T16FXSmEe8\"",
		"mtime": "2026-09-10T17:58:58.774Z",
		"size": 9763,
		"path": "../public/assets/aide-CAHIdj6i.js"
	},
	"/assets/auth-C6AHcuHW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2236-SWryKxeZp3KIkrxI9enrwhx1Q44\"",
		"mtime": "2026-09-10T17:58:58.775Z",
		"size": 8758,
		"path": "../public/assets/auth-C6AHcuHW.js"
	},
	"/assets/boutique._slug-TAETRtd3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a97-pvfAZC9LBVv27jAEzpJv90qyqvI\"",
		"mtime": "2026-09-10T17:58:58.775Z",
		"size": 2711,
		"path": "../public/assets/boutique._slug-TAETRtd3.js"
	},
	"/assets/arrow-right-5AKrksai.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-hvKaqHt4Q8mAH1o1Z7RghuQqPYs\"",
		"mtime": "2026-09-10T17:58:58.774Z",
		"size": 155,
		"path": "../public/assets/arrow-right-5AKrksai.js"
	},
	"/assets/boutiques-CDPPuOAy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f7-hI5B2CQqQZawdPO0uSfhvLktANg\"",
		"mtime": "2026-09-10T17:58:58.775Z",
		"size": 2039,
		"path": "../public/assets/boutiques-CDPPuOAy.js"
	},
	"/assets/categorie._slug-BekSTeJ6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c6e-c7gqnrPCZ37bDmr8jlHZVx6mj6w\"",
		"mtime": "2026-09-10T17:58:58.775Z",
		"size": 3182,
		"path": "../public/assets/categorie._slug-BekSTeJ6.js"
	},
	"/assets/categories-pLuQl4Rw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"637-QPcGKQeJbbupLbvpxQmO2OnVniI\"",
		"mtime": "2026-09-10T17:58:58.775Z",
		"size": 1591,
		"path": "../public/assets/categories-pLuQl4Rw.js"
	},
	"/assets/chevron-down-CMsyp6ED.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-b92vSQpTvMYIigb38F1gap+9IWk\"",
		"mtime": "2026-09-10T17:58:58.775Z",
		"size": 118,
		"path": "../public/assets/chevron-down-CMsyp6ED.js"
	},
	"/assets/circle-check-BqrXppt7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-L7SIjHej6eYZ6hqTwKGFLZtknJE\"",
		"mtime": "2026-09-10T17:58:58.775Z",
		"size": 168,
		"path": "../public/assets/circle-check-BqrXppt7.js"
	},
	"/assets/commander-BixG08Ha.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1919-ipF+6SrNoImW7/MxxpONMVrtUG4\"",
		"mtime": "2026-09-10T17:58:58.776Z",
		"size": 6425,
		"path": "../public/assets/commander-BixG08Ha.js"
	},
	"/assets/compte-BsxzYRcp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c9-BBoSAb+wObpf9JiY8Nb6i7BFfY0\"",
		"mtime": "2026-09-10T17:58:58.776Z",
		"size": 4553,
		"path": "../public/assets/compte-BsxzYRcp.js"
	},
	"/assets/devenir-vendeur-DDBF9ck9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f3c-pHVZaZmG2NLgq6CSvOPgDZ1balY\"",
		"mtime": "2026-09-10T17:58:58.776Z",
		"size": 16188,
		"path": "../public/assets/devenir-vendeur-DDBF9ck9.js"
	},
	"/assets/byawa-logo-D7VC61Ew.png": {
		"type": "image/png",
		"etag": "\"4c01b-ke1hXHaKXFmtpPdUp9e7QaCLgrM\"",
		"mtime": "2026-09-10T17:58:58.781Z",
		"size": 311323,
		"path": "../public/assets/byawa-logo-D7VC61Ew.png"
	},
	"/assets/jsx-runtime-D3jfb0Ew.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c5-Qh7NbnnF5pPMnr2eoPNshytf37o\"",
		"mtime": "2026-09-10T17:58:58.777Z",
		"size": 8901,
		"path": "../public/assets/jsx-runtime-D3jfb0Ew.js"
	},
	"/assets/dist-Cap226gb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3c-tAZN66Eugc2n0SyYqrL+islybXk\"",
		"mtime": "2026-09-10T17:58:58.776Z",
		"size": 2876,
		"path": "../public/assets/dist-Cap226gb.js"
	},
	"/assets/format-Dxq2Pehh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-n6DKQJ+PynCNT7Nh4bNiBBDS7Nc\"",
		"mtime": "2026-09-10T17:58:58.776Z",
		"size": 290,
		"path": "../public/assets/format-Dxq2Pehh.js"
	},
	"/assets/index-BoJth6Re.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb6c-3Se1H7RdV002v5s+rWvIs4sZONA\"",
		"mtime": "2026-09-10T17:58:58.773Z",
		"size": 768876,
		"path": "../public/assets/index-BoJth6Re.js"
	},
	"/assets/label-CQcCIs-z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28f-rS3qC0LFnspbGcVBgjg7vMCgsPc\"",
		"mtime": "2026-09-10T17:58:58.777Z",
		"size": 655,
		"path": "../public/assets/label-CQcCIs-z.js"
	},
	"/assets/life-buoy-DEa1_L4v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173-/pL6WuqE4qNYKZdqe0t4pmSQCZs\"",
		"mtime": "2026-09-10T17:58:58.777Z",
		"size": 371,
		"path": "../public/assets/life-buoy-DEa1_L4v.js"
	},
	"/assets/link-U_XD0g_K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"111c-w2As4ANiLyGDRtp7YLIv0O8VrAE\"",
		"mtime": "2026-09-10T17:58:58.777Z",
		"size": 4380,
		"path": "../public/assets/link-U_XD0g_K.js"
	},
	"/assets/loader-circle-CL371xAD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86-UEVDwihAXcGWt7E9sCoU5ZLnyIM\"",
		"mtime": "2026-09-10T17:58:58.777Z",
		"size": 134,
		"path": "../public/assets/loader-circle-CL371xAD.js"
	},
	"/assets/matchContext-BVEm4KIG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-MlvmCfuvwl7v7/HY3t0bO2071Fs\"",
		"mtime": "2026-09-10T17:58:58.777Z",
		"size": 162,
		"path": "../public/assets/matchContext-BVEm4KIG.js"
	},
	"/assets/livreur-DWmd2Egp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165f-cw7EceHtqejxzxxjIPuiO4jeSrs\"",
		"mtime": "2026-09-10T17:58:58.777Z",
		"size": 5727,
		"path": "../public/assets/livreur-DWmd2Egp.js"
	},
	"/assets/panier-LlaCLr3O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13ad-YorTVHeAypgxqmOTzK/MOf2VWDA\"",
		"mtime": "2026-09-10T17:58:58.778Z",
		"size": 5037,
		"path": "../public/assets/panier-LlaCLr3O.js"
	},
	"/assets/orders.functions-B5A71fwC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1383-4rFe6Oxz0rpKx/7W4u7u23o0E04\"",
		"mtime": "2026-09-10T17:58:58.778Z",
		"size": 4995,
		"path": "../public/assets/orders.functions-B5A71fwC.js"
	},
	"/assets/package-BL1kJ3z9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16a-vlBVGeoEOSYszPplGNApTGCcln0\"",
		"mtime": "2026-09-10T17:58:58.778Z",
		"size": 362,
		"path": "../public/assets/package-BL1kJ3z9.js"
	},
	"/assets/minus-CFRTQxbg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b-+2nwrl0hsNiaiKUC+0zXnGig7mY\"",
		"mtime": "2026-09-10T17:58:58.778Z",
		"size": 107,
		"path": "../public/assets/minus-CFRTQxbg.js"
	},
	"/assets/phone-DPWQsRkj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"213-cMtO8jT4/AJZtlsJy9NHB1lsnDI\"",
		"mtime": "2026-09-10T17:58:58.778Z",
		"size": 531,
		"path": "../public/assets/phone-DPWQsRkj.js"
	},
	"/assets/plus-MhdRjfOE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-3AucrMfTGf9Qqv2ZlpYnPQGMRkc\"",
		"mtime": "2026-09-10T17:58:58.778Z",
		"size": 143,
		"path": "../public/assets/plus-MhdRjfOE.js"
	},
	"/assets/qss-Bqk2G4CH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc-2N+JPG3965eWSB0QcbrDwgkqrgU\"",
		"mtime": "2026-09-10T17:58:58.779Z",
		"size": 444,
		"path": "../public/assets/qss-Bqk2G4CH.js"
	},
	"/assets/politique-de-confidentialite-CZv-s5hu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191d-VZtN0cnkMz73xKx5H0QGiwbGbXU\"",
		"mtime": "2026-09-10T17:58:58.778Z",
		"size": 6429,
		"path": "../public/assets/politique-de-confidentialite-CZv-s5hu.js"
	},
	"/assets/react-dom-BLfE8rC8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1b-oc7yeCRDmOzvYmS+ojB0orw2QkI\"",
		"mtime": "2026-09-10T17:58:58.779Z",
		"size": 3867,
		"path": "../public/assets/react-dom-BLfE8rC8.js"
	},
	"/assets/produit._slug-9OHOBMkO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec5-C7QtO+B+UXHkdQh3KGyfYDC034I\"",
		"mtime": "2026-09-10T17:58:58.779Z",
		"size": 7877,
		"path": "../public/assets/produit._slug-9OHOBMkO.js"
	},
	"/assets/redirect-Dhm19zUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-ePZWCXP5uehkmkGMkMl5xDch+/Y\"",
		"mtime": "2026-09-10T17:58:58.779Z",
		"size": 500,
		"path": "../public/assets/redirect-Dhm19zUi.js"
	},
	"/assets/recherche-DxWArpyF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"958-4B9UEilKc9lipF7M+V0gIeN+eIg\"",
		"mtime": "2026-09-10T17:58:58.779Z",
		"size": 2392,
		"path": "../public/assets/recherche-DxWArpyF.js"
	},
	"/assets/placeholder-DCT98PFE.jpg": {
		"type": "image/jpeg",
		"etag": "\"3224-etW8fDW1a+xhl7rD24hUH93Uh0c\"",
		"mtime": "2026-09-10T17:58:58.781Z",
		"size": 12836,
		"path": "../public/assets/placeholder-DCT98PFE.jpg"
	},
	"/assets/route-CVWVOtuC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-9cHLIDc9KdX4gDuwJazZx3xu2R8\"",
		"mtime": "2026-09-10T17:58:58.779Z",
		"size": 142,
		"path": "../public/assets/route-CVWVOtuC.js"
	},
	"/assets/routes-PUe3ZTdj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2863-wKjo4ECiytmVdV6MUml9iDcPfQQ\"",
		"mtime": "2026-09-10T17:58:58.779Z",
		"size": 10339,
		"path": "../public/assets/routes-PUe3ZTdj.js"
	},
	"/assets/rotate-ccw-BHKxrBmf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-PelkueTpeYlPzem4684CJhdHSU0\"",
		"mtime": "2026-09-10T17:58:58.779Z",
		"size": 190,
		"path": "../public/assets/rotate-ccw-BHKxrBmf.js"
	},
	"/assets/select-BwmM3Cpu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"575a-IzDeGy4d+JhPyQMYqKgkcUSc4CQ\"",
		"mtime": "2026-09-10T17:58:58.780Z",
		"size": 22362,
		"path": "../public/assets/select-BwmM3Cpu.js"
	},
	"/assets/separator-xvbFT3_E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"332-DqNVwvjRO+3CfbIsawDY08En/bk\"",
		"mtime": "2026-09-10T17:58:58.780Z",
		"size": 818,
		"path": "../public/assets/separator-xvbFT3_E.js"
	},
	"/assets/shopping-bag-kdgyzLxY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a-ZKMSKgxLfin7r1ktUMkvsHNdyi4\"",
		"mtime": "2026-09-10T17:58:58.780Z",
		"size": 330,
		"path": "../public/assets/shopping-bag-kdgyzLxY.js"
	},
	"/assets/slug-2SSneNhn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f0-lvp70TtDeP1101A7kt9YcNTlz+A\"",
		"mtime": "2026-09-10T17:58:58.780Z",
		"size": 240,
		"path": "../public/assets/slug-2SSneNhn.js"
	},
	"/assets/star-DtxvlzNg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce-XoxTQba4mqTs7achYESVwfYlbHw\"",
		"mtime": "2026-09-10T17:58:58.780Z",
		"size": 462,
		"path": "../public/assets/star-DtxvlzNg.js"
	},
	"/assets/styles-CblGBDIW.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"18ade-O8lOrXO+ds5zyAFUwhQAhW3l2Mo\"",
		"mtime": "2026-09-10T17:58:58.782Z",
		"size": 101086,
		"path": "../public/assets/styles-CblGBDIW.css"
	},
	"/assets/suivi-B1EwxoIC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1924-Zjih+x31ns+2//ey0iKne5uV+as\"",
		"mtime": "2026-09-10T17:58:58.780Z",
		"size": 6436,
		"path": "../public/assets/suivi-B1EwxoIC.js"
	},
	"/assets/tabs-DDfVZniM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d83-DLvg7ZrbECDK5vPv/OBK+i5BwR8\"",
		"mtime": "2026-09-10T17:58:58.780Z",
		"size": 3459,
		"path": "../public/assets/tabs-DDfVZniM.js"
	},
	"/assets/useMutation-CsNPvRM0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92f-F1ws8/R85clhFsvFbuV8WE7KVlc\"",
		"mtime": "2026-09-10T17:58:58.781Z",
		"size": 2351,
		"path": "../public/assets/useMutation-CsNPvRM0.js"
	},
	"/assets/trash-2-CyeXZUMq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-QtiL2ydG0fETmMSDggZuBd7k2cs\"",
		"mtime": "2026-09-10T17:58:58.781Z",
		"size": 318,
		"path": "../public/assets/trash-2-CyeXZUMq.js"
	},
	"/assets/useStore-NtJLzaRI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4aec-VQlxJGkbtFhST8u0m1lrBeMn5ls\"",
		"mtime": "2026-09-10T17:58:58.781Z",
		"size": 19180,
		"path": "../public/assets/useStore-NtJLzaRI.js"
	},
	"/assets/users-Cn-_Kgel.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"128-/LJdK74uws99S7KbuRSQMcO0Q2E\"",
		"mtime": "2026-09-10T17:58:58.781Z",
		"size": 296,
		"path": "../public/assets/users-Cn-_Kgel.js"
	},
	"/assets/vendre-BgH8zlsn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f18-XWZcG5aUJoXKBNfX0O6giPlYM+U\"",
		"mtime": "2026-09-10T17:58:58.781Z",
		"size": 3864,
		"path": "../public/assets/vendre-BgH8zlsn.js"
	},
	"/assets/wallet-Ik3edzkQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-TfzKRKQP2ao0aeuqnllHujkjBTE\"",
		"mtime": "2026-09-10T17:58:58.781Z",
		"size": 276,
		"path": "../public/assets/wallet-Ik3edzkQ.js"
	},
	"/images/banners/banner-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"31556-Md2GxlQNTEcuZ6gXxggR/whuD2U\"",
		"mtime": "2026-09-10T17:58:59.554Z",
		"size": 202070,
		"path": "../public/images/banners/banner-1.jpg"
	},
	"/assets/vendeur-D-Ck3NxG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f1d-85M11g7+4rMkiwiJUDIctLyMS3g\"",
		"mtime": "2026-09-10T17:58:58.781Z",
		"size": 24349,
		"path": "../public/assets/vendeur-D-Ck3NxG.js"
	},
	"/images/banners/banner-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b4fe-cnJBGjdkJFHN126ABJ7y99a4C7I\"",
		"mtime": "2026-09-10T17:58:59.551Z",
		"size": 111870,
		"path": "../public/images/banners/banner-2.jpg"
	},
	"/images/banners/banner-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"321ee-u6wWacrxJ7jDW1ZGruYk3Di0vgY\"",
		"mtime": "2026-09-10T17:58:59.552Z",
		"size": 205294,
		"path": "../public/images/banners/banner-3.jpg"
	},
	"/images/products/boubou-homme.jpg": {
		"type": "image/jpeg",
		"etag": "\"f624-zKbc9/1sheQ/QdvgRqx/SDu3vNQ\"",
		"mtime": "2026-09-10T17:58:59.557Z",
		"size": 63012,
		"path": "../public/images/products/boubou-homme.jpg"
	},
	"/images/products/enfant-wax.jpg": {
		"type": "image/jpeg",
		"etag": "\"14ca7-Aa3jDckVQkDz4/C2hierFCLD0pw\"",
		"mtime": "2026-09-10T17:58:59.559Z",
		"size": 85159,
		"path": "../public/images/products/enfant-wax.jpg"
	},
	"/images/products/foulard-soie.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fbd4-5I4JzkFT/4ELGEIaqZMg+RaX+9o\"",
		"mtime": "2026-09-10T17:58:59.559Z",
		"size": 130004,
		"path": "../public/images/products/foulard-soie.jpg"
	},
	"/images/products/robe-wax.jpg": {
		"type": "image/jpeg",
		"etag": "\"19443-bMA8JguvVYXddRrmj/Le4aJbJ0E\"",
		"mtime": "2026-09-10T17:58:59.558Z",
		"size": 103491,
		"path": "../public/images/products/robe-wax.jpg"
	},
	"/images/products/sandales-cuir.jpg": {
		"type": "image/jpeg",
		"etag": "\"11935-NUmFe9pNA8LSjkvKLpF4rI78CkU\"",
		"mtime": "2026-09-10T17:58:59.559Z",
		"size": 71989,
		"path": "../public/images/products/sandales-cuir.jpg"
	},
	"/images/categories/alimentation.jpg": {
		"type": "image/jpeg",
		"etag": "\"11d17-+PBg19lbECBkK65TSEAP4XpEOsM\"",
		"mtime": "2026-09-10T17:58:59.553Z",
		"size": 72983,
		"path": "../public/images/categories/alimentation.jpg"
	},
	"/images/products/sac-wax.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e9f7-zk59CQa6mHFnYNmmSmuTYo/aLpU\"",
		"mtime": "2026-09-10T17:58:59.559Z",
		"size": 125431,
		"path": "../public/images/products/sac-wax.jpg"
	},
	"/images/categories/auto-moto.jpg": {
		"type": "image/jpeg",
		"etag": "\"10555-6L1i1X0ApV3CfqPEBJ8Vd74b9n8\"",
		"mtime": "2026-09-10T17:58:59.551Z",
		"size": 66901,
		"path": "../public/images/categories/auto-moto.jpg"
	},
	"/assets/textarea-C8pyKqKu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"208-W9ykOReNb9I5GF7pHGED48hBZ3s\"",
		"mtime": "2026-09-10T17:58:58.780Z",
		"size": 520,
		"path": "../public/assets/textarea-C8pyKqKu.js"
	},
	"/images/categories/autres.jpg": {
		"type": "image/jpeg",
		"etag": "\"104d7-W6DEh8v2rGqCLBtL6uuPUR+Ctbo\"",
		"mtime": "2026-09-10T17:58:59.551Z",
		"size": 66775,
		"path": "../public/images/categories/autres.jpg"
	},
	"/images/categories/beaute.jpg": {
		"type": "image/jpeg",
		"etag": "\"c5e6-h06tQfxA6zsySjbofpsOVSOzZtk\"",
		"mtime": "2026-09-10T17:58:59.553Z",
		"size": 50662,
		"path": "../public/images/categories/beaute.jpg"
	},
	"/images/categories/bricolage.jpg": {
		"type": "image/jpeg",
		"etag": "\"9dda-rBO0KhZRyVS3GNydbJKID4Azn3g\"",
		"mtime": "2026-09-10T17:58:59.552Z",
		"size": 40410,
		"path": "../public/images/categories/bricolage.jpg"
	},
	"/images/categories/cuisine.jpg": {
		"type": "image/jpeg",
		"etag": "\"a12e-PX479fL7v+k7u22yXko6NNR3L14\"",
		"mtime": "2026-09-10T17:58:59.554Z",
		"size": 41262,
		"path": "../public/images/categories/cuisine.jpg"
	},
	"/images/categories/electromenager.jpg": {
		"type": "image/jpeg",
		"etag": "\"aed9-4T+AgxpFkgnfTXd64jRzXeH2qyQ\"",
		"mtime": "2026-09-10T17:58:59.554Z",
		"size": 44761,
		"path": "../public/images/categories/electromenager.jpg"
	},
	"/images/categories/enfants.jpg": {
		"type": "image/jpeg",
		"etag": "\"af91-kxuFAN5Y+4vQBmY5UrPzu6sJ3tU\"",
		"mtime": "2026-09-10T17:58:59.555Z",
		"size": 44945,
		"path": "../public/images/categories/enfants.jpg"
	},
	"/images/categories/electronique.jpg": {
		"type": "image/jpeg",
		"etag": "\"7237-xPfOCb7YYnejsLYnXkfvDy7UJ1U\"",
		"mtime": "2026-09-10T17:58:59.554Z",
		"size": 29239,
		"path": "../public/images/categories/electronique.jpg"
	},
	"/images/categories/jardinage.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a6d1-h+rl+v9Bmfn2bWRXcp246wPj1QU\"",
		"mtime": "2026-09-10T17:58:59.557Z",
		"size": 108241,
		"path": "../public/images/categories/jardinage.jpg"
	},
	"/images/categories/maison.jpg": {
		"type": "image/jpeg",
		"etag": "\"fb51-yUlPgW/qGbOmd/F8WnpiyqNo65g\"",
		"mtime": "2026-09-10T17:58:59.555Z",
		"size": 64337,
		"path": "../public/images/categories/maison.jpg"
	},
	"/images/categories/mode.jpg": {
		"type": "image/jpeg",
		"etag": "\"12ea0-Omi5YMwLUwYw0Im6HrxmFyVx9xQ\"",
		"mtime": "2026-09-10T17:58:59.556Z",
		"size": 77472,
		"path": "../public/images/categories/mode.jpg"
	},
	"/images/categories/papeterie.jpg": {
		"type": "image/jpeg",
		"etag": "\"b6b5-b/9uugj4sp+WZ9Xlk6E6dRwo/xY\"",
		"mtime": "2026-09-10T17:58:59.557Z",
		"size": 46773,
		"path": "../public/images/categories/papeterie.jpg"
	},
	"/images/categories/sport.jpg": {
		"type": "image/jpeg",
		"etag": "\"a6dc-kw60UJLPxBj5YVYZ3iH2yxltgaw\"",
		"mtime": "2026-09-10T17:58:59.555Z",
		"size": 42716,
		"path": "../public/images/categories/sport.jpg"
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
