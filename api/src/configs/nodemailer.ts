import nodemailer from 'nodemailer';

export const nodemailerInit = async () => {
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '_mainaccount@chungkhoanso1.com', // generated ethereal user
      pass: 'iN3@TdV6CKMabNN', // generated ethereal password
    },
  });
};
