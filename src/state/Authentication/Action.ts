export enum AuthReduxActions {
  SIGN_OUT = "SIGN_OUT",
  AUTH_SET_SIGN_UP_STATUS = "AUTH_SET_SIGN_UP_STATUS",
  AUTH_ACTIVE_USER = "AUTH_ACTIVE_USER",
}

const setSignUpStatus = (payload: any): any => ({
  type: AuthReduxActions.AUTH_SET_SIGN_UP_STATUS,
  payload,
});

const doSignOut = (payload: any): any => ({
  type: AuthReduxActions.SIGN_OUT,
  payload,
});

const setActiveUser = (payload: any): any => ({
  type: AuthReduxActions.AUTH_ACTIVE_USER,
  payload,
});
export const AuthActions = {
  setSignUpStatus,
  doSignOut,
  setActiveUser,
};
