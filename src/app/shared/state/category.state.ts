import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreateCategory,
  DeleteCategory,
  EditCategory,
  GetCategories,
  UpdateCategory
} from "../action/category.action";
import { Category } from "../interface/category.interface";
import { ApiRs } from "../interface/core.interface";
import { CategoryService } from "../services/category.service";
import { NotificationService } from "../services/notification.service";

export class CategoryStateModel {
  category: ApiRs<Category[]>;
  selectedCategory: Category | null;
}

@State<CategoryStateModel>({
  name: "category",
  defaults: {
    category: {
      data: [] as Category[],
    },
    selectedCategory: null
  },
})
@Injectable()
export class CategoryState {

  constructor(private store: Store, private router: Router,
    private notificationService: NotificationService,
    private categoryService: CategoryService) { }

  @Selector()
  static category(state: CategoryStateModel) {
    return state.category;
  }

  @Selector()
  static categories(state: CategoryStateModel) {
    return state.category.data.map(res => {
      return {
        label: res?.name, value: res?.id,
        data: {
          name: res.name,
          slug: res.slug,
          image: res.thumbnail ? res.thumbnail : 'assets/images/category.png'
        }
      }
    });
  }


  @Selector()
  static selectedCategory(state: CategoryStateModel) {
    return state.selectedCategory;
  }

  @Action(GetCategories)
  getCategories(ctx: StateContext<CategoryStateModel>, action: GetCategories) {

    // isTree

   let list= this.categoryService.getCategories(action.payload);

   let listTree= this.categoryService.getCategoriesTreeView(action.payload);

   let f=action?.payload['isList']?list:listTree;


    return f.pipe(
      tap({
        next: result => {
          ctx.patchState({
            category: {
              data: result.data
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateCategory)
  create(ctx: StateContext<CategoryStateModel>, action: CreateCategory) {
    return this.categoryService.createCategory(action.payload).pipe(
      tap({
        next: result => {

          this.notificationService.showSuccess('Category has been created');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  finder(arr, key, parent) {
    for (let elem of arr) {
      if (elem.i == key) return parent;
      if (elem.children.length > 0) {
        let foundParentNode = this.finder(elem.children, key, elem);
        if (foundParentNode) return foundParentNode;
      }
    }
  }

  @Action(EditCategory)
  edit(ctx: StateContext<CategoryStateModel>, { id }: EditCategory) {
    return this.categoryService.getCategoryById(id).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedCategory: result?.data
          });

        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  find(array, id) {
    var result;
    array.some(o => result = o.id === id ? o : this.find(o.children || [], id));
    return result;
  };

  @Action(UpdateCategory)
  update(ctx: StateContext<CategoryStateModel>, { payload, id }: UpdateCategory) {
    return this.categoryService.updateCategory(payload, id).pipe(
      tap({
        next: result => {

          this.notificationService.showSuccess('Category has been updated');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteCategory)
  delete(ctx: StateContext<CategoryStateModel>, { category }: DeleteCategory) {
    console.log(category);
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedCategory: category
    });

    return this.categoryService.deleteCategory(category?.id).pipe(
      tap({
        next: result => {
          console.log(result);
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
