import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApiRs } from 'src/app/shared/interface/core.interface';
import { GetRoles } from '../../../shared/action/role.action';
import { Role } from "../../../shared/interface/role.interface";
import { RoleState } from '../../../shared/state/role.state';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent {

  @Select(RoleState.role) roles$: Observable<ApiRs<Role[]>>;

  @Input() selectedPermission: string[] = [];

  @Output() setPermissions: EventEmitter<string[]> = new EventEmitter();

  constructor(private store: Store) {
    this.store.dispatch(new GetRoles({ status: true }));
  }


  ngOnChanges(changes: SimpleChanges) {
    let ids = changes['selectedPermission']?.currentValue
    this.roles$.subscribe(roles => {
      roles?.data?.map(item => {
        item.permissions.map(permission => {
          permission.isChecked = ids?.includes(permission.id);
        })
      })
      roles?.data?.filter(role => {
        this.updateCheckBoxStatus(role);
      })
    });
  }

  checkUncheckAll(event: Event, role: Role) {
    role.permissions.forEach(item => {
      item.isChecked = (<HTMLInputElement>event.target).checked;
      this.addPermission((<HTMLInputElement>event.target).checked, item?.id, role);
    });
  }

  checkIndex(event: Event, role: Role) {
    role.permissions.forEach(item => {
      item.isChecked = false;
      this.addPermission(false, item?.id, role);
    });
  }

  onPermissionChecked(event: Event, role: Role) {
    role.permissions.forEach(item => {
      item.isChecked = false
      if (item.name == 'index') {
        item.isChecked = !item.isChecked ? true : false;
        this.addPermission(true, item.id, role);
      }
      this.addPermission((<HTMLInputElement>event.target)?.checked, (<HTMLInputElement>event?.target)?.value, role);
    })
  }


  addPermission(checked: Boolean, value: string, role: Role) {
    const index = this.selectedPermission.indexOf(value);
    if (checked) {
      if (index == -1) this.selectedPermission.push(value);
    } else {
      this.selectedPermission = this.selectedPermission.filter(id => id != value);
    }
    this.setPermissions.emit(this.selectedPermission);
    this.updateCheckBoxStatus(role);
  }

  updateCheckBoxStatus(role: Role) {
    let count = 0;
    role.permissions.filter(permission => {
      if (this.selectedPermission?.includes(permission.id!)) {
        count++;
      }
      if (role.permissions.length <= count)
        role.isChecked = true;
      else
        role.isChecked = false;
    });
  }

}
