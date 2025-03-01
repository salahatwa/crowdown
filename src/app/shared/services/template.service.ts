import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { DyTemplate } from "../interface/contents.interface";
import { ApiRs, Page, Params } from "../interface/core.interface";

@Injectable({
  providedIn: "root",
})
export class TemplateService {

  constructor(private http: HttpClient) { }


  listTypes(payload?: Params): Observable<ApiRs<any>> {
    return this.http.get<ApiRs<any>>(`${environment.URL}/admin/template/types`, { params: payload });
  }

  getPagedItems(payload?: Params): Observable<ApiRs<Page<DyTemplate>>> {
    return this.http.get<ApiRs<Page<DyTemplate>>>(`${environment.URL}/admin/template`, { params: payload });
  }

  createItem(payload?: DyTemplate): Observable<ApiRs<DyTemplate>> {
    return this.http.post<ApiRs<DyTemplate>>(`${environment.URL}/admin/template`, payload);
  }

  updateItem(payload: DyTemplate, id: string): Observable<ApiRs<DyTemplate>> {
    return this.http.put<ApiRs<DyTemplate>>(`${environment.URL}/admin/template/${id}`, payload);
  }

  deleteItem(id: string): Observable<ApiRs<DyTemplate>> {
    return this.http.delete<ApiRs<DyTemplate>>(`${environment.URL}/admin/template/${id}`);
  }

}
