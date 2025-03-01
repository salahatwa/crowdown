import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from "../../shared/shared.module";
import { OrderRoutingModule } from './order-routing.module';

// Components
import { AddressBlockComponent } from './checkout/address-block/address-block.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliveryBlockComponent } from './checkout/delivery-block/delivery-block.component';
import { AddAddressModalComponent } from './checkout/modal/add-address-modal/add-address-modal.component';
import { AddCustomerModalComponent } from './checkout/modal/add-customer-modal/add-customer-modal.component';
import { CouponModalComponent } from './checkout/modal/coupon-modal/coupon-modal.component';
import { PaymentBlockComponent } from './checkout/payment-block/payment-block.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { DetailsComponent } from './details/details.component';
import { OrderComponent } from './order.component';

// State
import { CartState } from '../../shared/state/cart.state';
import { CategoryState } from '../../shared/state/category.state';
import { OrderState } from '../../shared/state/order.state';
import { ProductState } from '../../shared/state/product.state';
import { SettingState } from '../../shared/state/setting.state';
import { CustomerState } from 'src/app/shared/state/customer.state';
import { StateState } from '../../shared/state/state.state';
import { UserState } from '../../shared/state/user.state';
import { ViewDividendModalComponent } from './view-dividend-modal/view-dividend-modal.component';

@NgModule({
  declarations: [
    OrderComponent,
    CreateOrderComponent,
    CheckoutComponent,
    AddCustomerModalComponent,
    ViewDividendModalComponent,
    DetailsComponent,
    AddAddressModalComponent,
    AddressBlockComponent,
    DeliveryBlockComponent,
    PaymentBlockComponent,
    CouponModalComponent,
  ],

  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    NgxsModule.forFeature([
      SettingState,
      CategoryState,
      ProductState,
      CartState,
      OrderState,
      UserState,
      StateState,
      CustomerState
    ])
  ]
})

export class OrderModule { }
