import Link from 'next/link';
import styles from '../styles/Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <h1>ANIMES</h1>
      </Link>
    </header>
  );
}
