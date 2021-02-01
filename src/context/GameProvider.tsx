import React, { useEffect, useReducer } from 'react';
import { AppContext, gameReducer, initialState } from './reducers';

const GameProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    console.log('initialize');
    dispatch({
      type: 'game',
      payload: { A923476983: [], B8486384963: [] },
    });
    dispatch({
      type: 'players',
      payload: { A923476983: 'Player', B8486384963: 'Computer' },
    });

    // dispatch({
    //   type: 'currentPlayer',
    //   payload: 'A923476983',
    // });
  }, []);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export default GameProvider;
