import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, verificationCode: string) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Your verification code is: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
