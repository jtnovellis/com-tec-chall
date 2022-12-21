import styles from '../styles/Error.module.scss';
import Link from 'next/link';

export default function Error() {
  return (
    <div className={styles.error}>
      <p>
        Ups... Error! <Link href={'/'}>Go home</Link> and try again
      </p>
    </div>
  );
}
