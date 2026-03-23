import { supabaseHelper } from "../lib/supabase.js";
import { milestoneRepo } from "../repositories/milestoneRepo.js";
import { projectRepo } from "../repositories/projectRepo.js";
import { throwError } from "../utility/throwError.js";

export const milestoneService = {
  create: async (data, params) => {
    const dbProject = await projectRepo.findById(Number(params.projectId));
    if (!dbProject) throw throwError(400, "Project tidak dapat ditemukan");

    const milestones = data.map((d) => {
      const deadline = new Date(d.deadline);
      return {
        title: d.title,
        content: d.content,
        deadline,
        project_id: Number(params.projectId),
      };
    });

    const result = await milestoneRepo.create(milestones);
    return result;
  },
  find: async (params) => {
    const result = await milestoneRepo.findById(Number(params.id));
    if (!result) throw throwError(400, "Milestone tidak dapat ditemukan");

    return result;
  },
  findAll: async (params) => {
    const result = await milestoneRepo.findAllByProject(
      Number(params.projectId),
    );
    if (result.length === 0)
      throw throwError(200, "Project belum memiliki milestone");
    return result;
  },
  update: async (data, params, file) => {
    const dbMilestone = milestoneRepo.findById(Number(params.id));
    if (!dbMilestone) throw throwError(400, "Milestone tidak dapat ditemukan");
    if (dbMilestone.completed)
      throw throwError(
        400,
        "Tidak dapat memodifikasi milestone yang sudah selesai",
      );

    const deadline = deadline ? new Date(deadline) : dbMilestone.deadline;
    const completed = data.completed === "true";

    let photoUrl = null;
    if (completed) {
      if (req.file) {
        photoUrl = await supabaseHelper.upload(file, "images-milestone");
      } else {
        throw throwError(
          400,
          "Milestone harus disertakan foto sebelum diselesaikan",
        );
      }
    } else {
      if (req.file) {
        throw throwError(
          400,
          "Foto harus diserahkan bersamaan dengan penyelesaian milestone",
        );
      }
    }

    const milestone = {
      id: dbMilestone.id,
      title: data.title ?? dbMilestone.title,
      content: data.content ?? dbMilestone.content,
      completed: completed,
      deadline,
      photo: photoUrl ?? dbMilestone.photo,
      comment: data.comment ?? dbMilestone.comment,
      projectId: dbMilestone.project_id,
    };

    const result = await milestoneRepo.update(milestone);
    return result;
  },
};
