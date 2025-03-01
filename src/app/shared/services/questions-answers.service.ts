import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiRs, Page, Params } from '../interface/core.interface';
import { QuestionAnswers } from '../interface/questions-answers.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsAnswersService {

  constructor(private http: HttpClient) { }

  getPagedItems(payload?: Params): Observable<ApiRs<Page<QuestionAnswers>>> {
    return this.http.get<ApiRs<Page<QuestionAnswers>>>(`${environment.URL}/admin/faq`, { params: payload });
  }

  createItem(payload?: QuestionAnswers): Observable<ApiRs<QuestionAnswers>> {
    return this.http.post<ApiRs<QuestionAnswers>>(`${environment.URL}/admin/faq`, payload);
  }

  updateItem(payload: QuestionAnswers, id: string): Observable<ApiRs<QuestionAnswers>> {
    return this.http.put<ApiRs<QuestionAnswers>>(`${environment.URL}/admin/faq/${id}`, payload);
  }

  updateItems(payloads: QuestionAnswers[]): Observable<ApiRs<QuestionAnswers[]>> {
    return this.http.put<ApiRs<QuestionAnswers[]>>(`${environment.URL}/admin/faq/reorder`, payloads);
  }

  deleteItem(id: string): Observable<ApiRs<QuestionAnswers>> {
    return this.http.delete<ApiRs<QuestionAnswers>>(`${environment.URL}/admin/faq/${id}`);
  }

}
