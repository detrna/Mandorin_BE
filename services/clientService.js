import { clientRepo } from "../repositories/clientRepo.js";
import { throwError } from "../utility/throwError.js";

export const clientService = {
  findOne: async (data) => {
    const result = await clientRepo.findById(Number(data.id));
    if (!result)
      throw throwError(404, "Tidak dapat menemukan akun yang diminta");
    return result;
  },
  findAll: async (data, pagination) => {
    const { name } = data;
    let paging = pagination;
    const result = name
      ? await clientRepo.findByName(name, paging)
      : await clientRepo.findAll(paging);
    if (result.length === 0)
      throw throwError(200, "Tidak menemukan klien yang cocok");

    paging = { ...paging, totalItems: result.count };
    delete result.count;

    const payload = { data: result, paging };
    return payload;
  },
};
