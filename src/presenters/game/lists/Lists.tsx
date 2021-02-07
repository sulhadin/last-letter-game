import React, { memo } from 'react';
import { TGame, TPlayers } from '../../../libs/types';
import WordList from '../../components/list/WordList';
import './style.scss';
import getPlayer from '../../../libs/getPlayer';

interface IList {
  gameData: TGame;
  players: TPlayers;
}

const Lists: React.FC<IList> = ({ gameData, players }) => (
  <div className="lists">
    {Object.entries(gameData).map(([player, words]) => (
      <WordList
        key={player}
        data={words}
        empty="Word list is empty"
        title={`${getPlayer(player, players)} word list`}
      />
    ))}
  </div>
);

export default memo(Lists);
