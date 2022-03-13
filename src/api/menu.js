import http from '@/utils/http';

export function getMenuListApi() {
  return http.get('/api/getMenuList');
}
