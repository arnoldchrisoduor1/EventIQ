import nodemailer from "nodemailer";
import dotenv from "dotenv";
const { VERIFICATION_EMAIL_TEMPLATE, WELCOME_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require('./emailTemplate.ts');

dotenv.config({ path: './src/.env' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Email credentials not found in environment variables');
}

export const sendVerificationEmail = async(email: string, verificationToken: string) => {
    const recepient = [email];

    try {
        const info = await transporter.sendMail({
            from:'"Digital Wilderness" <digitalwilderness9@gmail.com>',
            to: recepient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        });

        console.log('Verification Email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

export const sendWelcomeEmail = async (email: string) => {
    const recipient = [email];
  
    try {
      const info = await transporter.sendMail({
        from: '"Digital Wilderness" <digitalwilderness9@gmail.com>',
        to: recipient,
        subject: "Welcome",
        text: "Your email has been successfully verified",
        html: WELCOME_TEMPLATE
      });
  
      console.log('Welcome Email sent successfully: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }
  
  export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    const recipient = [email];
  
    try {
      const info = await transporter.sendMail({
        from: '"Digital Wilderness" <digitalwilderness9@gmail.com>',
        to: recipient,
        subject: "Password Reset",
        text: "Follow the following instructions to reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      });
      console.log('Reset Email sent successfully: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  
  export const sendResetSuccessEmail = async(email: string) => {
    const recipient = [ email ];
  
    try {
      const info = await transporter.sendMail({
        from: '"Digital Wilderness" <digitalwilderness9@gmail.com>',
        to: recipient,
        subject: "Password Reset",
        text: "Follow the following instructions to reset your password",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE
      });
      console.log('Password Reset Email sent successfully: %s', info.messageId);
      return info;
    } catch(error) {
      console.error("Error Sending email", error);
      throw error;
    }
  }
  