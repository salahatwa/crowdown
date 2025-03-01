import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GetCategories } from '../../../shared/action/category.action';
import { Category } from '../../../shared/interface/category.interface';
import { CategoryState } from '../../../shared/state/category.state';
import { LoaderState } from '../../../shared/state/loader.state';
import { Product } from 'src/app/shared/interface/product.interface';
import { GetCartItems, UpdateCart } from '../../../shared/action/cart.action';
import { GetProducts } from '../../../shared/action/product.action';
import { Cart, CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { ApiRs, Page, Params } from '../../../shared/interface/core.interface';
import { CartState } from '../../../shared/state/cart.state';
import { ProductState } from '../../../shared/state/product.state';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {

  @Select(LoaderState.status) loadingStatus$: Observable<boolean>;
  @Select(CategoryState.category) category$: Observable<ApiRs<Category[]>>;
  @Select(ProductState.product) product$: Observable<ApiRs<Page<Product>>>;
  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;
  @Select(CartState.cartTotal) cartTotal$: Observable<number>;

  public skeletonItems = Array.from({ length: 8 }, (_, index) => index);
  public activeCategory: Category | null;
  public selectedCategory: Number[] = [];
  public totalItems: number = 0;
  public filter = {
    'search': '',
    'keyword': '',
    'sort': '', // current Sorting Order
    'page': 0, // current page number
    'size': 10, // Display per page,
    'category_ids': [],
  };

  public customOptions: OwlOptions = {
    loop: true,
    margin: 15,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  public term = new FormControl();
  public loading: boolean = true;

  constructor(private store: Store,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {

    this.store.dispatch(new GetCategories({  status: true }));
    this.product$.subscribe(product => this.totalItems = product?.data?.totalElements);
    this.getProducts(this.filter, true);

    this.term.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(
        (data: string) => {
          this.filter.search = data
          this.getProducts(this.filter);
        });
  }

  getProducts(filter: Params, loader?: boolean) {
    this.loading = true;
    filter['status'] = true;
    this.store.dispatch(new GetProducts(filter)).subscribe({
      complete: () => {
        this.loading = false;
      }
    });
    if (!loader)
      this.renderer.addClass(this.document.body, 'loader-none');
  }

  selectCategory(data: Category) {
    this.activeCategory = this.activeCategory?.id != data?.id ? data : null;
    this.selectedCategory = [];
    this.filter.category_ids = [this.activeCategory ? this.activeCategory?.id! : ''];
    this.getProducts(this.filter);
  }

  selectCategoryItem(data: string[]) {
    this.activeCategory = null;
    this.filter.category_ids = data;
    this.getProducts(this.filter);
  }

  updateQuantity(item: Cart, qty: number) {
    this.renderer.addClass(this.document.body, 'loader-none');
    const params: CartAddOrUpdate = {
      id: item?.id,
      product_id: item?.product?.id!,
      product: item?.product,
      variation: item?.variation,
      variation_id: item?.variation_id ? item?.variation_id : null,
      quantity: qty
    }
    this.store.dispatch(new UpdateCart(params));
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.getProducts(this.filter);
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'loader-none');
  }

}
