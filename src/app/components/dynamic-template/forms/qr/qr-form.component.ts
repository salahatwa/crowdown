import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetDyTemplates } from 'src/app/shared/action/template.action';
import { FILE_TYPE, IMAGE_TYPE } from 'src/app/shared/components/ui/media-box/media-box.component';
import { Attachment } from 'src/app/shared/interface/attachment.interface';
import { DyTemplate } from 'src/app/shared/interface/contents.interface';
import { ApiRs, Page } from 'src/app/shared/interface/core.interface';
import { DyTemplateState } from 'src/app/shared/state/template.state';

@Component({
  selector: 'app-qr-form',
  templateUrl: './qr-form.component.html',
  styleUrl: './qr-form.component.scss'
})
export class QrFormComponent implements OnInit {

  @Select(DyTemplateState.dyTemplates) items$: Observable<ApiRs<Page<DyTemplate>>>;

  @Output() change: EventEmitter<FormGroup> = new EventEmitter();

  FILE_TYPE = IMAGE_TYPE;
  public active = 'general';
  public qrForm: FormGroup;



  correctionLevels = [
    { value: 'L', label: 'Low' },
    { value: 'M', label: 'Medium' },
    { value: 'Q', label: 'Normal' },
    { value: 'H', label: 'Heigh' },
  ]

  cornorOptions = [
    { value: 'dot', label: 'Dot' },
    { value: 'square', label: 'Square' },
    { value: 'extra-rounded', label: 'Extra rounded' }
  ]

  dotsOptions = [
    { value: 'dots', label: 'Dots' },
    { value: 'rounded', label: 'Rounded' },
    { value: 'classy', label: 'Classy' },
    { value: 'classy-rounded', label: 'Classy rounded' },
    { value: 'square', label: 'Square' },
    { value: 'extra-rounded', label: 'Extra rounded' },
    { value: 'classy', label: 'Classy' }
  ]
  cornerDotsOptions = [
    { value: 'square', label: 'Square' },
    { value: 'dot', label: 'Dot' },
  ]


  shapeOptions = [
    { value: 'square', label: 'Square' },
    { value: 'circle', label: 'Circle' },
  ]


  constructor(private formBuilder: FormBuilder, private store: Store) {

  }

  submit() {

  }
  ngOnInit(): void {
    this.qrForm = this.formBuilder.group({
      data: new FormControl("Template", [Validators.required]),
      shape: new FormControl('square', [Validators.required]),
      width: new FormControl(200, [Validators.required]),
      height: new FormControl(200, [Validators.required]),
      margin: new FormControl(0, []),
      scale: new FormControl(0, []),
      rotate: new FormControl(0, []),
      zIndex: new FormControl(0, []),
      image: new FormControl("", []),

      //   imageOptions?: {
      //     hideBackgroundDots?: boolean;
      //     imageSize?: number;
      //     crossOrigin?: string;
      //     margin?: number;
      // };

      imageOptions: this.formBuilder.group({
        // typeNumber: new FormControl("0", [Validators.required]),
        // mode: new FormControl("Byte", [Validators.required]),
        hideBackgroundDots: new FormControl(true, []),
        imageSize: new FormControl(25, []),
        margin: new FormControl(0, []),
      }),

      frameOptions: this.formBuilder.group({
        // typeNumber: new FormControl("0", [Validators.required]),
        // mode: new FormControl("Byte", [Validators.required]),


        name: new FormControl("", []),
        style: new FormControl("", []),
        width: new FormControl(200, []),
        height: new FormControl(200, []),
        x: new FormControl(60, []),
        y: new FormControl(60, [])
      }),

      qrOptions: this.formBuilder.group({
        // typeNumber: new FormControl("0", [Validators.required]),
        // mode: new FormControl("Byte", [Validators.required]),
        errorCorrectionLevel: new FormControl("Q", [Validators.required]),
      }),

      backgroundOptions: this.formBuilder.group({
        color: new FormControl("#ffffff", [Validators.required]),
        gradient: this.formBuilder.group({
          type: new FormControl("", [Validators.required]),
          colorStops: new FormArray([this.colorStops(0, ''), this.colorStops(1, ''), this.colorStops(2, '')], [Validators.required])
        }),
      }),

      cornersSquareOptions: this.formBuilder.group({
        type: new FormControl("square", [Validators.required]),
        color: new FormControl("#000000", [Validators.required]),
        gradient: this.formBuilder.group({
          type: new FormControl("", [Validators.required]),
          colorStops: new FormArray([this.colorStops(0, '#000000'), this.colorStops(1, '#000000'), this.colorStops(2, '#000000')], [Validators.required])
        }),
      }),

      dotsOptions: this.formBuilder.group({
        type: new FormControl("dots", [Validators.required]),
        color: new FormControl("#000000", [Validators.required]),
        gradient: this.formBuilder.group({
          type: new FormControl("", [Validators.required]),
          colorStops: new FormArray([this.colorStops(0, '#000000'), this.colorStops(1, '#000000'), this.colorStops(2, '#000000')], [Validators.required])
        }),
      }),

      cornersDotOptions: this.formBuilder.group({
        type: new FormControl("square", [Validators.required]),
        color: new FormControl("#000000", [Validators.required]),
        gradient: this.formBuilder.group({
          type: new FormControl("", [Validators.required]),
          colorStops: new FormArray([this.colorStops(0, '#000000'), this.colorStops(1, '#000000'), this.colorStops(2, '#000000')], [Validators.required])
        }),
      }),

    });

    this.qrForm.valueChanges.subscribe((x: any) => {
      if (this.qrForm && this.qrForm?.value) {
        console.log('>>>>>>>>>>>>>>>>>>>>');
        this.change.emit(this.qrForm);
      }
    });

    this.store.dispatch(new GetDyTemplates({ type: 'SVG_FRAMES' }));

  }

  colorStops(offest, color) {
    return this.formBuilder.group({
      offset: new FormControl(offest, [Validators.required]),
      color: new FormControl(color, [Validators.required]),
    });
  }

  selectMetaImage(data: Attachment) {
    if (!Array.isArray(data)) {
      this.qrForm.controls['image'].setValue(data ? data?.path : null);
    }
  }

  onSelectFrame(event) {
    console.log(event?.target?.id);
    this.qrForm.get('frameOptions.name').setValue(event?.target?.id);
  }
}

