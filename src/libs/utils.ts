import { TGame } from './types';

const getWords = (gameMap: TGame): string[] => {
  return Object.values(gameMap).flat();
};

export { getWords };
