import { reviewService } from "../services/reviewService.js";
import response from "../utility/response.js";

export const reviewController = {
  create: async (req, res) => {
    const result = await reviewService.create(req.body, req.user, req.file);
    response(res, 200, result, "Review created successfully");
  },
  findAll: async (req, res) => {
    const result = await reviewService.findAll(req.body, req.pagination);
    response(
      res,
      200,
      result.data,
      "Reviews retrieved successfully",
      result.paging,
    );
  },
};
