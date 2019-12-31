import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { User, CustomerTransactionRequest } from '@fake-bank/api-common';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('api/users')
  }

  makeTransactionRequest(request: CustomerTransactionRequest): Observable<boolean> {
    return this.httpClient.post<boolean>('api/users/transaction', request);
  }
}
