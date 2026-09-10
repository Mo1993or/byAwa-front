//#region node_modules/.nitro/vite/services/ssr/assets/format-igmN2sYS.js
var CURRENCY = "FCFA";
function formatPrice(value) {
	const amount = Number(value ?? 0);
	return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(amount)} ${CURRENCY}`;
}
function discountPercent(price, compareAt) {
	if (!compareAt || compareAt <= price) return null;
	return Math.round((compareAt - price) / compareAt * 100);
}
function formatDate(value) {
	return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(value));
}
//#endregion
export { formatDate as n, formatPrice as r, discountPercent as t };
