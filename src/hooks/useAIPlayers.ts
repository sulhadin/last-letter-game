import { useEffect, useMemo } from 'react';
import useAIPlay from './useAIPlay';
import textToSpeech from '../utils/textToSpeech';
import { TAIPlayers } from './types';

/**
 * Gets response from ai and vocalize it and returns the response along with play function.
 *
 * Response result should be vocalized since response can be found or not.
 *
 * @param {string} playerType - Current player type Computer | HUMAN | ...
 * @param {string=} word - Last word
 * @return {TAIPlayers} Returns ai response.
 */
const useAIPlayers = (playerType: string, word?: string): TAIPlayers => {
  const { response, play } = useAIPlay(playerType, word);

  // textToSpeech memoized one time and supplied with 'tr' parameter as default
  // which also can be an environment variable or connected to global state.
  const speak = useMemo(() => textToSpeech('tr'), []);

  useEffect(() => {
    if (response.found) {
      speak(response.response);
    }
  }, [response]);

  return { response, play };
};

export default useAIPlayers;
