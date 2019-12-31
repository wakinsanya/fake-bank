import { User } from '../models/users.model';
import { Request, Response } from 'express';
import { from, of, throwError } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { TRANSACTION_API_BASE_URL } from '@fake-bank-api/constants';
import { concatMap, tap } from 'rxjs/operators';
import {
  CustomerTransactionRequest,
  TransactionRequest,
  TransactionType,
  TransactionResult
} from '@fake-bank/api-common';
import { CurrentAccount } from '@fake-bank-api/modules/current-accounts/models/current-account.model';
import { SavingsAccount } from '@fake-bank-api/modules/savings-accounts/models/savings-accout.model';

export default class UsersController {
  static listUsers(_req: Request, res: Response) {
    from(User.find({})).subscribe({
      next: users => res.status(200).json(users),
      error: e => res.status(500).json(e)
    });
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
    const customerTransactionRequest = req.body
      .transactionRequest as CustomerTransactionRequest;
    const transactionRequest = UsersController.extractTransactionRequest(
      customerTransactionRequest
    );
    let transactionResult: TransactionResult;
    from(
      axios.post(`${TRANSACTION_API_BASE_URL}/evaluate`, { transactionRequest })
    )
      .pipe(
        tap((axiosRes: AxiosResponse) => (transactionResult = axiosRes.data)),
        concatMap(() => {
          if (transactionResult.isAllowed) {
            switch (transactionRequest.type) {
              case TransactionType.DEPOSIT:
                if (
                  customerTransactionRequest.instigatorAccountType === 'current'
                ) {
                  return from(
                    CurrentAccount.updateOne(
                      { _id: customerTransactionRequest.instigatorAccount },
                      {
                        $inc: {
                          balance: customerTransactionRequest.shiftingAmount
                        }
                      }
                    )
                  ).pipe(concatMap(() => of(transactionResult)));
                } else if (
                  customerTransactionRequest.instigatorAccountType === 'savings'
                ) {
                  return from(
                    SavingsAccount.updateOne(
                      { _id: customerTransactionRequest.instigatorAccount },
                      {
                        $inc: {
                          balance: customerTransactionRequest.shiftingAmount
                        }
                      }
                    )
                  ).pipe(concatMap(() => of(transactionResult)));
                }
                break;
              default:
                return throwError(new Error('unknown account type'));
            }
          } else {
            return of(transactionResult);
          }
        })
      )
      .subscribe({
        next: verdict => res.status(200).json(verdict),
        error: e => res.status(500).json(e)
      });
  }

  private static extractTransactionRequest(
    customerTransactionRequest: CustomerTransactionRequest
  ): TransactionRequest {
    switch (customerTransactionRequest.type) {
      case TransactionType.DEPOSIT:
        return {
          shiftingAmount: customerTransactionRequest.shiftingAmount,
          type: customerTransactionRequest.type
        };
      default:
        throw new Error('unknown transaction type');
    }
  }
}
