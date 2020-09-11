const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: sails.config.mail.SESSION_USER,
      pass: sails.config.mail.SESSION_PASS,
    },
  })
);
const otps = (to, token) => {
  return {
    from: sails.config.mail.SESSION_USER + '@gmail.com',
    to,
    subject: 'Check check OTP Code',
    text: `OTP Code is ${token}`,
  };
};
const sendMail = (userMail, token) => {
  const mailOptions = otps(userMail, token);
  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
