const DEFAULT_COUNTRY = "221";

/** Garde uniquement les chiffres et applique l'indicatif Sénégal par défaut. */
export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 9 && digits.startsWith("7")) digits = DEFAULT_COUNTRY + digits;
  return digits;
}

export function isValidPhone(raw: string): boolean {
  const d = normalizePhone(raw);
  return d.length >= 8 && d.length <= 15;
}

/** Identifiant interne utilisé pour créer un compte sans adresse e-mail. */
export function phoneToLoginEmail(raw: string): string {
  return `p${normalizePhone(raw)}@phone.byawa.app`;
}

export function formatPhone(raw: string | null | undefined): string {
  if (!raw) return "—";
  const d = normalizePhone(raw);
  if (d.length === 12 && d.startsWith(DEFAULT_COUNTRY)) {
    const n = d.slice(3);
    return `+221 ${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 7)} ${n.slice(7)}`;
  }
  return `+${d}`;
}

/** Masque les e-mails techniques générés depuis un numéro. */
export function displayEmail(email: string | null | undefined): string | null {
  if (!email) return null;
  return email.endsWith("@phone.byawa.app") ? null : email;
}
