import prisma from "../lib/prisma.js";

export const projectRepo = {
  create: async (data) => await prisma.projects.create({ data }),
  findAllByUID: async (id) =>
    await prisma.$transaction([
      prisma.projects.findMany({
        where: { OR: [{ client_id: id }, { foreman_id: id }] },
        include: {
          clients: { include: { users: { omit: { password: true } } } },
        },
        include: {
          foreman: { include: { users: { omit: { password: true } } } },
        },
      }),
      prisma.projects.count({ where: { id: id } }),
    ]),
  findById: async (id) =>
    await prisma.projects.findFirst({ where: { id: id } }),
};
