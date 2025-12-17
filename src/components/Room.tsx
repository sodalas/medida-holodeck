import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  color: string;
}

interface Message {
  id: number;
  body: string;
}

interface ChatData {
  user: User;
  message: Message;
}

interface ChatEvent {
  kind: 'CHAT_MESSAGE';
  data: ChatData;
}

interface RoomProps {
  roomId: string;
}

export function Room({ roomId }: RoomProps) {
  const [messages, setMessages] = useState<ChatEvent[]>([]);

  useEffect(() => {
    // Use relative path for WebSocket to go through Vite proxy
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(
      `${protocol}//${window.location.host}/api/chat/${roomId}`,
    );

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.kind === 'CHAT_MESSAGE') {
          setMessages((prev) => [...prev, data as ChatEvent]);
        }
      } catch (error) {
        console.error('Failed to parse websocket data:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket failed:', error);
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

  return (
    <div className="room-container">
      <h2>Room: {roomId}</h2>
      <div className="messages-log">
        {messages.map((event) => (
          <div key={event.data.message.id} className="message-item">
            <span
              style={{ color: event.data.user.color, fontWeight: 'bold' }}
            >
              {event.data.user.name}:
            </span>{' '}
            <span>{event.data.message.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
