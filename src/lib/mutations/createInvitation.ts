import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import nodemailer from 'nodemailer';
import cuid from 'cuid';

export default async function createInvitation(req: NextApiRequest, res: NextApiResponse) {
  // console.log(Date.now());
  console.log(req.body);

  try {
    const { fromName, fromEmail, nama, nipp, email, jabatan, jabatanId, roles, unitId, baseUrl } =
      req.body;
    const token = cuid();
    const rs = await prisma.invitation.create({
      data: {
        fromName: fromName,
        fromEmail: fromEmail,
        nama: nama,
        nipp: nipp,
        email: email,
        jabatan: jabatan,
        jabatanId: jabatanId,
        unitId: unitId,
        roles: roles,
        token: token,
      },
    });

    // Early respond
    res.json(rs);

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
      subject: 'KAI Nodemailer',
      text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
      html: htmlEmail(path, token),
    };

    const mailrs = await transport.sendMail(mailOptions);
    console.log(Date.now(), mailrs);

    // res.json(mailrs);
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
