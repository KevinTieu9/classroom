/*
 * create_class_teacher.js
 * Classroom API — create a classroom as a teacher
 *
 * Author: Kevin Tieu
 *
 * Creates a new classroom record for the authenticated teacher or admin.
 */

import prisma from '../../prisma/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handle(request, response) {
  const session = await getServerSession(request, response, authOptions);
  let current_user;

  if (request.method !== 'POST') {
    return response.status(405).end();
  }

  if (!session) {
    return response.status(403).end();
  }

  try {
    current_user = await prisma.user.findUniqueOrThrow({
      where: {
        email: session.user.email
      },
      select: {
        role: true,
        id: true
      }
    });
  } catch {
    return response.status(403).end();
  }

  // Teacher or admin only
  if (current_user.role !== 'TEACHER' && current_user.role !== 'ADMIN') {
    return response.status(403).end();
  }

  const request_data = JSON.parse(request.body);

  // Teachers may only create classrooms for themselves
  if (current_user.role === 'TEACHER' && current_user.id !== request_data['classroomTeacherId']) {
    return response.status(403).end();
  }

  const created_classroom = await prisma.classroom.create({
    data: {
      classroomName: request_data['className'],
      description: request_data['description'],
      classroomTeacherId: request_data['classroomTeacherId'],
      fccCertifications: request_data['fccCertifications']
    }
  });

  return response.status(200).json(created_classroom);
}
