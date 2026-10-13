/*
 * updateUserForm.js
 * Classroom UI — administrator form to edit a user
 *
 * Author: Kevin Tieu
 *
 * Submits name, email, and role changes for a selected user.
 */

import { useRouter } from 'next/router';

export default function UpdateUserForm({ user_info }) {
  const router = useRouter();

  const handle_submit = async event => {
    event.preventDefault();

    const form_values = {
      id: user_info.id,
      name: event.target.name.value,
      email: event.target.email.value,
      role: event.target.role.value
    };

    try {
      const response = await fetch('/api/modifyuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form_values)
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        console.error('Update failed', response.status);
      }
    } catch (error) {
      console.error('Update request failed', error);
    }
  };

  const available_roles = ['ADMIN', 'STUDENT', 'TEACHER', 'NONE'];
  const current_role = user_info.role || 'NONE';

  return (
    <form onSubmit={handle_submit}>
      <label>
        Name
        <input name='name' defaultValue={user_info.name || ''} />
      </label>
      <label>
        Email
        <input name='email' defaultValue={user_info.email || ''} />
      </label>
      <label>
        Role
        <select name='role' defaultValue={current_role}>
          {available_roles.map(role_name => (
            <option key={role_name} value={role_name}>
              {role_name}
            </option>
          ))}
        </select>
      </label>
      <button type='submit'>Save changes</button>
    </form>
  );
}
