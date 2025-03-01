import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from "../../shared/shared.module";
import { DynamicTemplateRoutingModule } from './dynamic-template-routing.module';

// Components
import { DynamicTemplateComponent } from './dynamic-template.component';


// State
import { DyTemplateState } from 'src/app/shared/state/template.state';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { BlinkedQrModule } from 'blinked-qr';
import { DynamicFormBuilderModule } from 'src/app/shared/components/ui/dynamic-form-builder';
import { QrFormComponent } from './forms/qr/qr-form.component';
import { QrColorComponent } from './forms/qr/color/qr-color.component';

@NgModule({
  declarations: [
    DynamicTemplateComponent,
    CreateTemplateComponent,
    EditTemplateComponent,
    FormTemplateComponent ,
    QrFormComponent,
    QrColorComponent
  ],
  imports: [
    CommonModule,
    BlinkedQrModule,
    DynamicTemplateRoutingModule,
    SharedModule,
    NgxsModule.forFeature([DyTemplateState]),
    DynamicFormBuilderModule

  ]
})
export class DynamicTemplateModule { }
