import nodemailer from 'nodemailer';
import { SENDER_EMAIL, SENDER_EMAIL_PASSWORD } from '../config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_EMAIL_PASSWORD,
  },
});

const resetPassword = (email: string, token: string) => ({
  to: email,
  subject: 'Reset password',
  html: `
      <h1>Reset password</h1>
      <p>Click <a href="http://localhost:3000/reset-password/?token=${token}">here</a> to reset your password</p>`,
});

export const send_email = (email: string, token: string) =>
  transporter.sendMail(resetPassword(email, token));
