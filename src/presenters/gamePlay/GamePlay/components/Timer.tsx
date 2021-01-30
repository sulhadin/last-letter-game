import React, { memo, useEffect } from 'react';
import useCountDown from '../../../components/hooks/useCountDown';
import WordViewer from '../../../components/WordViewer/WordViewer';

interface ITimer {
  whenTimeIsUp(): void;
  restartTimer(): void;
}

const Timer: React.FC<ITimer> = ({ whenTimeIsUp, restartTimer }) => {
  const [timer, restart, timeIsUp] = useCountDown(8);

  useEffect(() => {
    // TODO: Time is up setup here.
    restartTimer();
    restart();
    whenTimeIsUp();
  }, [timeIsUp]);

  return <WordViewer word={timer.toString()} />;
};

export default memo(Timer);
