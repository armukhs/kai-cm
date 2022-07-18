import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import nodemailer from 'nodemailer';
import cuid from 'cuid';

export default async function forgotPassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, baseUrl } = req.body;
    console.log(email, baseUrl);

    const rs = await prisma.user.findFirst({
      where: { email },
    });

    if (!rs) return res.status(404).json({ message: 'Not Found' });

    const rs2 = await prisma.resetPassword.create({
      data: {
        userId: rs.id,
        email,
        baseUrl,
        token: cuid(),
      },
    });

    console.log(rs2);

    const transport = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const verifyPath = '/token';
    const path = baseUrl + verifyPath;

    var mailOptions = {
      from: '"KAI Mail" <ptkj@hotmail.com>',
      to: email,
      subject: 'KAI-CM Reset Password',
      text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
      html: htmlEmail(path, rs2.token),
    };

    const mailrs = await transport.sendMail(mailOptions);
    console.log(Date.now(), mailrs);
    res.json({ message: 'OK' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

function htmlEmail(path: string, token: string) {
  return `
    <p>Terimasih atas minat Anda untuk mencoba Aces.</p>
    <p>Kami telah menyiapkan halaman khusus bagi Anda untuk membuat password. Silakan klik tautan di bawah ini:</p>
    <p><a href="${path}/${token}">Klik disini untuk login.</a></p>
    <p>Tautan tersebut berlaku selama 48 jam sejak Anda melakukan sign-up.</p>
  `;
}
