import { defineStore } from 'pinia';
import { loginApi, getUserInfoApi } from '@/api/user';
import { ss } from '../../utils/cache/index';
// import { useMessage } from '@/hooks/web/useMessage';
// const { createNotification } = useMessage();
import { usePermissionStore } from './permission';
import { router } from '../../router';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: null,
      roleList: [],
      //登录是否过期
      sessionTimeout: false,
    };
  },
  getters: {
    getToken() {
      return this.token;
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
      ss.set('token', token);
    },
    setUserInfo(info) {
      this.userInfo = info;
    },
    setRoleList(roles) {
      this.roleList = roles;
    },
    setSessionTimeout(flag) {
      this.sessionTimeout = flag;
    },
    async login(data) {
      let res = await loginApi(data);
      let { token } = res.data;
      this.setToken(token);
      return await this.afterLoginAction();
    },
    async afterLoginAction() {
      const permissionStore = usePermissionStore();

      if (!this.token) return null;
      //获取用户信息
      let userInfo = await this.getUserInfoAction();
      //获取权限
      let routes = await permissionStore.buildRoutesAction();
      routes.forEach(route => {
        router.addRoute(route);
      });
      await router.replace('/');
      return userInfo;
    },
    async getUserInfoAction() {
      if (!this.getToken) return null;
      let { data: userInfo } = await getUserInfoApi();
      let { roles = [] } = userInfo;
      if (Array.isArray(roles)) {
        this.setRoleList(roles);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
  },
});
