import { clientRepo } from "../repositories/clientRepo.js";
import { throwError } from "../utility/throwError.js";

export const clientService = {
  findOne: async (data) => {
    const result = await clientRepo.findById(Number(data.id));
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
      ? await clientRepo.findByName(name, paging)
      : await clientRepo.findAll(paging);

    const formattedUser = result.data.map((d) => {
      const userDetails = d.users;
      delete d.users;
      return { ...userDetails, ...d };
    });

    if (result.length === 0)
      throw throwError(200, "Tidak menemukan klien yang cocok");

    paging = { ...paging, totalItems: result.count };
    delete result.count;

    const payload = { data: formattedUser, paging };
    return payload;
  },
};
