'use client';
import React from 'react';
import styles from './Canvas.module.scss';

export type PaintCoords = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

type TCanvas = {
  onPaint: (data: PaintCoords) => void;
};

export const Canvas: React.FC<TCanvas> = ({ onPaint }) => {
  const rootRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (rootRef.current) {
      const canvas = document.getElementById('canvas');
      const ctx = rootRef.current.getContext('2d');
      if (ctx) {
        rootRef.current.width = 1000;
        rootRef.current.height = 600;
        ctx.lineCap = 'round';
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'black';

        //   ctx.clearRect(0, 0, canvas.width, canvas.height);

        rootRef.current.addEventListener('mousemove', (e) => {
          const x = e.offsetX;
          const y = e.offsetY;
          const dx = e.movementX;
          const dy = e.movementY;

          if (e.buttons > 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - dx, y - dy);
            ctx.stroke();
            ctx.closePath();
            onPaint({ x, y, dy, dx });
          }
        });
      }
    }
  }, []);

  return <canvas ref={rootRef} className={styles.canvas} />;
};
