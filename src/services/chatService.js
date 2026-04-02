import { supabaseHelper } from "../lib/supabase";
import { chatRepo } from "../repositories/chatRepo.js";
import { throwError } from "../utility/throwError.js";

export const chatService = {
  sendMessage: async (user, data, file) => {
    let imageUrl = null;
    if (file) imageUrl = await supabaseHelper.upload(file, "images-chat");

    const payload = {
      content: data.content,
      image: imageUrl,
      senderId: user.id,
      receiverId: data.receiverId,
    };

    const result = await chatRepo.create(payload);
    return result;
  },

  getReceivedMessages: async (user, data, pagination) => {
    const queryData = {
      receiverId: user.id,
      senderId: data.senderId,
    };

    const result = await chatRepo.findBySender(queryData, pagination);

    if (result[1] === 0)
      throw throwError(
        400,
        "Pengguna belum memiliki percakapan dengan akun terkait",
      );

    const paging = { ...pagination, totalItems: result[1] };

    const payload = { data: result[0], paging };

    return payload;
  },

  getAllLastReceivedMessages: async (user, pagination) => {
    const result = await chatRepo.findByReceiver(user.id, pagination);

    if (result[1] === 0)
      throw throwError(200, "Pengguna belum memiliki percakapan apapun");

    const paging = { ...pagination, totalItems: result[1] };

    const payload = { data: result[0], paging };

    return payload;
  },

  readMessage: async (user, data) => {
    const queryData = {
      receiverId: user.id,
      senderId: data.senderId,
    };

    const dbChat = await chatRepo.findUnread(queryData);
    if (!dbChat ?? dbChat !== 0)
      throw throwError(400, "Pengguna tidak memiliki pesan yang belum dibaca");

    const result = await chatRepo.updateRead(queryData);

    return result;
  },

  delete: async (params) => {
    const dbChat = await chatRepo.findById(Number(params.id));
    if (!dbChat) throw throwError(400, "Tidak menemukan pesan yang diminta");

    const result = await chatRepo.delete(data);
    return result;
  },
};
