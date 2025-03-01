import { Params } from "../interface/core.interface";
import { Customer } from "../interface/customer.interface";


export class GetCustomers {
  static readonly type = "[Customer] Get";
  constructor(public payload?: Params) { }
}

export class CreateCustomer {
  static readonly type = "[Customer] Create";
  constructor(public payload: Customer) { }
}

export class EditCustomer {
  static readonly type = "[Customer] Edit";
  constructor(public id: string) { }
}

export class UpdateCustomer {
  static readonly type = "[Customer] Update";
  constructor(public payload: Customer, public id: string) { }
}

export class DeleteCustomer {
  static readonly type = "[Customer] Delete";
  constructor(public id: string) { }
}

export class DeleteAllCustomer {
  static readonly type = "[Customer] Delete All";
  constructor(public ids: string[]) { }
}