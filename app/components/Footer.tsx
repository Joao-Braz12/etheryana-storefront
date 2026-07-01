import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

/**
 * ETHERYANA brand footer — a faithful port of the static prototype. Uses static
 * heritage columns rather than a Shopify menu for this milestone; bilingual copy
 * is swapped by the global toggle script in `root.tsx`.
 */
export function Footer({}: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a className="brandmark" href="/#top">
              Etheryana
            </a>
            <span data-pt="Para as graciosamente poderosas" data-en="For the gracefully powerful">
              Para as graciosamente poderosas
            </span>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4 data-pt="Loja" data-en="Shop">
                Loja
              </h4>
              <a href="/collections" data-pt="Coleção" data-en="Collection">
                Coleção
              </a>
              <a href="/collections#cerimonia" data-pt="Cerimónia" data-en="Eveningwear">
                Cerimónia
              </a>
              <a href="/collections#alfaiataria" data-pt="Alfaiataria" data-en="Tailoring">
                Alfaiataria
              </a>
            </div>
            <div className="foot-col">
              <h4 data-pt="Sobre Nós" data-en="About us">
                Sobre Nós
              </h4>
              <a href="/sobre-nos" data-pt="História" data-en="Story">
                História
              </a>
              <a href="/atelier" data-pt="Marcações" data-en="Appointments">
                Marcações
              </a>
              <a
                href="https://www.instagram.com/etheryana.oficial"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            </div>
            <div className="foot-col">
              <h4 data-pt="Apoio" data-en="Support">
                Apoio
              </h4>
              <a href="#" data-pt="Envios" data-en="Shipping">
                Envios
              </a>
              <a href="#" data-pt="Trocas e devoluções" data-en="Returns">
                Trocas e devoluções
              </a>
              <a href="#" data-pt="Contacto" data-en="Contact">
                Contacto
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 ETHERYANA</span>
          <span
            data-pt="Edições limitadas · Feito para honrar · Portugal"
            data-en="Limited editions · Made to honour · Portugal"
          >
            Edições limitadas · Feito para honrar · Portugal
          </span>
        </div>
      </div>
    </footer>
  );
}
