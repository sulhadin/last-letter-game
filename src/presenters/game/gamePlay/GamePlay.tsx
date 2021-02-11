import React, { memo, useCallback, useContext, useState } from 'react';

import GameContext from '../../../context/GameContext';

import useGamePlay from '../../../hooks/useGamePlay';
import TextViewer from '../../components/textViewer/TextViewer';
import InputWord from '../inputs/InputWord';
import Timer from '../../components/timer/Timer';
import Lists from '../lists/Lists';
import './style.scss';

const GamePlay: React.FC = () => {
  const { state } = useContext(GameContext);

  const { lostMessage, currentPlayerType, addWord } = useGamePlay();

  const [timeUpMessage, setTimeUpMessage] = useState<string>();

  const onTimeUp = useCallback(() => {
    setTimeUpMessage('Time is up!');
  }, [setTimeUpMessage]);

  return (
    <div className="game-play">
      <TextViewer prefix="Last word is" text={state.currentWord} />
      <TextViewer text={lostMessage} type="danger" />
      <TextViewer text={timeUpMessage} type="danger" />

      <Timer onTimeIsUp={onTimeUp} />

      <TextViewer text={`It is now ${currentPlayerType}'s turn`} />
      <InputWord onNewWord={addWord} placeholder="Please say some word!" />
      <Lists gameData={state.game} players={state.players} />
    </div>
  );
};

export default memo(GamePlay);
