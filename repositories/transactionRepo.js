import prisma from "../lib/prisma.js";

export const transactionRepo = {
  findByItemId: async (id) =>
    await prisma.transactions.findUnique({ where: { proposal_id: id } }),
  create: async (data) => await prisma.transactions.create({ data }),
};
