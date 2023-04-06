'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';

import { Plus_Jakarta_Sans } from 'next/font/google';

import data from '@/public/data/data.json';

import Header from './components/header/header.component';
import Main from './sections/main/main.component';
import Sidebar from './sections/sidebar/sidebar.component';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function Home() {
  const [board, setBoard] = useState({});

  useEffect(() => {
    const boardInitData = data.boards.find((item) => item.id === 1);
    if (boardInitData) {
      setBoard(boardInitData);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Kanban</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${plusJakartaSans.className} grid h-screen grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] overflow-hidden`}
      >
        <Sidebar boards={data.boards} currentBoard={board} />
        <Header />
        <Main board={board} />
      </div>
    </>
  );
}
