import nodemailer from "nodemailer";
const { google } = require('googleapis');
import l from "../../common/logger";
import { emailId} from "../../common/config";

// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

console.log({CLIENT_ID, CLEINT_SECRET})

// const CLIENT_ID = '749615250124-ae30a6299ss714vpcq4nktme5qc16nik.apps.googleusercontent.com';
// const CLEINT_SECRET = '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';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const REFRESH_TOKEN = '1//044fxK9w77C07CgYIARAAGAQSNwF-L9IrK-lsYQa2k1MV9qe_g4tWtEfqS9gE0VDZwEog1ClH_OTZhQMndJohE3BzfaGwMqHt984';



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
      
      console.log("sending OTP")
      let mailOptions = {
        from: 'mygrades001@gmail.com',
        to: recipient,
        subject: `[MyGrades] Registration OTP`,
        text: `Hello!\nYour OTP for registering on MyGrades is ${otp}.`,
      };
      
      console.log("sending OTP1")
      
      this.triggerMail(mailOptions);
      
      console.log("sending OTP2")
    } catch (err) {
      l.error("[SEND OTP]", err, eventName);
      throw err;
    }
  }
  
  async triggerMail(mailOptions) {
    try {
      const response = await this.transporter.sendMail(mailOptions);
      console.log(response)
    } catch (err) {
      throw err;
    }
  }
}

export default new MailerService(accessToken);
