import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiRs, Page, Params } from '../interface/core.interface';
import { Order } from '../interface/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(payload?: Params): Observable<ApiRs<Page<Order>>> {
    return this.http.get<ApiRs<Page<Order>>>(`${environment.URL}/admin/order`, { params: payload });
  }

  getOrdersByProducId(product_id:string,payload:Params): Observable<ApiRs<Page<Order>>> {
    return this.http.get<ApiRs<Page<Order>>>(`${environment.URL}/admin/order/byProductId/${product_id}`,{ params: payload });
  }


  getOrderById(id: string): Observable<ApiRs<Order>> {
    return this.http.get<ApiRs<Order>>(`${environment.URL}/admin/order/${id}`);
  }

  
  create(params): Observable<ApiRs<Order>> {
    return this.http.post<ApiRs<Order>>(`${environment.URL}/admin/order/create`, params);
  }

  cancel(id): Observable<ApiRs<Order>> {
    return this.http.delete<ApiRs<Order>>(`${environment.URL}/admin/order/cancel/${id}`);
  }

  confirm(id): Observable<ApiRs<Order>> {
    return this.http.get<ApiRs<Order>>(`${environment.URL}/admin/order/confirm/${id}`);
  }

  delete(id): Observable<ApiRs<Order>> {
    return this.http.delete<ApiRs<Order>>(`${environment.URL}/admin/order/delete/${id}`);
  }


  checkout(params): Observable<ApiRs<Order>> {
    return this.http.post<ApiRs<Order>>(`${environment.URL}/admin/order/checkout`, params);
  }

}
