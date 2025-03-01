import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from "../../shared/shared.module";
import { FileContentRoutingModule } from './file-content-routing.module';

// Components
import { FileContentComponent } from './file-content.component';


// State
import { FileContentState } from 'src/app/shared/state/file-content.state';
import { CreateFileComponent } from './create-file/create-file.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { FormFileComponent } from './form-file/form-file.component';

@NgModule({
  declarations: [
    FileContentComponent,
    CreateFileComponent,
    EditFileComponent,
    FormFileComponent
  ],
  imports: [
    CommonModule,
    FileContentRoutingModule,
    SharedModule,
    NgxsModule.forFeature([FileContentState]),

  ]
})
export class FileContentModule { }
