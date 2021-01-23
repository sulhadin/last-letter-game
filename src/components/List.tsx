import React from 'react';

type IData = {
  item: string;
};

interface IList {
  data: IData[];
  empty: string;
}

const List: React.FC<IList> = ({ data, empty }) => {
  if (!data.length) {
    return <p>{empty}</p>;
  }
  return (
    <div className="">
      {data.reverse().map(({ item }) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
};

export default List;
