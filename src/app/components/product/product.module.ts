import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from "../../shared/shared.module";
import { ProductRoutingModule } from './product-routing.module';

// Components
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormProductComponent } from './form-product/form-product.component';
import { ProductComponent } from './product.component';

// State
import { OrderState } from 'src/app/shared/state/order.state';
import { AttributeState } from '../../shared/state/attribute.state';
import { CategoryState } from '../../shared/state/category.state';
import { ProductState } from '../../shared/state/product.state';
import { SettingState } from '../../shared/state/setting.state';
import { TagState } from '../../shared/state/tag.state';
import { TaxState } from '../../shared/state/tax.state';
import { DateTemplateComponent } from './form-product/date-template/date-template.component';

@NgModule({
  declarations: [
    ProductComponent,
    CreateProductComponent,
    EditProductComponent,
    FormProductComponent,
    DateTemplateComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    CKEditorModule,
    // NgbDatepickerModule,
    NgxsModule.forFeature([
      ProductState,
      AttributeState,
      CategoryState,
      TagState,
      TaxState,
      SettingState,
      OrderState
    ])
  ]
})
export class ProductModule { }
