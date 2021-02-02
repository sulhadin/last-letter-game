import React, { memo, useEffect } from 'react';
import List from '../../components/list/List';
import WordViewer from '../../components/textViewer/TextViewer';
import InputWord from '../inputs/Inputs';
import useCountDown from '../../../hooks/useCountDown';
import usePlay from '../../../hooks/usePlay';
import './style.scss';

const GamePlay: React.FC = () => {
  const { gameOver, setGameOver, lastWord, currentPlayer, addWord } = usePlay();
  const [timer, timeIsUp, restart, setIsActive] = useCountDown(8);

  useEffect(() => {
    if (timeIsUp) {
      setGameOver('Time is up!');
    }
  }, [timeIsUp]);

  useEffect(() => {
    restart();
  }, [currentPlayer]);

  useEffect(() => {
    // TODO: Finish panel should appear.
    setIsActive(false);
  }, [gameOver]);

  return (
    <div className="game-play">
      <h2>{`It is now ${currentPlayer}'s turn`}</h2>
      <h2>{gameOver}</h2>

      <WordViewer prefix="Last word is" word={lastWord} />
      <WordViewer word={timer.toString()} />

      <InputWord onNewWord={addWord} placeholder="Please say some word!" />
      <List data={[]} empty="Word chain is empty." title="Word chain" />
    </div>
  );
};

export default memo(GamePlay);
