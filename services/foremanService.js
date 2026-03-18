import { supabaseHelper } from "../lib/supabase.js";
import { foremanRepo } from "../repositories/foremanRepo.js";
import { throwError } from "../utility/throwError.js";

export const foremanService = {
  findOne: async (data) => {
    const result = await foremanRepo.findById(Number(data.id));
    if (!result) throw throwError(404, "The requested account did not exist");
    return payload;
  },
  findAll: async () => {
    const result = await foremanRepo.findAll();
    return result;
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
