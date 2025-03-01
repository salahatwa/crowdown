import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Attachment } from '../../../interface/attachment.interface';
import { MediaModalComponent } from "../modal/media-modal/media-modal.component";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @ViewChild("mediaModal") MediaModal: MediaModalComponent;

  @Input() images: string[] = [];
  @Input() image: Attachment | null;
  @Input() id: string;
  @Input() imageUrl: string | null;
  @Input() url: boolean = false;
  @Input() multipleImage: boolean = false;
  @Input() helpText: string;

  @Input() width?: string;

  @Input() mediaType: string;



  @Output() selectedFiles: EventEmitter<any> = new EventEmitter();

  public showImages: string[] = [];
  public showImage: Attachment | null;
  public showImageUrl: string | null;

  ngOnChanges() {
    this.showImage = this.image;
    this.showImages = this.images;
    this.showImageUrl = this.imageUrl;
  }

  selectImage(data: Attachment, url: boolean) {
    if (Array.isArray(data)) {
      this.images = data;
      this.showImages = data;
    } else if (url) {
      this.imageUrl = data.path;
      this.showImageUrl = data.path;
    } else {
      this.image = data;
      this.showImage = data;
    }
    if (this.imageUrl) {
      this.selectedFiles.emit(this.imageUrl);
    } else {
      this.selectedFiles.emit(this.images.length ? this.images : this.image);
    }
  }

  remove(index: any, type: string) {
    if (type == 'multiple' && Array.isArray(this.images)) {
      this.images.splice(index, 1);
      this.showImages = this.images;
    } else if (type == 'single_image_url') {
      this.imageUrl = null;
      this.showImageUrl = null;
      this.image = null;
    } else {
      this.image = null;
      this.showImage = null;
    }
    this.selectedFiles.emit(this.images.length ? this.images : this.image);
  }


  goToLink(url: string) {
    window.open(url, "_blank");
  }

  

}
