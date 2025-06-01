export enum ApplicationReduxActions {
  SET_COUNTRY_LISTS = "SET_COUNTRY_LISTS",
}

const setCountryList = (payload: any): any => ({
  type: ApplicationReduxActions.SET_COUNTRY_LISTS,
  payload,
});

export const ApplicationActions = {
  setCountryList,
};
