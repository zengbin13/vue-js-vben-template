import { ElNotification, ElMessageBox } from 'element-plus';

const createNotification = {
  // success、warning、info 和error
  success: options => ElNotification.success(options),
  warning: options => ElNotification.warning(options),
  info: options => ElNotification.info(options),
  error: options => ElNotification.error(options),
};

const createErrorModal = message => {
  ElMessageBox({
    type: 'error',
    title: '错误提示',
    message: message || '出现错误',
    confirmButtonText: '确认',
  });
};

export function useMessage() {
  return {
    createNotification,
    createErrorModal,
  };
}
