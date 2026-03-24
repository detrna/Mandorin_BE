import { supabaseHelper } from "../lib/supabase.js";
import { projectRepo } from "../repositories/projectRepo.js";
import { reportRepo } from "../repositories/reportRepo.js";
import { throwError } from "../utility/throwError.js";

export const reportService = {
  create: async (data, params, file) => {
    const projectId = Number(params.projectId);
    const dbProject = await projectRepo.findById(projectId);
    if (!dbProject) throw throwError(400, "Project tidak dapat ditemukan");

    if (!file)
      throw throwError(400, "Foto harus disertakan dalam pengajuan laporan");

    const photoUrl = await supabaseHelper.upload(file, "images-report");

    const report = {
      title: data.title,
      content: data.content,
      photo: photoUrl,
      project_id: projectId,
    };

    const result = await reportRepo.create(report);

    return result;
  },
  findAll: async (params, pagination) => {
    const result = await reportRepo.findAllByProject(
      Number(params.projectId),
      pagination,
    );

    if (result[0].length === 0)
      throw throwError(400, "Project belum memiliki laporan harian");

    const paging = { ...pagination, totalItems: result[1] };
    const payload = { data: result[0], paging };

    return payload;
  },
  find: async (params) => {
    const result = await reportRepo.findById(Number(params.id));
    if (!result) throw throwError(400, "Laporan harian tidak dapat ditemukan");
    return result;
  },
  delete: async (params) => {
    const dbReport = await reportRepo.findById(Number(params.id));
    if (!dbReport)
      throw throwError(400, "Laporan harian tidak dapat ditemukan");

    const result = await reportRepo.delete(Number(params.id));

    return result;
  },
};
