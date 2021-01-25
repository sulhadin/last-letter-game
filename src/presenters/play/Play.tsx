import React, { useCallback, useMemo } from 'react';
import InputText from '../../components/InputText';
import List from '../../components/List';
import playGame from '../../libs/playGame';
import './play.scss';
import { IPayload } from '../../libs/interfaces';
import { Dialog } from '../../libs/types';

const Play: React.FC = () => {
  const [dialog, setDialog] = React.useState<Dialog>({ Player: [], Computer: [] });

  const conf = useMemo<IPayload>(
    () => ({
      value: '',
      charLength: 1,
      computerFromStart: true,
      playerFromStart: false,
      probabilityPercent: 1,
      spoken: [...dialog.Computer, ...dialog.Player],
    }),
    [dialog],
  );

  const Player = (value: string) => {
    setDialog((data) => ({
      Computer: data.Computer,
      Player: data.Player.concat({ item: value }),
    }));
  };

  const Computer = (value: string) => {
    const answer = playGame({ ...conf, value });

    setDialog((data) => ({
      Computer: data.Computer.concat({ item: answer.response }),
      Player: data.Player,
    }));
  };

  const onEnter = useCallback(
    (value: string) => {
      Player(value);
      Computer(value);
    },
    [dialog],
  );

  return (
    <div className="play">
      <div className="list">
        <List data={dialog.Player} empty="Yet, there is no word said." />
        <List data={dialog.Computer} empty="Yet, there is no word said." />
      </div>
      <InputText onEnter={onEnter} placeholder="Enter a word and press enter." />
    </div>
  );
};

export default Play;
