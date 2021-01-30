import React, { memo, useEffect, useMemo, useState } from 'react';
import SpeechToText from '../../../controllers/SpeechToText';
import { PlayerEnum } from '../../../libs/Players';
import { IInput } from '../../../libs/interfaces';
import mute from '../../../assets/mute.png';
import unmute from '../../../assets/unmute.png';
import useSpeechListener from '../hooks/useSpeechListener';

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
  const [muteState, setMuteState] = useState<MicrophoneEnum>(MicrophoneEnum.Unmute);
  const [speech, speechStopped] = useSpeechListener(true);

  const speechToText = useMemo(() => SpeechToText('tr'), []);

  const startStopSpeechRecognition = (isStart: boolean): void => {
    if (isStart) {
      speechToText.start();
      setMuteState(MicrophoneEnum.Unmute);
    } else {
      speechToText.stop();
      setMuteState(MicrophoneEnum.Mute);
    }
  };

  const changePlayTurnMap = useMemo(
    () => ({
      [PlayerEnum.Player]: () => {
        startStopSpeechRecognition(true);
      },
      [PlayerEnum.Computer]: () => {
        startStopSpeechRecognition(false);
      },
    }),
    [startStopSpeechRecognition],
  );

  const changeSpeechStateMap = useMemo(
    () => ({
      [MicrophoneEnum.Mute]: () => {
        startStopSpeechRecognition(true);
      },
      [MicrophoneEnum.Unmute]: () => {
        speechToText.stop();
        startStopSpeechRecognition(false);
      },
    }),
    [],
  );

  useEffect(() => {
    if (speechStopped && speech) {
      console.log('speech', speech);
      callback(speech);
    }
    if (speechStopped) {
      setMuteState(MicrophoneEnum.Mute);
    }
  }, [speech, speechStopped]);

  useEffect(() => {
    changePlayTurnMap[player]();
  }, [player]);

  const onClick = () => {
    changeSpeechStateMap[muteState]();
  };

  return (
    <div className="input-voice">
      <img src={microphone[muteState]} key={muteState} width={100} alt="mute" onClick={onClick} />
      <div>{placeholder}</div>
    </div>
  );
};

export default memo(InputVoice);
