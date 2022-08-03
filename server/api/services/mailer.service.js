import nodemailer from "nodemailer";
const { google } = require('googleapis');
import logger from "../../common/logger";

// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;



const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
  );
  
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

let accessToken
  
(async()=>{
  accessToken = await oAuth2Client.getAccessToken();
})()

class MailerService {
  
  
  constructor (_accessToken){
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'mygrades001@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: _accessToken,
      },
    });
  }
  
  async sendOTP(recipient, otp) {
    try {
      
      let mailOptions = {
        from: 'mygrades001@gmail.com',
        to: recipient,
        subject: `[MyGrades] Registration OTP`,
        text: `Hello!\nYour OTP for registering on MyGrades is ${otp}.`,
      };
      
      
      this.triggerMail(mailOptions);
      
    } catch (err) {
      logger.error("[SEND OTP]", err, eventName);
      throw err;
    }
  }
  
  async triggerMail(mailOptions) {
    try {
      const response = await this.transporter.sendMail(mailOptions);
    } catch (err) {
      throw err;
    }
  }
}

export default new MailerService(accessToken);
