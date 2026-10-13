/*
 * deleteclass.js
 * Classroom API — delete a classroom
 *
 * Author: Kevin Tieu
 *
 * Removes a classroom record if the requester is the owning teacher or an admin.
 */

import prisma from '../../prisma/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handle(request, response) {
  const session = await getServerSession(request, response, authOptions);
  let current_user;
  let classroom_record;

  if (request.method !== 'DELETE') {
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

  if (current_user.role !== 'TEACHER' && current_user.role !== 'ADMIN') {
    return response.status(403).end();
  }

  const request_data = JSON.parse(request.body);

  try {
    classroom_record = await prisma.classroom.findUniqueOrThrow({
      where: {
        classroomId: request_data['classroomId']
      }
    });
  } catch {
    return response.status(404).end();
  }

  if (current_user.role === 'TEACHER' && classroom_record.classroomTeacherId !== current_user.id) {
    return response.status(403).end();
  }

  await prisma.classroom.delete({
    where: {
      classroomId: request_data['classroomId']
    }
  });

  return response.status(200).end();
}
