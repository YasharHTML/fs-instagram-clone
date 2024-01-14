import { createJwt } from "../providers/jwt";
import { mailer } from "../providers/mailer";

export function sendMail(userId: string, email: string) {
    const jwt = createJwt(userId);

    return mailer.sendMail({
        from: process.env.NODEMAILER_USERNAME,
        to: email,
        subject: "Password Reset Email",
        text: `I heard you forgot password, here is a reset link
        ${process.env.MAIN_URL}?token=${jwt}`,
    });
}
