/*
 * adminTable.js
 * Classroom UI — administrator user table
 *
 * Author: Kevin Tieu
 *
 * Renders a paginated table of users with links to action pages.
 */

import Link from 'next/link';
import DataTable from 'react-data-table-component';

export default function AdminTable({ user_list, column_definitions }) {
  const table_rows = (user_list || []).map(user_record => ({
    name: user_record.name,
    userEmail: user_record.email,
    role: user_record.role,
    adminActions: (
      <Link href={`/admin/actions/${user_record.id}`}>
        <a>View possible actions</a>
      </Link>
    )
  }));

  return <DataTable columns={column_definitions} data={table_rows} pagination />;
}
