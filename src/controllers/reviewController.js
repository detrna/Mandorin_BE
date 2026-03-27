import { reviewService } from "../services/reviewService.js";
import response from "../utility/response.js";

export const reviewController = {
  create: async (req, res) => {
    const result = await reviewService.create(req.body, req.user);
    response(res, 200, result, "Review created successfully");
  },
  findAll: async (req, res) => {
    try {
      const result = await reviewService.findAll(req.query, req.pagination);
      response(
        res,
        200,
        result.data,
        "Reviews retrieved successfully",
        result.paging,
      );
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const result = await reviewService.delete(req.params, req.user);
      response(res, 200, result, "Ulasan berhasil dihapus");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
};
