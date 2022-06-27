import deletePerubahan from './deletePerubahan';
import deleteRencana from './deleteRencana';
import registerProject from './registerProject';
import saveKomentar from './saveKomentar';
import savePerubahan from './savePerubahan';
import saveProject from './saveProject';
import saveRencana from './saveRencana';

export const MUTATIONS = {};
export const AUTH_MUTATIONS = {
  'register-project': registerProject,
  'save-project': saveProject,
  'save-perubahan': savePerubahan,
  'delete-perubahan': deletePerubahan,
  'save-komentar': saveKomentar,
  'save-rencana': saveRencana,
  'delete-rencana': deleteRencana,
};
