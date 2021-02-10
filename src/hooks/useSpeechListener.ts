import { useEffect, useState } from 'react';

type TSpeechListener = [string | undefined, boolean, () => void, () => void, () => void];

/**
 * A Reach hook that listens and get gets results from speech events; 'speechResultEvent', 'speechStopEvent'.
 *
 * @func useSpeechListener
 * @memberOf React
 * @param {boolean} speechStarted - Initially listening should start or stop.
 * @return {TSpeechListener} - Returns speech result along with speech information.
 */
const useSpeechListener = (speechStarted: boolean): TSpeechListener => {
  const [speech, setSpeech] = useState<string>();
  const [speechStopped, setSpeechStopped] = useState<boolean>(!speechStarted);

  const listenResult = (e: CustomEvent): void => {
    setSpeech(e.detail.result);
  };

  const listenStop = (): void => {
    setSpeechStopped(true);
  };

  const listenStart = (): void => {
    setSpeechStopped(false);
  };
  const reset = (): void => {
    setSpeech(undefined);
  };

  useEffect(() => {
    document.addEventListener('speechStopEvent', listenStop as EventListener);
    document.addEventListener('speechResultEvent', listenResult as EventListener);
    return () => {
      document.removeEventListener('speechStopEvent', listenStop as EventListener);
      document.removeEventListener('speechResultEvent', listenResult as EventListener);
    };
  }, []);

  return [speech, speechStopped, reset, listenStart, listenStop];
};

export default useSpeechListener;
