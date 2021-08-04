import { DocumentoUploadModel } from './../models/documentoupload.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';

@Injectable({
  providedIn: 'root'
})
export class CartaPublicacionService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }

  guardarCartaPublicacion(idArt: number, documento: DocumentoUploadModel){
    const URL_SERVICE = `${this._urlService.getEndPointCartaPublicacion()}${idArt}/`;
    return this.http.post<DocumentoUploadModel>( URL_SERVICE, documento );
  }
  
}