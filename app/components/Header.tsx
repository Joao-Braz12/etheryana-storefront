import {Suspense} from 'react';
import {Await, useAsyncValue} from 'react-router';
import {useOptimisticCart} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

/**
 * ETHERYANA brand header: centred wordmark, heritage nav, PT·EN toggle and a
 * cart link that opens the cart aside. Bilingual copy is carried on
 * `data-pt` / `data-en` attributes and swapped by the global toggle script in
 * `root.tsx` (a faithful port of the static prototype's behaviour).
 */
export function Header({cart}: HeaderProps) {
  return (
    <header className="site-header">
      <nav className="nav">
        <div className="nav-left">
          <a className="nav-link" href="/" data-pt="Início" data-en="Home">
            Início
          </a>
          <a className="nav-link" href="/collections" data-pt="Coleção" data-en="Collection">
            Coleção
          </a>
          <a className="nav-link" href="/sobre-nos" data-pt="Sobre Nós" data-en="About us">
            Sobre Nós
          </a>
          <a className="nav-link" href="/atelier" data-pt="Marcações" data-en="Appointments">
            Marcações
          </a>
        </div>
        <a className="brandmark" href="/">
          Etheryana
        </a>
        <div className="nav-right">
          <span className="lang" role="group" aria-label="Idioma / Language">
            <button type="button" data-lang="pt" aria-pressed="true">
              PT
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" data-lang="en" aria-pressed="false">
              EN
            </button>
          </span>
          <CartToggle cart={cart} />
        </div>
      </nav>
    </header>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartLink count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const original = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(original);
  return <CartLink count={cart?.totalQuantity ?? 0} />;
}

function CartLink({count}: {count: number}) {
  const {open} = useAside();
  return (
    <button
      className="cart-link"
      type="button"
      onClick={() => open('cart')}
      aria-label="Abrir cesto / Open bag"
    >
      <span data-pt="Cesto" data-en="Bag">
        Cesto
      </span>{' '}
      ({count})
    </button>
  );
}
