/*
 * dashtabs.js
 * Classroom UI — certification tabs for the dashboard
 *
 * Author: Kevin Tieu
 *
 * Renders tabs of certification modules and the associated progress table.
 */

import DashTable from './dashtable';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useState } from 'react';

export default function DashTabs({ certification_names, student_progress, column_sets }) {
  const [selected_tab_index, set_selected_tab_index] = useState(0);
  const selected_certification = certification_names[selected_tab_index] || '';

  if (!certification_names || certification_names.length === 0) {
    return <p>No certifications configured.</p>;
  }

  return (
    <Tabs selectedIndex={selected_tab_index} onSelect={set_selected_tab_index}>
      <TabList>
        {certification_names.map((certification_name, tab_index) => (
          <Tab key={tab_index}>{certification_name}</Tab>
        ))}
      </TabList>
      {certification_names.map((certification_name, tab_index) => (
        <TabPanel key={tab_index}>
          <DashTable
            column_definitions={column_sets[certification_name] || []}
            student_progress={student_progress}
          />
        </TabPanel>
      ))}
    </Tabs>
  );
}
