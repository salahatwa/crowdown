import { DyTemplate } from "../interface/contents.interface";
import { Params } from "../interface/core.interface";

export class GetDyTemplateTypes {
  static readonly type = "[Template] Get Types";
  constructor(public payload?: Params) { }
}


export class GetDyTemplates {
  static readonly type = "[Template] Get";
  constructor(public payload?: Params) { }
}

export class CreateDyTemplate {
  static readonly type = "[Template] Create";
  constructor(public payload: DyTemplate) { }
}

export class EditDyTemplate {
  static readonly type = "[Template] Edit";
  constructor(public id: string) { }
}

export class UpdateDyTemplate {
  static readonly type = "[Template] Update";
  constructor(public payload: DyTemplate, public id: string) { }
}

export class UpdateDyTemplateStatus {
  static readonly type = "[Template] Update Status";
  constructor(public id: string, public status: boolean) { }
}

export class DeleteDyTemplate {
  static readonly type = "[Template] Delete";
  constructor(public id: string) { }
}

export class DeleteAllDyTemplate {
  static readonly type = "[Template] Delete All";
  constructor(public ids: string[]) { }
}