import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiRs, Page, Params } from "../interface/core.interface";
import { Customer } from "../interface/customer.interface";

@Injectable({
  providedIn: "root",
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomeres(payload?: Params): Observable<ApiRs<Page<Customer>>> {
    return this.http.get<ApiRs<Page<Customer>>>(`${environment.URL}/admin/consumers`, { params: payload });
  }

  createCustomer(payload?: Customer): Observable<ApiRs<Customer>> {
    return this.http.post<ApiRs<Customer>>(`${environment.URL}/admin/consumers`, payload);
  }

  updateCustomer(payload: Customer, id: string): Observable<ApiRs<Customer>> {
    return this.http.put<ApiRs<Customer>>(`${environment.URL}/admin/consumers/${id}`, payload);
  }

  deleteCustomer(id: string): Observable<ApiRs<Customer>> {
    return this.http.delete<ApiRs<Customer>>(`${environment.URL}/admin/consumers/${id}`);
  }
}
