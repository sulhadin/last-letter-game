import React, { memo, useEffect } from 'react';
import { IInput } from '../../libs/interfaces';
import { PlayerEnum } from '../../libs/Players';

const InputText: React.FC<IInput> = ({ callback, placeholder, player }) => {
  const [inputValue, setValue] = React.useState<string>('');
  const [wait, setWait] = React.useState<boolean>(false);

  useEffect(() => {
    const shouldWait = player !== PlayerEnum.Player;
    setWait(shouldWait);
  }, [player]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      callback(inputValue);
      setValue('');
    }
  };

  return (
    <div className="">
      <input
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={onKeyDown}
        placeholder={placeholder}
        disabled={wait}
      />
    </div>
  );
};

export default memo(InputText);
