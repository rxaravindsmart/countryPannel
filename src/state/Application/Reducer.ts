import update from "immutability-helper";
import { ApplicationReduxActions } from "./Action";

export interface ApplicationState {
  name: string;
  region: string;
  flag: string;
  independent: boolean;
}

const applicationState: ApplicationState = {
  name: "",
  region: "",
  flag: "",
  independent: false,
};

const ApplicationStateReducer = (
  state = applicationState,
  action: any
): ApplicationState => {
  switch (action.type) {
    case ApplicationReduxActions.SET_COUNTRY_LISTS:
      return update(state, {
        $merge: {
          ...action.payload,
        },
      });

    default:
      return state;
  }
};

export default ApplicationStateReducer;
