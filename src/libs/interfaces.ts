import { Spoken } from './types';

export interface IResult {
  response: string;
  found: boolean;
}

export interface IPayload {
  value: string;
  charLength: number;
  probabilityPercent: number;
  computerFromStart: boolean;
  playerFromStart: boolean;
  spoken: Spoken;
}
