import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';




@Injectable({
  providedIn: 'root'
})
export class PreferanceService {

  static LANG_KEY = "LANG";
  static LANG_AR = "ar";
  static LANG_EN = "en";

  static MODE_KEY = "MODE";
  static MODE_DARK = "dark-only";
  static MODE_LIGHT = "light-only";


  constructor(private translate: TranslateService, @Inject(DOCUMENT) public document: Document) {
  }

  selectLanguage(language: string) {
    localStorage.setItem(PreferanceService.LANG_KEY, language);
    this.translate.use(language);

    if (language !== PreferanceService.LANG_AR && document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      this.document.getElementsByTagName('html')[0].removeAttribute('dir');
    } else if (language === PreferanceService.LANG_AR && !document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      this.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }
  }

  selectMode(mode: string) {
    localStorage.setItem(PreferanceService.MODE_KEY, mode);
    document.body.classList.toggle(PreferanceService.MODE_DARK, mode != PreferanceService.MODE_LIGHT);
  }

  getCurrentLang(defaultLang: string = PreferanceService.LANG_EN) {
    let lang = localStorage.getItem(PreferanceService.LANG_KEY);
    return lang ? lang : defaultLang;
  }

  getCurrentMode(defaultMode: string = PreferanceService.MODE_LIGHT) {
    let mode = localStorage.getItem(PreferanceService.MODE_KEY);
    return mode ? mode : defaultMode;
  }

}
