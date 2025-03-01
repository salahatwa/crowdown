import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from '../../shared/services/error.service';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(NotificationService);

    let message;

    console.log(error);
    // console.log(typeof error);

    if (error instanceof HttpErrorResponse) {
      // console.log(':::::::::::::::');
      message = errorService.getServerErrorMessage(error);
      // console.log(message);
      notifier.showError(message);
    }

    if (error instanceof Error) {
      // console.log(':::::::::::::::33');
      // console.log(message);
      // console.log('>>>>>>>>>>>>>>>>>');
      // console.log(error);
      notifier.showError(error.message);
    }
    // else{
    //   notifier.showError(error?.message);
    // }

  }

}