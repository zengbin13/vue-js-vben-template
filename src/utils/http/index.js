import axios from 'axios';
import { useMessage } from '@/hooks/web/useMessage';

const { createNotification, createErrorModal } = useMessage();
import { ss } from '../../utils/cache/index';

const service = axios.create({
  baseURL: '/',
  timeout: 6000,
});

service.interceptors.request.use(
  // data中配置错误弹窗 errorMessageMode = message | modal | none
  config => {
    // 设置默认的错误弹窗
    if (!config.data) config.data = {};
    if (!config.data.errorMessageMode) {
      config.data.errorMessageMode = 'message';
    }
    //添加token
    config.headers.authorization = ss.get('token', '');
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => {
    let options = JSON.parse(response.config.data);
    const { code, message } = response.data;
    // if (code == 1) {
    //   throw new Error(message);
    // }
    if (code == 1 && options.errorMessageMode == 'modal') {
      createErrorModal(message);
    }
    if (code == 1 && options.errorMessageMode == 'message') {
      createNotification.error();
    }
    return response.data;
  },
  err => {
    return Promise.reject(err);
  }
);

export default service;
