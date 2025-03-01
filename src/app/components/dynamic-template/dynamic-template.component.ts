import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DyTemplateState } from 'src/app/shared/state/template.state';
import {
  DeleteAllDyTemplate,
  DeleteDyTemplate,
  GetDyTemplates,
  UpdateDyTemplateStatus
} from '../../shared/action/template.action';
import { DyTemplate } from "../../shared/interface/contents.interface";
import { ApiRs, Page, Params } from "../../shared/interface/core.interface";
import { TableClickedAction, TableConfig } from "../../shared/interface/table.interface";

@Component({
  selector: 'app-dynamic-template',
  templateUrl: './dynamic-template.component.html',
  styleUrls: ['./dynamic-template.component.scss']
})
export class DynamicTemplateComponent {

  @Select(DyTemplateState.dyTemplates) items$: Observable<ApiRs<Page<DyTemplate>>>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "No.", dataField: "no", type: "no" },
      { title: "title", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "createTime", type: "date",class: 'static-l-dir', sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "template.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "template.destroy" },
    ],
    data: [] as DyTemplate[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit(): void {
    this.items$.subscribe(page => {
      this.tableConfig.data = page ? page?.data?.content : [];
      this.tableConfig.total = page ? page?.data?.totalElements : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetDyTemplates(data));
  }

  onActionClicked(action: TableClickedAction) {
    if (action.actionToPerform == 'edit')
      this.edit(action.data)
    else if (action.actionToPerform == 'status')
      this.status(action.data)
    else if (action.actionToPerform == 'delete')
      this.delete(action.data)
    else if (action.actionToPerform == 'deleteAll')
      this.deleteAll(action.data)
  }

  edit(data: DyTemplate) {
    this.router.navigateByUrl(`/template/edit/${data.id}`);
  }

  status(data: DyTemplate) {
    this.store.dispatch(new UpdateDyTemplateStatus(data.id, data.status));
  }

  delete(data: DyTemplate) {
    this.store.dispatch(new DeleteDyTemplate(data.id));
  }

  deleteAll(ids: string[]) {
    this.store.dispatch(new DeleteAllDyTemplate(ids));
  }

}
