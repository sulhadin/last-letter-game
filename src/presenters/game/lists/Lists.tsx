import React, { memo } from 'react';
import { IList } from '../../../utils/types';
import WordList from '../../components/list/WordList';
import { getPlayerType } from '../../../controllers/playerController';
import './style.scss';

const Lists: React.FC<IList> = ({ gameData, players }) => (
  <div className="lists">
    {Object.entries(gameData).map(([player, words]) => (
      <WordList
        key={player}
        data={words}
        empty="Word list is empty"
        title={`${getPlayerType(player, players)} word list`}
      />
    ))}
  </div>
);

export default memo(Lists);
