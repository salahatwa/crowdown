import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { VerifyEmailOtp } from '../../../shared/action/auth.action';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {

  public form: FormGroup;
  public email: string;
  public loading: boolean;

  constructor(
    public router: Router, 
    public store: Store, 
    public formBuilder: FormBuilder
  ) {
    // console.log(this.store.selectSnapshot(state => state.auth));
    this.email = this.store.selectSnapshot(state => state.auth.mail);

    console.log(this.email);
    if(!this.email) this.router.navigateByUrl('/auth/login');
    this.form = this.formBuilder.group({
      otp: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch( new VerifyEmailOtp({ 
        email: this.email, 
        code: this.form.value.otp
      })).subscribe(
        {
          complete: () => { 
            this.router.navigateByUrl('/auth/update-password'); 
          }
        }
      );
    }
  }

}

