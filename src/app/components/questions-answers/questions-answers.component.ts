import { Component, ViewChild } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteAllQuestionAnswers,
  DeleteQuestionAnswers,
  GetQuestionAnswers,
  UpdateListQuestionAnswers
} from '../../shared/action/questions-answers.action';
// import { Stores } from '../../shared/interface/store.interface';
import { ApiRs, Page } from 'src/app/shared/interface/core.interface';
import { QuestionAnswers } from '../../shared/interface/questions-answers.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { QuestionAnswersState } from '../../shared/state/questions-answers.state';
import { AnswersModalComponent } from './answers-modal/answers-modal.component';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss']
})
export class QuestionsAnswersComponent {

  @Select(QuestionAnswersState.questionAnswers) questionAnswers$: Observable<ApiRs<Page<QuestionAnswers>>>;

  @ViewChild("answersModal") AnswersModal: AnswersModalComponent;

  public tableConfig: TableConfig = {
    columns: [
      { title: "No.", dataField: "no", type: "no" },
      { title: "question", dataField: "question", reorder: true },
      { title: "created_at", dataField: "createTime", type: "date", class: 'static-l-dir', sortable: true, sort_direction: 'desc' },
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "page.edit" },
      { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "page.destroy" },
    ],
    data: [] as QuestionAnswers[],
    total: 0,
    reorder: false
  };

  constructor(private store: Store,
    public router: Router) { }

  ngOnInit() {
    this.questionAnswers$.subscribe(faq => {
      this.tableConfig.data = faq ? faq?.data?.content : [];
      this.tableConfig.total = faq ? faq?.data?.totalElements : 0;
    });
  }

  onTableChange(data?: Params) {
    this.store.dispatch(new GetQuestionAnswers(data!));
  }

  onActionClicked(action: TableClickedAction) {
    if (action.actionToPerform == 'edit')
      this.AnswersModal.openModal(action.data);
    else if (action.actionToPerform == 'delete')
      this.delete(action.data)
    else if (action.actionToPerform == 'deleteAll')
      this.deleteAll(action.data)

    else if (action.actionToPerform == 'reorder') {
      console.log(action?.data);
      this.updateAll(action?.data);
    }


  }

  updateAll(items: any[]) {
    this.store.dispatch(new UpdateListQuestionAnswers(items));
  }


  edit(data: QuestionAnswers) {
    this.AnswersModal.openModal(data);
  }

  delete(data: any) {
    this.store.dispatch(new DeleteQuestionAnswers(data.id));
  }

  deleteAll(ids: string[]) {
    this.store.dispatch(new DeleteAllQuestionAnswers(ids));
  }



  create() {
    this.AnswersModal.openModal(null);
  }
}
