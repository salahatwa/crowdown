import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Select2Data, Select2UpdateEvent } from 'ng-select2-component';
import { Observable, map } from 'rxjs';
import { UpdateInfo, UpdatePassword } from 'src/app/shared/action/auth.action';
import { User } from 'src/app/shared/interface/user.interface';
import { AuthState } from 'src/app/shared/state/auth.state';
import {
  UpdateUserProfile
} from '../../shared/action/account.action';
import * as data from '../../shared/data/country-code';
import { Attachment } from '../../shared/interface/attachment.interface';
import { AccountState } from '../../shared/state/account.state';
import { StateState } from '../../shared/state/state.state';
import { CustomValidators } from '../../shared/validator/password-match';
import { IMAGE_TYPE } from 'src/app/shared/components/ui/media-box/media-box.component';
import { passwordValidator } from 'src/app/shared/validator/password-policy';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  IMAGE_TYPE = IMAGE_TYPE;
  @Select(AuthState.user) user$: Observable<User>;
  // @Select(StoreState.selectedStore) store$: Observable<Stores>;
  // @Select(CountryState.countries) countries$: Observable<Select2Data>;
  @Select(AccountState.getRoleName) roleName$: Observable<string>;

  public active = 'profile';
  public profileForm: FormGroup;
  public passwordForm: FormGroup;
  public form: FormGroup;
  public codes = data.countryCodes;
  public states$: Observable<Select2Data>;
  public flicker: boolean = false;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.user$.subscribe(user => {
      console.log(user);
      this.profileForm = this.formBuilder.group({
        id: new FormControl(user?.id, [Validators.required]),
        name: new FormControl(user?.name, [Validators.required]),
        email: new FormControl(user?.email, [Validators.required, Validators.email]),
        // phone: new FormControl(user?.phone, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
        // country_code: new FormControl('', [Validators.required]),
        image: new FormControl(user?.image),
        active: new FormControl(user?.active),
      });

      this.flicker = true;


      setTimeout(() => this.flicker = false, 200);
    });

    this.passwordForm = this.formBuilder.group({
      current_password: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      password_confirmation: new FormControl('', [Validators.required])
    }, { validator: CustomValidators.MatchValidator('password', 'password_confirmation') });
  }

  countryChange(data: Select2UpdateEvent) {
    if (data && data?.value) {
      this.states$ = this.store
        .select(StateState.states)
        .pipe(map(filterFn => filterFn(+data?.value)));
      this.form.controls['state_id'].setValue('');
    } else {
      this.form.controls['state_id'].setValue('');
    }
  }

  get passwordMatchError() {
    return (
      this.passwordForm?.getError('mismatch') &&
      this.passwordForm?.get('password_confirmation')?.touched
    );
  }

  selectCode(data: Select2UpdateEvent) {
    this.profileForm.controls['country_code'].setValue(data?.value);
  }

  selectedFiles(data: Attachment) {
    if (!Array.isArray(data)) {
      this.profileForm.controls['image'].setValue(data ? data?.path : '');
    }
  }

  profileFormSubmit() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      this.store.dispatch(new UpdateInfo(this.profileForm.value, this.profileForm.value?.id));
    }
  }

  passwordFormSubmit() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.valid) {
      this.store.dispatch(new UpdatePassword(this.passwordForm.value));
      this.passwordForm.reset();
    }
  }

  selectStoreLogo(data: Attachment) {
    if (!Array.isArray(data)) {
      this.form.controls['store_logo_id'].setValue(data ? data.id : '');
    }
  }

  updateStore() {
    // this.store.dispatch(new updateStoreDetails(this.form.value))
  }
}
