import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Anime } from '../../types';
import styles from '../../styles/AnimePage.module.scss';

interface AnimeProps {
  anime: Anime;
}
export default function AnimePage({ anime }: AnimeProps) {
  return (
    <section className={styles.section}>
      <div className={styles.headerCard}>
        <Image
          src={anime.images.webp.image_url}
          alt={anime.title}
          width={120}
          height={120}
        />
        <div className={styles.infoCard}>
          <h2>{anime.title}</h2>
          <p>Rating: {anime.rating}</p>
          <p>Season: {anime.season}</p>
          <p>Year: {anime.year}</p>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.synopsis}>
        <h3>Synopsis:</h3>
        <p>{anime.synopsis}</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.trailer}>
        <h3>Trailer:</h3>
        <iframe
          width='320'
          height='220'
          src={anime.trailer.embed_url}
          title='Youtube Player'
          allowFullScreen
        />
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let id;
  if (context.params) {
    id = context.params.id;
  }
  const URI = process.env.API_URL as string;
  const res = await fetch(`${URI}/${id}`);
  const mainData = await res.json();
  return {
    props: {
      anime: mainData.data,
    },
  };
};
