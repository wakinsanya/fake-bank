import { Router, Request, Response } from 'express';
import * as glob from 'glob';

export function createRootRouter(
  apiName: string,
  apiRouteSuffix: string
): Router {
  console.log(process.cwd());
  return glob
    .sync('**/*.ts', { cwd: `./${process.cwd()}/apps/${apiName}/` })
    .filter(pathname => pathname.endsWith(apiRouteSuffix))
    .map(
      pathname =>
        require(`./${process.cwd()}/apps/${apiName}/${pathname}`).default
    )
    .filter(router => Object.getPrototypeOf(router) === Router)
    .reduce(
      (rootRouter, router) => rootRouter.use(router),
      Router({ mergeParams: true })
    );
}

export function routeNotFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Route does not exist.' });
}
