import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Select2Data, Select2UpdateEvent } from 'ng-select2-component';
import { Observable } from 'rxjs';
import { GetOrders } from '../../shared/action/order.action';
import { GetProducts, ProductsStockReport } from '../../shared/action/product.action';
import { ApiRs, Page, Params } from '../../shared/interface/core.interface';
import { Order } from '../../shared/interface/order.interface';
import { Product } from "../../shared/interface/product.interface";
import { TableClickedAction, TableConfig } from "../../shared/interface/table.interface";
import { OrderState } from '../../shared/state/order.state';
import { ProductState } from '../../shared/state/product.state';
// import { BlogModel } from "../../shared/interface/blog.interface";
// import { BlogState } from '../../shared/state/blog.state';
// import { GetBlogs } from '../../shared/action/blog.action';
import { GetCategories } from '../../shared/action/category.action';
import { GetStatisticsCount } from '../../shared/action/dashboard.action';
import { StatisticsCount } from '../../shared/interface/dashboard.interface';
import { CategoryState } from '../../shared/state/category.state';
import { DashboardState } from '../../shared/state/dashboard.state';
// import { StoresModel } from '../../shared/interface/store.interface';
// import { StoreState } from '../../shared/state/store.state';
// import { GetStores } from '../../shared/action/store.action';
import { AccountUser } from '../../shared/interface/account.interface';
import { AccountState } from '../../shared/state/account.state';
import { CurrencySymbolPipe } from './../../shared/pipe/currency-symbol.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [CurrencySymbolPipe]
})
export class DashboardComponent {

  @Select(DashboardState.statistics) statistics$: Observable<StatisticsCount>;

  @Select(OrderState.order) order$: Observable<ApiRs<Page<Order>>>;
  @Select(ProductState.product) product$: Observable<ApiRs<Page<Product>>>;

  // @Select(BlogState.blog) blog$: Observable<BlogModel>;
  @Select(CategoryState.categories) category$: Observable<Select2Data>;
  // @Select(StoreState.store) store$: Observable<StoresModel>;
  @Select(AccountState.user) user$: Observable<AccountUser>;

  public productStockLoader: boolean = false;

  isBrowser: boolean;

  public reports: Select2Data = [{
    value: 'pdf',
    label: 'PDF',
  },
  {
    value: 'docx',
    label: 'DOCX',
  },
  {
    value: 'xlsx',
    label: 'XLSX',
  },
  {
    value: 'csv',
    label: 'CSV',
  }];



  public orderTableConfig: TableConfig = {
    columns: [
      { title: "number", dataField: "order_id" },
      { title: "date", dataField: "createTime", type: "date", class: 'static-l-dir', date_format: 'dd MMM yyyy' },
      { title: "customer", dataField: "consumer_name" },
      { title: "amount", dataField: "total", type: 'price' },
      { title: "order_status", dataField: "order_order_status" }
    ],
    rowActions: [
      { label: "View", actionToPerform: "view", icon: "ri-eye-line", permission: "order.edit" }
    ],
    data: [],
    total: 0
  };

  public productStockTableConfig: TableConfig = {
    columns: [
      { title: "image", dataField: "product_thumbnail", class: 'tbl-image', type: 'image', placeholder: 'assets/images/product.png' },
      { title: "name", dataField: "name" },
      { title: "price", dataField: "price" },
      { title: "quantity", dataField: "quantity" },
      { title: "rem_quantity", dataField: "remainingQty" },
      { title: "stock", dataField: "stock" },
      { title: "orders", dataField: "numOfInvestors" },
      { title: "amount", dataField: "raised" },

    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "product.edit" },
      { label: "View", actionToPerform: "view", icon: "ri-eye-line", permission: "order.index" },
      // { label: "Download", actionToPerform: "download", icon: "ri-eye-line", permission: "order.index" }
    ],
    data: [] as Product[],
    total: 0
  };

  // 

  constructor(private renderer: Renderer2, config: NgbRatingConfig,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
    private store: Store, private router: Router, currencySymbolPipe: CurrencySymbolPipe) {
    config.max = 5;
    config.readonly = true;

    this.isBrowser = isPlatformBrowser(platformId);
    // For Order
    this.order$.subscribe(order => {
      this.orderTableConfig.data = order ? order?.data?.content.slice(0, 5) : [];
      this.orderTableConfig.total = order ? order?.data?.totalElements : 0;
    });

    this.order$.subscribe(order => {
      let orders = order?.data?.content?.filter((element: Order) => {
        element.order_id = `<span class="fw-bolder">#${element.id}</span>`;
        element.order_payment_method = element.payment_method ? `<div class="status-${element.payment_method.toLowerCase()}"><span>${element.payment_method.replace(/_/g, " ")}</span></div>` : '-';
        element.order_order_status = element.order_status ? `<div class="status-${element.order_status.toLowerCase()}"><span>${element.order_status.replace(/_/g, " ")}</span></div>` : '-';
        element.consumer_name = `${element.consumer.name}`;
        return element;
      });
      this.orderTableConfig.data = order ? orders?.slice(0, 5) : [];
      this.orderTableConfig.total = order ? order?.data?.totalElements : 0;
    });

    // For Product
    this.product$.subscribe(product => {
      let products = product?.data?.content?.filter((element: Product) => {
        element.stock = element.stock_status ? `<div class="status-${element.stock_status}"><span>${element.stock_status.replace(/_/g, " ")}</span></div>` : '-';
        return element;
      });
      this.productStockTableConfig.data = product ? products : [];
      this.productStockTableConfig.total = product ? product?.data?.totalElements : 0;
    });

  }

  ngOnInit() {
    this.store.dispatch(new GetStatisticsCount());

    //sort: 'numOfInvestors,desc',
    this.store.dispatch(new GetProducts({ page: 0, size: 10 }));

    this.store.dispatch(new GetCategories({ type: 'product', status: 1 }));
  }



  // For Order
  onOrderTableChange(data?: Params) {
    if (data) {
      data['sort'] = 'createTime,desc';
    }
    this.store.dispatch(new GetOrders(data!));
  }

  onOrderActionClicked(action: TableClickedAction) {
    if (action.actionToPerform == 'view')
      this.orderView(action.data)
  }

  orderView(data: Order) {
    this.router.navigateByUrl(`/order/details/${data.id}`);
  }

  // For Products

  onProductTableChange(data?: Params) {
    // if (data) {
    // data['sort'] = 'numOfInvestors,desc';
    // }
    this.store.dispatch(new GetProducts(data)).subscribe({
      complete: () => {
        this.productStockLoader = false;
      }
    });
  }

  filterProduct(data: Select2UpdateEvent) {
    this.renderer.addClass(this.document.body, 'loader-none');
    let params: Params = {
      page: 0,
      size: 10,
      // sort: 'numOfInvestors,desc'
    };
    if (data.value) {
      params['category_ids'] = data.value;
    } else {
      params['category_ids'] = [];
    }
    this.productStockLoader = true;
    this.onProductTableChange(params);
  }

  generateReport(data: Select2UpdateEvent) {
    this.renderer.addClass(this.document.body, 'loader-none');


    //data.value
    if (data.value) {
      this.productStockLoader = true;
      this.store.dispatch(new ProductsStockReport(data.value?.toString())).subscribe({
        complete: () => {
          this.productStockLoader = false;
        }
      });
    }
  }

  onProductActionClicked(action: TableClickedAction) {
    if (action.actionToPerform == 'edit')
      this.productEdit(action.data);

    else if (action.actionToPerform == 'view')
      this.getOrdersByProduct(action.data);


  }

  // 
  productEdit(data: Product) {
    this.router.navigateByUrl(`/product/edit/${data.id}`);
  }

  getOrdersByProduct(data: Product) {
    this.router.navigate([`/order`], { queryParams: { product_id: data?.id } });
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'loader-none');
  }

}
