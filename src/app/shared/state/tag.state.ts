import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreateTag,
  DeleteAllTag,
  DeleteTag,
  EditTag,
  GetTags,
  UpdateTag
} from "../action/tag.action";
import { ApiRs, Page } from "../interface/core.interface";
import { Tag } from "../interface/tag.interface";
import { NotificationService } from "../services/notification.service";
import { TagService } from "../services/tag.service";

export class TagStateModel {
  tag: ApiRs<Page<Tag>>;
  selectedTag: Tag | null;
}

@State<TagStateModel>({
  name: "tag",
  defaults: {
    tag: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },
    },
    selectedTag: null
  },
})
@Injectable()
export class TagState {

  constructor(private store: Store,
    private notificationService: NotificationService,
    private tagService: TagService) { }

  @Selector()
  static tag(state: TagStateModel) {
    return state.tag;
  }

  @Selector()
  static selectedTag(state: TagStateModel) {
    return state.selectedTag;
  }

  @Action(GetTags)
  getTags(ctx: StateContext<TagStateModel>, action: GetTags) {
    return this.tagService.getTags(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            tag: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateTag)
  create(ctx: StateContext<TagStateModel>, action: CreateTag) {
    return this.tagService.createTag(action.payload).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Tag has been created successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditTag)
  edit(ctx: StateContext<TagStateModel>, { id }: EditTag) {
    const state = ctx.getState();
    const result = state.tag.data?.content.find(tag => tag.id == id);
    ctx.patchState({
      ...state,
      selectedTag: result
    });
  }

  @Action(UpdateTag)
  update(ctx: StateContext<TagStateModel>, { payload, id }: UpdateTag) {
    return this.tagService.updateTag(payload, id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Tag has been updated successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }


  @Action(DeleteTag)
  delete(ctx: StateContext<TagStateModel>, { id }: DeleteTag) {
    // Tag Delete Logic here
    return this.tagService.deleteTag(id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Tag has been deleted successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllTag)
  deleteAll(ctx: StateContext<TagStateModel>, { ids }: DeleteAllTag) {
    // Tag Delete All Logic here
  }

}
