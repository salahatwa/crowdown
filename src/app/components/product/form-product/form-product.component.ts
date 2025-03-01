import { Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Select2, Select2Data, Select2SearchEvent } from 'ng-select2-component';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { CreateProduct, EditProduct, GetProducts, UpdateProduct } from '../../../shared/action/product.action';
import { Product, VariationCombination } from '../../../shared/interface/product.interface';
import { ProductState } from '../../../shared/state/product.state';
import { priceValidator } from '../../../shared/validator/price-validator';

import { FILE_TYPE, IMAGE_TYPE, VIDEO_TYPE } from 'src/app/shared/components/ui/media-box/media-box.component';
import { Category } from 'src/app/shared/interface/category.interface';
import { Tag } from 'src/app/shared/interface/tag.interface';
import { GetCategories } from '../../../shared/action/category.action';
import { GetTags } from '../../../shared/action/tag.action';
import { GetTaxes } from '../../../shared/action/tax.action';
import * as data from '../../../shared/data/ck-editor-config';
import { Attachment } from '../../../shared/interface/attachment.interface';
import { ApiRs, Page } from '../../../shared/interface/core.interface';
import { Values } from '../../../shared/interface/setting.interface';
import { CategoryState } from '../../../shared/state/category.state';
import { SettingState } from '../../../shared/state/setting.state';
import { TagState } from '../../../shared/state/tag.state';
import { TaxState } from '../../../shared/state/tax.state';
import { Constant } from 'src/app/shared/utils/constant';

function convertToNgbDate(date: NgbDateStruct): NgbDate {
  return new NgbDate(date.year, date.month, date.day);
}

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent {
  FILE_TYPE = FILE_TYPE;
  IMAGE_TYPE = IMAGE_TYPE;
  VIDEO_TYPE = VIDEO_TYPE;

  current = new Date();
  minDate = {
    year: this.current.getFullYear(), month:
      this.current.getMonth() + 1, day: this.current.getDate()
  };

  @Input() type: string;

  @ViewChild('nav') nav: NgbNav;

  @Select(ProductState.selectedProduct) product$: Observable<Product>;
  @Select(ProductState.products) products$: Observable<Select2Data>;
  // @Select(StoreState.stores) store$: Observable<Select2Data>;
  @Select(CategoryState.category) category$: Observable<ApiRs<Category[]>>;
  @Select(TagState.tag) tag$: Observable<ApiRs<Page<Tag>>>;
  @Select(TaxState.taxes) tax$: Observable<Select2Data>;
  @Select(SettingState.setting) setting$: Observable<Values>;

  public attribute$: Observable<Select2Data>;
  public active = 'general';
  public tabError: string | null;
  public form: FormGroup;
  public id: string;
  public variationCombinations: VariationCombination[] = [];

  public variantCount: number = 0;
  public editor = ClassicEditor;
  public config = data.config;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;

  public subFromDate: NgbDate | null;
  public subToDate: NgbDate | null;
  // public hoveredDate: NgbDate | null = null;
  public product: Product;
  private destroy$ = new Subject<void>();


  public selectedCategories: string[] = [];
  public selectedTags: string[] = [];

  public filter = {
    'search': '',
    'paginate': 15,
    'ids': '',
    'with_union_products': 0,
    'is_approved': 1
  };

  get preventUpdate() {
    return (this.product?.stock_status == 'out_stock' || this.product?.status == true ||this.product?.is_featured==false) && this.type == 'edit';
  }

  set(event: Event) {
    // this.selectAddress.emit(+(<HTMLInputElement>event.target)?.value);
    console.log((<HTMLInputElement>event.target)?.value);
    this.form.get('dividend_distribution').setValue((<HTMLInputElement>event.target)?.value);
  }

  private search = new Subject<string>();


  monthDiff = (startDate, endDate) => Math.max(0, (endDate?.getFullYear() - startDate?.getFullYear()) * 12 - startDate.getMonth() + endDate?.getMonth());

  monthDiffSt = (startDate, endDate) => this.monthDiff(new Date(startDate), new Date(endDate));

  dividend_distribution: Select2Data = [
    { label: 'END_PERIOD', value: 'END_PERIOD', id: 'END_PERIOD' },
    { label: 'MONTHLY', value: 'MONTHLY', id: 'MONTHLY' },
    { label: 'QUARTER', value: 'QUARTER', id: 'QUARTER' },
    { label: 'HALF_YEAR', value: 'HALF_YEAR', id: 'HALF_YEAR' },
    { label: 'YEARLY', value: 'YEARLY', id: 'YEARLY' }
  ];

  // this.computeDividend('END_PERIOD')
  computeROI(): number {
    return +((this.form.get('annual_return_rate')?.value * this.monthDiffSt(this.form.get('sale_starts_at')?.value, this.form.get('sale_expired_at')?.value)) / 12).toFixed(2);
  }
  computeDividend() {
    if (!this.form.get('dividend_distribution')?.value || this.form.get('dividend_distribution')?.value == '')
      return 0;

    let end_period = + ((this.computeROI() * this.form.get('price').value * this.form.get('quantity').value) / 100).toFixed(2);

    let monthly = + (end_period / this.monthDiffSt(this.form.get('sale_starts_at')?.value, this.form.get('sale_expired_at')?.value)).toFixed(2);
    switch (this.form.get('dividend_distribution')?.value) {
      case 'END_PERIOD':
        return end_period;
      case 'MONTHLY':
        return monthly;
      case 'QUARTER':
        return monthly * 3;
      case 'HALF_YEAR':
        return monthly * 6;
      case 'YEARLY':
        return monthly * 12;
    }

    return '';
  }

  nameValidator(form: FormGroup): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const needRequire = form.get('userId').value != 1
      const noValue = needRequire ? !(control.value) : false
      return noValue ? { required: control.value } : null;
    };
  }

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) {

    // console.log(this.monthDiff(new Date('2024-1-1'), new Date('2024-6-1')));

    // more: true 
    this.store.dispatch(new GetCategories({ type: 'product', status: true }));
    this.store.dispatch(new GetTags({ page: 0, size: 1000, status: true }));
    this.store.dispatch(new GetTaxes({ page: 0, size: 1000, status: true }));

    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required,Validators.pattern(Constant.PATTERN_NAME)]),
      short_description: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      name_tr: new FormControl('', [Validators.required,Validators.pattern(Constant.PATTERN_NAME)]),
      short_description_tr: new FormControl('', [Validators.required]),
      description_tr: new FormControl('', [Validators.required]),
      unit: new FormControl(),
      weight: new FormControl(),
      stock_status: new FormControl('in_stock', []),
      sku: new FormControl('', [this.notAllowed(/^0/)]),
      quantity: new FormControl('', [Validators.required, this.notAllowed(/^0/)]),
      price: new FormControl('', [Validators.required, this.notAllowed(/^0/), priceValidator]),
      commission: new FormControl(),
      min_sale_units: new FormControl(0, [Validators.required, this.notAllowed(/^0/)]),
      max_sale_units: new FormControl(0, [Validators.required]),

      is_periodic_sale_enable: new FormControl(),
      sale_starts_at: new FormControl(),
      sale_expired_at: new FormControl(),

      is_subscription_allowed: new FormControl(true),
      subscriptionStartDate: new FormControl(),
      subscriptionEndDate: new FormControl(),

      tags: new FormControl(),
      categories: new FormControl('', [Validators.required]),
      thumbnail: new FormControl(),
      video: new FormControl(),
      product_galleries: new FormControl(),
      annual_return_rate: new FormControl(),
      invest_memorandum: new FormControl(),
      dividend_distribution: new FormControl(),
      tax_id: new FormControl('', [Validators.required]),
      estimated_delivery_text: new FormControl(),
      return_policy_text: new FormControl(),
      is_featured: new FormControl(0),
      is_trending: new FormControl(0),
      is_return: new FormControl(1),
      status: new FormControl(1),
      files: this.formBuilder.array([], []),
      attributes: this.formBuilder.array([], [])
    });

    if (this.form.get('is_subscription_allowed').value == 1) {
      this.form.get('subscriptionStartDate').setValidators([Validators.required]);
      this.form.get('subscriptionEndDate').setValidators([Validators.required]);
    } else {
      ;
      this.form.get('subscriptionStartDate').setValidators([]);
      this.form.get('subscriptionEndDate').setValidators([]);
    }

    this.form.controls['is_subscription_allowed'].valueChanges.subscribe((value) => {
      console.log(value);
      if (Boolean(value) === true || value == 1) {
        this.form.get('subscriptionStartDate').setValidators([Validators.required]);
        this.form.get('subscriptionEndDate').setValidators([Validators.required]);
      }
      else {
        this.form.get('subscriptionStartDate').clearValidators();
        this.form.get('subscriptionEndDate').clearValidators();

      }
      this.form.get('subscriptionStartDate').updateValueAndValidity();
      this.form.get('subscriptionEndDate').updateValueAndValidity();
    });

    // this.form.get('is_subscription_allowed').setValue(1);

    this.form.controls['is_periodic_sale_enable'].valueChanges.subscribe((value) => {
      if (Boolean(value) === true) {
        this.form.get('sale_starts_at').setValidators([Validators.required]);
        this.form.get('sale_expired_at').setValidators([Validators.required]);
        this.form.get('dividend_distribution').setValidators([Validators.required]);
        this.form.get('annual_return_rate').setValidators([Validators.required]);
      }
      else {
        this.form.get('sale_starts_at').clearValidators();
        this.form.get('sale_expired_at').clearValidators();
        this.form.get('dividend_distribution').clearValidators();
        this.form.get('annual_return_rate').clearValidators();
      }

      this.form.get('sale_starts_at').updateValueAndValidity();
      this.form.get('sale_expired_at').updateValueAndValidity();
      this.form.get('dividend_distribution').updateValueAndValidity();
      this.form.get('annual_return_rate').updateValueAndValidity();
    });

    // this.form.updateValueAndValidity();
  }


  /**
   * Regex form validator
   */
  notAllowed(input: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = input.test(control.value);
      return forbidden ? { notAllowed: { value: control.value } } : null;
    };
  }

  ngOnInit() {
    this.search
      .pipe(debounceTime(300)) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
        this.filter['search'] = inputValue;
        this.store.dispatch(new GetProducts(this.filter));
      });

    this.route.params
      .pipe(
        switchMap(params => {
          if (!params['id']) return of();
          return this.store
            .dispatch(new EditProduct(params['id']))
            .pipe(mergeMap(() => this.store.select(ProductState.selectedProduct)))
        }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(product => {
        this.product = product;
        this.fromDate = product?.sale_starts_at ? convertToNgbDate(this.formatter.parse(product?.sale_starts_at)!) : null;
        this.toDate = product?.sale_expired_at ? convertToNgbDate(this.formatter.parse(product?.sale_expired_at)!) : null;

        this.subFromDate = product?.subscriptionStartDate ? convertToNgbDate(this.formatter.parse(product?.subscriptionStartDate)!) : null;
        this.subToDate = product?.subscriptionEndDate ? convertToNgbDate(this.formatter.parse(product?.subscriptionEndDate)!) : null;



        this.selectedCategories = product?.categoryIds;
        this.selectedTags = product?.tagIds;

        this.id = product?.id!;

        // let attributes = product?.attributes.map((value) => value?.id);

        this.form.patchValue({
          // attributes_ids: attributes,
          name: product?.name,
          short_description: product?.short_description,
          description: product?.description,

          name_tr: product?.name_tr,
          short_description_tr: product?.short_description_tr,
          description_tr: product?.description_tr,

          unit: product?.unit,
          weight: product?.weight,
          stock_status: product?.stock_status,
          sku: product?.sku,
          quantity: product?.quantity,
          price: product?.price,
          commission: product?.commission,
          min_sale_units: product?.min_sale_units,
          max_sale_units: product?.max_sale_units,
          is_periodic_sale_enable: product?.is_periodic_sale_enable,
          sale_starts_at: product?.sale_starts_at,
          sale_expired_at: product?.sale_expired_at,

          is_subscription_allowed: product?.is_subscription_allowed,
          subscriptionStartDate: product?.subscriptionStartDate,
          subscriptionEndDate: product?.subscriptionEndDate,

          tags: product?.tagIds,
          categories: product?.categoryIds,
          is_random_related_products: product?.is_random_related_products,
          related_products: product?.related_products,
          thumbnail: product?.thumbnail,
          video: product?.video,
          product_galleries: product?.galleries,
          size_chart_image_id: product?.size_chart_image_id,
          files: product?.files,
          attributes: product?.attributes,
          annual_return_rate: product?.annual_return_rate,
          invest_memorandum: product?.invest_memorandum,
          dividend_distribution: product?.dividend_distribution,
          meta_description: product?.meta_description,
          product_meta_image_id: product?.product_meta_image_id,
          social_share: product?.social_share,
          is_free_shipping: product?.is_free_shipping,
          is_return: product?.is_return,
          tax_id: product?.tax_id,
          estimated_delivery_text: product?.estimated_delivery_text,
          return_policy_text: product?.return_policy_text,
          is_featured: product?.is_featured,
          is_trending: product?.is_trending,
          status: product?.status,
        });

        if (this?.product?.files) {
          this?.product?.files?.forEach(meta => {
            this.filesControl.push(
              this.formBuilder.group({
                id: new FormControl(meta?.id, []),
                key: new FormControl(meta?.key, []),
                value: new FormControl(meta?.value, [])
              })
            )
          }
          );
        }

        if (this?.product?.attributes) {
          this?.product?.attributes?.forEach(meta => {
            this.attributesControl.push(
              this.formBuilder.group({
                id: new FormControl(meta?.id, []),
                key: new FormControl(meta?.key, []),
                value: new FormControl(meta?.value, [])
              })
            )
          }
          );
        }

      });
  }

  selectMemorandum(data: Attachment) {
    if (!Array.isArray(data)) {
      this.form.controls['invest_memorandum'].setValue(data ? data.path : '');
    }
  }

  productDropdown(event: Select2) {
    if (event['innerSearchText']) {
      this.search.next('');
    }
  }

  searchProduct(event: Select2SearchEvent) {
    this.search.next(event.search);
  }

  onInvestDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate)
      this.form.controls['sale_starts_at'].setValue(`${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`);
    if (this.toDate)
      this.form.controls['sale_expired_at'].setValue(`${this.toDate?.year}-${this.toDate?.month}-${this.toDate?.day}`);

  }


  onSubscriptionDateSelection(date: NgbDate) {
    if (!this.subFromDate && !this.subToDate) {
      this.subFromDate = date;
    } else if (this.subFromDate && !this.subToDate && date && date.after(this.subFromDate)) {
      this.subToDate = date;
    } else {
      this.subToDate = null;
      this.subFromDate = date;
    }
    if (this.subFromDate)
      this.form.controls['subscriptionStartDate'].setValue(`${this.subFromDate.year}-${this.subFromDate.month}-${this.subFromDate.day}`);
    if (this.subToDate)
      this.form.controls['subscriptionEndDate'].setValue(`${this.subToDate?.year}-${this.subToDate?.month}-${this.subToDate?.day}`);
  }

  onDateSelection(date: NgbDate, controlF: string, controlT: string, custFromDate: NgbDate, custToDate: NgbDate) {
    if (!custFromDate && !custToDate) {
      custFromDate = date;

      if (controlF == 'subscriptionStartDate')
        this.subFromDate = date;
      else
        this.fromDate = date;

    } else if (custFromDate && !custToDate && date && date.after(custFromDate)) {
      custToDate = date;

      if (controlF == 'subscriptionStartDate')
        this.subToDate = date;
      else
        this.toDate = date;

    } else {
      custToDate = null;
      custFromDate = date;
      if (controlF == 'subscriptionStartDate') {
        this.subToDate = null;
        this.subFromDate = date;
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
    }
    if (custFromDate)
      this.form.controls[controlF].setValue(`${custFromDate.year}-${custFromDate.month}-${custFromDate.day}`);
    if (custToDate)
      this.form.controls[controlT].setValue(`${custToDate?.year}-${custToDate?.month}-${custToDate?.day}`);
  }


  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


  selectCategoryItem(data: string[]) {
    if (Array.isArray(data)) {
      this.form.controls['categories'].setValue(data);
    }
  }

  selectTagItem(data: string[]) {
    if (Array.isArray(data)) {
      this.form.controls['tags'].setValue(Array.isArray(data) ? data : []);

    }
  }

  selectThumbnail(data: Attachment) {
    if (!Array.isArray(data)) {
      this.form.controls['thumbnail'].setValue(data ? data.path : null);
    }
  }

  selectVideo(data: Attachment) {
    if (!Array.isArray(data)) {
      this.form.controls['video'].setValue(data ? data.path : null);
    }
  }

  selectImages(data: Attachment) {
    console.log(data);

    let paths = Array.isArray(data) ? data?.map(image => image?.path ? image?.path : image) : [];
    this.form.controls['product_galleries'].setValue(paths);
  }

  selectSizeImage(data: Attachment) {
    if (!Array.isArray(data)) {
      this.form.controls['size_chart_image_id'].setValue(data ? data.id : null);
    }
  }

  selectMetaImage(data: Attachment) {
    if (!Array.isArray(data)) {
      this.form.controls['product_meta_image_id'].setValue(data ? data.id : null);
    }
  }

  selectVariationImage(data: Attachment, index: number) {
    const variationControl = this.form.get('variations') as FormArray;
    const control = variationControl.at(+index);
    control.patchValue({ variation_image_id: data ? data.id : '' });
  }

  submit() {
    console.log(this.form.value);

    // console.log(this.form?.controls['sale_starts_at'].va);
    // console.log(this.form?.controls['sale_starts_at']?.value);
    // console.log(this.form?.controls['sale_starts_at']);

    for (let el in this.form.controls) {
      if (this.form.controls[el].errors) {
        console.log(el)
      }
    }

    this.form.markAllAsTouched();
    let action = new CreateProduct(this.form.value);

    if (this.type == 'edit' && this.id) {
      action = new UpdateProduct(this.form.value, this.id);
    }

    if (this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.form.controls['thumbnail'].setValue('');
          this.form.controls['video'].setValue('');
          this.form.controls['product_galleries'].setValue('');
          this.router.navigateByUrl('/product');
        }
      });
      this.tabError = null;
    } else {
      const invalidField = Object?.keys(this.form?.controls).find(key => this.form.controls[key].invalid);
      const div = document.querySelector(`#${invalidField}`)?.closest('div.tab')?.getAttribute("tab");
      if (div) {
        this.nav.select(div);
        this.tabError = div;
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }




  get filesControl(): FormArray {
    return this.form.get("files") as FormArray;
  }

  get attributesControl(): FormArray {
    return this.form.get("attributes") as FormArray;
  }

  // 


  selectAttachment(index: number, data: Attachment) {
    if (!Array.isArray(data)) {
      const control = this.filesControl.at(index);
      control.patchValue({ value: data ? data.path : null }); // pa
    }
  }

  addFile(event: Event) {
    event.preventDefault();
    this.filesControl.push(
      this.formBuilder.group({
        key: new FormControl(),
        value: new FormControl(),
      })
    );
  }

  removeFile(index: number) {
    if (this.filesControl.length <= 0) return
    this.filesControl.removeAt(index);
  }


  addAttribute(event: Event) {
    event.preventDefault();
    this.attributesControl.push(
      this.formBuilder.group({
        key: new FormControl(),
        value: new FormControl(),
      })
    );
  }

  removeAttribute(index: number) {
    if (this.attributesControl.length <= 0) return
    this.attributesControl.removeAt(index);
  }

}
