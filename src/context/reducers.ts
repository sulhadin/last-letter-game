import React, { createContext } from 'react';

type TActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type TInitialState = {
  game: { [player: string]: string[] };
  players: { [player: string]: string };
  currentPlayer: string | null;
};

const initialState: TInitialState = {
  game: {},
  players: {},
  currentPlayer: null,
};

export type TPlayerActions = TActionMap<TInitialState>[keyof TActionMap<TInitialState>];

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
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: TInitialState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export { AppContext, gameReducer, initialState };
