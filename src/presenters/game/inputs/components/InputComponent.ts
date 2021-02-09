import React from 'react';

import InputText from '../../../components/inputText/InputText';
import InputVoice from '../../../components/inputVoice/InputVoice';
import { IInput } from '../../../../utils/types';

const InputComponent: { [key: string]: React.FC<IInput> } = {
  TEXT: InputText,
  VOICE: InputVoice,
};

export default InputComponent;
