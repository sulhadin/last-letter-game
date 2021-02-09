import { TPlayer, TPlayers } from '../utils/types';
import { AIPlayerType } from '../utils/enums';

/**
 * Gets type of given player. Gets 'AUTO_PLAYER' if player is not specified.
 *
 * @param {TPlayer} player - Current player.
 * @param {TPlayers} players - Object player map that contains player types as values.
 * @return {string} - Returns player type COMPUTER | AUTO_PLAYER | HUMAN.
 * @example
 *
 *    const players = {player1: 'COMPUTER', player2: 'HUMAN'};
 *
 *    getPlayerType('player1', players)
 *    // => 'COMPUTER'
 *
 *    getPlayerType(undefined, players)
 *    // => 'AUTO_PLAYER'
 */
export const getPlayerType = (player: TPlayer, players: TPlayers): string => {
  if (!player) {
    return AIPlayerType.AUTO_PLAYER;
  }

  return players[player];
};

/**
 * Calculates probability up to given 'n' number and returns whether it suits the condition or not.
 *
 * Probability is between 0 and 1, so always returns true if 'n' is 1 and returns false if 'n' is 0.
 *
 * @param {number} n - A value between 0 and 1.
 * @return {boolean} - Returns true or false.
 * @example
 *
 *    probability(1)
 *    // => true
 *
 *    probability(0)
 *    // => false
 *
 *    probability(0.3)
 *    // => true | false up to 30%.
 */
export const probability = (n: number): boolean => {
  return !!n && Math.random() <= n;
};

/**
 * Switches between players in 'players' array.
 *
 * Gets next player in the 'players' array.
 * Gets first player if 'currentPlayer' is not specified
 * Gets first player if 'currentPlayer' is the last player.
 *
 * @param {TPlayer} currentPlayer
 * @param {TPlayers} players
 * @example
 *
 *    const players = {player1: '..', player2: '..', 'player3': '..'};
 *
 *    getNextPlayer('player1', players);
 *    // => 'player2'
 *
 *    getNextPlayer('player2', players);
 *    // => 'player3'
 *
 *    getNextPlayer('player3', players);
 *    // => 'player1'
 *
 *    getNextPlayer(undefined, players);
 *    // => 'player1'
 */
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
