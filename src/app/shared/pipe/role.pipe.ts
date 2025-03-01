import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): SafeHtml {
    if (!value) {
      return '';
    }

    const summarizedValue = value.substring(value.indexOf(".")+1,value.length);


    if (this.containsHtmlTags(value)) {
      const sanitizedValue = this.sanitizer.bypassSecurityTrustHtml(summarizedValue);
      return sanitizedValue as SafeHtml;
    } else {
      return summarizedValue;
    }

  }

  containsHtmlTags(value: string): boolean {
    const htmlRegex = /<[a-z][\s\S]*>/i;
    return htmlRegex.test(value);
  }

}
