import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { FileContent } from "../interface/contents.interface";
import { ApiRs, Page, Params } from "../interface/core.interface";

@Injectable({
  providedIn: "root",
})
export class FileContentService {

  constructor(private http: HttpClient) { }


  listTypes(payload?: Params): Observable<ApiRs<any>> {
    return this.http.get<ApiRs<any>>(`${environment.URL}/admin/files-content/types`, { params: payload });
  }

  getPagedItems(payload?: Params): Observable<ApiRs<Page<FileContent>>> {
    return this.http.get<ApiRs<Page<FileContent>>>(`${environment.URL}/admin/files-content`, { params: payload });
  }

  createItem(payload?: FileContent): Observable<ApiRs<FileContent>> {
    return this.http.post<ApiRs<FileContent>>(`${environment.URL}/admin/files-content`, payload);
  }

  updateItem(payload: FileContent, id: string): Observable<ApiRs<FileContent>> {
    return this.http.put<ApiRs<FileContent>>(`${environment.URL}/admin/files-content/${id}`, payload);
  }

  deleteItem(id: string): Observable<ApiRs<FileContent>> {
    return this.http.delete<ApiRs<FileContent>>(`${environment.URL}/admin/files-content/${id}`);
  }

}
