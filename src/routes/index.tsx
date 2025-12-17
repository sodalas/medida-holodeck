import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

export const IndexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: Index,
});

function Index() {
  return <div>Home route is rendering</div>;
}
