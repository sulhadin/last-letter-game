import { TPlayer, TPlayers } from '../../libs/types';

const getNextPlayer = (currentPlayer: TPlayer, players: TPlayers): string => {
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

export default getNextPlayer;
