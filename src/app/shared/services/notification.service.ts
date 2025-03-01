import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiRs, Page, Params } from '../interface/core.interface';
import { Notification } from '../interface/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public alertSubject = new Subject();

  public notification: boolean = true;

  constructor(private zone: NgZone,
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  showSuccess(message: string): void {
    this.alertSubject.next({ type: 'success', message: message });
    this.zone.run(() => {
      this.modalService.dismissAll();
      if (this.notification) {
        this.toastr.success(message);
      }
    });
  }

  showError(message: string): void {
    console.log(message);
    this.alertSubject.next({ type: 'error', message: message });
    this.zone.run(() => {
      if (this.notification) {
        this.toastr.error(message);
      }
    });
  }


  getNotifications(payload?: Params): Observable<ApiRs<Page<Notification>>> {
    return this.http.get<ApiRs<Page<Notification>>>(`${environment.URL}/admin/logs`, { params: payload });
  }


  markAsReadNotifications(): Observable<ApiRs<any>> {
    return this.http.get<ApiRs<any>>(`${environment.URL}/admin/logs/markAsRead`);
  }

  clearReadedNotification(): Observable<ApiRs<any>> {
    return this.http.get<ApiRs<any>>(`${environment.URL}/admin/logs/clear`);
  }

  

}
