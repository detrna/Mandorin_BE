import { appointmentRepo } from "../repositories/appointmentRepo.js";
import { clientRepo } from "../repositories/clientRepo.js";
import { foremanRepo } from "../repositories/foremanRepo.js";
import { throwError } from "../utility/throwError.js";

export const appointmentService = {
  create: async (data, user) => {
    if (user.role === "client") {
      const dbForeman = await foremanRepo.findById(data.foremanId);
      if (!dbForeman) throw throwError(400, "Data akun mandor tidak ditemukan");
      if (dbForeman.role !== "foreman")
        throw throwError(400, "Mandor yang dimintakan bukanlah seorang mandor");
    } else {
      const dbClient = await clientRepo.findById(data.clientId);
      if (!dbClient) throw throwError(400, "Data akun klien tidak ditemukan");
      if (dbClient.role !== "client")
        throw throwError(400, "Klien yang dimintakan bukanlah seorang klien");
    }

    const date = new Date(data.date);
    const appointment = {
      location: data.location,
      date,
      time: data.time,
      note: data.note,
      status: "MENUNGGU PERSUTUJUAN",
      client_id: data.clientId ?? user.id,
      foreman_id: data.foremanId ?? user.id,
    };
    const result = await appointmentRepo.create(appointment);
    return result;
  },
  findAll: async (data, pagination) => {
    const result = await appointmentRepo.findAllByUID(data.id, pagination);
    if (result[1] === 0)
      throw throwError(200, "Pengguna belum memiliki janji temu");

    const paging = { ...pagination, totalItems: result[1] };
    const payload = { data: result[0], paging };
    return payload;
  },
  find: async (data) => {
    const result = await appointmentRepo.findById(Number(data.id));
    return result;
  },
  update: async (data, user, params) => {
    const id = Number(params.id);

    const dbAppointment = await appointmentRepo.findById(id);
    if (!dbAppointment)
      throw throwError(403, "Janji temu yang diminta tidak dapat ditemukan");
    if (
      !(
        dbAppointment.foreman_id === user.id ||
        dbAppointment.client_id === user.id
      )
    )
      throw throwError(403, "Pengguna tidak memiliki janji temu terkait");

    const date = data.date ? new Date(data.date) : dbAppointment.date;
    const appointment = {
      id,
      location: data.location ?? dbAppointment.location,
      date,
      time: data.time ?? dbAppointment.time,
      note: data.note ?? dbAppointment.note,
      status: data.status ?? dbAppointment.status,
    };

    const result = await appointmentRepo.update(appointment);
    return result;
  },
  delete: async (user, params) => {
    const dbAppointment = await appointmentRepo.findById(params);
    if (!dbAppointment)
      throw throwError(403, "Janji temu yang diminta tidak dapat ditemukan");
    if (
      !(
        dbAppointment.foreman_id === user.id ||
        dbAppointment.client_id === user.id
      )
    )
      throw throwError(403, "Pengguna tidak memiliki janji temu terkait");

    const result = await appointmentRepo.delete(params);
    return result;
  },
};
