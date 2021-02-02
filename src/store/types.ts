import { TPreferences } from '../libs/types';

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
  game: { [player: string]: string[] };
  players: { [player: string]: string };
  currentPlayer: string | null;
  currentUser: string | null;
  preferences: TPreferences;
};

export type TPlayerActions = TActionMap<TInitialState>[keyof TActionMap<TInitialState>];
