import axios from 'axios';
import {message} from 'antd';
// import { Toast, Modal } from 'zarm';
// import router from 'umi/router';

export const apiPrefix = {
  
};

// create an axios instance
const service = axios.create({
  timeout: 30 * 1000,
});

// request interceptor
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    console.log('/request.js [17]--1',token);
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => {
    // do something with request error
    /* eslint-disable */
    // console.log(error) // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.status === 200) {
      const { data = {} } = response;
      // 登出设备的提示
      return Promise.resolve(data);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    console.log('/request.js [117]--1', 'response-error', error.response);
    const {data} = error.response;
    message.error(`${data.code} : ${data.msg}`)
    return Promise.reject(error.response);
  },
);

export default function(config) {
  const { serve, method, data, ...rest } = config;
  const options = {
    baseURL: `http://127.0.0.1:3000/${serve}`,
    method,
    // 给get接口加时间戳，防止缓存
    [method === 'GET' ? 'params' : 'data']: method === 'GET' ? { ...data, t: Date.now() } : data,
    ...rest,
  };
  return service.request(options);
}
