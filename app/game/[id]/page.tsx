'use client';
import styles from './Game.module.scss';
import { Canvas, PaintCoords } from '@/app/components/Canvas';
import { Socket, io } from 'socket.io-client';
import React from 'react';

export default function Game() {
  const socketRef = React.useRef<Socket>();

  React.useEffect(() => {
    socketRef.current = io('http://localhost:5555');

    socketRef.current.on('paint', (data) => {
      console.log(data);
    });
  }, []);
  const onPaint = (data: PaintCoords) => {
    if (socketRef.current) {
      socketRef.current.emit('paint', data);
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.game}>
        <div className={styles.chat}>
          <div className={styles.title}>Чат</div>
          <div className={styles.messages}>
            <div className={styles.message}>
              <b className={styles.name}>Николай</b>
              <p className={styles.text}>Привет</p>
            </div>
          </div>
          <div className={styles.input}>
            <input type="text" className={styles.field} />
            <button className={styles.send}>Отправить</button>
          </div>
        </div>

        <div className={styles.canvas}>
          <Canvas onPaint={onPaint} />
        </div>
      </div>
    </main>
  );
}
