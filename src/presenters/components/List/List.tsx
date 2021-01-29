import React, { memo } from 'react';
import { Spoken } from '../../../libs/types';
import './style.scss';

interface IList {
  data: Spoken;
  empty: string;
  title: string;
}

const List: React.FC<IList> = ({ data, title, empty }) => {
  if (!data.length) {
    return <p>{empty}</p>;
  }

  return (
    <div className="list-area">
      <h3>{title}</h3>
      {data.reverse().map(({ id, item }, i) => (
        <div key={id} className={`text ${i % 2 === 0 ? 'R' : 'L'}`}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default memo(List);
