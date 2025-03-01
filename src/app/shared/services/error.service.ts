import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() {}

  getServerErrorMessage(error: any): string {
    // console.log(error);
    return error?.error?.message;
  }

}
