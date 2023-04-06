/* eslint-disable react/jsx-props-no-spreading */
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { ApiProvider } from '@reduxjs/toolkit/query/react';
import boardApi from '@/store/api/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApiProvider api={boardApi}>
      <Component {...pageProps} />
    </ApiProvider>
  );
}
