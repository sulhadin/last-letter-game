import React, { memo } from 'react';

import { IList } from './types';
import './style.scss';

const WordList: React.FC<IList> = ({ data, title, empty }) => {
  if (!data.length) {
    return <p>{empty}</p>;
  }

  return (
    <div className="list-area">
      <div className="list-title">
        <h3>{title}</h3>
      </div>
      {data.reverse().map((item) => (
        <div key={item} className="text">
          {item}
        </div>
      ))}
    </div>
  );
};

export default memo(WordList);
