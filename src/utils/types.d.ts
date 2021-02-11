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

export type IWordGetter = {
  [key: string]: { seekWord(): IResult; waitForWord(getWord: () => void): void };
};

export interface IList {
  gameData: TGame;
  players: TPlayers;
}

export interface IWordList {
  data: string[] | [];
  empty: string;
  title: string;
}

export type ITimer = {
  onTimeIsUp: () => void;
};

export interface ITextViewer {
  text: string | undefined;
  prefix?: string;
  className?: string;
  size?: 'large' | 'medium' | 'small';
  type?: 'danger' | 'info';
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

export type TWordGetter = {
  word: string;
  words: string[];
  preferences: TPreferences;
};

export type TAIPlayers = {
  response: IPlayerResult;
  play: () => void;
};

export type TAIPlay = {
  response: IPlayerResult;
  play: () => void;
};

export type TUseWord = {
  saveWord: (response: IResult) => void;
  wordResponse: TWordResult | undefined;
};

export type TUsePlayer = {
  player: {
    play: () => void;
    nextPlayer: () => void;
  };
  addWord: (value: IPlayerResult) => void;
  lastAction: IPlayerResult | undefined;
};

export type TGamePlay = {
  lostMessage: string;
  addWord: (value: IPlayerResult) => void;
  currentPlayerType: string | null;
};
