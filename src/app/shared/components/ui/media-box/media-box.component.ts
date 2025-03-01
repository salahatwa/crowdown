import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { DeleteModalComponent } from "../../../../shared/components/ui/modal/delete-modal/delete-modal.component";
import { Attachment } from '../../../../shared/interface/attachment.interface';
import { ApiRs, Page, Params } from '../../../../shared/interface/core.interface';
import { DeleteAttachment, GetAttachments } from '../../../action/attachment.action';
import { AttachmentState } from '../../../state/attachment.state';

export const IMAGE_TYPE: string[] = ["image/jpeg", "image/jpg", "image/png", "image/tiff", "image/gif"];

export const FILE_TYPE: string[] = ["application/pdf", "text/plain", "text/csv", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

export const VIDEO_TYPE: string[] = ["video/mp4", "video/quicktime", "video/webm", "video/mkv", "video/flv", "video/vob", "video/avi", "video/wmv", "video/mov", "video/amv", "video/m4v", "video/svi", "video/3gp", "video/f4v", "video/f4p", "video/f4b", "video/f4a", "video/nsv", "video/roq", "video/mxf", "video/3g2"];


@Component({
  selector: 'app-media-box',
  templateUrl: './media-box.component.html',
  styleUrls: ['./media-box.component.scss']
})
export class MediaBoxComponent implements OnInit {


  public filter = {
    'keyword': '',
    'mediaType': '',
    'sort': '', // current Sorting Order
    'page': 0, // current page number
    'size': 10, // Display per page,
  };

  @Select(AttachmentState.attachment) attachment$: Observable<ApiRs<Page<Attachment>>>;

  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  @Input() selectedImages: Attachment[] = [];
  @Input() multiple: boolean = false;
  @Input() url: boolean = false;
  @Input() loading: boolean = true;
  @Input() deleteAction: boolean = true;

  @Input() mediaType: string;

  @Output() setImage: EventEmitter<[] | any> = new EventEmitter();
  @Output() setDeleteImage: EventEmitter<[] | any> = new EventEmitter();

  public keyword = new FormControl();

  public totalItems: number = 0;

  constructor(private store: Store,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {
    this.attachment$.subscribe(attachment => {
      this.totalItems = attachment?.data?.totalElements;
    });

    this.keyword.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(
        (data: string) => {
          this.filter.keyword = data;
          this.getAttachments(this.filter);
        });
  }

  ngOnInit() {
    if (this.mediaType)
      this.filter.mediaType = this.mediaType;
    this.getAttachments(this.filter, true);
  }

  getAttachments(filter: Params, loader?: boolean) {
    this.loading = true;
    if (!filter['mediaType'])
      filter['mediaType'] = '';
    this.store.dispatch(new GetAttachments(filter)).subscribe({
      complete: () => {
        this.loading = false;
      }
    });
    if (!loader)
      this.renderer.addClass(this.document.body, 'loader-none');
  }

  onMediaChange(event: Event) {
    this.filter.sort = (<HTMLInputElement>event.target).value;
    this.getAttachments(this.filter)
  }


  onMediaTypeChange(event: Event) {
    let value = (<HTMLInputElement>event.target).value;

    if (value && value == "IMAGE") {
      this.filter.mediaType = IMAGE_TYPE.join(',');
    }
    else if (value && value == "FILE") {
      this.filter.mediaType = FILE_TYPE.join(',');
    }
    else if (value && value == "VIDEO") {
      this.filter.mediaType = VIDEO_TYPE.join(',');
    }
    else {
      this.filter.mediaType = '';
    }
    this.getAttachments(this.filter)
  }

  onActionClicked(action: string, data: Attachment) {
    if (action == 'delete')
      this.store.dispatch(new DeleteAttachment(data.id!)).subscribe({
        complete: () => {
          this.setDeleteImage.emit(data.id!);

          this.store.dispatch(new GetAttachments({
            'search': '',
            'field': '',
            'sort': '', // current Sorting Order
            'page': 0, // current page number
            'size': 48, // Display per page,
          }));
        }
      })
  }

  selectImage(event: Event, attachment: Attachment, url: boolean) {
    if (this.multiple) {
      const index = this.selectedImages.indexOf(attachment);
      if ((<HTMLInputElement>event.target).checked) {
        if (index == -1) this.selectedImages.push(attachment)
      } else {
        this.selectedImages = this.selectedImages.filter(image => image.id != (<HTMLInputElement>event.target).value);
      }
    } else {
      this.selectedImages = <any>attachment;
    }

    if (url) {
      this.selectedImages = <any>attachment;
    }
    this.setImage.emit(this.selectedImages);
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.getAttachments(this.filter);
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'loader-none');
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

}
