import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import { CreateAttachment, DeleteAllAttachment, DeleteAttachment, GetAttachments } from "../action/attachment.action";
import { Attachment } from "../interface/attachment.interface";
import { ApiRs, Page } from "../interface/core.interface";
import { AttachmentService } from "../services/attachment.service";
import { NotificationService } from "../services/notification.service";

export class AttachmentStateModel {
  attachment: ApiRs<Page<Attachment>>
}

@State<AttachmentStateModel>({
  name: "attachment",
  defaults: {
    attachment: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },

    }
  },
})
@Injectable()
export class AttachmentState {

  constructor(private store: Store,
    private notificationService: NotificationService,
    private attachmentService: AttachmentService) { }

  @Selector()
  static attachment(state: AttachmentStateModel) {
    return state.attachment;
  }

  @Action(GetAttachments)
  getAttachments(ctx: StateContext<AttachmentStateModel>, action: GetAttachments) {
    return this.attachmentService.getAttachments(action.payload).pipe(
      tap({
        next: result => {
          console.log(result);
          ctx.patchState({
            attachment: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateAttachment)
  create(ctx: StateContext<AttachmentStateModel>, action: CreateAttachment) {
    return this.attachmentService.uploadAttachments(action.payload).pipe(
      tap({
        next: result => {


        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );

  }

  @Action(DeleteAttachment)
  delete(ctx: StateContext<AttachmentStateModel>, { id }: DeleteAttachment) {
    return this.attachmentService.deleteAttachment(id).pipe(
      tap({
        next: result => {
          console.log('deleted');

        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllAttachment)
  deleteAll(ctx: StateContext<AttachmentStateModel>, { ids }: DeleteAllAttachment) {
    return this.attachmentService.deleteAttachments(ids).pipe(
      tap({
        next: result => {
          console.log('deleted');

        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
