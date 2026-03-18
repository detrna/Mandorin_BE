import prisma from "../lib/prisma.js";

export const foremanRepo = {
  create: async (userData, foremanData) =>
    await prisma.users.create({
      data: {
        ...userData,
        foreman: { create: foremanData },
      },
      include: {
        foreman: true,
      },
    }),
  findById: async (id) =>
    await prisma.foreman.findUnique({
      where: { user_id: id },
      include: { users: { omit: { password: true } } },
    }),
  findAll: async (pagination) => {
    const [data, count] = await prisma.$transaction([
      prisma.users.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        omit: { password: true },
        include: { foreman: { omit: { user_id: true } } },
      }),
      prisma.foreman.count(),
    ]);
    return { data, count };
  },

  findByEmail: async (data) =>
    await prisma.foreman.findUnique({ where: { email: data } }),
  updateData: async (userData, foremanData, id) =>
    await prisma.users.update({
      where: { id: id },
      data: {
        ...userData,
        foreman: {
          upsert: {
            create: { ...foremanData },
            update: { ...foremanData },
          },
        },
      },
      include: { foreman: true },
    }),
  findByName: async (query, pagination) => {
    const [data, count] = await prisma.$transaction([
      prisma.users.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        omit: { password: true },
        where: {
          name: {
            contains: query,
          },
        },
        include: {
          foreman: {
            omit: { user_id: true },
          },
        },
      }),
      prisma.foreman.count({
        where: { users: { name: { contains: query } } },
      }),
    ]);
    return { data, count };
  },
};
