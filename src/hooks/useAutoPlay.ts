import { useCallback, useEffect, useState } from 'react';

import delay from '../libs/delay';
import { getRandomWord } from '../controllers/playGame';
import { TPlayer } from '../libs/types';

interface IAutoPlay {
  word: string | null;
}

const useAutoPlay = (player: TPlayer): IAutoPlay => {
  const [word, setWord] = useState<string | null>(null);

  const play = useCallback(() => {
    const answer = getRandomWord();
    setWord(answer.response);
  }, [player]);

  useEffect(() => {
    if (!player) {
      delay(play, 1000);
    }
  }, [player]);

  return { word };
};

export default useAutoPlay;
