import React, { memo, useEffect, useMemo, useState } from 'react';

import useSpeechListener from '../../../hooks/useSpeechListener';
import SpeechToText from '../../../utils/speechToText';
import { MicEnum } from '../../../utils/enums';
import { IInput } from '../../../utils/types';

import mute from '../../../assets/mute.png';
import unmute from '../../../assets/unmute.png';

const microphone = {
  [MicEnum.Mute]: mute,
  [MicEnum.Unmute]: unmute,
};

const InputVoice: React.FC<IInput> = ({ onNewWord, placeholder, disabled }) => {
  const [muteState, setMuteState] = useState<MicEnum>(MicEnum.Unmute);
  const [speech, speechStopped, resetSpeech] = useSpeechListener(true);

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
      onNewWord({
        played: true,
        found: true,
        response: speech,
      });
      resetSpeech();
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
      <img
        className="input-voice-toggle"
        src={microphone[muteState]}
        key={muteState}
        width={100}
        alt="mute"
        onClick={toggleMic}
      />
      <div className="input-voice-placeholder">{placeholder}</div>
    </div>
  );
};

export default memo(InputVoice);
