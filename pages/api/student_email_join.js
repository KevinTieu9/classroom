/*
 * student_email_join.js
 * Classroom API — student joins a classroom by code
 *
 * Author: Kevin Tieu
 *
 * Adds the authenticated user to a classroom if they are not already a member.
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

  const request_data = request.body;
  const join_code = request_data.join && request_data.join[0];

  if (!join_code) {
    return response.status(400).end();
  }

  const current_user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      id: true,
      role: true
    }
  });

  if (!current_user) {
    return response.status(403).end();
  }

  const classroom_record = await prisma.classroom.findUnique({
    where: {
      classroomId: join_code
    },
    select: {
      fccUserIds: true
    }
  });

  if (!classroom_record) {
    return response.status(404).end();
  }

  const already_member = classroom_record.fccUserIds.includes(current_user.id);
  if (already_member) {
    return response.status(409).end();
  }

  if (current_user.role === 'NONE') {
    await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        role: 'STUDENT'
      }
    });
  }

  await prisma.classroom.update({
    where: {
      classroomId: join_code
    },
    data: {
      fccUserIds: { push: current_user.id }
    }
  });

  return response.status(200).end();
}
