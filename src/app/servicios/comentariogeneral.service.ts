import { ComentarioGeneralModel } from './../models/comentariogeneral.model';
import { ComentarioModel } from './../models/comentario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';

@Injectable({
  providedIn: 'root'
})
export class ComentarioGeneralService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }

  insertarComentario(comentario: ComentarioGeneralModel){
    const URL_SERVICE = `${this._urlService.getEndPointComentarioDatos()}`;
    return this.http.post( URL_SERVICE, comentario );
  }

  
}
