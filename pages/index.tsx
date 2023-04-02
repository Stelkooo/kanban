import Head from 'next/head';

import { Plus_Jakarta_Sans } from 'next/font/google';

import data from '@/public/data/data.json';

import Header from './components/header/header.component';
import Main from './sections/main/main.component';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Kanban</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${plusJakartaSans.className} grid h-screen grid-rows-[min-content_1fr] overflow-hidden`}
      >
        <Header />
        <Main />
      </div>
    </>
  );
}
