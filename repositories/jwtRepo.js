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

  rotate: async (user, oldToken, newToken, jti) => {
    return await prisma.$transaction([
      prisma.jwt.delete({ where: { id: oldToken.id } }),
      prisma.jwt.create({
        data: { id: jti, token: newToken, user_id: user.id },
      }),
    ]);
  },

  delete: async (id) => {
    await prisma.jwt.delete({ where: { id: id } });
  },
  findById: async (id) => await prisma.jwt.findUnique({ where: { id: id } }),
};
