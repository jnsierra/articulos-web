import { ControlLecturaModel } from './../models/controllectura.model';
import { ComentarioModel } from './../models/comentario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';

@Injectable({
  providedIn: 'root'
})
export class ControlLecturaService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }

  insertarControlLectura(controlLectura: ControlLecturaModel){
    const URL_SERVICE = `${this._urlService.getEndPointControlLecturaDatos()}`;
    return this.http.post<ControlLecturaModel>( URL_SERVICE, controlLectura );
  }

  getControlesLecturaByArticulo(idArticulo:number){
    const URL_SERVICE = `${this._urlService.getEndPointControlLecturaDatos()}articulo/${idArticulo}`;
    return this.http.get<ControlLecturaModel[]>( URL_SERVICE);
  }
  
}
