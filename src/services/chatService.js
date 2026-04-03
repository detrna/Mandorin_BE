import { supabaseHelper } from "../lib/supabase.js";
import { chatRepo } from "../repositories/chatRepo.js";
import { throwError } from "../utility/throwError.js";

export const chatService = {
  sendMessage: async (user, data, file) => {
    const receiver_id = Number(data.receiverId);

    if (user.id === receiver_id)
      throw throwError(
        400,
        "Tidak bisa mengirim pesan ke akun pengguna itu sendiri",
      );

    const imageUrl = file
      ? await supabaseHelper.upload(file, "images-chat")
      : null;

    const payload = {
      content: data.content,
      image: imageUrl,
      sender_id: user.id,
      receiver_id,
    };

    const result = await chatRepo.create(payload);
    return result;
  },

  findConversation: async (user, data, pagination) => {
    if (!data.theirId)
      throw throwError(400, "Query ID lawan bicara tidak ditemukan");

    const theirId = Number(data.theirId);

    const queryData = {
      userId: user.id,
      theirId,
    };

    const result = await chatRepo.findConversation(queryData, pagination);

    console.log(queryData);
    console.log(result);

    if (result[1] === 0)
      throw throwError(
        400,
        "Pengguna belum memiliki percakapan dengan akun terkait",
      );

    const paging = { ...pagination, totalItems: result[1] };

    const payload = { data: result[0], paging };

    return payload;
  },

  findAllConversation: async (user, pagination) => {
    const result = await chatRepo.findByReceiver(user.id, pagination);

    console.log(result);

    if (result[1] === 0)
      throw throwError(200, "Pengguna belum memiliki percakapan apapun");

    const paging = { ...pagination, totalItems: result[1] };

    const payload = { data: result[0], paging };

    return payload;
  },

  readMessage: async (user, data) => {
    const theirId = Number(data.theirId);

    if (user.id === theirId)
      throw throwError(400, "Tidak dapat membaca pesan akun sendiri");

    const queryData = {
      userId: user.id,
      theirId,
      read_at: new Date(),
    };

    const dbChat = await chatRepo.findUnread(queryData);
    if (dbChat.length === 0)
      throw throwError(400, "Pengguna tidak memiliki pesan yang belum dibaca");

    const result = await chatRepo.updateRead(queryData);

    return result;
  },

  delete: async (user, params) => {
    const dbChat = await chatRepo.findById(Number(params.id));
    if (!dbChat) throw throwError(400, "Tidak menemukan pesan yang diminta");
    if (dbChat.sender_id !== user.id)
      throw throwError(400, "Tidak dapat menghapus pesan pengguna lain");

    const result = await chatRepo.delete(Number(params.id));
    return result;
  },
};
