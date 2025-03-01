import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, of } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { CreateTag, EditTag, UpdateTag } from '../../../shared/action/tag.action';
import { Tag } from "../../../shared/interface/tag.interface";
import { TagState } from '../../../shared/state/tag.state';

import * as data from '../../../shared/components/ui/icon-picker/nic-icons';
import { Constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-form-tag',
  templateUrl: './form-tag.component.html',
  styleUrls: ['./form-tag.component.scss']
})
export class FormTagComponent {

  @Input() type: string;
  @Input() tagType: string | null = 'product';

  public form: FormGroup;
  public tag: Tag | null;

  private destroy$ = new Subject<void>();

  public codes = data.icons;

  constructor(private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required,Validators.pattern(Constant.PATTERN_NAME)]),
      name_tr: new FormControl('', [Validators.required,Validators.pattern(Constant.PATTERN_NAME)]),
      description: new FormControl(),
      icon: new FormControl(),
      type: new FormControl(this.tagType, []),
      status: new FormControl(true)
    });
  }

  onIconPickerSelect(icon: string): void {
    this.form.get('icon').setValue(icon);
  }

  ngOnChanges() {
    this.form.controls['type'].setValue(this.tagType);
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          if (!params['id']) return of();
          return this.store
            .dispatch(new EditTag(params['id']))
            .pipe(mergeMap(() => this.store.select(TagState.selectedTag)))
        }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(tag => {
        this.tag = tag;
        this.form.patchValue({
          name: this.tag?.name,
          name_tr: this.tag?.name_tr,
          icon: this.tag?.icon,
          description: this.tag?.description,
          status: this.tag?.status
        });
      });
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateTag(this.form.value);

    if (this.type == 'edit' && this.tag?.id) {
      action = new UpdateTag(this.form.value, this.tag.id)
    }

    if (this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          // if(this.tagType == 'post')
          //   this.router.navigateByUrl('/blog/tag'); 
          // else
          this.router.navigateByUrl('/tag');
        }
      });
    }
  }

}
