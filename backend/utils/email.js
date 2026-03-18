import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail({ to, otp }) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [to],
      subject: 'Your Login Code',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Email failed');
    }

    console.log('✅ Email sent via Resend:', data?.id);
  } catch (err) {
    console.error('❌ Resend send failed:', err);
    throw err;
  }
}