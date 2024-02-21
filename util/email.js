const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bibokim6@gmail.com', 
      pass: 'bohszawaubyjodqg', 
    },
  });
  
  const sendEmail = (name, email, message, recipientEmail) => {
    const mailOptions = {
      from: 'bibokim6@gmail.com', 
      to: recipientEmail,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
  
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  };
  
  module.exports = { sendEmail };
