import getAnalisis from './getAnalisis';
import getKomentar from './getKomentar';
import getOrganization from './getOrganization';
import getPerubahan from './getPerubahan';
import getProject from './getProject';
import getProjects from './getProjects';
import getRencana from './getRencana';

export const QUERIES = {
  organisasi: getOrganization,
};
export const AUTH_QUERIES = {
  project: getProject,
  perubahan: getPerubahan,
  komentar: getKomentar,
  analisis: getAnalisis,
  rencana: getRencana,
  projects: getProjects,
};
