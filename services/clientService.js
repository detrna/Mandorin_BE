import { clientRepo } from "../repositories/clientRepo.js";
import { throwError } from "../utility/throwError.js";

export const clientService = {
  findOne: async (data) => {
    const result = await clientRepo.findById(Number(data.id));
    if (!result) throw throwError(404, "The requested account did not exist");
    return result;
  },
  findAll: async () => await clientRepo.findAll(),
};
