import { Router, Request, Response } from 'express';
import { mailTransporterConnect } from '@/middleware';

const router = Router().use(mailTransporterConnect);

export const sendMail = async (req: Request, res: Response) => {
    try {
        await req.mailTransporter.sendMail({
            from: '"Fred Foo 👻" <phucpham.infinity@gmail.com>', // sender address
            to: "phuc.pxp@gmail.com", // list of receivers
            subject: "Hello 2 ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
  return res.status(200).json({ status: 'ok' });
};

router.route('/send-mail').post(sendMail);

export default router;
