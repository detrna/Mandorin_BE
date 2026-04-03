import { foremanService } from "../services/foremanService.js";
import response from "../utility/response.js";

export const foremanController = {
  findOne: async (req, res) => {
    try {
      const result = await foremanService.findOne(req.params);
      response(res, 200, result, "Foreman retrieved successfully");
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
      const result = await foremanService.findAll(req.query, req.pagination);
      response(
        res,
        200,
        result.data,
        "Foreman list retrieved successfully",
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
  updateData: async (req, res) => {
    try {
      const result = await foremanService.updateProfile(
        req.body,
        req.files,
        req.user,
      );
      response(res, 200, result, "Foreman profile was updated succesfully");
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
