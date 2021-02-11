import React, { memo, useContext, useEffect } from 'react';

import { GameContext } from '../../../context';

import TextViewer from '../textViewer/TextViewer';
import useCountDown from '../../../hooks/useCountDown';
import { ITimer } from '../../../utils/types';

const Timer: React.FC<ITimer> = ({ onTimeIsUp }) => {
  const { state, dispatch } = useContext(GameContext);
  const [second, timeIsUp, restart, setActive] = useCountDown(state.timer.second);

  useEffect(() => {
    if (timeIsUp) {
      onTimeIsUp();
      dispatch({ type: 'timer', payload: { second, timeIsUp } });
    }
  }, [timeIsUp]);

  useEffect(() => {
    restart();
  }, [state.currentPlayer]);

  useEffect(() => {
    setActive(state.timer.active);
  }, [state.timer.active]);

  return <TextViewer text={second.toString()} size="large" />;
};

export default memo(Timer);
