import React, { memo } from 'react';
import { Spoken } from '../../../libs/types';
import './style.scss';

interface IList {
  data: Spoken;
  empty: string;
}

const List: React.FC<IList> = ({ data, empty }) => {
  if (!data.length) {
    return <p>{empty}</p>;
  }

  return (
    <div className="list-area">
      <div>
        {data.reverse().map(({ id, item }, i) => (
          <div key={id} className={`text ${i % 2 === 0 ? 'R' : 'L'}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(List);
