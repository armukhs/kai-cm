import checkEmail from './checkEmail';
import checkJabatan from './checkJabatan';
import checkNipp from './checkNipp';
import getAdminProjects from './getAdminProjects';
import getAnalisis from './getAnalisis';
import getInvitation from './getInvitation';
import getInvitations from './getInvitations';
import getKesiapan from './getKesiapan';
import getKomentar from './getKomentar';
import getOrganization from './getOrganization';
import getPerubahan from './getPerubahan';
import getProgress from './getProgress';
import getProgressIndex from './getProgressIndex';
import getProject from './getProject';
import getProjects from './getProjects';
import getRencana from './getRencana';
import getResetPassword from './getResetPassword';
import getUsers from './getUsers';

export const QUERIES = {
  invitation: getInvitation,
  organisasi: getOrganization,
  'reset-password': getResetPassword,
};
export const AUTH_QUERIES = {
  'admin-projects': getAdminProjects,
  project: getProject,
  perubahan: getPerubahan,
  komentar: getKomentar,
  analisis: getAnalisis,
  kesiapan: getKesiapan,
  rencana: getRencana,
  projects: getProjects,
  progress: getProgress,
  users: getUsers,
  invitations: getInvitations,
  'check-nipp': checkNipp,
  'check-email': checkEmail,
  'check-jabatan': checkJabatan,
  'progress-index': getProgressIndex,
};
