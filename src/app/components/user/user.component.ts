import { Component, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiRs, Page, Params } from "../../shared/interface/core.interface";
import { User } from "../../shared/interface/user.interface";
import { UserState } from '../../shared/state/user.state';
import { GetUsers, UpdateUserStatus, DeleteUser, DeleteAllUser, ExportUser, UpdateUser } from '../../shared/action/user.action';
import { TableConfig, TableClickedAction } from "../../shared/interface/table.interface";
import { ImportCsvModalComponent } from "../../shared/components/ui/modal/import-csv-modal/import-csv-modal.component";
import { UpdatePasswordModalComponent } from './update-password/update-password.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  @Select(UserState.user) user$: Observable<ApiRs<Page<User>>>;

  @ViewChild("csvModal") CSVModal: ImportCsvModalComponent;

  @ViewChild("updatePasswordModal") UpdatePasswordModal: UpdatePasswordModalComponent;

  public tableConfig: TableConfig = {
    columns: [
      { title: "avatar", dataField: "profile_image", class: 'tbl-image rounded-circle', type: 'image' },
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "email", dataField: "email" },
      { title: "role", dataField: "roles" },
      { title: "created_at", dataField: "createTime", type: "date", class: 'static-l-dir', sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "active", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "user.edit" },
      { label: "Reset", actionToPerform: "update-password", icon: "ri-loop-left-line", permission: "user.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "user.destroy" },
    ],
    data: [] as User[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.user$.subscribe(user => {
      let users = user?.data?.content.filter(element => {
        return element;
      });
      this.tableConfig.data = user ? users : [];
      this.tableConfig.total = user ? user.data?.totalElements : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetUsers(data));
  }

  onActionClicked(action: TableClickedAction) {
    if (action.actionToPerform == 'edit')
      this.edit(action.data)
    else if (action.actionToPerform == 'active')
      this.status(action.data)
    else if (action.actionToPerform == 'delete')
      this.delete(action.data)
    else if (action.actionToPerform == 'update-password')
      this.UpdatePasswordModal.openModal(action.data);
    else if (action.actionToPerform == 'deleteAll')
      this.deleteAll(action.data)
  }

  edit(data: User) {
    this.router.navigateByUrl(`/user/edit/${data.id}`);
  }

  status(data: User) {
    this.store.dispatch(new UpdateUser(data, data.id));
  }

  delete(data: User) {

    this.store.dispatch(new DeleteUser(data.id)).subscribe({
      complete: () => {
        let filter = {
          page: 0,
          size: 10,
          system: false
        }
        this.store.dispatch(new GetUsers(filter));
      }
    });
  }

  deleteAll(ids: string[]) {
    this.store.dispatch(new DeleteAllUser(ids));
  }

  export() {
    this.store.dispatch(new ExportUser());
  }

}
