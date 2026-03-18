import nodemailer from 'nodemailer';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first'); // 🔥 important

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('EMAIL_USER and EMAIL_PASS must be set');
  }

  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    family: 4, // 🔥 force IPv4
    auth: { user, pass },
    connectionTimeout: 10000, // 🔥 prevent hanging
  });

  return transporter;
}

export async function sendOtpEmail({ to, otp }) {
  const t = getTransporter();

  const subject = 'Your Login Code';
  const text = `Your OTP is ${otp}. It will expire in 5 minutes.`;

  await t.sendMail({
    from: `"DawaTime" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
}