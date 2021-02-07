import React, { memo, useContext, useMemo } from 'react';
import InputText from '../../components/inputText/InputText';
import InputVoice from '../../components/inputVoice/InputVoice';
import GameContext from '../../../context/GameContext';
import { IInput } from '../../../libs/types';

const Inputs: React.FC<IInput> = ({ onNewWord, placeholder, disabled }) => {
  const { state } = useContext(GameContext);

  const InputComponent = useMemo(
    () => ({
      TEXT: () => {
        return <InputText onNewWord={onNewWord} placeholder={placeholder} disabled={disabled} />;
      },
      VOICE: () => {
        return <InputVoice onNewWord={onNewWord} placeholder={placeholder} disabled={disabled} />;
      },
    }),
    [onNewWord, placeholder, disabled],
  );

  return InputComponent[state.preferences.inputType]();
};

export default memo(Inputs);
