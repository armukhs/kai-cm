import deletePerubahan from './deletePerubahan';
import deleteRencana from './deleteRencana';
import registerProject from './registerProject';
import saveAnalisis from './saveAnalisis';
import saveKomentar from './saveKomentar';
import saveMentor from './saveMentor';
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
  'save-analisis': saveAnalisis,
  'save-mentor': saveMentor,
};
