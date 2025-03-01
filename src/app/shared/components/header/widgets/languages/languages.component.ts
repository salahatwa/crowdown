import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { PreferanceService } from 'src/app/shared/services/preferance.service';

export interface Language {
  language: string;
  code: string;
  icon: string;
}

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent {

  public active: boolean = false;
  public languages: Language[] = [
    {
      language: 'English',
      code: 'en',
      icon: 'us'
    },
    {
      language: 'Arabic',
      code: PreferanceService.LANG_AR,
      icon: 'kw'
    },
  ]

  public selectedLanguage: Language = {
    language: 'English',
    code: PreferanceService.LANG_EN,
    icon: 'us'
  }

  constructor(private preferanceService: PreferanceService) {
  }

  selectLanguage(language: Language) {
    this.active = false;
    this.preferanceService.selectLanguage(language?.code);
  }

  clickHeaderOnMobile() {
    this.active = !this.active;
  }

  hideDropdown() {
    this.active = false;
  }

}
