import axios, { AxiosError } from "axios";
import { store } from "..";
import { getTokenLS } from "../ls";
const { dispatch } = store;
const axiosInstance: any = axios.create({ baseURL: "http://localhost:3500" });
axiosInstance.interceptors.request.use((request: any) => {
  request.headers.authorization = getToken();
  return request;
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);



function getToken() {
  return getTokenLS();
}
export default axiosInstance;
