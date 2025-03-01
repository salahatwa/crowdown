import { Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../state/auth.state';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {

  @Input('hasPermission') permission: string | string[];

  @Select(AuthState.permissions) permissions$: Observable<string[]>;

  public permissions: string[] = [];

  private isViewCreated = false;

  constructor(private templateRef: TemplateRef<string>,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.permissions$.subscribe(permissions => {
      this.permissions = permissions;
      this.checkPermissions();
    });
  }

  private checkPermissions() {
    if (!Array.isArray(this.permission) && this.permissions?.includes(this.permission) || !this.permission) {
      if (!this.isViewCreated) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isViewCreated = true;
      }
    } else if (Array.isArray(this.permission) && this.permission?.length &&
      this.permission.every(action => this.permissions?.includes(action))) {
      if (!this.isViewCreated) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isViewCreated = true;
      }
    } else {
      if (this.isViewCreated) {
        this.viewContainerRef.clear();
        this.isViewCreated = false;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['permission'] && !changes['permission'].firstChange) {
      this.checkPermissions();
    }
  }

}
