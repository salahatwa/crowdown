import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteAllTax,
  DeleteTax,
  GetTaxes,
  UpdateTax
} from '../../shared/action/tax.action';
import { ApiRs, Page, Params } from "../../shared/interface/core.interface";
import { TableClickedAction, TableConfig } from "../../shared/interface/table.interface";
import { Tax } from "../../shared/interface/tax.interface";
import { TaxState } from '../../shared/state/tax.state';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent {

  @Select(TaxState.tax) tax$: Observable<ApiRs<Page<Tax>>>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "No.", dataField: "no", type: "no" },
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "createTime", type: "date",class: 'static-l-dir', sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "tax.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "tax.destroy" },
    ],
    data: [] as Tax[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.tax$.subscribe(tax => {
      this.tableConfig.data = tax ? tax?.data?.content : [];
      this.tableConfig.total = tax ? tax?.data?.totalElements : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetTaxes(data));
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

  edit(data: Tax) {
    this.router.navigateByUrl(`/tax/edit/${data.id}`);
  }

  status(data: Tax) {
    this.store.dispatch(new UpdateTax(data, data?.id));
  }

  delete(data: Tax) {
    this.store.dispatch(new DeleteTax(data.id));
  }

  deleteAll(ids: string[]) {
    this.store.dispatch(new DeleteAllTax(ids));
  }

}
