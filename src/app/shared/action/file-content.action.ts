import { Params } from "../interface/core.interface";
import { FileContent } from "../interface/contents.interface";

export class GetFileTypes {
  static readonly type = "[File] Get Types";
  constructor(public payload?: Params) {}
}


export class GetFileContents {
  static readonly type = "[File] Get";
  constructor(public payload?: Params) {}
}

export class CreateFileContent {
  static readonly type = "[File] Create";
  constructor(public payload: FileContent) {}
}

export class EditFileContent {
  static readonly type = "[File] Edit";
  constructor(public id: string) {}
}

export class UpdateFileContent {
  static readonly type = "[File] Update";
  constructor(public payload: FileContent, public id: string) {}
}

export class UpdateFileContentStatus {
  static readonly type = "[File] Update Status";
  constructor(public id: string, public status: boolean) {}
}

export class DeleteFileContent {
  static readonly type = "[File] Delete";
  constructor(public id: string) {}
}

export class DeleteAllFileContent {
  static readonly type = "[File] Delete All";
  constructor(public ids: string[]) {}
}