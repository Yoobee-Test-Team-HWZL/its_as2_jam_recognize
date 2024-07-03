import axios from "axios";
import Pub from "@/utils/public";

// create axio instance
const service = axios.create({
  // api
  baseURL: "",
  // timeout
  timeout: 1000 * 60 * 1,
});

// error
const errorHandler = (error: any) => {
  // 对相应错误做点什么
  return Promise.reject(error);
};
// request
service.interceptors.request.use((config) => {
  return config;
}, errorHandler);

// response
service.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

// export
export default service;
