import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomersModule { }
