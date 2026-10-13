/*
 * prisma.js
 * Prisma helper — shared client instance
 *
 * Author: Kevin Tieu
 *
 * Exports a single Prisma client for the application.
 */

import { PrismaClient } from '@prisma/client';

const global_for_prisma = global;

export const prisma =
  global_for_prisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  });

if (process.env.NODE_ENV !== 'production') {
  global_for_prisma.prisma = prisma;
}

export default prisma;
