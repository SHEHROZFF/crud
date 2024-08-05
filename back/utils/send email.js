// const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Create a transporter object using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});


// Send OTP email function
const sendEmail = async (email, otp) => {
  // console.log(`Generated OTP: ${otp}`); // For debugging

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return otp; // Return OTP for validation purposes
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = { sendEmail };
