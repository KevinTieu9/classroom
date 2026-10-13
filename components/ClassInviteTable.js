/*
 * ClassInviteTable.js
 * Classroom UI — list of classrooms with invite and delete actions
 *
 * Author: Kevin Tieu
 *
 * Displays classrooms and provides copy-invite and delete controls for the owner.
 */

import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClassInviteTable({ classroom_list }) {
  const router = useRouter();

  const copy_invite_link = async classroom_id => {
    const invite_url = `${window.location.origin}/join/${classroom_id}`;
    try {
      await navigator.clipboard.writeText(invite_url);
      toast.success('Invite link copied to clipboard');
    } catch {
      toast.error('Unable to copy invite link');
    }
  };

  const delete_classroom = async classroom_id => {
    if (!confirm('Delete this classroom?')) {
      return;
    }

    try {
      const response = await fetch('/api/deleteclass', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classroomId: classroom_id })
      });

      if (response.ok) {
        toast.success('Classroom deleted');
        setTimeout(() => router.reload(), 1500);
      } else {
        toast.error('Unable to delete classroom');
      }
    } catch {
      toast.error('Unable to delete classroom');
    }
  };

  if (!classroom_list || classroom_list.length === 0) {
    return <p>No classrooms found.</p>;
  }

  return (
    <div>
      {classroom_list.map(classroom_record => (
        <div key={classroom_record.classroomId} className='border p-3 mb-2'>
          <h3>{classroom_record.classroomName}</h3>
          <p>{classroom_record.description}</p>
          <button
            onClick={() => copy_invite_link(classroom_record.classroomId)}
            className='mr-2'
          >
            Copy invite link
          </button>
          <button onClick={() => delete_classroom(classroom_record.classroomId)}>
            Delete
          </button>
          <Link href={`/dashboard/${classroom_record.classroomId}`}>
            <a> Open dashboard</a>
          </Link>
        </div>
      ))}
    </div>
  );
}
