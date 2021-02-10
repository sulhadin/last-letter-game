import React, { memo } from 'react';

import { ITextViewer } from './types';
import './style.scss';

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
