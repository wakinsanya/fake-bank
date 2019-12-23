import { Router, Request, Response } from 'express';
import * as glob from 'glob';

export function createRootRouter(
  apiRootPath: string,
  apiRouteSuffix: string
): Router {
  return glob
    .sync('**/*.ts', { cwd: apiRootPath })
    .filter(pathname => pathname.endsWith(apiRouteSuffix))
    .map(pathname => require(`../../../../apps/fake-bank-api/${pathname}`).default)
    .filter(router => Object.getPrototypeOf(router) === Router)
    .reduce(
      (rootRouter, router) => rootRouter.use(router),
      Router({ mergeParams: true })
    );
}

export function routeNotFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Route does not exist.'})
}