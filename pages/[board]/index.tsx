import Head from 'next/head';
import { useRouter } from 'next/router';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { boardApi } from '@/store/api/api.store';
import Header from '@/src/sections/header/header.component';
import Main from '@/src/sections/main/main.component';
import Sidebar from '@/src/sections/sidebar/sidebar.component';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function Board() {
  const router = useRouter();

  // fetch board data
  const { data, isLoading, isSuccess } = boardApi.useGetBoardQuery(
    router.query.board as string
  );

  return (
    <>
      <Head>
        <title>{data ? data.name : 'Kanban'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${plusJakartaSans.className} grid h-screen grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] overflow-hidden`}
      >
        {isLoading && <h1>Loading...</h1>}
        {isSuccess && (
          <>
            <Sidebar />
            <Header board={data} />
            <Main board={data} />
          </>
        )}
      </div>
    </>
  );
}
