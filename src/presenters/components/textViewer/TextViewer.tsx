import React, { memo } from 'react';
import './style.scss';

interface IWordViewer {
  word: string;
  prefix?: string;
}

const TextViewer: React.FC<IWordViewer> = ({ prefix, word }) => {
  if (!word) {
    return (
      <>
        <h3>{prefix}</h3>
        <h1 className="title">...</h1>
      </>
    );
  }
  return (
    <>
      <h3>{prefix}</h3>
      <h1 className="title">{word.toUpperCase()}</h1>
    </>
  );
};

export default memo(TextViewer);
