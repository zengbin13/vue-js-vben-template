import http from '@/utils/http';

export function loginApi(data) {
  return http.post('/api/login', {
    ...data,
    // errorMessageMode: 'modal',
  });
}
