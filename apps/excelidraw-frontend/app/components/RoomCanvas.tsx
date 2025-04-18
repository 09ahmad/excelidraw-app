"use client";
import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjM1MWM0MC0wODE0LTQ3MDAtYTRhZC03NDBlMDEyYTZmMTYiLCJpYXQiOjE3NDIxNjA2NTR9.PU8zHFOR5YGsOmkyVaO9xf6LHcw8LP55sqeNVeSFeEE`);
    ws.onopen = () => {
      setSocket(ws);
      ws.send(JSON.stringify({
        type:"join_room",
        roomId
      }))
    };
  }, []);
  if (!socket) {
    return <div>Connecting to server....</div>;
  }
  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
