import React, { memo, useCallback, useEffect, useMemo } from 'react';
import List from '../components/List/List';
import './play.scss';
import { Spoken, Word } from '../../libs/types';
import uniqueId from '../../libs/uniqueId';
import WordViewer from '../components/WordViewer/WordViewer';
import { PlayerEnum, nextPlayer, defaultPlayer } from '../../libs/Players';
import lastArrayItem from '../../libs/utils';
import delay from '../../libs/delay';
import playGame from '../../libs/playGame';
import InputWord from '../components/InputWord/InputWord';
import useCountDown from '../components/hooks/useCountDown';

const GamePlay: React.FC = () => {
  const [spoken, setSpoken] = React.useState<Spoken>([]);
  const [player, setPlayer] = React.useState<PlayerEnum>(defaultPlayer);
  const [timer, restart] = useCountDown(8);

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
      restart();
    }
  }, [player]);

  return (
    <div className="game-play">
      <WordViewer prefix="Last word is" word={lastSpoken?.item} />
      <WordViewer word={timer.toString()} />
      <h2>{`It is now ${PlayerEnum[player]}'s turn`}</h2>
      <InputWord player={player} callback={callback} placeholder="Please say some word!" />
      <div className="list">
        <List data={spoken} empty="Word list is empty." title="Word chain" />
      </div>
    </div>
  );
};

export default memo(GamePlay);
