export interface Room {
  id: string;
  name: string;
}

export async function fetchRooms(): Promise<Room[]> {
  const response = await fetch('/api/rooms');
  if (!response.ok) {
    throw new Error('Failed to fetch rooms');
  }
  return response.json();
}
