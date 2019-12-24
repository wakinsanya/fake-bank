import { Router, Request, Response } from 'express';
import { TransactionApiV1 } from './transaction-api-v1';
import { TransactionRequest } from '@fake-bank/api-common';

const transactionApiV1 = new TransactionApiV1();
const transactionApiV1Router = Router({ mergeParams: true });

transactionApiV1Router
  .route('/evaluate')
  .post((req: Request, res: Response) => {
    try {
      const transactionResult = transactionApiV1.evaluate((req.body as any)
        .transactionRequest as TransactionRequest);
      res.status(200).json(transactionResult);
    } catch (e) {
      res.status(500).json(e);
    }
  });

export default transactionApiV1Router;
