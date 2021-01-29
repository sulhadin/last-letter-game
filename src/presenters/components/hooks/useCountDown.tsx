import React from 'react';

export type CountDown = [number, () => void];

const useCountDown = (seconds: number): CountDown => {
  const [countDown, setCountDown] = React.useState<number>(seconds);

  const setupTimer = () => {
    const countDownTimer = setInterval(() => {
      let remain = 0;

      setCountDown((second) => {
        remain = second;
        return second - 1;
      });
      console.log('remain', remain);
      console.log('countDownTimer', countDownTimer);
      if (remain <= 1) {
        console.log('remain', remain);
        clearInterval(countDownTimer);
        console.log('countDownTimer clear', countDownTimer);
      }
    }, 1000);
  };

  const restart = () => {
    setCountDown(seconds);
    setupTimer();
  };
  React.useEffect(restart, []);
  return [countDown, restart];
};

export default useCountDown;
