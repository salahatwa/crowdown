
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'media'
})
export class MediaPipe implements PipeTransform {

    constructor(private sanitized: DomSanitizer) { }

    transform(url: any, showName?: boolean): SafeHtml {
        if (!url) {
            return '';
        }

        if (url instanceof Object) {
            url = url?.path;
        }
        let fileName = this.get_filename(url);

        let imageMedia = `<img [src]='${url}' class='img-fluid' alt='attachment'>`;

        let fileMedia = `<div class="image-container"><img src='assets/images/${this.get_url_extension(url)}.png'  class='img-fluid' alt='attachment'><p class="image-name">${fileName}</p></div>`

        let fileMediaWithoutName = `<img src='assets/images/${this.get_url_extension(url)}.png'  class='img-fluid' alt='attachment'>`


        switch (this.get_url_extension(url)) {
            case 'png':
            case 'gif':
            case 'jpg':
            case 'jpeg':
            case 'tif':
            case 'bmp':
            case 'tiff':
            case 'webp':
                return this.sanitized.bypassSecurityTrustHtml(`<img src='${url}'  class='img-fluid' alt='attachment'>`);
            case 'pdf':
            case 'docx':
            case 'doc':
            case 'csv':
            case 'xlsx':
            case 'xls':
            case 'ppt':
            case 'txt':
            case 'pptx':
                return this.sanitized.bypassSecurityTrustHtml(showName ? fileMedia : fileMediaWithoutName);
            case 'mp4':
            case 'quicktime':
            case 'webm':
            case 'mkv':
            case 'flv':
            case 'vob':
            case 'avi':
            case 'wmv':
            case 'mov':
            case 'amv':
            case 'm4v':
            case 'svi':
            case '3gp':
            case 'mxf':
            case '3g2':
            case 'nsv':
            case 'f4a':
            case 'f4b':
            case 'f4p':
            case 'f4v':
                return this.sanitized.bypassSecurityTrustHtml(`<video controls width="360" class='img-fluid'><source src="${url}" type="video/mp4"/></video>`);
            default:
                return this.sanitized.bypassSecurityTrustHtml(imageMedia);
        }

    }


    get_url_extension(url) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    }

    get_filename(url) {

        let filename = '';
        try {
            filename = new URL(url).pathname.split('/').pop();
        } catch (e) {
            console.error(e);
        }
        return filename;
    }

}


