import prisma from "../lib/prisma.js";

export const proposalRepo = {
  findAllByUID: async (uid, pagination) =>
    await prisma.proposals.findMany({
      take: pagination.limit,
      skip: pagination.offset,
      where: { OR: [{ client_id: uid }, { foreman_id: uid }] },
    }),
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
      where: { foreman_id: data.foreman_id },
      data,
    }),
};
