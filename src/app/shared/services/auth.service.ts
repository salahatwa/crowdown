import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiRs, Params } from "../interface/core.interface";
import { User } from "../interface/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(private http: HttpClient) { }

  clearLocalStorageOnClose() {
    window.onpopstate = function (e) { window.history.forward(); }
    window.addEventListener('unload', () => {
     this.clearAll();
    });
  }

  clearAll(){
    localStorage.setItem('auth','');
  }

  login(payload): Observable<ApiRs<User>> {
    return this.http.post<ApiRs<User>>(`${environment.URL}/authentication/login`, payload);
  }
  recovery1(payload): Observable<any> {
    return this.http.post<any>(`${environment.URL}/recoveries`, payload);
  }

  recovery2(payload): Observable<any> {
    return this.http.post<any>(`${environment.URL}/recoveries/confirm`, payload);
  }

  recovery3(payload): Observable<any> {
    return this.http.post<any>(`${environment.URL}/recoveries/update`, payload);
  }

  updatePassword(payload): Observable<any> {
    return this.http.post<any>(`${environment.URL}/admin/users/update/password`, payload);
  }

  updateInfo(id: string, payload?: Params): Observable<ApiRs<User>> {
    return this.http.put<ApiRs<User>>(`${environment.URL}/admin/users/update/${id}/info`, payload);
  }
}
