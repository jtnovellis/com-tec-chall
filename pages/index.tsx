import { IconSearch } from '@tabler/icons';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import { GetServerSideProps } from 'next';
import { Anime, Pagination } from '../types';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Link from 'next/link';

interface HomePageProps {
  animes: Anime[];
  pagination: Pagination;
}

type AnimesByQuery = Anime[] | [];

export default function Home({ animes, pagination }: HomePageProps) {
  const [anuimesToRender, setAnimesToRender] = useState(animes);
  const [page, setPage] = useState(1);
  const [querySearch, setQuerySearch] = useState('');
  const [animesByQuery, setAnimesByQuery] = useState<AnimesByQuery>([]);
  const [error, setError] = useState(false);
  const [hasNext, setHasNext] = useState(pagination.has_next_page);
  const [loading, setLoading] = useState(false);
  const URI = process.env.NEXT_PUBLIC_API_URL as string;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${URI}?q=${querySearch}`);
      const queryAnimes = await res.json();
      setAnimesByQuery(queryAnimes.data);
      setPage(queryAnimes.pagination.current_page);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasNext) {
      if (animesByQuery.length > 0) {
        (async () => {
          try {
            setLoading(true);
            const res = await fetch(`${URI}?q=${querySearch}&page=${page}`);
            const queryAnimes = await res.json();
            setAnimesByQuery(queryAnimes.data);
            setHasNext(queryAnimes.pagination.has_next_page);
          } catch {
            setError(true);
          } finally {
            setLoading(false);
          }
        })();
      } else {
        (async () => {
          try {
            setLoading(true);
            const res = await fetch(`${URI}?page=${page}`);
            const newAnimes = await res.json();
            setAnimesToRender(newAnimes.data);
            setHasNext(newAnimes.pagination.has_next_page);
          } catch {
            setError(true);
          } finally {
            setLoading(false);
          }
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, hasNext]);

  const increment = async () => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  };
  const decrement = async () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (error)
    return (
      <p>
        Ups... Error! <Link href={'/'}>Go home</Link> and try again
      </p>
    );
  if (loading) return <Loader />;

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
        {animesByQuery.length > 0
          ? animesByQuery.map((anime) => (
              <Card anime={anime} key={anime.mal_id} />
            ))
          : anuimesToRender.map((anime) => (
              <Card anime={anime} key={anime.mal_id} />
            ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={decrement}>-</button>
        <p>{page}</p>
        <button onClick={increment}>+</button>
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
      pagination: data.pagination,
    },
  };
};
