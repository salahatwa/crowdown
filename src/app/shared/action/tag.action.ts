import { Params } from "../interface/core.interface";
import { Tag } from "../interface/tag.interface";

export class GetTags {
  static readonly type = "[Tag] Get";
  constructor(public payload?: Params) { }
}

export class CreateTag {
  static readonly type = "[Tag] Create";
  constructor(public payload: Tag) { }
}

export class EditTag {
  static readonly type = "[Tag] Edit";
  constructor(public id: string) { }
}

export class UpdateTag {
  static readonly type = "[Tag] Update";
  constructor(public payload: Tag, public id: string) { }
}

export class DeleteTag {
  static readonly type = "[Tag] Delete";
  constructor(public id: string) { }
}

export class DeleteAllTag {
  static readonly type = "[Tag] Delete All";
  constructor(public ids: number[]) { }
}