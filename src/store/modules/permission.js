import { defineStore } from 'pinia';
import { getMenuListApi } from '@/api/menu';

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      //是否已动态添加路由
      isDynamicAddedRoute: false,
    };
  },
  getters: {},
  actions: {
    async buildRoutesAction() {
      let { data: asyncRouteList } = await getMenuListApi();
      return asyncRouteList;
    },
  },
});
