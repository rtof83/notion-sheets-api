const nodemailer = require('nodemailer')
const { EMAIL_ACCOUNT, EMAIL_PASS } = require('./config')

const transporter = nodemailer.createTransport ({
  service: 'hotmail',
  auth: {
    user: EMAIL_ACCOUNT,
    pass: EMAIL_PASS
  }
});

const sendEmail = (produtos) => {
  const mailOptions = {
    from: EMAIL_ACCOUNT,
    to: EMAIL_ACCOUNT,
    subject: 'Atenção! Verifique o estoque dos produtos abaixo',
    text: produtos
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendEmail
