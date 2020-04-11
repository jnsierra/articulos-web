import { ComentarioModel } from './../models/comentario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }

  insertarComentarioByArticulo(comentario: ComentarioModel){
    const URL_SERVICE = `${this._urlService.getEndPointComentario()}rechazo/`;
    return this.http.post( URL_SERVICE, comentario );
  }

  consultaComentariosByIdArticulo(idArticulo: number){
    const URL_SERVICE = `${this._urlService.getEndPointComentario()}articulo/idea/${idArticulo}/`;
    return this.http.get( URL_SERVICE );
  }
}
