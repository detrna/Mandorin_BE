import { supabaseHelper } from "../lib/supabase.js";
import { clientRepo } from "../repositories/clientRepo.js";
import { foremanRepo } from "../repositories/foremanRepo.js";
import { jwtRepo } from "../repositories/jwtRepo.js";
import { hashHelper } from "../utility/hashHelper.js";
import { jwtHelper } from "../utility/jwtHelper.js";

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

    await jwtRepo.create(result, accessToken);

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

    if (!isNaN(experience) && experience < 0) {
      const err = new Error("Experience must be a valid positive integer");
      err.code = 400;
      throw err;
    }

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

    await jwtRepo.create(result, accessToken);

    const payload = { result, accessToken, refreshToken };
    return payload;
  },
  refresh: async (data) => {
    const refreshToken = data;
    if (!refreshToken)
      throw new Error({ code: 401, message: "Refresh token is missing" });

    try {
      const decoded = jwtHelper.verifyRefresh(refreshToken);
      const dbToken = jwtRepo.findByUserId(decoded.id);

      if (!dbToken)
        throw new Error({ code: 401, message: "Session was revoked" });

      const accessToken = jwtHelper.signAccess(decoded);
      const newRefreshToken = jwtHelper.signRefresh(decoded);

      const payload = { accessToken, newRefreshToken };
      return payload;
    } catch (err) {
      return err;
    }
  },
};
