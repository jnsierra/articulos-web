import { AuthService } from 'src/app/servicios/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
    //console.log('Leer el token');
    //console.log('Token desde AuthGuard' + this.authService.leerToken());
   }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.estaAutenticado()) {
      return true;
    }
    return false;
  }

}
