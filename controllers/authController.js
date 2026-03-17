import { authService } from "../services/authService.js";
import { cookieHelper } from "../utility/cookieHelper.js";
import { jwtHelper } from "../utility/jwtHelper.js";
import response from "../utility/response.js";

export const authController = {
  registerForeman: async (req, res) => {
    try {
      const result = await authService.registerForeman(req.body, req.files);

      cookieHelper.sendToken(res, result.refreshToken);

      const payload = { data: result.result, accessToken: result.accessToken };
      response(res, 200, payload, "Client registered successfully");
    } catch (err) {
      console.error(err.message);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  registerClient: async (req, res) => {
    try {
      const result = await authService.registerClient(req.body, req.file);

      cookieHelper.sendToken(res, result.refreshToken);

      const payload = { data: result.result, accessToken: result.accessToken };
      response(res, 200, payload, "Foreman registered successfully");
    } catch (err) {
      console.error(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  refresh: async (req, res) => {
    try {
      const result = await authService.refresh(req.cookie);
      const payload = result.accessToken;

      cookieHelper.sendToken(result.refreshToken);
      response(res, 200, payload, "Token refreshed successfully");
    } catch (err) {
      console.log(err);
      response(res, 500, {}, err.message);
    }
  },
  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      const payload = { accessToken: result.accessToken };

      cookieHelper.sendToken(res, result.refreshToken);
      response(res, 200, payload, "User logged in successfully");
    } catch (err) {
      console.error(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
  logout: async (req, res) => {
    try {
      const result = await authService.logout(req.cookies);
      cookieHelper.clearToken(res, result);
      response(res, 200, {}, "User logged out successfully");
    } catch (err) {
      console.error(err);
      response(res, isNaN(err.code) ? 500 : err.code, {}, err.message);
    }
  },
};
