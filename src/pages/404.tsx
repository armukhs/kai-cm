import { withIronSessionSsr } from 'iron-session/next';
import { DefaultUser, sessionOptions, SessionUser } from 'lib/session';
import Layout from 'components/Layout/Layout';
import prisma from 'lib/db';
import Link from 'next/link';
import { Button } from '@mantine/core';

export default function Notfound() {
  return <h1>404</h1>;
}
