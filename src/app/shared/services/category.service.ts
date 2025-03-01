import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Category } from "../interface/category.interface";
import { ApiRs, Params } from "../interface/core.interface";

@Injectable({
  providedIn: "root",
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(payload?: Params): Observable<ApiRs<Category[]>> {
    return this.http.get<ApiRs<Category[]>>(`${environment.URL}/admin/categories`, { params: payload });
  }

  getCategoriesTreeView(payload?: Params): Observable<ApiRs<Category[]>> {
    return this.http.get<ApiRs<Category[]>>(`${environment.URL}/admin/categories/tree_view`, { params: payload });
  }

  getCategoryById(id: string): Observable<ApiRs<Category>> {
    return this.http.get<ApiRs<Category>>(`${environment.URL}/admin/categories/${id}`);
  }

  createCategory(payload: Category): Observable<ApiRs<Category>> {
    return this.http.post<ApiRs<Category>>(`${environment.URL}/admin/categories`, payload);
  }

  updateCategory(payload: Category, id: string): Observable<ApiRs<Category>> {
    return this.http.put<ApiRs<Category>>(`${environment.URL}/admin/categories/${id}`, payload);
  }

  deleteCategory(id: string): Observable<ApiRs<Category>> {
    return this.http.delete<ApiRs<Category>>(`${environment.URL}/admin/categories/${id}`);
  }

}
