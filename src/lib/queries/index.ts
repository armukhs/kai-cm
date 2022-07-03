import checkEmail from './checkEmail';
import checkJabatan from './checkJabatan';
import checkNipp from './checkNipp';
import getAdminProjects from './getAdminProjects';
import getAnalisis from './getAnalisis';
import getInvitations from './getInvitations';
import getKomentar from './getKomentar';
import getOrganization from './getOrganization';
import getPerubahan from './getPerubahan';
import getProgress from './getProgress';
import getProgressIndex from './getProgressIndex';
import getProject from './getProject';
import getProjects from './getProjects';
import getRencana from './getRencana';
import getUsers from './getUsers';

export const QUERIES = {
  organisasi: getOrganization,
};
export const AUTH_QUERIES = {
  'admin-projects': getAdminProjects,
  project: getProject,
  perubahan: getPerubahan,
  komentar: getKomentar,
  analisis: getAnalisis,
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
