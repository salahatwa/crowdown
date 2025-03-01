import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Select2Data } from 'ng-select2-component';
import { Observable, Subject, of } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { GetRoles } from '../../../shared/action/role.action';
import { CreateUser, EditUser, UpdateUser } from '../../../shared/action/user.action';
import * as data from '../../../shared/data/country-code';
import { RoleState } from '../../../shared/state/role.state';
import { UserState } from '../../../shared/state/user.state';
import { CustomValidators } from '../../../shared/validator/password-match';
import { Constant } from 'src/app/shared/utils/constant';
import { passwordValidator } from 'src/app/shared/validator/password-policy';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent {
  passFieldType: boolean;
  confirmPassFieldType: boolean;

  @Input() type: string;

  @Select(RoleState.roles) role$: Observable<Select2Data>;

  public form: FormGroup;
  public id: string;
  public codes = data.countryCodes;

  private destroy$ = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern(Constant.PATTERN_NAME)]),
      username: new FormControl('', [Validators.required, Validators.pattern(Constant.PATTERN_NAME)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // phone: new FormControl('', [ Validators.pattern(/^[0-9]*$/)]),
      // country_code: new FormControl('91', [Validators.required]), 
      role_id: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      password_confirmation: new FormControl('', [Validators.required]),
      active: new FormControl(1)
    }, {
      validator: CustomValidators.MatchValidator('password', 'password_confirmation')
    })
  }

  get password() {
    return this.form.get('password');
  }

  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('password_confirmation')?.touched
    );
  }

  ngOnInit() {
    const roles$ = this.store.dispatch(new GetRoles({ status: false }));
    this.route.params
      .pipe(
        switchMap(params => {
          if (!params['id']) return of();
          return this.store
            .dispatch(new EditUser(params['id']))
            .pipe(mergeMap(() => this.store.select(UserState.selectedUser)))
        }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(user => {
        this.id = user?.id!;
        roles$.subscribe(roles => {

          console.log(roles?.role?.role?.data);

          let item = roles?.role?.role?.data?.find(i => i.name === user?.roles[0]);

          // console.log(item);

          this.form.patchValue({
            name: user?.name,
            username: user?.username,
            email: user?.email,
            // phone: user?.phone,
            // country_code: user?.country_code,
            role_id: item?.id,
            active: user?.active
          });
        });



      });
  }

  submit() {

    console.log(this.form.value);
    this.form.markAllAsTouched();
    let action = new CreateUser(this.form.value);

    if (this.type == 'edit' && this.id) {
      this.form.removeControl('password');
      this.form.removeControl('password_confirmation');
      action = new UpdateUser(this.form.value, this.id)
    }

    if (this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.router.navigateByUrl('/user');
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }




}
