import React, { memo } from 'react';
import { IInput } from '../../../libs/interfaces';
import './style.scss';

const InputText: React.FC<IInput> = ({ onNewWord, placeholder, disabled }) => {
  const [inputValue, setValue] = React.useState<string>('');

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onNewWord(inputValue);
      setValue('');
    }
  };

  return (
    <div className="form-group">
      <span>Say it!</span>
      <input
        ref={(inputRef) => inputRef && inputRef.focus()}
        className="text-field"
        type="text"
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default memo(InputText);
