const nodemailer = require("nodemailer");

const { UN_PASS, UN_USER, UN_SERVER, UN_PORT } = process.env;

const sendMail = async (emailList, letter) => {
  const config = {
    host: UN_SERVER,
    port: UN_PORT,
    secure: true,
    auth: {
      user: UN_USER,
      pass: UN_PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: UN_USER,
    to: emailList,
    subject: "JustEmail",
    html: letter,
  };
  try {
    await transporter.sendMail(emailOptions);
    return;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = sendMail;
