import { Component, OnInit } from '@angular/core';
import { UsersService } from '@fake-bank/core/services/users.service';
import { User } from '@fake-bank/api-common';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'fake-bank-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: User[] = [];
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService
      .getUsers()
      .pipe(tap((users: User[]) => (this.customers = users)))
      .subscribe({
        next: data => console.log(data)
      });
  }
}
