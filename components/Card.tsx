import styles from '../styles/Card.module.scss';
import { Anime } from '../types';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  anime: Anime;
}

export default function Card({ anime }: CardProps) {
  const businessRule = (score: number) => {
    if (score >= 1 && score <= 4) {
      return 'I do not recommend it';
    }
    if (score >= 5 && score <= 7) {
      return 'You may have fun';
    }
    if (score > 7) {
      return 'Great, this is one of the best anime';
    }
  };

  return (
    <Link href={`anime/${anime.mal_id}`} className={styles.card}>
      <Image
        src={anime.images.webp.image_url}
        alt={anime.title}
        width={175}
        height={175}
        className={styles.img}
      />
      <div className={styles.title}>
        <h3>{anime.title}</h3>
        <div className={styles.divider} />
        <p>{businessRule(anime.score)}</p>
      </div>
    </Link>
  );
}
