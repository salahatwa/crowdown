import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { GetMenu } from "../action/menu.action";
import {  Menu } from "../interface/menu.interface";
// import { NavService } from "../services/nav.service";
import * as data from '../data/menu';

export class MenuStateModel {
  menu = {
    data: [] as Menu[],
  }
  // badges: Badges | null
}

@State<MenuStateModel>({
  name: "menu",
  defaults: {
    menu: {
      data: [],
    },
    // badges: null
  },
})
@Injectable()
export class MenuState {

  constructor(private store: Store) { }

  @Selector()
  static menu(state: MenuStateModel) {
    return state.menu;
  }

  // @Selector()
  // static badges(state: MenuStateModel) {
  //   return state.badges;
  // }

  // private updateBadgeValueRecursive(
  //   menuItems: Menu[],
  //   path: string,
  //   badgeValue: number
  // ) {
  //   for (const item of menuItems) {
  //     if (item.path && item.path.toString() == path.toString()) {
  //       item.badgeValue = badgeValue;
  //       break;
  //     }
  //     if (item.children) {
  //       this.updateBadgeValueRecursive(item.children, path, badgeValue);
  //     }
  //   }
  // }

  @Action(GetMenu)
  getMenu(ctx: StateContext<MenuStateModel>) {
    ctx.patchState({
      menu: {
        data: data.menu,
      }
    });
  }


}