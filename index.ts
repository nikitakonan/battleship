import { randomUUID } from 'node:crypto';
import { type WebSocket, WebSocketServer } from 'ws';
import {
  ADD_SHIPS_TYPE,
  ADD_USER_TO_ROOM_TYPE,
  ATTACK_TYPE,
  CREATE_ROOM_TYPE,
  LOGIN_OR_CREATE_PLAYER_TYPE,
  RANDOM_ATTACK_TYPE,
} from './src/const';
import { httpServer } from './src/http_server/index';
import type { LoginRequestData, LoginResponseData, Message } from './src/types';
import { users } from './src/users';

type ExtendedWebSocket = WebSocket & {
  id: string;
  isAdmin?: boolean;
  userId?: string;
};

const HTTP_PORT = 8181;
const WS_PORT = 3000;

const wss = new WebSocketServer({
  port: WS_PORT,
});

const clients = new Set<ExtendedWebSocket>();

wss.on('connection', function connection(ws) {
  const client = ws as ExtendedWebSocket;
  client.id = randomUUID();
  clients.add(client);

  sendClientListToAdmins();

  client.on('close', () => {
    clients.delete(client);
    sendClientListToAdmins();
  });

  client.on('error', console.error);

  client.on('message', function clientMessageHandler(data) {
    try {
      const message = JSON.parse(data.toString()) as Message;
      console.log('received: %s', message);
      const parsedData = message.data ? JSON.parse(message.data) : null;

      switch (message.type) {
        case 'set_admin': {
          client.isAdmin = true;
          sendClientListToAdmins();
          break;
        }
        case LOGIN_OR_CREATE_PLAYER_TYPE: {
          const data = parsedData as LoginRequestData;

          const newUser = {
            id: randomUUID(),
            name: data.name,
            password: data.password,
          };
          users.push(newUser);
          client.userId = newUser.id;

          const response: Message = {
            type: LOGIN_OR_CREATE_PLAYER_TYPE,
            id: 0,
            data: JSON.stringify({
              name: data.name,
              index: 0,
              error: false,
            } satisfies LoginResponseData),
          };
          client.send(JSON.stringify(response));
          // Send update_room to all clients in the room
          // Send update_winners to all clients in the room
          break;
        }
        case CREATE_ROOM_TYPE: {
          // Send update_room to client who created the room
          break;
        }
        case ADD_USER_TO_ROOM_TYPE: {
          // Send update_room to all clients in the room
          // Send create_game to all clients in the room
          break;
        }
        case ADD_SHIPS_TYPE: {
          // Add ships to the player's game state
          // If all players have added ships, send start_game to all clients in the room
          // And send turn to all players in the room
          break;
        }
        case ATTACK_TYPE: {
          // Send attack result to all clients in the room
          // Send turn to all players in the room
          break;
        }
        case RANDOM_ATTACK_TYPE: {
          // Send attack result to all clients in the room
          // Send turn to all players in the room
          break;
        }
        default:
          console.log('Unknown message type:', message.type);
          break;
      }
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

/** admin messages */

function sendClientListToAdmins() {
  const adminClients = Array.from(clients).filter((c) => c.isAdmin);
  const clientListMessage = JSON.stringify({
    type: 'client_list',
    data: Array.from(clients).map((c) => ({
      id: c.id,
      isAdmin: c.isAdmin || false,
    })),
  });

  adminClients.forEach((admin) => {
    admin.send(clientListMessage);
  });
}
