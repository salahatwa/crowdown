import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import {
  DeleteAllProduct,
  DeleteProduct,
  GetProducts,
  ReplicateProduct,
  UpdateProductStatus
} from '../../shared/action/product.action';
import { ApiRs, Page, Params } from "../../shared/interface/core.interface";
import { Product } from "../../shared/interface/product.interface";
import { TableClickedAction, TableConfig } from "../../shared/interface/table.interface";
import { ProductState } from '../../shared/state/product.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Select(ProductState.product) product$: Observable<ApiRs<Page<Product>>>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "No.", dataField: "no", type: "no" },
      { title: "image", dataField: "thumbnail", class: 'tbl-image', type: 'image', placeholder: 'assets/images/product.png' },
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      // { title: "sku", dataField: "sku", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "createTime", type: "date",class: 'static-l-dir', sortable: true, sort_direction: 'desc' },
      { title: "price", dataField: "price", sortable: true, sort_direction: 'desc' },
      { title: "view", dataField: "visits", sortable: true, sort_direction: 'desc' },
      { title: "stock", dataField: "stock" },
      { title: "featured", dataField: "featured" },
      { title: "status", dataField: "status", type: "switch" }
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "product.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "product.destroy" }
    ],
    data: [] as Product[],
    total: 0
  };

  constructor(private store: Store, private notificationService: NotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.product$.subscribe(product => {
      let products = product?.data?.content?.filter((element: Product) => {
        element.stock = element.stock_status ? `<div class="status-${element.stock_status}"><span>${element.stock_status.replace(/_/g, " ")}</span></div>` : '-';
        element.featured = element.is_featured ? `<div class="status-pending"><span>YES</span></div>` : 'NO';
        // element.store_name = element?.store ? element?.store?.store_name : '-';
        // element.allViews =`<i class="ri-eye-line"></i>`;
        return element;
      });
      this.tableConfig.data = product ? products : [];
      this.tableConfig.total = product ? product?.data?.totalElements : 0;
    });
  }
  //Example data/payload: '{"payload":{"search":"go","field":"","sort":"","page":1,"paginate":30}}'
  onTableChange(data?: Params) {
    this.store.dispatch(new GetProducts(data));
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
    else if (action.actionToPerform == 'duplicate')
      this.duplicate(action.data)
  }

  edit(data: Product) {
    this.router.navigateByUrl(`/product/edit/${data.id}`);
  }



  status(data: Product) {
    if (data?.is_featured == true || data.stock_status == 'out_stock') {
      data.status = !data.status;
      this.notificationService.showError("Couldn't change product status , casue it's out_stock/coming soon");
    } else {
      this.store.dispatch(new UpdateProductStatus(data.id, data?.status));
    }

  }

  delete(data: Product) {
    this.store.dispatch(new DeleteProduct(data.id));
  }

  deleteAll(ids: string[]) {
    this.store.dispatch(new DeleteAllProduct(ids));
  }

  duplicate(ids: string[]) {
    this.store.dispatch(new ReplicateProduct(ids));
  }

}
