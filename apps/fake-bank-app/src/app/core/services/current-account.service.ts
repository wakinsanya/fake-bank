import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentAccount } from '@fake-bank/api-common';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentAccountService {
  constructor(public httpClient: HttpClient) {}

  createAccount(account: CurrentAccount): Observable<CurrentAccount> {
    return this.httpClient.post<CurrentAccount>('api/current-accounts', account);
  }

  updateAccount(account: CurrentAccount): Observable<CurrentAccount> {
    return this.httpClient.patch<CurrentAccount>(
      `/current-accounts/${account.owner}`,
      account
    );
  }

  deleteAccount(accountId: string): Observable<any> {
    return this.httpClient.delete(`api/current-accounts/${accountId}`);
  }

  getAccounts(): Observable<CurrentAccount[]> {
    return this.httpClient.get<CurrentAccount[]>('api/current-accounts');
  }
}
