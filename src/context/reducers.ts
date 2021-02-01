import React, { createContext } from 'react';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type InitialStateType = {
  player: { [player: string]: [string] };
  currentPlayer: string;
};

const initialState = {
  player: {},
  currentPlayer: '87fhaf8',
};

export type PlayerActions = ActionMap<InitialStateType>[keyof ActionMap<InitialStateType>];

export const gameReducer = (state = initialState, action: PlayerActions): InitialStateType => {
  switch (action.type) {
    case 'player':
      return {
        ...state,
        player: action.payload,
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

const mainReducer = (state: InitialStateType, action: PlayerActions) => ({
  gameReducer: gameReducer(state, action),
});

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export { AppContext, mainReducer, initialState };
