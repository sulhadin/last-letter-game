import React, { useCallback, useEffect } from 'react';
import InputText from '../../components/InputText';
import List from '../../components/List';
import playGame from '../../libs/playGame';
import './play.scss';
import { IPayload } from '../../libs/interfaces';
import { Spoken } from '../../libs/types';
import uniqueId from '../../libs/uniqueId';
import delay from '../../libs/delay';

const configuration = (spoken: Spoken): IPayload => ({
  value: '',
  charLength: 1,
  computerFromStart: true,
  playerFromStart: false,
  probabilityPercent: 1,
  spoken,
});
const synth = window.speechSynthesis;

const Play: React.FC = () => {
  const [spoken, setSpoken] = React.useState<Spoken>([]);
  const [computerWord, setComputerWord] = React.useState<string | null>(null);
  const [playerWord, setPlayerWord] = React.useState<string | null>(null);

  const Computer = (value: string) => {
    delay(() => {
      setSpoken((data) => {
        const answer = playGame({ ...configuration(data), value });

        if (answer.found) {
          setPlayerWord(null);
          setComputerWord(answer.response);
        } else {
          console.log(answer.response);
        }
        return data;
      });
    }, [100, 3000]);
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
  useEffect(() => {
    if (computerWord) {
      const utterThis = new SpeechSynthesisUtterance(computerWord);
      synth.speak(utterThis);
    }
  }, [computerWord]);

  console.log('spoken', spoken);

  const onEnter = useCallback(
    (value) => {
      setComputerWord(null);
      setPlayerWord(value);
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
