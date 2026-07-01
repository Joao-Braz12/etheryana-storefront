# ETHERYANA — Hydrogen storefront (ops guide)

This is the ETHERYANA storefront, built on **Shopify Hydrogen** (React Router v7) and
designed for **Shopify Oxygen** hosting. It is a faithful port of the static prototype in
the repo root ([../index.html](../index.html)) using the brand design system
([../design-system/](../design-system/)).

The owner manages **products and promotions in the native Shopify Admin** — there is no
custom back-end. This app reads that catalog over the Storefront API and shows it; checkout
is Shopify's hosted flow.

---

## Run it locally

```bash
cd storefront
npm install      # already done
npm run dev      # → http://localhost:3000 (falls back to 3001 if 3000 is busy)
```

Out of the box it shows demo inventory from **Mock.shop** (no Shopify account needed). The
homepage's "Peças com presença" section is wired to the Storefront API, so on Mock.shop you
will see placeholder apparel — that's the live-data path working. Once the real store is
linked (below), it shows ETHERYANA products.

Useful dev URLs: `/graphiql` (API explorer) and `/subrequest-profiler`.

---

## What was built / key files

| File | Purpose |
| --- | --- |
| [app/styles/tokens.css](app/styles/tokens.css) | Copy of the brand design tokens + Bodoni Moda / Tinos fonts. |
| [app/styles/brand.css](app/styles/brand.css) | The homepage's component CSS, ported verbatim from `index.html` (header/footer rescoped to `.site-header`/`.site-footer`). Loaded last so it wins. |
| [app/root.tsx](app/root.tsx) | Imports the brand CSS, font preconnects, `<html lang="pt">`, and the global PT·EN toggle script. |
| [app/components/Header.tsx](app/components/Header.tsx) | Brand header — centred wordmark, heritage nav, PT·EN toggle, cart link (opens the cart aside). |
| [app/components/Footer.tsx](app/components/Footer.tsx) | Brand dark footer (static heritage columns). |
| [app/routes/_index.tsx](app/routes/_index.tsx) | The homepage: all brand sections + the **featured-products loader** (`FEATURED_PRODUCTS_QUERY`). |
| `public/brand/` | Static brand imagery (hero, craft band). Product photos live in Shopify. |

Bilingual copy lives on `data-pt` / `data-en` attributes and is swapped client-side by the
toggle script in `root.tsx`. Real i18n via Shopify Markets is a later milestone.

---

## Phase 0 — Create & seed the Shopify store (owner, in the browser)

1. Create a free **Shopify Partners** account → **Stores → Add store → Development store**.
2. In the dev store Admin, install the **Hydrogen** sales channel (enables the Storefront
   API token + Oxygen).
3. **Add products** (Products → Add product). For the homepage demo, create the four pieces
   from the prototype and upload the matching photos from [../brand_assets/](../brand_assets/):
   - Vestido Cetim Petróleo — €890 — `etheryana30 (1).jpg`
   - Conjunto Ateliê Camel — €1.180 — `etheryana190 (1).jpg`
   - Vestido Cetim Céu — €760 — `etheryana132 (1).jpg`
   - Cetim Céu Ombro a Ombro — €690 — `etheryana56.jpg`
   Set each product's **Type** (e.g. "Cerimónia", "Alfaiataria") — it renders as the card's
   category label.
4. **Group them in a collection**: Products → Collections → Create → title **Coleção**
   (its handle becomes `colecao`). Add the four products.
5. **Create a promotion**: Discounts → Create → e.g. an automatic "private sale" or a code
   like `HONRA10`. This is how promotions work — no code needed.
6. Settings → set store currency to **EUR** and base language to **Portuguese**.

---

## Phase 1 — Link this app to the store

```bash
cd storefront
npx shopify hydrogen link     # opens browser auth, pick your dev store
npx shopify hydrogen env pull # writes the Storefront API token + domain into .env
npm run dev
```

After linking, the homepage reads your real catalog. To make the featured section show the
**Coleção** collection specifically (instead of the most-recently-updated products), switch
the query in [app/routes/_index.tsx](app/routes/_index.tsx):

```ts
// loader: query the "colecao" collection's products
export async function loader({context}: Route.LoaderArgs) {
  const {collection} = await context.storefront.query(FEATURED_COLLECTION_QUERY, {
    variables: {handle: 'colecao', first: 4},
  });
  return {products: collection?.products?.nodes ?? []};
}

// add `$handle: String!` + wrap the existing `...FeaturedProduct` fragment:
//   collection(handle: $handle) { products(first: $first) { nodes { ...FeaturedProduct } } }
```

The `FeaturedProduct` fragment (with `compareAtPriceRange`) already drives the sale badge +
struck-through price, so an active automatic Discount shows up automatically.

---

## Phase 4 — Deploy to Oxygen

```bash
cd storefront
npx shopify hydrogen deploy
```

Gives a public preview URL. Re-verify the homepage and that it reads the seeded products.

---

## Verify the end-to-end story

1. **Live data:** change a product title/price in the Admin → refresh the homepage → it
   updates with no redeploy.
2. **Promotions:** enable the Discount → the matching card shows a "Em promoção" badge and a
   struck-through compare-at price.

---

## Next milestones (not in this build)

- Full `/products/$handle` (PDP), `/collections/$handle` (PLP) and the cart drawer +
  checkout, restyled to the brand (the skeleton ships the logic).
- PT/EN via Shopify Markets + Translate & Adapt (replaces the JS toggle).
- Customer accounts + search.
- Atelier/appointment booking (the one spot a small custom layer or Shopify app may help).
