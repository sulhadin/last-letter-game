import { createContext, Dispatch } from 'react';
import { TInitialState } from '../store/types';
import { initialState } from '../store/reducer';

const GameContext = createContext<{
  state: TInitialState;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default GameContext;
