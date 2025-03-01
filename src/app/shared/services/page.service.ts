import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiRs, Page, Params } from "../interface/core.interface";
import { PageContent } from "../interface/contents.interface";

@Injectable({
  providedIn: "root",
})
export class PageService {

  constructor(private http: HttpClient) { }

  getPagedItems(payload?: Params): Observable<ApiRs<Page<PageContent>>> {
    return this.http.get<ApiRs<Page<PageContent>>>(`${environment.URL}/admin/contents`, { params: payload });
  }

  createItem(payload?: PageContent): Observable<ApiRs<PageContent>> {
    return this.http.post<ApiRs<PageContent>>(`${environment.URL}/admin/contents`, payload);
  }

  updateItem(payload: PageContent, id: string): Observable<ApiRs<PageContent>> {
    return this.http.put<ApiRs<PageContent>>(`${environment.URL}/admin/contents/${id}`, payload);
  }

  deleteItem(id: string): Observable<ApiRs<PageContent>> {
    return this.http.delete<ApiRs<PageContent>>(`${environment.URL}/admin/contents/${id}`);
  }

}
