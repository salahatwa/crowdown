import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { AccountClear } from "../action/account.action";
import { AuthClear, ForgotPassWord, Login, Logout, UpdateInfo, UpdatePassword, VerifyEmailOtp } from "../action/auth.action";
import { User } from "../interface/user.interface";
import { AuthService } from "../services/auth.service";
import { NotificationService } from "../services/notification.service";

export interface AuthStateModel {
  user: User | null | any,
  accessToken: string | null;
  refreshToken: string | null;
  permissions: string[];
  mail: string;
  code: string;
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    user: null,
    accessToken: '',
    refreshToken: '',
    permissions: [],
    mail: '',
    code: ''
  },
})
@Injectable()
export class AuthState {

  constructor(private store: Store,
    public router: Router,
    private notificationService: NotificationService,
    private authService: AuthService) { }

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    // Pre Fake Login (if you are using ap
    // ctx.patchState({
    //   email: 'admin@example.com',
    //   accessToken: '135|laravel_sanctum_BrxRCMTABu7vFDsa1CHnkKCkjKtYPcBHMguiUAha319c7ede'
    // })
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }


  @Selector()
  static permissions(state: AuthStateModel) {
    return state.permissions;
  }

  @Selector()
  static accessToken(state: AuthStateModel) {
    return state.accessToken;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return !!state.accessToken;
  }

  @Selector()
  static email(state: AuthStateModel) {
    return state.user.email;
  }

  // @Selector()
  // static token(state: AuthStateModel) {
  //   return state.token;
  // }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    // Login Logic Here
    return this.authService.login(action?.payload).pipe(
      tap({
        next: result => {

          ctx.patchState({
            user: result?.data?.user,
            accessToken: result?.data?.accessToken,
            permissions: result?.data?.user?.permissions,
            // roleName: result.role.name
          });
        },
        error: err => {
          console.log(err?.error?.message);
          // this.notificationService.showError(err?.error?.message);
        }
      })
    );
  }

  @Action(ForgotPassWord)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassWord) {
    return this.authService.recovery1(action?.payload).pipe(
      tap({
        next: result => {

          ctx.patchState({
            mail: action.payload?.email
          });
        },
        error: err => {
          console.log(err?.error?.message);
          // this.notificationService.showError(err?.error?.message);
        }
      })
    );
  }

  @Action(VerifyEmailOtp)
  verifyEmail(ctx: StateContext<AuthStateModel>, action: VerifyEmailOtp) {
    return this.authService.recovery2(action?.payload).pipe(
      tap({
        next: result => {

          ctx.patchState({
            mail: action.payload?.email,
            code: action?.payload?.code
          });
        },
        error: err => {
          console.log(err?.error?.message);
          // this.notificationService.showError(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdatePassword)
  updatePassword(ctx: StateContext<AuthStateModel>, action: UpdatePassword) {

    if (action?.payload?.code) {
      return this.authService.recovery3(action?.payload).pipe(
        tap({
          next: result => {
            this.notificationService.showSuccess('Password has been changed');
          },
          error: err => {
            console.log(err?.error?.message);
            // this.notificationService.showError(err?.error?.message);
          }
        })
      );
    }
    else {
      return this.authService.updatePassword(action?.payload).pipe(
        tap({
          next: result => {
            this.notificationService.showSuccess('Password has been changed');
          },
          error: err => {
            console.log(err?.error?.message);
            // this.notificationService.showError(err?.error?.message);
          }
        })
      );
    }
  }

  @Action(UpdateInfo)
  update(ctx: StateContext<AuthStateModel>, { payload, id }: UpdateInfo) {
    return this.authService.updateInfo(id, payload).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Info been updated');
          console.log(result);
          ctx.patchState({
            user: result?.data
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }


  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    // Logout Logic Here
  }

  @Action(AuthClear)
  authClear(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      user: null,
      // token: '',
      accessToken: null,
      permissions: [],
    });
    this.store.dispatch(new AccountClear());
  }

}
