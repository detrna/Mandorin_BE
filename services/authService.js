import { supabaseHelper } from "../lib/supabase.js";
import { clientRepo } from "../repositories/clientRepo.js";
import { foremanRepo } from "../repositories/foremanRepo.js";
import { jwtRepo } from "../repositories/jwtRepo.js";
import { userRepo } from "../repositories/userRepo.js";
import { hashHelper } from "../utility/hashHelper.js";
import { jwtHelper } from "../utility/jwtHelper.js";
import { throwError } from "../utility/throwError.js";

export const authService = {
  registerClient: async (data, file) => {
    const avatarUrl = await supabaseHelper.upload(file, "avatars");
    const hashedPass = await hashHelper.hash(data.password);

    const user = {
      name: data.name,
      birth_place: data.birth_place,
      birth_date: new Date(data.birth_date),
      sex: data.sex,
      address: data.address,
      email: data.email,
      password: hashedPass,
      avatar: avatarUrl,
    };
    const client = {
      nick: data.nick,
    };

    const result = await clientRepo.create(user, client);
    const accessToken = jwtHelper.signAccess(result);
    const refreshToken = jwtHelper.signRefresh(result);

    const hashedToken = await hashHelper(refreshToken);
    await jwtRepo.create(result, hashedToken);

    const payload = { result, accessToken, refreshToken };
    return payload;
  },

  registerForeman: async (data, file) => {
    const avatarUrl = await supabaseHelper.upload(file.avatar[0], "avatars");
    const portofolioUrl = await supabaseHelper.upload(
      file.portfolio[0],
      "portfolios",
    );
    const hashedPass = await hashHelper.hash(data.password);

    const experience = Number(data.experience);

    if (!isNaN(experience) && experience < 0)
      throw throwError(400, "Experience must be a positive integer");

    const user = {
      name: data.name,
      birth_place: data.birth_place,
      birth_date: new Date(data.birth_date),
      sex: data.sex,
      address: data.address,
      email: data.email,
      password: hashedPass,
      avatar: avatarUrl || null,
    };
    const foreman = {
      nik: data.nik,
      field: data.field,
      experience,
      portofolio: portofolioUrl || null,
    };

    const result = await foremanRepo.create(user, foreman);
    const accessToken = jwtHelper.signAccess(result);
    const refreshToken = jwtHelper.signRefresh(result);

    const hashedToken = await hashHelper(refreshToken);
    await jwtRepo.create(result, hashedToken);

    const payload = { result, accessToken, refreshToken };
    return payload;
  },
  refresh: async (data) => {
    const refreshToken = data;
    if (!refreshToken) throw throwError(401, "Refresh token is missing");

    try {
      const decoded = jwtHelper.verifyRefresh(refreshToken);
      const dbToken = jwtRepo.findByUserId(decoded.id);

      if (!dbToken) throw throwError(401, "Token was revoked");

      const accessToken = jwtHelper.signAccess(decoded);
      const newRefreshToken = jwtHelper.signRefresh(decoded);

      const hashedToken = await hashHelper(newRefreshToken);
      const token = { old: dbToken, new: hashedToken };
      await jwtRepo.create(decoded, token);

      const payload = { accessToken, newRefreshToken };
      return payload;
    } catch (err) {
      return err;
    }
  },
  login: async (data) => {
    const user = await userRepo.findByEmail(data.email);
    if (!user) throw throwError(200, "Incorrect email or password");

    const isMatch = await hashHelper.compare(data.password, user.password);
    if (isMatch) (200, "Incorrect email or password");

    const tokenPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
    const accessToken = jwtHelper.signAccess(tokenPayload);
    const refreshToken = jwtHelper.signRefresh(tokenPayload);

    const payload = { accessToken, refreshToken };
    return payload;
  },
  logout: async (data) => {
    const result = await jwtRepo.delete(data);
    return result;
  },
};
