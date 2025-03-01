import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, of } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { IMAGE_TYPE } from 'src/app/shared/components/ui/media-box/media-box.component';
import { CreatePageContent, EditPageContent, UpdatePageContent } from '../../../shared/action/page.action';
import * as data from '../../../shared/data/ck-editor-config';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { PageContent } from '../../../shared/interface/contents.interface';
import { PageState } from '../../../shared/state/page.state';
import { Constant } from 'src/app/shared/utils/constant';

// import Font from '@ckeditor/ckeditor5-font/src/font';

// ClassicEditor.builtinPlugins.push(Font);

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent {
  IMAGE_TYPE = IMAGE_TYPE;

  @Input() type: string;

  @Select(PageState.selectedPage) page$: Observable<PageContent>;

  public form: FormGroup;
  public id: string;
  public editor = ClassicEditor;
  public config = data.config;

  private destroy$ = new Subject<void>();

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: new FormControl('', [Validators.required,Validators.pattern(Constant.PATTERN_NAME)]),
      title_tr: new FormControl('', [Validators.required,Validators.pattern(Constant.PATTERN_NAME)]),
      content: new FormControl('', [Validators.required]),
      content_tr: new FormControl('', [Validators.required]),
      meta_title: new FormControl(),
      meta_description: new FormControl(),
      page_meta_image: new FormControl(),
      status: new FormControl(1)
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          if (!params['id']) return of();
          return this.store
            .dispatch(new EditPageContent(params['id']))
            .pipe(mergeMap(() => this.store.select(PageState.selectedPage)))
        }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(page => {
        this.id = page?.id!;
        this.form.patchValue({
          title: page?.title,
          title_tr: page?.title_tr,
          content: page?.content,
          content_tr: page?.content_tr,
          meta_title: page?.meta_title,
          meta_description: page?.meta_description,
          page_meta_image: page?.page_meta_image,
          status: page?.status
        });
      });
  }

  selectMetaImage(data: Attachment) {
    if (!Array.isArray(data)) {
      this.form.controls['page_meta_image'].setValue(data ? data?.path : null);
    }
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreatePageContent(this.form.value);

    if (this.type == 'edit' && this.id) {
      action = new UpdatePageContent(this.form.value, this.id)
    }

    if (this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.router.navigateByUrl('/page');
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
