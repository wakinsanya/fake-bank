import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavingsAccount } from '@fake-bank/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavingsAccountService {
  constructor(public httpClient: HttpClient) {}

  createAccount(account: SavingsAccount): Observable<SavingsAccount> {
    return this.httpClient.post<SavingsAccount>('/savings-accounts', account);
  }

  updateAccount(account: SavingsAccount): Observable<SavingsAccount> {
    return this.httpClient.patch<SavingsAccount>(
      `/savings-accounts/${account.owner}`,
      account
    );
  }

  deleteAccount(accountId: string): Observable<any> {
    return this.httpClient.delete(`/savings-accounts/${accountId}`);
  }
}
