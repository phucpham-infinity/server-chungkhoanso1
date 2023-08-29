import { NextFunction, Request } from 'express';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export async function mailTransporterConnect(request: Request, _, next: NextFunction) {
  try {
    const CLIENT_ID = '437711522760-j9usah9n6e3ceh47td6peo26impbib92.apps.googleusercontent.com';
    const CLIENT_SECRET = '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';
    const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04vTpcd769ynYCgYIARAAGAQSNwF-L9Ir3WDHL9FJwXLOph9XsZ7wZbS_g2m-iaPAKeBOtesXvW7P4KPcWbv0O2dpbQ8kvz2rerM';

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      //@ts-ignore
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'phucpham.infinity@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    request.mailTransporter = transporter;
  } catch (error) {
    console.log('error', error);
  }
  next();
}
