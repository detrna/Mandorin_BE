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
  findAll: async (pagination) => {
    const [data, count] = await prisma.$transaction([
      prisma.clients.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        omit: { user_id: true },
        include: {
          users: { omit: { password: true } },
        },
      }),
      prisma.clients.count(),
    ]);
    return { data, count };
  },
  findByEmail: async (data) =>
    await prisma.clients.findUnique({ where: { email: data } }),
  findByName: async (query, pagination) => {
    const [data, count] = await prisma.$transaction([
      prisma.clients.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        omit: { user_id: true },
        include: {
          users: {
            omit: { password: true },
          },
        },
        where: { users: { name: { contains: query } } },
      }),
      prisma.clients.count({
        where: { users: { name: { contains: query } } },
      }),
    ]);
    return { data, count };
  },
};
