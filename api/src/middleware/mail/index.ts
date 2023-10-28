import { NextFunction, Request } from 'express';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export async function mailTransporterConnect(
  request: Request,
  _,
  next: NextFunction,
) {
  try {
    const CLIENT_ID =
      '437711522760-mqk8mhp9d71cfskmheq51rk6ib1jhba4.apps.googleusercontent.com';
    const CLIENT_SECRET =
      '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';
    const REDIRECT_URL =
      'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN =
      '1//04lefqJazk0dZCgYIARAAGAQSNwF-L9IrIqWmtcGZQvPeVn7UikN-J34tLatsfU4H_pKFx4VfUHTfRSuv8grqGr74GNGk0M7rstE';

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL,
    );

    oAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    });
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
