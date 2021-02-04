import React, { memo, useEffect, useMemo, useState } from 'react';
import SpeechToText from '../../../controllers/speechToText';
import { IInput } from '../../../libs/types';
import mute from '../../../assets/mute.png';
import unmute from '../../../assets/unmute.png';
import useSpeechListener from '../../../hooks/useSpeechListener';

// eslint-disable-next-line no-shadow
enum MicEnum {
  Mute,
  Unmute,
}

const microphone = {
  [MicEnum.Mute]: mute,
  [MicEnum.Unmute]: unmute,
};

const InputVoice: React.FC<IInput> = ({ onNewWord, placeholder, disabled }) => {
  const [muteState, setMuteState] = useState<MicEnum>(MicEnum.Unmute);
  const [speech, speechStopped] = useSpeechListener(true);

  const speechToText = useMemo(() => SpeechToText('tr'), []);

  const micState = (isMute: boolean): void => {
    if (isMute) {
      speechToText.start();
      setMuteState(MicEnum.Unmute);
    } else {
      speechToText.stop();
      setMuteState(MicEnum.Mute);
    }
  };

  useEffect(() => {
    if (speechStopped && speech) {
      onNewWord(speech);
    }
    if (speechStopped) {
      setMuteState(MicEnum.Mute);
    }
  }, [speech, speechStopped]);

  useEffect(() => {
    micState(!disabled);
  }, [disabled]);

  const toggleMic = () => {
    micState(muteState === MicEnum.Mute);
  };

  return (
    <div className="input-voice">
      <img src={microphone[muteState]} key={muteState} width={100} alt="mute" onClick={toggleMic} />
      <div>{placeholder}</div>
    </div>
  );
};

export default memo(InputVoice);
