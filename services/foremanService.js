import { supabaseHelper } from "../lib/supabase.js";
import { foremanRepo } from "../repositories/foremanRepo.js";
import { throwError } from "../utility/throwError.js";

export const foremanService = {
  findOne: async (data) => {
    const result = await foremanRepo.findById(Number(data.id));
    if (!result)
      throw throwError(404, "Tidak dapat menemukan akun yang diminta");

    const userDetails = result.users;
    delete result.users;
    const formattedUser = { ...userDetails, ...result };

    return formattedUser;
  },
  findAll: async (data, pagination) => {
    const { name } = data;
    let paging = pagination;
    const result = name
      ? await foremanRepo.findByName(name, paging)
      : await foremanRepo.findAll(paging);
    if (result.length === 0)
      throw throwError(200, "Tidak menemukan mandor yang cocok");

    const formattedUser = result.data.map((d) => {
      const userDetails = d.users;
      delete d.users;
      return { ...userDetails, ...d };
    });

    paging = { ...paging, totalItems: result.count };
    delete result.count;

    const payload = { data: formattedUser, paging };
    return payload;
  },
  updateProfile: async (data, file, user) => {
    const avatarUrl = file.avatar[0]
      ? await supabaseHelper.upload(file.avatar[0], "avatars")
      : null;
    const portfolioUrl = file.portfolio[0]
      ? await supabaseHelper.upload(file.portfolio[0], "portfolios")
      : null;

    const experience = data.experience ? Number(data.experience) : null;

    const userData = {
      name: data.name ?? null,
      birth_place: data.birth_place ?? null,
      birth_date: data.birth_date ? new Date(data.birth_date) : null,
      sex: data.sex ?? null,
      address: data.address ?? null,
      email: data.email ?? null,
      avatar: avatarUrl ?? null,
    };

    const foremanData = {
      nik: data.nik ?? null,
      field: data.field ?? null,
      experience,
      bio: data.bio ?? null,
      strength: data.bio ?? null,
      portfolio: portfolioUrl ?? null,
    };

    const result = await foremanRepo.updateData(userData, foremanData, user.id);
    return result;
  },
};
