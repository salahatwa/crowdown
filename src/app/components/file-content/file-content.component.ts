import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FileContentState } from 'src/app/shared/state/file-content.state';
import {
  DeleteAllFileContent,
  DeleteFileContent,
  GetFileContents,
  GetFileTypes,
  UpdateFileContentStatus
} from '../../shared/action/file-content.action';
import { FileContent } from "../../shared/interface/contents.interface";
import { ApiRs, Page, Params } from "../../shared/interface/core.interface";
import { TableClickedAction, TableConfig } from "../../shared/interface/table.interface";

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.scss']
})
export class FileContentComponent {

  @Select(FileContentState.file) items$: Observable<ApiRs<Page<FileContent>>>;

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
    data: [] as FileContent[],
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
    this.store.dispatch(new GetFileContents(data));
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

  edit(data: FileContent) {
    this.router.navigateByUrl(`/file-content/edit/${data.id}`);
  }

  status(data: FileContent) {
    this.store.dispatch(new UpdateFileContentStatus(data.id, data.status));
  }

  delete(data: FileContent) {
    this.store.dispatch(new DeleteFileContent(data.id));
  }

  deleteAll(ids: string[]) {
    this.store.dispatch(new DeleteAllFileContent(ids));
  }

}
