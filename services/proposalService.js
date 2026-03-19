import { appointmentRepo } from "../repositories/appointmentRepo.js";
import { throwError } from "../utility/throwError.js";

export const appointmentService = {
  create: async (data) => {
    const date = new Date(data.date);
    const appointment = {
      location: data.location,
      date,
      time: data.time,
      note: data.note,
      status: "Menunggu Persetujuan",
      client_id: data.clientId,
      foreman_id: data.foremanId,
    };
    const result = await appointmentRepo.create(appointment);
    return result;
  },
  findAll: async (data, pagination) => {
    const result = await appointmentRepo.findAllByUID(data.id, pagination);
    const payload = { data: result, count: result.count };
    return payload;
  },
  find: async (data) => {
    const result = await appointmentRepo.findById(data.id);
    return result;
  },
  update: async (data, user) => {
    const dbAppointment = await appointmentRepo.findAllByUID(user.id);
    if (!dbAppointment)
      throw throwError(403, "This user didn't have any appointment");
    if (
      !(
        dbAppointment.foreman_id === user.id ||
        dbAppointment.client_id === user.id
      )
    )
      throw throwError(403, "This user didn't own this appointment");

    date = data.date ? new Date(data.date) : null;
    const appointment = {
      id: data.id,
      location: data.location ?? null,
      date,
      time: data.time ?? null,
      note: data.note ?? null,
      status: data.status ?? null,
    };
    const result = await appointmentRepo.update(appointment);
    return result;
  },
};
