import React, { memo, useCallback, useContext, useEffect, useMemo } from 'react';
import List from '../../components/List/List';
import { Word } from '../../../libs/types';
import WordViewer from '../../components/WordViewer/WordViewer';
import { defaultPlayer, nextPlayer, PlayerEnum } from '../../../libs/Players';
import lastArrayItem from '../../../libs/utils';
import InputWord from '../InputWord/InputWord';
import useCountDown from '../../components/hooks/useCountDown';
import { GameContext } from '../../../context/GameContext';
import './style.scss';

const GamePlay: React.FC = () => {
  const { state: spoken } = useContext(GameContext);

  const [player, setPlayer] = React.useState<PlayerEnum>(defaultPlayer);
  const [timer, restart, timeIsUp] = useCountDown(8);

  const lastSpoken = useMemo(() => lastArrayItem<Word>(spoken), [spoken]);

  const switchPlayer = useCallback(() => {
    setPlayer((prevPlayer) => nextPlayer(prevPlayer));
    restart();
  }, []);

  useEffect(() => {
    // TODO: Time is up setup here.
  }, [timeIsUp]);

  return (
    <div className="game-play">
      <h2>{`It is now ${PlayerEnum[player]}'s turn`}</h2>

      <WordViewer prefix="Last word is" word={lastSpoken?.item} />
      <WordViewer word={timer.toString()} />

      <InputWord player={player} onNewWord={switchPlayer} placeholder="Please say some word!" />
      <List data={spoken} empty="Word chain is empty." title="Word chain" />
    </div>
  );
};

export default memo(GamePlay);
