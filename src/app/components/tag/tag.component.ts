import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteAllTag,
  DeleteTag,
  GetTags,
  UpdateTag
} from '../../shared/action/tag.action';
import { ApiRs, Page, Params } from "../../shared/interface/core.interface";
import { TableClickedAction, TableConfig } from "../../shared/interface/table.interface";
import { Tag } from "../../shared/interface/tag.interface";
import { TagState } from '../../shared/state/tag.state';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  @Select(TagState.tag) tag$: Observable<ApiRs<Page<Tag>>>;

  @Input() tagType: string | null = 'product';

  // @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  public tableConfig: TableConfig = {
    columns: [
      { title: "No.", dataField: "no", type: "no" },
      { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
      { title: "created_at", dataField: "createTime", type: "date",class: 'static-l-dir', sortable: true, sort_direction: 'desc' },
      { title: "status", dataField: "status", type: "switch" },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "tag.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "tag.edit" },
    ],
    data: [] as Tag[],
    total: 0
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.tag$.subscribe(tag => {
      this.tableConfig.data = tag ? tag?.data?.content : [];
      this.tableConfig.total = tag ? tag?.data?.totalElements : 0;
    });
  }

  onTableChange(data?: Params) {
    data!['type'] = this.tagType!;
    this.store.dispatch(new GetTags(data));
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

  edit(data: Tag) {
    this.router.navigateByUrl(`/tag/edit/${data.id}`);
  }

  status(data: Tag) {
    this.store.dispatch(new UpdateTag(data, data.id))
  }

  delete(data: Tag) {
    this.store.dispatch(new DeleteTag(data.id)).subscribe({
      complete: () => {
        // if(this.tagType == 'post')
        //   this.router.navigateByUrl('/blog/tag'); 
        // else
        // this.DeleteModal.closeModal();
        this.router.navigateByUrl('/tag');
      }
    });

    // .subscribe({
    //   complete: () => { 
    //     console.log('>>>>>>>');
    //       this.router.navigateByUrl('/tag'); 
    //   }
    // });
  }

  deleteAll(ids: number[]) {
    this.store.dispatch(new DeleteAllTag(ids))
  }

}
