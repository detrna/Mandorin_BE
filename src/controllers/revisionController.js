import { revisionService } from "../services/revisionService.js";
import response from "../utility/response.js";

export const revisionController = {
  create: async (req, res) => {
    try {
      const result = await revisionService.create(req.body);
      response(res, 200, result, "Revisi berhasil diajukan");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  find: async (req, res) => {
    try {
      const result = await revisionService.find(req.params);
      response(res, 200, result, "Revisi berhasil dambil");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  findAll: async (req, res) => {
    try {
      const result = await revisionService.find(req.params, req.pagination);
      response(res, 200, result, "Daftar revisi berhasil dambil");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
};
