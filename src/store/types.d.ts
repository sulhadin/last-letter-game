import { TGame, TPlayer, TPlayers, TPreferences, TTimer } from '../utils/types';

// Action type for reducer.
export type TActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type TInitialState = {
  game: TGame;
  players: TPlayers;
  currentPlayer: TPlayer;
  currentWord: string;
  currentUser: TPlayer;
  preferences: TPreferences;
  timer: TTimer;
};

export type TPlayerActions = TActionMap<TInitialState>[keyof TActionMap<TInitialState>];
