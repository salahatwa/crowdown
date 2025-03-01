import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetBackendSettingOption, GetPaymentMethods, GetSettingOption, UpdateSettingOption } from "../action/setting.action";
import { Values } from "../interface/setting.interface";
import { NotificationService } from "../services/notification.service";
import { SettingService } from "../services/setting.service";
import * as data from '../data/settings';
export class SettingStateModel {
  setting: Values | null;
  backEndSetting: Map<string, any> | null;
  payment_methods: string[] | null;
}

@State<SettingStateModel>({
  name: "setting",
  defaults: {
    setting: null,
    backEndSetting: null,
    payment_methods: null
  }
})
@Injectable()
export class SettingState {

  constructor(private settingService: SettingService,
    private notificationService: NotificationService) { }

  @Selector()
  static setting(state: SettingStateModel) {
    return state.setting;
  }

  

  @Selector()
  static payment_methods(state: SettingStateModel) {
    return state.payment_methods;
  }

  @Selector()
  static backEndSetting(state: SettingStateModel) {
    return state.backEndSetting;
  }

  @Action(GetSettingOption)
  getSettingOptions(ctx: StateContext<SettingStateModel>) {

    ctx.patchState({
              setting: data.settings.values as any,
            });

    // return this.settingService.getSettingOption().pipe(
    //   tap({
    //     next: (result) => {
    //       ctx.patchState({
    //         setting: result.values,
    //       });
    //     },
    //     error: (err) => {
    //       throw new Error(err?.error?.message);
    //     },
    //   })
    // );
  }

  @Action(GetPaymentMethods)
  getPayentMethods(ctx: StateContext<SettingStateModel>) {
    return this.settingService.getPaymentMethods().pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            payment_methods: result?.data,
          });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
      })
    );
  }

  
  @Action(GetBackendSettingOption)
  getBackendSettingOption(ctx: StateContext<SettingStateModel>) {
    return this.settingService.getBackendSettingOption().pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            backEndSetting: result.data,
          });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
      })
    );
  }

  @Action(UpdateSettingOption)
  UpdateSettingOption(ctx: StateContext<SettingStateModel>, action: UpdateSettingOption) {
    return this.settingService.updateSettings(action?.payload).pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            backEndSetting: result.data,
          });

          this.notificationService.showSuccess('Settings has been updated successfully');
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
      })
    );
  }

}
