import { resuleSuccess, resuleError } from '../_utils';

function createFakeUserList() {
  return [
    {
      username: 'test',
      password: '123456',
      token: 'faketoken1',
    },
    {
      username: 'admin',
      password: '123456',
      token: 'faketoken2',
    },
  ];
}

export default [
  {
    url: '/api/login',
    method: 'post',
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
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise(resolve => {
        req.on('data', chunk => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
];
