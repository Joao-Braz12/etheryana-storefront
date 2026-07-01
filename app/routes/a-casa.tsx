import {redirect} from 'react-router';
import type {Route} from './+types/a-casa';

// The page formerly at /a-casa is now "Sobre Nós" at /sobre-nos.
// Keep the old URL working with a permanent redirect.
export async function loader(_args: Route.LoaderArgs) {
  throw redirect('/sobre-nos', 301);
}
