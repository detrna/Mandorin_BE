import { supabaseHelper } from "../lib/supabase.js";
import { reviewRepo } from "../repositories/reviewRepo.js";
import { throwError } from "../utility/throwError.js";

export const reviewService = {
  create: async (data, user, file) => {
    const imageUrl = await supabaseHelper.upload(file, "images-review");

    const review = {
      score: Number(data.score),
      content: data.content,
      client_id: user.id,
      foreman_id: Number(data.foremanId),
      photo: imageUrl,
    };

    const result = await reviewRepo.create(review);
    return result;
  },
  findAll: async (data, pagination) => {
    const result = await reviewRepo.get(data, pagination);
    if (result.length === 0)
      throw throwError(200, "Pengguna belum memiliki ulasan");
    const paging = { ...pagination, totalItems: result.count };
    delete result.count;

    const payload = { data: result, paging };
    return payload;
  },
};
