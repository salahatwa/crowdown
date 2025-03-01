import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPaymentMethods } from 'src/app/shared/action/setting.action';
import { SettingState } from 'src/app/shared/state/setting.state';

@Component({
  selector: 'app-payment-block',
  templateUrl: './payment-block.component.html',
  styleUrls: ['./payment-block.component.scss']
})
export class PaymentBlockComponent {

  
  @Select(SettingState.payment_methods) payment_methods$: Observable<string[]>;

  @Output() selectPaymentMethod: EventEmitter<string> = new EventEmitter();

  constructor(private store:Store) {
    this.store.dispatch(new GetPaymentMethods());
   }

  set(value: string) {
    this.selectPaymentMethod.emit(value);
  }

}
