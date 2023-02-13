const nodemailer = require("nodemailer");
const basicConfig = require("../config/basicConfig");
module.exports = {
  sendEmail: async (senderEmail) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", //useing gmail
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: basicConfig.EMAIL_SEND_ID,
        pass: basicConfig.EMAIL_SEND_PASS,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    var mailOptions = {
      to: senderEmail,
      subject: "application accepted",
      html: "<h3>Your applicatin for submiting course is accepted </h3>", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }

      return true;
    });
  },
};
