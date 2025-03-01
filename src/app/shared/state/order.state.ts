import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import { CancelOrder, Checkout, Clear, ConfirmOrder, DeleteOrder, GetOrders, GetOrdersByProduct, PlaceOrder, SelectUser, ViewOrder } from "../action/order.action";
import { ApiRs, Page } from "../interface/core.interface";
import { Order } from "../interface/order.interface";
import { User } from "../interface/user.interface";
import { OrderService } from "../services/order.service";
import { StripeService } from "../services/stripe.service";
import { UserService } from "../services/user.service";
import { NotificationService } from "../services/notification.service";



export class OrderStateModel {
  order: ApiRs<Page<Order>>
  selectedOrder: Order | null
  selectedUser: User | null
  checkout: Order | null
}

@State<OrderStateModel>({
  name: "order",
  defaults: {
    order: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },
    },
    selectedOrder: null,
    selectedUser: null,
    checkout: null
  },
})
@Injectable()
export class OrderState {


  constructor(private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private store: Store,
    private notificationService: NotificationService,
    private stripeService: StripeService) { }

  @Selector()
  static order(state: OrderStateModel) {
    return state.order;
  }

  @Selector()
  static selectedUser(state: OrderStateModel) {
    return state.selectedUser;
  }

  @Selector()
  static selectedOrder(state: OrderStateModel) {
    return state.selectedOrder;
  }

  @Selector()
  static checkout(state: OrderStateModel) {
    return state.checkout;
  }

  @Action(GetOrders)
  getOrders(ctx: StateContext<OrderStateModel>, action: GetOrders) {
    return this.orderService.getOrders(action?.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            order: {
              data: result.data
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }



  @Action(GetOrdersByProduct)
  GetOrdersByProduct(ctx: StateContext<OrderStateModel>, { productId, params }: GetOrdersByProduct) {
    return this.orderService.getOrdersByProducId(productId, params).pipe(
      tap({
        next: result => {
          console.log(result?.data);
          ctx.patchState({
            order: {
              data: result.data
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(SelectUser)
  selectUser(ctx: StateContext<OrderStateModel>, { id }: SelectUser) {
    return this.userService.getUsers().pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          const user = result.data.content.find(user => user.id == id);
          ctx.patchState({
            ...state,
            selectedUser: user
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ViewOrder)
  viewOrder(ctx: StateContext<OrderStateModel>, { id }: ViewOrder) {
    return this.orderService.getOrderById(id).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          const order = result.data;
          ctx.patchState({
            ...state,
            selectedOrder: order
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(Checkout)
  checkout(ctx: StateContext<OrderStateModel>, action: Checkout) {
    const state = ctx.getState();
    return this.orderService.checkout(action?.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          const order = result.data;
          ctx.patchState({
            ...state,
            checkout: order
          });
        },
        error: err => {
          console.log(err);
          throw new Error(err?.error?.message);
        }
      })
    );

  }

  @Action(PlaceOrder)
  placeOrder(ctx: StateContext<OrderStateModel>, action: PlaceOrder) {
    // action?.payload?.
    return this.orderService.create(action?.payload).pipe(
      tap({
        next: result => {
          if (action?.payload?.payment_method == 'stripe')
            this.stripeService.pay(result?.data?.additionalInfo);
          else
            this.router.navigateByUrl(`/order/details/${result?.data?.id}`);
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }


  @Action(CancelOrder)
  updateOrderStatus(ctx: StateContext<OrderStateModel>, { id }: CancelOrder) {
    return this.orderService.cancel(id).pipe(
      tap({
        next: result => {
          this.router.navigateByUrl(`/order/details/${id}`);
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ConfirmOrder)
  confirmOrder(ctx: StateContext<OrderStateModel>, { id }: ConfirmOrder) {
    return this.orderService.confirm(id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Order has been confirmed successfully');
          this.store.dispatch(new GetOrders({ page: 0, size: 10 }));
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteOrder)
  deleteOrder(ctx: StateContext<OrderStateModel>, { id }: DeleteOrder) {
    return this.orderService.delete(id).pipe(
      tap({
        next: result => {
          this.store.dispatch(new GetOrders({ page: 0, size: 10 }));
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(Clear)
  clear(ctx: StateContext<OrderStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedUser: null,
      checkout: null
    });
  }

}  