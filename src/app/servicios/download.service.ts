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
}
