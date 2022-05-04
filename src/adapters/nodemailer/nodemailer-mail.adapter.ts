import nodemailer from "nodemailer";

import { MailAdapter, SendmailAdapterDto } from "../models/mailer.adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3105bb9612f384",
    pass: "1e72bc9bc08668",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendmailAdapterDto) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Pedro Santos <pedrohenry.viana@gmail.com>",
      subject,
      html: body,
    });
  }
}
