import { useState, useEffect, useContext, useCallback } from 'react';
import GameContext from '../context/GameContext';
import { playGame } from '../controllers/playGame';
import delay from '../libs/delay';
import textToSpeech from '../controllers/textToSpeech';

type IUseComputerPlayResult = {
  computerLost: string;
};

const useComputerPlay = (
  lastWord: string,
  addWord: (value: string) => void,
): IUseComputerPlayResult => {
  const { state } = useContext(GameContext);
  const [computerLost, setComputerLost] = useState<string>('');

  const readAnswer = (response: string) => {
    const speak = textToSpeech(response);
    speak();
  };

  const play = useCallback(
    (words: string[]) => {
      delay(() => {
        const answer = playGame(lastWord, words, state.preferences);
        readAnswer(answer.response);

        if (answer.found) {
          addWord(answer.response);
        } else {
          setComputerLost(answer.response);
        }
      }, [100, 3000]);
    },
    [state.currentPlayer],
  );

  useEffect(() => {
    if (state.currentPlayer && state.players[state.currentPlayer] === 'Computer') {
      const words = Object.values(state.game).flat();
      play(words);
    }
  }, [state.currentPlayer]);

  return { computerLost };
};

export default useComputerPlay;
