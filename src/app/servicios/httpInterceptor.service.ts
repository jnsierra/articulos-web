import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })
export class HttpErrorInterceptor implements HttpInterceptor {

    construct() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        return next.handle(req).pipe( catchError( (error: HttpErrorResponse) =>{
            let errorMsg = '';
            console.log("Este es el error desde el interceptor: ", error );
            return throwError(errorMsg);
        }) );
    }


}