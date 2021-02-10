import React from 'react';

import InputText from '../../../components/inputText/InputText';
import InputVoice from '../../../components/inputVoice/InputVoice';
import { IInput } from '../../../../utils/types';

/**
 * Takes string input type as a parameter and returns object map of text and voice input components.
 *
 * More then one input can be added to map.
 *
 * @implements React.FC<IInput>
 * @param {string} - Component type
 * @return {React.FC<IInput>} - Returns an object of inputs.
 * @see [Text]{@link InputText}, [Voice]{@link InputVoice}
 * @example
 *      const Input = InputComponent['TEXT'];
 *
 *      // Component to return.
 *      <Input onNewWord={someFunc} placeholder={'some placeholder'} disabled={true} />
 */
const InputComponent: { [key: string]: React.FC<IInput> } = {
  TEXT: InputText,
  VOICE: InputVoice,
};

export default InputComponent;
