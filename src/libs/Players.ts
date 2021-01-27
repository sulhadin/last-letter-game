// eslint-disable-next-line no-shadow
enum PlayerEnum {
  Player,
  Computer,
}

const defaultPlayer: PlayerEnum = PlayerEnum.Player;

const nextPlayer = (player: PlayerEnum): PlayerEnum => {
  switch (player) {
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
