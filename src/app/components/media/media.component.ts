import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MediaModalComponent } from "../../shared/components/ui/modal/media-modal/media-modal.component";
import { DeleteModalComponent } from "../../shared/components/ui/modal/delete-modal/delete-modal.component";
import { DeleteAllAttachment, GetAttachments } from '../../shared/action/attachment.action';
import { Attachment } from '../../shared/interface/attachment.interface';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {

  public images: Attachment[] = [];

  @ViewChild("mediaModal") MediaModal: MediaModalComponent;
  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  constructor(private store: Store) { }

  selectImage(data: Attachment[]) {
    this.images = data;
  }

  onActionClicked(action: string) {
    console.log(action);
    if(action == 'deleteAll') {
      let ids = this.images.map(image => image?.id!);
      console.log(ids);
      this.store.dispatch(new DeleteAllAttachment(ids)).subscribe({
        complete: () => {
          this.images = [];

          this.store.dispatch(new GetAttachments({
            'search': '',
            'field': '',
            'sort': '', // current Sorting Order
            'page': 0, // current page number
            'size': 48, // Display per page,
          }));
        }
      });
    }
  }
  
  deleteImage(id: string){
    this.images = this.images.filter(image => {
      return image.id !== id;
    })
  }
}
