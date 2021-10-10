import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import merge from 'lodash/merge';
import queryString from 'query-string';
import { store } from 'src/app/store';

const axiosClient = axios.create({
  baseURL: '',
  timeout: 10000,
  timeoutErrorMessage: 'Quá thời gian kết nối',
  paramsSerializer: parmas => queryString.stringify(parmas),
});

const configure = (config: AxiosRequestConfig = {}): AxiosRequestConfig => {
  const token = store.getState().auth.token;
  const targetConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return merge(targetConfig, config);
};

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return configure(config);
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return { status: response.status, ...response.data };
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosClient;
