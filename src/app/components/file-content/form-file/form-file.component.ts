import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, of } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { FILE_TYPE } from 'src/app/shared/components/ui/media-box/media-box.component';
import { FileContentState } from 'src/app/shared/state/file-content.state';
import { Constant } from 'src/app/shared/utils/constant';
import { CreateFileContent, EditFileContent, GetFileTypes, UpdateFileContent } from '../../../shared/action/file-content.action';
import * as data from '../../../shared/data/ck-editor-config';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { FileContent } from '../../../shared/interface/contents.interface';

@Component({
  selector: 'app-form-file',
  templateUrl: './form-file.component.html',
  styleUrls: ['./form-file.component.scss']
})
export class FormFileComponent {
  FILE_TYPE = FILE_TYPE;

  @Input() type: string;

  @Select(FileContentState.selectedFile) item$: Observable<FileContent>;

  @Select(FileContentState.types) types$: Observable<any>;

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
      title: new FormControl('', [Validators.required, Validators.pattern(Constant.PATTERN_NAME)]),
      title_tr: new FormControl('', [Validators.required, Validators.pattern(Constant.PATTERN_NAME)]),
      code: new FormControl('', [Validators.required]),
      url: new FormControl(),
      status: new FormControl(1)
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetFileTypes());

    this.route.params
      .pipe(
        switchMap(params => {
          if (!params['id']) return of();
          return this.store
            .dispatch(new EditFileContent(params['id']))
            .pipe(mergeMap(() => this.store.select(FileContentState.selectedFile)))
        }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(item => {
        this.id = item?.id!;
        this.form.patchValue({
          title: item?.title,
          title_tr: item?.title_tr,
          code: item?.code,
          url: item?.url,
          status: item?.status
        });
      });
  }


  // countryChange(data: Select2UpdateEvent) {
  //   if(data && data?.value) {
  //     this.types$ = this.store
  //         .select(StateState.states)
  //         .pipe(map(filterFn => filterFn(+data?.value)));
  //     this.form.controls['state_id'].setValue('');
  //   }
  // }

  selectMetaImage(data: Attachment) {
    if (!Array.isArray(data)) {
      this.form.controls['url'].setValue(data ? data?.path : null);
    }
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateFileContent(this.form.value);

    if (this.type == 'edit' && this.id) {
      action = new UpdateFileContent(this.form.value, this.id)
    }

    if (this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.router.navigateByUrl('/file-content');
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
