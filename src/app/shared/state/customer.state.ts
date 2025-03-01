import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreateCustomer,
  DeleteAllCustomer,
  DeleteCustomer,
  EditCustomer,

  GetCustomers,

  UpdateCustomer
} from "../action/customer.action";
import { ApiRs, Page } from "../interface/core.interface";
import { Customer } from "../interface/customer.interface";
import { CustomerService } from "../services/customer.service";
import { NotificationService } from "../services/notification.service";

export class CustomerStateModel {
  customer: ApiRs<Page<Customer>>;
  selectedCustomer: Customer | null;
}

@State<CustomerStateModel>({
  name: "Customer",
  defaults: {
    customer: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },
    },
    selectedCustomer: null
  },
})
@Injectable()
export class CustomerState {

  constructor(private notificationService: NotificationService,
    private customerService: CustomerService, private store: Store) { }

  @Selector()
  static customer(state: CustomerStateModel) {
    return state.customer;
  }


  @Selector()
  static customeres(state: CustomerStateModel) {
    // console.log(state.Customer?.data?.content?.map(item => ({value: item.id, label: item.name})));
    return state.customer?.data?.content?.map(item => ({ value: item.identity, label: item.name }));
  }

  @Selector()
  static selectedCustomer(state: CustomerStateModel) {
    return state.selectedCustomer;
  }

  @Action(GetCustomers)
  getCustomeres(ctx: StateContext<CustomerStateModel>, action: GetCustomers) {

    console.log('>>>>>>>>>>>>>>>>>>>>'+action);
    return this.customerService.getCustomeres(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            customer: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateCustomer)
  create(ctx: StateContext<CustomerStateModel>, action: CreateCustomer) {
    return this.customerService.createCustomer(action.payload).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Customer has been created successfully');
        },
        error: err => {
          // console.log(err);
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditCustomer)
  edit(ctx: StateContext<CustomerStateModel>, { id }: EditCustomer) {
    const state = ctx.getState();
    const result = state.customer.data?.content.find(Customer => Customer.id == id);
    ctx.patchState({
      ...state,
      selectedCustomer: result
    });
  }

  @Action(UpdateCustomer)
  update(ctx: StateContext<CustomerStateModel>, { payload, id }: UpdateCustomer) {
    return this.customerService.updateCustomer(payload, id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Customer has been update successfully');
        },
        error: err => {

          throw new Error(err?.error?.message);
        }
      })
    );
  }


  @Action(DeleteCustomer)
  delete(ctx: StateContext<CustomerStateModel>, { id }: DeleteCustomer) {
    // Customer Delete Logic here
    return this.customerService.deleteCustomer(id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Customer has been deleted successfully');
          this.store.dispatch(new GetCustomers({}));
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllCustomer)
  deleteAll(ctx: StateContext<CustomerStateModel>, { ids }: DeleteAllCustomer) {
    // Customer Delete All Logic here
  }


}
