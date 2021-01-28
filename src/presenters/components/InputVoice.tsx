import React, { memo, useEffect } from 'react';
import { SpeechToText } from '../../controllers/SpeechToText';
import { PlayerEnum } from '../../libs/Players';
import { IInput } from '../../libs/interfaces';

const start = SpeechToText('tr');

const InputVoice: React.FC<IInput> = ({ callback, placeholder, player }) => {
  const listen = (e: CustomEvent): void => {
    callback(e.detail.result);
  };

  useEffect(() => {
    if (player === PlayerEnum.Player) {
      start();
    }
    document.addEventListener('speechEvent', listen as EventListener);
    return () => {
      document.removeEventListener('speechEvent', listen as EventListener);
    };
  }, [player]);

  return <div className="">{placeholder}</div>;
};

export default memo(InputVoice);
