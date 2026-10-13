/*
 * index.js
 * Classroom page — teacher classroom list
 *
 * Author: Kevin Tieu
 *
 * Lists classrooms owned by the authenticated teacher and provides creation controls.
 */

import prisma from '../../prisma/prisma';
import ClassInviteTable from '../../components/ClassInviteTable';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import { getSession } from 'next-auth/react';
import Modal from '../../components/modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function getServerSideProps(context) {
  const user_session = await getSession(context);
  if (!user_session) {
    return { redirect: { destination: '/', permanent: false } };
  }

  const current_user = await prisma.user.findUnique({
    where: { email: user_session.user.email },
    select: { id: true, role: true }
  });

  if (!current_user) {
    return { redirect: { destination: '/', permanent: false } };
  }

  if (current_user.role === 'ADMIN') {
    return { redirect: { destination: '/admin', permanent: false } };
  }

  if (current_user.role !== 'TEACHER') {
    return { redirect: { destination: '/error', permanent: false } };
  }

  const classroom_records = await prisma.classroom.findMany({
    where: { classroomTeacherId: current_user.id }
  });

  const classroom_list = classroom_records.map(classroom_record => ({
    classroomName: classroom_record.classroomName,
    classroomId: classroom_record.classroomId,
    description: classroom_record.description,
    createdAt: classroom_record.createdAt ? classroom_record.createdAt.toISOString() : null
  }));

  return {
    props: {
      classroom_list,
      teacher_id: current_user.id
    }
  };
}

export default function ClassesPage({ classroom_list, teacher_id }) {
  return (
    <>
      <Head>
        <title>Classrooms</title>
      </Head>
      <Navbar />
      <main className='p-6'>
        <h1>Your Classrooms</h1>
        <Modal user_id={teacher_id} certification_names={[]} />
        <ClassInviteTable classroom_list={classroom_list} />
        <ToastContainer />
      </main>
    </>
  );
}
