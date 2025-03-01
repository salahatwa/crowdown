import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import {
  CreateQuestionAnswers,
  DeleteAllQuestionAnswers, DeleteQuestionAnswers,
  EditQuestionAnswers,
  GetQuestionAnswers,
  UpdateListQuestionAnswers,
  UpdateQuestionAnswers
} from "../action/questions-answers.action";
import { ApiRs, Page } from "../interface/core.interface";
import { QuestionAnswers } from "../interface/questions-answers.interface";
import { NotificationService } from "../services/notification.service";
import { QuestionsAnswersService } from "../services/questions-answers.service";

export class QuestionAnswersStateModel {
  question: ApiRs<Page<QuestionAnswers>>;
  selectedQuestion: QuestionAnswers | null;
}

@State<QuestionAnswersStateModel>({
  name: "question",
  defaults: {
    question: {
      data: {
        content: [],
        pageable: {
        },
        totalElements: 0
      },
    },
    selectedQuestion: null
  },
})
@Injectable()
export class QuestionAnswersState {

  constructor(private store: Store,
    private notificationService: NotificationService,
    private questionsAnswersService: QuestionsAnswersService) { }

  @Selector()
  static questionAnswers(state: QuestionAnswersStateModel) {
    return state.question;
  }

  @Selector()
  static selectedQuestionAnswers(state: QuestionAnswersStateModel) {
    return state.selectedQuestion;
  }

  @Action(GetQuestionAnswers)
  getQuestionAnswers(ctx: StateContext<QuestionAnswersStateModel>, action: GetQuestionAnswers) {
    return this.questionsAnswersService.getPagedItems(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            question: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateQuestionAnswers)
  create(ctx: StateContext<QuestionAnswersStateModel>, action: CreateQuestionAnswers) {
    return this.questionsAnswersService.createItem(action.payload).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Faq has been created successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  // 

  @Action(UpdateListQuestionAnswers)
  updateInBatch(ctx: StateContext<QuestionAnswersStateModel>, action: UpdateListQuestionAnswers) {
    return this.questionsAnswersService.updateItems(action.items).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Faq has been reorder successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditQuestionAnswers)
  edit(ctx: StateContext<QuestionAnswersStateModel>, { id }: EditQuestionAnswers) {
    const state = ctx.getState();
    const result = state.question.data?.content?.find(question => question.id == id);
    ctx.patchState({
      ...state,
      selectedQuestion: result
    });
  }

  @Action(UpdateQuestionAnswers)
  update(ctx: StateContext<QuestionAnswersStateModel>, { payload, id }: UpdateQuestionAnswers) {
    return this.questionsAnswersService.updateItem(payload, id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Faq has been updated successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteQuestionAnswers)
  delete(ctx: StateContext<QuestionAnswersStateModel>, { id }: DeleteQuestionAnswers) {
    return this.questionsAnswersService.deleteItem(id).pipe(
      tap({
        next: result => {
          this.notificationService.showSuccess('Faq has been deleted successfully');
          this.store.dispatch(new GetQuestionAnswers({page:0,size:10}));
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllQuestionAnswers)
  deleteAll(ctx: StateContext<QuestionAnswersStateModel>, { ids }: DeleteAllQuestionAnswers) {
    // Delete All Logic Here
  }

}
