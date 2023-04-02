import Head from 'next/head';

import { Plus_Jakarta_Sans } from 'next/font/google';

import Header from './components/header/header.component';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Kanban</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={plusJakartaSans.className}>
        <Header />
        <main />
      </div>
    </>
  );
}
