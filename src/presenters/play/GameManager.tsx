import React, { memo, useCallback, useContext, useEffect, useMemo } from 'react';
import List from '../components/List/List';
import { Word } from '../../libs/types';
import WordViewer from '../components/WordViewer/WordViewer';
import { defaultPlayer, nextPlayer, PlayerEnum } from '../../libs/Players';
import lastArrayItem from '../../libs/utils';
import InputWord from '../components/InputManager/InputManager';
import useCountDown from '../components/hooks/useCountDown';
import { GameContext } from '../../context/GameContext';
import './play.scss';

const GameManager: React.FC = () => {
  const { state: spoken } = useContext(GameContext);

  // const [spoken, setSpoken] = React.useState<Spoken>([]);
  const [player, setPlayer] = React.useState<PlayerEnum>(defaultPlayer);
  const [timer, restart, timeIsUp] = useCountDown(8);

  const lastSpoken = useMemo(() => lastArrayItem<Word>(spoken), [spoken]);

  const switchPlayer = useCallback(() => {
    setPlayer((prevPlayer) => nextPlayer(prevPlayer));
    restart();
  }, []);

  // const addWord = (value: string): void => {
  //   setSpoken((prev) => prev.concat({ item: value, id: uniqueId() }));
  // };
  //
  // const actions = {
  //   [PlayerEnum.Computer]: (items: Spoken) => {
  //     delay(() => {
  //       const answer = playGame(items);
  //
  //       if (answer.found) {
  //         switchPlayer();
  //         addWord(answer.response);
  //       } else {
  //         // TODO: Computer lost.
  //       }
  //     }, [100, 3000]);
  //   },
  //   [PlayerEnum.Player]: (items?: Spoken) => {
  //     // TODO Player job here.
  //     // eslint-disable-next-line no-console
  //     console.log('items', items);
  //   },
  // };
  //
  // useEffect(() => {
  //   if (spoken.length) {
  //     actions[player](spoken);
  //   }
  //   restart();
  // }, [player]);

  useEffect(() => {
    // TODO: Time is up setup here.
  }, [timeIsUp]);

  return (
    <div className="game-play">
      <WordViewer prefix="Last word is" word={lastSpoken?.item} />

      <WordViewer word={timer.toString()} />

      <h2>{`It is now ${PlayerEnum[player]}'s turn`}</h2>

      <InputWord player={player} callback={switchPlayer} placeholder="Please say some word!" />

      <List data={spoken} empty="Word chain is empty." title="Word chain" />
    </div>
  );
};

export default memo(GameManager);
