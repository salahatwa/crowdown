import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiRs, Page, Params } from "../interface/core.interface";
import { Tax } from "../interface/tax.interface";

@Injectable({
  providedIn: "root",
})
export class TaxService {

  constructor(private http: HttpClient) { }

  getTaxes(payload?: Params): Observable<ApiRs<Page<Tax>>> {
    return this.http.get<ApiRs<Page<Tax>>>(`${environment.URL}/admin/taxs`, { params: payload });
  }

  createTax(payload?: Tax): Observable<ApiRs<Tax>> {
    return this.http.post<ApiRs<Tax>>(`${environment.URL}/admin/taxs`, payload);
  }

  updateTax(payload: Tax, id: string): Observable<ApiRs<Tax>> {
    return this.http.put<ApiRs<Tax>>(`${environment.URL}/admin/taxs/${id}`, payload);
  }

  deleteTax(id: string): Observable<ApiRs<Tax>> {
    return this.http.delete<ApiRs<Tax>>(`${environment.URL}/admin/taxs/${id}`);
  }
}
