import { chatService } from "../services/chatService.js";
import response from "../utility/response.js";

export const chatController = {
  sendMessage: async (req, res) => {
    try {
      const result = await chatService.sendMessage(
        req.user,
        req.body,
        req.file,
      );

      response(res, 200, result, "Pesan berhasil terkirim", null, true);
    } catch (err) {
      console.log(err);
      response(
        res,
        isNaN(err.code) ? 500 : err.code,
        {},
        err.message,
        null,
        false,
      );
    }
  },
  getReceived: async (req, res) => {
    try {
      const result = await chatService.findConversation(
        req.user,
        req.query,
        req.pagination,
      );

      response(
        res,
        200,
        result.data,
        "Pesan berhasil didapatkan",
        result.paging,
        true,
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        isNaN(err.code) ? 500 : err.code,
        {},
        err.message,
        null,
        false,
      );
    }
  },

  getAllLastReceived: async (req, res) => {
    try {
      const result = await chatService.findAllConversation(
        req.user,
        req.pagination,
      );

      response(
        res,
        200,
        result.data,
        "Pesan berhasil didapatkan",
        result.paging,
        true,
      );
    } catch (err) {
      console.log(err);
      response(
        res,
        isNaN(err.code) ? 500 : err.code,
        {},
        err.message,
        null,
        false,
      );
    }
  },

  read: async (req, res) => {
    try {
      const result = await chatService.readMessage(req.user, req.query);

      response(res, 200, result, "Pesan berhasil didapatkan", null, true);
    } catch (err) {
      console.log(err);
      response(
        res,
        isNaN(err.code) ? 500 : err.code,
        {},
        err.message,
        null,
        false,
      );
    }
  },

  delete: async (req, res) => {
    try {
      const result = await chatService.delete(req.user, req.params);

      response(res, 200, result, "Pesan berhasil dihapus", null, true);
    } catch (err) {
      console.log(err);
      response(
        res,
        isNaN(err.code) ? 500 : err.code,
        {},
        err.message,
        null,
        false,
      );
    }
  },
};
