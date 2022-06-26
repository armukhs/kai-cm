import deletePerubahan from './deletePerubahan';
import registerProject from './registerProject';
import savePerubahan from './savePerubahan';
import saveProject from './saveProject';

export const MUTATIONS = {};
export const AUTH_MUTATIONS = {
  'register-project': registerProject,
  'save-project': saveProject,
  'save-perubahan': savePerubahan,
  'delete-perubahan': deletePerubahan,
};
