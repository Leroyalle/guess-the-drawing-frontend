import Image from 'next/image';
import styles from './Home.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Guess The Drawing</h1>
        <p className={styles.subtitle}>
          Сыграй с друзьями! <br /> Догадаются ли они о чем ты думаешь?
        </p>
        <Link href="/game/1" className={styles.startGameButton}>
          Создать игру
        </Link>
      </div>
    </main>
  );
}
