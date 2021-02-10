import { TPlayerType } from './types';

// TPlayerType preferred to keep player types as a enum to get benefit of string type.
export const AIPlayerType: TPlayerType = {
  COMPUTER: 'COMPUTER',
  AUTO_PLAYER: 'AUTO_PLAYER',
};

// Because of enum structure - after passing through babel - MicEnum is defined at the upper scope.
// ESLint: 'MicEnum' is already declared in the upper scope(no-shadow)
// eslint-disable-next-line no-shadow
export enum MicEnum {
  Mute,
  Unmute,
}
