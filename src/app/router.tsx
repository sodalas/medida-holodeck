import { createRouter } from '@tanstack/react-router';
import { Route as RootRoute } from '../routes/__root';
import { IndexRoute } from '../routes/index';
import { RoomRoute } from '../routes/room';
import { HolodeckRoute } from '../routes/holodeck';

const routeTree = RootRoute.addChildren([
  HolodeckRoute.addChildren([IndexRoute, RoomRoute]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
