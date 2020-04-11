import { HttpClient } from '@angular/common/http';
import { UploadArticulo } from 'src/app/models/uploadarticulo.model';
import { UrlServices } from './../generales/url.entity';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private _urlService: UrlServices,
              private http: HttpClient) { }

  uploadFile(articulo: UploadArticulo){
    const URL_SERVICE = `${this._urlService.getEndPointUpload()}articulo/`;
    return this.http.post(URL_SERVICE, articulo);
  }
}
