const nodemailer = require('nodemailer');

const account = 'email@email.com';

const transporter = nodemailer.createTransport ({
  service: 'hotmail',
  auth: {
    user: account,
    pass: 'password'
  }
});

const sendEmail = (produtos) => {
  const mailOptions = {
    from: account,
    to: account,
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
