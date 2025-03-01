import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteCategory, EditCategory } from '../../../../shared/action/category.action';
import { DeleteModalComponent } from "../../../../shared/components/ui/modal/delete-modal/delete-modal.component";
import { Category } from '../../../../shared/interface/category.interface';
import { mergeMap } from 'rxjs';
import { CategoryState } from 'src/app/shared/state/category.state';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent {

  @Input() node: any;
  @Input() recursionKey: string;
  @Input() displayKey: string;
  @Input() categoryType: string | null = 'product';

  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  public showChildrenNode: boolean = true;
  public id: number;

  constructor(private store: Store, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params['id']);
  }


  
  delete(actionType: string, data: Category) {
    this.store.dispatch(new DeleteCategory(data, data.type)).subscribe({
      complete: () => {
        this.router.navigateByUrl('/category');
      }
    });
  }

}
