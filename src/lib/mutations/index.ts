import activateUser from './activateUser';
import changePassword from './changePassword';
import confirmProgress from './confirmProgress';
import confirmRencana from './confirmRencana';
import createInvitation from './createInvitation';
import deactivateUser from './deactivateUser';
import deletePerubahan from './deletePerubahan';
import deleteRencana from './deleteRencana';
import forgotPassword from './forgotPassword';
import newUser from './newUser';
import registerProject from './registerProject';
import resendInvitation from './resendInvitation';
import saveAnalisis from './saveAnalisis';
import saveKomentar from './saveKomentar';
import saveMentor from './saveMentor';
import savePerubahan from './savePerubahan';
import saveProgress from './saveProgress';
import saveProject from './saveProject';
import saveRencana from './saveRencana';
import updatePassword from './updatePassword';
import updateProfile from './updateProfile';

export const MUTATIONS = {
  'new-user': newUser,
  'forgot-password': forgotPassword,
  'change-password': changePassword,
};
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
  'update-profile': updateProfile,
  'update-password': updatePassword,
  'save-progress': saveProgress,
  'activate-user': activateUser,
  'deactivate-user': deactivateUser,
  'create-invitation': createInvitation,
  'resend-invitation': resendInvitation,
  'confirm-rencana': confirmRencana,
  'confirm-progress': confirmProgress,
};
