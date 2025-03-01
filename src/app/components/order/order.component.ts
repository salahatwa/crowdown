import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CancelOrder, ConfirmOrder, DeleteOrder, GetOrders } from '../../shared/action/order.action';
import { ApiRs, Page, Params } from '../../shared/interface/core.interface';
import { Order } from '../../shared/interface/order.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { OrderState } from '../../shared/state/order.state';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  @Select(OrderState.order) order$: Observable<ApiRs<Page<Order>>>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "No.", dataField: "no", type: "no" },
      { title: "order_number", dataField: "order_id" },
      { title: "order_date", dataField: "createTime", type: "date", class: 'static-l-dir', sortable: true, sort_direction: 'desc' },
      { title: "customer", dataField: "consumer_name" },
      { title: "total_amount", dataField: "total", type: 'price' },
      // { title: "payment_method", dataField: "payment_mode" },
      { title: "order_status", dataField: "order_order_status" },
      { title: "payment_method", dataField: "order_payment_method" },

    ],
    rowActions: [
      { label: "View", actionToPerform: "view", icon: "ri-eye-line", permission: "order.index" },
      { label: "Confirm", actionToPerform: "confirm", icon: "ri-checkbox-multiple-line", permission: "order.create" },
      { label: "Cancel", actionToPerform: "cancel", icon: "ri-close-circle-line", permission: "order.destroy" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "order.destroy" }
    ],
    data: [],
    total: 0
  };


  product_id: string;
  consumer_identity: string;

  constructor(private store: Store,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: ParamMap) => {
      if (!params['product_id']) {
        this.product_id = '';
      } else {
        this.product_id = params['product_id'];
      }

      if (!params['consumer_identity']) {
        this.consumer_identity = '';
      } else {
        this.consumer_identity = params['consumer_identity'];
      }
    });
  }

  ngOnInit() {

    this.order$.subscribe(order => {
      this.tableConfig.data = order ? order?.data?.content : [];
      this.tableConfig.total = order ? order?.data?.totalElements : 0;
    });

    this.order$.subscribe(order => {
      let orders = order?.data?.content?.filter((element: Order) => {
        element.order_id = `<span class="fw-bolder">#${element.id}</span>`;
        element.order_payment_method = element.payment_method ? `<div class="status-${element.payment_method.toLowerCase()}"><span>${element.payment_method.replace(/_/g, " ")}</span></div>` : '-';
        element.order_order_status = element.order_status ? `<div class="status-${element.order_status.toLowerCase()}"><span>${element.order_status.replace(/_/g, " ")}</span></div>` : '-';
        // element.payment_mode = element.payment_method ? `<div class="payment-mode"><span>${element.payment_method.replace(/_/g, " ").toUpperCase()}</span></div>` : '-';
        element.consumer_name = `${element.consumer.name}`;
        return element;
      });
      this.tableConfig.data = order ? orders : [];
      this.tableConfig.total = order ? order?.data?.totalElements : 0;
    });
  }

  onTableChange(data?: Params) {
    if (this.product_id)
      data['product_id'] = this.product_id;

    if (this.consumer_identity)
      data['consumer_identity'] = this.consumer_identity;


    this.store.dispatch(new GetOrders(data!));
  }

  onActionClicked(action: TableClickedAction) {
    if (action.actionToPerform == 'view')
      this.view(action.data)
    if (action.actionToPerform == 'cancel')
      this.store.dispatch(new CancelOrder(action.data?.id));

    if (action.actionToPerform == 'delete')
      this.store.dispatch(new DeleteOrder(action.data?.id));

    if (action.actionToPerform == 'confirm')
      this.store.dispatch(new ConfirmOrder(action.data?.id));


  }

  view(data: Order) {
    this.router.navigateByUrl(`/order/details/${data?.id}`);
  }

}
