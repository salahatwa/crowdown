import { Component, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryState } from '../../shared/state/category.state';
import { GetCategories } from '../../shared/action/category.action';
import { Category } from 'src/app/shared/interface/category.interface';
import { ApiRs } from 'src/app/shared/interface/core.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  @Select(CategoryState.category) category$: Observable<ApiRs<Category[]>>;

  @Input() type: string = 'create';
  @Input() categoryType: string | null = 'product';
  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetCategories({}));
  }

}
