import React, { memo, useContext, useEffect, useMemo } from 'react';
import InputText from '../../components/InputText/InputText';
import InputVoice from '../../components/InputVoice/InputVoice';
import { AppContext } from '../../../context/reducers';
import { IInput } from '../../../libs/interfaces';

const InputWord: React.FC<IInput> = ({ onNewWord, placeholder }) => {
  const { state } = useContext(AppContext);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  useEffect(() => {
    setDisabled(state.currentPlayer !== state.currentUser);
  }, [state.currentPlayer]);

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

export default memo(InputWord);
