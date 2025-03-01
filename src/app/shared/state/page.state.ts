import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreatePageContent,
  DeleteAllPageContent,
  DeletePageContent,
  EditPageContent,
  GetPageContents,
  UpdatePageContent,
  UpdatePageContentStatus,
} from "../action/page.action";
import { ApiRs, Page } from "../interface/core.interface";
import { PageContent } from "../interface/contents.interface";
import { NotificationService } from "../services/notification.service";
import { PageService } from "../services/page.service";

export class PageStateModel {
  page: ApiRs<Page<PageContent>>;
  selectedPage: PageContent | null;
}

@State<PageStateModel>({
  name: "page",
  defaults: {
    page: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },
    },
    selectedPage: null
  },
})
@Injectable()
export class PageState {

  constructor(private store: Store,
    private notificationService: NotificationService,
    private pageService: PageService) { }

  @Selector()
  static page(state: PageStateModel) {
    return state.page;
  }

  @Selector()
  static pages(state: PageStateModel) {
    return state.page.data.content.map(res => {
      return { label: res?.title, value: res?.id }
    });
  }

  @Selector()
  static selectedPage(state: PageStateModel) {
    return state.selectedPage;
  }

  @Action(GetPageContents)
  getPages(ctx: StateContext<PageStateModel>, action: GetPageContents) {
    return this.pageService.getPagedItems(action.payload).pipe(
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

  @Action(CreatePageContent)
  create(ctx: StateContext<PageStateModel>, action: CreatePageContent) {
    return this.pageService.createItem(action.payload).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Page has been created successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditPageContent)
  edit(ctx: StateContext<PageStateModel>, { id }: EditPageContent) {
    const state = ctx.getState();
    const result = state.page.data?.content.find(page => page.id == id);
    ctx.patchState({
      ...state,
      selectedPage: result
    });
  }

  @Action(UpdatePageContent)
  update(ctx: StateContext<PageStateModel>, { payload, id }: UpdatePageContent) {
    return this.pageService.updateItem(payload, id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Page has been updated successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdatePageContentStatus)
  updateStatus(ctx: StateContext<PageStateModel>, { id, status }: UpdatePageContentStatus) {
    // Page Update Status Logic Here
  }

  @Action(DeletePageContent)
  delete(ctx: StateContext<PageStateModel>, { id }: DeletePageContent) {
    return this.pageService.deleteItem(id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Page has been deleted successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllPageContent)
  deleteAll(ctx: StateContext<PageStateModel>, { ids }: DeleteAllPageContent) {
    // Page Multiple Delete Logic Here
  }

}
