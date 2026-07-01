import type {Route} from './+types/lumina-demo';
import {Component} from '~/components/ui/lumina-interactive-list';
import luminaStyles from '~/styles/lumina-interactive-list.css?url';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Lumina — Interactive Slider'}];
};

// Scope the slider stylesheet to this route only, so its design variables and
// fullscreen layout never leak into the rest of the storefront.
export function links() {
  return [{rel: 'stylesheet', href: luminaStyles}];
}

export default function DemoOne() {
  return <Component />;
}
