/*
 * authButton.js
 * Classroom UI — authentication control
 *
 * Author: Kevin Tieu
 *
 * Shows sign-in or sign-out based on the current session.
 */

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButton() {
  const { data: session_data } = useSession();

  if (session_data) {
    return (
      <button
        className='bg-white text-black px-2 py-1 rounded text-sm'
        onClick={() => signOut()}
      >
        Sign out
      </button>
    );
  }
  return (
    <button
      className='bg-white text-black px-2 py-1 rounded text-sm'
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}
