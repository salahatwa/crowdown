import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreateDyTemplate,
  DeleteAllDyTemplate,
  DeleteDyTemplate,
  EditDyTemplate,
  GetDyTemplates,
  GetDyTemplateTypes,
  UpdateDyTemplate,
  UpdateDyTemplateStatus
} from "../action/template.action";
import { DyTemplate } from "../interface/contents.interface";
import { ApiRs, Page } from "../interface/core.interface";
import { NotificationService } from "../services/notification.service";
import { TemplateService } from "../services/template.service";

export class TemplateStateModel {
  page: ApiRs<Page<DyTemplate>>;
  selectedPage: DyTemplate | null;
  types: any;
}

@State<TemplateStateModel>({
  name: "template",
  defaults: {
    page: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },
    },
    selectedPage: null,
    types: null
  },
})
@Injectable()
export class DyTemplateState {

  constructor(private store: Store,
    private notificationService: NotificationService,
    private templateService: TemplateService) { }

  @Selector()
  static dyTemplates(state: TemplateStateModel) {
    return state.page;
  }


  @Selector()
  static types(state: TemplateStateModel) {
    return state.types?.map(item => ({ value: item.code, label: item.title }));;
  }

  @Selector()
  static files(state: TemplateStateModel) {
    return state.page.data.content.map(res => {
      return { label: res?.name, value: res?.id }
    });
  }

  @Selector()
  static selectedFile(state: TemplateStateModel) {
    return state.selectedPage;
  }


  @Action(GetDyTemplateTypes)
  getTypes(ctx: StateContext<TemplateStateModel>, action: GetDyTemplateTypes) {
    return this.templateService.listTypes(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            types: result?.data
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetDyTemplates)
  getPages(ctx: StateContext<TemplateStateModel>, action: GetDyTemplates) {
    return this.templateService.getPagedItems(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            page: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateDyTemplate)
  create(ctx: StateContext<TemplateStateModel>, action: CreateDyTemplate) {
    return this.templateService.createItem(action.payload).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Item has been created successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditDyTemplate)
  edit(ctx: StateContext<TemplateStateModel>, { id }: EditDyTemplate) {
    const state = ctx.getState();
    const result = state.page.data?.content.find(page => page.id == id);
    ctx.patchState({
      ...state,
      selectedPage: result
    });
  }

  @Action(UpdateDyTemplate)
  update(ctx: StateContext<TemplateStateModel>, { payload, id }: UpdateDyTemplate) {
    return this.templateService.updateItem(payload, id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Item has been updated successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateDyTemplateStatus)
  updateStatus(ctx: StateContext<TemplateStateModel>, { id, status }: UpdateDyTemplateStatus) {
    // Page Update Status Logic Here
  }

  @Action(DeleteDyTemplate)
  delete(ctx: StateContext<TemplateStateModel>, { id }: DeleteDyTemplate) {
    return this.templateService.deleteItem(id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Item has been deleted successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllDyTemplate)
  deleteAll(ctx: StateContext<TemplateStateModel>, { ids }: DeleteAllDyTemplate) {
    // Page Multiple Delete Logic Here
  }

}
