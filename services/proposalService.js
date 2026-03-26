import { midtrans } from "../utility/midtrans.js";
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
      budget: Number(data.budget),
      deadline,
      field: data.field,
      title: data.title,
      location: data.location,
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
      budget: data.budget ?? dbProposal.budget,
      deadline: deadline ?? dbProposal.deadline,
      field: data.field ?? dbProposal.field,
      title: data.title ?? dbProposal.title,
      location: data.location ?? dbProposal.location,
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

    try {
      const payload = await midtrans.pay(dbProposal, dbTransaction);
      return payload;
    } catch (err) {
      console.log(err);
      return err;
    }
    return payload;
  },
  notification: async (data) => {
    try {
      const payment = await midtrans.notification(data);
      if (!payment) return;

      await transactionRepo.update(payment);

      if (payment.status === "denied" || payment.status === "expire")
        throw throwError(200, `Pembayaran gagal terbuat: ${payment.status}`);

      const dbTransaction = await transactionRepo.findById(payment.id);
      const proposalData = {
        id: dbTransaction.proposal_id,
        status: "DITERIMA",
      };

      const result = await proposalRepo.update(proposalData);
      return result;
    } catch (err) {
      throw throwError(200, err.message);
    }
  },
};
