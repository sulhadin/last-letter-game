import { useEffect, useMemo } from 'react';
import useAIPlay from './useAIPlay';
import textToSpeech from '../utils/textToSpeech';
import { TAIPlayers } from './types';

const useAIPlayers = (playerType: string, word?: string): TAIPlayers => {
  const { response, play } = useAIPlay(playerType, word);
  const speak = useMemo(() => textToSpeech('tr'), []);

  useEffect(() => {
    if (response.found) {
      speak(response.response);
    }
  }, [response]);

  return { response, play };
};

export default useAIPlayers;
