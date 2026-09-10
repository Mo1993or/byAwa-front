export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function uniqueSlug(input: string): string {
  const base = slugify(input) || "boutique";
  return `${base}-${Math.random().toString(36).slice(2, 7)}`;
}
