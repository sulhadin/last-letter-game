import { useState, useEffect, useCallback } from 'react';

import { TGame, TPlayer, TPlayers, TPreferences } from '../libs/types';

import { playGame } from '../controllers/playGame';
import { playerTypeCheck } from '../libs/playerType';
import { UserType } from '../libs/enums';
import { getWords } from '../libs/utils';
import delay from '../libs/delay';

type IComputerPlay = {
  computerLost: string | undefined;
  word: string | undefined;
};

type TParams = {
  lastWord: string;
  player: TPlayer;
  preferences: TPreferences;
  players: TPlayers;
  game: TGame;
};

const useComputerPlay = ({
  lastWord,
  player,
  preferences,
  players,
  game,
}: TParams): IComputerPlay => {
  const [computerLost, setComputerLost] = useState<string>();
  const [word, setWord] = useState<string>();

  const play = useCallback(
    (wordList: string[]) => {
      const answer = playGame(lastWord, wordList, preferences);

      if (answer.found) {
        setWord(answer.response);
      } else {
        setComputerLost(answer.response);
      }
    },
    [player, lastWord],
  );

  useEffect(() => {
    const isPlayerComputer = playerTypeCheck(player, players, UserType.COMPUTER);

    if (isPlayerComputer) {
      const words = getWords(game);
      delay(() => play(words), [100, 3000]);
    }
  }, [player]);

  return { computerLost, word };
};

export default useComputerPlay;
