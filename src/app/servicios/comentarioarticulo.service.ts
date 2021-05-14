import { ComentarioArticuloModel } from './../models/comentarioarticulo.model';
import { ComentarioGeneralModel } from './../models/comentariogeneral.model';
import { ComentarioModel } from './../models/comentario.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';

@Injectable({
  providedIn: 'root'
})
export class ComentarioArticuloService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }

  insertarComentario(comentario: ComentarioArticuloModel){
    const URL_SERVICE = `${this._urlService.getEndPointComentarioArticuloDatos()}`;
    return this.http.post( URL_SERVICE, comentario );
  }
  
}
