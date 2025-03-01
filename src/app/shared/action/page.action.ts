import { Params } from "../interface/core.interface";
import { PageContent } from "../interface/contents.interface";

export class GetPageContents {
  static readonly type = "[Page] Get";
  constructor(public payload?: Params) {}
}

export class CreatePageContent {
  static readonly type = "[Page] Create";
  constructor(public payload: PageContent) {}
}

export class EditPageContent {
  static readonly type = "[Page] Edit";
  constructor(public id: string) {}
}

export class UpdatePageContent {
  static readonly type = "[Page] Update";
  constructor(public payload: PageContent, public id: string) {}
}

export class UpdatePageContentStatus {
  static readonly type = "[Page] Update Status";
  constructor(public id: string, public status: boolean) {}
}

export class DeletePageContent {
  static readonly type = "[Page] Delete";
  constructor(public id: string) {}
}

export class DeleteAllPageContent {
  static readonly type = "[Page] Delete All";
  constructor(public ids: string[]) {}
}