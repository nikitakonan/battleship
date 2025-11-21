import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer } from 'ws';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

const wss = new WebSocketServer({
  port: WS_PORT
})

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send(JSON.stringify({
    type: 'handshake',
    payload: 'Welcome to WebSocket server!'
  }));
});


console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
