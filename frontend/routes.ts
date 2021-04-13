import { Flow } from '@vaadin/flow-frontend';
import { Commands, Context, Route } from '@vaadin/router';
import './views/main/main-view';
import {isLoggedIn} from "Frontend/views/login/auth";

const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

export type ViewRoute = Route & { title?: string; children?: ViewRoute[] };

export const views: ViewRoute[] = [
  {
    path: '/login',
    component: 'login-view',
    title: 'Login',
    action: async () => {
      await import('./views/login/login-view');
    },
  },
  // for client-side, place routes below (more info https://vaadin.com/docs/v19/flow/typescript/creating-routes.html)
  {
    path: 'card-list',
    component: 'card-list-view',
    title: 'Card List',
    // action: async () => {
    //   await import('./views/cardlist/card-list-view');
    // },
    action: (_: Context, commands: Commands) => {
      if (!isLoggedIn()) {
        return commands.redirect('/login');
      }
      return undefined;
    },
  },
  {
    path: 'master-detail',
    component: 'master-detail-view',
    title: 'Master-Detail',
    action: async () => {
      await import('./views/masterdetail/master-detail-view');
    },
  },
  {
    path: 'dashboard',
    component: 'dashboard-view',
    title: 'Dashboard',
    action: async () => {
      await import('./views/dashboard/dashboard-view');
    },
  },
  {
    path: 'list',
    component: 'list-view',
    title: 'List',
    action: async () => {
      await import('./views/list/list-view');
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-view',
    children: [
      ...views,
      // for server-side, the next magic line sends all unmatched routes:
      ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
    ],
  },
];
