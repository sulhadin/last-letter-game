import { useState, useEffect } from 'react';

export type CountDown = [number, () => void, boolean];

const useCountDown = (seconds: number): CountDown => {
  const [isActive, setIsActive] = useState(true);
  const [isTimeout, setIsTimeout] = useState(false);
  const [counter, setCounter] = useState(seconds);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive) {
      intervalId = setInterval(() => {
        if (counter <= 1) {
          setIsActive(false);
          setIsTimeout(true);
        }
        setCounter((count) => count - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  const restart = () => {
    setIsTimeout(false);
    setIsActive(true);
    setCounter(seconds);
  };

  return [counter, restart, isTimeout];
};

export default useCountDown;
