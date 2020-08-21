import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "rafaeldecarvalho.ps@gmail.com",
    pass: "Rafa2404"
  },
  tls: {
    rejectUnauthorized: false,
  }
});