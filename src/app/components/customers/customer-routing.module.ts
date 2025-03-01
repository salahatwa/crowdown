import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

// Permission Guard
import { PermissionGuard } from '../../core/guard/permission.guard';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

const routes: Routes = [
  {
    path: "",
    component: CustomerComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'consumer.index'
    }
  },
  {
    path: "create",
    component: CreateCustomerComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['consumer.create']
    }
  },
  {
    path: "edit/:id",
    component: EditCustomerComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['consumer.edit']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
