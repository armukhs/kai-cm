// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session';

export type SessionUser = {
  isLoggedIn: boolean;
  id: string;
  unitId: string;
  kodeUnit: string;
  unit: string;
  jabatanId: string;
  kodeJabatan: string;
  jabatan: string;
  nipp: string;
  email: string;
  nama: string;
  roles: string;
};

export const DefaultUser = {
  isLoggedIn: false,
  id: '',
  unitId: '',
  kodeUnit: '',
  unit: '',
  jabatanId: '',
  kodeJabatan: '',
  jabatan: '',
  nipp: '',
  email: '',
  nama: '',
  roles: '',
};

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: process.env.COOKIE_NAME as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: SessionUser;
  }
}
