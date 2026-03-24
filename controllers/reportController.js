import { reportService } from "../services/reportService.js";
import response from "../utility/response.js";

export const reportController = {
  create: async (req, res) => {
    try {
      const result = await reportService.create(req.body, req.params, req.file);
      response(res, 200, result, "Laporan berhasil dibuat");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  find: async (req, res) => {
    try {
      const result = await reportService.find(req.params);
      response(res, 200, result, "Laporan berhasil dambil");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  findAll: async (req, res) => {
    try {
      const result = await reportService.findAll(req.params, req.pagination);
      response(
        res,
        200,
        result.data,
        "Daftar laporan berhasil dambil",
        result.paging,
      );
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const result = await reportService.delete(req.params);
      response(res, 200, result, "Laporan berhasil dihapus");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
};
