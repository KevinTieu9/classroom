/*
 * index.js
 * Classroom page — landing page
 *
 * Author: Kevin Tieu
 *
 * Public landing page with navigation to classrooms.
 */

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Classroom</title>
        <meta name='description' content='Classroom mode for freeCodeCamp' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar>
        <div className='border-solid border-2 pl-4 pr-4'>
          <Link href='/classes'>Classes</Link>
        </div>
      </Navbar>
      <div className={styles.boxx}>
        <h1 className='text-[40px] text-center underline'>
          Welcome to Classroom Mode
        </h1>
      </div>
      <div className='p-6 ml-20 mr-20'>
        <p className='box-content bg-[#d0d0d5] p-4 border-4 border-[#0a0a23] text-xl'>
          Sign in to manage or join classrooms.
        </p>
      </div>
    </div>
  );
}
