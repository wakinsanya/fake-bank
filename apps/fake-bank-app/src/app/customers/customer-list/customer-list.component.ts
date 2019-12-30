import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { UsersService } from '@fake-bank/core/services/users.service';
import {
  User,
  CurrentAccount,
  SavingsAccount,
  TransactionRequest
} from '@fake-bank/api-common';
import { tap, delay } from 'rxjs/operators';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { forkJoin } from 'rxjs';
import { CurrentAccountService } from '@fake-bank/core/services/current-account.service';
import { SavingsAccountService } from '@fake-bank/core/services/savings-account.service';

interface TransactionFormData {
  customerCurrentAccounts?: CurrentAccount[];
  customerSavingsAccounts?: SavingsAccount[];
  otherCurrentAccounts?: CurrentAccount[];
  otherSavingsAccounts?: SavingsAccount[];
}

@Component({
  selector: 'fake-bank-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  @ViewChild('welcomeDialog', { static: true }) welcomeDialog: TemplateRef<any>;
  isLoading: boolean;
  customers: User[] = [];
  userAccounts: Array<CurrentAccount | SavingsAccount> = [];
  transactionFormData: TransactionFormData;
  transactionRequest: TransactionRequest = {};

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
      .subscribe();
  }

  ngAfterViewInit() {
    this.dialogService.open(this.welcomeDialog);
  }

  startTransaction(customerId: string, templateRef: TemplateRef<any>) {
    this.transactionFormData = {};
    this.dialogService.open(templateRef).onClose.subscribe({
      next: () => (this.transactionFormData = {})
    });
    this.isLoading = true;
    forkJoin([
      this.currentAccountService.getAccounts().pipe(
        tap((currentAccounts: CurrentAccount[]) => {
          this.transactionFormData.customerCurrentAccounts = currentAccounts.filter(
            v => v.owner === customerId
          );
          this.transactionFormData.otherCurrentAccounts = currentAccounts.filter(
            v => v.owner !== customerId
          );
        })
      ),
      this.savingsAccountService.getAccounts().pipe(
        tap((savingsAccounts: SavingsAccount[]) => {
          this.transactionFormData.customerSavingsAccounts = savingsAccounts.filter(
            v => v.owner === customerId
          );
          this.transactionFormData.otherSavingsAccounts = savingsAccounts.filter(
            v => v.owner !== customerId
          );
        })
      )
    ])
      .pipe(delay(500))
      .subscribe({
        next: () => {
          console.log(this.transactionFormData);
          this.isLoading = false;
        },
        error: e => {
          this.isLoading = false;
        }
      });
  }

  showUserAccounts(customerId: string, templateRef: TemplateRef<any>) {
    this.dialogService.open(templateRef);
    this.isLoading = true;
    forkJoin([
      this.currentAccountService.getAccounts().pipe(
        tap((currentAccounts: CurrentAccount[]) => {
          this.userAccounts.push(
            ...currentAccounts.filter(v => v.owner === customerId)
          );
        })
      ),
      this.savingsAccountService.getAccounts().pipe(
        tap((savingsAccounts: SavingsAccount[]) => {
          this.userAccounts.push(
            ...savingsAccounts.filter(v => v.owner === customerId)
          );
        })
      )
    ]).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: e => {
        this.isLoading = false;
      }
    });
  }

  deleteCustomer(customerId: string) {
    this.customers = this.customers.filter(v => v._id !== customerId);
    this.toastrService.success('', 'Account Closed');
  }
}
