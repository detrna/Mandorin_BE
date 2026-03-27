import prisma from "../lib/prisma.js";

export const milestoneRepo = {
  create: async (data) => await prisma.milestones.createMany({ data }),
  findAllByProject: async (id, pagination) =>
    await prisma.$transaction([
      prisma.milestones.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: { project_id: id },
      }),
      prisma.milestones.count({ where: { project_id: id } }),
    ]),
  findById: async (id) =>
    await prisma.milestones.findFirst({ where: { id: id } }),
  update: async (data) =>
    await prisma.milestones.update({ where: { id: data.id } }, data),
};
