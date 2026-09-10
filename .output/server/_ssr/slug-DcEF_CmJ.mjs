//#region node_modules/.nitro/vite/services/ssr/assets/slug-DcEF_CmJ.js
function slugify(input) {
	return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
function uniqueSlug(input) {
	return `${slugify(input) || "boutique"}-${Math.random().toString(36).slice(2, 7)}`;
}
//#endregion
export { uniqueSlug as t };
