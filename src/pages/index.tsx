import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Dắn Hương nè</title>
      </Head>
      <div className={inter.className}>COMING SOON</div>
    </>
  );
}
