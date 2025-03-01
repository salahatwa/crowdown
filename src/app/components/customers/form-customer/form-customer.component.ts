import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, of } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { CreateCustomer, EditCustomer, UpdateCustomer } from 'src/app/shared/action/customer.action';
import { Customer } from 'src/app/shared/interface/customer.interface';
import { CustomerState } from 'src/app/shared/state/customer.state';
import { Constant } from 'src/app/shared/utils/constant';
import * as data from '../../../shared/data/country-code';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent {

  public codes = data.countryCodes;

  @Input() type: string;

  public id: string;
  public form: FormGroup;

  private destroy$ = new Subject<void>();

  currentCustomer: Customer;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern(Constant.PATTERN_NAME)]),
      identity: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      country_code: new FormControl('91', []),
      mobile: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
      status: new FormControl(1, [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          if (!params['id']) return of();
          return this.store
            .dispatch(new EditCustomer(params['id']))
            .pipe(mergeMap(() => this.store.select(CustomerState.selectedCustomer)))
        }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(item => {
        this.currentCustomer = item;
        this.id = item?.id!;
        this.form.patchValue({
          email: item?.email,
          name: item?.name,
          country_code: item?.country_code,
          mobile: item?.mobile,
          identity: item?.identity,
          status: item?.status
        });
      });
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new CreateCustomer(this.form.value);

    if (this.type == 'edit' && this.id) {
      action = new UpdateCustomer(this.form.value, this.id);
    }

    if (this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.router.navigateByUrl('/customer');
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
