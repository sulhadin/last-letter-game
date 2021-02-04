import React, { memo, useContext, useEffect } from 'react';
import WordViewer from '../../../components/textViewer/TextViewer';
import useCountDown from '../../../../hooks/useCountDown';
import { GameContext } from '../../../../context';

type TTimer = {
  onTimeUp: (value: string) => void;
  isGameOver: boolean;
};
const Timer: React.FC<TTimer> = ({ onTimeUp, isGameOver }) => {
  const { state } = useContext(GameContext);
  const [timer, timeIsUp, restart, setIsActive] = useCountDown(10);

  useEffect(() => {
    if (timeIsUp) {
      onTimeUp('Time is up!');
    }
  }, [timeIsUp]);

  useEffect(() => {
    restart();
  }, [state.currentPlayer]);

  useEffect(() => {
    if (isGameOver) {
      setIsActive(false);
    }
  }, [isGameOver]);

  return <WordViewer word={timer.toString()} />;
};

export default memo(Timer);
