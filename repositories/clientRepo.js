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
    await prisma.clients.findUnique({ where: { user_id: data } }),
  findByEmail: async (data) =>
    await prisma.clients.findUnique({ where: { email: data } }),
};
