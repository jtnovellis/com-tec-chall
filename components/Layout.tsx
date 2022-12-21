import Head from 'next/head';
import Header from './Header';
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Technical Challenge</title>
        <meta
          name='description'
          content='Thid is a technical challenge by comfama'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
}
