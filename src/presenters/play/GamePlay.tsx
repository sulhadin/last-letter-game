import React, { memo, useCallback, useContext, useEffect, useMemo } from 'react';
import List from '../components/List/List';
import './play.scss';
import { Spoken, Word } from '../../libs/types';
import uniqueId from '../../libs/uniqueId';
import WordViewer from '../components/WordViewer/WordViewer';
import { defaultPlayer, nextPlayer, PlayerEnum } from '../../libs/Players';
import lastArrayItem from '../../libs/utils';
import delay from '../../libs/delay';
import playGame from '../../libs/playGame';
import InputWord from '../components/InputWord/InputWord';
import useCountDown from '../components/hooks/useCountDown';
import GameContext from '../../context/GameContext';

const GamePlay: React.FC = () => {
  const [words] = useContext(GameContext);

  const [spoken, setSpoken] = React.useState<Spoken>([]);
  const [player, setPlayer] = React.useState<PlayerEnum>(defaultPlayer);
  const [timer, restart, timeIsUp] = useCountDown(8);

  const lastSpoken = useMemo(() => lastArrayItem<Word>(spoken), [spoken]);

  const switchPlayer = (): void => {
    setPlayer(nextPlayer(player));
  };

  const addWord = (value: string): void => {
    setSpoken((prev) => prev.concat({ item: value, id: uniqueId() }));
  };

  const callback = useCallback(
    (value) => {
      addWord(value);
      switchPlayer();
    },
    [spoken],
  );

  const actions = {
    [PlayerEnum.Computer]: (items: Spoken) => {
      delay(() => {
        const answer = playGame(items);

        if (answer.found) {
          switchPlayer();
          addWord(answer.response);
        } else {
          console.log(answer.response);
        }
      }, [100, 3000]);
    },
    [PlayerEnum.Player]: (items: Spoken) => {
      console.log('player', items);
    },
  };

  useEffect(() => {
    if (spoken.length) {
      actions[player](spoken);
    }
    restart();
  }, [player]);

  useEffect(() => {
    console.info('TIME IS UP');
  }, [timeIsUp]);

  console.log('context words', words);

  return (
    <div className="game-play">
      <WordViewer prefix="Last word is" word={lastSpoken?.item} />

      <WordViewer word={timer.toString()} />

      <h2>{`It is now ${PlayerEnum[player]}'s turn`}</h2>

      <InputWord player={player} callback={callback} placeholder="Please say some word!" />

      <List data={spoken} empty="Word chain is empty." title="Word chain" />
    </div>
  );
};

export default memo(GamePlay);
