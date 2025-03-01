import { Params } from "../interface/core.interface";
import { User, UserAddress } from "../interface/user.interface";

export class GetUsers {
  static readonly type = "[User] Get";
  constructor(public payload?: Params) {}
}

export class CreateUser {
  static readonly type = "[User] Create";
  constructor(public payload: User) {}
}

export class EditUser {
  static readonly type = "[User] Edit";
  constructor(public id: string) {}
}

export class UpdateUser {
  static readonly type = "[User] Update";
  constructor(public payload: User, public id: string) {}
}

export class UpdateAnotherUserPass {
  static readonly type = "[User] Update Another Pass";
  constructor(public payload: User, public id: string) {}
}

export class UpdateUserStatus {
  static readonly type = "[User] Update Status";
  constructor(public id: string, public status: boolean) {}
}

export class DeleteUser {
  static readonly type = "[User] Delete";
  constructor(public id: string) {}
}

export class DeleteAllUser {
  static readonly type = "[User] Delete All";
  constructor(public ids: string[]) {}
}

export class ImportUser {
  static readonly type = "[User] Import";
  constructor(public payload: File[]) {}
}

export class ExportUser {
  static readonly type = "[User] Export";
}

export class CreateUserAddress {
  static readonly type = "[User] Address Create";
  constructor(public payload: UserAddress) {}
}