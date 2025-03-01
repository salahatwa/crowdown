import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiRs, Page, Params } from "../interface/core.interface";
import { Product } from "../interface/product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(payload?: Params): Observable<ApiRs<Page<Product>>> {
    return this.http.get<ApiRs<Page<Product>>>(`${environment.URL}/admin/products/search`, { params: payload });
  }

  getProductsReport(type:string,payload?: Params): Observable<any> {
    return this.http.get(`${environment.URL}/admin/products/report/${type}`, {
      params: payload, responseType: 'blob'
    });
  }

  getProductById(id: string): Observable<ApiRs<Product>> {
    return this.http.get<ApiRs<Product>>(`${environment.URL}/admin/products/${id}`);
  }

  createProduct(payload: Product): Observable<ApiRs<Product>> {
    return this.http.post<ApiRs<Product>>(`${environment.URL}/admin/products`, payload);
  }

  updateProduct(payload: Product, id: string): Observable<ApiRs<Product>> {
    return this.http.put<ApiRs<Product>>(`${environment.URL}/admin/products/${id}`, payload);
  }

  updateProductStatus(status: boolean, id: string): Observable<ApiRs<Product>> {
    return this.http.put<ApiRs<Product>>(`${environment.URL}/admin/products/status/${id}/${status}`, {});
  }

  deleteProduct(id: string): Observable<ApiRs<Product>> {
    return this.http.delete<ApiRs<Product>>(`${environment.URL}/admin/products/${id}`);
  }


}
