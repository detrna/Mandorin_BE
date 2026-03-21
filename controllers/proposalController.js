import { proposalService } from "../services/proposalService.js";
import response from "../utility/response.js";

export const proposalController = {
  findAll: async (req, res) => {
    try {
      const result = await proposalService.findAll(req.user, req.pagination);
      response(
        res,
        200,
        result.data,
        "Daftar proposal berhasil diambil",
        result.paging,
      );
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  find: async (req, res) => {
    try {
      const result = await proposalService.find(req.params);
      response(res, 200, result, "Data proposal berhasil diambil");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  create: async (req, res) => {
    try {
      const result = await proposalService.create(req.body, req.user, req.file);
      response(res, 200, result, "Proposal berhasil dibuat");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  update: async (req, res) => {
    try {
      const result = await proposalService.update(
        req.body,
        req.user,
        req.params,
      );
      response(res, 200, result, "Proposal berhasil diperbarui");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
};
