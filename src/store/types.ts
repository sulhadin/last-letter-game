import { TGame, TPlayer, TPlayers, TPreferences } from '../libs/types';

export type TActionMap<M extends { [index: string]: any }> = {
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
  currentUser: TPlayer;
  preferences: TPreferences;
};

export type TPlayerActions = TActionMap<TInitialState>[keyof TActionMap<TInitialState>];
