import * as express from 'express';
import {authRouter} from './auth.router'
import {recordsRouter} from './records.router'
import {recordRouter} from './record.router'

export interface IRoute {
  url: string;
  router: express.Router;
}

export class ApiRouter {
  constructor(private router: express.Router, private routes: IRoute[]) {
    this.setupApiRoutes(routes);
  }

  get apiRouter() {
    return this.router;
  }

  public addApiRoute(url: string, router: express.Router) {
    this.router.use(url, router);
  }

  public setupApiRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.addApiRoute(route.url, route.router);
    });
  }
}
const apiRoutes: IRoute[] = [
  { url: '/auth', router: authRouter },
  { url: '/records', router: recordsRouter },
  { url: '/record', router: recordRouter },
];

export const apiRouter = new ApiRouter(express.Router(), apiRoutes).apiRouter;
