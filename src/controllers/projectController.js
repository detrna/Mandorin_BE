import { projectService } from "../services/projectService.js";
import response from "../utility/response.js";

export const projectController = {
  create: async (req, res) => {
    try {
      const result = await projectService.create(req.body);
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
  find: async (req, res) => {
    try {
      const result = await projectService.find(req.params);
      response(res, 200, result, "Project berhasil diambil");
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
      const result = await projectService.findAll(req.query, req.pagination);
      response(
        res,
        200,
        result.data,
        "Project berhasil diambil",
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
  update: async (req, res) => {
    try {
      const result = await projectService.update(req.params, req.body);
      response(res, 200, result, "Status project berhasil dirubah");
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
