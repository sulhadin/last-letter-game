import React, { memo } from 'react';
import InputText from './InputText';
import InputVoice from './InputVoice';
import { IInput } from '../../libs/interfaces';

const InputWord: React.FC<IInput> = ({ callback, placeholder, player }) => {
  return (
    <div className="">
      <InputText callback={callback} placeholder={placeholder} player={player} />
      <InputVoice callback={callback} placeholder={placeholder} player={player} />
    </div>
  );
};

export default memo(InputWord);
