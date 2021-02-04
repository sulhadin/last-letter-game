import React, { memo } from 'react';
import './style.scss';

interface IWordViewer {
  word: string | undefined;
  prefix?: string;
  className?: string;
  size?: string;
}

const TextViewer: React.FC<IWordViewer> = ({ prefix, word, className, size }) => {
  if (!word) {
    return <></>;
  }

  if (size === 'small') {
    return (
      <>
        <h4>{prefix}</h4>
        <h2 className={className}>{word.toUpperCase()}</h2>
      </>
    );
  }

  return (
    <>
      <h3>{prefix}</h3>
      <h1 className={className}>{word.toUpperCase()}</h1>
    </>
  );
};

export default memo(TextViewer);
