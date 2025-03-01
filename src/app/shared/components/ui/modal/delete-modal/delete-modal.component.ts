import { Component, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {

  public closeResult: string;
  public modalOpen: boolean = false;
  public userAction: any = {};

  @ViewChild("deleteModal", { static: false }) DeleteModal: TemplateRef<string>;

  @Output() deleteItem: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  async openModal(action: string, data: any) {
    this.modalOpen = true;
    this.userAction = {
      actionToPerform: action,
      data: data
    };
    this.modalService.open(this.DeleteModal, {
      ariaLabelledBy: 'Delete-Modal',
      centered: true,
      windowClass: 'theme-modal text-center'
    }).result.then((result) => {
      `Result ${result}`
      // if(result){
      // this.modalService.dismissAll();
      // this.closeModal();
      // }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  async closeModal() {
    // if (this.modalOpen) {
    console.log('>>>>>>><<<<<<<)))))))');
    this.modalService.dismissAll();
    // }
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

  delete(modal: NgbModalRef) {
    this.userAction.modal = modal;
    this.deleteItem.emit(this.userAction);
    modal.close();
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
