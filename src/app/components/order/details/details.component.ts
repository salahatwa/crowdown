import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Select2UpdateEvent } from 'ng-select2-component';
import { Subject, of } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { ViewOrder } from '../../../shared/action/order.action';
import { Order } from '../../../shared/interface/order.interface';
import { OrderState } from '../../../shared/state/order.state';
import { ViewDividendModalComponent } from '../view-dividend-modal/view-dividend-modal.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {


  // @ViewChild("viewDividendModal") DeleteModal: ViewDividendModalComponent;

  public order: Order;

  private destroy$ = new Subject<void>();

  constructor(private store: Store,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          if (!params['id']) return of();
          return this.store
            .dispatch(new ViewOrder(params['id']))
            .pipe(mergeMap(() => this.store.select(OrderState.selectedOrder)))
        }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(order => {
        this.order = order!
      });
  }

  updateOrderStatus(data: Select2UpdateEvent) {
    if (data && data?.value) {
      // this.store.dispatch(new UpdateOrderStatus(this.order?.id!, { order_status_id: Number(data?.value) }));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
