import Image from 'next/image';
import styles from './Game.module.scss';

export default function Game() {
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
          <div id="paint" />
        </div>
      </div>
    </main>
  );
}
