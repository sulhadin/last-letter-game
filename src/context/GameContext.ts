import { createContext, Dispatch, SetStateAction } from 'react';
import { Spoken } from '../libs/types';

type AppContextState = Spoken;

export type AppContextValue = {
  state: AppContextState;
  setState: Dispatch<SetStateAction<AppContextState>>;
};

const GameContext = createContext<AppContextValue>({} as AppContextValue);

export { GameContext };
