import prisma from "../lib/prisma.js";

export const reportRepo = {
  create: async (data) => await prisma.reports.create({ data }),
  findById: async (id) =>
    await prisma.reports.findUnique({ where: { id: id } }),
  findAllByProject: async (id, pagination) =>
    await prisma.$transaction([
      prisma.reports.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: { project_id: id },
      }),
      prisma.reports.count({
        where: { project_id: id },
      }),
    ]),
  delete: async (id) => {
    await prisma.reports.delete({ where: { id: id } });
  },
};
