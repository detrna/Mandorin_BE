import { clientService } from "../services/clientService.js";
import response from "../utility/response.js";

export const clientController = {
  findOne: async (req, res) => {
    try {
      const result = await clientService.findOne(req.params);
      response(res, 200, result, "Client retrieved successfully");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  findAll: async (req, res) => {
    try {
      const result = await clientService.findAll();
      response(res, 200, result, "Client list retrieved successfully");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
};
