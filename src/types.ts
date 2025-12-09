import type {
  ADD_SHIPS_TYPE,
  ADD_USER_TO_ROOM_TYPE,
  ATTACK_TYPE,
  CREATE_GAME_TYPE,
  CREATE_ROOM_TYPE,
  FINISH_TYPE,
  LOGIN_OR_CREATE_PLAYER_TYPE,
  RANDOM_ATTACK_TYPE,
  START_GAME_TYPE,
  TURN_TYPE,
  UPDATE_ROOM_TYPE,
  UPDATE_WINNERS_TYPE,
} from './const';

export type MessageType =
  | typeof LOGIN_OR_CREATE_PLAYER_TYPE
  | typeof UPDATE_WINNERS_TYPE
  | typeof CREATE_ROOM_TYPE
  | typeof ADD_USER_TO_ROOM_TYPE
  | typeof CREATE_GAME_TYPE
  | typeof UPDATE_ROOM_TYPE
  | typeof ADD_SHIPS_TYPE
  | typeof START_GAME_TYPE
  | typeof ATTACK_TYPE
  | typeof RANDOM_ATTACK_TYPE
  | typeof TURN_TYPE
  | typeof FINISH_TYPE
  | (string & {});

export type Message = {
  type: MessageType;
  data?: string;
  id: 0;
};

/** Player messages */
export type LoginRequestData = {
  name: string;
  password: string;
};

export type LoginResponseData = {
  name: string;
  index: number | string;
  error: boolean;
  errorText?: string;
};

export type UpdateWinnersResponseMessage = {
  type: typeof UPDATE_WINNERS_TYPE;
  data: {
    name: string;
    wins: number;
  }[];
};

/** Room messages */
export type CreateRoomRequestMessage = Message & {
  type: typeof CREATE_ROOM_TYPE;
  data: '';
};

export type AddUserToRoomRequestMessage = Message & {
  type: typeof ADD_USER_TO_ROOM_TYPE;
  data: {
    indexRoom: number | string;
  };
};

export type CreateGameResponseMessage = Message & {
  type: typeof CREATE_GAME_TYPE;
  data: {
    idGame: number | string;
    idPlayer: number | string;
  };
};

export type UpdateRoomResponseMessage = Message & {
  type: typeof UPDATE_ROOM_TYPE;
  data: {
    roomId: number | string;
    roomUsers: {
      name: string;
      index: number | string;
    }[];
  }[];
};

/** Ships messages */
export type AddShipsRequestMessage = Message & {
  type: typeof ADD_SHIPS_TYPE;
  data: {
    gameId: number | string;
    ships: {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    }[];
    indexPlayer: number | string;
  };
};

export type StartGameResponseMessage = Message & {
  type: typeof START_GAME_TYPE;
  data: {
    ships: {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    }[];
    currentPlayerIndex: number | string;
  };
};

/** Game messages */
export type AttackRequestMessage = Message & {
  type: typeof ATTACK_TYPE;
  data: {
    gameId: number | string;
    x: number;
    y: number;
    indexPlayer: number | string;
  };
};

export type AttackResponseMessage = Message & {
  type: typeof ATTACK_TYPE;
  data: {
    position: {
      x: number;
      y: number;
    };
    currentPlayer: number | string;
    status: 'miss' | 'killed' | 'shot';
  };
};

export type RandomAttackRequestMessage = Message & {
  type: typeof RANDOM_ATTACK_TYPE;
  data: {
    gameId: number | string;
    indexPlayer: number | string;
  };
};

export type TurnResponseMessage = Message & {
  type: typeof TURN_TYPE;
  data: {
    currentPlayer: number | string;
  };
};

export type FinishResponseMessage = Message & {
  type: typeof FINISH_TYPE;
  data: {
    winPlayer: number | string;
  };
};

/** Entities */
export type User = {
  id: string;
  name: string;
  password: string;
};

export type Room = {
  id: string;
  players: string[];
  gameBoard: unknown;
  shipPositions: unknown;
};
