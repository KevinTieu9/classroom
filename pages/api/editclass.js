/*
 * editclass.js
 * Classroom API — update classroom details
 *
 * Author: Kevin Tieu
 *
 * Allows a teacher to update the name, description, or certifications of a classroom they own.
 */

import prisma from '../../prisma/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handle(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (request.method !== 'PUT') {
    return response.status(405).end();
  }

  if (!session) {
    return response.status(403).end();
  }

  const current_user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      role: true,
      id: true
    }
  });

  if (!current_user || current_user.role !== 'TEACHER') {
    return response.status(403).end();
  }

  const request_data = request.body;
  const classroom_id = request_data.classroomId;

  if (!classroom_id) {
    return response.status(400).end();
  }

  const update_payload = {};
  if (request_data.className !== undefined && request_data.className !== '') {
    update_payload.classroomName = request_data.className;
  }
  if (request_data.description !== undefined && request_data.description !== '') {
    update_payload.description = request_data.description;
  }
  if (Array.isArray(request_data.fccCertifications) && request_data.fccCertifications.length > 0) {
    update_payload.fccCertifications = request_data.fccCertifications;
  }

  if (Object.keys(update_payload).length === 0) {
    return response.status(304).end();
  }

  // Verify ownership
  const classroom_record = await prisma.classroom.findUnique({
    where: { classroomId: classroom_id },
    select: { classroomTeacherId: true }
  });

  if (!classroom_record || classroom_record.classroomTeacherId !== current_user.id) {
    return response.status(403).end();
  }

  await prisma.classroom.update({
    where: { classroomId: classroom_id },
    data: update_payload
  });

  return response.status(200).end();
}
