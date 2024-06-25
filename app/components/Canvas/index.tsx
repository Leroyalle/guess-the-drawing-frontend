import React from 'react';

import styles from './Canvas.module.scss';

export const Canvas: React.FC = () => {
  const rootRef = React.useRef(null);

  return <div ref={rootRef}></div>;
};
