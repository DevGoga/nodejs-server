import { Router } from 'express';
import { Route } from './types';

export abstract class BaseController {
  public readonly router: Router;

  protected constructor() {
    this.router = Router();
  }

  public abstract initRoutes(): void;

  addRoute(routes: Route | Route[]) {
    for (const route of [routes].flat(2)) {
      const handler = route.handler.bind(this);
      const method = route.method ?? 'get';

      this.router[method](route.path, handler);
      console.info(`Route registered: ${method.toUpperCase()} ${route.path}`);
    }
  }
}
