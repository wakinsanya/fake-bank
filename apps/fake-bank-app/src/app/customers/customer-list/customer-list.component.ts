import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { UsersService } from '@fake-bank/core/services/users.service';
import { User, CurrentAccount, SavingsAccount } from '@fake-bank/api-common';
import { tap } from 'rxjs/operators';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { forkJoin } from 'rxjs';
import { CurrentAccountService } from '@fake-bank/core/services/current-account.service';
import { SavingsAccountService } from '@fake-bank/core/services/savings-account.service';

@Component({
  selector: 'fake-bank-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  @ViewChild('welcomeDialog', { static: true }) welcomeDialog: TemplateRef<any>;
  isLoadingTransactionData: boolean;
  customers: User[] = [];
  currentAccounts: CurrentAccount[] = [];
  savingsAccounts: SavingsAccount[] = [];
  userAccounts: Array<CurrentAccount | SavingsAccount> = [];

  constructor(
    private dialogService: NbDialogService,
    private usersService: UsersService,
    private toastrService: NbToastrService,
    private currentAccountService: CurrentAccountService,
    private savingsAccountService: SavingsAccountService
  ) {}

  ngOnInit() {
    this.usersService
      .getUsers()
      .pipe(tap((users: User[]) => (this.customers = users)))
      .subscribe({
        next: data => console.log(data)
      });
  }

  ngAfterViewInit() {
    this.dialogService.open(this.welcomeDialog);
  }

  startTransaction(customerId: string, templateRef: TemplateRef<any>) {
    this.dialogService.open(templateRef);
    this.isLoadingTransactionData = true;
    forkJoin([this.currentAccountService.getAccounts(), this.savingsAccountService.getAccounts()]);
  }

  deleteCustomer(customerId: string) {
    this.customers = this.customers.filter(v => v._id !== customerId);
    this.toastrService.success('', 'Account Closed');
  }
}
