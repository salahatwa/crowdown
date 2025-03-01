import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiRs, Page, Params } from "../interface/core.interface";
import { Tag } from "../interface/tag.interface";

@Injectable({
  providedIn: "root",
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTags(payload?: Params): Observable<ApiRs<Page<Tag>>> {
    return this.http.get<ApiRs<Page<Tag>>>(`${environment.URL}/admin/tags`, { params: payload });
  }

  createTag(payload?: Tag): Observable<ApiRs<Tag>> {
    return this.http.post<ApiRs<Tag>>(`${environment.URL}/admin/tags`, payload);
  }

  updateTag(payload: Tag, id: string): Observable<ApiRs<Tag>> {
    return this.http.put<ApiRs<Tag>>(`${environment.URL}/admin/tags/${id}`, payload);
  }

  deleteTag(id: string): Observable<ApiRs<Tag>> {
    return this.http.delete<ApiRs<Tag>>(`${environment.URL}/admin/tags/${id}`);
  }

}
