import axios from "./axios";

// API Link
const BASE_URL = process.env.REACT_APP_BASE_URL;

// =================================
interface PredictParams {
  file: File;
  // 添加其他需要的参数
}
// post
export function uploadFileForPrediction(formData: PredictParams) {
  return axios({
    // url: 'https://test-api.juhaokanya.com/api/user/config_name_new',
    url: BASE_URL + "predict",
    method: "post",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
