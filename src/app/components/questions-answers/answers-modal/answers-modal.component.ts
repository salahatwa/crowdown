import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { CreateQuestionAnswers, GetQuestionAnswers, UpdateQuestionAnswers } from '../../../shared/action/questions-answers.action';
import { QuestionAnswers } from '../../../shared/interface/questions-answers.interface';

@Component({
  selector: 'app-answers-modal',
  templateUrl: './answers-modal.component.html',
  styleUrls: ['./answers-modal.component.scss']
})
export class AnswersModalComponent {

  public modalOpen: boolean = false;
  public closeResult: string;
  public qna: QuestionAnswers;
  public form: FormGroup;

  @ViewChild("answersModal", { static: false }) AnswersModal: TemplateRef<string>;

  constructor(private modalService: NgbModal, private store: Store, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required])
    });
  }

  async openModal(data?: QuestionAnswers) {
    this.form.reset();
    this.modalOpen = true;
    this.qna = data;
    if (data?.answer) {
      this.form.patchValue(data);
    } else {
      this.form.patchValue({});
    }

    this.modalService.open(this.AnswersModal, {
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

    console.log('>>><<<<<');
    this.form.markAllAsTouched();
    let action = new CreateQuestionAnswers(this.form.value);

    if (this.qna?.id) {
      action = new UpdateQuestionAnswers(this.form.value, this.qna?.id);
    }

    if (this.form.valid) {
      this.store.dispatch(action).subscribe({
        complete: () => {
          this.modalService.dismissAll();
          this.store.dispatch(new GetQuestionAnswers({page:0,size:10}));
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
