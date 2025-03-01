import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiRs, Params } from '../interface/core.interface';
import { Setting } from '../interface/setting.interface';
import * as data from '../data/settings';
// import * as data from '../../../shared/data/se';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) { }

  getSettingOption(): Observable<Setting> {
    // Settings.
    // return of(data.settings);
    return this.http.get<Setting>(`./assets/data/setting.json`);
  }

  getBackendSettingOption(): Observable<ApiRs<Map<string,any>>> {
  return this.http.get<ApiRs<Map<string,any>>>(`${environment.URL}/admin/settings/map_view`);
  }

  getPaymentMethods(): Observable<ApiRs<string[]>> {
    return this.http.get<ApiRs<string[]>>(`${environment.URL}/admin/settings/payment_methods`);
  }


  updateSettings(settings): Observable<ApiRs<Map<string,any>>> {
    // return this.http.get<Setting>(`${environment.URL}/setting.json`);
    return this.http.put<ApiRs<Map<string,any>>>(`${environment.URL}/admin/settings`,settings);
  }



}
