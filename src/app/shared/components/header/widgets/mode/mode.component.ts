import { Component } from '@angular/core';
import { PreferanceService } from 'src/app/shared/services/preferance.service';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.scss']
})
export class ModeComponent {

  constructor(private preferanceService: PreferanceService) {
  }


  customizeLayoutDark() {
    if (this.preferanceService.getCurrentMode() == PreferanceService.MODE_LIGHT) {
      this.preferanceService.selectMode(PreferanceService.MODE_DARK);
    }
    else {
      this.preferanceService.selectMode(PreferanceService.MODE_LIGHT);
    }

    // document.body.classList.toggle('dark-only');
  }
}
