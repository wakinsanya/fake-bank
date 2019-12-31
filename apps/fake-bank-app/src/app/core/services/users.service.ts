import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { User, CustomerTransactionRequest, TransactionResult } from '@fake-bank/api-common';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('api/users')
  }

  makeTransactionRequest(request: CustomerTransactionRequest): Observable<TransactionResult> {
    console.log('req body pre', { transactionRequest: request });
    return this.httpClient.post<TransactionResult>('api/users/transaction', { transactionRequest: request });
  }
}
