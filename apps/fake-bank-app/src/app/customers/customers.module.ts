import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customers-routing.module';
import { NbCardModule, NbButtonModule, NbAccordionModule, NbSpinnerModule, NbSelectModule, NbStepperModule } from '@nebular/theme';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbAccordionModule,
    NbSpinnerModule,
    NbSelectModule,
    NbStepperModule,
    CustomerRoutingModule
  ]
})
export class CustomersModule { }
