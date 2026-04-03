import { milestoneService } from "../services/milestoneService.js";
import response from "../utility/response.js";

export const milestoneController = {
  update: (req, res) => {
    return;
  },
  find: async (req, res) => {
    try {
      const result = await milestoneService.find(req.params);
      response(res, 200, result, "Milestone berhasil diambil");
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
  addMilestone: async (req, res) => {
    try {
      const result = await milestoneService.create(req.body, req.params);
      response(res, 200, result, "Milestone berhasil ditambahkan");
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
  findMilestones: async (req, res) => {
    try {
      const result = await milestoneService.findAll(req.params, req.pagination);
      response(
        res,
        200,
        result.data,
        "Milestone berhasil didapat",
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
