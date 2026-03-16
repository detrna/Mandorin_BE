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

  rotate: async (user, token) =>
    await prisma.$transaction([
      prisma.jwt.delete({ where: { token: token.old } }),
      prisma.jwt.create({ data: { token: token.new, user_id: user.id } }),
    ]),
};
