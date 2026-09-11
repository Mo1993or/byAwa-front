import { writeFileSync } from "node:fs";
import "dotenv/config";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    "SUPABASE_URL ou SUPABASE_PUBLISHABLE_KEY manquant dans les variables d'environnement."
  );
}

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

async function fetchJson(url) {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(
      `Supabase error ${response.status}: ${await response.text()}`
    );
  }

  return response.json();
}

const [categories, products] = await Promise.all([
  fetchJson(
    `${SUPABASE_URL}/rest/v1/categories?select=slug&is_active=eq.true`
  ),
  fetchJson(
    `${SUPABASE_URL}/rest/v1/products?select=slug&status=eq.approved`
  ),
]);

const urls = [
  "https://byawamarketplace.com/",
  ...categories.map(
    (category) =>
      `https://byawamarketplace.com/categorie/${category.slug}`
  ),
  ...products.map(
    (product) =>
      `https://byawamarketplace.com/produit/${product.slug}`
  ),
];

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml, "utf8");

console.log(
  `✅ Sitemap généré : ${urls.length} URLs (${categories.length} catégories, ${products.length} produits)`
);