import React, { useCallback, useEffect } from 'react';
import InputText from '../../components/InputText';
import List from '../../components/List';
import playGame from '../../libs/playGame';
import './play.scss';
import { IPayload } from '../../libs/interfaces';
import { Spoken } from '../../libs/types';
import uniqueId from '../../libs/uniqueId';

const configuration = (spoken: Spoken): IPayload => ({
  value: '',
  charLength: 1,
  computerFromStart: true,
  playerFromStart: false,
  probabilityPercent: 1,
  spoken,
});

const Play: React.FC = () => {
  const [spoken, setSpoken] = React.useState<Spoken>([]);
  const [computerWord, setComputerWord] = React.useState<string | null>(null);
  const [playerWord, setPlayerWord] = React.useState<string | null>(null);

  const test = useCallback(
    (value: string) => {
      const answer = playGame({ ...configuration(spoken), value });

      if (answer.found) {
        Promise.resolve(1)
          .then(() => setPlayerWord(null))
          .then(() => setComputerWord(answer.response));
      } else {
        console.log(answer.response);
      }
    },
    [spoken],
  );

  const Computer = (value: string) => {
    setTimeout(() => {
      // eslint-disable-next-line jest/valid-title
      test(value);
    }, 2002);
  };

  useEffect(() => {
    if (computerWord || playerWord) {
      const item = playerWord ?? computerWord;

      if (item) {
        setSpoken(spoken.concat({ item, id: uniqueId() }));
      }
    }
  }, [computerWord, playerWord]);

  useEffect(() => {
    if (playerWord) {
      Computer(playerWord);
    }
  }, [playerWord]);

  console.log('spoken', spoken);

  const onEnter = useCallback(
    (value) => {
      Promise.resolve(1)
        .then(() => setComputerWord(null))
        .then(() => setPlayerWord(value));
    },
    [spoken],
  );

  return (
    <div className="play">
      <div className="list">
        <List data={spoken} empty="Yet, there is no word said." />
      </div>
      <h1>{computerWord ?? playerWord}</h1>
      <InputText onEnter={onEnter} placeholder="Enter a word and press enter." />
    </div>
  );
};

export default Play;
