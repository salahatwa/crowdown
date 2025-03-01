import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreateRole,
  DeleteAllRole,
  DeleteRole,
  EditRole,
  GetRoleModules,
  GetRoles,
  UpdateRole
} from "../action/role.action";
import { ApiRs } from "../interface/core.interface";
import { Role } from "../interface/role.interface";
import { NotificationService } from "../services/notification.service";
import { RoleService } from "../services/role.service";

export class RoleStateModel {
  role: ApiRs<Role[]>;
  selectedRole: Role | null;
  // modules: Module[];
}

@State<RoleStateModel>({
  name: "role",
  defaults: {
    role: {
      data: []
    },
    selectedRole: null,
    // modules: []
  },
})
@Injectable()
export class RoleState {

  constructor(private store: Store,
    private notificationService: NotificationService,
    private roleService: RoleService) { }

  @Selector()
  static role(state: RoleStateModel) {
    return state.role;
  }

  @Selector()
  static roles(state: RoleStateModel) {
    return state.role.data.map(res => {
      return { label: res?.name, value: res?.id }
    }).filter(value => value.label !== 'admin' && value.label !== 'vendor');
  }

  @Selector()
  static selectedRole(state: RoleStateModel) {
    return state.selectedRole;
  }

  // @Selector()
  // static roleModules(state: RoleStateModel) {
  //   return state.modules;
  // }

  @Action(GetRoles)
  getRoles(ctx: StateContext<RoleStateModel>, action: GetRoles) {
    return this.roleService.getRoles(action?.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            role: {
              data: result.data,
              // total: result?.total ? result?.total : result.data.length
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetRoleModules)
  getRoleModules(ctx: StateContext<RoleStateModel>) {
    // return this.roleService.getRoleModules().pipe(
    //   tap({
    //     next: result => {
    //       const state = ctx.getState();
    //       ctx.patchState({
    //         ...state,
    //         modules: result
    //       });
    //     },
    //     error: err => {
    //       throw new Error(err?.error?.message);
    //     }
    //   })
    // );
  }

  @Action(CreateRole)
  create(ctx: StateContext<RoleStateModel>, action: CreateRole) {
    return this.roleService.createRole(action?.payload).pipe(
      tap({
        next: result => {

          this.notificationService.showSuccess('Role has been created successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditRole)
  edit(ctx: StateContext<RoleStateModel>, { id }: EditRole) {
    const state = ctx.getState();
    const result = state.role.data.find(role => role.id == id);
    ctx.patchState({
      ...state,
      selectedRole: result
    }); 
  }

  @Action(UpdateRole)
  update(ctx: StateContext<RoleStateModel>, { payload, id }: UpdateRole) {
    return this.roleService.updateRole(id,payload).pipe(
      tap({
        next: result => {

          this.notificationService.showSuccess('Role has been updated successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteRole)
  delete(ctx: StateContext<RoleStateModel>, { id }: DeleteRole) {
    // Role Delete Logic Here
  }

  @Action(DeleteAllRole)
  deleteAll(ctx: StateContext<RoleStateModel>, { ids }: DeleteAllRole) {
    // Role Delete All Logic Here
  }

}
