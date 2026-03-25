import prisma from "../lib/prisma.js";

export const reviewRepo = {
  create: async (data) => await prisma.reviews.create({ data }),
  findAll: async (query, pagination) =>
    await prisma.$transaction([
      prisma.reviews.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: {
          OR: [
            {
              client_id: query,
            },
            {
              foreman_id: query,
            },
          ],
        },
      }),
      prisma.reviews.count({
        where: {
          OR: [
            {
              client_id: query,
            },
            {
              foreman_id: query,
            },
          ],
        },
      }),
    ]),
  find: async (id) => await prisma.reviews.findUnique({ where: { id: id } }),
  delete: async (id) => await prisma.reviews.delete({ where: { id: id } }),
};

// 4. Post project
// a. post /reviews (client)
// b. get /reviews/:clientId/:mandorId
