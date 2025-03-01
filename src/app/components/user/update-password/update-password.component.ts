import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { GetUsers, UpdateAnotherUserPass } from 'src/app/shared/action/user.action';
import { User } from 'src/app/shared/interface/user.interface';
import { CustomValidators } from 'src/app/shared/validator/password-match';
import { passwordValidator } from 'src/app/shared/validator/password-policy';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordModalComponent {

  public modalOpen: boolean = false;
  public closeResult: string;
  public user: User;
  public form: FormGroup;

  @ViewChild("updatePasswordModal", { static: false }) UpdatePasswordModal: TemplateRef<string>;

  constructor(private modalService: NgbModal, private store: Store, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      password_confirmation: new FormControl('', [Validators.required])
    }, {
      validator: CustomValidators.MatchValidator('password', 'password_confirmation')
    })
  }

  async openModal(data?: User) {
    this.form.reset();
    this.modalOpen = true;
    this.user = data;
    this.form.patchValue({
      email: this.user?.email,
    });


    this.modalService.open(this.UpdatePasswordModal, {
      ariaLabelledBy: 'Payout-Modal',
      centered: true,
      windowClass: 'theme-modal text-center'
    }).result.then((result) => {
      `Result ${result}`
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submit() {
    this.form.markAllAsTouched();
    let action = new UpdateAnotherUserPass(this.form.value, this.user?.id);


    if (this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.modalService.dismissAll();
          this.store.dispatch(new GetUsers({ page: 0, size: 10 }));
        }
      });
    }

  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }
}
