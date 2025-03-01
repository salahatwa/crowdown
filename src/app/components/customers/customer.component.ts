import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteAllCustomer, DeleteCustomer, GetCustomers, UpdateCustomer } from 'src/app/shared/action/customer.action';
import { Customer } from 'src/app/shared/interface/customer.interface';
import { CustomerState } from 'src/app/shared/state/customer.state';
import { ApiRs, Page, Params } from "../../shared/interface/core.interface";
import { TableClickedAction, TableConfig } from "../../shared/interface/table.interface";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  @Select(CustomerState.customer) customer$: Observable<ApiRs<Page<Customer>>>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "No.", dataField: "no", type: "no" },
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "email", dataField: "email", sortable: true, sort_direction: 'desc' },
      // { title: "identity", dataField: "identity", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "createTime", type: "date",class: 'static-l-dir', sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line",permission: "consumer.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "consumer.destroy" },
      { label: "View", actionToPerform: "view", icon: "ri-eye-line", permission: "order.index" }
    ],
    data: [] as Customer[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.customer$.subscribe(customer => {
      this.tableConfig.data = customer ? customer?.data?.content : [];
      this.tableConfig.total = customer ? customer?.data?.totalElements : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetCustomers(data));
  }

  onActionClicked(action: TableClickedAction) {
    if (action.actionToPerform == 'edit')
      this.edit(action.data)
    else if (action.actionToPerform == 'status')
      this.status(action.data)
    else if (action.actionToPerform == 'delete')
      this.delete(action.data)
    else if (action.actionToPerform == 'deleteAll')
      this.deleteAll(action.data)
    else if (action.actionToPerform == 'view')
      this.getOrders(action.data)
  }

  getOrders(data: Customer) {
    this.router.navigate([`/order`], { queryParams: { consumer_identity: data?.identity } });
  }

  edit(data: Customer) {
    this.router.navigateByUrl(`/customer/edit/${data.id}`);
  }

  status(data: Customer) {
    this.store.dispatch(new UpdateCustomer(data, data?.id));
  }

  delete(data: Customer) {
    this.store.dispatch(new DeleteCustomer(data.id));
  }

  deleteAll(ids: string[]) {
    this.store.dispatch(new DeleteAllCustomer(ids));
  }

}
