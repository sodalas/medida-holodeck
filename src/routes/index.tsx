import { createRoute } from '@tanstack/react-router';

import { HolodeckRoute } from './holodeck';

export const IndexRoute = createRoute({
  getParentRoute: () => HolodeckRoute,
  path: '/',
  component: Index,
});

function Index() {
  return (
    <div className="welcome-message">
      <h1>Welcome</h1>
      <p>Select a room to join</p>
    </div>
  );
}
