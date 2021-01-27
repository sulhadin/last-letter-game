import React, { memo } from 'react';
import InputText from './InputText';
import InputVoice from './InputVoice';
import { PlayerEnum } from '../../libs/Players';

interface IInputText {
  callback(value: string): void;
  placeholder: string;
  player: PlayerEnum;
}

const InputWord: React.FC<IInputText> = ({ callback, placeholder, player }) => {
  return (
    <div className="">
      <InputText onEnter={callback} placeholder={placeholder} />
      <InputVoice callback={callback} placeholder={placeholder} player={player} />
    </div>
  );
};

export default memo(InputWord);
