import { appointmentService } from "../services/appointmentService.js";
import response from "../utility/response.js";

export const appointmentController = {
  findAll: async (req, res) => {
    try {
      const result = await appointmentService.findAll(req.user, req.pagination);
      response(
        res,
        200,
        result.data,
        "Daftar janji temu berhasil diambil",
        result.paging,
      );
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  find: async (req, res) => {
    try {
      const result = await appointmentService.find(req.params);
      response(res, 200, result, "Data janji temu berhasil diambil");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  create: async (req, res) => {
    try {
      const result = await appointmentService.create(req.body, req.user);
      response(res, 200, result, "Janji temu berhasil dibuat");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  update: async (req, res) => {
    try {
      const result = await appointmentService.update(
        req.body,
        req.user,
        req.params,
      );
      response(res, 200, result, "Janji temu berhasil diperbarui");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const result = await appointmentController.update(req.user, req.params);
      response(res, 200, result, "Proposal berhasil dihapus");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
};
