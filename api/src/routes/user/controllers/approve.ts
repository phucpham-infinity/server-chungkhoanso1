import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';
import generatorPassword from 'generate-password';
import fs from 'fs';
import ejs from 'ejs';
import juice from 'juice';

export const approveUser = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  const email = req.body.email as string;
  if (!userId || !email) return res.status(400).json({ error: 'user id or email invalid' });

  const default_password = generatorPassword.generate({
    length: 10,
    numbers: true,
  });
  const password = await req.hashPassword(default_password);

  const [user2, err2] = await req.knex(knex =>
    knex('students').where({ id: userId }).update({ password, default_password, status: 'APPROVED', approve_at: new Date(), updated_at: new Date() }),
  );

  if (err2) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: err2?.message });
  // TODO: SEND EMAIL FOR USER
  try {
    const templatePath = `./templates/welcome.html`;
    const template = fs.readFileSync(templatePath, 'utf-8');

    if (templatePath && fs.existsSync(templatePath)) {
      const html = ejs.render(template, { email, password: default_password });
      const htmlWithStylesInlined = juice(html);
      await req.mailTransporter.sendMail({
        from: '"📈 chungkhoanso1.com" <phucpham.infinity@gmail.com>', // sender address
        to: email, // list of receivers
        subject: '🎉 Thanh toán thành công!', // Subject line
        html: htmlWithStylesInlined, // html body
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(OKE).json({ statusCode: 200, data: user2 });
};
