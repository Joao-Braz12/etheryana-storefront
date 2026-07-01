import {Image, Money} from '@shopify/hydrogen';
import type {ProductCardFragment} from 'storefrontapi.generated';

/**
 * ETHERYANA product card — shared by the homepage featured grid and the
 * Collection page. Renders the brand `.product` card (image, optional sale
 * badge, category, name, price, "Ver peça" link). Bilingual copy rides on
 * `data-pt` / `data-en` and is swapped by the global toggle in `root.tsx`.
 */
export function ProductCard({
  product,
  loading,
  sizes = '(min-width: 980px) 25vw, (min-width: 520px) 50vw, 100vw',
}: {
  product: ProductCardFragment;
  loading?: 'eager' | 'lazy';
  sizes?: string;
}) {
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const onSale =
    compareAt && Number(compareAt.amount) > Number(price.amount) ? compareAt : null;

  return (
    <article className="product">
      <div className="ph">
        {onSale ? (
          <span className="badge badge--sale" data-pt="Em promoção" data-en="On sale">
            Em promoção
          </span>
        ) : null}
        {product.featuredImage ? (
          <Image
            alt={product.featuredImage.altText || product.title}
            data={product.featuredImage}
            aspectRatio="3/4"
            sizes={sizes}
            loading={loading}
          />
        ) : null}
      </div>
      {product.productType ? <span className="cat">{product.productType}</span> : null}
      <span className="name">{product.title}</span>
      <span className="price">
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
      <a
        className="shop"
        href={`/products/${product.handle}`}
        data-pt="Ver peça"
        data-en="View piece"
      >
        Ver peça
      </a>
    </article>
  );
}

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    title
    handle
    productType
    featuredImage {
      id
      url
      altText
      width
      height
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
