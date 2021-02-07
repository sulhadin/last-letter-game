import { useEffect } from 'react';
import useComputerPlayer from './useComputerPlayer';
import textToSpeech from '../controllers/textToSpeech';
import { IPlayerResult } from '../libs/types';

type TPlayers = {
  response: IPlayerResult;
  play: () => void;
};

const useAIPlayers = (playerType: string, word?: string): TPlayers => {
  const { response, play } = useComputerPlayer(playerType, word);

  useEffect(() => {
    if (response.found) {
      const speak = textToSpeech(response.response);
      speak();
    }
  }, [response]);

  return { response, play };
};

export default useAIPlayers;
