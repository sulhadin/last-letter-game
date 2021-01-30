// eslint-disable-next-line no-shadow
enum PlayerEnum {
  Player,
  Computer,
}

const defaultPlayer: PlayerEnum = PlayerEnum.Player;

const nextPlayer = (currentPlayer: PlayerEnum): PlayerEnum => {
  switch (currentPlayer) {
    case PlayerEnum.Computer: {
      return PlayerEnum.Player;
    }
    case PlayerEnum.Player: {
      return PlayerEnum.Computer;
    }
    default:
      return defaultPlayer;
  }
};

export { PlayerEnum, nextPlayer, defaultPlayer };
