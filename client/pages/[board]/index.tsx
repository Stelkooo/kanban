import Head from 'next/head';
import { useRouter } from 'next/router';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { BeatLoader } from 'react-spinners';

import { boardApi } from '@/store/api/api.store';

import Header from '@/src/sections/header/header.component';
import Main from '@/src/sections/main/main.component';
import Sidebar from '@/src/sections/sidebar/sidebar.component';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function Board() {
  const router = useRouter();

  // fetch board data
  const { data, isLoading, isSuccess } = boardApi.useGetBoardQuery(
    router.query.board as string,
    { skip: router.query.board === undefined }
  );
  return (
    <>
      <Head>
        <title>{data ? data.name : 'Kanban'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {isLoading && (
          <div className="flex h-screen items-center justify-center">
            <BeatLoader size={32} color="white" aria-label="Loading Spinner" />
          </div>
        )}
        {isSuccess && (
          <div
            className={`${plusJakartaSans.className} grid h-screen grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] overflow-hidden`}
          >
            <Sidebar />
            <Header board={data} />
            <Main />
          </div>
        )}
      </>
    </>
  );
}
