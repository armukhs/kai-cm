import getKomentar from './getKomentar';
import getOrganization from './getOrganization';
import getPerubahan from './getPerubahan';
import getProject from './getProject';

export const QUERIES = {
  organisasi: getOrganization,
};
export const AUTH_QUERIES = {
  project: getProject,
  perubahan: getPerubahan,
  komentar: getKomentar,
};
