import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Select2Data } from 'ng-select2-component';
import { Observable, forkJoin } from 'rxjs';
import { GetCurrencies } from '../../shared/action/currency.action';
import { GetBackendSettingOption, UpdateSettingOption } from '../../shared/action/setting.action';
import { Attachment } from '../../shared/interface/attachment.interface';
import { CurrencyState } from '../../shared/state/currency.state';
import { SettingState } from '../../shared/state/setting.state';
import { DayInterval, Values } from '../../shared/interface/setting.interface';
import * as data from '../../shared/data/time-zone';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

export class SettingComponent {

  @Select(CurrencyState.currencies) currency$: Observable<Select2Data>;
  @Select(SettingState.backEndSetting) setting$: Observable<Values>;

  public form: FormGroup;
  public active = 'payment_method';
  public active_payment = 1;
  public time_zone = data.time_zone;


  constructor(private store: Store,
    private formBuilder: FormBuilder) {
    this.form = formBuilder.group({

      payment_methods: new FormGroup({
        stripe: new FormGroup({
          label:new FormControl('stripe'),
          key: new FormControl(''),
          secret: new FormControl(''),
          status: new FormControl(true),
          success_url: new FormControl(''),
          cancel_url: new FormControl(''),
          endpoint_secret: new FormControl(''),
        }),
        cod: new FormGroup({
          label:new FormControl(''),
          status: new FormControl(true),
        }),
      }),
    });
  }


  ngOnInit() {
    const backendSettingOption$ = this.store.dispatch(new GetBackendSettingOption());
    // const getCurrencies$ = this.store.dispatch(new GetCurrencies({ status: 1 }));
    // , getCurrencies$
    forkJoin([backendSettingOption$]).subscribe({
      complete: () => {
        this.patchForm();
      }
    });
  }

  patchForm() {
    this.store.select(SettingState.backEndSetting).subscribe(option => {
      this.form.patchValue({
        payment_methods: {
          stripe: {
            key: option['stripe_key'],
            label: option['stripe_label'],
            secret: option['stripe_secret'],
            status: option['stripe_active'] == "true",
            success_url: option['stripe_success_url'],
            cancel_url: option['stripe_cancel_url'],
            endpoint_secret: option['stripe_endpoint_secret']
          },
          cod: {
            status: option['cod_active'] == "true",
            label: option['cod_label'],
          }
        }
      });
    });
  }


  getFieldClass(control: any): string {
    return control.invalid ? 'is-invalid' : '';
  }



  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(new UpdateSettingOption(this.form.value));
    }
  }

}
