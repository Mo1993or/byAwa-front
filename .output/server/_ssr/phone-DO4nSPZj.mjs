//#region node_modules/.nitro/vite/services/ssr/assets/phone-DO4nSPZj.js
var DEFAULT_COUNTRY = "221";
/** Garde uniquement les chiffres et applique l'indicatif Sénégal par défaut. */
function normalizePhone(raw) {
	let digits = raw.replace(/\D/g, "");
	if (digits.startsWith("00")) digits = digits.slice(2);
	if (digits.length === 9 && digits.startsWith("7")) digits = DEFAULT_COUNTRY + digits;
	return digits;
}
function isValidPhone(raw) {
	const d = normalizePhone(raw);
	return d.length >= 8 && d.length <= 15;
}
/** Identifiant interne utilisé pour créer un compte sans adresse e-mail. */
function phoneToLoginEmail(raw) {
	return `p${normalizePhone(raw)}@phone.byawa.app`;
}
function formatPhone(raw) {
	if (!raw) return "—";
	const d = normalizePhone(raw);
	if (d.length === 12 && d.startsWith(DEFAULT_COUNTRY)) {
		const n = d.slice(3);
		return `+221 ${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 7)} ${n.slice(7)}`;
	}
	return `+${d}`;
}
/** Masque les e-mails techniques générés depuis un numéro. */
function displayEmail(email) {
	if (!email) return null;
	return email.endsWith("@phone.byawa.app") ? null : email;
}
//#endregion
export { phoneToLoginEmail as a, normalizePhone as i, formatPhone as n, isValidPhone as r, displayEmail as t };
