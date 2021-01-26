import React, { useRef, useEffect, memo } from 'react';
import { Spoken } from '../libs/types';

interface IList {
  data: Spoken;
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
      {data.reverse().map(({ id, item }) => (
        <p key={id}>{item}</p>
      ))}
      <div ref={messagesEndRef}> </div>
    </>
  );
};

export default memo(List);
