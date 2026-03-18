import prisma from "../lib/prisma.js";

export const reviewRepo = {
  create: async (data) => await prisma.reviews.create({ data }),
  findAll: async (data, pagination) => {
    const [result, count] = await prisma.$transaction([
      prisma.reviews.findMany({
        take: pagination.limit,
        skip: pagination.page,
        where: {
          OR: [
            {
              client_id: data.clientId,
            },
            {
              foreman_id: data.foremanId,
            },
          ],
        },
      }),
      prisma.reviews.count(),
    ]);

    return { result, count };
  },
};

// 4. Post project
// a. post /reviews (client)
// b. get /reviews/:clientId/:mandorId
