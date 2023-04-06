import Head from 'next/head';
import { useRouter } from 'next/router';

import { Plus_Jakarta_Sans } from 'next/font/google';

import boardApi from '@/store/api/api.store';

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
        {isLoading && <h1>Loading</h1>}
      </div>
    </>
  );
}
