// interfaces

export interface IResult {
  response: string;
  found: boolean;
}
export interface IPlayerResult extends IResult {
  played: boolean;
}

export interface IPayload {
  letters: string;
  words?: string[];
}

export interface IInput {
  onNewWord(value?: IPlayerResult): void;
  placeholder: string;
  disabled?: boolean;
}

export interface IGamePreferences {
  setStartGame: (value: boolean) => void;
}

// types

export type TPreferences = {
  charLength: number;
  letterFromEnd: boolean; // Also can get letters from beginning to make the game more interesting.
  probabilityPercent: number;
  restricted: boolean;
  inputType: 'TEXT' | 'VOICE';
};

export type TGamePreferencesState = TPreferences & {
  timer: TTimer;
};

export type TPlayer = string | undefined;

export type TPlayers = { [key: string]: string };

export type TGame = { [player: string]: string[] };

export type TTimer = {
  timeIsUp: boolean;
  second: number;
  active: boolean;
};

export type TPlayerType = {
  [key: string]: string;
};

export type TWordResult = {
  result: string;
  valid?: boolean;
  invalid?: boolean;
};
