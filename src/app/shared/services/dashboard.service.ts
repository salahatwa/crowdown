import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { StatisticsCount, RevenueChart } from "../interface/dashboard.interface";
import { ApiRs } from "../interface/core.interface";

@Injectable({
  providedIn: "root",
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getStatisticsCount(): Observable<ApiRs<StatisticsCount>> {
    return this.http.get<ApiRs<StatisticsCount>>(`${environment.URL}/admin/statistics`);
  }

  getRevenueChart(): Observable<RevenueChart> {
    return this.http.get<RevenueChart>(`${environment.URL}/chart.json`);
  }

}
