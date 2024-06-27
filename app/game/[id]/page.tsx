'use client';
import styles from './Game.module.scss';
import { Canvas, PaintCoords } from '@/app/components/Canvas';
import { Socket, io } from 'socket.io-client';
import React from 'react';

type TMessages = {
  name: string;
  text: string;
};

export default function Game() {
  const socketRef = React.useRef<Socket>();
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D>();
  const [messages, setMessages] = React.useState<TMessages[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    socketRef.current = io('http://localhost:5555');

    socketRef.current.on('get_message', (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });

    socketRef.current.on('clear_canvas', () => {
      if (canvasCtxRef.current) {
        canvasCtxRef.current?.clearRect(0, 0, 1000, 600);
      }
    });

    socketRef.current.on('repaint', ({ x, y, dx, dy }) => {
      if (canvasCtxRef.current) {
        console.log(x);

        canvasCtxRef.current.beginPath();
        canvasCtxRef.current.moveTo(x, y);
        canvasCtxRef.current.lineTo(x - dx, y - dy);
        canvasCtxRef.current.stroke();
        canvasCtxRef.current.closePath();
      }
    });
    return () => {
      if (socketRef.current) {
        socketRef.current?.disconnect();
      }
    };
  }, []);
  const onPaint = (data: PaintCoords) => {
    if (socketRef.current) {
      socketRef.current.emit('paint', data);
    }
  };
  const onClear = () => {
    if (socketRef.current) {
      socketRef.current.emit('clear');
    }
  };

  const onClickSend = () => {
    if (socketRef.current) {
      socketRef.current.emit('send_message', {
        name: 'Nikolai',
        text: inputValue,
      });
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.game}>
        <div className={styles.chat}>
          <div className={styles.title}>Чат</div>
          <div className={styles.messages}>
            {messages.map((obj, i) => (
              <div className={styles.message}>
                <b className={styles.name}>{obj.name}</b>
                <p className={styles.text}>{obj.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.input}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              className={styles.field}
            />
            <button onClick={onClickSend} className={styles.send}>
              Отправить
            </button>
          </div>
        </div>

        <div className={styles.canvas}>
          <Canvas
            onPaint={onPaint}
            onInit={(canvasCtx) => (canvasCtxRef.current = canvasCtx)}
            onClear={onClear}
          />
        </div>
      </div>
    </main>
  );
}
