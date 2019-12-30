import { Router, Request, Response } from 'express';
export function routeNotFound(_req: Request, res: Response) {
  res.status(404).json({
    statusCode: 404,
    message: 'route not found'
  });
}
