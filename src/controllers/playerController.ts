import { TPlayer, TPlayers } from '../utils/types';
import { AIPlayerType } from '../utils/enums';

export const getPlayer = (player: TPlayer, players: TPlayers): string => {
  if (!player) {
    return AIPlayerType.AUTO_PLAYER;
  }

  return players[player];
};

export const probability = (n: number): boolean => {
  return !!n && Math.random() <= n;
};

export const getNextPlayer = (currentPlayer: TPlayer, players: TPlayers): string => {
  const keys = Object.keys(players);

  if (!currentPlayer) {
    return keys[0];
  }
  const currentIndex = keys.findIndex((player) => player === currentPlayer);

  const nextItem = keys[currentIndex + 1];

  if (nextItem) {
    return nextItem;
  }

  return keys[0];
};
