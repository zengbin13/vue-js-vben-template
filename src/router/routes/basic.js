import {
  HOME_PATH,
  LOGIN_PATH,
  LAYOUT,
  EXCEPTION_COMPONENT,
  PAGE_NOT_FOUND_NAME,
} from '../constant';

// root page
export const rootRoute = {
  path: '/',
  name: 'Root',
  redirect: HOME_PATH,
};

//login page
export const loginRoute = {
  path: LOGIN_PATH,
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue'),
};

//404 page
export const pageNotFoundRoute = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: '404',
  },
  children: {
    path: '/:path(.*)*',
    name: PAGE_NOT_FOUND_NAME,
    component: EXCEPTION_COMPONENT,
  },
};

export const basicRoutes = [rootRoute, loginRoute, pageNotFoundRoute];
