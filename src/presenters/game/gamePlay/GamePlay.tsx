import React, { memo, useCallback, useState } from 'react';
import WordViewer from '../../components/textViewer/TextViewer';
import InputWord from '../inputs/Inputs';
import useGamePlay from '../../../hooks/useGamePlay';
import './style.scss';
import Timer from './components/Timer';
import Lists from '../lists/Lists';

const GamePlay: React.FC = () => {
  const { gameOver, lastWord, currentPlayerType, addWord, gameData, players } = useGamePlay();
  const [timeUp, setTimeUp] = useState<string>();

  const onTimeUp = useCallback(
    (value: string) => {
      setTimeUp(value);
    },
    [setTimeUp],
  );

  return (
    <div className="game-play">
      <WordViewer prefix="Last word is" word={lastWord} className="title" />
      <WordViewer word={gameOver} className="title danger" />
      <WordViewer word={timeUp} className="title danger" />

      <Timer onTimeUp={onTimeUp} isGameOver={!!gameOver} />

      <WordViewer size="small" word={`It is now ${currentPlayerType}'s turn`} />
      <InputWord onNewWord={addWord} placeholder="Please say some word!" />
      <Lists gameData={gameData} players={players} />
    </div>
  );
};

export default memo(GamePlay);
