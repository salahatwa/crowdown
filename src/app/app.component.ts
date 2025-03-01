import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from './shared/action/auth.action';
import { GetSettingOption } from './shared/action/setting.action';
import { Values } from './shared/interface/setting.interface';
import { PreferanceService } from './shared/services/preferance.service';
import { SettingState } from './shared/state/setting.state';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;

  public favIcon: HTMLLinkElement | null;

  constructor(config: NgbNavConfig,
    @Inject(DOCUMENT) document: Document,
    private actions: Actions, private router: Router,
    private titleService: Title, private store: Store,
    private preferanceService: PreferanceService, private authService: AuthService) {

    this.authService.clearLocalStorageOnClose();

    this.preferanceService.selectLanguage(this.preferanceService.getCurrentLang());
    this.preferanceService.selectMode(this.preferanceService.getCurrentMode());

    this.store.dispatch(new GetSettingOption());
    this.setting$.subscribe(setting => {
      // Set Favicon
      this.favIcon = document.querySelector('#appIcon');
      this.favIcon!.href = <string>setting?.general?.favicon_image?.path;

      // Set site title
      this.titleService.setTitle(setting?.general?.site_title && setting?.general?.site_tagline ?
        `${setting?.general?.site_title} | ${setting?.general?.site_tagline}` : 'NIC Marketplace: Where Stocks Shine Together')
    })

    // customize default values of navs used by this component tree
    config.destroyOnHide = false;
    config.roles = false;

    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  @HostListener("window:beforeunload", ["$event"]) beforeUnloadHandler(event: Event) {
    event.returnValue = "You will leave this page" as any;
    return "You will leave this page";
  }

  @HostListener("window:unload", ["$event"]) unloadHandler(event: Event) {
    this.authService.clearAll();
  }


}
