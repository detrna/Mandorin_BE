import { authService } from "../services/authService.js";
import { cookieHelper } from "../utility/cookieHelper.js";
import response from "../utility/response.js";

export const authController = {
  registerForeman: async (req, res) => {
    try {
      const result = await authService.registerForeman(req.body, req.files);
      cookieHelper.sendToken(res, result.refreshToken);

      const payload = { data: result.result, accessToken: result.accessToken };
      response(res, 200, payload, "Mandor berhasil terdaftar");
    } catch (err) {
      console.error(err);
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
  registerClient: async (req, res) => {
    try {
      const result = await authService.registerClient(req.body, req.file);

      cookieHelper.sendToken(res, result.refreshToken);

      const payload = { data: result.result, accessToken: result.accessToken };
      response(res, 200, payload, "Klien berhasil terdaftar");
    } catch (err) {
      console.error(err);
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
  refresh: async (req, res) => {
    try {
      const result = await authService.refresh(req.cookies);
      const accessToken = result.accessToken;
      const payload = { accessToken };

      cookieHelper.sendToken(res, result.refreshToken);
      response(res, 200, payload, "Token berhasil di-refresh");
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
  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      const payload = { accessToken: result.accessToken };

      cookieHelper.sendToken(res, result.refreshToken);
      response(res, 200, payload, "Pengguna berhasil login");
    } catch (err) {
      console.error(err);
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
  logout: async (req, res) => {
    try {
      const result = await authService.logout(req.cookies);
      cookieHelper.clearToken(res, result);
      response(res, 200, {}, "Pengguna berhasil logout");
    } catch (err) {
      console.error(err);
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
