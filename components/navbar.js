/*
 * navbar.js
 * Classroom UI — top navigation bar
 *
 * Author: Kevin Tieu
 *
 * Renders the site header with logo and authentication controls.
 */

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthButton from '../components/authButton';

export default function Navbar({ children }) {
  return (
    <div className='h-[38px]'>
      <div className='h-[38px] bg-[#0a0a23] text-white flex items-center flex-wrap p-1'>
        <div className='hidden lg:flex block flex-1 justify-end'></div>
        <Link href='/classes'>
          <a className='flex items-center'>
            <Image
              className=''
              priority
              layout='fixed'
              src='/images/fcc_primary_large.png'
              alt='FreeCodecamp Logo'
              width={210}
              height={24}
            ></Image>
          </a>
        </Link>
        <div className='flex-1 inline-flex justify-end'>
          {React.Children.toArray(children).length > 1 ? (
            children.map(child_element => (
              <div className='pl-2 hidden md:block' key={child_element}>
                <p>{child_element}</p>
              </div>
            ))
          ) : (
            <div className='pl-2 hidden md:block'>{children}</div>
          )}
          <div className='pl-2'>
            <AuthButton></AuthButton>
          </div>
        </div>
      </div>
    </div>
  );
}
