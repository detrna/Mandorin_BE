import prisma from "../lib/prisma.js";

export const transactionRepo = {
  findByItemId: async (id) =>
    await prisma.transactions.findUnique({ where: { proposal_id: id } }),
  findById: async (id) =>
    await prisma.transactions.findUnique({ where: { id: id } }),
  create: async (data) => await prisma.transactions.create({ data }),
  update: async (data) =>
    await prisma.transactions.update({ where: { id: data.id }, data }),
};
