import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';
import generatorPassword from 'generate-password';
import fs from 'fs';
import ejs from 'ejs';
import juice from 'juice';

export const resetPassword = async (
  req: Request,
  res: Response,
) => {
  const userId = req.params.userId as string;
  const password = generatorPassword.generate({
    length: 10,
    numbers: true,
  });
  const passwordHash = await req.hashPassword(password);

  const data = await req.knexClient
    .from('users')
    .where({
      id: userId,
    })
    .first();

  if (!data)
    return res.status(BAD_REQUEST).json({
      statusCode: BAD_REQUEST,
      err: 'User not found!',
    });

  const [user2, err2] = await req.knex(knex =>
    knex('users').where({ id: userId }).update({
      password: passwordHash,
      updated_at: new Date(),
    }),
  );

  if (err2)
    return res.status(BAD_REQUEST).json({
      statusCode: BAD_REQUEST,
      err: err2?.message,
    });

  const email = data.email;
  // TODO: SEND EMAIL FOR USER
  try {
    const templatePath = `./templates/welcome.html`;
    const template = fs.readFileSync(templatePath, 'utf-8');

    if (templatePath && fs.existsSync(templatePath)) {
      const html = ejs.render(template, {
        email,
        password: password,
      });
      const htmlWithStylesInlined = juice(html);
      await req.mailTransporter.sendMail({
        from: '"📈 chungkhoanso1.com" <phucpham.infinity@gmail.com>', // sender address
        to: email,
        subject: '🎉 Cấp mật khẩu mới!',
        html: htmlWithStylesInlined,
      });
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: reset-password.ts:62 ~ error:',
      error,
    );
    return res.status(400).json({ error: error.message });
  }
  return res
    .status(OKE)
    .json({ statusCode: 200, data: user2 });
};
