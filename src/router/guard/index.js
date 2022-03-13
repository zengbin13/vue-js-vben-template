import { router } from '../index';
import { LOGIN_PATH } from '../constant';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/permission';

//路由白名单
const whiteList = [LOGIN_PATH];

export function setupRouterGuard() {
  createPermissionGuard();
}

function createPermissionGuard() {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  router.beforeEach((to, form, next) => {
    const token = userStore.token;
    console.log('token', token);
    if (whiteList.includes(to.path)) {
      if (to.path == LOGIN_PATH && token) {
        console.log('自动登录逻辑');
      }
      next();
      return;
    }
    //不存在token
    if (!token) {
      // 重定向登录页面
      const redirectData = { replace: true, path: LOGIN_PATH };
      if (to.path) redirectData.query = { redirect: to.path };
      next(redirectData);
      return;
    }
    next();
  });
}
