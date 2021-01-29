import React, { memo, useEffect } from 'react';
import { IInput } from '../../../libs/interfaces';
import { PlayerEnum } from '../../../libs/Players';
import './style.scss';

const InputText: React.FC<IInput> = ({ callback, placeholder, player }) => {
  const [inputValue, setValue] = React.useState<string>('');
  const [wait, setWait] = React.useState<boolean>(false);

  useEffect(() => {
    const shouldWait = player !== PlayerEnum.Player;
    setWait(shouldWait);
  }, [player]);

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      callback(inputValue);
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
        disabled={wait}
      />
    </div>
  );
};

export default memo(InputText);
