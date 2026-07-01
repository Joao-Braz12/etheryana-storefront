import {useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {Image, Money} from '@shopify/hydrogen';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {PRODUCT_CARD_FRAGMENT} from '~/components/ProductCard';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'ETHERYANA — Para as graciosamente poderosas'},
    {
      name: 'description',
      content:
        'ETHERYANA — moda feminina de quiet luxury. Peças intemporais, limitadas e feitas à mão para a mulher contemporânea. Herança vestida no presente.',
    },
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  // The featured collection proves the live-data path: the owner edits products
  // in the Shopify Admin and this section updates with no redeploy. Falls back to
  // a sortKey query so it works on mock.shop today; switch to a `colecao`
  // collection handle once the real store is linked.
  const {products} = await context.storefront.query(FEATURED_PRODUCTS_QUERY);
  return {products: products?.nodes ?? []};
}

export default function Homepage() {
  const {products} = useLoaderData<typeof loader>();
  return (
    <div className="eth-home" id="top">
      <Hero />
      <FeaturedCollection products={products} />
      <Craft />
      <Appointment />
      <Newsletter />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-img"
        src="/brand/hero.jpg"
        alt="Mulher em vestido de cetim petróleo numa escadaria barroca"
      />
      <div className="hero-overlay">
        <div className="hero-top reveal d1">
          <span data-pt="Etheryana · Coleção SS26" data-en="Etheryana · SS26 Collection">
            Etheryana · Coleção SS26
          </span>
          <span data-pt="Para as graciosamente poderosas" data-en="For the gracefully powerful">
            Para as graciosamente poderosas
          </span>
        </div>
        <div className="hero-bottom">
          <h1
            className="display reveal d2"
            data-pt="A elegância não é ruído,<br>é <em>presença</em>."
            data-en="Elegance is not noise,<br>but <em>presence</em>."
            dangerouslySetInnerHTML={{
              __html: 'A elegância não é ruído,<br>é <em>presença</em>.',
            }}
          />
          <div className="hero-actions reveal d3">
            <a className="btn" href="/collections">
              <span data-pt="Ver a coleção" data-en="View the collection">
                Ver a coleção
              </span>{' '}
              <span className="arrow">→</span>
            </a>
            <a
              className="btn btn--ghost"
              href="/atelier"
              data-pt="Marcar atelier"
              data-en="Book a fitting"
              style={{color: 'var(--color-ivory-50)', borderColor: 'rgba(253,251,246,0.5)'}}
            >
              Marcar atelier
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCollection({products}: {products: ProductCardFragment[]}) {
  const big = products[0];
  const small = products[1];
  return (
    <section className="block" id="colecao">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow" data-pt="A Coleção" data-en="The Collection">
              A Coleção
            </p>
            <h2 className="display" data-pt="Peças com presença" data-en="Pieces with presence">
              Peças com presença
            </h2>
          </div>
          <a className="link" href="/collections" data-pt="Ver tudo →" data-en="View all →">
            Ver tudo →
          </a>
        </div>
        <div className="collection-grid">
          {big ? <FeatureCard product={big} variant="big" /> : null}
          <div className="col-right">
            {small ? <FeatureCard product={small} variant="small" /> : null}
            <a className="pcard--link" href="/collections">
              <img src="/brand/collection-hero.jpg" alt="" />
              <span className="link-copy">
                <span className="eyebrow" data-pt="Edições limitadas" data-en="Limited editions">
                  Edições limitadas
                </span>
                <strong
                  data-pt="Descubra a coleção completa"
                  data-en="Discover the full collection"
                >
                  Descubra a coleção completa
                </strong>
                <span className="link-cta">
                  <span data-pt="Ver tudo" data-en="View all">Ver tudo</span>{' '}
                  <span className="arrow">→</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  product,
  variant,
}: {
  product: ProductCardFragment;
  variant: 'big' | 'small';
}) {
  const price = product.priceRange.minVariantPrice;
  const href = `/products/${product.handle}`;
  return (
    <article className={`pcard pcard--${variant}`}>
      <a className="ph" href={href} aria-label={product.title}>
        {product.featuredImage ? (
          <Image
            alt={product.featuredImage.altText || product.title}
            data={product.featuredImage}
            aspectRatio="4/5"
            sizes={variant === 'big' ? '(min-width: 820px) 52vw, 100vw' : '(min-width: 820px) 36vw, 100vw'}
            loading="eager"
          />
        ) : null}
      </a>
      <div className="p-meta">
        {product.productType ? <span className="p-cat">{product.productType}</span> : null}
        <span className="p-name">{product.title}</span>
        <div className="p-foot">
          <span className="p-price">
            <Money data={price} />
          </span>
          <a className="p-link" href={href} data-pt="Ver peça →" data-en="View piece →">
            Ver peça →
          </a>
        </div>
      </div>
    </article>
  );
}

function Craft() {
  return (
    <section className="craft">
      <div className="craft-grid">
        <div className="craft-media">
          <img
            src="/brand/craft.jpg"
            alt="Pormenor de rosas em croché feitas à mão sobre alfaiataria camel com botões dourados"
          />
        </div>
        <div className="craft-copy">
          <p className="eyebrow" data-pt="Savoir-faire" data-en="Savoir-faire">
            Savoir-faire
          </p>
          <h2 data-pt="Feito à mão, para durar" data-en="Hand-finished, made to last">
            Feito à mão, para durar
          </h2>
          <p
            data-pt="Cada rosa é montada à mão, cada acabamento é pensado para a permanência. Produções limitadas, materiais nobres e uma construção que honra o tempo — uma alternativa ao consumo massificado."
            data-en="Each rosette is set by hand; every finish is made for permanence. Limited production, noble materials and construction that honours time — an alternative to mass consumption."
          >
            Cada rosa é montada à mão, cada acabamento é pensado para a permanência.
            Produções limitadas, materiais nobres e uma construção que honra o tempo —
            uma alternativa ao consumo massificado.
          </p>
          <a className="btn btn--on-dark" href="/sobre-nos">
            <span data-pt="Conhecer a casa" data-en="Discover the house">
              Conhecer a casa
            </span>{' '}
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Appointment() {
  return (
    <section className="block invite" id="atelie">
      <div className="wrap">
        <hr className="rule-gold" />
        <p className="eyebrow" data-pt="Por marcação" data-en="By appointment">
          Por marcação
        </p>
        <h2 className="display" data-pt="Comece o seu atelier privado" data-en="Begin your private fitting">
          Comece o seu atelier privado
        </h2>
        <p
          data-pt="Receba aconselhamento personalizado e peças à sua medida. Marque uma visita ao ateliê — presencial ou virtual."
          data-en="Receive personal styling and made-to-measure pieces. Book a visit to the atelier — in person or virtual."
        >
          Receba aconselhamento personalizado e peças à sua medida. Marque uma visita ao
          ateliê — presencial ou virtual.
        </p>
        <a className="btn" href="/atelier">
          <span data-pt="Pedir marcação" data-en="Request an appointment">
            Pedir marcação
          </span>{' '}
          <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="block news">
      <div className="wrap news-grid">
        <div>
          <h2 data-pt="Junte-se à casa" data-en="Join the house">
            Junte-se à casa
          </h2>
          <p
            data-pt="Novas peças, edições limitadas e convites privados — primeiro para quem nos acompanha."
            data-en="New pieces, limited editions and private invitations — first to those who follow the house."
          >
            Novas peças, edições limitadas e convites privados — primeiro para quem nos
            acompanha.
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="o.seu@email.com"
            data-pt-placeholder="o.seu@email.com"
            data-en-placeholder="your@email.com"
            aria-label="Email"
          />
          <button className="btn" type="submit" data-pt="Subscrever" data-en="Subscribe">
            Subscrever
          </button>
        </form>
      </div>
    </section>
  );
}

const FEATURED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query FeaturedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ProductCard
      }
    }
  }
` as const;
