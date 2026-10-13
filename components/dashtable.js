/*
 * dashtable.js
 * Classroom UI — student progress table
 *
 * Author: Kevin Tieu
 *
 * Builds rows of student progress against selected certifications.
 */

import DataTable from 'react-data-table-component';

function compute_intersection_size(challenge_set, completed_set) {
  let shared_count = 0;
  for (const challenge_id of challenge_set) {
    if (completed_set.has(challenge_id)) {
      shared_count += 1;
    }
  }
  return shared_count;
}

export default function DashTable({ column_definitions, student_progress }) {
  if (!student_progress || !column_definitions) {
    return <p>No progress data available.</p>;
  }

  const table_rows = [];

  Object.entries(student_progress).forEach(([row_index, progress_entry]) => {
    if (!progress_entry) {
      return;
    }

    const student_name = Object.keys(progress_entry)[0];
    const completed_challenges = new Set(progress_entry[student_name] || []);

    const row_record = {
      id: Number(row_index) + 1,
      'student-name': student_name
    };

    column_definitions.forEach(column_definition => {
      if (column_definition.selector === 'student-name') {
        return;
      }
      const challenge_set = new Set(column_definition.allChallenges || []);
      const completed_count = compute_intersection_size(challenge_set, completed_challenges);
      row_record[column_definition.selector] = `${completed_count}/${challenge_set.size}`;
    });

    table_rows.push(row_record);
  });

  return <DataTable columns={column_definitions} data={table_rows} pagination />;
}
