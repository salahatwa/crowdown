import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, of } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { CreateCategory, EditCategory, GetCategories, UpdateCategory } from '../../../shared/action/category.action';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { Category } from '../../../shared/interface/category.interface';
import { CategoryState } from '../../../shared/state/category.state';
import { IMAGE_TYPE } from 'src/app/shared/components/ui/media-box/media-box.component';
import { Constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent {
  IMAGE_TYPE=IMAGE_TYPE;

  @Input() type: string;
  @Input() categories: Category[];
  @Input() categoryType: string | null = 'product';

  public form: FormGroup;
  public category: Category;
  public id: number;

  private destroy$ = new Subject<void>();

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required,Validators.pattern(Constant.PATTERN_NAME)]),
      name_tr: new FormControl('', [Validators.required,Validators.pattern(Constant.PATTERN_NAME)]),
      description: new FormControl(),
      parentId: new FormControl(),
      type: new FormControl(this.categoryType, []),
      commission_rate: new FormControl(),
      thumbnail: new FormControl(),
      status: new FormControl(true)
    });
  }

  ngOnChanges() {
    this.form.controls['type'].setValue(this.categoryType);
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          if (!params['id']) return of();
          return this.store
            .dispatch(new EditCategory(params['id']))
            .pipe(mergeMap(() => this.store.select(CategoryState.selectedCategory)))
        }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(category => {
        this.category = category!;
        this.form.patchValue({
          name: this.category?.name,
          name_tr:this.category?.name_tr,
          description: this.category?.description,
          parentId: this.category?.parentId,
          type: this.category?.type,
          commission_rate: this.category?.commission_rate,
          thumbnail: this.category?.thumbnail,
          status: this.category?.status
        });
      });
  }

  selectItem(data: number[]) {
    if (Array.isArray(data) && data.length) {
      this.form.controls['parentId'].setValue(data[0]);
    } else {
      this.form.controls['parentId'].setValue('');
    }
  }

  selectCategoryImage(data: Attachment) {
    if (!Array.isArray(data)) {
      this.form.controls['thumbnail'].setValue(data ? data.path : '');
    }
  }



  submit() {
    this.form.markAllAsTouched();
    let action = new CreateCategory(this.form.value);

    if (this.type == 'edit' && this.category?.id) {
      action = new UpdateCategory(this.form.value, this.category.id)
    }

    if (this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          if (this.type == 'create') {
            this.form.reset();
            this.form.controls['thumbnail'].setValue('');
            this.form.controls['status'].setValue(true);
          }
          this.category = undefined;
          this.store.dispatch(new GetCategories({}));
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


