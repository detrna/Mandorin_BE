import { midtrans } from "../lib/midtrans.js";
import { supabaseHelper } from "../lib/supabase.js";
import { clientRepo } from "../repositories/clientRepo.js";
import { foremanRepo } from "../repositories/foremanRepo.js";
import { proposalRepo } from "../repositories/proposalRepo.js";
import { transactionRepo } from "../repositories/transactionRepo.js";
import { throwError } from "../utility/throwError.js";

export const proposalService = {
  create: async (data, user, file) => {
    const client_id = Number(data.clientId);
    const dbForeman = await foremanRepo.findById(user.id);
    if (!dbForeman) throw throwError(400, "Data akun mandor tidak ditemukan");
    const dbClient = await clientRepo.findById(client_id);
    if (!dbClient) throw throwError(400, "Data akun klien tidak ditemukan");

    const photoUrl = await supabaseHelper.upload(file, "images-proposal");

    const deadline = new Date(data.deadline);
    const proposal = {
      price: Number(data.price),
      deadline,
      field: data.field,
      title: data.title,
      content: data.content,
      photo: photoUrl,
      status: "MENUNGGU PERSETUJUAN",
      client_id,
      foreman_id: user.id,
    };

    const result = await proposalRepo.create(proposal);
    return result;
  },
  findAll: async (data, pagination) => {
    const result = await proposalRepo.findAllByUID(data.id, pagination);
    const paging = { ...pagination, totalItems: result[1] };
    const payload = { data: result[0], paging };
    return payload;
  },
  find: async (data) => {
    const result = await proposalRepo.findById(Number(data.id));
    if (!result) throw throwError(400, "Tidak ada proposal yang ditemukan");
    return result;
  },
  update: async (data, user, params) => {
    const id = Number(params.id);

    const dbProposal = await proposalRepo.findById(id);
    if (!dbProposal)
      throw throwError(403, "Proposal yang diminta tidak dapat ditemukan");
    if (dbProposal.foreman_id !== user.id)
      throw throwError(403, "Mandor tidak memiliki proposal terkait");

    const deadline = data.date ? new Date(data.deadline) : null;
    const proposal = {
      id,
      price: data.price ?? dbProposal.price,
      deadline: deadline ?? dbProposal.deadline,
      field: data.field ?? dbProposal.field,
      title: data.title ?? dbProposal.titile,
      content: data.content ?? dbProposal.content,
      status: data.status ?? dbProposal.status,
    };

    const result = await proposalRepo.update(proposal);
    return result;
  },
  delete: async (user, params) => {
    const dbProposal = await proposalRepo.findById(params);
    if (!dbProposal)
      throw throwError(403, "Proposal yang diminta tidak dapat ditemukan");
    if (
      !(dbProposal.foreman_id === user.id || dbProposal.client_id === user.id)
    )
      throw throwError(403, "Pengguna tidak memiliki proposal terkait");

    const result = await proposalRepo.delete(params);
    return result;
  },
  pay: async (user, params) => {
    const id = Number(params.id);
    const dbProposal = await proposalRepo.findById(id);
    if (!dbProposal)
      throw throwError(403, "Proposal yang diminta tidak dapat ditemukan");
    if (dbProposal.client_id !== user.id)
      throw throwError(403, "Pengguna tidak memiliki proposal terkait");

    let dbTransaction = await transactionRepo.findByItemId(id);
    if (!dbTransaction)
      dbTransaction = await transactionRepo.create({ proposal_id: id });

    const response = await midtrans.pay(dbProposal, dbTransaction);
    return response;
  },
  notification: async (data) => {
    const payment = midtrans.notification(data);
    console.log(payment);
    process.exit();
    return midtrans;
  },
};
