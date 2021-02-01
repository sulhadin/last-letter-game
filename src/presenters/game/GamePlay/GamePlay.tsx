import React, { memo, useEffect } from 'react';
import List from '../../components/List/List';
import WordViewer from '../../components/WordViewer/WordViewer';
import InputWord from '../InputWord/InputWord';
import useCountDown from '../../components/hooks/useCountDown';
import usePlay from '../../components/hooks/usePlay';
import './style.scss';

interface IGamePlay {
  gameStarted: boolean;
}
const GamePlay: React.FC<IGamePlay> = () => {
  const { gameOver, setGameOver, lastWord, currentPlayer, addWord } = usePlay();
  const [timer, restart, timeIsUp] = useCountDown(8);

  useEffect(() => {
    if (timeIsUp) {
      // TODO: Time is up setup here.
      setGameOver('Time is up!');
    }
  }, [timeIsUp]);

  useEffect(() => {
    restart();
  }, [currentPlayer]);

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
