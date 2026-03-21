import prisma from "../lib/prisma.js";

export const proposalRepo = {
  findAllByUID: async (uid, pagination) =>
    await prisma.$transaction([
      prisma.proposals.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: { OR: [{ client_id: uid }, { foreman_id: uid }] },
      }),
      prisma.appointments.count({
        where: { OR: [{ client_id: uid }, { foreman_id: uid }] },
      }),
    ]),
  findById: async (id) =>
    await prisma.proposals.findUnique({
      where: { id: id },
    }),
  create: async (data) =>
    await prisma.proposals.create({
      data,
    }),
  update: async (data) =>
    await prisma.proposals.update({
      where: {
        id: data.id,
      },
      data,
    }),
  delete: async (data) =>
    await prisma.proposals.delete({ where: { id: data.id } }),
};
