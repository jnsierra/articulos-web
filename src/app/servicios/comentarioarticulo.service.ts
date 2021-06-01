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

  consultaComentariosByArtAndType(idArt: number, typeArt: string){
    const URL_SERVICE = `${this._urlService.getEndPointComentarioArticuloDatos()}ariculo/${idArt}/by/`;
    return this.http.get<ComentarioArticuloModel[]>( URL_SERVICE, {params: {type: typeArt}});
  }

  responderComentario(comentario: ComentarioArticuloModel){
    const URL_SERVICE = `${this._urlService.getEndPointComentarioArticuloDatos()}responder/`;
    return this.http.put( URL_SERVICE , comentario);
  }
  
}