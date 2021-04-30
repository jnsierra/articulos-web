import { DocumentDownload } from './../models/DocumentDownload.model';
import { UploadArticulo } from './../models/uploadarticulo.model';
import { HttpClient } from '@angular/common/http';
import { UrlServices } from './../generales/url.entity';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private _urlService: UrlServices,
              private http: HttpClient) { }

  getPdfArticulo(idArticulo: number){
    const URL_SERVICE = `${this._urlService.getEndPointDownload()}articulo/${idArticulo}/`;
    return this.http.get<UploadArticulo>(URL_SERVICE);
  }

  getFormatoIdea(){
    const URL_SERVICE = `${this._urlService.getEndPointDownloadFiles()}formatoIdea/`;
    return this.http.get<DocumentDownload>(URL_SERVICE);
  }

  getFormatoIdeaFirmado(idIdea: number){
    const URL_SERVICE = `${this._urlService.getEndPointDownloadFiles()}formatoAdjuntoIdea/${idIdea}/`;
    return this.http.get<DocumentDownload>(URL_SERVICE);
  }

  getDocumentByUbicacion(documento: DocumentDownload){
    const URL_SERVICE = `${this._urlService.getEndPointDownloadFiles()}`;
    return this.http.post<DocumentDownload>(URL_SERVICE, documento);
  }
}
