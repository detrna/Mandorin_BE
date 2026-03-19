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
        "List of appointments retrieved successfully",
        result.pagination,
      );
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  find: async (req, res) => {
    try {
      const result = await appointmentService.findAll(req.user);
      response(res, 200, result, "Appointment retrieved successfully");
    } catch (err) {
      console.log(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  create: async (req, res) => {
    try {
      const result = await appointmentService.create(req.body);
      response(res, 200, result, "Appointment created successfully");
    } catch (err) {
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  update: async (req, res) => {
    try {
      const result = await appointmentService.update(req.body, req.user);
      response(res, 200, result, "Appointment created successfully");
    } catch (err) {
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
};
