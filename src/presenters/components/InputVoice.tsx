import React, { memo, useEffect } from 'react';
import { SpeechToText } from '../../controllers/SpeechToText';
import names from '../../libs/data/names.json';
import { PlayerEnum } from '../../libs/Players';

interface IInputText {
  callback: (value: string) => void;
  placeholder: string;
  player: PlayerEnum;
}
const colors = [
  'aqua',
  'azure',
  'beige',
  'bisque',
  'black',
  'blue',
  'brown',
  'chocolate',
  'coral',
  'crimson',
  'cyan',
  'fuchsia',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lime',
  'linen',
  'magenta',
  'maroon',
  'moccasin',
  'navy',
  'olive',
  'orange',
  'orchid',
  'peru',
  'pink',
  'plum',
  'purple',
  'red',
  'salmon',
  'sienna',
  'silver',
  'snow',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'white',
  'yellow',
];

const start = SpeechToText('tr');

const InputVoice: React.FC<IInputText> = ({ callback, placeholder, player }) => {
  const listen = (e) => {
    callback(e.detail.result);
  };

  useEffect(() => {
    if (player === PlayerEnum.Player) {
      console.log('my turn');

      start();
    }
    document.addEventListener('speechEvent', listen);
    return () => {
      document.removeEventListener('speechEvent', listen);
    };
  }, [player]);

  return <div className="">{placeholder}</div>;
};

export default memo(InputVoice);
