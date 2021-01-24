import React, { memo } from 'react';

interface IInputText {
  onEnter: (value: string) => void;
  placeholder: string;
}

const InputText: React.FC<IInputText> = ({ onEnter, placeholder }) => {
  const [inputValue, setValue] = React.useState('');

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onEnter(inputValue);
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
      />
    </div>
  );
};

export default memo(InputText);
