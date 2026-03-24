import { projectRepo } from "../repositories/projectRepo.js";
import { revisionRepo } from "../repositories/revisionRepo.js";
import { throwError } from "../utility/throwError.js";

export const revisionService = {
  create: async (data) => {
    const dbProject = await projectRepo.findById(projectId);
    if (!dbProject) throw throwError(400, "Project tidak dapat ditemukan");

    const revision = {
      content: data.content,
      cause: data.cause,
      budget: data.budget,
      deadline: data.deadline,
      status: data.status,
      project_id: data.projectId,
    };

    const result = await revisionRepo.create(revision);

    return result;
  },
  findAll: async (params, pagination) => {
    const result = await revisionRepo.findAllByProject(
      Number(params.projectId),
      pagination,
    );

    if (!result) throw throwError(400, "Project belum memiliki laporan harian");

    const paging = { ...pagination, totalItems: result[1] };
    const payload = { data: result[0], paging };

    return payload;
  },
  find: async (params) => {
    const result = await revisionRepo.findAllByProject(Number(params.id));
    if (!result) throw throwError(400, "Laporan harian tidak dapat ditemukan");
    return result;
  },
  update: async (params, data) => {
    return;
  },
};
