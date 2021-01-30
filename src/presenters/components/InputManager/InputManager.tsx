import React, { memo, useCallback, useContext, useEffect, useMemo } from 'react';
import InputText from '../InputText/InputText';
import InputVoice from '../InputVoice/InputVoice';
import { IInput } from '../../../libs/interfaces';
import { GameContext } from '../../../context/GameContext';
import uniqueId from '../../../libs/uniqueId';
import { PlayerEnum } from '../../../libs/Players';
import { Spoken } from '../../../libs/types';
import delay from '../../../libs/delay';
import playGame from '../../../libs/playGame';

const InputManager: React.FC<IInput> = ({ callback, placeholder, player }) => {
  const { state: spoken, setState: setSpoken } = useContext(GameContext);

  console.log('player', player);
  const addWord = (value: string): void => {
    setSpoken((prev: Spoken) => prev.concat({ item: value, id: uniqueId() }));
  };

  const actions = useMemo(
    () => ({
      [PlayerEnum.Computer]: (items: Spoken) => {
        delay(() => {
          const answer = playGame(items);

          if (answer.found) {
            addWord(answer.response);
            console.log('callback call');
            callback();
          } else {
            // TODO: Computer lost.
          }
        }, [100, 3000]);
      },
      [PlayerEnum.Player]: (items?: Spoken) => {
        // TODO Player job here.
        // eslint-disable-next-line no-console
        console.log('items', items);
      },
    }),
    [],
  );

  useEffect(() => {
    if (spoken.length) {
      actions[player](spoken);
    }
  }, [player]);

  const inputCallback = useCallback(
    (value) => {
      console.log('value', value);
      addWord(value);
      callback();
    },
    [spoken],
  );

  console.log('context words', spoken);

  return (
    <>
      <InputText callback={inputCallback} placeholder={placeholder} player={player} />
      <InputVoice callback={inputCallback} placeholder={placeholder} player={player} />
    </>
  );
};

export default memo(InputManager);
