import React, { memo } from 'react';
import './style.scss';

interface IWordViewer {
  word: string;
  prefix?: string;
}

const WordViewer: React.FC<IWordViewer> = ({ prefix, word }) => {
  if (!word) {
    return <h1 className="title"> There is not any word said. </h1>;
  }
  return (
    <>
      <h3>{prefix}</h3>
      <h1 className="title">{word.toUpperCase()}</h1>
    </>
  );
};

export default memo(WordViewer);
