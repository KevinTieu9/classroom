/*
 * error.js
 * Classroom UI — simple error message
 *
 * Author: Kevin Tieu
 *
 * Displays a generic error notice.
 */

export default function ErrorMessage({ message_text }) {
  return (
    <div className='p-4 text-red-700'>
      {message_text || 'An unexpected error occurred.'}
    </div>
  );
}
