Backend code is located at `src/http_server`

The backend should be able to do the following:
- Start websocket server
- Handle websocket connection
- Handle player requests
- Handle room requests
- Handle ships requests
- Handle game requests
- Create single play bot (optional)

## Technical requirements:
- Task should be implemented on Typescript
- Use 24.x.x version (24.14.0 or upper) of Node.js
- Only `ws`, `cross-env`, `typescript`, `tsx`, `ts-node`, `ts-node-dev`, `nodemon`, `dotenv`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `@types/*` and testing tools (for example, Jest, Mocha, AVA, Jasmine, Cypress, Storybook, Puppeteer) are allowed
- All requests and responses must be sent as JSON string
- After starting the program displays websocket parameters
- After program work finished the program should end websocket work correctly
- After each received command program should display the command and result

## Game description
1. We should have in-memory DB with player data (login and password) storage
2. Player can create game room or connect to the game room after login
3. Player room data (players, game board, ships positions) storages in the server
4. Game starts after 2 players are connected to the room and sent ships positions to the server
5. Server sends move order
6. Players should shoot in their's turn
7. Server send back shot result
8. If player hits or kills the ship, player should make one more shoot
9. Player wins if he have killed all enemies ships

## The backend should have 3 types of response:
1. personal response
    - reg - player registration/login
2. response for the game room
    - create_game - game id and player id (unique id for user in this game)
    - start_game - informationa about game and player's ships positions
    - turn - who is shooting now
    - attack - coordinates of shot and status
    - finish - id of the winner
3. response for all
    - update_room - list of rooms and players in rooms
    - update_winners - send score table to players