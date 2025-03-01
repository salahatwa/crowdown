import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductComponent } from './product.component';

// Permission Guard
import { PermissionGuard } from './../../core/guard/permission.guard';

const routes: Routes = [
  {
    path: "",
    component: ProductComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['product.index']
    }
  },
  {
    path: "create",
    component: CreateProductComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['product.create']
    }
  },
  {
    path: "edit/:id",
    component: EditProductComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['product.edit']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
