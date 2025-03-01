import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreateTax,
  DeleteAllTax,
  DeleteTax,
  EditTax,
  GetTaxes,
  UpdateTax
} from "../action/tax.action";
import { ApiRs, Page } from "../interface/core.interface";
import { Tax } from "../interface/tax.interface";
import { TaxService } from "../services/tax.service";
import { NotificationService } from "../services/notification.service";

export class TaxStateModel {
  tax: ApiRs<Page<Tax>>;
  selectedTax: Tax | null;
}

@State<TaxStateModel>({
  name: "tax",
  defaults: {
    tax: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },
    },
    selectedTax: null
  },
})
@Injectable()
export class TaxState {

  constructor(private notificationService: NotificationService,
    private taxService: TaxService, private store: Store) { }

  @Selector()
  static tax(state: TaxStateModel) {
    return state.tax;
  }

  // @Selector()
  // static taxes(state: TaxStateModel) {
  //   return state.tax.data.map((tax: Tax) => {
  //     return { label: tax?.name, value: tax?.id }
  //   });
  // }

  @Selector()
  static taxes(state: TaxStateModel) {
    // console.log(state.tax?.data?.content?.map(item => ({value: item.id, label: item.name})));
    return state.tax?.data?.content?.map(item => ({ value: item.id, label: item.name }));
  }

  @Selector()
  static selectedTax(state: TaxStateModel) {
    return state.selectedTax;
  }

  @Action(GetTaxes)
  getTaxes(ctx: StateContext<TaxStateModel>, action: GetTaxes) {
    return this.taxService.getTaxes(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            tax: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateTax)
  create(ctx: StateContext<TaxStateModel>, action: CreateTax) {
    return this.taxService.createTax(action.payload).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Tax has been created successfully');
        },
        error: err => {
          // console.log(err);
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditTax)
  edit(ctx: StateContext<TaxStateModel>, { id }: EditTax) {
    const state = ctx.getState();
    const result = state.tax.data?.content.find(tax => tax.id == id);
    ctx.patchState({
      ...state,
      selectedTax: result
    });
  }

  @Action(UpdateTax)
  update(ctx: StateContext<TaxStateModel>, { payload, id }: UpdateTax) {
    return this.taxService.updateTax(payload, id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Tax has been update successfully');
        },
        error: err => {

          throw new Error(err?.error?.message);
        }
      })
    );
  }


  @Action(DeleteTax)
  delete(ctx: StateContext<TaxStateModel>, { id }: DeleteTax) {
    // Tax Delete Logic here
    return this.taxService.deleteTax(id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Tax has been deleted successfully');
          this.store.dispatch(new GetTaxes({}));
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllTax)
  deleteAll(ctx: StateContext<TaxStateModel>, { ids }: DeleteAllTax) {
    // Tax Delete All Logic here
  }


}
