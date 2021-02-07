import React, { memo } from 'react';
import './style.scss';

interface ITextViewer {
  text: string | undefined;
  prefix?: string;
  className?: string;
  size?: 'large' | 'medium' | 'small';
  type?: 'danger' | 'info';
}

const TextViewer: React.FC<ITextViewer> = ({ prefix, text, type = 'info', size = 'medium' }) => {
  if (!text) {
    return <></>;
  }

  return (
    <>
      <p className={`word-viewer-prefix ${type}  ${size}`}>{prefix}</p>
      <p className={`word-viewer-word-viewer-title ${type}  ${size}`}>{text.toUpperCase()}</p>
    </>
  );
};

export default memo(TextViewer);
