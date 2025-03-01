import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetNotification, MarkAsReadNotification, DeleteNotification } from "../action/notification.action";
import { Notification } from "../interface/notification.interface";
import { NotificationService } from "../services/notification.service";
import { ApiRs, Page } from "../interface/core.interface";

export class NotificationStateModel {
  notification: ApiRs<Page<Notification>>;
}

@State<NotificationStateModel>({
  name: "notification",
  defaults: {
    notification: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },
    },
  },
})

@Injectable()
export class NotificationState {

  constructor(private notificationService: NotificationService) { }

  @Selector()
  static notification(state: NotificationStateModel) {
    return state.notification.data?.content;
  }

  @Action(GetNotification)
  getNotification(ctx: StateContext<NotificationStateModel>, action: GetNotification) {
    return this.notificationService.getNotifications(action?.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            notification: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(MarkAsReadNotification)
  markAsRead(ctx: StateContext<NotificationStateModel>) {
    return this.notificationService.markAsReadNotifications().pipe(
      tap({
        next: result => {
          ctx.patchState({
            notification: {}
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteNotification)
  delete(ctx: StateContext<NotificationStateModel>, payload: DeleteNotification) {
    return this.notificationService.clearReadedNotification().pipe(
      tap({
        next: result => {
          ctx.patchState({
            notification: {}
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }


} 