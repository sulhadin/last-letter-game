import { TPlayer, TPlayers } from './types';
import { AIPlayerType } from './enums';

// TODO: Fix here.
/**
 * {
 *   '987486346': {type:'AI', name:'Computex'},
 *   '009348662': {type:'human', name:'Sulhadin'}
 * }
 * @param player
 * @param players
 */
const getPlayer = (player: TPlayer, players: TPlayers): string => {
  if (!player) {
    return AIPlayerType.AUTO_PLAYER;
  }

  return players[player];
};

const playerTypeCheck = (player: TPlayer, players: TPlayers, type: string): boolean => {
  return getPlayer(player, players) === type;
};

const isPlayerAI = (player: TPlayer, players: TPlayers): boolean => {
  return Object.values(AIPlayerType).includes(getPlayer(player, players));
};

export { playerTypeCheck, isPlayerAI };
export default getPlayer;
