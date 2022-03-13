import { resuleSuccess, resuleError, getRequestToken } from '../_utils';

export function createFakeUserList() {
  return [
    {
      username: 'test',
      password: '123456',
      token: 'faketoken1',
      userId: '1',
      realName: 'Vben Admin',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      username: 'admin',
      password: '123456',
      token: 'faketoken2',
      userId: '2',
      realName: 'test user',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
      desc: 'tester',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
      const { username, password } = body;
      let checkUser = createFakeUserList().find(
        user => user.username == username && user.password == password
      );
      if (!checkUser) return resuleError('密码或者用户名出错');
      delete checkUser.password;
      return resuleSuccess(checkUser);
    },
  },
  {
    url: '/api/userInfo',
    method: 'get',
    timeout: 2000,
    response: ({ headers }) => {
      console.log(headers, 'headers');
      let token = getRequestToken(headers);
      let checkUser = createFakeUserList().find(user => user.token == token);
      if (!checkUser) return resuleError('查无此用户');
      delete checkUser.password;
      return resuleSuccess(checkUser);
    },
  },
];
