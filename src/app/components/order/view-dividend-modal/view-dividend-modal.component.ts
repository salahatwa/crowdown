import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Distribution } from 'src/app/shared/interface/order.interface';

@Component({
  selector: 'app-view-dividend-modal',
  templateUrl: './view-dividend-modal.component.html',
  styleUrls: ['./view-dividend-modal.component.scss']
})
export class ViewDividendModalComponent {

  public form: FormGroup;
  public closeResult: string;
  public modalOpen: boolean = false;

  distributions?:Distribution[];

  @ViewChild("viewDividendModal", { static: false }) ViewDividendModal: TemplateRef<string>;

  constructor(private modalService: NgbModal,
    private store: Store,
    private formBuilder: FormBuilder) {

  }


  async openModal(items:Distribution[]) {
    this.distributions=items;
    this.modalOpen = true;
    this.modalService.open(this.ViewDividendModal, {
      ariaLabelledBy: 'view-dividend-Modal',
      centered: true,
      windowClass: 'theme-modal modal-lg'
    }).result.then((result) => {
      `Result ${result}`
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


  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }
}
