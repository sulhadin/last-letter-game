import { TInitialState, TPlayerActions } from './types';

const initialState: TInitialState = {
  timer: { timeIsUp: false, second: 100, active: true },
  game: {},
  players: {},
  currentPlayer: undefined,
  currentUser: undefined,
  currentWord: '',
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
    case 'timer':
      return {
        ...state,
        timer: action.payload,
      };
    case 'currentWord':
      return {
        ...state,
        currentWord: action.payload,
      };
    default:
      return state;
  }
};

export { gameReducer, initialState };
