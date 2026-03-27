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
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
};
