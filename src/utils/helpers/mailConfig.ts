import nodemailer from 'nodemailer';


// Configure the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sksharujan27@gmail.com', // Your email address
    pass: 'ucli tkpd npem praw', // Your email password or app password
  },
});

// Function to send OTP email
const mailConfig = async (email: string, otp: string): Promise<void> => {
    console.log('email', email);
  try {
    await transporter.sendMail({
      from: 'sksharujan27@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP email');
  }
};

export default mailConfig;
