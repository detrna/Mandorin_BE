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
  findAll: async () =>
    await prisma.clients.findMany({
      omit: { user_id: true },
      include: { users: { omit: { password: true } } },
    }),
  findByEmail: async (data) =>
    await prisma.clients.findUnique({ where: { email: data } }),
};
