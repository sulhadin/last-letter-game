import React, { memo, useContext } from 'react';

import GameContext from '../../../context/GameContext';
import InputComponent from './components/InputComponent';
import { IInput } from '../../../utils/types';

const Inputs: React.FC<IInput> = ({ onNewWord, placeholder, disabled }) => {
  const { state } = useContext(GameContext);
  const Input = InputComponent[state.preferences.inputType];

  return <Input onNewWord={onNewWord} placeholder={placeholder} disabled={disabled} />;
};

export default memo(Inputs);
