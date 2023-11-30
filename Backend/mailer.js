const { google } = require("googleapis");
const nodemailer = require("nodemailer");

/*POPULATE BELOW FIELDS WITH YOUR CREDETIALS*/

const CLIENT_ID = "259448192726-5qedc2ch9j01398coccgjke9rctn0757.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04eqOYivR1fWBCgYIARAAGAQSNwF-L9IrZiM4a-HaGP6gGcFey4v1qjK-PR12x6kd58JvBqkjOsTAAKxAWK5D_zU_9eJ5miXa6mk";
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
  const subject = "This Is Sent By BongoJourney";
  const html = `
    <p>Dear ${to},</p>
    <p>Welcome to BongoJourney.</p>
    <p>Thank you for joining BongoJourney.</p>
    `;
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, to, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

module.exports = { sendTestEmail };