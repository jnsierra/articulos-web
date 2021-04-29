import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
    providedIn: 'root'
  })
export class HttpErrorInterceptorService implements HttpInterceptor {

    constructor(private _authService: AuthService
        ,private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        return next.handle(req).pipe( catchError( (error: HttpErrorResponse) =>{
            if(error.status == 500){
                Swal.fire({
                    allowOutsideClick: false,
                    type: 'error',
                    text: 'La operación realizada no fue realizada, por favor notifique este error al administrador'
                  });
            }else if(error.status == 403 ){
                Swal.fire({
                    allowOutsideClick: false,
                    type: "error",
                    text: "Error de autenticacion por favor ingrese de nuevo"
                  }).then((result) => {
                    if (result.value) {
                      this._authService.logout();
                      this.router.navigateByUrl("/login");
                    }
                  });

            }
            let errorMsg = '';
            console.log("Este es el error desde el interceptor: ", error );
            return throwError(errorMsg);
        }) );
    }


}