import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrencyComponent } from './currency.component';
import { CreateCurrencyComponent } from './create-currency/create-currency.component';
import { EditCurrencyComponent } from './edit-currency/edit-currency.component';

// Permission Guard
import { PermissionGuard } from './../../core/guard/permission.guard';

const routes: Routes = [
  {
    path: "",
    component: CurrencyComponent,
    canActivate: [PermissionGuard],
    data: { 
      permission: 'user.index' 
    }
  },
  {
    path: "create",
    component: CreateCurrencyComponent,
    canActivate: [PermissionGuard],
    data: { 
      permission: ['ADMN']
    }
  },
  {
    path: "edit/:id",
    component: EditCurrencyComponent,
    canActivate: [PermissionGuard],
    data: { 
      permission: ['ADMN']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
