import { ComentarioGeneralModel } from './../models/comentariogeneral.model';
import { ComentarioModel } from './../models/comentario.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';

@Injectable({
  providedIn: 'root'
})
export class ComentarioGeneralService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }

  insertarComentario(comentario: ComentarioGeneralModel){
    const URL_SERVICE = `${this._urlService.getEndPointComentario()}file`;
    return this.http.post( URL_SERVICE, comentario );
  }

  consultaComentariosByLlaveAndType(llave: number, type: string){
    const URL_SERVICE = `${this._urlService.getEndPointComentarioDatos()}by/`;
    let params = new HttpParams().set("llave", llave.toString() ).set("type_comments", type);
    return this.http.get<ComentarioGeneralModel[]>(URL_SERVICE,{params: params});
  }

  
}
