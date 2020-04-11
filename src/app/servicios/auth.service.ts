import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private url: UrlServices, private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    this.userToken = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  login(usuario: UsuarioModel) {
    const usuarioDto = {
      correo: usuario.email,
      contrasena: usuario.password
    };
    //'http://localhost:8081/api/login/'
    console.log(this.url.getEndPointLogin());
    return this.http.post( this.url.getEndPointLogin() , usuarioDto).pipe(
      map( resp =>{
        this.guardarToken(resp['token']);
        return resp;
      })
    );
  }

  private guardarToken(token: string) {
    this.userToken = token;
    localStorage.setItem('token', token);
  }

  leerToken(): string {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length > 2) {
      return true;
    }
    return false;
  }

}