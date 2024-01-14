import { createTransport } from "nodemailer";

export const mailer = createTransport({
    service: "gmail",
    host: process.env.NODEMAILER_HOSTNAME,
    auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});
