import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DynamicTemplateComponent } from './dynamic-template.component';

// Permission Guard
import { PermissionGuard } from '../../core/guard/permission.guard';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';

const routes: Routes = [
  {
    path: "",
    component: DynamicTemplateComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'template.index'
    }
  },
  {
    path: "create",
    component: CreateTemplateComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['template.index', 'template.create']
    }
  },
  {
    path: "edit/:id",
    component: EditTemplateComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['template.index', 'template.edit']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicTemplateRoutingModule { }
