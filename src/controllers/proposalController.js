import { projectService } from "../services/projectService.js";
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
  delete: async (req, res) => {
    try {
      const result = await proposalService.update(req.user, req.params);
      response(res, 200, result, "Proposal berhasil dihapus");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  pay: async (req, res) => {
    try {
      const result = await proposalService.pay(req.user, req.params);
      response(res, 200, result, "Sesi pembayaran berhasil dibuat");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  notification: async (req, res) => {
    try {
      const result = await proposalService.notification(req.body);

      if (result) await projectService.create(req.proposal);

      response(res, 200, result, "Project berhasil dibuat");
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
