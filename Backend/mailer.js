const { google } = require("googleapis");
const nodemailer = require("nodemailer");

/*POPULATE BELOW FIELDS WITH YOUR CREDETIALS*/

const CLIENT_ID = "259448192726-5qedc2ch9j01398coccgjke9rctn0757.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04s4YG93COfjJCgYIARAAGAQSNwF-L9Ir8VLsCkAqWWVdnjy14Kg1R72k9Dl2-8EWRbFG63ZeczD027nv5aenBL1pqC-vvO0x_Og";
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; //DONT EDIT THIS
const MY_EMAIL = "mariarifa2018@gmail.com";

/*POPULATE ABOVE FIELDS WITH YOUR CREDETIALS*/

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//YOU CAN PASS MORE ARGUMENTS TO THIS FUNCTION LIKE CC, TEMPLATES, ATTACHMENTS ETC. IM JUST KEEPING IT SIMPLE
const sendTestEmail = async (to) => {
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MY_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  //EMAIL OPTIONS
  const from = MY_EMAIL;
  const subject = "🚉 This Is Sent By BongoJourney 🚉";
  const html = `
    <p>Assalamualikum ${to},</p>
    <p>🚉 This Is A Test Mail Sent By BongoJourney 🚉</p>
    <p>Thank you</p>
    `;
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, to, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

module.exports = { sendTestEmail };