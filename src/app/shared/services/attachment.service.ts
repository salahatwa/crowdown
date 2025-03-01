import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Attachment } from "../interface/attachment.interface";
import { ApiRs, Page, Params } from "../interface/core.interface";

@Injectable({
  providedIn: "root",
})
export class AttachmentService {

  constructor(private http: HttpClient) { }

  getAttachments(payload?: Params): Observable<ApiRs<Page<Attachment>>> {
    return this.http.get<ApiRs<Page<Attachment>>>(`${environment.URL}/attachments`, { params: payload });
  }


  uploadAttachments(payload: File[]): Observable<ApiRs<Attachment[]>> {
    const httpOptions = {

    };

    const formData = new FormData();
    for (var x = 0; x < payload.length; x++) {
      formData.append("files", payload[x]);
    }
    return this.http.post<ApiRs<Attachment[]>>(`${environment.URL}/attachments/uploads`, formData, httpOptions);
  }

  deleteAttachments(payload: string[]): Observable<ApiRs<Page<Attachment>>> {
    return this.http.post<ApiRs<Page<Attachment>>>(`${environment.URL}/attachments/deleteAll`, payload);
  }

  deleteAttachment(id: string): Observable<ApiRs<Attachment>> {
    return this.http.delete<ApiRs<Attachment>>(`${environment.URL}/attachments/${id}`);
  }


}
