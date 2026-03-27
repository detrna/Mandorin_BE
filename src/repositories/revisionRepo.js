import prisma from "../lib/prisma.js";

export const revisionRepo = {
  create: async (data) => await prisma.revisions.create({ data }),
  findById: async (id) =>
    await prisma.revisions.findUnique({ where: { id: id } }),
  findAllByProject: async (id, pagination) =>
    await prisma.$transaction([
      prisma.revisions.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: { project_id: id },
      }),
      prisma.revisions.count({
        where: { project_id: id },
      }),
    ]),
  update: async (data, params) =>
    await prisma.revisions.update({ where: { id: id } }, { data }),
};
