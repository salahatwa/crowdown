import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateFileComponent } from './create-file/create-file.component';
import { FileContentComponent } from './file-content.component';

// Permission Guard
import { PermissionGuard } from '../../core/guard/permission.guard';
import { EditFileComponent } from './edit-file/edit-file.component';

const routes: Routes = [
  {
    path: "",
    component: FileContentComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'page.index'
    }
  },
  {
    path: "create",
    component: CreateFileComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['page.index', 'page.create']
    }
  },
  {
    path: "edit/:id",
    component: EditFileComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['page.index', 'page.edit']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileContentRoutingModule { }
