import prisma from "../lib/prisma.js";

export const chatRepo = {
  create: async (data) => await prisma.chats.create({ data }),
  findConversation: async (data, pagination) =>
    await prisma.$transaction([
      prisma.chats.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        where: {
          OR: [
            {
              sender_id: data.userId,
              receiver_id: data.theirId,
            },
            {
              sender_id: data.userId,
              receiver_id: data.theirId,
            },
          ],
        },
        include: { sender: true },
        orderBy: {
          id: "asc",
        },
      }),
      prisma.chats.count({
        where: {
          OR: [
            {
              sender_id: data.userId,
              receiver_id: data.theirId,
            },
            {
              sender_id: data.userId,
              receiver_id: data.theirId,
            },
          ],
        },
      }),
    ]),
  findAllConversation: async (id, pagination) =>
    await prisma.$transaction([
      prisma.chats.findMany({
        where: {
          OR: [{ sender_id: id }, { receiver_id: id }],
        },
        take: pagination.limit,
        skip: pagination.offset,

        distinct: ["sender_id"],
        orderBy: [{ sender_id: "asc" }, { created_at: "desc" }],
        include: {
          sender: true,
          receiver: true,
        },
      }),
      prisma.chats.count({
        where: {
          OR: [{ sender_id: id }, { receiver_id: id }],
        },
      }),
    ]),
  delete: async (id) => await prisma.chats.delete({ where: { id: id } }),
  updateRead: async (data) =>
    await prisma.chats.updateMany({
      where: {
        receiver_id: data.userId,
        sender_id: data.theirId,
        read_at: null,
      },
      data: {
        read_at: data.read_at,
      },
    }),
  findUnread: async (data) =>
    await prisma.chats.findMany({
      where: {
        sender_id: data.theirId,
        receiver_id: data.userId,
        read_at: null,
      },
    }),
  findById: async (id) => await prisma.chats.findUnique({ where: { id: id } }),
};
