import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreateProduct,
  DeleteAllProduct,
  DeleteProduct,
  EditProduct,
  GetProducts,
  ProductsStockReport,
  ReplicateProduct,
  UpdateProduct, UpdateProductStatus
} from "../action/product.action";
import { ApiRs, Page } from "../interface/core.interface";
import { Product } from "../interface/product.interface";
import { NotificationService } from "../services/notification.service";
import { ProductService } from "../services/product.service";

export class ProductStateModel {
  product: ApiRs<Page<Product>>;
  selectedProduct: Product | null;
  topSellingProducts: Product[]
}

@State<ProductStateModel>({
  name: "product",
  defaults: {
    product: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },
    },
    selectedProduct: null,
    topSellingProducts: []
  },
})
@Injectable()
export class ProductState {

  constructor(private store: Store,
    private notificationService: NotificationService,
    private productService: ProductService) { }

  @Selector()
  static product(state: ProductStateModel) {
    return state.product;
  }

  @Selector()
  static products(state: ProductStateModel) {
    return state.product.data?.content.filter(data => data.id !== state.selectedProduct?.id).map((res: Product) => {
      return {
        label: res?.name, value: res?.id, data: {
          type: res.type,
          name: res.name,
          slug: res.slug,
          stock_status: res.stock_status,
          image: res.thumbnail ? res.thumbnail : 'assets/images/product.png'
        }
      }
    })
  }

  @Selector()
  static selectedProduct(state: ProductStateModel) {
    return state.selectedProduct;
  }

  @Selector()
  static topSellingProducts(state: ProductStateModel) {
    return state.topSellingProducts;
  }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductStateModel>, action: GetProducts) {
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result: ApiRs<Page<Product>>) => {
          ctx.patchState({
            product: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  // 

  @Action(ProductsStockReport)
  getProductsReports(ctx: StateContext<ProductStateModel>, action: ProductsStockReport) {
    return this.productService.getProductsReport(action?.type).pipe(
      tap({
        next: (result: any) => {
          console.log('Done');
          // console.log(result);
          // this.file(result);
          this.file(result, "application/octet-stream",'product_reports.'+action?.type);
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  /**
     * Method is use to download file.
     * @param data - Array Buffer data
     * @param type - type of the document.
     */
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
}

  file(data: any,type:string,filename:string) {
    const blob = new Blob([data], {type: type});
      
      let url= URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
}

  @Action(CreateProduct)
  create(ctx: StateContext<ProductStateModel>, action: CreateProduct) {
    return this.productService.createProduct(action.payload).pipe(
      tap({
        next: (result) => {
          // ctx.patchState({
          //   product: {
          //     data: result?.data,
          //     total: result?.total ? result?.total : result.data?.length
          //   }
          // });
          this.notificationService.showSuccess('Product has been created');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditProduct)
  edit(ctx: StateContext<ProductStateModel>, { id }: EditProduct) {
    const state = ctx.getState();
    return this.productService.getProductById(id).pipe(
      tap({
        next: result => {
          ctx.patchState({
            ...state,
            selectedProduct: result?.data
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );

  }

  @Action(UpdateProduct)
  update(ctx: StateContext<ProductStateModel>, { payload, id }: UpdateProduct) {
    // Product Update Logic Here

    return this.productService.updateProduct(payload, id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Product has been updated');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateProductStatus)
  updateStatus(ctx: StateContext<ProductStateModel>, { id, status }: UpdateProductStatus) {
    // Product Update Status Logic Here
    return this.productService.updateProductStatus(status, id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Product has been updated');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteProduct)
  delete(ctx: StateContext<ProductStateModel>, { id }: DeleteProduct) {
    return this.productService.deleteProduct(id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Product has been deleted');
          this.store.dispatch(new GetProducts({ page: 0, size: 10 }));
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllProduct)
  deleteAll(ctx: StateContext<ProductStateModel>, { ids }: DeleteAllProduct) {
    // Product Delete All Logic Here
  }

  @Action(ReplicateProduct)
  replicateProduct(ctx: StateContext<ProductStateModel>, { ids }: ReplicateProduct) {
    // Product Replicate Logic Here
  }

}
