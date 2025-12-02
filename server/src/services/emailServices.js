import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"PlanYourFuture" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text
    });
    console.log(`Email sent to ${to}: ${subject}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
