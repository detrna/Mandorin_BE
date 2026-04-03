import { clientService } from "../services/clientService.js";
import response from "../utility/response.js";

export const clientController = {
  findOne: async (req, res) => {
    try {
      const result = await clientService.findOne(req.params);
      response(res, 200, result, "Data klien berhasil diambil");
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
  findAll: async (req, res) => {
    try {
      const result = await clientService.findAll(req.query, req.pagination);
      response(
        res,
        200,
        result.data,
        "Daftar klien berhasil diambil",
        result.paging,
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
};
