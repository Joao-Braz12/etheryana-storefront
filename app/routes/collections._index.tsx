import {useLoaderData} from 'react-router';
import type {Route} from './+types/collections._index';
import {
  ProductFeature,
  PRODUCT_FEATURE_FRAGMENT,
} from '~/components/ProductFeature';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'ETHERYANA — A Coleção'},
    {
      name: 'description',
      content:
        'A coleção ETHERYANA — um conjunto restrito de peças intemporais, limitadas e feitas à mão. Cada peça apresentada com a sua história.',
    },
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  // A deliberately small, editorial selection — each piece is given room to
  // breathe with its own photographs and description. Works on mock.shop today;
  // once the real store is linked the same query returns the curated catalogue.
  const {products} = await context.storefront.query(COLLECTION_PRODUCTS_QUERY);
  // Only feature pieces that actually have photographs — each card relies on a
  // tall + square image, so imageless demo products would leave empty frames.
  const withImages = (products?.nodes ?? []).filter(
    (p) => p.featuredImage || (p.images?.nodes?.length ?? 0) > 0,
  );
  return {products: withImages};
}

// Real ETHERYANA campaign photographs (served from /public/brand/collection),
// paired tall + square and mapped onto each feature card by position. These
// override the demo catalogue's stock images so the Collection reads as the
// actual atelier work. Swap/extend freely as the lookbook grows.
const LOOKS: {tall: string; square: string}[] = [
  {tall: '/brand/collection/etheryana3.jpg', square: '/brand/collection/etheryana172.jpg'},
  {tall: '/brand/collection/etheryana301.jpg', square: '/brand/collection/etheryana40.jpg'},
  {tall: '/brand/collection/etheryana146.jpg', square: '/brand/collection/etheryana185.jpg'},
  {tall: '/brand/collection/etheryana1241.jpg', square: '/brand/collection/etheryana1321.jpg'},
  {tall: '/brand/collection/etheryana157.jpg', square: '/brand/collection/etheryana1701.jpg'},
  {tall: '/brand/collection/etheryana61.jpg', square: '/brand/collection/etheryana56.jpg'},
];

export default function Collections() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="collection-page" id="top">
      <section className="page-hero">
        <img
          src="/brand/collection-hero.jpg"
          alt="Vestido de cetim petróleo numa escadaria barroca"
        />
        <div className="page-hero-inner">
          <p className="eyebrow" data-pt="A Coleção" data-en="The Collection">
            A Coleção
          </p>
          <h1
            className="display"
            data-pt="Peças com <em>presença</em>"
            data-en="Pieces with <em>presence</em>"
            dangerouslySetInnerHTML={{__html: 'Peças com <em>presença</em>'}}
          />
        </div>
      </section>

      {/* Collection banner — a single editorial image that links straight to the
          curated set of pieces in that collection. Handle is `women` on the demo
          store; switch to the live collection handle once linked. */}
      <section className="block collection-banner-block">
        <div className="wrap">
          <a className="collection-banner" href="/collections/women">
            <img
              src="/brand/collection/etheryana116.jpg"
              alt="Modelo em vestido de cetim petróleo numa escadaria barroca"
            />
            <span className="collection-banner-copy">
              <span
                className="eyebrow"
                data-pt="Edição Eterna"
                data-en="Eterna Edition"
              >
                Edição Eterna
              </span>
              <strong
                className="display"
                data-pt="Cetim petróleo &amp; alfaiataria camel"
                data-en="Petrol satin &amp; camel tailoring"
                dangerouslySetInnerHTML={{
                  __html: 'Cetim petróleo &amp; alfaiataria camel',
                }}
              />
              <span
                className="collection-banner-sub"
                data-pt="A seleção completa, reunida numa só coleção."
                data-en="The full selection, gathered into one collection."
              >
                A seleção completa, reunida numa só coleção.
              </span>
              <span className="link-cta">
                <span data-pt="Ver a coleção" data-en="View the collection">
                  Ver a coleção
                </span>{' '}
                <span className="arrow">→</span>
              </span>
            </span>
          </a>
        </div>
      </section>

      <section className="block collection-feature">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p
                className="eyebrow"
                data-pt="Edições limitadas"
                data-en="Limited editions"
              >
                Edições limitadas
              </p>
              <h2
                className="display"
                data-pt="A seleção"
                data-en="The selection"
              >
                A seleção
              </h2>
              <p
                data-pt="Poucas peças, escolhidas a dedo. Cada uma feita à mão e pensada para a permanência."
                data-en="A few pieces, hand-picked. Each one hand-finished and made for permanence."
              >
                Poucas peças, escolhidas a dedo. Cada uma feita à mão e pensada
                para a permanência.
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <p
              className="collection-empty"
              data-pt="A coleção estará disponível em breve."
              data-en="The collection will be available soon."
            >
              A coleção estará disponível em breve.
            </p>
          ) : (
            <div className="feature-list">
              {products.map((product, i) => (
                <ProductFeature
                  key={product.id}
                  product={product}
                  index={i}
                  loading={i < 2 ? 'eager' : undefined}
                  media={LOOKS[i % LOOKS.length]}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const COLLECTION_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_FEATURE_FRAGMENT}
  query CollectionProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 6, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ProductFeature
      }
    }
  }
` as const;
