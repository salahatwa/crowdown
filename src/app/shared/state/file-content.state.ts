import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreateFileContent,
  DeleteAllFileContent,
  DeleteFileContent,
  EditFileContent,
  GetFileContents,
  GetFileTypes,
  UpdateFileContent,
  UpdateFileContentStatus,
} from "../action/file-content.action";
import { FileContent } from "../interface/contents.interface";
import { ApiRs, Page } from "../interface/core.interface";
import { FileContentService } from "../services/file-content.service";
import { NotificationService } from "../services/notification.service";

export class FileStateModel {
  page: ApiRs<Page<FileContent>>;
  selectedPage: FileContent | null;
  types:any;
}

@State<FileStateModel>({
  name: "file",
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
export class FileContentState {

  constructor(private store: Store,
    private notificationService: NotificationService,
    private fileContentService: FileContentService) { }

  @Selector()
  static file(state: FileStateModel) {
    return state.page;
  }


  @Selector()
  static types(state: FileStateModel) {
    return state.types?.map(item => ({ value: item.code, label: item.title }));;
  }

  @Selector()
  static files(state: FileStateModel) {
    return state.page.data.content.map(res => {
      return { label: res?.title, value: res?.id }
    });
  }

  @Selector()
  static selectedFile(state: FileStateModel) {
    return state.selectedPage;
  }


  @Action(GetFileTypes)
  getTypes(ctx: StateContext<FileStateModel>, action: GetFileTypes) {
    return this.fileContentService.listTypes(action.payload).pipe(
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

  @Action(GetFileContents)
  getPages(ctx: StateContext<FileStateModel>, action: GetFileContents) {
    return this.fileContentService.getPagedItems(action.payload).pipe(
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

  @Action(CreateFileContent)
  create(ctx: StateContext<FileStateModel>, action: CreateFileContent) {
    return this.fileContentService.createItem(action.payload).pipe(
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

  @Action(EditFileContent)
  edit(ctx: StateContext<FileStateModel>, { id }: EditFileContent) {
    const state = ctx.getState();
    const result = state.page.data?.content.find(page => page.id == id);
    ctx.patchState({
      ...state,
      selectedPage: result
    });
  }

  @Action(UpdateFileContent)
  update(ctx: StateContext<FileStateModel>, { payload, id }: UpdateFileContent) {
    return this.fileContentService.updateItem(payload, id).pipe(
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

  @Action(UpdateFileContentStatus)
  updateStatus(ctx: StateContext<FileStateModel>, { id, status }: UpdateFileContentStatus) {
    // Page Update Status Logic Here
  }

  @Action(DeleteFileContent)
  delete(ctx: StateContext<FileStateModel>, { id }: DeleteFileContent) {
    return this.fileContentService.deleteItem(id).pipe(
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

  @Action(DeleteAllFileContent)
  deleteAll(ctx: StateContext<FileStateModel>, { ids }: DeleteAllFileContent) {
    // Page Multiple Delete Logic Here
  }

}
