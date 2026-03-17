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
    const dbUser = await userRepo.findByEmail(data.email);
    if (dbUser) throw throwError(409, "Email address was already taken");

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

    const jti = crypto.randomUUID();
    const accessToken = jwtHelper.signAccess(result);
    const refreshToken = jwtHelper.signRefresh(result, jti);

    const hashedToken = await hashHelper.hash(refreshToken);
    const createToken = { value: hashedToken, id: jti };
    await jwtRepo.create(result, createToken);

    const payload = { result, accessToken, refreshToken };
    return payload;
  },

  registerForeman: async (data, file) => {
    const dbUser = await userRepo.findByEmail(data.email);
    if (dbUser) throw throwError(409, "Email address was already taken");

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
    const jti = crypto.randomUUID();
    const createToken = { value: hashedToken, id: jti };
    await jwtRepo.create(result, createToken);

    const payload = { result, accessToken, refreshToken };
    return payload;
  },
  refresh: async (data) => {
    const refreshToken = data;
    if (!refreshToken) throw throwError(401, "Refresh token is missing");

    try {
      const decoded = jwtHelper.verifyRefresh(refreshToken);
      const dbToken = jwtRepo.findById(decoded.jti);

      if (!dbToken) throw throwError(401, "Token was revoked");

      const jti = crypto.randomUUID();
      const accessToken = jwtHelper.signAccess(decoded);
      const newRefreshToken = jwtHelper.signRefresh(decoded, jti);

      const hashedToken = await hashHelper(newRefreshToken);
      const token = { old: dbToken.id, new: { id: jti, value: hashedToken } };
      await jwtRepo.create(decoded, token);

      const payload = { accessToken, newRefreshToken };
      return payload;
    } catch (err) {
      return err;
    }
  },
  login: async (data) => {
    const result = await userRepo.findByEmail(data.email);
    if (!result) throw throwError(200, "Incorrect email or password");

    const isMatch = await hashHelper.compare(data.password, result.password);
    if (isMatch) (200, "Incorrect email or password");

    const jti = crypto.randomUUID();
    const accessToken = jwtHelper.signAccess(result);
    const refreshToken = jwtHelper.signRefresh(result, jti);

    const hashedToken = await hashHelper.hash(refreshToken);
    const createToken = { value: hashedToken, id: jti };
    await jwtRepo.create(result, createToken);

    const payload = { accessToken, refreshToken };
    return payload;
  },
  logout: async (data) => {
    const { refreshToken } = data;
    const decoded = jwtHelper.verifyRefresh(refreshToken);
    const jti = decoded.jti;
    await jwtRepo.delete(jti);
    return refreshToken;
  },
};
