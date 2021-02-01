import { useState, useEffect, useContext, useCallback } from 'react';
import { AppContext } from '../../../context/reducers';
import { playGame } from '../../../libs/playGame';
import delay from '../../../libs/delay';

type IUseComputerPlayResult = {
  computerLost: string;
};

const useComputerPlay = (
  lastWord: string,
  addWord: (value: string) => void,
): IUseComputerPlayResult => {
  const { state } = useContext(AppContext);
  const [computerLost, setComputerLost] = useState<string>('');

  const play = useCallback(() => {
    delay(() => {
      const words = Object.values(state.game).flat();
      const answer = playGame(lastWord, words);

      if (answer.found) {
        addWord(answer.response);
      } else {
        setComputerLost(answer.response);
      }
    }, [100, 3000]);
  }, [state.currentPlayer]);

  useEffect(() => {
    if (state.currentPlayer && state.players[state.currentPlayer] === 'Computer') {
      play();
    }
  }, [state.currentPlayer]);

  return { computerLost };
};

export default useComputerPlay;
