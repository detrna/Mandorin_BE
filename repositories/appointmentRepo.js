import prisma from "../lib/prisma.js";

export const appointmentRepo = {
  findAllByUID: async (uid, pagination) =>
    await prisma.$transaction([
      prisma.appointments.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: { OR: [{ client_id: uid }, { foreman_id: uid }] },
      }),
      prisma.appointments.count({
        where: { OR: [{ client_id: uid }, { foreman_id: uid }] },
      }),
    ]),
  findById: async (id) =>
    await prisma.appointments.findUnique({
      where: { id: id },
    }),
  create: async (data) =>
    await prisma.appointments.create({
      data,
    }),
  update: async (data) =>
    await prisma.appointments.update({
      where: {
        id: data.id,
      },
      data,
    }),
};
