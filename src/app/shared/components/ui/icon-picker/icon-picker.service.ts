import { Injectable } from '@angular/core';
import { Icon } from './icon';
import { icons } from './nic-icons';
// import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { fas } from '@fortawesome/free-solid-svg-icons';

@Injectable()
export class IconPickerService {


  constructor() {

  }

  getIcons(): Icon[] {
    // const icons: Icon[] = ;
    return icons;
  }
}
