import { useState, useEffect } from 'react';

export type CountDown = [number, boolean, () => void, (value: boolean) => void];

const useCountDown = (seconds: number): CountDown => {
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
