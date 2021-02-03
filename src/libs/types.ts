// interfaces

export interface IResult {
  response: string;
  found: boolean;
}

export interface IPayload {
  letters: string;
  spoken?: string[];
}

export interface IInput {
  onNewWord(value?: string): void;
  placeholder: string;
  disabled?: boolean;
}

// types
export type TPreferences = {
  charLength: number;
  letterFromEnd: boolean; // Also can get letters from beginning to make the game more interesting.
  probabilityPercent: number;
  restricted: boolean;
  inputType: 'TEXT' | 'VOICE';
};

export type TPlayer = string | undefined;

export type TPlayers = { [key: string]: string };

export type TGame = { [player: string]: string[] };
