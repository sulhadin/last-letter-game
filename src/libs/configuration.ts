import { Spoken } from './types';
import { IPayload } from './interfaces';

const configuration: IPayload = {
  value: '',
  charLength: 1,
  computerFromStart: true,
  playerFromStart: false,
  probabilityPercent: 1,
  spoken: [] as Spoken,
};

export default configuration;
