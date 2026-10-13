/*
 * modal.js
 * Classroom UI — create classroom modal
 *
 * Author: Kevin Tieu
 *
 * Provides a form for teachers to create a new classroom.
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import { MultiSelect } from 'react-multi-select-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Modal({ user_id, certification_names }) {
  const router = useRouter();
  const [modal_is_open, set_modal_is_open] = useState(false);
  const [selected_certifications, set_selected_certifications] = useState([]);
  const [classroom_name, set_classroom_name] = useState('');
  const [classroom_description, set_classroom_description] = useState('');

  const open_modal = () => set_modal_is_open(true);
  const close_modal = () => set_modal_is_open(false);

  const save_classroom = async event => {
    event.preventDefault();
    close_modal();

    const certification_ids = selected_certifications.map(item => item.value).sort();

    const payload = {
      className: classroom_name,
      description: classroom_description,
      classroomTeacherId: user_id,
      fccCertifications: certification_ids
    };

    try {
      const response = await fetch('/api/create_class_teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success('Classroom created');
        setTimeout(() => router.reload(), 1500);
      } else {
        toast.error('Unable to create classroom');
      }
    } catch {
      toast.error('Unable to create classroom');
    }
  };

  const certification_options = (certification_names || []).map(name => ({
    label: name,
    value: name
  }));

  return (
    <>
      <div className='flex justify-center'>
        <button
          type='button'
          className='p-4 m-6 rounded-md hover:bg-[#f1be32] border-2 bg-[#feac32] text-black'
          onClick={open_modal}
        >
          Create Class
        </button>
      </div>

      {modal_is_open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-[#0a0a23] py-12 px-24 border-4 border-sky-500 rounded-xl text-white'>
            <h2 className='text-lg mb-4 text-center'>Create Class</h2>
            <form onSubmit={save_classroom} className='space-y-4'>
              <div>
                <label htmlFor='classroom-name'>Class Name</label>
                <input
                  id='classroom-name'
                  required
                  value={classroom_name}
                  onChange={event => set_classroom_name(event.target.value)}
                  className='block w-full text-black'
                />
              </div>
              <div>
                <label htmlFor='classroom-description'>Description</label>
                <textarea
                  id='classroom-description'
                  value={classroom_description}
                  onChange={event => set_classroom_description(event.target.value)}
                  className='block w-full text-black'
                />
              </div>
              <div>
                <label>Certifications</label>
                <MultiSelect
                  options={certification_options}
                  value={selected_certifications}
                  onChange={set_selected_certifications}
                  labelledBy='Select certifications'
                />
              </div>
              <div className='flex justify-end gap-2'>
                <button type='button' onClick={close_modal}>
                  Cancel
                </button>
                <button type='submit'>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
