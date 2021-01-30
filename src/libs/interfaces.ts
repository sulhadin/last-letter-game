import { Spoken } from './types';
import { PlayerEnum } from './Players';

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

export interface IInput {
  callback(value?: string): void;
  placeholder: string;
  player: PlayerEnum;
}
