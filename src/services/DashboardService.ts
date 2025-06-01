import axios from "axios";

const getCountryList = (): Promise<any[]> => {
  return axios
    .get("https://restcountries.com/v2/all?fields=name,region,flag")
    .then((response) => response.data);
};

export const DashboardService = { getCountryList };
