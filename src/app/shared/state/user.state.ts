import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreateUser,
  CreateUserAddress,
  DeleteAllUser,
  DeleteUser,
  EditUser,
  ExportUser,
  GetUsers,
  ImportUser,
  UpdateAnotherUserPass,
  UpdateUser,
  UpdateUserStatus
} from "../action/user.action";
import { ApiRs, Page } from "../interface/core.interface";
import { User } from "../interface/user.interface";
import { NotificationService } from "../services/notification.service";
import { UserService } from "../services/user.service";

export class UserStateModel {
  user: ApiRs<Page<User>>;
  selectedUser: User | null;
}

@State<UserStateModel>({
  name: "user",
  defaults: {
    user: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },
    },
    selectedUser: null
  },
})
@Injectable()
export class UserState {

  constructor(private store: Store,
    private notificationService: NotificationService,
    private userService: UserService) { }

  @Selector()
  static user(state: UserStateModel) {
    return state.user;
  }

  @Selector()
  static users(state: UserStateModel) {
    return state.user.data.content.map(user => {
      return { label: user?.name, value: user?.id }
    });
  }

  @Selector()
  static selectedUser(state: UserStateModel) {
    return state.selectedUser;
  }

  @Action(GetUsers)
  getUsers(ctx: StateContext<UserStateModel>, action: GetUsers) {
    action.payload['system']= false;
    return this.userService.getUsers(action?.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            user: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateUser)
  create(ctx: StateContext<UserStateModel>, action: CreateUser) {
    return this.userService.createUser(action?.payload).pipe(
      tap({
        next: result => {

          this.notificationService.showSuccess('User has been created');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditUser)
  edit(ctx: StateContext<UserStateModel>, { id }: EditUser) {
    const state = ctx.getState();
    const result = state.user.data.content.find(user => user.id == id);
    ctx.patchState({
      ...state,
      selectedUser: result
    });
  }

  @Action(UpdateUser)
  update(ctx: StateContext<UserStateModel>, { payload, id }: UpdateUser) {
    return this.userService.updateUser(id, payload).pipe(
      tap({
        next: result => {

          this.notificationService.showSuccess('User has been updated');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }


  @Action(UpdateAnotherUserPass)
  updateAnotherUserPass(ctx: StateContext<UserStateModel>, { payload, id }: UpdateAnotherUserPass) {
    return this.userService.updateAnotherUserPass(id, payload).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('User Password has been updated');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateUserStatus)
  updateStatus(ctx: StateContext<UserStateModel>, { id, status }: UpdateUserStatus) {
    // User Update Status Logic Here
  }

  @Action(DeleteUser)
  delete(ctx: StateContext<UserStateModel>, { id }: DeleteUser) {
    // User Delete Logic Here

    return this.userService.deleteUser(id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('User has been deleted successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllUser)
  deleteAll(ctx: StateContext<UserStateModel>, { ids }: DeleteAllUser) {
    // User Delete All Logic Here
  }

  @Action(ImportUser)
  import(ctx: StateContext<UserStateModel>, action: ImportUser) {
    // User Import Logic Here
  }

  @Action(ExportUser)
  export(ctx: StateContext<UserStateModel>, action: ExportUser) {
    // User Export Logic Here
  }

  @Action(CreateUserAddress)
  createUserAddress(ctx: StateContext<UserStateModel>, action: CreateUserAddress) {
    // User Create Address Logic Here
  }

}
