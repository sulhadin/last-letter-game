import React, { memo } from 'react';
import List from '../../components/list/List';
import WordViewer from '../../components/textViewer/TextViewer';
import InputWord from '../inputs/Inputs';
import useGamePlay from '../../../hooks/useGamePlay';
import './style.scss';

const GamePlay: React.FC = () => {
  const { gameOver, timer, lastWord, currentPlayerType, addWord } = useGamePlay();

  return (
    <div className="game-play">
      <h2>{`It is now ${currentPlayerType}'s turn`}</h2>
      <h2>{gameOver}</h2>

      <WordViewer prefix="Last word is" word={lastWord} />
      <WordViewer word={timer.toString()} />

      <InputWord onNewWord={addWord} placeholder="Please say some word!" />
      <List data={[]} empty="Word chain is empty." title="Word chain" />
    </div>
  );
};

export default memo(GamePlay);
