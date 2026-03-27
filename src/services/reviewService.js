import { supabaseHelper } from "../lib/supabase.js";
import { reviewRepo } from "../repositories/reviewRepo.js";
import { throwError } from "../utility/throwError.js";

export const reviewService = {
  create: async (data, user) => {
    const review = {
      score: Number(data.score),
      content: data.content,
      client_id: user.id,
      foreman_id: Number(data.foremanId),
    };

    const result = await reviewRepo.create(review);
    return result;
  },
  findAll: async (query, pagination) => {
    const UID = Number(query.userId);
    const result = await reviewRepo.findAll(UID, pagination);
    if (result[0].length === 0)
      throw throwError(200, "Pengguna belum memiliki ulasan");

    const paging = { ...pagination, totalItems: result[1] };

    const payload = { data: result[0], paging };
    return payload;
  },
  delete: async (params, user) => {
    const id = Number(params.id);
    const dbReview = await reviewRepo.find(id);
    if (!dbReview) throw throwError(400, "Ulasan tidak ditemukan");
    if (!dbReview.client_id === user.id)
      throw throwError(403, "Pengguna tidak memiliki ulasan terkait");

    const result = await reviewRepo.delete(id);
    return result;
  },
};
