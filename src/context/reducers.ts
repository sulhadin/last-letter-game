import React, { createContext } from 'react';
import { TPreferences } from '../libs/types';

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
  currentUser: string | null;
  preferences: TPreferences;
};

const initialState: TInitialState = {
  game: {},
  players: {},
  currentPlayer: null,
  currentUser: null,
  preferences: {
    charLength: 1,
    letterFromEnd: true,
    probabilityPercent: 1,
    restricted: true,
    inputType: 'TEXT',
  },
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

const AppContext = createContext<{
  state: TInitialState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export { AppContext, gameReducer, initialState };
