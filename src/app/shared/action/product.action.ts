import { Params } from "../interface/core.interface";
import { Product } from "../interface/product.interface";

export class GetProducts {
  static readonly type = "[Product] Get";
  constructor(public payload?: Params) { }
}

export class ProductsStockReport {
  static readonly type = "[Product] Stock";
  constructor(public type: string, public payload?: Params) { }
}

export class CreateProduct {
  static readonly type = "[Product] Create";
  constructor(public payload: Product) { }
}

export class EditProduct {
  static readonly type = "[Product] Edit";
  constructor(public id: string) { }
}

export class UpdateProduct {
  static readonly type = "[Product] Update";
  constructor(public payload: Product, public id: string) { }
}

export class UpdateProductStatus {
  static readonly type = "[Product] Update Status";
  constructor(public id: string, public status: boolean) { }
}

export class DeleteProduct {
  static readonly type = "[Product] Delete";
  constructor(public id: string) { }
}

export class DeleteAllProduct {
  static readonly type = "[Product] Delete All";
  constructor(public ids: string[]) { }
}

export class ReplicateProduct {
  static readonly type = "[Product] Replicate";
  constructor(public ids: string[]) { }
}