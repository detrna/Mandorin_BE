import prisma from "../lib/prisma.js";

export const clientRepo = {
  create: async (userData, clientData) =>
    await prisma.users.create({
      data: {
        ...userData,
        clients: {
          create: clientData,
        },
      },
      include: {
        clients: true,
      },
    }),
  findById: async (data) =>
    await prisma.clients.findUnique({
      where: { user_id: data },
      include: { users: { omit: { password: true } } },
    }),
  findAll: async (query, pagination) =>
    await prisma.users.findMany({
      take: pagination.limit,
      skip: pagination.offset,
      omit: { password: true },
      where: {
        name: {
          contains: query,
        },
      },
      include: {
        clients: {
          omit: { user_id: true },
        },
      },
    }),
  findByEmail: async (data) =>
    await prisma.clients.findUnique({ where: { email: data } }),
};
