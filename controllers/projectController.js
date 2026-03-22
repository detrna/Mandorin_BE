import { projectService } from "../services/projectService.js";
import response from "../utility/response.js";

export const projectController = {
  create: async (req, res) => {
    try {
      const result = await projectService.create(req.body);
      response(res, 200, result, "Project berhasil dibuat");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  find: async (req, res) => {
    try {
      const result = await projectService.find(req.params);
      response(res, 200, result, "Project berhasil diambil");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  findAll: async (req, res) => {
    try {
      const result = await projectService.findAll(req.query);
      response(res, 200, result, "Project berhasil diambil");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
};
