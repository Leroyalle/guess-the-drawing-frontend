import Image from 'next/image';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Guess The Drawing</h1>
        <p className={styles.subtitle}>
          Сыграй с друзьями! <br /> Догадаются ли они о чем ты думаешь?
        </p>
        <button className={styles.startGameButton}>Создать игру</button>
      </div>
    </main>
  );
}
