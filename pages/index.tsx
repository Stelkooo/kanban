'use client';

import Head from 'next/head';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBoards } from '@/store/kanban/kanban.reducer';
import { selectBoardsIsLoading } from '@/store/kanban/kanban.selector';
// selectCurrentBoard,

import { Plus_Jakarta_Sans } from 'next/font/google';

import Header from './components/header/header.component';
import Main from './sections/main/main.component';
import Sidebar from './sections/sidebar/sidebar.component';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function Home() {
  const dispatch = useAppDispatch();
  const boardsIsLoading = useAppSelector(selectBoardsIsLoading);

  useEffect(() => {
    (async () => {
      await dispatch(fetchBoards());
    })();
  }, [dispatch]);
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
        {boardsIsLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Sidebar />
            <Header />
            <Main />
          </>
        )}
      </div>
    </>
  );
}
