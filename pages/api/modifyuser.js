/*
 * modifyuser.js
 * Classroom API — update user details (admin only)
 *
 * Author: Kevin Tieu
 *
 * Allows an administrator to change a user's name, email, or role.
 */

import prisma from '../../prisma/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handle(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (request.method !== 'POST') {
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
      role: true
    }
  });

  if (!current_user || current_user.role !== 'ADMIN') {
    return response.status(403).end();
  }

  const request_data = request.body;
  const target_user_id = request_data.id;

  if (!target_user_id) {
    return response.status(400).end();
  }

  const update_payload = {};
  if (request_data.name && request_data.name.length > 0) {
    update_payload.name = request_data.name;
  }
  if (request_data.email && request_data.email.length > 0) {
    update_payload.email = request_data.email;
  }
  if (request_data.role && request_data.role.length > 0) {
    update_payload.role = request_data.role;
  }

  if (Object.keys(update_payload).length === 0) {
    return response.status(304).end();
  }

  await prisma.user.update({
    where: { id: target_user_id },
    data: update_payload
  });

  return response.status(200).end();
}
