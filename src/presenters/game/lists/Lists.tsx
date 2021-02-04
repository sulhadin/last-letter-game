import React, { memo } from 'react';
import { TGame, TPlayers } from '../../../libs/types';
import List from '../../components/list/List';
import './style.scss';
import playerType from '../../../libs/playerType';

interface IList {
  gameData: TGame;
  players: TPlayers;
}

const Lists: React.FC<IList> = ({ gameData, players }) => (
  <div className="lists">
    {Object.entries(gameData).map(([key, value]) => (
      <List
        key={key}
        data={value}
        empty="Word list is empty"
        title={`${playerType(key, players)} word list`}
      />
    ))}
  </div>
);

export default memo(Lists);
