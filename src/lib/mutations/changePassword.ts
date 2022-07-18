import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import cuid from 'cuid';

export default async function changePassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, userId, token, password } = req.body;
    console.log(email, userId, token, password);

    // Since it is public api, lets check
    const found = await prisma.resetPassword.findFirst({
      where: { email, token },
    });
    console.log('FOUND', found);

    // Actually save new password
    const rs = await prisma.hash.update({
      where: { userId },
      data: {
        hash: bcrypt.hashSync(password),
      },
    });

    console.log(rs);

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
