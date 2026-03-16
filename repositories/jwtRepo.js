import prisma from "../lib/prisma.js";

export const jwtRepo = {
  create: async (user, token) =>
    await prisma.jwt.create({
      data: {
        token,
        user_id: user.id,
      },
    }),

  findByUserId: async (user) =>
    await prisma.jwt.findUnique({
      where: {
        user_id: user.id,
      },
    }),
};
