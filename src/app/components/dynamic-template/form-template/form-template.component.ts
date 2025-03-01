import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Select, Store } from '@ngxs/store';
import { BlinkedQrComponent, Options } from 'blinked-qr';
import { Observable, Subject, of } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { IFormConfig } from 'src/app/shared/components/ui/dynamic-form-builder/shared/model/form-config.interface';
import { FILE_TYPE } from 'src/app/shared/components/ui/media-box/media-box.component';
import { DyTemplateState } from 'src/app/shared/state/template.state';
import { CreateDyTemplate, EditDyTemplate, GetDyTemplateTypes, UpdateDyTemplate } from '../../../shared/action/template.action';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { DyTemplate } from '../../../shared/interface/contents.interface';
import { QR_FORM } from '../tesmplates-schema-forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent {
  JSON = JSON;
  FILE_TYPE = FILE_TYPE;

  @Input() type: string;

  @Select(DyTemplateState.selectedFile) item$: Observable<DyTemplate>;

  @Select(DyTemplateState.types) types$: Observable<any>;

  @ViewChild(BlinkedQrComponent) qrcode: BlinkedQrComponent;

  public form: FormGroup;
  public id: string;
  public editor = ClassicEditor;
  // public config = data.config;

  private destroy$ = new Subject<void>();

  config: IFormConfig = QR_FORM;

  // isPreviewChanged: number;

  // opt:any={
  //   data: 'ddd',
  //   qrOptions: {
  //       errorCorrectionLevel: 'Q'
  //   },
  //   dotsOptions: {
  //       type: 'dots',
  //       gradient: {
  //           type: 'radial',
  //           colorStops: [{
  //               offset: 0,
  //               color: '#36CDA5'
  //           }, {
  //               offset: 1,
  //               color: '#1582AE'
  //           }, {
  //               offset: 2,
  //               color: '#0277BD'
  //           }]
  //       }
  //   },
  //   backgroundOptions: {
  //       color: "#ffffff",
  //   },
  //   cornersSquareOptions: {
  //       type: 'square'
  //   }
  // };

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      // url: new FormControl(),
      status: new FormControl(1)
    });
  }


  get content() {
    return this.form.get('content');
  }

  get contentJson() {
    try {
      return JSON.parse(this.content?.value) as Options;
    } catch (e) {
      return {};
    }
  }

  public onQrFormChange(event: FormGroup): void {
    if (event && event?.value) {
      this.content.setValue(JSON.stringify(event?.value));
      this.updateQrPreview();
    }
  }



  public updateQrPreview(): void {
    let data = this.contentJson;
    // data=this.removeEmpty(data);
    if (data?.backgroundOptions) {
      if (data?.backgroundOptions?.color)
        data.backgroundOptions.gradient = null;
    }

    if (data?.dotsOptions) {
      if (data?.dotsOptions?.color)
        data.dotsOptions.gradient = null;
    }

    if (data?.cornersDotOptions) {
      if (data?.cornersDotOptions?.color)
        data.cornersDotOptions.gradient = null;
    }

    if (data?.cornersSquareOptions) {
      if (data?.cornersSquareOptions?.color)
        data.cornersSquareOptions.gradient = null;
    }

    if (data?.frameOptions) {
      if (data?.frameOptions?.name=='')
        data.frameOptions = null;
    }


    //   data.dotsOptions.gradient= {
    //     "type": "radial",
    //     colorStops: [{
    //       offset: 0,
    //       color: '#999999'
    //     }, {
    //       offset: 1,
    //       color: '#1582AE'
    //     }, {
    //       offset: 2,
    //       color: '#0277BD'
    //     }]

    // };
    this.qrcode
      .update(data, {})
      .subscribe((res) => {
        // TO DO something!
        console.log('update:', res);
      });
  }

  get svg() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('content')?.value);
  }
  ngOnInit() {
    this.store.dispatch(new GetDyTemplateTypes());

    this.route.params
      .pipe(
        switchMap(params => {
          if (!params['id']) return of();
          return this.store
            .dispatch(new EditDyTemplate(params['id']))
            .pipe(mergeMap(() => this.store.select(DyTemplateState.selectedFile)))
        }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(item => {
        this.id = item?.id!;
        this.form.patchValue({
          name: item?.name,
          content: item?.content,
          type: item?.type,
          status: item?.status
        });
      });
  }




  submit() {
    this.form.markAllAsTouched();
    let action = new CreateDyTemplate(this.form.value);

    if (this.type == 'edit' && this.id) {
      action = new UpdateDyTemplate(this.form.value, this.id)
    }

    if (this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.router.navigateByUrl('/template');
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
