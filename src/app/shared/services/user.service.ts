import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiRs, Page, Params } from "../interface/core.interface";
import { User } from "../interface/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(payload?: Params): Observable<ApiRs<Page<User>>> {
    return this.http.get<ApiRs<Page<User>>>(`${environment.URL}/admin/users`, { params: payload });
  }

  createUser(payload?: Params): Observable<ApiRs<User>> {
    return this.http.post<ApiRs<User>>(`${environment.URL}/admin/users`, payload);
  }

  updateUser(id: string, payload?: Params): Observable<ApiRs<User>> {
    return this.http.put<ApiRs<User>>(`${environment.URL}/admin/users/${id}`, payload);
  }

  updateAnotherUserPass(id: string, payload?: Params): Observable<ApiRs<User>> {
    return this.http.put<ApiRs<User>>(`${environment.URL}/admin/users/update/${id}/password`, payload);
  }


  deleteUser(id: string): Observable<ApiRs<User>> {
    return this.http.delete<ApiRs<User>>(`${environment.URL}/admin/users/${id}`);
  }


}
