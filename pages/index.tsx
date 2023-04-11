import Head from 'next/head';
import { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners';

import { Plus_Jakarta_Sans } from 'next/font/google';

import { boardApi } from '@/store/api/api.store';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  const { data, isLoading, isSuccess } = boardApi.useGetAllQuery();

  if (isSuccess && data.length > 0) {
    router.push(`/${data[0].id}`);
  }
  return (
    <>
      <Head>
        <title>Kanban</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${plusJakartaSans.className} grid place-content-center`}>
        {isLoading && (
          <div className="flex h-screen items-center justify-center">
            <BeatLoader size={32} color="white" aria-label="Loading Spinner" />
          </div>
        )}
      </div>
    </>
  );
}
