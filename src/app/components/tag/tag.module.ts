import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { TagRoutingModule } from './tag-routing.module';
import { SharedModule } from "../../shared/shared.module";

// Components
import { TagComponent } from './tag.component';
import { CreateTagComponent } from './create-tag/create-tag.component';
import { EditTagComponent } from './edit-tag/edit-tag.component';
import { FormTagComponent } from './form-tag/form-tag.component';

// State
import { TagState } from '../../shared/state/tag.state';
import { IconPickerModule } from 'src/app/shared/components/ui/icon-picker';

@NgModule({
  declarations: [
    TagComponent,
    CreateTagComponent,
    EditTagComponent,
    FormTagComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    SharedModule,
    IconPickerModule,
    NgxsModule.forFeature([TagState])
  ],
  exports: [
    TagComponent,
    CreateTagComponent,
    EditTagComponent,
    IconPickerModule
  ]
})
export class TagModule { }
