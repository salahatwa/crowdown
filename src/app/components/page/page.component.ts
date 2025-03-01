import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteAllPageContent,
  DeletePageContent,
  GetPageContents,
  UpdatePageContentStatus
} from '../../shared/action/page.action';
import { ApiRs, Page, Params } from "../../shared/interface/core.interface";
import { PageContent } from "../../shared/interface/contents.interface";
import { TableClickedAction, TableConfig } from "../../shared/interface/table.interface";
import { PageState } from '../../shared/state/page.state';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  @Select(PageState.page) page$: Observable<ApiRs<Page<PageContent>>>;

  public tableConfig: TableConfig = {
    columns: [
      { title: "No.", dataField: "no", type: "no" },
      { title: "title", dataField: "title", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "createTime", type: "date",class: 'static-l-dir', sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "page.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "page.destroy" },
    ],
    data: [] as PageContent[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit(): void {
    this.page$.subscribe(page => {
      this.tableConfig.data = page ? page?.data?.content : [];
      this.tableConfig.total = page ? page?.data?.totalElements : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetPageContents(data));
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

  edit(data: PageContent) {
    this.router.navigateByUrl(`/page/edit/${data.id}`);
  }

  status(data: PageContent) {
    this.store.dispatch(new UpdatePageContentStatus(data.id, data.status));
  }

  delete(data: PageContent) {
    this.store.dispatch(new DeletePageContent(data.id));
  }

  deleteAll(ids: string[]) {
    this.store.dispatch(new DeleteAllPageContent(ids));
  }

}
