import prisma from "../lib/prisma.js";

export const projectRepo = {
  create: async (data) => await prisma.projects.create({ data }),
  findAllByUID: async (id, pagination) =>
    await prisma.$transaction([
      prisma.projects.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: { OR: [{ client_id: id }, { foreman_id: id }] },
        include: {
          clients: { include: { users: { omit: { password: true } } } },
          foreman: { include: { users: { omit: { password: true } } } },
        },
      }),
      prisma.projects.count({ where: { id: id } }),
    ]),
  findById: async (id) =>
    await prisma.projects.findUnique({
      include: { milestones: true },
      where: { id: id },
    }),
  update: async (data) =>
    await prisma.projects.update({ where: { id: data.id }, data }),
};
