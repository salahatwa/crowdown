import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Select2, Select2Data, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';
import { Observable, Subject, debounceTime } from 'rxjs';
import { GetCustomers } from 'src/app/shared/action/customer.action';
import { CustomerState } from 'src/app/shared/state/customer.state';
import { Checkout, Clear, PlaceOrder } from '../../../shared/action/order.action';
import { Cart } from '../../../shared/interface/cart.interface';
import { Order, OrderCheckout } from '../../../shared/interface/order.interface';
import { User } from '../../../shared/interface/user.interface';
import { CartState } from '../../../shared/state/cart.state';
import { LoaderState } from '../../../shared/state/loader.state';
import { OrderState } from '../../../shared/state/order.state';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  @Select(LoaderState.status) loadingStatus$: Observable<boolean>;
  @Select(CustomerState.customeres) customers$: Observable<Select2Data>;
  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;
  @Select(OrderState.checkout) checkout$: Observable<Order>;
  @Select(OrderState.selectedUser) selectedUser$: Observable<User>;


  public form: FormGroup;
  public loading: boolean = false;
  private search = new Subject<string>();

  constructor(private router: Router,
    private notificationService:NotificationService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private store: Store,
    private formBuilder: FormBuilder) {
    this.store.dispatch(new GetCustomers({ status: 1, page: 0, size: 1000 }));


    this.form = this.formBuilder.group({
      consumer: this.formBuilder.group({
        identity: new FormControl('', [Validators.required])
      }),
      orderItems: this.formBuilder.array([], [Validators.required]),
      payment_method: new FormControl('', [Validators.required])
    });

    this.form.valueChanges.subscribe(form => {
      this.checkout();
    });
  }

  get orderItems(): FormArray {
    return this.form.get("orderItems") as FormArray;
  }

  ngOnInit() {

    this.cartItem$.subscribe(items => {
      if (!items?.length) {
        this.router.navigateByUrl('/order/create');
      }
      this.orderItems.clear();
      items!.forEach((item: Cart) =>
        this.orderItems.push(
          this.formBuilder.group({
            product_id: new FormControl(item?.product_id, [Validators.required]),
            quantity: new FormControl(item?.quantity),
          })
        ));
    });

    this.search
      .pipe(debounceTime(300)) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
        this.store.dispatch(new GetCustomers({ keyword: inputValue, status: 1, page: 0, size: 1000 }));
        this.renderer.addClass(this.document.body, 'loader-none');
      });
  }

  selectUser(data: Select2UpdateEvent) {
    if (data?.value) {
      console.log(data);
      // this.checkout();
    }
  }

  userDropdown(event: Select2) {
    if (event['innerSearchText']) {
      this.search.next('');
    }
  }

  searchUser(event: Select2SearchEvent) {
    this.search.next(event.search);
  }


  selectPaymentMethod(value: string) {
    this.form.controls['payment_method'].setValue(value);
  }

  checkout() {
    if (this.form.valid) {
      this.loading = true;
      this.store.dispatch(new Checkout(this.form.value)).subscribe({
        error: (error) => {
          this.notificationService.showError(error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }



  placeorder() {
    console.log(this.form.value)
    if (this.form.valid) {

      this.store.dispatch(new PlaceOrder(this.form.value));
    }
  }




  ngOnDestroy() {
    this.store.dispatch(new Clear());
    this.form.reset();
    this.search.next('');
    this.search.complete();
  }
}
