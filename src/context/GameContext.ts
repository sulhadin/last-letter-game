import { createContext, Dispatch } from 'react';
import { TInitialState } from '../store/types';
import { initialState } from '../store/reducer';

/**
 * @typedef {state: TInitialState; dispatch: Dispatch<any>; }
 * @property {TInitialState} state
 * @property {Dispatch<any>} dispatch
 */

/** @type {import('react').Context<{state: TInitialState; dispatch: Dispatch<any>; }>} */
const GameContext = createContext<{
  state: TInitialState;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default GameContext;
