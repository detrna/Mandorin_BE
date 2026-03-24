import { projectRepo } from "../repositories/projectRepo.js";
import { proposalRepo } from "../repositories/proposalRepo.js";
import { throwError } from "../utility/throwError.js";

export const projectService = {
  create: async (data) => {
    const dbProposal = await proposalRepo.findById(data.proposalId);
    if (!dbProposal)
      throw throwError(400, "Proposal dari project tidak dapat ditemukan");

    const project = {
      field: dbProposal.field,
      title: dbProposal.title,
      content: dbProposal.content,
      budget: Number(dbProposal.budget),
      deadline: dbProposal.deadline,
      location: dbProposal.location,
      status: "SEDANG BERJALAN",
      client_id: dbProposal.client_id,
      foreman_id: dbProposal.foreman_id,
    };

    const result = await projectRepo.create(project);
    return result;
  },
  find: async (params) => {
    const result = await projectRepo.findById(Number(params.id));
    if (!result) throw throwError(400, "Project tidak dapat ditemukan");

    return result;
  },
  findAll: async (query, pagination) => {
    const result = await projectRepo.findAllByUID(
      Number(query.userId),
      pagination,
    );

    if (result[0].length === 0)
      throw throwError(200, "Pengguna belum memiliki project");

    const formattedResult = result[0].map((project) => {
      const clientDetails = project.clients.users;
      const foremanDetails = project.foreman.users;

      delete project.foreman.users;
      delete project.clients.users;

      const clientData = { ...clientDetails, ...project.clients };
      const foremanData = { ...foremanDetails, ...project.foreman };

      return { ...project, clients: clientData, foreman: foremanData };
    });

    const paging = { ...pagination, totalItems: result[1] };
    const payload = { data: formattedResult, paging };
    return payload;
  },
};
