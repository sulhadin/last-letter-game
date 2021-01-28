import React, { memo, useEffect, useState } from 'react';
import SpeechToText from '../../../controllers/SpeechToText';
import { PlayerEnum } from '../../../libs/Players';
import { IInput } from '../../../libs/interfaces';
import mute from '../../../assets/mute.png';
import unmute from '../../../assets/unmute.png';

const speechToText = SpeechToText('tr');

// eslint-disable-next-line no-shadow
enum MicrophoneEnum {
  Mute,
  Unmute,
}

const microphone = {
  [MicrophoneEnum.Mute]: mute,
  [MicrophoneEnum.Unmute]: unmute,
};

const InputVoice: React.FC<IInput> = ({ callback, placeholder, player }) => {
  const [state, setState] = useState<MicrophoneEnum>(MicrophoneEnum.Unmute);

  const listenResult = (e: CustomEvent): void => {
    callback(e.detail.result);
  };
  const listenStop = (): void => {
    setState(MicrophoneEnum.Mute);
  };

  useEffect(() => {
    if (player === PlayerEnum.Player) {
      speechToText.start();
      setState(MicrophoneEnum.Unmute);
    }
    document.addEventListener('speechStopEvent', listenStop as EventListener);
    document.addEventListener('speechResultEvent', listenResult as EventListener);
    return () => {
      document.removeEventListener('speechStopEvent', listenStop as EventListener);
      document.removeEventListener('speechResultEvent', listenResult as EventListener);
    };
  }, [player]);

  const onClick = () => {
    if (state === MicrophoneEnum.Mute) {
      speechToText.start();
      setState(MicrophoneEnum.Unmute);
    } else {
      speechToText.stop();
      setState(MicrophoneEnum.Mute);
    }
  };

  return (
    <div className="input-voice">
      <img src={microphone[state]} key={state} width={100} alt="mute" onClick={onClick} />
      <div>{placeholder}</div>
    </div>
  );
};

export default memo(InputVoice);
