import styles from '../styles/Card.module.scss';
import { Anime } from '../types';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  anime: Anime;
}

export default function Card({ anime }: CardProps) {
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
      </div>
    </Link>
  );
}
