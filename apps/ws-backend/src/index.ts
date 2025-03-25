import { WebSocket, WebSocketServer } from "ws";
import jwt, { decode, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): string | null {
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    if (typeof decode === "string") {
      return null;
    }
    if (!decode || !decode.userId) {
      return null;
    }
    return decode.userId;
  } catch (e) {
    return null;
  }
}

interface User {
  ws: WebSocket;
  rooms?: string[];
  userId: string;
}

const users: User[] = [];
wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token");
  if (!token) {
    ws.send("token doesn't found");
    ws.close;
    return;
  }
  const userId = checkUser(token);
  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async function message(data) {

    const parsedData = JSON.parse(data as unknown as string);
    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms?.push(parsedData.roomId);
    }
    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws == ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms?.filter((x) => x === parsedData.room);
    }

    console.log("message received");
    console.log(parsedData)
    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      try {
        const createChat = await prismaClient.chat.create({
          data: {
            roomId:Number(roomId),
            message,
            userId,
          },
        });
        if (!createChat) {
          ws.send("chat created failed");
          ws.close();
          return;
        }
        ws.send("Chat created successfully");
      } catch (e) {
        ws.send("Unable to create chat");
        ws.close();
      }

      users.forEach((user) => {
        if (user.rooms?.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
    }
  });
});

