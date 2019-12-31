import { User } from '../models/users.model';
import { Request, Response } from 'express';
import { from, of } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { TRANSACTION_API_BASE_URL } from '@fake-bank-api/constants';
import { concatMap } from 'rxjs/operators';
import { CustomerTransactionRequest, TransactionRequest, TransactionType } from '@fake-bank/api-common';

export default class UsersController {
  static listUsers(_req: Request, res: Response) {
    from(User.find({})).subscribe({
      next: users => res.status(200).json(users),
      error: e => res.status(500).json(e)
    })
  }


  static createUser(req: Request, res: Response) {
    const newUser = new User(req.body);
    from(newUser.save()).subscribe({
      next: user => res.status(200).json(user),
      error: e => res.status(500).json(e)
    });
  }

  static getUser(req: Request, res: Response) {
    const { userId } = req.params;
    from(User.findOne({ _id: userId })).subscribe({
      next: user => res.status(200).json(user),
      error: e => res.status(500).json(e)
    });
  }

  static updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    from(
      User.updateOne({ _id: userId }, { $set: req.body }, { new: true })
    ).subscribe({
      next: user => res.status(200).json(user),
      error: e => res.status(500).json(e)
    });
  }

  static deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    from(User.deleteOne({ _id: userId })).subscribe({
      next: () => res.status(200).json({ message: 'User deleted.' }),
      error: e => res.status(500).json(e)
    });
  }

  static processTransaction(req: Request, res: Response) {
    // const { userId } = req.params;
    console.log('Request body!', req.body);
    const customerTransactionRequest = (req.body.transactionRequest as CustomerTransactionRequest);
    const transactionRequest = this.extractTransactionRequest(customerTransactionRequest);

    from(axios.post(`${TRANSACTION_API_BASE_URL}/evaluate`, transactionRequest))
      .pipe(
        concatMap((axiosRes: AxiosResponse) => {
          console.log(axiosRes.data);
          return of();
        })
      ).subscribe({
        next: () => {
          res.status(200).json({
            message: 'transaction is good',
            isAllowed: true
          });
        },
        error: e => {
          console.error(e);
          res.status(500).json({
            message: 'transaction is not good',
            isAllowed: false
          });
        }
      });
  }

  private static extractTransactionRequest(customerTransactionRequest: CustomerTransactionRequest): TransactionRequest {
    switch(customerTransactionRequest.type) {
      case TransactionType.DEPOSIT:
        return {
          overdraftLimit: customerTransactionRequest.overdraftLimit,
          balance: customerTransactionRequest.balance,
          shiftingAmount: customerTransactionRequest.shiftingAmount,
          type: customerTransactionRequest.type
        };
      default:
        throw new Error('unknown transaction type');
    }
  }
}
