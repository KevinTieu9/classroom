/*
 * layout.js
 * Classroom UI — basic page layout wrapper
 *
 * Author: Kevin Tieu
 *
 * Provides a consistent wrapper for page content.
 */

export default function Layout({ children }) {
  return <div className='min-h-screen'>{children}</div>;
}
