import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiRs, Params } from "../interface/core.interface";
import { Role } from "../interface/role.interface";

@Injectable({
  providedIn: "root",
})
export class RoleService {

  constructor(private http: HttpClient) { }

  // getRoleModules(): Observable<Module[]> {
  //   return this.http.get<Module[]>(`/assets/data/module.json`);
  // }

  getRoles(payload?: Params): Observable<ApiRs<Role[]>> {
    return this.http.get<ApiRs<Role[]>>(`${environment.URL}/admin/roles`, { params: payload });
  }

  getRoleById(id: string): Observable<ApiRs<Role>> {
    return this.http.get<ApiRs<Role>>(`${environment.URL}/admin/roles/` + id);
  }

  createRole(payload?: Params): Observable<ApiRs<Role>> {
    return this.http.post<ApiRs<Role>>(`${environment.URL}/admin/roles`, payload);
  }


  updateRole(id: string, payload?: Params): Observable<ApiRs<Role>> {
    return this.http.put<ApiRs<Role>>(`${environment.URL}/admin/roles/` + id, payload);
  }

}
