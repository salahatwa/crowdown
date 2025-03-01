import { Params } from "../interface/core.interface";
import { CheckoutPayload } from "../interface/order.interface";

export class GetOrders {
  static readonly type = "[Order] Get";
  constructor(public payload?: Params) { }
}

export class GetOrdersByProduct {
  static readonly type = "[Order] Filter";
  constructor(public productId: string,public params: Params) { }
}

export class SelectUser {
  static readonly type = "[Order] User";
  constructor(public id: string) { }
}

export class ViewOrder {
  static readonly type = "[Order] View";
  constructor(public id: string) { }
}

export class Checkout {
  static readonly type = "[Order] Checkout";
  constructor(public payload: CheckoutPayload) { }
}

export class PlaceOrder {
  static readonly type = "[Order] Place";
  constructor(public payload: CheckoutPayload) { }
}

export class CancelOrder {
  static readonly type = "[Order] Cancel";
  constructor(public id: string) { }
}

export class DeleteOrder {
  static readonly type = "[Order] Delete";
  constructor(public id: string) { }
}

export class ConfirmOrder {
  static readonly type = "[Order] Confirm";
  constructor(public id: string) { }
}
export class Clear {
  static readonly type = "[Order] Clear";
  constructor() { }
}