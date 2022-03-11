import { defineStore } from 'pinia';
import { loginApi } from '@/api/user';
import { ss } from '../../utils/cache/index';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: null,
    };
  },
  actions: {
    setToken(token) {
      this.token = token;
      ss.set('token', token);
    },
    async login(data) {
      let res = await loginApi(data);
      let { token } = res.data;
      this.setToken(token);
    },
    getUserInfo() {},
  },
});
