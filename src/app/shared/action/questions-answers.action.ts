import { Params } from "../interface/core.interface";
import { QuestionAnswers } from "../interface/questions-answers.interface";

export class GetQuestionAnswers {
  static readonly type = "[Question] Get";
  constructor(public payload: Params) { }
}


export class CreateQuestionAnswers {
  static readonly type = "[Question] Create";
  constructor(public payload: QuestionAnswers) { }
}

export class EditQuestionAnswers {
  static readonly type = "[Question] Edit";
  constructor(public id: string) { }
}

export class UpdateQuestionAnswers {
  static readonly type = "[Question] put";
  constructor(public payload: QuestionAnswers, public id: string) { }
}


export class UpdateListQuestionAnswers {
  static readonly type = "[Question] put all";
  constructor(public items: QuestionAnswers[]) { }
}

export class DeleteQuestionAnswers {
  static readonly type = "[Question] Delete";
  constructor(public id: string) { }
}

export class DeleteAllQuestionAnswers {
  static readonly type = "[Question] Delete All";
  constructor(public ids: string[]) { }
}