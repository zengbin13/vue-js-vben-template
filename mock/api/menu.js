import { resuleSuccess, resuleError, getRequestToken } from '../_utils';
import { createFakeUserList } from './user';

const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'LAYOUT',
  children: [
    {
      path: '/dashboard',
    },
  ],
};

export default [
  {
    url: '/api/getMenuList',
    method: 'get',
    timeout: '1000',
    response: ({ headers }) => {
      let token = getRequestToken(headers);
      if (!token) return resuleError('无效的token');
      let checkUser = createFakeUserList().find(user => user.token == token);
      if (!checkUser) return resuleError('查无此用户');
      let routes = [];
      switch (checkUser.userId) {
        case '1':
          routes = [dashboardRoute];
          break;
        case '2':
          routes = [dashboardRoute];
          break;
        default:
          break;
      }
      return resuleSuccess(routes);
    },
  },
];
