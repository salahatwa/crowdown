import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from "../../shared/shared.module";
import { CustomerRoutingModule } from './customer-routing.module';

// Components
import { CustomerComponent } from './customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { FormCustomerComponent } from './form-customer/form-customer.component';

// State
import { CustomerState } from 'src/app/shared/state/customer.state';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

@NgModule({
  declarations: [
    CustomerComponent,
    EditCustomerComponent,
    CreateCustomerComponent,
    FormCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    NgxsModule.forFeature([CustomerState])
  ]
})
export class CustomerModule { }
