import {Image, Money} from '@shopify/hydrogen';
import type {ProductFeatureFragment} from 'storefrontapi.generated';

/**
 * ETHERYANA editorial collection row — a large, generously-spaced "feature card"
 * for the Collection listing page. Each piece is shown with a strip of 2–3
 * photographs, its name, price and a short description. Bilingual UI copy rides
 * on `data-pt` / `data-en` and is swapped by the global toggle in `root.tsx`.
 */
export function ProductFeature({
  product,
  index,
  loading,
  media,
}: {
  product: ProductFeatureFragment;
  index: number;
  loading?: 'eager' | 'lazy';
  // Optional local atelier photographs (served from /public/brand). When
  // supplied they take precedence over the Shopify gallery so the editorial
  // Collection page shows the real ETHERYANA campaign imagery rather than the
  // demo catalogue's stock photos.
  media?: {tall: string; square: string};
}) {
  const href = `/products/${product.handle}`;
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const onSale =
    compareAt && Number(compareAt.amount) > Number(price.amount) ? compareAt : null;

  // Two photographs: a tall hero shot (column 1) and a square detail shot
  // (column 2). Fall back to the featured image so a frame never collapses
  // when the gallery is sparse.
  const gallery = product.images?.nodes ?? [];
  const tall = gallery[0] ?? product.featuredImage;
  const square = gallery[1] ?? gallery[0] ?? product.featuredImage;

  return (
    <article className="feature-card">
      <div className="feature-grid">
        {/* Column 1 — taller image */}
        <a
          className="feature-frame feature-tall"
          href={href}
          aria-label={product.title}
        >
          {media ? (
            <img
              src={media.tall}
              alt={product.title}
              loading={loading === 'eager' ? 'eager' : 'lazy'}
            />
          ) : tall ? (
            <Image
              alt={tall.altText || product.title}
              data={tall}
              aspectRatio="3/4"
              sizes="(min-width: 980px) 40vw, 100vw"
              loading={loading}
            />
          ) : null}
        </a>

        {/* Column 2 — square image (row 1), copy block (row 2) */}
        <div className="feature-col-right">
          <a
            className="feature-frame feature-square"
            href={href}
            aria-label={product.title}
          >
            {media ? (
              <img
                src={media.square}
                alt={product.title}
                loading={loading === 'eager' ? 'eager' : 'lazy'}
              />
            ) : square ? (
              <Image
                alt={square.altText || product.title}
                data={square}
                aspectRatio="1/1"
                sizes="(min-width: 980px) 36vw, 100vw"
                loading={loading}
              />
            ) : null}
          </a>

          <div className="feature-body">
            <span className="feature-index">
              {String(index + 1).padStart(2, '0')}
            </span>
            {product.productType ? (
              <span className="feature-cat">{product.productType}</span>
            ) : null}
            <h2 className="feature-name display">{product.title}</h2>
            {product.description ? (
              <p className="feature-desc">{product.description}</p>
            ) : null}
            <span className="feature-price">
              {onSale ? (
                <>
                  <span className="now">
                    <Money data={price} />
                  </span>
                  <s>
                    <Money data={onSale} />
                  </s>
                </>
              ) : (
                <Money data={price} />
              )}
            </span>
            <a className="btn" href={href} data-pt="Ver peça" data-en="View piece">
              <span data-pt="Ver peça" data-en="View piece">
                Ver peça
              </span>{' '}
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export const PRODUCT_FEATURE_FRAGMENT = `#graphql
  fragment ProductFeature on Product {
    id
    title
    handle
    productType
    description
    featuredImage {
      id
      url
      altText
      width
      height
    }
    images(first: 3) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
` as const;
