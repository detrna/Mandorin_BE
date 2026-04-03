import "dotenv/config";
import { throwError } from "./throwError.js";
import crypto from "crypto";

export const midtrans = {
  pay: async (dbProposal, dbTransaction) => {
    const serverKey = process.env.SERVER_KEY;
    const password = "";
    const credentials = `${serverKey}:${password}`;
    const base64String = Buffer.from(credentials).toString("base64");
    const order_id = `${dbTransaction.id}-${Date.now()}`;

    console.log(serverKey);

    const transaction_details = {
      order_id,
      gross_amount: dbProposal.budget,
    };

    const customer_details = {
      first_name: dbProposal.clients.users.name,
      email: dbProposal.clients.users.email,
      phone: dbProposal.clients.users.phone,
    };

    const item_details = [
      {
        id: dbProposal.id,
        name: dbProposal.title,
        price: dbProposal.budget,
        quantity: 1,
        merchant_name: dbProposal.foreman.users.name,
      },
    ];

    const payload = {
      transaction_details,
      item_details,
      customer_details,
      usage_limit: 5,
      expiry: {
        duration: 60,
        unit: "minutes",
      },
    };

    const url = "https://api.sandbox.midtrans.com/v1/payment-links";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Basic ${base64String}`,
      },
      body: JSON.stringify(payload),
    };

    try {
      const midtransRes = await fetch(url, options);
      const data = await midtransRes.json();
      return data;
    } catch (err) {
      return err;
    }
  },

  notification: async (data) => {
    const { order_id, transaction_status, fraud_status } = data;
    const serverKey = process.env.SERVER_KEY;

    if (transaction_status === "pending") return;

    if (transaction_status === "caputre" && fraud_status !== "accept") return;

    if (!verifyMidtransSignature(data, serverKey))
      throw throwError(200, "Invalid MidTrans Siganture Key");

    const payment = {
      id: Number(order_id.split("-")[0]),
      midtrans_id: data.transaction_id,
      amount: Number(data.gross_amount),
      updated_at: new Date(data.transaction_time),
      status: data.transaction_status,
    };

    return payment;
  },
};

function verifyMidtransSignature(notificationBody, serverKey) {
  const { order_id, status_code, gross_amount, signature_key } =
    notificationBody;
  const payload = order_id + status_code + gross_amount + serverKey;
  const hash = crypto.createHash("sha512").update(payload).digest("hex");
  return hash === signature_key;
}
