import prisma from "../lib/prisma.js";

export const jwtRepo = {
  create: async (user, token) =>
    await prisma.jwt.create({
      data: {
        id: token.id,
        token: token.value,
        user_id: user.id,
      },
    }),

  rotate: async (user, token) =>
    await prisma.$transaction([
      prisma.jwt.delete({ where: { id: token.old } }),
      prisma.jwt.create({
        data: { id: token.new.id, token: token.new.value, user_id: user.id },
      }),
    ]),

  delete: async (id) => {
    await prisma.jwt.delete({ where: { id: id } });
  },
  findById: async (id) => await prisma.jwt.findUnique({ where: { id: id } }),
};
