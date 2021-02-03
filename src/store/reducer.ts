import { TInitialState, TPlayerActions } from './types';

const initialState: TInitialState = {
  game: {},
  players: {},
  currentPlayer: undefined,
  currentUser: undefined,
  preferences: {
    charLength: 1,
    letterFromEnd: true,
    probabilityPercent: 1,
    restricted: true,
    inputType: 'TEXT',
  },
};

const gameReducer = (state = initialState, action: TPlayerActions): TInitialState => {
  switch (action.type) {
    case 'game':
      return {
        ...state,
        game: action.payload,
      };
    case 'players':
      return {
        ...state,
        players: action.payload,
      };
    case 'currentPlayer':
      return {
        ...state,
        currentPlayer: action.payload,
      };
    case 'currentUser':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'preferences':
      return {
        ...state,
        preferences: action.payload,
      };
    default:
      return state;
  }
};

export { gameReducer, initialState };
