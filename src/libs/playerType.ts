import { TPlayer, TPlayers } from './types';

const playerType = (player: TPlayer, players: TPlayers): string | null => {
  if (!player) {
    return null;
  }

  return players[player];
};

const playerTypeCheck = (player: TPlayer, players: TPlayers, type: string): boolean => {
  return playerType(player, players) === type;
};

export { playerTypeCheck };
export default playerType;
