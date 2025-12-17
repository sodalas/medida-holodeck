import { createRoute } from '@tanstack/react-router';

import { HolodeckRoute } from './holodeck';


export const RoomRoute = createRoute({
  getParentRoute: () => HolodeckRoute,
  path: 'rooms/$roomId',
  component: RoomPage,
});

// RoomPage is rendered via Outlet but the actual Room component is managed by Holodeck
// so we render null here to avoid duplication.
function RoomPage() {
  return null;
}
