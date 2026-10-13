/*
 * _app.js
 * Classroom page
 *
 * Author: Kevin Tieu
 */

import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
