import prisma from "../lib/prisma.js";

export const chatRepo = {
  create: async (data) => await prisma.chats.create({ data }),
  findBySender: async (data, pagination) =>
    await prisma.$transaction([
      prisma.chats.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: { sender_id: data.senderId, receiver_id: data.receiverId },
        include: { users_chats_sender_idTousers },
        orderBy: {
          id: "asc",
        },
      }),
      prisma.chats.count({
        where: { receiver_id: id },
      }),
    ]),
  findByReceiver: async (id, pagination) =>
    await prisma.$transaction([
      prisma.chats.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: { receiver_id: id },
        orderBy: { created_at: "desc" },
        distinct: { sender_id },
        include: { users_chats_sender_idTousers },
      }),
      prisma.chats.count({
        where: { receiver_id: id },
      }),
    ]),
  delete: async (id) => await prisma.chats.delete({ where: { id: id } }),
  updateRead: async (data) =>
    await prisma.chats.updateMany({
      where: {
        receiver_id: data.senderId,
        sender_id: data.senderId,
        read_at: false,
      },
      data: {
        read_at: true,
      },
    }),
  findUnread: async (data) =>
    await prisma.chats.findMany({
      take: pagination.limit,
      skip: pagination.offset,
      where: {
        sender_id: data.senderId,
        receiver_id: data.receiverId,
        read_at: null,
      },
    }),
  findById: async (id) => await prisma.chats.findUnique({ where: { id: id } }),
};
