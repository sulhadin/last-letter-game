import { IPlayerResult, IResult, TWordResult } from '../utils/types';

export type TAIPlayers = {
  response: IPlayerResult;
  play: () => void;
};

export type TAIPlay = {
  response: IPlayerResult;
  play: () => void;
};

type TUseWord = {
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

type TGamePlay = {
  lostMessage: string;
  addWord: (value: IPlayerResult) => void;
  currentPlayerType: string | null;
};
