import { createRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { Route as RootRoute } from './__root';
import { fetchRooms } from '../app/api';
import { Room } from '../components/Room';
import { Activity } from 'react';

const roomsQueryOptions = queryOptions({
  queryKey: ['rooms'],
  queryFn: fetchRooms,
});

export const HolodeckRoute = createRoute({
  getParentRoute: () => RootRoute,
  id: 'holodeck',
  component: Holodeck,
});

function Holodeck() {
  const { data: rooms } = useSuspenseQuery(roomsQueryOptions);
  const navigate = useNavigate();
  // We can use useLocation to find the current room ID from the path
  const location = useLocation();
  const currentRoomId = location.pathname.split('/').pop();

  return (
    <div className="layout-grid">
      <main className="room-content">
        {rooms.map((room) => {
          const isActive = currentRoomId === room.id;
          return (
            <Activity key={room.id} mode={isActive ? 'visible' : 'hidden'}>
               <Room roomId={room.id} />
            </Activity>
          );
        })}
        {/* Render Outlet for any other non-room routes if needed, or just to handle the routing logic matches */}
        <Outlet />
      </main>
      <aside>
        <h3 className="rooms-title">Available Rooms</h3>
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`room-item ${currentRoomId === room.id ? 'active' : ''}`}
            onClick={() => navigate({ to: `/rooms/${room.id}` })}
          >
            {room.name}
          </div>
        ))}
      </aside>
    </div>
  );
}
