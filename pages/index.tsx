import { IconSearch } from '@tabler/icons';
import { useState } from 'react';
import styles from '../styles/Home.module.scss';
import { GetServerSideProps } from 'next';
import { Anime } from '../types';
import Card from '../components/Card';

interface HomePageProps {
  animes: Anime[];
}

export default function Home({ animes }: HomePageProps) {
  const [querySearch, setQuerySearch] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type='text'
          placeholder='Type an anime name'
          name='search'
          id='search'
          value={querySearch}
          onChange={(e) => setQuerySearch(e.target.value)}
        />
        <button type='submit'>
          <IconSearch />
        </button>
      </form>
      <div className={styles.list}>
        {animes.map((anime) => (
          <Card anime={anime} key={anime.mal_id} />
        ))}
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const URI = process.env.API_URL as string;
  const res = await fetch(URI);
  const data = await res.json();
  return {
    props: {
      animes: data.data,
    },
  };
};
