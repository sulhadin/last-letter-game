import { useCallback, useEffect, useRef, useState } from 'react';
import { checkWord, getWords, isWordExist } from '../libs/utils';
import playerType from '../libs/playerType';
import { TGame, TPlayer, TPlayers, TPreferences } from '../libs/types';

interface IWordController {
  notValidMessage: string;
  lastWord: string;
  gameData: TGame | undefined;
  addWord: (value: string) => void;
}

type TWordController = {
  preferences: TPreferences;
  currentPlayer: TPlayer;
  players: TPlayers;
  game: TGame;
};

const useWordController = ({
  players,
  currentPlayer,
  preferences,
  game,
}: TWordController): IWordController => {
  const [gameData, setGameData] = useState<TGame>();
  const [lastWord, setLastWord] = useState<string>('');
  const [notValidMessage, setNotValidMessage] = useState<string>('');
  const resolveRef = useRef<(value: string) => void>();

  const isWordValid = (newWord: string): boolean => {
    const isValid = checkWord(lastWord, newWord, preferences.charLength, preferences.letterFromEnd);

    const words = getWords(game);
    const isExist = isWordExist(newWord, words);

    if (isExist) {
      const user = playerType(currentPlayer, players);
      setNotValidMessage(`${user} said an existing word!.`);
      return false;
    }

    if (!isValid) {
      const user = playerType(currentPlayer, players);
      setNotValidMessage(`${user} lost.`);
      return false;
    }
    return true;
  };

  const addWord = (word: string) => {
    if (isWordValid(word)) {
      resolveRef?.current?.(word);
    }
  };

  const getWord = useCallback(() => {
    return new Promise((resolve: (word: string) => void) => {
      resolveRef.current = resolve;
    });
  }, [game]);

  const saveWord = useCallback(
    (newWord: string, player: TPlayer) => {
      let data = game;

      if (player) {
        const words = [...game[player]];
        words.push(newWord);

        data = {
          ...game,
          [player]: words,
        };
      }

      setGameData(data);
    },
    [game],
  );

  useEffect(() => {
    const fn = async () => {
      const newWord = await getWord();
      setLastWord(newWord);

      saveWord(newWord, currentPlayer);
    };

    fn().then();
  }, [currentPlayer]);

  return { notValidMessage, lastWord, addWord, gameData };
};

export default useWordController;
