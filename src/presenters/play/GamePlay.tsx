import React, { memo, useCallback, useEffect, useMemo } from 'react';
import List from '../components/List';
import './play.scss';
import { Spoken, Word } from '../../libs/types';
import uniqueId from '../../libs/uniqueId';
import WordViewer from '../components/WordViewer';
import { PlayerEnum, nextPlayer, defaultPlayer } from '../../libs/Players';
import lastArrayItem from '../../libs/utils';
import delay from '../../libs/delay';
import playGame from '../../libs/playGame';
import InputWord from '../components/InputWord';

const GamePlay: React.FC = () => {
  const [spoken, setSpoken] = React.useState<Spoken>([]);
  const [player, setPlayer] = React.useState<PlayerEnum>(defaultPlayer);

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
  }, [player]);

  return (
    <div className="play">
      <WordViewer prefix="Last word is" word={lastSpoken?.item} />
      <div className="list">
        <List data={spoken} empty="Yet, there is no word said." />
      </div>
      <h2>{`It is now ${PlayerEnum[player]}'s turn`}</h2>
      <InputWord player={player} callback={callback} placeholder="Please say some word!" />
    </div>
  );
};

export default memo(GamePlay);
