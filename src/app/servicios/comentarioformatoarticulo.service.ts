import { ComentarioFormatoArticuloModel } from './../models/comentarioformatoarticulo.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';

@Injectable({
  providedIn: 'root'
})
export class ComentarioFormatoArticuloService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }

  consultaComentariosByFormato(idFormato: number){
    const URL_SERVICE = `${this._urlService.getEndPointComentarioFormatoArticuloDatos()}by/formato/${idFormato}`;
    return this.http.get<ComentarioFormatoArticuloModel[]>(URL_SERVICE);
  }

  insertarComentario(comentario: ComentarioFormatoArticuloModel){
    const URL_SERVICE = `${this._urlService.getEndPointComentarioFormatoArticuloDatos()}`;
    return this.http.post<ComentarioFormatoArticuloModel>( URL_SERVICE, comentario );
  }

  
}