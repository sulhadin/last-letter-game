import { useState, useEffect } from 'react';

export type TCountDown = [number, boolean, () => void, (value: boolean) => void];

/**
 * A React hook that set up a count down timer.
 *
 * @func useCountDown
 * @memberOf React
 * @param {number} seconds - A number that count down will start from.
 * @return {TCountDown} - Returns remaining time and a timer handlers.
 */
const useCountDown = (seconds: number): TCountDown => {
  const [active, setActive] = useState(true);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [second, setSecond] = useState(seconds);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (active) {
      intervalId = setInterval(() => {
        if (second <= 1) {
          setActive(false);
          setTimeIsUp(true);
        }
        setSecond((count) => count - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [active, second]);

  const restart = () => {
    setTimeIsUp(false);
    setActive(true);
    setSecond(seconds);
  };

  return [second, timeIsUp, restart, setActive];
};

export default useCountDown;
