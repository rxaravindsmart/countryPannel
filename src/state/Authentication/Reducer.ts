import update from "immutability-helper";
import { AuthReduxActions } from "./Action";

export interface IUser {
  userName: string;
  password: string;
  isUserSignedIn: boolean;
}
export interface AuthState {
  userList: IUser[];
  activeUser: IUser;
}

const authState: AuthState = {
  userList: [],
  activeUser: {
    userName: "",
    password: "",
    isUserSignedIn: false,
  },
};

const AuthStateReducer = (state = authState, action: any): AuthState => {
  switch (action.type) {
    case AuthReduxActions.AUTH_SET_SIGN_UP_STATUS:
      return update(state, {
        $merge: {
          ...state,
          userList: [...action.payload],
        },
      });

    case AuthReduxActions.AUTH_ACTIVE_USER:
      return update(state, {
        $merge: {
          ...state,
          activeUser: { ...action.payload },
        },
      });

    case AuthReduxActions.SIGN_OUT:
      return update(state, {
        $merge: {
          ...authState,
        },
      });

    default:
      return state;
  }
};

export default AuthStateReducer;
