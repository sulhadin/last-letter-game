const playerComputer = 'Computer';

const nextPlayer = (
  currentPlayer: string | null,
  players: { [player: string]: string },
): string => {
  const keys = Object.keys(players);

  console.log({ currentPlayer, players, first: keys[0] });

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

export { nextPlayer, playerComputer };
