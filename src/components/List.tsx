import React, { useRef, useEffect } from 'react';

type IData = {
  item: string;
};

interface IList {
  data: IData[];
  empty: string;
}

const List: React.FC<IList> = ({ data, empty }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  if (!data.length) {
    return <p>{empty}</p>;
  }

  return (
    <>
      {data.reverse().map(({ item }) => (
        <p key={item}>{item}</p>
      ))}
      <div ref={messagesEndRef}> </div>
    </>
  );
};

export default List;
